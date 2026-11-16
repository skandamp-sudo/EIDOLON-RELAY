# EIDOLON RELAY NEXUS — deployment

## Deploy on Vercel

1. Open https://vercel.com/new and import `skandamp-sudo/EIDOLON-RELAY`.
2. Select **Other** framework preset.
3. Leave **Root Directory** as repository root.
4. Leave **Build Command** empty and **Output Directory** empty (static site).
5. Deploy. Vercel serves root `index.html`, `web/style.css`, and `web/app.js`.

No environment variables or backend are needed for this browser-local demo. A public Vercel URL does **not** mean the app exchanges data between different users. Records are stored in each browser's localStorage. Sync is simulated and does not contact other devices.

## Run locally

From repository root: `python3 -m http.server 8080` and visit `http://localhost:8080`.

## Optional Railway backend later

A persistent API, PostgreSQL, authentication, secure record synchronization and transport controls are future phases. Do not deploy the Python CLI prototype as an emergency dispatch API.

## Safety

Not for actual emergency coordination, rescue dispatch, or verified incident reporting. Data is synthetic or entered locally. The 3D network is an illustrative visualization, not GPS or live telemetry.
