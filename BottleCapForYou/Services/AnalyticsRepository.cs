using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using BottleCapForYou.Models;
using Dapper;
using Microsoft.Extensions.Options;
using MySqlConnector;

namespace BottleCapForYou.Services;

public sealed class AnalyticsRepository
{
    private const int MaxPathLength = 2048;
    private const int MaxTitleLength = 512;
    private const int MaxSmallTextLength = 255;
    private const int MaxUserAgentLength = 512;
    private const int MaxMetadataLength = 4096;
    private const int MaxTrackedSeconds = 24 * 60 * 60;

    private readonly IConfiguration _configuration;
    private readonly AnalyticsOptions _options;

    public AnalyticsRepository(
        IConfiguration configuration,
        IOptions<AnalyticsOptions> options)
    {
        _configuration = configuration;
        _options = options.Value;
    }

    public bool IsConfigured => _options.Enabled && !string.IsNullOrWhiteSpace(ConnectionString);

    public async Task EnsureSchemaAsync(CancellationToken cancellationToken)
    {
        if (!IsConfigured)
        {
            return;
        }

        await using var connection = new MySqlConnection(ConnectionString);
        await connection.OpenAsync(cancellationToken);
        await connection.ExecuteAsync(new CommandDefinition(SchemaSql, cancellationToken: cancellationToken));
    }

    public async Task<bool> TrackAsync(
        AnalyticsTrackingRequest request,
        HttpContext httpContext,
        CancellationToken cancellationToken)
    {
        if (!IsConfigured)
        {
            return false;
        }

        var sessionId = CleanIdentifier(request.SessionId);
        var pageViewId = CleanIdentifier(request.PageViewId);
        if (string.IsNullOrWhiteSpace(sessionId) || string.IsNullOrWhiteSpace(pageViewId))
        {
            return false;
        }

        var now = DateTime.UtcNow;
        var userAgent = TrimTo(httpContext.Request.Headers.UserAgent.ToString(), MaxUserAgentLength);
        var referrer = TrimTo(FirstNonEmpty(request.Referrer, httpContext.Request.Headers.Referer.ToString()), MaxPathLength);
        var path = TrimTo(FirstNonEmpty(request.Path, "/"), MaxPathLength);
        var landingPath = TrimTo(FirstNonEmpty(request.LandingPath, path), MaxPathLength);
        var activeSeconds = ClampSeconds(request.ActiveSeconds);
        var totalSeconds = ClampSeconds(request.TotalSeconds);
        var metadataJson = BuildMetadataJson(request.Metadata);
        var utm = request.Utm ?? new Dictionary<string, string>();

        var parameters = new
        {
            SessionId = sessionId,
            PageViewId = pageViewId,
            FirstSeenUtc = now,
            LastSeenUtc = now,
            LandingPath = landingPath,
            Referrer = referrer,
            UtmSource = TrimTo(GetValue(utm, "utm_source"), MaxSmallTextLength),
            UtmMedium = TrimTo(GetValue(utm, "utm_medium"), MaxSmallTextLength),
            UtmCampaign = TrimTo(GetValue(utm, "utm_campaign"), MaxSmallTextLength),
            UtmContent = TrimTo(GetValue(utm, "utm_content"), MaxSmallTextLength),
            UtmTerm = TrimTo(GetValue(utm, "utm_term"), MaxSmallTextLength),
            Language = TrimTo(request.Language, 32),
            TimeZone = TrimTo(request.TimeZone, 128),
            DeviceType = TrimTo(request.DeviceType, 32),
            ScreenWidth = request.ScreenWidth,
            ScreenHeight = request.ScreenHeight,
            UserAgent = userAgent,
            IpHash = HashIpAddress(httpContext.Connection.RemoteIpAddress),
            Path = path,
            Title = TrimTo(request.Title, MaxTitleLength),
            ActiveSeconds = activeSeconds,
            TotalSeconds = Math.Max(totalSeconds, activeSeconds),
            EventName = TrimTo(request.EventName, 128),
            MetadataJson = metadataJson,
        };

        await using var connection = new MySqlConnection(ConnectionString);
        await connection.OpenAsync(cancellationToken);

        await using var transaction = await connection.BeginTransactionAsync(cancellationToken);
        await connection.ExecuteAsync(new CommandDefinition(
            UpsertSessionSql,
            parameters,
            transaction,
            cancellationToken: cancellationToken));
        await connection.ExecuteAsync(new CommandDefinition(
            UpsertPageVisitSql,
            parameters,
            transaction,
            cancellationToken: cancellationToken));

        if (!string.IsNullOrWhiteSpace(parameters.EventName))
        {
            await connection.ExecuteAsync(new CommandDefinition(
                InsertEventSql,
                parameters,
                transaction,
                cancellationToken: cancellationToken));
        }

        await transaction.CommitAsync(cancellationToken);
        return true;
    }

    private string ConnectionString =>
        _configuration.GetConnectionString(_options.ConnectionStringName) ??
        _configuration.GetValue<string>("Analytics:ConnectionString") ??
        string.Empty;

    private string? HashIpAddress(IPAddress? ipAddress)
    {
        if (ipAddress is null || string.IsNullOrWhiteSpace(_options.IpHashSalt))
        {
            return null;
        }

        using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(_options.IpHashSalt));
        var bytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(ipAddress.ToString()));
        return Convert.ToHexString(bytes).ToLowerInvariant();
    }

    private static string? BuildMetadataJson(Dictionary<string, string>? metadata)
    {
        if (metadata is null || metadata.Count == 0)
        {
            return null;
        }

        var trimmed = metadata
            .Where(item => !string.IsNullOrWhiteSpace(item.Key))
            .Take(20)
            .ToDictionary(
                item => TrimTo(item.Key, 64) ?? string.Empty,
                item => TrimTo(item.Value, MaxSmallTextLength) ?? string.Empty);

        return TrimTo(JsonSerializer.Serialize(trimmed), MaxMetadataLength);
    }

    private static int ClampSeconds(int? value) => Math.Clamp(value ?? 0, 0, MaxTrackedSeconds);

    private static string CleanIdentifier(string value)
    {
        var trimmed = value.Trim();
        return Guid.TryParse(trimmed, out var guid) ? guid.ToString("D") : string.Empty;
    }

    private static string FirstNonEmpty(params string?[] values) =>
        values.FirstOrDefault(value => !string.IsNullOrWhiteSpace(value))?.Trim() ?? string.Empty;

    private static string? GetValue(Dictionary<string, string> values, string key) =>
        values.TryGetValue(key, out var value) ? value : null;

    private static string? TrimTo(string? value, int maxLength)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        var trimmed = value.Trim();
        return trimmed.Length <= maxLength ? trimmed : trimmed[..maxLength];
    }

    private const string SchemaSql = """
        CREATE TABLE IF NOT EXISTS analytics_sessions (
          id CHAR(36) NOT NULL,
          first_seen_utc DATETIME(6) NOT NULL,
          last_seen_utc DATETIME(6) NOT NULL,
          landing_path VARCHAR(2048) NULL,
          referrer VARCHAR(2048) NULL,
          utm_source VARCHAR(255) NULL,
          utm_medium VARCHAR(255) NULL,
          utm_campaign VARCHAR(255) NULL,
          utm_content VARCHAR(255) NULL,
          utm_term VARCHAR(255) NULL,
          language VARCHAR(32) NULL,
          time_zone VARCHAR(128) NULL,
          device_type VARCHAR(32) NULL,
          screen_width INT NULL,
          screen_height INT NULL,
          user_agent VARCHAR(512) NULL,
          ip_hash CHAR(64) NULL,
          PRIMARY KEY (id),
          INDEX ix_analytics_sessions_last_seen (last_seen_utc),
          INDEX ix_analytics_sessions_utm_source (utm_source)
        ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

        CREATE TABLE IF NOT EXISTS analytics_page_visits (
          id BIGINT NOT NULL AUTO_INCREMENT,
          page_view_id CHAR(36) NOT NULL,
          session_id CHAR(36) NOT NULL,
          path VARCHAR(2048) NOT NULL,
          title VARCHAR(512) NULL,
          first_seen_utc DATETIME(6) NOT NULL,
          last_seen_utc DATETIME(6) NOT NULL,
          active_seconds INT NOT NULL DEFAULT 0,
          total_seconds INT NOT NULL DEFAULT 0,
          PRIMARY KEY (id),
          UNIQUE KEY ux_analytics_page_visits_page_view_id (page_view_id),
          INDEX ix_analytics_page_visits_session_id (session_id),
          INDEX ix_analytics_page_visits_path (path(191)),
          CONSTRAINT fk_analytics_page_visits_session
            FOREIGN KEY (session_id) REFERENCES analytics_sessions(id)
            ON DELETE CASCADE
        ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

        CREATE TABLE IF NOT EXISTS analytics_events (
          id BIGINT NOT NULL AUTO_INCREMENT,
          session_id CHAR(36) NOT NULL,
          page_view_id CHAR(36) NOT NULL,
          event_name VARCHAR(128) NOT NULL,
          path VARCHAR(2048) NULL,
          occurred_utc DATETIME(6) NOT NULL,
          metadata_json JSON NULL,
          PRIMARY KEY (id),
          INDEX ix_analytics_events_session_id (session_id),
          INDEX ix_analytics_events_event_name (event_name),
          INDEX ix_analytics_events_occurred (occurred_utc),
          CONSTRAINT fk_analytics_events_session
            FOREIGN KEY (session_id) REFERENCES analytics_sessions(id)
            ON DELETE CASCADE
        ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        """;

    private const string UpsertSessionSql = """
        INSERT INTO analytics_sessions (
          id,
          first_seen_utc,
          last_seen_utc,
          landing_path,
          referrer,
          utm_source,
          utm_medium,
          utm_campaign,
          utm_content,
          utm_term,
          language,
          time_zone,
          device_type,
          screen_width,
          screen_height,
          user_agent,
          ip_hash
        ) VALUES (
          @SessionId,
          @FirstSeenUtc,
          @LastSeenUtc,
          @LandingPath,
          @Referrer,
          @UtmSource,
          @UtmMedium,
          @UtmCampaign,
          @UtmContent,
          @UtmTerm,
          @Language,
          @TimeZone,
          @DeviceType,
          @ScreenWidth,
          @ScreenHeight,
          @UserAgent,
          @IpHash
        )
        ON DUPLICATE KEY UPDATE
          last_seen_utc = VALUES(last_seen_utc),
          language = COALESCE(VALUES(language), language),
          time_zone = COALESCE(VALUES(time_zone), time_zone),
          device_type = COALESCE(VALUES(device_type), device_type),
          screen_width = COALESCE(VALUES(screen_width), screen_width),
          screen_height = COALESCE(VALUES(screen_height), screen_height),
          user_agent = COALESCE(VALUES(user_agent), user_agent),
          ip_hash = COALESCE(VALUES(ip_hash), ip_hash);
        """;

    private const string UpsertPageVisitSql = """
        INSERT INTO analytics_page_visits (
          page_view_id,
          session_id,
          path,
          title,
          first_seen_utc,
          last_seen_utc,
          active_seconds,
          total_seconds
        ) VALUES (
          @PageViewId,
          @SessionId,
          @Path,
          @Title,
          @FirstSeenUtc,
          @LastSeenUtc,
          @ActiveSeconds,
          @TotalSeconds
        )
        ON DUPLICATE KEY UPDATE
          last_seen_utc = VALUES(last_seen_utc),
          title = COALESCE(VALUES(title), title),
          active_seconds = GREATEST(active_seconds, VALUES(active_seconds)),
          total_seconds = GREATEST(total_seconds, VALUES(total_seconds));
        """;

    private const string InsertEventSql = """
        INSERT INTO analytics_events (
          session_id,
          page_view_id,
          event_name,
          path,
          occurred_utc,
          metadata_json
        ) VALUES (
          @SessionId,
          @PageViewId,
          @EventName,
          @Path,
          @LastSeenUtc,
          @MetadataJson
        );
        """;
}
