@AGENTS.md

# NestTrue

Honest, hyperlocal real estate research platform for Indian buyers. Not a portal or broker — a buyer intelligence tool with real prices, appreciation data, red flags, and a WhatsApp-based AI qualification flow.

## Stack

- **Next.js 16.2.4** (App Router, React Compiler enabled) — read `node_modules/next/dist/docs/` before using any Next.js API
- **React 19** + **TypeScript**
- **Tailwind CSS v4** (`@import "tailwindcss"` syntax — not v3 `@tailwind` directives)
- **Prisma 5.22** + **PostgreSQL** (Supabase)
- **Inngest** — background jobs and WhatsApp qualification flow
- **WATI** — WhatsApp Business API
- **Resend** — email notifications
- **Anthropic SDK** — lead scoring via Claude
- **lucide-react** — icons

## Commands

```bash
npm run dev      # start dev server
npm run build    # production build
npm run lint     # eslint
npx prisma studio          # browse database
npx prisma migrate dev     # run migrations
npx prisma generate        # regenerate client after schema changes
```

## Project Structure

```
app/
  page.tsx                    # homepage (city list)
  layout.tsx                  # root layout + metadata
  globals.css                 # design tokens + Tailwind import
  robots.ts / sitemap.ts      # SEO
  [city]/
    layout.tsx                # city shell (Navbar + Footer)
    page.tsx                  # city hub (areas grid)
    [area]/page.tsx           # full area analysis
    compare/[slug]/page.tsx   # side-by-side area comparison
    market-report/page.tsx    # quarterly market report
    projects/[slug]/page.tsx  # individual project deep-dive
  admin/
    page.tsx                  # leads dashboard
    leads/page.tsx
    login/page.tsx
  api/
    leads/route.ts            # POST — capture lead, fire Inngest event
    admin/leads/[id]/route.ts # PATCH — update lead
    admin/login/route.ts      # POST — set session cookie
    admin/logout/route.ts     # POST — clear session cookie
    webhooks/wati/route.ts    # WATI webhook (incoming WhatsApp messages)

components/
  Navbar.tsx / Footer.tsx / Logo.tsx
  LeadCTA.tsx                 # WhatsApp CTA card
  ScoreBar.tsx                # visual score indicator

data/
  cities.ts                   # city registry (slug, name, topAreas, tagline)
  hyderabad/
    index.ts                  # hyderabadMeta + hyderabadAreas record
    areas/*.ts                # one file per area (AreaData type)
    projects/*.ts             # one file per project (ProjectData type)
    comparisons/*.ts          # comparison data
  bangalore/
    index.ts                  # placeholder (no areas yet)

lib/
  prisma.ts                   # singleton Prisma client
  auth.ts                     # cookie-based admin auth (ADMIN_PASSWORD env)
  utils.ts                    # cn() helper (clsx + tailwind-merge)

types/
  area.ts / city.ts / comparison.ts / project.ts

prisma/
  schema.prisma               # Lead model only
```

## Data Model

All content is static TypeScript files in `data/` — no CMS. To add a city: create `data/<city>/index.ts` exporting `<city>Meta` and `<city>Areas`, then register in `data/cities.ts` and handle in `app/[city]/page.tsx`.

**Lead** (Prisma): phone (unique), city, area, budget, timeline, purpose, WhatsApp session state, AI score, qualified flag, status.

## Design Tokens

Defined in `globals.css` and exposed via Tailwind `@theme inline`:

| Token | Value | Usage |
|---|---|---|
| `navy` | `#0a2540` | Primary text, headings, hero BG |
| `trust-blue` | `#1d4ed8` | CTAs, interactive elements |
| `true-accent` | `#4db8ff` | Accent text on dark BG |
| `surface` | `#f5f7fa` | Page background, card BG |
| `honest-red` | `#e24b4a` | Red flags, warnings |

Fonts: `font-display` = Playfair Display (headings), `font-sans` = DM Sans (body). Both loaded from Google Fonts in `globals.css`.

## Key Conventions

- `params` in App Router pages is a `Promise<{...}>` — always `await params` before use (Next.js 16 breaking change)
- Static pages use `generateStaticParams()` + `notFound()` for unknown slugs
- Lead capture fires an Inngest event `lead/created` — the WhatsApp flow lives in Inngest functions (not in the repo yet)
- Admin auth is a simple cookie (`nesttrue_admin=authenticated`) checked via `isAdminAuthenticated()` in `lib/auth.ts`
- Indian phone validation: `/^[6-9]\d{9}$/`
- Area files export a default `AreaData` object — no dynamic fetching, all data is build-time

## Environment Variables

See `.env.example`. Required for full functionality:
- `DATABASE_URL` — Supabase PostgreSQL connection string
- `ADMIN_PASSWORD` — admin panel password
- `INNGEST_EVENT_KEY` + `INNGEST_SIGNING_KEY` — background jobs
- `WATI_API_ENDPOINT` + `WATI_ACCESS_TOKEN` — WhatsApp
- `RESEND_API_KEY` — email
- `ANTHROPIC_API_KEY` — lead scoring

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
- Save progress, checkpoint, resume → invoke checkpoint
- Code quality, health check → invoke health
