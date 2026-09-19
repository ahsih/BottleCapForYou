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
    options.KnownIPNetworks.Clear();
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

// Collapse trailing slashes onto the canonical, slash-free form. Covers the
// localized paths (/zh/, /ar/products/, ...) without needing a list of routes.
app.Use(async (context, next) =>
{
    var path = context.Request.Path.Value;
    if (path is { Length: > 1 } && path.EndsWith('/'))
    {
        context.Response.Redirect(string.Concat(path.TrimEnd('/'), context.Request.QueryString), permanent: true);
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

// Serve the prerendered (SSG) HTML that `ng build` emits for these routes, so
// crawlers and the Ads landing-page check receive real content instead of the
// empty <app-root> shell. Each component sets its own title, description and
// canonical tag through Angular's Title/Meta services during prerendering, so
// no HTML post-processing is needed here.
//
// These are mapped explicitly rather than via UseDefaultFiles(), which would
// redirect "/products" to "/products/" and collide with the trailing-slash
// redirect above, producing a permanent redirect loop.
//
// English is served from the root; the other languages live under a prefix, so
// each language version has its own crawlable, indexable URL. These must stay
// in step with LANGUAGE_PREFIX and PAGE_PATH in ClientApp/src/app/core/locale.ts.
// "news" is English-only: its content is not translated yet, so it has no /zh
// or /ar variant. See LOCALIZED_PAGES in ClientApp/src/app/core/locale.ts.
string[] englishPages = ["news", "products", "thank-you"];
string[] localizedPages = ["products", "thank-you"];

foreach (var page in englishPages)
{
    app.MapGet($"/{page}", () => ServePrerenderedPage(app.Environment, page));
}

foreach (var prefix in new[] { "zh", "ar" })
{
    // The localized home pages: /zh and /ar. English home is the fallback below.
    app.MapGet($"/{prefix}", () => ServePrerenderedPage(app.Environment, prefix));

    foreach (var page in localizedPages)
    {
        var route = $"{prefix}/{page}";
        app.MapGet($"/{route}", () => ServePrerenderedPage(app.Environment, route));
    }

    // Prefixed URLs for English-only pages are never generated. Point them at
    // the page that does exist rather than letting the catch-all answer 200
    // with the English home page, which would read as duplicate content.
    foreach (var page in englishPages.Except(localizedPages))
    {
        var target = page;
        app.MapGet($"/{prefix}/{target}", (HttpContext context) =>
            Results.Redirect($"/{target}{context.Request.QueryString}", permanent: true));
    }
}

// One page per product, prerendered to wwwroot/<prefix>/products/<slug>/index.html.
// The slug is matched against the prerendered directories rather than a list
// duplicated here, so adding a product needs no change on the server side.
app.MapGet("/products/{slug}", (string slug) =>
    ServePrerenderedProduct(app.Environment, string.Empty, slug));

foreach (var prefix in new[] { "zh", "ar" })
{
    var languagePrefix = prefix;
    app.MapGet($"/{languagePrefix}/products/{{slug}}", (string slug) =>
        ServePrerenderedProduct(app.Environment, languagePrefix, slug));
}

app.MapFallbackToFile("index.html");

app.Run();

/// <summary>
/// Serves one product's prerendered page. Unknown slugs fall through to a 404
/// rather than the catch-all, so a mistyped or withdrawn product URL is not
/// answered with 200 and the home page.
/// </summary>
static IResult ServePrerenderedProduct(IWebHostEnvironment environment, string languagePrefix, string slug)
{
    // Slugs are generated from a fixed alphabet; anything else is not ours and
    // must never reach the filesystem.
    if (string.IsNullOrEmpty(slug) || slug.Length > 120 ||
        !slug.All(c => (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || c == '-'))
    {
        return Results.NotFound();
    }

    var route = languagePrefix.Length > 0
        ? $"{languagePrefix}/products/{slug}"
        : $"products/{slug}";

    return ServePrerenderedPage(environment, route);
}

static IResult ServePrerenderedPage(IWebHostEnvironment environment, string route)
{
    var webRoot = environment.WebRootPath;
    if (string.IsNullOrWhiteSpace(webRoot))
    {
        return Results.NotFound();
    }

    // Split so the segments join with the platform separator rather than
    // relying on '/' being accepted inside a path component.
    var segments = route.Split('/', StringSplitOptions.RemoveEmptyEntries);
    var pagePath = Path.Combine([webRoot, .. segments, "index.html"]);

    return File.Exists(pagePath)
        ? Results.File(pagePath, "text/html; charset=utf-8")
        : Results.NotFound();
}

