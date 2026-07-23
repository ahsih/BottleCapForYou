namespace BottleCapForYou.Models;

public sealed class AnalyticsTrackingRequest
{
    public string SessionId { get; init; } = string.Empty;
    public string PageViewId { get; init; } = string.Empty;
    public string Path { get; init; } = string.Empty;
    public string Title { get; init; } = string.Empty;
    public string LandingPath { get; init; } = string.Empty;
    public string Referrer { get; init; } = string.Empty;
    public string Language { get; init; } = string.Empty;
    public string TimeZone { get; init; } = string.Empty;
    public string DeviceType { get; init; } = string.Empty;
    public int? ScreenWidth { get; init; }
    public int? ScreenHeight { get; init; }
    public int? ActiveSeconds { get; init; }
    public int? TotalSeconds { get; init; }
    public string EventName { get; init; } = string.Empty;
    public Dictionary<string, string>? Utm { get; init; }
    public Dictionary<string, string>? Metadata { get; init; }
}
