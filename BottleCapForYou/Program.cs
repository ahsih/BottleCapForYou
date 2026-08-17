using BottleCapForYou.Models;
using BottleCapForYou.Services;
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.Configure<ContactFormOptions>(builder.Configuration.GetSection("ContactForm"));
builder.Services.Configure<AnalyticsOptions>(builder.Configuration.GetSection("Analytics"));
builder.Services.AddScoped<ContactFormEmailSender>();
builder.Services.AddSingleton<AnalyticsRepository>();
builder.Services.AddHostedService<AnalyticsSchemaInitializer>();
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.KnownNetworks.Clear();
    options.KnownProxies.Clear();
});

var app = builder.Build();

app.UseForwardedHeaders();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.Use(async (context, next) =>
{
    const string canonicalHost = "bottlecapforyou.com";
    const string alternateHost = "www.bottlecapforyou.com";

    if (string.Equals(context.Request.Host.Host, alternateHost, StringComparison.OrdinalIgnoreCase))
    {
        var redirectUri = string.Concat(
            "https://",
            canonicalHost,
            context.Request.PathBase,
            context.Request.Path,
            context.Request.QueryString);

        context.Response.Redirect(redirectUri, permanent: true);
        return;
    }

    await next();
});

app.Use(async (context, next) =>
{
    if (string.Equals(context.Request.Path.Value, "/news/", StringComparison.OrdinalIgnoreCase))
    {
        context.Response.Redirect(string.Concat("/news", context.Request.QueryString), permanent: true);
        return;
    }

    await next();
});

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllers();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapGet("/news", ServeNewsIndexAsync);

app.MapFallbackToFile("index.html");

app.Run();

static async Task ServeNewsIndexAsync(HttpContext context)
{
    const string homeTitle = "5 Gallon Bottle Cap Manufacturer | China Factory";
    const string homeDescription = "HuiZhou DingYuan Gaiye Plastic Co., Ltd. China Manufacturing Factory supplying 5 gallon water bottle caps, sealing liners and OEM plastic closures.";
    const string homeOgDescription = "China Manufacturing Factory for 5 gallon water bottle caps, sealing liners and OEM supply.";
    const string homeCanonicalUrl = "https://bottlecapforyou.com/";
    const string newsTitle = "Bottle Cap Factory News and Production Updates | Bottle Cap For You";
    const string newsDescription = "Watch recent bottle cap factory videos, production updates and export supply news from HuiZhou DingYuan Gaiye Plastic Co., Ltd.";
    const string newsCanonicalUrl = "https://bottlecapforyou.com/news";

    var webRoot = context.RequestServices.GetRequiredService<IWebHostEnvironment>().WebRootPath;
    if (string.IsNullOrWhiteSpace(webRoot))
    {
        context.Response.StatusCode = StatusCodes.Status404NotFound;
        return;
    }

    var indexPath = Path.Combine(webRoot, "index.html");
    if (!File.Exists(indexPath))
    {
        context.Response.StatusCode = StatusCodes.Status404NotFound;
        return;
    }

    var html = await File.ReadAllTextAsync(indexPath, context.RequestAborted);
    html = html
        .Replace($"<title>{homeTitle}</title>", $"<title>{newsTitle}</title>")
        .Replace($"content=\"{homeTitle}\"", $"content=\"{newsTitle}\"")
        .Replace($"content=\"{homeDescription}\"", $"content=\"{newsDescription}\"")
        .Replace($"content=\"{homeOgDescription}\"", $"content=\"{newsDescription}\"")
        .Replace($"content=\"{homeCanonicalUrl}\"", $"content=\"{newsCanonicalUrl}\"")
        .Replace($"href=\"{homeCanonicalUrl}\"", $"href=\"{newsCanonicalUrl}\"");

    context.Response.ContentType = "text/html; charset=utf-8";
    await context.Response.WriteAsync(html, context.RequestAborted);
}
