using BottleCapForYou.Models;
using BottleCapForYou.Services;
using Microsoft.AspNetCore.Mvc;

namespace BottleCapForYou.Controllers;

[ApiController]
[Route("api/analytics")]
public sealed class AnalyticsController : ControllerBase
{
    private readonly AnalyticsRepository _repository;
    private readonly ILogger<AnalyticsController> _logger;

    public AnalyticsController(
        AnalyticsRepository repository,
        ILogger<AnalyticsController> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    [HttpPost("track")]
    public async Task<IActionResult> TrackAsync(
        [FromBody] AnalyticsTrackingRequest request,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.SessionId) ||
            string.IsNullOrWhiteSpace(request.PageViewId) ||
            string.IsNullOrWhiteSpace(request.Path))
        {
            return BadRequest(new { message = "Session, page view and path are required." });
        }

        try
        {
            var tracked = await _repository.TrackAsync(request, HttpContext, cancellationToken);
            return tracked ? Accepted() : NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to store analytics tracking event.");
            return Accepted();
        }
    }
}
