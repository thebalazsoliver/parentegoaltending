# Parente Goaltending Website

Cloudflare Pages ready Vite/React project.

## Local setup

```bash
npm install
npm run build
npm run dev
```

## Cloudflare Pages settings

- Framework preset: Vite
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`
- Production branch: `main`

## Important

This version does not require `framer-motion`, so the previous `MISSING_EXPORT` build error is removed.

## Instagram feed

The frontend calls `/api/instagram/latest`. Until API tokens are added, the site shows fallback Instagram cards.
