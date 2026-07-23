# MySQL Analytics Setup

The website records first-party analytics through `/api/analytics/track`.

The backend creates these tables automatically when a MySQL connection string is configured:

- `analytics_sessions`
- `analytics_page_visits`
- `analytics_events`

## Local Setup

Create a MySQL database:

```sql
CREATE DATABASE bottlecapforyou_analytics
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

Store the real connection string outside committed JSON:

```powershell
cd C:\Work\BottleCapForYou\BottleCapForYou

dotnet user-secrets set "ConnectionStrings:AnalyticsMySql" "Server=localhost;Port=3306;Database=bottlecapforyou_analytics;User ID=YOUR_USER;Password=YOUR_PASSWORD;SslMode=Preferred;"
dotnet user-secrets set "Analytics:IpHashSalt" "replace-with-a-long-random-secret"
```

For production, set the same values as environment variables or hosting-provider secrets.

## Useful Queries

Daily visits:

```sql
SELECT
  DATE(first_seen_utc) AS visit_date,
  COUNT(*) AS sessions,
  ROUND(AVG(TIMESTAMPDIFF(SECOND, first_seen_utc, last_seen_utc))) AS avg_session_seconds
FROM analytics_sessions
GROUP BY DATE(first_seen_utc)
ORDER BY visit_date DESC;
```

Most viewed pages:

```sql
SELECT
  path,
  COUNT(*) AS page_views,
  SUM(active_seconds) AS active_seconds
FROM analytics_page_visits
GROUP BY path
ORDER BY page_views DESC;
```

Best traffic sources:

```sql
SELECT
  COALESCE(NULLIF(utm_source, ''), 'direct') AS source,
  COUNT(*) AS sessions
FROM analytics_sessions
GROUP BY COALESCE(NULLIF(utm_source, ''), 'direct')
ORDER BY sessions DESC;
```

Contact and sample clicks:

```sql
SELECT
  event_name,
  COUNT(*) AS clicks
FROM analytics_events
WHERE event_name IN ('contact_click', 'sample_request_click')
GROUP BY event_name;
```
