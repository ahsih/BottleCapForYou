namespace BottleCapForYou.Models;

public sealed class AnalyticsOptions
{
    public bool Enabled { get; set; } = true;
    public string ConnectionStringName { get; set; } = "AnalyticsMySql";
    public string IpHashSalt { get; set; } = string.Empty;
}
