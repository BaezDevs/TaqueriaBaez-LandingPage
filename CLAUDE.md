# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A small static site for **Taqueria Baez**, a Fort Worth, TX taco truck: a light, mobile-first home/"Find Us" page (`index.html`) plus two SMS-compliance legal pages (`privacy-policy.html`, `terms.html`). Pure HTML + CSS — no build step, no JavaScript framework, no package manager, no tests. The home page content tracks the business's phase (git history: "coming soon" → "we're moving" → the current permanent "Find us at 2020 Azle Ave").

## Develop & preview

There is nothing to compile. Edit files and reload the browser.

```bash
# Serve locally (browser caches CDN assets; a server avoids file:// quirks)
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy

Hosted on **GitHub Pages** with the custom domain in `CNAME` (`www.taqueriabaez.com`). Pushing to `main` publishes the site — there is no CI/build. Active branches: `main` (live), `dev`, `dev-hector`. Do work on a branch and merge to `main` to ship.

## Architecture

- **`index.html`** — the home page: a light, mobile-first "Find Us" layout (slim header → "Find us at…" hero → three fact rows for location/phone/hours → action buttons → embedded Google Map → tagline → footer). No framework: layout is hand-written CSS and icons are **inline SVG** (no icon font). A small inline `<script>` at the bottom is progressive enhancement only — it flips the hours pill to live "Open now"/"Closed now" in `America/Chicago`; the page is fully functional with JS disabled.
- **`privacy-policy.html` / `terms.html`** — SMS/text-messaging legal pages required for **Twilio A2P 10DLC** campaign registration. They share `main.css` and the same light theme and footer as the home page. Their body copy is TCPA/CTIA compliance language (STOP/HELP opt-out, "no mobile information shared with third parties") — treat it as legally reviewed; don't reword disclosures casually. Linked from every page's footer (`.footer-links`), which is itself a compliance requirement.
- **`assets/css/main.css`** — the entire theme for all pages, hand-written (no Materialize). The light palette is driven entirely by CSS custom properties in `:root` (`--bg`, `--surface`, `--text`, `--muted`, `--hairline`, `--accent`, `--accent-text`, `--accent-tint`, `--status-green`); change colors there, not in individual rules. `--accent` (salsa red `#D7382B`) is the single accent for fills/icons/borders; `--accent-text` (`#BC2A20`) is the darker variant for link/button **text** so it clears WCAG AA contrast; `--status-green` is reserved for the functional Open-now pill only. The legal-page styles (`.container`, `.nav-legal`, `.legal-content`, `.contact-block`, `.footer-links`) live at the bottom of the file.
- **The embedded map** uses the keyless `https://www.google.com/maps?q=...&output=embed` iframe (no API key). The address text + "Get Directions"/"Open in Google Maps" links are the source of truth and work independently of the iframe.
- **`assets/img/`** — favicons, app icons, logo, and `site.webmanifest`. **`assets/fonts/`** — the bundled **Anton** display font, loaded via `@font-face` in `main.css` and used only for the wordmark and tagline (body text is Inter; headline is Space Grotesk, both still from Google Fonts).

## Keep SEO/business data in sync (most important gotcha)

The business's address, hours, and phone number are **duplicated in several places** and must be updated together whenever the details change:

- `index.html` visible content (the hero `<h1>` and the three fact rows).
- `index.html` `<meta name="description">` and `<meta name="keywords">`.
- `index.html` Schema.org **JSON-LD** block (`@type: FoodEstablishment`) — `address`, `geo` lat/long, `openingHoursSpecification`, `telephone`, `priceRange`.
- The address/phone also appear in the footer of all three pages and inside both legal pages' "Contact Us" blocks.
- `sitemap.xml` — update `<lastmod>` on content changes.

Every absolute URL uses the **`www`** host: `CNAME`, every page's `<link rel="canonical">`, the `url`/`image` fields in the JSON-LD, and all `<loc>` entries in `sitemap.xml` must stay on `https://www.taqueriabaez.com/`. `google0c6849f8c12510a3.html` is a Google Search Console verification token — do not rename or remove it.
