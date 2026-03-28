# syntax=docker/dockerfile:1

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl ca-certificates gnupg \
    && mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" > /etc/apt/sources.list.d/nodesource.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

COPY BottleCapForYou.sln ./
COPY NuGet.Config ./
COPY BottleCapForYou/BottleCapForYou.csproj BottleCapForYou/
COPY BottleCapForYou/ClientApp/package.json BottleCapForYou/ClientApp/
COPY BottleCapForYou/ClientApp/package-lock.json BottleCapForYou/ClientApp/

RUN dotnet restore BottleCapForYou/BottleCapForYou.csproj --configfile NuGet.Config

COPY BottleCapForYou/. ./BottleCapForYou/

RUN dotnet publish BottleCapForYou/BottleCapForYou.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

EXPOSE 8080

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "BottleCapForYou.dll"]
