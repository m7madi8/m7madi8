# Mohammad – Portfolio

Portfolio site for Mohammad (Full-Stack Web Developer • Freelancer). Built with Next.js, React, and Tailwind CSS.

## Tech Stack

- **Next.js** (App Router)
- **React 19**
- **Tailwind CSS**
- **TypeScript**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Deploy

You can deploy this app on [Vercel](https://vercel.com) (recommended for Next.js) or any platform that supports Node.js.

### Contact form (production)

The contact form sends messages in two ways (see `app/components/ContactForm.tsx`):

1. **Web3Forms** — set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (get a free key at [web3forms.com](https://web3forms.com)).
2. **Firebase Firestore** — optional; set all `NEXT_PUBLIC_FIREBASE_*` variables from your Firebase project console.

If **neither** is configured on the server, the form falls back to a **mailto** link (“Send via email”) instead of submitting in the browser.

Copy `.env.example` to `.env.local` for local development. On Vercel (or your host), add the same variables under **Settings → Environment Variables**, then **redeploy** — `NEXT_PUBLIC_*` values are baked in at build time.

### SEO (search engines)

- Production SEO defaults to **`https://mohammadhroub.com`**. Override with **`NEXT_PUBLIC_SITE_URL`** if you use another domain or preview URL.
- Optional site verification (set on the host before **build**; values appear as `<meta>` tags via [`getRootLayoutMetadata()`](lib/seo-config.ts)):
  - **`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`** — the `content` value from Google’s `google-site-verification` meta tag ([Search Console](https://search.google.com/search-console)).
  - **`NEXT_PUBLIC_BING_SITE_VERIFICATION`** — the `content` value from Bing’s `msvalidate.01` meta tag ([Bing Webmaster Tools](https://www.bing.com/webmasters)).
- The site includes **metadata** (title, description, keywords), **Open Graph / Twitter cards**, **JSON-LD** (`Person`, `WebSite`, `ProfessionalService`), and auto-generated **`/sitemap.xml`** and **`/robots.txt`**.
- Edit branding and keywords in [`lib/seo-config.ts`](lib/seo-config.ts).

### Performance (Lighthouse)

Heavy JS (Three.js hero, GSAP menu) is **lazy-loaded** or **deferred** (`HeroBackground`, `LazyStaggeredMenu`, `LazyCustomCursor`, `LazyContactForm`) to improve TBT/LCP. For **image** audits, compress large PNGs in `img/` (e.g. target &lt; 300 KB for web) or export WebP — the report’s multi‑MB payload usually comes from unoptimized source images.
