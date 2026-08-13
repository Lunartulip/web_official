# LunarTulip Lab Official Website

Official bilingual website for Lunartulip Lab, an AI-native independent public-equities research institution focused on global AI technology markets.

## What is included

- Chinese / English language switching
- Responsive institutional research website
- Discretionary fundamental and systematic quantitative research
- Deep Dives, Authority Ledger and Research Desk interface samples
- Research methods, workflow interactions and Research Notes taxonomy
- Official contact entry: `t.stephanie@lunartuliplab.com`

This repository contains only the public website. It intentionally excludes internal research data, strategy code, client materials, trading logs, credentials, and private LunarTulip Lab assets.

## Local development

Requirements:

- Node.js `>=22.13.0`
- npm

```bash
npm ci
npm run dev
```

Open the local address printed by Vite.

## Production build

```bash
npm ci
npm run build
npm run start
```

The default scripts use the standard Next.js runtime and work on Windows, macOS and Linux. The optional `*:cloudflare` scripts require Bash/Linux tooling.

For the Singapore-server migration, Nginx, HTTPS, DNS and service setup, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Main source files

- `app/page.tsx` — page content and interactions
- `app/globals.css` — visual system and responsive layout
- `app/layout.tsx` — document metadata and root layout
- `public/` — public brand and visual assets

## Security boundary

Never commit:

- `.env` files
- SSH keys or TLS private keys
- GitHub, Alibaba Cloud or server tokens
- trading records, positions or strategy parameters
- private Notion exports or client deliverables

## Contact

`t.stephanie@lunartuliplab.com`
