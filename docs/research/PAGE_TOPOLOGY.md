# Solluna Homepage Topology

Scope: https://mysolluna.com/ (homepage only).

## Design tokens
- Body font: "Bianco Sans" (custom) → swap to **Nunito Sans** (Google Font)
- Heading font: "Bianco Serif New" (custom) → swap to **Cormorant Garamond** (Google Font)
- Primary text: `#4A3530` (warm brown)
- Background (hero/sections): `#FBF2D8` (cream/beige)
- Footer cream bg: `#FBF2D8`
- Dark green band: `#2F5740` (testimonial band, newsletter)
- Accent green (announcement bar): `#1F4D3B`
- Primary CTA: `#DEA000` (mustard/gold) bg, text `#4A3530`, rounded pill (border-radius ~40px)
- Dashed "Best seller" chip: `#BEDDDD` (pale teal) bg, text `#4A3530`
- Page max-width: 1920px (120rem) — content centers in ~1440px

## Sections, top to bottom
1. **AnnouncementBar** — dark green, one-line marquee text with sparkles and inline link.
2. **Header** — cream background, sticky. Three-column: left nav (Shop / Feel Good Podcast / Resources), centered wordmark "Solluna" (serif), right side About link + search/user/cart icons. Mobile: hamburger + centered logo + cart.
3. **Hero** — split 50/50. Left panel: dark/sand powder image with overlaid "Discover your glow" title, copy, mustard CTA. Right panel: portrait of woman with hibiscus. Bottom-right floating card "New / Glowing Greens Powder®".
4. **CornerstonesIntro** — cream band with wavy top & bottom edges. 4 small symbolic icons positioned at corners (leaf, head, spiral, sunburst). Center H2 copy about Four Cornerstones + "Learn More" underlined link.
5. **FeaturedIn** — full-width green leaf photograph with "Featured In:" label centered and 7 press logos in a row (Vogue, GMA, Elle, NYT, InStyle, WSJ, Today).
6. **ExperienceBetterDigestion** — cream band. H2 + 3 text tabs (Supplements / Skincare / Courses) + "Shop All" CTA. 4 product cards in a row (image, star rating, title, subtitle, pill "Shop - $price").
7. **TestimonialsBand** — dark green band with wavy top & bottom. Horizontally scrolling testimonial cards: left = quote with stars, right = circular product image. Orange dot separators.
8. **NourishListenLearn** — cream band. Center H2 + 3 large cards (image + overline label + title). Links: Glowing Greens Powder®, Feel Good Podcast, Courses.
9. **HolisticWellness** — dark textured-green band with wavy top & bottom. 3 columns of mini feature text (Commitment to Holistic Wellness / Rooted in Experience / Natural Plant-Based Formulations).
10. **SipOnGlowingGreens** — cream band. Left: headline "Sip on / Glowing Greens", short copy, small product card (image, rating, title, price) + CTA. Right: 3-image slider (powder shot, blender, woman with jar).
11. **CelebrityEndorsements** — cream band. Horizontal marquee of celebrity quote blocks separated by orange dots (Reese Witherspoon, Kerry Washington, Channing Tatum, Drew Barrymore, Mark Ruffalo, Ben Stiller, Chris Hemsworth). Each block: small circular avatar + name + quote.
12. **FeaturedRecipes** — cream band. H2 + subhead + "View all recipes" CTA. 4 recipe cards: image with category pill (top-left), title, excerpt, "Read More →".
13. **OurStory** — cream band. Left: "Our Story" H2, founder paragraph, CTA. Right: two overlapping circular/rounded portraits of Kimberly.
14. **NewBlogs** — cream band. H2 + "view all blogs" CTA. 4 blog cards (same layout as recipes).
15. **KimberlysFeaturedBooks** — cream band. Left: H2 + copy, "Explore all books" CTA, 2 small book cover thumbs. Right: large photo of Kimberly speaking, NYT Bestseller circular badge overlay top-right.
16. **NewsletterSignup** — dark green band with wavy top. Left: H2 "Join us to get weekly tips…" + social icons row. Right: first-name input + email input + mustard subscribe CTA + disclaimer.
17. **InstagramFeed** — cream band. H2 "Tapping Into Your Fullest Potential" + 2 handle pills (@sollunabyks / @_kimberlysnyder). 8-image horizontally scrolling row of Instagram photos.
18. **Footer** — cream band with wavy top. 4 column link lists (Shop / Resources / Learn / Support) + sunburst logomark on the right. Bottom: copyright row + privacy/terms links + FDA disclaimer. Underneath: giant "solluna" wordmark in mustard, partially cropped, filling full width.

## Page-level behaviors
- Sticky header on scroll (cream background persists, no shrink observed on desktop).
- Wavy section dividers implemented as SVG backgrounds or `mask-image` / inline SVGs.
- Product cards, testimonials, celebrity strip, Instagram row are horizontal scrollers (native scroll or swiper) — scroll-snap x on mobile.
- No Lenis or Locomotive detected; native scrolling.
- Hover states on CTAs darken the mustard bg subtly.
- No scroll-driven state changes on hero, nav, or sidebar (verified by comparing viewport captures at multiple scroll positions — nothing auto-morphs).

## Out of scope
Mega-menu flyouts, cart drawer, cookie banner, accessibility widget, reviews dialog, real product linking/subscription logic. Links go to `#` or the original URL.
