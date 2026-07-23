namespace BottleCapForYou.Services;

public sealed class AnalyticsSchemaInitializer : IHostedService
{
    private readonly AnalyticsRepository _repository;
    private readonly ILogger<AnalyticsSchemaInitializer> _logger;

    public AnalyticsSchemaInitializer(
        AnalyticsRepository repository,
        ILogger<AnalyticsSchemaInitializer> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        if (!_repository.IsConfigured)
        {
            _logger.LogInformation("Analytics MySQL connection is not configured; analytics storage is disabled.");
            return;
        }

        try
        {
            await _repository.EnsureSchemaAsync(cancellationToken);
            _logger.LogInformation("Analytics MySQL schema is ready.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Analytics MySQL schema could not be initialized.");
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}
