# Red-team audit — mohammadhroub.com

**Date:** 13 October 2026  
**Site:** https://mohammadhroub.com/  
**Repository:** this Next.js project (`output: "export"`)  
**Scope:** investigation only. No production code, content, routing, or SEO configuration was changed to produce this report.

## How this was checked

| Kind | What was actually done |
| --- | --- |
| Verified on the live site | HTTP responses, HTML titles, canonicals, hreflang, robots, sitemap, JSON-LD types, and a text extraction of the homepage. Linked client URLs were requested. |
| Code findings | Components, project data, SEO helpers, forms, and routes in this repository. |
| Images viewed | `img/omino-s26-ultra-poster-1440x1800.png` and `public/og.png`. WebP project covers could not be decoded in this environment. |
| Not done | No browser session, no click-through, no mobile device, no Lighthouse, no Search Console, no Bing Webmaster Tools, no analytics export. Scores below are judgments from that evidence, not measured conversion or ranking data. |

**Live site vs working tree.** Production matches the committed English site. `/ar` returns **404**. The working tree contains an uncommitted Arabic localization (`app/ar/`, `lib/i18n/`, sitemap and `llms.txt` edits) that is not what visitors get today. Findings below label that work as **unshipped**.

---

## 1. Executive verdict

The site can introduce Mohammad Hroub, and it can collect a message. It cannot yet do the job of a serious client-acquisition asset. A cold business owner is asked to trust a poetic brand line, a count of “06” live projects, and case studies whose outcomes are assertions. Several of those “live” entries are not publicly live. The one deployed booking product, DARNA, is labeled “in development” on its case study and “live” on `/restaurants`. Search engines are in worse shape than the design: every indexable URL’s canonical, Open Graph URL, sitemap, and `robots.txt` host point at `https://m7madi8-l54b3s7gu-m7madi8s-projects.vercel.app`, and that host responds with a redirect to Vercel login plus `X-Robots-Tag: noindex`. The custom domain is telling Google that the preferred copy of the site is a login wall.

### Three most serious weaknesses

1. **Canonical and sitemap point at a noindexed, login-protected Vercel deployment URL.** This can suppress the real domain in search. It is a production defect, not a metadata preference.
2. **Proof does not match the labels.** “06 projects live” includes Vantage (no public URL) and Samar Ammar (the public site’s title is “Under Development”). OMINO, the first featured project, is a 2027 launch. DARNA, a deployed Arabic booking site, is hidden from that count.
3. **The offer is broader than the case studies.** “Websites and the systems behind them” is a real sentence. The pages that should prove the systems half do not show a working operations product, a role, or a result a buyer can check.

### Three strongest assets

1. **The second sentence of the hero is commercially clearer than the tagline.** It says websites for customers and systems for the team, from Palestine, remotely. That identity is repeated in the job title, the about chapters, and `public/llms.txt`.
2. **Named sites are actually on the internet.** Checked on 13 October 2026: [99cafe](https://www.99cafe.com/) (200, title “99cafe”), [Nawal Yoga](https://www.nawalyoga.com/) (200), [OD Architects](https://od-architects.com/) (200), [Chef Farah Ammar](https://www.cheffarahammar.com/) (200, the Nana’s Biets URL). [DARNA](https://darna-wine.vercel.app/) (200, Arabic, “reserve your table in the heart of Ramallah,” with restaurant, lounge, and catering paths).
3. **The practice has operational bones the homepage undersells.** A bilingual work agreement, WhatsApp, a direct email, and an Arabic site already in the working tree. The visual system is monochrome and typographically organized, which is a better base than a neon template.

### Biggest missed opportunity

Lead with the work a buyer can open today — 99cafe, Chef Farah, OD Architects, Nawal Yoga, and an honest DARNA case — and make one of them a real case study. OMINO can stay visible as a founder product. It should not occupy the proof slot while it has no public product and a 2027 date.

### Five highest-priority fixes

1. Force the site URL to `https://mohammadhroub.com` at build time and redeploy. Confirm canonical, `og:url`, JSON-LD, sitemap, and `robots.txt` no longer mention the `vercel.app` deployment host.
2. Make “Live” mean a public URL whose own homepage is not an under-development page. Remove Vantage and Samar Ammar from the live count until that is true. Put the DARNA URL on its case study and pick one status.
3. Change the first screen so the offer is readable before “silent code / massive impact.” Feature a shipped project first.
4. Rewrite two shipped projects as case studies: the business problem, your role, what a visitor can click, and only outcomes you can show. Label sample numbers in the OMINO poster.
5. Do not deploy the Arabic routes on top of the current canonical bug. Ship `/ar` only after those URLs exist, return 200, and canonicalize to `mohammadhroub.com`.

### Is this ready as a client-acquisition asset?

**No.** It is ready as a personal site for people who already know you. It is not ready for a skeptical buyer comparing you with someone who shows a finished system, and it is not ready to be found by search while the canonical host is `noindex`.

The visual craft is ahead of the commercial proof. Averaging those into one score would hide the gap. Search visibility and trust are the constraints on the business outcome. A prettier hero will not move either one.

---

## 2. Overall scorecard

Scores are 0–10. They are not averaged. Confidence is about the evidence, not about taste.

| Category | Score | Why |
| --- | --- | --- |
| Positioning clarity | 5 | The hero lede and job title state websites plus operational systems. The tagline, the “06” counter, and the featured order fight that sentence. |
| Differentiation | 4 | Named local businesses and Arabic/English work are real. The headline and most result lines could sit on a large number of freelancer sites. |
| First impression | 5 | Name, offer, and two CTAs are on the first screen. The slogan and the ghost word “Hroub” spend the first read on mood. |
| Visual quality | 6 | Type roles, a near-monochrome palette, and the OMINO poster show intention. Not scored from a rendered browser pass. The social card pairs that system with a casual street photo. |
| Trust and credibility | 3 | Live badges overclaim. No testimonials. No checked business results. OMINO’s poster shows `$2,480` and `+18%` on a product the copy says is not launched. |
| Case-study quality | 3 | Every project has goal / build / work / result fields. Most results are compliments. Role, stack evidence, and “what you can click” are thin or missing. |
| Service clarity | 4 | A buyer can tell you build sites and internal systems. They cannot tell scope, starting price, timeline, or what happens after the form. |
| Conversion readiness | 5 | “Start a Project” goes to `#contact`. Email, WhatsApp, and Instagram are real links. The form is client-only, phone is required, and nothing is measured. |
| Mobile usability | 5 | Layout classes and `100dvh` hero exist. **Not verified on a device.** Custom cursor is limited to fine pointers, which is the correct idea. |
| Accessibility | 4 | Reduced motion is handled in many places. `user-select: none`, a copy blocker, `cursor: none`, headings split into characters, and content at `opacity: 0` until JavaScript run against that. |
| Technical quality | 5 | App Router, typed project data, static export, and lazy contact code are coherent. `getSiteUrl()` bakes the wrong host into production SEO. |
| Performance readiness | 5 | Static HTML is the right shape. Images are unoptimized, six font families load, and motion libraries run on the home page. **No lab score was measured.** |
| SEO implementation | 2 | Metadata, JSON-LD, sitemap, and robots exist. The canonical they emit is a noindexed login wall. hreflang claims an Arabic URL that is the same English URL. |
| Content quality | 4 | Nana’s Biets, OD Architects, and Nawal have specific openings. Vantage, Shape Up, Wolve, and several “results” are generic. |
| AI search readability | 4 | `llms.txt` states a clear identity on `mohammadhroub.com`. Live JSON-LD and the screen-reader summary state the Vercel host as the official site. Those two identities conflict. |

**What dominates the business result:** trust and indexability. A 7-visual site with a 3-proof site still loses the $1,000–$5,000 conversation. A site whose canonical is `noindex` loses the search conversation before the design is judged.

---

## 3. Five-second test

Judged from the live homepage text and `app/components/Hero.tsx` (the working-tree hero uses the same English copy via `lib/i18n/messages.ts`).

The first screen shows the name as the `h1`, then “silent code / massive impact.”, then this paragraph:

> I build the websites businesses show customers, and the systems they run on behind the scenes — from Palestine and remotely worldwide, from the first line of code to the dashboard your team opens every morning.

Actions: “Start a Project” (`#contact`) and “View My Work” (`/work`). A decorative “Hroub” sits in the hero field.

| Question | Verdict |
| --- | --- |
| 1. Who is this? | Yes. Mohammad Hroub, in the largest type. |
| 2. What do they build? | Partly. The paragraph says websites and systems. The line above it does not. |
| 3. Which businesses? | No. “Businesses” is the whole market. Hospitality shows up only after a scroll, and only if the visitor opens a project or `/restaurants`. |
| 4. Why hire? | Weak. “Massive impact” and “dashboard your team opens every morning” are promises. Nothing on the first screen shows a result. |
| 5. Credibility on the first screen? | Low. There is no client, no live site, no portrait, no “6 sites you can open.” The credibility is typography. |
| 6. Is the main CTA obvious? | Yes. “Start a Project” is a real button to the contact anchor. It is not compelling, because the visitor has not been given a reason yet. |
| 7. Impressive but commercially empty? | The ghost word, the full-viewport hero, and the slogan. They do not name a buyer or a job. |
| 8. Too much abstraction? | Yes. “Silent code” and “massive impact” are abstractions. The concrete sentence is doing the real work and is visually secondary (`hero-lede` under the slogan). |
| 9. Serious developer, or generic template? | Mixed, and this was checked rather than assumed. Dark field (`--background: #060708`), oversized name, poetic slash-tagline, watermark word, custom cursor, and scroll-scrubbed type are the familiar portfolio pattern. There is no neon accent and no fake code block. The palette is stone and white. It reads as a careful dark portfolio with a generic slogan, not as a neon generator theme. |
| 10. First reason to leave? | “I still don’t know if this person has shipped something I can open, or what it would cost to talk.” |

**Verdict:** A visitor can get the name and a vague offer in five seconds. They cannot get a reason to believe it. The slogan is the problem, not the lack of a synonym for “developer.”

### Three biggest first-impression weaknesses

1. **“silent code / massive impact.” is the line the eye hits after the name, and it says nothing a buyer can use.** The useful sentence is underneath it, in smaller type. A skeptical visitor can leave on the slogan.
2. **No proof is on the first screen.** The live count and the projects start below a `min-h-[100dvh]` hero (`Hero.tsx`). The first view is a brand poster.
3. **“Businesses” is not an audience.** A café owner, a studio, and a retailer all have to assume the work is for them. The featured set actually leans hospitality, wellness, and architecture. The hero does not say that.

---

## 4. Positioning assessment

**Current positioning, one sentence:** Mohammad Hroub is a Palestine-based freelance full-stack developer who builds the websites customers see and the operational systems a business runs on.

That sentence is supported by `SEO_PERSON.jobTitle` in `lib/seo-config.ts` and by the hero lede. It is a coherent offer. The site does not yet earn it.

### The main positioning problem

The two halves are presented as one practice, and the evidence is lopsided.

Shipped, publicly reachable marketing sites: 99cafe, Nawal Yoga, OD Architects, Chef Farah.  
Claimed as live inside the “06” count but not publicly live: Vantage (no `url` in `app/data/projects.ts`), Samar Ammar (`https://samarammar.com/` title “Under Development”, description says the site is under development).  
Operational-system evidence: OMINO is `status: "launching"` and the result line is “Built and ready. Launching early 2027.” It is still the first featured slug. DARNA is the closest deployed operations-shaped product and is marked `coming-soon` on the case study, so `getLiveProjects()` excludes it, while `app/restaurants/data.ts` marks the same project `status: "live"` and links `https://darna-wine.vercel.app/`.

A buyer comparing the homepage with the links will conclude that the systems offer is a future product and the websites offer is a set of brochures. Some of those brochures are real and good enough to lead with. The site leads with the future product.

Services are understandable only at the category level: business sites, custom web apps, internal systems (`SEO_SERVICES`). There is no offer page that says what a typical engagement includes, what it does not include, or who it is for. The target audience is “a business with digital infrastructure,” which is everyone.

Messaging often stops at deliverables (“a clean, responsive site”) or at mood (“one standard”). Business value shows up in a few overviews — Instagram DMs replaced by a store, a studio site rebuilt around real projects — and then the result line retreats to “a clear, reliable site.”

The same headline claims could appear on thousands of portfolios. The work that could not is more specific: Arabic and English as a first-class requirement (Nawal’s own case copy; DARNA’s live `lang="ar"` homepage; OMINO’s poster with an AR control), and hospitality/food brands with a real URL.

Visual identity: dark, editorial, monochrome. That matches a design-conscious studio buyer better than a shop owner who wants to see their menu. It does not overwhelm anyone with technical jargon on the homepage. The project pages then swing the other way: “Next.js, Commerce, Stripe” on Vantage with no store to inspect. Technical competence is asserted in labels more often than it is shown in decisions.

### Strongest differentiating thread that the work actually supports

You have shipped public sites for named businesses, and you have at least one Arabic, RTL, venue site (DARNA) whose own metadata is about reserving a table in Ramallah, with separate restaurant, lounge, and catering routes. That is a more distinctive proof than “full-stack developer” and a more current proof than OMINO in 2027. It was not invented as a niche. It is what the URLs show. It is also incomplete: this audit did not complete a DARNA reservation, so “booking system in daily use” is not established.

### Three directions grounded in the work

**A. Websites for hospitality, food, and local brands.**  
Evidence: 99cafe, Chef Farah, OD Architects, Nawal, the `/restaurants` page, menu and reservation templates, DARNA.  
Trade-off: easy to understand and already half-built as `/restaurants`. It narrows away clinics, retail, and OMINO. A painter or a clinic may not see themselves. You would be choosing a market you can already show.

**B. Websites plus the operating layer, claimed only where a system can be opened.**  
Evidence you would need: one production system with a walkthrough (DARNA if the booking and floor tools are real, or OMINO when a business is on it).  
Trade-off: this is the positioning you want, and it is the one the homepage already states. Using it now asks the buyer to fund the gap. Using it after one honest systems case study is the same brand with a spine.

**C. Bilingual web products for businesses that operate in Arabic and English.**  
Evidence: Nawal’s case is explicitly bilingual. DARNA’s live page is Arabic-first with an English toggle in the fetched HTML. The work agreement has English and Arabic. The public portfolio is English, `html lang="en"`, and `/ar` is 404. The working tree is building `/ar`.  
Trade-off: this is a real advantage against English-only freelancer templates, including for Palestine, Hebron, and Ramallah queries you already target in `SEO_KEYWORDS`. It is not yet the experience of the live site. Shipping a thin Arabic mirror of the same vague case studies would add pages without adding proof.

### Recommendation

Use **B, narrowed by what A and C already prove.** Say you build the customer-facing site and, when the business needs it, the booking or operating flow behind it — for businesses that work in Arabic, English, or both, including hospitality and local brands you can already point to. Do not lead with a general “operational systems” claim until one systems project is a case study with a URL or a permissioned walkthrough.

OMINO can be “a product I am founding,” not “the proof I can build your system.”

### Evidence that would validate or kill this recommendation

- Whether DARNA’s reservation path completes and whether the venue actually uses it.
- Whether any business owner will let you show a before/after or a one-line confirmation.
- Whether Arabic-speaking buyers are the ones who inquire. That requires the analytics in section 7, which do not exist yet.
- Whether OMINO has a pilot shop. “Launching early 2027” means it cannot validate the systems claim this year.

---

## 5. Skeptical-client assessment

Persona: a business owner, two minutes, $1,000–$5,000 or more, no prior relationship.

**What they can verify in two minutes**

- Your name, an email (`eslamhuhu1@gmail.com`), WhatsApp, and Instagram.
- Four marketing sites that resolve, plus a Yoga site and an architecture site with real titles.
- A case-study template that always has the same four headings.

**What they cannot verify**

- That you were the person who built those sites. The pages say “Built by Mohammad Hroub” in the meta description (`generateMetadata` in `app/work/[slug]/page.tsx`). They never separate your role from a designer, a founder, or a template.
- That the work changed the business. Result lines are evaluations you wrote.
- That “Live” means live.
- What a project costs, how long it takes, or what you will do after they submit the form. The agreement (`app/agreement/agreement-data.ts`) does say discovery → planning → development → review → handoff, two revision rounds, an upfront portion, and 14–30 days of defect support. That page is a menu item, not part of the contact answer, and it still has no ranges.

### Trust gaps

| Gap | What a serious client wants instead |
| --- | --- |
| “06 projects live on the web” (`About.tsx`, `HomeCta.tsx`, `getLiveProjects()`) | A count of URLs you are willing to open in the meeting. Today that set is 99cafe, Nawal, OD Architects, and Chef Farah. Samar Ammar’s homepage says under development. Vantage has no URL. DARNA is excluded from the 6 even though a deployment returns 200. |
| OMINO is featured first and marked Launching, with a poster that shows revenue `$2,480` and `+18%` | Either a labeled prototype (“sample data, not a customer”) or a pilot with the shop named. Do not leave dashboard figures unexplained on a product dated 2027. |
| Vantage is a full case (checkout, “online sales and engagement”) and the showcase stack includes Stripe (`project-showcase-meta.ts`) | A store URL, or a demotion to “concept” with the Stripe line removed until a payment integration exists in a repo you can describe. |
| Samar Ammar is an unlabeled live project | The public site’s own words: “Under Development.” The portfolio should use the same words. |
| DARNA status disagrees with itself | One status. If the Ramallah site is public, link it from `/work/darna` and say what is still unfinished. |
| No client quote, no named reference, no “I built this” from the owner | One sentence from one owner, with permission. If you cannot get that, say so and rely on the URL. Do not write a testimonial. |
| Results have no baseline | “Orders moved off Instagram DMs” is a mechanism. “Supports growth in online sales” (Vantage) is a claim. Keep the first. Cut the second unless you have a number you are allowed to publish. |
| Personal email does not match the public name | A mailbox on `mohammadhroub.com`, or a clear “this Gmail is the working inbox” so the buyer does not wonder if they have the right person. |
| Contact form gives no expectation | “I reply within two business days” or whatever is true. The success state only says you will reply as soon as possible (`ContactForm.tsx`). |
| Demos sit in the same nav as client work | `/restaurants` mixes 99cafe with “Burger menu,” “Café menu,” and “NOIR reservations.” Sample dishes in `menuSamples` (charred octopus, dry-aged ribeye) read as a restaurant if the page does not say “sample.” |

Unanswered questions that can stop a message: price band, typical duration, whether you design or only develop, whether you work in Arabic on the delivered site, whether you will maintain it after the 14–30 day window, and whether the form actually reaches you. The last one is an unknown: the form is loaded only in the browser (`LazyContactForm` uses `dynamic(..., { ssr: false })` and waits for an intersection observer). Production environment variables were not readable from the initial HTML. This audit did not submit the form.

---

## 6. Project-by-project review

Source of truth for status: `app/data/projects.ts`. “Live” in the UI means “not `coming-soon` and not `launching`” (`isComingSoon`). That is a code rule, not a check that a website exists.

| Project | Portfolio status | Public URL checked | Classification |
| --- | --- | --- | --- |
| OMINO | Launching, early 2027. Featured first. | None on the case study. | Promising founder product. Must stay labeled as unlaunched. Do not use it as client proof. |
| 99cafe | Live. Featured. | `https://99cafe.com` → `https://www.99cafe.com/` 200, title “99cafe”. | Promising shipped site. Needs a real case study. Feature it. |
| Nana’s Biets | Live. Featured. URL is Chef Farah. | `https://cheffarahammar.com` → `https://www.cheffarahammar.com/` 200. Title “Chef Farah Ammar”. Description mentions dumplings, sauces, delivery. | Strongest current commercial story (DMs to a store). Name mismatch needs one plain sentence. Feature it. |
| OD Architects | Live. Featured. | `https://od-architects.com/` 200, title “OD ARCHITECTS”. | Promising shipped studio site. The overview is specific. The result line is not. Feature it. |
| Nawal Omar | Live. Featured. | `https://www.nawalyoga.com/` 200, title “Nawal Yoga”. | Promising, especially the bilingual brief. Feature it if bilingual work is part of the offer. |
| Samar Ammar | Treated as live. No status field. | `https://samarammar.com/` 200, title “Under Development”. | Project requiring an honest label before it stays in the live set. The case copy is thin. |
| Vantage | Treated as live. No URL. Stack label includes Stripe. | None. | Weak portfolio entry until a store exists. The result claims sales and engagement with no store. |
| Shape Up | In development. | None. | Concept. Keep only if you want a pipeline signal, and keep the label. |
| Healthy Mama | In development. | None. | Concept. Same rule. A health platform raises more trust burden, not less. |
| DARNA | Case study: in development. `/restaurants`: live, with `https://darna-wine.vercel.app/`. | That URL returned 200. Arabic homepage, Ramallah reservation line, links to `/restaurant`, `/lounge`, `/catering`. Booking completion was not tested. | Promising project that the portfolio currently mishandles. This is the systems-shaped piece you can show sooner than OMINO. |
| Wolve Store | In development. | None. | Concept storefront. Low relevance until it is a store. |
| Bashar Hroub | In development. | None. | Concept artist portfolio. Relevant only as craft, not as the business-systems offer. |

### Which strengthen you, which weaken you

**Strengthen, if presented honestly:** Chef Farah, 99cafe, OD Architects, Nawal, and DARNA once the status and the URL agree.  
**Weaken today:** Vantage (a complete success story with nothing to open), Samar Ammar (your site says live; their site says under development), and the block of five “publishing soon” pages that use the same case-study chrome as finished work. OMINO weakens the client sale when it is the first card and the poster shows unexplained revenue. It does not weaken you if it is clearly your own product in progress.

### Order

1. **Feature first:** Chef Farah (commercial problem), 99cafe (brand system with a gallery), OD Architects or Nawal (depending on whether you want studios or bilingual wellness). Put DARNA in the featured set if you confirm what is actually usable, and link the deployment.
2. **Improve:** those four or five. Add your role, a screenshot of a real screen, the URL, and a result you can defend. Fix the Nana’s Biets / Chef Farah naming in the first paragraph.
3. **Demote:** Vantage, out of “Live” and out of any Stripe claim. Samar Ammar, out of the live count until `samarammar.com` is no longer an under-development page. Shape Up, Healthy Mama, Wolve, and Bashar Hroub stay available as a clearly separated “in progress” group, not as peer case studies.
4. **Do not delete unfinished work only because it is unfinished.** DARNA and OMINO have strategic value. Vantage does not, until there is a store. The templates (GRIDLOCK burger, café menu, NOIR reserve) are sales props. They should not be indexed as if they were client projects.
5. **Missing case studies that would change the room:** one operational build with the actual flow (DARNA or a paid internal tool), and one website with the owner’s problem in concrete terms plus what changed after launch. A maintenance or “still running six months later” note would answer the reliability question the homepage claims (“Ship & stay close”) and never shows.

**Evidence each priority case study needs**

- Chef Farah: the DM-to-checkout story you already wrote, 3–5 real UI shots (the gallery files exist), your role, and whether checkout takes payment or only an order. Say which.
- 99cafe: what you built versus what the brand already had. The gallery is the right material. The goal line “Present the brand clearly and highlight the menu” is too small for the number of screens you show.
- DARNA: the public URL, what a guest can do, what the venue team can do, and what is still unfinished. A recording of a reservation is worth more than another adjective.
- OMINO: “sample interface” on the poster, no revenue figures unless they are from a pilot, and a one-line founder role. Keep the 2027 date.

---

## 7. Visual design review

This is a code and asset review plus the live text. It is not a browser design critique of spacing, breakpoint bugs, or motion timing. Those remain **unverified**.

**What looks considered**

- One type map in `app/globals.css`: Syne for display, Bodoni for the italic accent, Jost for buttons, Space Grotesk for body, IBM Plex Mono for the slogan’s first half. That is a system, not a pile of fonts — though six families is still a lot to load.
- Color is almost entirely stone, black, and white (`--background: #060708`, `--foreground: #f5f5f4`, `--muted: #8b919a`). Muted text on the background is roughly a 6:1 contrast from the hex values, which clears ordinary body-text contrast. This was calculated from the tokens, not measured with a contrast tool on screen.
- The OMINO poster is a composed product shot: one phone, one claim, one price line (“From $9 a month”), an Arabic control. It looks like product marketing. The problem is the unlabeled revenue card, not the composition.
- Section indexes (01–04), a single primary action, and a quiet footer are restrained.

**What looks generic**

- “silent code / massive impact.” as the hero headline (`messages.ts` and the live page).
- The giant watermark “Hroub” (`hero-ghost-word`).
- A custom cursor dot (`CustomCursor.tsx`) on a site whose job is to be hired.
- Scroll-scrubbed headlines (`ScrollFloat.tsx`, `ease="back.inOut(2)"`) on the work title, the method title, the contact title, and every case-study `h1`.
- The “06” stat as a design object (`HomeCta.tsx`). The number is large because the layout wants a number.

**What feels unfinished**

- The social image `public/og.png` (about 924 KB) puts a tight type lockup next to a casual full-body street photo. The lockup says “Full-Stack Developer — Websites and Systems.” The photograph does not continue that system. For a link preview, that mismatch is the first branded impression many people get.
- Project covers were not reviewable here (WebP). Case pages that only have one cover and four short paragraphs will feel thinner than the homepage chrome around them.
- `/restaurants` is a second visual language (`restaurants.css`, its own hero) inside the same domain.

**What is more complicated than the job**

- `HomeSignature` scrubs the hero toward opacity as you scroll, on desktop, when motion is allowed. The first screen is already a full viewport. Fading the offer out as the visitor tries to reach the work makes the cinematic move the thing they fight.
- About, on large screens, crossfades three short chapters inside a sticky track (`About.tsx`). The only in-section CTA sits on chapter C. A visitor can pin a lot of scroll on three sentences.
- `InitialLoader` holds a loader for at least 520 ms and up to 1200 ms on every page (`app/layout.tsx`).

**Attention and noise**

The hero slogan, the ghost word, the section index numerals, and the live-count numeral all ask to be the “designed” element. The project photographs should be winning that contest. On the homepage structure, they cannot, because they start below the fold.

**AI-portfolio checklist, verified**

| Pattern | Present? |
| --- | --- |
| Dark background | Yes. |
| Glowing neon accents | No. Accents are white and gray. |
| Decorative code | No code block. The slogan uses a slash and a mono font, which gestures at code. |
| Oversized type | Yes. The name is the `h1` in the display face. |
| Meaningless metrics | The “06” is meaningful and wrong, which is worse than decorative. |
| Excessive animation | Several systems at once: GSAP hero, GSAP scroll float, GSAP about scrub, Framer Motion cards, a cursor animation frame, reveal-on-scroll. Reduced motion is respected in these paths. The amount is still high for a hiring site. |
| Vague claims | “Massive impact,” “one standard,” “exceptional” on the work-page CTA. |

### Major criticisms

**1. Hero slogan over the offer**  
Location: `Hero.tsx` / `lib/i18n/messages.ts` hero block.  
Issue: the commercially useful sentence is subordinate to a mood line.  
Effect: the first read feels like a poster. The buyer still has to parse the lede to learn the job.  
Correction: set the `h1` or the line immediately under the name to the offer (websites and the systems behind them, for a named kind of business). Keep the slogan as a small signature, or drop it from the first screen.  
Why: the lede is already the better line. It does not need a new brand invention. It needs rank.

**2. Live count as a hero number**  
Location: `HomeCta` and the about chapter C stat.  
Issue: the number includes projects that are not publicly live.  
Effect: a buyer who opens Samar Ammar or looks for Vantage feels misled, and then discounts the projects that are real.  
Correction: count only URLs that resolve to the real project, or delete the counter.  
Why: a smaller true number is more credible than 06.

**3. Character-split headlines**  
Location: `ScrollFloat.tsx`.  
Issue: each character is its own `<span class="char">`. The live homepage extraction read “D i f f e r e n t p r o b l e m s.”  
Effect: the heading is harder to read, slower to render, and can be announced letter by letter.  
Correction: animate the whole line, or the words, and keep one text node (or an `aria-label` on the heading with the spans `aria-hidden`).  
Why: the words are the content. The stagger is decoration.

**4. Custom cursor and copy lock**  
Location: `globals.css` (`cursor: none` under fine pointers; `user-select: none` on `body`) and `NoCopy.tsx` (blocks `copy` and `cut`).  
Effect: selecting the email address to paste into a mail client is harder than it should be. The cursor hides the browser’s own affordance on the device where precision matters.  
Correction: remove both. The mailto link can stay.  
Why: a client copying your email is a conversion, not a leak.

**5. Reveal hides content until JavaScript**  
Location: `.reveal { opacity: 0 }` in `globals.css`, class added by `RevealManager.tsx`. Reduced motion correctly forces opacity 1.  
Effect: if JavaScript fails or is slow, section copy, including contact actions marked `data-reveal`, stays invisible.  
Correction: show content by default and animate only when motion is allowed and JS has run (`html.js .reveal`).  
Why: the contact path should not depend on an intersection observer.

No full redesign is required. The type and color system can stay. The first screen, the false metric, and the motion that fights reading are the changes that matter.

---

## 8. Conversion review

**Path today**

1. Land on `/`. Read name, slogan, lede.  
2. Click “Start a Project” and jump to `#contact`, or scroll through featured work, about, a second CTA, method, then contact.  
3. Or open `/work`, then a case study, then “Start a similar project” back to `/#contact`.  
4. Contact offers a mailto, a static “Remote — Worldwide” row that is not a link, social links, and a form.

**Observed friction**

- The primary CTA is clear and the anchor exists. It arrives before the proof for anyone who clicks it immediately, and after a lot of motion for anyone who scrolls.
- Project pages do ask for the next step (`/#contact` in the case study). They do not answer “why this project means you can do mine.”
- WhatsApp (`https://wa.me/972592132438`) and Instagram are in the menu and footer (`lib/site-nav.ts`). That matches a Palestine / regional buyer better than a form alone. The form still requires phone and message, and treats email as optional (`ContactForm.tsx`). An international buyer who will not share a phone number cannot submit.
- The location row looks like a contact action and goes nowhere (`contact-action--static`).
- “What happens next” is not stated. The agreement has the real process and is one menu level away.
- There is no pricing band. For this buyer that is a question, not automatically a defect. Silence plus a thin case study makes the form feel early.
- The form is not in the server HTML. No-JavaScript users still have the mailto if they can see it; the mailto control is also a `.reveal` node.
- Mobile contact: the same anchors and links are in the DOM. **Not exercised on a phone.**
- No analytics library is referenced anywhere in the TypeScript/TSX source (search for gtag, Plausible, Umami, PostHog, Vercel Analytics found nothing). There is no measured conversion rate to report, and no basis for claiming a bounce rate.

**Unverified hypotheses, not findings:** that the slogan increases bounce; that WhatsApp would outperform the form; that featuring OMINO reduces inquiries. Those are plausible and unmeasured.

**Events worth recording, without adding them in this audit**

- `project_opened` (slug)
- `project_outbound_click` (the “Visit site” link)
- `contact_cta_click` (which button: hero, about, work page, case study)
- `email_click`
- `whatsapp_click`
- `contact_form_submit` and `contact_form_error`
- A manual log of qualified inquiries (budget, timeline, fit), kept outside the marketing page

**Measurement approach that fits this architecture.** The site is a static export. A privacy-respecting option is a cookieless, first-party-friendly tool (Plausible, Umami, or a simple server log if you later add one endpoint) loaded only after consent if you decide consent is required in your markets. Do not put Google Tag Manager on this site to learn these six events. Do not use the contact form as the only metric: WhatsApp and mailto will bypass it. Review inquiries by hand for 30 days alongside the events. Success is a qualified conversation, not a form post.

---

## 9. Technical audit

Stack: Next.js 16.1.4, React 19, static export (`next.config.ts`), TypeScript, Tailwind 4. Homepage is a server page rendering client islands (hero, menu, about, form). Project content lives in `app/data/projects.ts`.

### P0 — Canonical host is a protected Vercel URL

`getSiteUrl()` in `lib/seo-config.ts` uses `NEXT_PUBLIC_SITE_URL`, then `VERCEL_URL`, then `https://mohammadhroub.com`.

On the live site, 13 October 2026:

- Homepage canonical: `https://m7madi8-l54b3s7gu-m7madi8s-projects.vercel.app`
- `og:url` is the same host
- `robots.txt` `Host` and `Sitemap` use that host
- Sitemap contains **21** URLs, all on that host
- That host responds **302** to Vercel SSO (`vercel.com/sso-api`) and sends **`X-Robots-Tag: noindex`**
- The screen-reader summary on the homepage states that Vercel URL as the official website (`HomeEntitySummary` prints `getSiteUrl()`)
- JSON-LD on the homepage includes the same host

`https://mohammadhroub.com/` itself returns 200. Humans can use it. Crawlers are being given a different, noindexed, login-walled URL as the canonical. Because this is a static export, the value is baked at build time. Setting the variable only in the Vercel dashboard without a rebuild will not fix already generated files.

This is the highest-severity engineering defect in the repo. It is not an aesthetic issue.

### Other verified issues

**Title template doubles the name.** Root layout template is `%s | Mohammad Hroub`. The homepage overrides it with `title.absolute`. `/work` and project pages do not. Live titles:

- `/work`: `Projects | Mohammad Hroub — … | Mohammad Hroub`
- `/work/vantage`: `Vantage — Mohammad Hroub | … | Mohammad Hroub`

**hreflang on the live site is false.** `en`, `ar`, and `x-default` on `/`, `/work`, and `/work/vantage` are the same URL. `html lang="en"`. There is no Arabic document at that URL. `/ar` is **404** in production.

**Unshipped Arabic work.** The working tree adds `/ar`, `/ar/work`, `/ar/links`, and `/ar/work/[slug]`, a language switcher, and sitemap entries. `localizedPath()` still sends pages outside that set (for example `/agreement`, `/restaurants`) to `/ar` as the Arabic alternate, which is a different page, not a translation. Deploying this before the canonical fix would publish a second language onto the same bad host. Restaurants and the agreement stay English-only in the switcher map.

**FAQ JSON-LD without a visible FAQ.** `SeoJsonLd` emits `FAQPage` from the root layout, so it is on every route, including menu templates. The homepage text extraction includes the screen-reader summary and does not include the FAQ questions. Google’s FAQ guidance expects the content to be visible. This is a structured-data mismatch, not a ranking prize.

**“Live” logic.** Documented above. `projectStatusLabel` returns “Live” whenever status is absent.

**Contact form.** Client-only, lazy, requires name, phone, and message. If neither Web3Forms nor Firebase is configured, it falls back to a mailto link (`ContactForm.tsx`). Whether production has those keys was **not** established. Firebase config is public-by-design (`NEXT_PUBLIC_*`) and writes with the client SDK. Firestore rules are not in the repo. If rules allow open reads, contact submissions would be world-readable. That is a **risk to verify in the Firebase console**, not a confirmed breach. No secret values were read for this audit.

**Private routes are public URLs.** `/clinic-growth`, `/omino-assessment`, and `/oday/requirements` return **200**. They are `noindex` and disallowed in `robots.txt`. They are unlinked intake forms, including an Arabic OMINO market questionnaire and an Oday requirements form. Anyone with the URL can open them. That is acceptable for a private form only if the documents are meant to be shared by link. They should not be treated as secret.

**Copy of the whole site is blocked** by `NoCopy` and `user-select: none`.

**Dead weight.** `three` is imported by `LiquidEther.tsx`, which is only used by `HeroBackground.tsx`, which is not imported by any page. `@paper-design/shaders-react` has no TSX import. `ChromaGrid.tsx` includes demo items and is not mounted by a page. `lenis` is used on the links page. `noir-reservation/` is a second app-shaped folder, not a route of the main app; the public demo is `app/templates/reserve`. These do not by themselves bloat the homepage bundle if the bundler drops unused modules. They do confuse the next person who edits the repo. The README still says the Three.js hero is lazy-loaded for Lighthouse. The current homepage does not render it.

**Duplicate IDs, broken routes, dead buttons.** Not exhaustively clicked. The static “Remote — Worldwide” row is the confirmed non-link that looks clickable. Project “Visit site” is conditional on `project.url` and is absent for Vantage, which is correct given the missing URL and misleading given the Live badge.

**Security.** No intrusive testing was done. Public client writes to Firestore and a public Web3Forms key are the visible patterns. Deployment protection on the `vercel.app` hostname is mis-wired into canonicals; the custom domain itself is open, which is what you want for a portfolio.

---

## 10. Performance assessment

**No Lighthouse run. No Core Web Vitals field data. No invented scores.**

What the source makes likely:

| Risk | Why it matters | Severity |
| --- | --- | --- |
| Canonical/host bug | Not a speed issue. Listed so it is not mistaken for one. | Separate |
| `images.unoptimized: true` | Required by static export. Large files ship as authored. `public/og.png` is ~924 KB. Portrait WebP is ~436 KB and the about image uses `priority`, so a below-the-fold portrait is preloaded. OMINO poster PNG is ~519 KB. Featured cards also `priority` the first two images, which sit under a full-viewport hero. | Real for LCP and bytes. High among performance items. |
| Six Google font families in `app/layout.tsx` | Space Grotesk, Syne, and Jost are preloaded. Bodoni is used in the hero accent and is not preloaded. Arabic font loads on the English document too. | Medium. |
| Motion | GSAP + ScrollTrigger on the hero, about, and every floated heading. Framer Motion on cards. A `requestAnimationFrame` cursor on desktop. | Medium for low-end phones. Minor if the user has `prefers-reduced-motion`. |
| Initial loader | Minimum 520 ms overlay. | Small delay on every visit. Minor next to images. |
| Client-only form and opacity-0 reveals | Extra JS before contact UI exists. | Minor for speed, real for resilience. |
| Third-party scripts | No analytics script. Fonts come from `next/font`. | Low. |
| Static export | HTML is pre-rendered. This is a performance advantage. Keep it. | Positive |

The performance work that would change a buyer’s experience is image weight and not preloading below-the-fold media. The Three.js shader path is not on the current homepage; optimizing it would not speed up `/`.

---

## 11. SEO and indexability

**What is implemented**

- Titles, descriptions, Open Graph, Twitter card, canonical link, robots meta, JSON-LD (`Person`, `WebSite`, `ProfilePage`, `ProfessionalService`, `WebPage`, `FAQPage`, `ItemList`), per-project `CreativeWork` and breadcrumbs, `sitemap.ts`, `robots.ts`, `llms.txt`.
- Private intakes use `noIndex: true` and are disallowed.
- Homepage `h1` is the name. Project pages have an `h1`. Work page `h1` is “Selected work.”

**What that implementation does in production**

It points the preferred URL, the sitemap, and the structured data at a host that sends `noindex` and a login redirect. Until that is rebuilt with `NEXT_PUBLIC_SITE_URL=https://mohammadhroub.com` (and `VERCEL_URL` is not allowed to override it), the rest of the SEO work does not make the site a search property. Metadata volume is not visibility.

**Indexability checklist**

| Check | Live result |
| --- | --- |
| Custom domain returns 200 | Yes |
| Canonical is the custom domain | **No** |
| Sitemap URLs return 200 on the host they advertise | **Not as public pages.** They advertise the protected host |
| `/ar` | **404** |
| hreflang | `en` and `ar` are identical on the live English pages |
| Trailing slash | Canonical is emitted without a trailing slash (`…vercel.app` and `…/work`). Not re-tested as a redirect chain on the custom domain beyond the successful 200s |
| Search Console / Bing | **No data in this audit.** Index status is unknown. Do not assume the domain is indexed or excluded. |
| FAQ visible | Not on the homepage body |
| Thin indexable URLs | Sitemap includes `/templates/burger`, `/templates/cafe`, `/templates/reserve`, `/templates/reserve/book`, plus every in-development project. Burger’s title is “GRIDLOCK — منيو برغر”. These are demos and concepts, given priority 0.65–0.7 |
| Internal links | Homepage features five projects. Footer and menu repeat the same set of links, including Restaurants, Links, and Work Agreement. Case studies link to the next project in array order, so a visitor walks into in-development work as easily as into a live site |
| Image alt | Project images use `` `${title} preview` ``. Gallery alts in the data file are more specific. |
| Language | Live document is English. Arabic strings are mixed into the meta description, keywords, and JSON-LD, and into one screen-reader block. That is not an Arabic version. |
| Service intent | A query like “مطور مواقع فلسطين” has keyword entries and a FAQ answer, and very little page body written for that query. The body is a portfolio. That can still rank for the name. It is a weak match for a non-branded service query because the proof is thin and the canonical is wrong. |

**Do not** add city doorway pages or more keyword lists. Hebron and Ramallah are already in the schema as areas served. More location pages with the same thin copy would make the index worse.

**Arabic SEO, separately.** Live: not a locale. Unshipped: real routes and Arabic hero copy exist in `lib/i18n/messages.ts` (“أبني مواقع وأنظمة ويب…”). That copy is clearer than “كود هادئ / أثر واضح.” The same proof problem will exist in Arabic the moment it ships, and the hreflang map must not point `/work/omino` at `/ar` unless `/ar/work/omino` returns 200. The working-tree sitemap adds those URLs. The working-tree `getSiteUrl()` bug would still stamp them with the Vercel host.

---

## 12. AI search discoverability

**What a crawler can read without executing the hero animation**

- The hero paragraph is in the server HTML.
- `HomeEntitySummary` is `sr-only` and repeats the identity, services, and geography. On the live site it also publishes the wrong official URL. Screen-reader users get that wrong URL too.
- `public/llms.txt` on the live site correctly names `https://mohammadhroub.com` and the services. The local file has been edited to advertise `/ar`, which production does not serve. **Conflict:** `llms.txt` says one host; JSON-LD and the canonical say another.
- Project summaries are real text, not canvas-only. Good.
- FAQ answers exist only in JSON-LD. An assistant that trusts schema more than the page can repeat them. They are broadly consistent with the site (freelance, React/Next, remote, Palestine). They also say “e-commerce, dashboards, workflows… from discovery to launch,” which is wider than the proven work.
- OMINO’s “built and ready” line can be quoted as if a product is on the market. The date says early 2027. Those two facts need to stay in the same sentence wherever they are repeated.
- Unsupported stack labels (Vantage + Stripe; `/links` says 99cafe is “React · Brand System” while showcase meta says “Next.js, TypeScript, Tailwind”) are the kind of small contradictions assistants repeat.

**Identity, as stated, is clear.** Mohammad Hroub, Palestine, websites and operational systems, React/Next/TypeScript. **Identity, as proven on the page, is blurrier,** because the canonical entity URL is a deployment hostname and the flagship project is unlaunched.

No claim is made that any change will cause inclusion in ChatGPT, Gemini, Perplexity, or AI Overviews. Those results were not queried. `llms.txt` is a reasonable factual file. It does not compensate for a wrong canonical.

---

## 13. Competitor comparison

Performed from public pages retrieved 13 October 2026. These are independent or small-studio sites selling websites plus operational software to businesses. They are not global agencies. Their outcome numbers are **their claims**, not facts this audit verified. Visual design was not browsed in a full layout pass; the comparison is about what the pages assert and how specific the case studies are.

| Site | What they show that this site does not |
| --- | --- |
| [Richard Pallangyo — Safari King](https://www.richardpallangyo.com/work/safari-king) | One operator, a before state (static brochure), and a concrete system: booking states, lead storage, admin console, named technical choices. The page is about a business workflow. |
| [Ifham Mohamed — Total Supply](https://ifham.dev/projects/total-supply) | A single freelance engagement with roles, dashboards, and an explicit “sole engineer” scope. Whether every figure is accurate is unknown. The shape of the case study is what a buyer can interrogate. |
| [QuantLab — Bridgepointe](https://quantlabusa.dev/work/bridgepointe-painting) and [Northcrest](https://quantlabusa.dev/work/northcrest-fence) | Marketing site and internal tool in one story, with the business problem (double entry, slow proposals) stated before the stack. They also claim measured changes. Treat the measurements as unverified. The narrative structure is still ahead of “a clear, reliable site.” |
| [Lokesh Sharma](https://lokeshkavisth.vercel.app/) | A closer peer: small-business websites, a direct “start a project,” thin case studies, and a `vercel.app` URL. Useful as a warning. Similar vagueness, fewer real client domains than you already have. You are ahead of this peer on real URLs and behind the three case-study sites above on proof. |

**Observed gap:** those stronger pages make the operational claim by walking through one system. Your site makes the operational claim in the hero and then shows OMINO’s future and a set of marketing summaries. You already have more public client domains than the thin peer. You do not yet have one page at their level of specificity.

Nothing here should be copied as a layout.

---

## 14. The hardest questions

**1. Biggest reason a serious client might not hire you after visiting**  
They cannot prove you delivered. The live counter includes a site that says “Under Development” and a store with no URL, and the first project launches in 2027. A buyer who does open 99cafe or Chef Farah still cannot see your role or a result.

**2. What makes the site forgettable**  
“silent code / massive impact.” It is the line in the hero and on the social card. It is not attached to a client, a city, or a job. The monochrome system is more memorable than the sentence, and the sentence is what people repeat.

**3. Weakest part of the positioning**  
“Operational systems” as a present-tense service. The shipped evidence is mostly websites. The system you can actually open (DARNA) is filed under in-development and omitted from the live count.

**4. What the site claims without enough proof**  
“06 projects live.” Vantage’s sales result and Stripe label. “Massive impact.” “Ship & stay close,” with no retained-client evidence. FAQ copy that lists e-commerce, dashboards, and API work as a general capability. OMINO’s poster figures.

**5. What you are polishing too much**  
Hero motion, scroll-scrubbed headlines, the custom cursor, the about-chapter pin, the loader, and SEO schema variety. The canonical host shows the schema work went out with the wrong URL. More JSON-LD will not fix that.

**6. What you are neglecting**  
Two honest case studies, a true definition of “live,” and the site URL used in canonicals. DARNA’s public URL is the clearest example of neglected proof.

**7. What adds noise**  
The ghost word, the false live count, Vantage as a finished success, indexable menu templates with fictional dishes, and the work-agreement item in the main menu before a visitor has a reason to care about terms. The agreement itself is useful. Its placement is early.

**8. Biggest gap between the quality you want and the quality you can show**  
You want to be hired for systems a team opens every morning. You can show several real brand sites and one Arabic venue deployment. You cannot show a measured operational outcome. The portfolio is dressed for the first claim and evidenced for the second.

**9. Three things to fix this month**  
(1) Rebuild with the correct canonical host. (2) Fix live/in-development labels, including Samar, Vantage, and DARNA. (3) Rewrite Chef Farah and one other shipped project so a buyer can see the problem, your role, and the URL in the first screen of the case study. Move OMINO out of the first featured slot.

**10. Single change that most improves credibility**  
Stop publishing work as live when the public URL is missing or the site says it is under development, and put the real DARNA link on its case study. Credibility here is a labeling problem as much as a missing-work problem.

**11. Single change that most improves qualified inquiries**  
On the first screen, name the offer and show one shipped project with its URL, and make the contact path say what happens next (reply window, and that WhatsApp is a valid way to start). The CTA already exists. It is attached to the wrong amount of proof.

**12. Evidence that would change this assessment the most**  
A Search Console property on `mohammadhroub.com` after the canonical fix (to see if the bad canonical already stuck), plus one owner-confirmed case study with a before state and a result you are allowed to print. A completed DARNA booking, documented, would also move the systems score. A Lighthouse run would move the performance score only. It would not move the hiring decision.

---

## 15. Prioritized findings

| ID | Category | Severity | Location | Evidence | Problem | Why it matters | Fix | Effort | Impact | Confidence | External validation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| F01 | SEO | P0 | `lib/seo-config.ts` `getSiteUrl()`; live canonical, sitemap, robots | Canonical and all 21 sitemap URLs use `m7madi8-l54b3s7gu-m7madi8s-projects.vercel.app`. That host 302s to Vercel SSO and sends `X-Robots-Tag: noindex`. | Preferred URL is a login wall. | Can keep the real domain out of search. | Set `NEXT_PUBLIC_SITE_URL=https://mohammadhroub.com` and ignore `VERCEL_URL` for canonicals. Rebuild. Re-fetch canonical, sitemap, robots, JSON-LD. | Small | Highest | High | Re-check live HTML after deploy. Search Console later. |
| F02 | Trust | P1 | `getLiveProjects()`, about stat, `HomeCta` | Count is 6. Vantage has no URL. `samarammar.com` title is “Under Development.” | “Live” is a status flag, not a fact. | One bad link discounts the real ones. | Count and badge only public, finished URLs. | Small | High | High | Re-open each URL. |
| F03 | Trust | P1 | `projects.ts` Vantage; `project-showcase-meta.ts` | Full success copy, Stripe in the stack, no `url`, UI says Live. | A fictional-feeling win. | Buyers who check will assume the rest is padded. | Relabel as concept or remove from the indexable portfolio until a store exists. Delete the Stripe line until it is real. | Small | High | High | None beyond the missing URL. |
| F04 | Positioning | P1 | Featured slugs in `HomePageView` / homepage; OMINO poster | First featured project launches early 2027. Poster shows `$2,480` and `+18%` with no “sample” label. | Future product occupies the proof slot, with unexplained figures. | Sets the wrong expectation for a client sale. | Feature a shipped URL first. Label the poster as a sample. | Small | High | High | Your confirmation that the figures are not a pilot. |
| F05 | Trust / positioning | P1 | `projects.ts` DARNA vs `app/restaurants/data.ts` | Case study: in development, no URL. Restaurants page: live, `https://darna-wine.vercel.app/` which returned 200 with a Ramallah booking headline. | The best systems-shaped artifact is contradicted. | You hide the project that supports the offer. | One status, one URL, one description of what works. | Small, plus your knowledge of what is unfinished | High | High | Confirm whether reservations complete and whether the venue uses it. |
| F06 | Content | P1 | All case studies in `projects.ts` and `app/work/[slug]` | Goal/build/result exist. Results are self-assessed. Role is absent. | Not case studies. | This is the hiring gap. | Rewrite two shipped projects. Do not invent metrics. | Medium, needs your memory and permission | High | High | Client permission for any quote or number. |
| F07 | SEO | P1 | Live hreflang; `/ar` | `en` and `ar` hrefs match. `/ar` is 404. | False bilingual signal. | Contradicts the Arabic keywords and the FAQ. | Keep a single language in hreflang until Arabic URLs return 200 and canonicalize correctly. | Small on the live branch; the WIP must not ship early | High | High | Fetch `/ar` after any deploy. |
| F08 | Conversion / message | P1 | Hero | Slogan outranks the offer. No client on the first screen. | First read is a poster. | Qualified visitors leave before the work. | Reorder the existing lede above the slogan. Show one live project or its name. | Small | High | High | Five-second read by someone who does not know you. |
| F09 | SEO | P2 | `app/layout.tsx` title template; work and project metadata | Live titles repeat “Mohammad Hroub”. | Duplicated titles. | Looks unfinished in search results and tabs. | Use `title.absolute` or stop putting the name in the page title. | Small | Medium | High | View source after deploy. |
| F10 | SEO | P2 | `SeoJsonLd.tsx`, `SEO_FAQ` | `FAQPage` in JSON-LD on the root layout. Questions not in the homepage body. Also emitted on template pages. | Schema for content the page does not show. | Policy mismatch; templates inherit your FAQ. | Render a real FAQ or remove `FAQPage`. Do not emit the full graph on `/templates/*`. | Medium | Medium | High | Rich Results test after the canonical fix. |
| F11 | SEO / positioning | P2 | `app/sitemap.ts`, `/templates/*`, `/restaurants` | Demos and in-development projects are indexable. Sample menu items are fictional. | The domain can rank as a burger menu or a half-built store. | Dilutes the entity “Mohammad Hroub, developer.” | `noindex` templates and unfinished projects, or mark them as demos in the title and drop them from the sitemap. | Small | Medium | High | Sitemap fetch after deploy. |
| F12 | Accessibility | P2 | `globals.css`, `NoCopy.tsx`, `CustomCursor.tsx`, `ScrollFloat.tsx`, `RevealManager.tsx` | `user-select: none`; copy/cut prevented; `cursor: none` on fine pointers; per-character headings; `.reveal` at opacity 0 until JS. | The site resists reading, copying, and no-JS use. | Contact and headings are the conversion surface. | Remove copy lock and custom cursor. Don’t hide content by default. Animate words, not characters. | Medium | Medium | High | Keyboard pass and a screen reader on one page. Not done here. |
| F13 | Conversion | P2 | `ContactForm.tsx`, contact section | Phone required; email optional; no reply window; form is client-only; location row is not a link. Production form delivery **unknown**. | Friction and an unclear next step. | People who prefer email or WhatsApp get a worse path. | Say the reply window. Make email enough. Keep WhatsApp visible next to the form. Confirm the form arrives. | Small | Medium | Medium | Submit one test message. Check Firebase rules. |
| F14 | Measurement | P2 | Repo-wide | No analytics dependency or script reference. | No baseline. | You cannot tell which project or channel produces conversations. | Add the events in section 8 after F01. | Small | Medium | High | None until installed. |
| F15 | Performance | P2 | `next.config.ts` images; about `priority`; font list; `public/og.png` | Unoptimized images; below-fold priority; six families; 924 KB OG PNG. | Heavier than the static architecture deserves. | Mobile first load. Not measured. | Compress OG and portrait. Remove `priority` from the about photo. Subset fonts you actually use above the fold. | Medium | Medium | Medium | Lighthouse on `/` and one case study, mobile and desktop, after F01. |
| F16 | Trust | P3 | `public/og.png`; menu order | Street photo beside a strict lockup. Agreement is a primary nav item. | Slightly cheaper preview; terms before trust. | Secondary. | A composed portrait or the lockup alone. Move the agreement next to contact as “how engagements work.” | Small | Low | Medium | Preview the OG card in a debugger after canonicals are fixed. |

P0 and P1 are reserved for the canonical failure, false proof, and the hiring narrative. Motion and typography preferences are not in those bands.

---

## 16. 30-day roadmap

### Immediate fixes

Code you can do without new client material. Do these before any Arabic launch and before more visual polish.

| Action | Solves | Implementation | Benefit | Depends on | Effort | Measure |
| --- | --- | --- | --- | --- | --- | --- |
| Correct the site origin | F01 | In `getSiteUrl()`, use `https://mohammadhroub.com` unless `NEXT_PUBLIC_SITE_URL` is set. Do not let `VERCEL_URL` override production. Set the env var on the host. Rebuild and redeploy the static export. | Search engines receive a public canonical. | Host access | Hours | View source: canonical, `og:url`, sitemap `<loc>`, robots sitemap, and a JSON-LD URL all on `mohammadhroub.com`. The deployment hostname returns nothing in those fields. |
| Repair “Live” | F02, F03, F05 | Status and URL edits in `projects.ts` and `restaurants/data.ts`. One rule in the UI. | The counter and badges become believable. | Your decision on DARNA’s real status | Hours | Every Live card has a URL. Opening it does not show an under-development title. |
| Stop the false hreflang | F07 | On the branch that is actually deployed, point `en` and `ar` only at URLs that exist, or drop `ar` until `/ar` is real. | Removes a contradictory language signal. | F01 first if both ship together | Hours | Fetch `/` and see distinct, live hrefs or a single language. |
| Fix titles | F09 | Absolute titles or a template that does not repeat the name. | Cleaner search snippets. | None | Hour | Title contains the name once. |

### High-impact improvements

| Action | Solves | Implementation | Benefit | Depends on | Effort | Measure |
| --- | --- | --- | --- | --- | --- | --- |
| Reorder the first screen | F08 | Use the existing lede as the primary line. Put one shipped project name and URL in or directly under the hero. Move OMINO behind shipped work. | A cold visitor sees a job and a proof. | None | A day | Someone unfamiliar can say what you build and name one site. |
| Two case studies | F06 | Chef Farah and 99cafe or OD Architects. Problem, role, URL, screens you already have, outcome only if true. | The portfolio becomes evidence. | Your notes; permission for any number or quote | Several days | A reader can answer “what did he do?” without asking you. |
| DARNA, honestly | F05 | Link the deployment from the case study. State guest flows vs unfinished parts. | Supports the systems sentence with a URL. | You know what is real | A day | Status matches `/restaurants` and `/work/darna`. |
| Contact expectations | F13 | Reply window. Email sufficient. WhatsApp beside the form. Remove the dead location row or make it plain text. | More completed contacts, fewer confused ones. | You choose a true reply window | Hours | A test submission arrives. A test WhatsApp click is obvious on mobile. |
| De-index demos | F11 | `noindex` plus sitemap removal for templates and unfinished slugs. | Cleaner entity in search. | F01, so you are not editing a doomed canonical | Hours | Sitemap lists finished, public work and the main pages. |

### Strategic improvements

These need you, not just the editor.

| Action | Solves | Implementation | Benefit | Depends on | Effort | Measure |
| --- | --- | --- | --- | --- | --- | --- |
| One owner-confirmed sentence | Trust | Ask one client. Publish only what they approve. | Breaks the “self-assessed” pattern. | Permission | Days to weeks | The sentence is on the case study with a name they agreed to. |
| Decide the offer boundary | Positioning | Write a short “what I take / what I don’t” using direction B in section 4. Put it above the form. | Fewer unfit inquiries, clearer fit. | Your choice | A day of writing | A buyer can tell if a booking system is in scope. |
| Ship Arabic after F01 and F07 | Discovery for Arabic queries | Finish `/ar` for home, work, and the featured case studies only. Do not translate unfinished concepts first. Do not hreflang pages that fall back to the homepage. | Matches a real market and the Nawal/DARNA evidence. | Translation quality, not machine filler | A week once the English proof is honest | `/ar` returns 200, canonical on the apex domain, hreflang pairs are reciprocal. |
| Analytics | F14 | The six events in section 8, plus a manual inquiry log. | You will know if this roadmap worked. | A privacy choice | Half a day | 30 days of events and a count of qualified conversations. |

### Optional polish

Wait.

- Custom cursor removal and copy-lock removal (F12) — do them when you touch global CSS, they are cheap, they are not the month’s strategy.
- Font reduction and image compression (F15) — after the canonical rebuild, so you are not optimizing the wrong deployment.
- OG portrait — replace when you have a frame that matches the lockup.
- Delete unused `LiquidEther` / shader / Chroma demo code when you are cleaning, not before the case studies.
- Loader and about-pin simplification — after the first screen says the right thing.

**Do not do all of this at once.** Week 1 is F01, F02, F03, F07, F09. Week 2 is the hero order and two case studies. Week 3 is DARNA’s true status and the contact expectations. Week 4 is Arabic only if the English canonicals are clean, plus analytics. Search Console export is the external check at the end of the month, not on day one.

---

## 17. Missing evidence and external validation

| Missing fact | How to get it | What it would change |
| --- | --- | --- |
| Whether Google or Bing has indexed `mohammadhroub.com` or the Vercel host | Search Console and Bing Webmaster Tools, property `https://mohammadhroub.com/`. Inspect the homepage URL. | Confirms if F01 already caused de-indexing or duplicate selection. |
| Whether the production form and Firebase writes succeed, and whether Firestore rules allow public reads | Send one test lead. Read the Firebase rules in the console. Do not paste keys into the repo report. | Confirms or clears the contact-delivery unknown and the data-exposure risk. |
| Core Web Vitals | Lighthouse or CrUX on `/` and `/work/99cafe`, mobile and desktop, after the canonical rebuild. | Replaces section 10’s source-level risks with measurements. |
| Mobile layout and keyboard behavior | A phone and a keyboard pass on home, work, one case study, and the contact anchor. | Can add or remove mobile and accessibility findings. This audit did not do it. |
| DARNA reservation completion and real-world use | Click through restaurant, lounge, and catering on `darna-wine.vercel.app`. Ask whether the venue uses it. | Decides if DARNA is a flagship case study or a public prototype. |
| OMINO poster numbers | Your statement: sample data or a pilot. | Decides whether the image is a mock that needs a label. |
| Client permission for any result or quote | Ask. | The only legitimate way to raise the trust score with numbers. |
| Which channel produces inquiries | The event list in section 8, kept for 30 days. | Tells you whether WhatsApp, the form, or a project page is the real CTA. |
| Rendered visual QA of WebP covers and breakpoints | A browser, because WebP covers could not be decoded here and no browser tool was used. | Could change the visual score. It should not change F01–F08. |

**Working tree warning.** Arabic localization was in progress and uncommitted while this audit was written (`app/ar/`, `lib/i18n/`, changes under `app/work/`, `app/page.tsx`, `lib/seo-config.ts`, `app/sitemap.ts`, `public/llms.txt`). Production `/ar` was 404 at check time. If that work deploys without F01, the new Arabic URLs will canonicalize to the same noindexed host. Finish the canonical fix on the branch you actually release.

---

## Inspection log (so the limits stay attached to the claims)

- `https://mohammadhroub.com/` 200, `lang=en`, robots `index, follow`, canonical on the Vercel deployment host.
- `https://mohammadhroub.com/robots.txt` 200, sitemap and host on that same deployment host.
- `https://mohammadhroub.com/sitemap.xml` 200, 21 URLs, all on that host. WebFetch initially reported 500; a direct GET returned 200. The 200 response is the one used here.
- `https://mohammadhroub.com/llms.txt` 200, identity text points at `mohammadhroub.com`.
- `https://mohammadhroub.com/ar` **404**.
- `https://mohammadhroub.com/work`, `/work/omino`, `/work/vantage`, `/work/99cafe`, `/links`, `/agreement`, `/restaurants`, `/templates/burger` 200.
- `/clinic-growth`, `/omino-assessment`, `/oday/requirements` 200 with `noindex` on the clinic page (clinic robots meta checked).
- Client URLs: 99cafe, Nawal Yoga, OD Architects, Chef Farah, DARNA deployment, Samar Ammar, as cited above.
- No browser rendering, no Lighthouse, no form submission, no Search Console.

---

## Remediation — 13 October 2026

This section records fixes made after the audit. The assessment above is unchanged.

### 1. Findings confirmed

- `getSiteUrl()` in `lib/seo-config.ts` preferred `VERCEL_URL` over `https://mohammadhroub.com`. On the live site, immediately after this code change, the homepage canonical was still `https://m7madi8-l54b3s7gu-m7madi8s-projects.vercel.app`, and `robots.txt` still advertised that host. `.env.local` does not set `NEXT_PUBLIC_SITE_URL` or `VERCEL_URL`. The bad host is the platform deployment URL, baked in at the last production build.
- “Live” was the default for any project that was not `coming-soon` or `launching`. Vantage had no URL. `https://samarammar.com/` still returns title “Under Development.”
- OMINO’s poster shows revenue and order figures. The case study did not say they were sample data. The project is still `launching`, with result text “Launching early 2027.”
- DARNA was `coming-soon` in `app/data/projects.ts` and `live` in `app/restaurants/data.ts`. `https://darna-wine.vercel.app/` still returns 200. That `vercel.app` host is the project’s public site, not this portfolio’s canonical origin. It was left as an external link.
- `/ar` on the production domain still returns 404. Arabic routes exist in this repository and are emitted by the static export.

### 2. Findings disproved or no longer applicable

- No critical audit finding was disproved.
- Arabic is not missing from the repository. `/ar`, `/ar/work`, `/ar/links`, and `/ar/work/[slug]` are implemented, with RTL layout and translated project copy. The 404 is because that code is not what production is serving.
- Vantage was removed from the portfolio at your request, rather than relabeled. `/work/vantage` is not in the new export.

### 3. Files changed

- `lib/seo-config.ts`
- `README.md`
- `app/data/projects.ts`
- `app/data/project-showcase-meta.ts`
- `lib/i18n/projects.ts`
- `lib/i18n/project-overlays-ar.ts`
- `lib/i18n/messages.ts`
- `app/restaurants/data.ts`
- `app/work/ProjectPageView.tsx`
- `app/components/featured/FeaturedProjectCard.tsx`
- `app/components/showcase/ProjectCard.tsx`
- `reports/portfolio-red-team-audit.md` (this section only)

### 4. Exact fixes

**Production origin.** `getSiteUrl()` no longer reads `VERCEL_URL`. Production uses `NEXT_PUBLIC_SITE_URL` when it is set to a non-`vercel.app` origin, otherwise `https://mohammadhroub.com`. A `*.vercel.app` value of `NEXT_PUBLIC_SITE_URL` is ignored in production. Development with the variable unset still uses `http://localhost:3000`. Canonical, Open Graph, JSON-LD, sitemap, and robots all go through this helper. Trailing-slash behavior was not changed (`trailingSlash` is still unset). Private `noindex` flags on `/clinic-growth`, `/omino-assessment`, `/oday/requirements`, and not-found were not removed.

**hreflang.** `ar` is emitted only when `hasArabicEquivalent()` is true (`/`, `/work`, `/links`, `/work/[slug]`). `/agreement` and other pages without an Arabic route no longer point `ar` at `/ar`.

**Projects.**

- Vantage, its showcase stack (including the Stripe label), and its Arabic overlay were removed. The image file `img/03.webp` was left on disk and is no longer imported.
- The live count uses `getLiveProjects()`: not launching, not in development, and must have a URL. The export of `/` contains the phrase “5 projects live on the web.” Those five are 99cafe, Nawal Yoga, OD Architects, Nana’s Biets / Chef Farah, and DARNA.
- Samar Ammar stays in the portfolio with its URL, status `coming-soon` (“In development” / “قيد التطوير”), and result text “The linked website is still under development.” The page does not say the design practice itself is unfinished.
- DARNA is one status everywhere: public URL `https://darna-wine.vercel.app/`, not `coming-soon`, so the case study and `/restaurants` both say Live. The restaurants entry reads that status from the project record. The outcome line now says a public site is available with restaurant, lounge, and catering paths. It does not add a booking or revenue result.
- OMINO stays, still launching in 2027. The case page and featured card show: “The revenue and order figures on this poster are sample interface data, not verified business results.” The Arabic project page has the equivalent sentence.

**Arabic.** Existing routes were not deleted and were not rewritten. Card labels that still said “Live” and “View project” in English on Arabic pages now use the Arabic strings already required by the status model.

### 5. Validation commands and results

| Command | Result |
| --- | --- |
| `npx tsc --noEmit --pretty false` | Exit 0 |
| `npx eslint` on the files edited for this remediation | Exit 0 |
| `npm run build` with `VERCEL_URL` and `NEXT_PUBLIC_SITE_URL` both set to the old deployment host | First attempt failed before page generation: Google Fonts fetch failed with a TLS error (Bodoni Moda, Syne, Space Grotesk, and the other `next/font` families). |
| Same build with `NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1` | Exit 0. Next.js 16.1.4 compiled, typechecked, and wrote 44 static routes to `out/`. |

Checked in `out/`, not only in source:

- `out/index.html` canonical and `og:url`: `https://mohammadhroub.com`. Robots: `index, follow`. hreflang `en`, `ar` (`/ar`), `x-default`. Zero `m7madi8` or `vercel.app` matches.
- `out/robots.txt`: `Host: mohammadhroub.com`, `Sitemap: https://mohammadhroub.com/sitemap.xml`. Private prefixes still disallowed.
- `out/sitemap.xml`: 34 `<loc>` values, all on `https://mohammadhroub.com`. No `vantage`. No `clinic-growth`, `omino-assessment`, or `oday`.
- `out/agreement.html`: no `ar` hreflang.
- `out/clinic-growth.html`: `noindex, nofollow`.
- `out/work/vantage.html`: absent.
- `out/work/omino.html` and `out/ar/work/omino.html`: sample-data note present.
- `out/work/darna.html`: Live, the public-site sentence, and `https://darna-wine.vercel.app/` (two mentions, both the project link).
- `out/work/interior-landscape-elegance.html`: “In development” and the under-development result. No live badge.
- `out/ar.html` canonical: `https://mohammadhroub.com/ar`.

### 6. Remaining code issues

Not part of this remediation, and still true in the source: the hero slogan, thin case-study outcomes, FAQ JSON-LD without a visible FAQ, indexable menu templates, title strings that repeat the name, `user-select: none` and the copy blocker, the custom cursor, no analytics, and no measured Core Web Vitals.

Arabic pages for `/agreement`, `/restaurants`, and `/templates/*` do not exist. The language switcher still falls back to `/ar` for those paths. That is intentional until those translations exist. hreflang does not claim they have Arabic URLs.

DARNA’s older build description still says the venue team gets real-time table management. That sentence was not rewritten. It is not newly proven.

### 7. Required hosting configuration

On the Vercel project that serves `mohammadhroub.com`:

- Set `NEXT_PUBLIC_SITE_URL` to `https://mohammadhroub.com`, or leave it unset.
- Do not set it to a `*.vercel.app` deployment URL. Production builds now ignore that shape, but the dashboard should still show the real domain.
- `VERCEL_URL` is provided by Vercel automatically. The new code does not read it. Do not copy it into `NEXT_PUBLIC_SITE_URL`.
- No new secret is required for this fix.

### 8. Required deployment steps

1. Deploy this repository to the production project attached to `mohammadhroub.com`. A preview deployment is not enough.
2. After deploy, re-fetch `https://mohammadhroub.com/`, `/robots.txt`, `/sitemap.xml`, `/work/darna`, `/work/interior-landscape-elegance`, and `/ar`.
3. Confirm the canonical host is `mohammadhroub.com`, robots and sitemap use that host, `/ar` returns 200, and `/work/vantage` is gone.
4. This remediation did not deploy. The live site was checked again after the local build and still serves the old canonical and a 404 for `/ar`.

### 9. Human confirmation still required

- DARNA is labeled Live because its public URL returned 200 and already had restaurant, lounge, and catering paths. Confirm whether reservations complete and whether the venue uses the site. If the answer is no, change the status back to in development in `app/data/projects.ts` only; `/restaurants` reads that record.
- Samar Ammar stays listed, with the website marked in development. Confirm that the URL should remain public.
- OMINO’s figures are labeled as sample data. Confirm that is accurate and that no pilot numbers should replace them.

### 10. Search Console and Bing

After the production deploy, not before:

- Google Search Console, property `https://mohammadhroub.com/`: inspect the homepage URL, submit `https://mohammadhroub.com/sitemap.xml`, and check whether Google had selected the old `vercel.app` deployment as the canonical. If it had, request indexing of the custom-domain URL after the new canonical is live.
- Bing Webmaster Tools: submit the same sitemap and inspect the homepage.
- Neither property was available during this remediation. Indexing is not verified.
