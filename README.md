# Life Luxe Travel

A rebuild of [lifeluxetravel.com](https://lifeluxetravel.com) as a
GoHighLevel **AI Studio**–compatible project.

React 19 · TypeScript · Vite 8 · TanStack Start + Router · Tailwind v4 ·
Lucide · React Hook Form + Zod · `@leadconnector/vite-tanstack-config`

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build into dist/
npm run typecheck  # tsc --noEmit
```

---

## Layout

```
src/
  routes/          TanStack file-based routes — one file per page
  components/      Reusable UI (nav, footer, heroes, buttons, cards, forms)
  integrations/    LeadConnector / GHL
  data/            All copy and content, typed
  styles.css       Tailwind v4 theme — the whole design system
public/
  images/          Brand photography, logo, certification badges
  favicon.svg, apple-touch-icon.png, site.webmanifest, robots.txt, sitemap.xml
```

Pages: `/`, `/about`, `/group-trips`, `/gallery`, `/testimonials`,
`/travel-style-guides`, `/blog`.

---

## Content is data, not markup

Every claim, caption, trip and testimonial lives in `src/data/`. To
change a price, a date or a stat, edit the data file — not a component.

| File | Holds |
|---|---|
| `data/site.ts` | Nav, contact, stats, certifications, "why us" |
| `data/trips.ts` | The hosted trip calendar, custom getaways, destinations |
| `data/journeys.ts` | Gallery photographs, grouped by journey |
| `data/testimonials.ts` | Guest testimonials |
| `data/content.ts` | Blog posts, style guides, Amazon disclosure |

**Everything in these files came from the live site or from Terry's own
photo archive.** Nothing is invented — no placeholder testimonials, no
made-up numbers. The stats (2,500+ lives impacted, 100+ trips, 34+
destinations) are Terry's published figures, carried over verbatim.
Confirm they are still current before launch.

---

## Lead capture

Two paths, deliberately.

**1. Hosted GHL embeds** — `integrations/GhlFormEmbed.tsx`
The checklist opt-in on the homepage. Posts straight into the CRM, so
existing workflows, tags and automations fire exactly as they do today.
Needs no credential, which is why there is nothing here to leak.

**2. The group enquiry form** — `components/EnquiryForm.tsx` +
`integrations/submitEnquiry.ts`
React Hook Form + Zod on the client, a TanStack server function on the
server. **It needs two environment variables to reach the CRM:**

```
GHL_API_KEY=<private integration token>
GHL_LOCATION_ID=<location id>
```

Set these in the AI Studio project's **server** environment. They are
read at call time inside the server function and never reach the
browser. Until they are set, the form validates and then shows its
fallback — Terry's email and the booking link — rather than silently
swallowing a lead.

The upsert sends `tags: ["website-group-enquiry"]`. GHL's upsert **adds**
tags; it does not replace them. Do not change this to send a full tag
array.

---

## Design system

`src/styles.css` is the whole thing — Tailwind v4 is CSS-first, so the
`@theme` block there generates the utilities.

Three pinks, because one cannot pass contrast everywhere:

| Token | Use | Measured |
|---|---|---|
| `--color-brand` `#d1296a` | Fills, large text on light | 4.64:1 on cream |
| `--color-brand-deep` `#b31f54` | Small text on the tinted band | 5.65:1 on ivory |
| `--color-brand-lift` `#f08fb4` | Anything on a dark ground | 8.7:1 on ink |

Full-strength `--brand` has a luminance of 0.1618, so it can never reach
4.5:1 against any backdrop darker than itself. On dark it must be
`--brand-lift`.

Fonts are Playfair Display (display) and Lato (body), loaded from Google
Fonts in `routes/__root.tsx`.

### Verified, not assumed

Contrast was measured by **sampling rendered pixels**, not by reading
computed styles — a computed style cannot describe text sitting over a
photograph plus a gradient scrim in a sibling element. The page is
rendered twice, once with every glyph set to `color: transparent`, and
the real backdrop is sampled from the second capture.

Across 7 pages × 2 viewports: **1,011 text runs measured, 0 failures**,
tightest passing margin 4.77:1. Also 0 horizontal overflow, 0 images
without `alt`, 0 console errors.

That method found three real bugs a computed-style check had missed —
gallery captions at 2.79:1 on a phone, the hero subtitle at 4.00:1, and
the current-page nav link at 3.74:1 over a bright photo.

---

## One deliberate config flag

`vite.config.ts` sets `serverFnErrorLogger: false`.

That plugin patches `@tanstack/start-server-core` by matching an exact
source string, and it throws at SSR time against this version:

```
unsupported @tanstack/start-server-core server-functions-handler
transform: expected "const unwrapped = res.result || res.error"
```

It is a diagnostic wrapper, not a runtime requirement. Turning it off
costs prettier server-function stack traces in the sandbox and nothing
else. Remove the flag when a future preset release supports this version.

---

## Before launch

- [ ] Confirm the stat figures are still current.
- [ ] Set `GHL_API_KEY` / `GHL_LOCATION_ID` if the enquiry form should
      reach the CRM.
- [ ] Blog posts and style guides currently link out to the GHL site;
      move the bodies in when ready.
- [ ] Terry's portrait is 300×400 — the largest the GHL media library
      holds. A higher-resolution original would let it be used larger.
- [ ] Anyone recognisable in the photographs should be happy to appear.

## Images

All photography is Terry's own, from real Life Luxe journeys.
**EXIF was stripped on export** — the originals are geotagged to the
metre and these are public. Keep it that way if you re-export.
