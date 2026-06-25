# Deploying GiftPartner.in (Vercel + Hostinger domain)

This deploys the **WhatsApp-only** site (no database). The public pages and both
email forms (Contact + Request a Shopper) work without Postgres. You can add a
database later when you re-enable accounts (`ACCOUNTS_ENABLED` in `src/lib/site.ts`).

Your domain stays registered at **Hostinger** — you only point its DNS at Vercel.

---

## 1. Push the code to GitHub

```bash
# create an empty repo on github.com first (no README), then:
git remote add origin https://github.com/<you>/giftpartner.git
git push -u origin main
```

## 2. Import the project on Vercel

1. Go to https://vercel.com → sign in with GitHub.
2. **Add New… → Project** → import the `giftpartner` repo.
3. Framework preset is auto-detected as **Next.js**. Leave build settings default.
4. Before clicking Deploy, add the environment variables below.

## 3. Environment variables (Vercel → Project → Settings → Environment Variables)

| Name | Value | Notes |
| ---- | ----- | ----- |
| `AUTH_SECRET` | *(the generated value given to you)* | Required. |
| `RESEND_API_KEY` | `re_...` | Your Resend key, so the forms send email. |
| `EMAIL_FROM` | `GiftPartner <onboarding@resend.dev>` | Until you verify a domain in Resend. |
| `CONTACT_TO_EMAIL` | `rahularulbalan@gmail.com` | Where form messages are delivered. |

> `DATABASE_URL` is **not** needed for this deploy. Add it later (Neon/Supabase)
> when turning accounts back on.

Click **Deploy**. You'll get a working `*.vercel.app` URL in ~1 minute.

## 4. Connect your Hostinger domain

In Vercel: **Project → Settings → Domains → Add** → type your domain
(e.g. `giftpartner.in`). Vercel shows the exact DNS records to create. Typically:

| Type | Name | Value |
| ---- | ---- | ----- |
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

Then in **Hostinger → Domains → DNS / Nameservers → DNS Zone**:

1. Delete any existing `A` record for `@` that points elsewhere (e.g. parking).
2. Add the `A` record for `@` and the `CNAME` for `www` exactly as Vercel shows.
3. Save. DNS usually propagates in minutes (can take up to a few hours).

Vercel issues the HTTPS certificate automatically once DNS resolves. Done.

## 5. After it's live

- Test the Contact and Request forms — emails should arrive at `CONTACT_TO_EMAIL`.
- To send email from `@yourdomain` and to any inbox (e.g. vanaja's), verify the
  domain in **Resend → Domains**, then change `EMAIL_FROM` to e.g.
  `GiftPartner <hello@giftpartner.in>` and redeploy.
- To re-enable login/dashboard/checkout later: set `ACCOUNTS_ENABLED = true` in
  `src/lib/site.ts`, add a `DATABASE_URL` (Neon), run `npm run db:deploy`, redeploy.

## Alternative: deploy without GitHub (Vercel CLI)

```bash
npm i -g vercel
vercel            # first run: links/creates the project, deploys a preview
vercel --prod     # promote to production
```
Add the same env vars with `vercel env add <NAME> production`.
