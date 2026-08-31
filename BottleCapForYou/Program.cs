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
    var path = context.Request.Path.Value;
    if (string.Equals(path, "/news/", StringComparison.OrdinalIgnoreCase) ||
        string.Equals(path, "/products/", StringComparison.OrdinalIgnoreCase))
    {
        context.Response.Redirect(string.Concat(path!.TrimEnd('/'), context.Request.QueryString), permanent: true);
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
app.MapGet("/products", ServeProductsIndexAsync);

app.MapFallbackToFile("index.html");

app.Run();

static Task ServeNewsIndexAsync(HttpContext context)
{
    const string title = "Bottle Cap Factory News and Production Updates | Bottle Cap For You";
    const string description = "Watch recent bottle cap factory videos, production updates and export supply news from HuiZhou DingYuan Gaiye Plastic Co., Ltd.";
    const string canonicalUrl = "https://bottlecapforyou.com/news";

    return ServeIndexWithSeoAsync(context, title, description, canonicalUrl);
}

static Task ServeProductsIndexAsync(HttpContext context)
{
    const string title = "Bottle Cap & Packaging Products | 5 Gallon Water Catalogue";
    const string description = "Browse 5 gallon water bottle caps, bottles, carrying handles, packaging accessories, sealing liners and two-color cap options from HuiZhou DingYuan Gaiye Plastic Co., Ltd.";
    const string canonicalUrl = "https://bottlecapforyou.com/products";

    return ServeIndexWithSeoAsync(context, title, description, canonicalUrl);
}

static async Task ServeIndexWithSeoAsync(
    HttpContext context,
    string pageTitle,
    string pageDescription,
    string pageCanonicalUrl)
{
    const string homeTitle = "5 Gallon Bottle Cap Manufacturer | China Factory";
    const string homeDescription = "HuiZhou DingYuan Gaiye Plastic Co., Ltd. China Manufacturing Factory supplying 5 gallon water bottle caps, sealing liners and OEM plastic closures.";
    const string homeOgDescription = "China Manufacturing Factory for 5 gallon water bottle caps, sealing liners and OEM supply.";
    const string homeCanonicalUrl = "https://bottlecapforyou.com/";

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
        .Replace($"<title>{homeTitle}</title>", $"<title>{pageTitle}</title>")
        .Replace($"content=\"{homeTitle}\"", $"content=\"{pageTitle}\"")
        .Replace($"content=\"{homeDescription}\"", $"content=\"{pageDescription}\"")
        .Replace($"content=\"{homeOgDescription}\"", $"content=\"{pageDescription}\"")
        .Replace($"content=\"{homeCanonicalUrl}\"", $"content=\"{pageCanonicalUrl}\"")
        .Replace($"href=\"{homeCanonicalUrl}\"", $"href=\"{pageCanonicalUrl}\"");

    context.Response.ContentType = "text/html; charset=utf-8";
    await context.Response.WriteAsync(html, context.RequestAborted);
}
