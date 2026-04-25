# NestTrue — TODOS

## P1 — Pre-Launch (Phase 1, weeks 1-2)

- [ ] Add `verdictBadge: "Buy" | "Caution" | "Avoid"` to `types/project.ts` (separate from `verdict` prose)
- [ ] Add `verdictBadge: "Buy" | "Caution" | "Avoid"` to `types/area.ts` (for area-level verdict display)
- [ ] Hand-curate `verdictBadge` values for all 14 project pages
- [ ] Hand-curate `verdictBadge` values for all 8 area data files
- [ ] Consolidate project registry: create `hyderabadProjects: Record<string, ProjectData>` in `data/hyderabad/index.ts` (mirrors `hyderabadAreas`). Refactor `app/[city]/projects/[slug]/page.tsx` to import from the registry and derive `generateStaticParams` from `Object.keys()`.
- [ ] Update `app/[city]/projects/[slug]/page.tsx` to display verdict badge above price/status
- [ ] Fix LeadCTA copy: replace "No broker referrals" with transparent referral fee statement
- [ ] Add "How we make money" page at `/about/how-we-earn` (founder authors content)
- [ ] Verify real RERA numbers for all 14 projects (9 are placeholders — lookup at rera.telangana.gov.in)
- [ ] Add `reraLink: string` field to `ProjectData` type + populate all 14 projects
- [ ] Add `source?: string` to `RedFlag` type in `types/area.ts`. Update all area data files with source values. Render as grey badge below red flag detail in `app/[city]/[area]/page.tsx`.
- [ ] Add NRI buying guide page: `app/[city]/nri-guide/page.tsx` with `generateStaticParams` returning `[{ city: "hyderabad" }]` (include FEMA disclaimer)
- [ ] Add `opengraph-image.tsx` per project and area page (verdict badge + price + score + logo)
- [ ] Scaffold Inngest infrastructure: `lib/inngest.ts` (Inngest client), `app/api/inngest/route.ts` (export GET + POST + PUT via `serve()`), `inngest/functions/` directory
- [ ] Migrate Inngest event sending from raw `fetch("https://inn.gs/e/" + KEY)` to `inngest.send()` SDK call in both `app/api/leads/route.ts` and `app/api/webhooks/wati/route.ts`
- [ ] Add WATI outbound intro message in `inngest/functions/lead-qualify.ts`: when `lead/created` fires, send "Hi [name], I'm the NestTrue assistant..." via WATI API
- [ ] Move existing fire-and-forget Inngest event definitions to proper Inngest function stubs
- [ ] Add Vitest to the project (`npm install -D vitest @vitejs/plugin-react`) and configure in `vitest.config.ts`
- [ ] Write test: WATI webhook auth — missing X-API-KEY → 401; valid key → processes message
- [ ] Add WATI webhook signature verification (X-API-KEY header check)
- [ ] Add message-level dedup to WATI webhook: check `body.id` against `Lead.lastMessageId`; skip if match. Add `lastMessageId String?` to Prisma Lead schema + run migration.
- [ ] Add "Last verified: [date]" + possession disclaimer to all project pages
- [ ] Add double-submit protection to LeadCTA form (disable button on submit)
- [ ] Add basic event logging: CTA submissions, WATI webhook receipts
- [ ] Fix `app/sitemap.ts` — add missing 4 project slugs: auro-regent, aparna-serene-park, aparna-luxor-park, myhome-mangala
- [ ] Add rate limiting to `app/api/admin/login/route.ts` (max 5 attempts / 15 min per IP)

## P2 — Phase 2 (weeks 3-4)

- [ ] Build project name matching: normalize buyer WhatsApp text ("ramky", "Godrej madison") → project slug. Use fuzzy match against `Object.keys(hyderabadProjects)`. Return closest match above 0.7 similarity threshold; below threshold, ask follow-up question.
- [ ] Build Inngest lead-message AI verdict step (Anthropic SDK + verdict JSON response)
- [ ] Prompt engineering: NestTrue voice, structured verdict format, prompt injection protection
- [ ] Implement fallback: if Anthropic timeout or no RERA citation → "warrants caution — chat with our team"
- [ ] Add WATI send reply via API on verdict completion
- [ ] Update Lead model: `waStatus: 'verdict-sent'` on success, `'failed'` on WATI send failure
- [ ] Test suite (Vitest): Inngest lead-message function
    - Happy path: valid project + budget → verdict JSON → WATI send
    - Failure: Anthropic timeout (60s) → fallback message sent
    - Failure: Anthropic returns non-JSON → fallback message sent
    - Failure: WATI send fails → Lead.waStatus = 'failed', logged
    - Dedup: same body.id fires twice → second skipped
    - Edge: project not in DB → area-only response
- [ ] Admin dashboard: failed WATI send indicator, conversion toggle
- [ ] Add `converted: Boolean @default(false)` and `convertedAt: DateTime?` to Prisma Lead schema (migration). "Converted" = buyer confirmed booking. This enables retroactive attribution before leads accumulate.
- [ ] Track conversion: WATI conversation ID + admin conversion toggle + weekly founder review

## P3 — Post-Traction

- [ ] **Project Construction Tracker** — monthly WhatsApp updates for watched projects.
  CONTEXT: RERA data too patchy (developers don't update reliably). Needs resident-sourced
  or developer-submitted data. Revisit after AI WhatsApp flow has users.
  DEPENDS ON: Phase 2 WhatsApp flow live, reliable data source identified.
  EFFORT: M (CC: 1-2d)

- [ ] **CMS Migration** — at 50+ projects or 3+ cities, TypeScript data files become a
  content ops bottleneck. Migrate to Contentful/Sanity/Notion.
  CONTEXT: Every content update requires a code deploy. Fine at current scale.
  Becomes problematic when content ops team can't deploy independently.
  EFFORT: L (CC: 2-3d)

- [ ] **Resident Intelligence Layer** — verified residents contribute hyperlocal intel
  (water tanker frequency, maintenance quality, actual commute times) in exchange for
  early access to new area analyses or a verified resident badge.
  CONTEXT: This is the data moat — no competitor can buy this. Builds over time.
  DEPENDS ON: User base large enough to seed the community.
  EFFORT: XL (CC: 1 week)

- [ ] **Admin leads pagination** — add limit/offset pagination to admin leads query when leads exceed 200. Currently fetches all records.
  EFFORT: S (CC: 15min)

- [ ] **Automated feedback loop** — track which AI verdicts led to bookings for accuracy
  improvement. Requires user identity or post-booking callback.
  CONTEXT: Deferred because it requires an account system or developer partnership.
  DEPENDS ON: Meaningful verdict volume.
  EFFORT: M (CC: 1d)
