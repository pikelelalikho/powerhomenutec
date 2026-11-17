# Bedrock Surfaces platform
ASP.NET Core 8 API + React/Vite PWA + PostgreSQL.

## Run (3 terminals)
1. `docker compose up -d`            (PostgreSQL)
2. `cd api && dotnet run`            (API on http://localhost:5000, tables + seed data created automatically)
3. `cd web && npm install && npm run dev`   (site on http://localhost:5173)

Admin login (dev seed): `admin@bedrock.local` / `Admin123!`  -> http://localhost:5173/login
CHANGE the seed password and `Jwt:Key` before going live. Use `dotnet user-secrets` for secrets.

## Phone app
Deploy over HTTPS, open the site on your phone, choose "Add to Home Screen" (PWA).

## Production notes
Switch `EnsureCreated()` in Program.cs to EF migrations (`dotnet ef migrations add Init`), move uploads to S3/R2, set Cors:Origin.
