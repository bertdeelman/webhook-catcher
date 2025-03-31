# Webhook Catcher (Webhook.site Clone)

A minimal webhook listener and UI, deployable on Render with Express + TailwindCSS.

## Features
- Public webhook endpoint: `/webhook` (POST JSON)
- UI shows all received webhooks
- Click to view details
- Copy payload button
- Deploy as full web service

## Setup

```bash
npm install
npm run build
npm start
```

Then visit `http://localhost:3000`

## Deploy to Render
Create a new Web Service on Render, using:
- Build command: `npm run build`
- Start command: `npm start`
- Root directory (no subfolder)
