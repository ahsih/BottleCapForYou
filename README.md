# BottleCapForYou

Homepage rebuild of the original Deyi Plastic Chemical website using ASP.NET Core and Angular.

## Languages Used

### Programming Languages

- C#
- TypeScript
- HTML
- CSS

### Spoken / Website Languages

- English
- Simplified Chinese (`zh-CN`)
- Arabic (`ar`)

## Frameworks and Tools

- .NET 10 / ASP.NET Core
- Angular 19
- Node.js 22 / npm

## Features

- Angular 19 frontend with runtime language switching
- ASP.NET Core backend with SPA proxy integration
- English, Chinese, and Arabic homepage content
- Video-supported company introduction section

## Run Locally

From the project directory:

```powershell
dotnet run
```

If needed, from `ClientApp`:

```powershell
npm install
npm start
```

## Build and Run with Docker

Build with the newest .NET 10 and OS patches available for the configured image tags:

```powershell
docker build --pull -t bottlecapforyou .
docker run --rm -p 8080:8080 --name bottlecapforyou bottlecapforyou
```

The application is available at `http://localhost:8080`.

## Project Structure

- `BottleCapForYou/` - ASP.NET Core app
- `BottleCapForYou/ClientApp/` - Angular frontend
- `BottleCapForYou/ClientApp/src/app/i18n/` - runtime translation files
