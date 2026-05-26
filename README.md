# BK Lab Homepage Renewal

This package preserves the richer Claude-generated Next.js design/content while applying only the technical fixes needed for local development and deployment.

## Run locally

```bash
npm install --no-audit --no-fund
npm run dev
```

Open http://localhost:3000.

## Build check

```bash
npm run build
```

## Notes

- Do not run `npm ci` until your own `package-lock.json` has been generated locally.
- This archive intentionally excludes the previous lockfile because it referenced an internal npm registry.
- Existing Claude-designed pages and sections are kept as much as possible.
- Missing `/research-data` and `/websites` pages have been added.
- Image directories are prepared under `public/images/`.
- Publications can be bulk-imported later from Excel, CSV, BibTeX, or the previous Google Sites page.
