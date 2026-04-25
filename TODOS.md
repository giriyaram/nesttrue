# NestTrue — TODOS

## P1 — Pre-Launch (Phase 1, weeks 1-2)

- [ ] Add `verdictBadge: "Buy" | "Caution" | "Avoid"` to `types/project.ts` (separate from `verdict` prose)
- [ ] Hand-curate `verdictBadge` values for all 14 project pages
- [ ] Update `app/[city]/projects/[slug]/page.tsx` to display verdict badge above price/status
- [ ] Fix LeadCTA copy: replace "No broker referrals" with transparent referral fee statement
- [ ] Add "How we make money" page at `/about/how-we-earn` (founder authors content)
- [ ] Verify real RERA numbers for all 14 projects (9 are placeholders — lookup at rera.telangana.gov.in)
- [ ] Add `reraLink: string` field to `ProjectData` type + populate all 14 projects
- [ ] Add sourcing labels to red flags (inline grey text, format: "(Source: RERA / HMDA / resident accounts)")
- [ ] Add NRI buying guide page: `app/hyderabad/nri-guide/page.tsx` (include FEMA disclaimer)
- [ ] Add `opengraph-image.tsx` per project and area page (verdict badge + price + score + logo)
- [ ] Scaffold Inngest infrastructure: `lib/inngest.ts`, `app/api/inngest/route.ts`, `inngest/functions/`
- [ ] Move existing fire-and-forget Inngest calls to proper function definitions
- [ ] Add WATI webhook signature verification (X-API-KEY header check)
- [ ] Add `waSessionId` dedup to WATI webhook (skip if same session ID fires twice)
- [ ] Add "Last verified: [date]" + possession disclaimer to all project pages
- [ ] Add double-submit protection to LeadCTA form (disable button on submit)
- [ ] Add basic event logging: CTA submissions, WATI webhook receipts

## P2 — Phase 2 (weeks 3-4)

- [ ] Build Inngest lead-message AI verdict step (Anthropic SDK + verdict JSON response)
- [ ] Prompt engineering: NestTrue voice, structured verdict format, prompt injection protection
- [ ] Implement fallback: if Anthropic timeout or no RERA citation → "warrants caution — chat with our team"
- [ ] Add WATI send reply via API on verdict completion
- [ ] Update Lead model: `waStatus: 'verdict-sent'` on success, `'failed'` on WATI send failure
- [ ] Test suite: Inngest function unit tests (happy path + failure paths + dedup)
- [ ] Admin dashboard: failed WATI send indicator, conversion toggle
- [ ] Track conversion: WATI conversation ID + weekly founder review

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

- [ ] **Automated feedback loop** — track which AI verdicts led to bookings for accuracy
  improvement. Requires user identity or post-booking callback.
  CONTEXT: Deferred because it requires an account system or developer partnership.
  DEPENDS ON: Meaningful verdict volume.
  EFFORT: M (CC: 1d)
