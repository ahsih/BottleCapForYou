namespace BottleCapForYou.Models;

public sealed class ContactFormRequest
{
    public string Name { get; init; } = string.Empty;
    public string Phone { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
    public string Message { get; init; } = string.Empty;
    public string Language { get; init; } = string.Empty;
}
