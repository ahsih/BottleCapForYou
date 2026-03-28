using System.Net;
using System.Net.Mail;
using System.Text;
using BottleCapForYou.Models;
using Microsoft.Extensions.Options;

namespace BottleCapForYou.Services;

public sealed class ContactFormEmailSender
{
    private readonly ContactFormOptions _options;
    private readonly ILogger<ContactFormEmailSender> _logger;

    public ContactFormEmailSender(
        IOptions<ContactFormOptions> options,
        ILogger<ContactFormEmailSender> logger)
    {
        _options = options.Value;
        _logger = logger;
    }

    public async Task SendAsync(ContactFormRequest request, CancellationToken cancellationToken)
    {
        ValidateConfiguration();

        using var message = new MailMessage
        {
            From = new MailAddress(_options.SenderEmail),
            Subject = $"Website enquiry from {ValueOrFallback(request.Name)}",
            Body = BuildBody(request),
            IsBodyHtml = false,
        };

        message.To.Add(_options.RecipientEmail);

        if (!string.IsNullOrWhiteSpace(request.Email))
        {
            message.ReplyToList.Add(new MailAddress(request.Email.Trim()));
        }

        using var client = new SmtpClient(_options.Smtp.Host, _options.Smtp.Port)
        {
            EnableSsl = _options.Smtp.EnableSsl,
            DeliveryMethod = SmtpDeliveryMethod.Network,
            UseDefaultCredentials = false,
        };

        if (!string.IsNullOrWhiteSpace(_options.Smtp.Username))
        {
            client.Credentials = new NetworkCredential(_options.Smtp.Username, _options.Smtp.Password);
        }

        _logger.LogInformation("Sending contact form email to {RecipientEmail}", _options.RecipientEmail);
        cancellationToken.ThrowIfCancellationRequested();
        await client.SendMailAsync(message, cancellationToken);
    }

    private void ValidateConfiguration()
    {
        if (string.IsNullOrWhiteSpace(_options.RecipientEmail) ||
            string.IsNullOrWhiteSpace(_options.SenderEmail) ||
            string.IsNullOrWhiteSpace(_options.Smtp.Host))
        {
            throw new InvalidOperationException("Contact form email settings are not configured.");
        }
    }

    private static string BuildBody(ContactFormRequest request)
    {
        var body = new StringBuilder();
        body.AppendLine($"Name: {ValueOrFallback(request.Name)}");
        body.AppendLine($"Phone: {ValueOrFallback(request.Phone)}");
        body.AppendLine($"Email: {ValueOrFallback(request.Email)}");
        body.AppendLine($"Language: {ValueOrFallback(request.Language)}");
        body.AppendLine();
        body.AppendLine("Message:");
        body.AppendLine(ValueOrFallback(request.Message));
        return body.ToString();
    }

    private static string ValueOrFallback(string? value) =>
        string.IsNullOrWhiteSpace(value) ? "-" : value.Trim();
}
