# Vercel Deployment Guide: Trax Jobs

This guide provides the exact steps to deploy the **Trax Jobs** platform to Vercel with full Sanity CMS integration.

---

## 1. Quick Verification Checklist

- [x] Next.js 16 App Router configuration
- [x] All dynamic pages (`/`, `/jobs`, `/companies`, `/talent`, `/learning`, `/learning/[id]`, `/studio`) verified
- [x] TypeScript validation passed (`npm run lint` / `tsc --noEmit`)
- [x] Remote image patterns configured in `next.config.ts` (`cdn.sanity.io`, `images.pexels.com`, `images.unsplash.com`)
- [x] Sanity Studio embedded at `/studio` with fallback configuration

---

## 2. Environment Variables to Set on Vercel

When importing your project into Vercel, navigate to **Environment Variables** and add:

| Key | Value | Notes |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `xxuan67y` | Public project ID for Sanity CMS |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Active dataset |
| `SANITY_API_WRITE_TOKEN` | `skxDB0zzjQjj...` *(see `.env.local`)* | Server-side write token for employer job submissions & profile applications |
| `PEXELS_API_KEY` | *(optional)* | Stock photography API key if needed |
| `NEXT_PUBLIC_PEXELS_API_KEY` | *(optional)* | Public stock photography key if needed |

> **Security Note:** Never expose `SANITY_API_WRITE_TOKEN` with a `NEXT_PUBLIC_` prefix. It is strictly used in Next.js Server Route Handlers (`/api/submit-job`, `/api/submit-profile`) and will never leak to the client browser.

---

## 3. Critical Step: Sanity CORS Configuration

Before your Vercel deployment can load data from Sanity or access the `/studio` editor, you **MUST** whitelist your Vercel domain in the Sanity management console:

1. Visit [manage.sanity.io](https://manage.sanity.io).
2. Select project **xxuan67y**.
3. Go to the **API** tab in the top navigation.
4. Under **CORS Origins**, click **Add CORS origin**:
   - **Origin:** `https://*.vercel.app` (to cover all preview and production deployments)
   - **Credentials:** Check the **Allow credentials** box (required for Sanity Studio authentication)
5. If you have a custom domain (e.g. `https://jobs.trax.ng` or `https://trax.ng`), add it as an additional CORS origin as well with credentials enabled.
6. Click **Save**.

---

## 4. Deploying to Vercel

### Option A: Via Vercel Web Dashboard (Recommended)

1. Push your latest code to your GitHub repository (`git push origin main`).
2. Go to [vercel.com/new](https://vercel.com/new).
3. Select your `trax-jobs` repository and click **Import**.
4. Confirm project settings:
   - **Framework Preset:** `Next.js`
   - **Root Directory:** `./`
   - **Build Command:** `npm run build` (or leave default `next build`)
   - **Output Directory:** `.next` (default)
5. Paste the Environment Variables listed in Section 2 above.
6. Click **Deploy**.

### Option B: Via Vercel CLI

```bash
# 1. Install Vercel CLI if not already installed
npm i -g vercel

# 2. Deploy from repo root
vercel

# 3. Deploy to production
vercel --prod
```

---

## 5. Post-Deployment Verification

Once Vercel finishes deployment, verify the following routes:

1. **Homepage:** `https://<your-app>.vercel.app/`
2. **Jobs Board:** `https://<your-app>.vercel.app/jobs`
3. **Companies Directory:** `https://<your-app>.vercel.app/companies`
4. **Talent Directory:** `https://<your-app>.vercel.app/talent`
5. **Learning Hub:** `https://<your-app>.vercel.app/learning`
6. **Course Details:** `https://<your-app>.vercel.app/learning/product-management-growth-african-startups`
7. **Sanity Studio:** `https://<your-app>.vercel.app/studio` (log in with your Sanity credentials to manage live content)
