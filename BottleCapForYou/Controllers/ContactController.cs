using BottleCapForYou.Models;
using BottleCapForYou.Services;
using Microsoft.AspNetCore.Mvc;

namespace BottleCapForYou.Controllers;

[ApiController]
[Route("api/contact")]
public sealed class ContactController : ControllerBase
{
    private readonly ContactFormEmailSender _emailSender;
    private readonly ILogger<ContactController> _logger;

    public ContactController(
        ContactFormEmailSender emailSender,
        ILogger<ContactController> logger)
    {
        _emailSender = emailSender;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> SubmitAsync([FromBody] ContactFormRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Message))
        {
            return BadRequest(new { message = "Message is required." });
        }

        try
        {
            await _emailSender.SendAsync(request, cancellationToken);
            return Ok(new { message = "Sent" });
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogError(ex, "Contact form is not configured.");
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Contact form is not configured." });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send contact form email.");
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Failed to send message." });
        }
    }
}
