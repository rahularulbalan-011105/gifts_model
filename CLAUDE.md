# GiftPartner.in — Project Guide (CLAUDE.md)

Reference for anyone (human or AI) working on this codebase. Read this first.

## What this is

GiftPartner.in is a gifting & personal-shopping service for **NRIs (and locals)
to send gifts and shop authentic products from Chennai**. Two core offerings:

- **Gift as a Service** — curated gifts for occasions (birthday, wedding, festival…).
- **Shopping as a Service** — we buy products (clothing, jewellery, pooja items…)
  from trusted Chennai stores on the customer's behalf.

The flow: customer shares a requirement (often via WhatsApp) → we source options
and share photos/videos → customer approves → we buy, pack, and deliver, with an
order status timeline they can track.

## Tech stack

| Concern        | Choice                                              |
| -------------- | --------------------------------------------------- |
| Framework      | **Next.js 16** (App Router, React 19, Turbopack)    |
| Language       | TypeScript (strict)                                 |
| Styling        | **Tailwind CSS v4** (CSS-first config in globals.css) |
| UI primitives  | Hand-rolled in `src/components/ui` + `lucide-react` icons |
| Auth           | **Auth.js / NextAuth v5** (JWT sessions)            |
| Database/ORM   | **PostgreSQL + Prisma 6**                           |
| Validation     | **Zod** (shared client + server schemas)            |
| Forms          | react-hook-form + `@hookform/resolvers/zod`         |
| Passwords      | bcryptjs (cost 12)                                  |

> Note: Prisma is pinned to **v6**, not v7. Prisma 7 moved the datasource URL
> out of `schema.prisma` into a driver-adapter config and is still stabilising.
> v6 is the mature line. Don't `npm update` Prisma across the major without a plan.

## Project structure

```
src/
  app/
    (marketing)/        # public site — shares Header + Footer
      page.tsx            # 1. Home / landing
      how-it-works/       # 2.
      services/           # 3. Services overview
      gift-as-a-service/  # 4. (client gallery w/ category tabs)
      shopping-as-a-service/ # 5.
      request/            # 6. Request a Personal Shopper (form -> /api/shopper-request)
      pricing/            # 7. (client billing toggle)
      track/              # 8. Public order lookup (demo timeline)
      testimonials/       # 12.
      faq/                # 13.
      contact/            # 14. (form -> /api/contact)
      privacy/, terms/    # legal stubs (REPLACE before launch)
    (auth)/
      login/              # 15. Login + Signup side-by-side
    (app)/                # AUTH-PROTECTED, dashboard sidebar shell
      dashboard/          # 9. Customer dashboard (reads orders from DB)
    (checkout)/           # AUTH-PROTECTED, clean full-width shell
      checkout/           # 10. Checkout & payment (demo summary)
      order-confirmation/ # 11. Thank-you / confirmation
    api/
      auth/[...nextauth]/ # NextAuth handler
      register/           # POST create account
      shopper-request/    # POST personal-shopper request
      contact/            # POST contact message
    layout.tsx            # root: fonts (Inter + Playfair), metadata
    robots.ts, sitemap.ts
  components/
    ui/                   # Button, Card, Input, Section, Badge — design primitives
    layout/               # Header, Footer, DashboardShell
    brand/                # Logo, WhatsAppButton
    auth/                 # AuthForms (login + signup)
    order/                # StatusTimeline
  lib/
    auth.ts               # NextAuth config (Google + Credentials)
    prisma.ts             # Prisma client singleton
    env.ts                # Zod-validated env vars
    rate-limit.ts         # in-memory limiter (swap for Redis at scale)
    validations.ts        # Zod schemas (THE source of truth for input shape)
    content.ts            # static marketing copy (pricing, FAQs, testimonials…)
    site.ts               # nav, contact info, WhatsApp deep link
    utils.ts              # cn(), formatINR(), generateOrderId()
prisma/
  schema.prisma           # data model
```

## Design system

Tokens live in `src/app/globals.css` under `@theme` (Tailwind v4 style — there is
**no** `tailwind.config.js`). Use the semantic utility classes, don't hardcode hex.

- **Navy** `--color-navy` `#14264f` — primary brand (headers, sidebar, buttons, headings)
- **Gold** `--color-gold` `#c79a3a` — premium accent, italic serif headlines, "Most Popular"
- **WhatsApp green** `--color-whatsapp` `#1fa15a` — conversion CTAs
- **Cream** / **tint** — alternating section backgrounds
- Fonts: **Playfair Display** (`font-display`) for headings, **Inter** for body.
- `.container-page` = centered max-w-1200 wrapper. `<Section>` + `<SectionHeading>`
  give consistent vertical rhythm. Buttons via `<Button>` / `<ButtonLink>` variants
  (`primary | gold | whatsapp | outline | ghost | white`).

When adding pages, compose existing primitives — match the surrounding idiom.

## Conventions

- **Validation is shared.** Define input schemas in `lib/validations.ts` and use
  them on both the form (`zodResolver`) and the API route (`schema.safeParse`).
  The server NEVER trusts the client.
- **Server vs client.** Pages are Server Components by default. Anything with
  state/handlers (forms, tabs, toggles, the dashboard sidebar) is a `"use client"`
  component in its own file, imported by the server page.
- **Money** is stored as integer rupees (no paise) and formatted with `formatINR()`.
- **Secrets** are server-only and validated in `lib/env.ts`. Never expose them to
  the client or prefix them `NEXT_PUBLIC_`.
- **Auth-protected areas** are guarded in the route-group `layout.tsx` via `auth()`
  + `redirect()`. Keep new private pages inside `(app)` or `(checkout)`.

## Local setup

The local database runs in **Docker** (`docker-compose.yml`, Postgres 16-alpine).

1. `npm install` (runs `prisma generate` via postinstall).
2. `cp .env.example .env`. The default `DATABASE_URL` already points at the Docker
   Postgres. Also set:
   - `AUTH_SECRET` — generate with `npx auth secret`.
   - `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` — optional, for Google login.
3. Start the database: `docker compose up -d` (waits until healthy).
4. Create the schema: `npm run db:push` (dev) or `npm run db:migrate` (tracked migrations).
5. `npm run dev` → http://localhost:3000.

### Docker Postgres details

- Service `postgres` in `docker-compose.yml`; container `giftpartner-postgres`.
- Credentials: user `postgres`, password `postgres`, db `giftpartner`.
- **Host port `5433`** → container `5432` (5433 chosen to avoid clashing with any
  Postgres already on 5432). The `DATABASE_URL` uses `localhost:5433`.
- Data persists in the named volume `giftpartner_pgdata`.

| Command                              | Does                                  |
| ------------------------------------ | ------------------------------------- |
| `docker compose up -d`               | Start Postgres                        |
| `docker compose down`                | Stop (keeps data volume)              |
| `docker compose down -v`             | Stop **and delete** all data          |
| `docker compose logs -f postgres`    | Tail DB logs                          |
| `docker exec -it giftpartner-postgres psql -U postgres -d giftpartner` | psql shell |

> The public marketing pages render without a database. Login, signup, the
> dashboard, and checkout require Postgres running and the schema pushed.

## Useful commands

| Command                | Does                                          |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Dev server                                    |
| `npm run build`        | `prisma generate` + production build          |
| `npm run typecheck`    | `tsc --noEmit`                                |
| `npm run db:push`      | Sync schema to DB without a migration (dev)   |
| `npm run db:migrate`   | Create + apply a dev migration                |
| `npm run db:deploy`    | Apply migrations in production/CI             |
| `npm run db:studio`    | Prisma Studio data browser                    |

## Security posture (what's done / what's next)

Done:
- Passwords bcrypt-hashed (cost 12); credentials never logged.
- JWT sessions; secrets validated at startup.
- Input validation with Zod on every API route.
- Per-IP in-memory rate limiting on auth/contact/request routes.
- Security headers (HSTS, X-Frame-Options, nosniff, Referrer-Policy,
  Permissions-Policy) in `next.config.ts`; `poweredByHeader` disabled.
- Private routes gated server-side.

Before production launch (TODO):
- [ ] Swap in-memory rate limiter for **Upstash Redis** (`@upstash/ratelimit`) so
      limits hold across multiple instances. Call sites in `lib/rate-limit.ts`.
- [ ] Add a **Content-Security-Policy** header (needs a nonce strategy for Next).
- [ ] Email verification + password reset flow (VerificationToken model exists).
- [ ] CAPTCHA / Turnstile on public forms to stop bots.
- [ ] Real **payment gateway** (Razorpay scaffolded in schema) with server-side
      webhook verification — never trust client-reported payment success.
- [ ] Replace `privacy` / `terms` placeholders with counsel-reviewed copy.
- [ ] Audit logging for admin actions; PII access controls.
- [ ] Move file/image uploads to S3/R2 and register hostnames in `next.config`.

## Scaling notes (high traffic)

- Marketing pages are **statically prerendered** — cheap and CDN-cacheable.
- Use a **pooled** Postgres connection (PgBouncer, or Neon/Supabase pooler) and
  set `DATABASE_URL` to the pooled endpoint; serverless functions exhaust direct
  connections fast.
- Add Redis for rate limiting and (later) session/data caching.
- Put the app behind a CDN; images go through `next/image` (AVIF/WebP enabled).
- Index hot query paths already covered in `schema.prisma` (`@@index`).

## What's intentionally stubbed (build these next)

These screens render with **representative/demo data** so the UI is complete, but
they are not yet wired to live data:

- **Track order** (`/track`) — shows a sample timeline; wire to
  `GET /api/orders/[orderNumber]`.
- **Checkout** (`/checkout`) — fixed sample cart + "Pay" links to confirmation;
  build a real cart/order + payment intent.
- **Order confirmation** — static order id; pass the real order through.
- **Dashboard** reads real orders but a fresh account shows the empty state.
- Dashboard sub-pages (orders, addresses, payments, requests, wishlist,
  notifications, settings) are linked in the sidebar but not yet built.

## Don'ts

- Don't hardcode brand colors — use the `@theme` tokens.
- Don't add a `tailwind.config.js` — this is Tailwind v4 (CSS config).
- Don't put secrets in client components or `NEXT_PUBLIC_*`.
- Don't bypass `lib/validations.ts` — extend it.
- Don't trust client-side payment/order state — verify on the server.
