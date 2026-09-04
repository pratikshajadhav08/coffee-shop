# Beanro — Coffee Shop Site

A warm, editorial coffee-shop website with a 3D hero model, an animated
menu, a call-in ordering flow, and a light/dark theme — built with React
and Vite.

Live sections: Hero (with a rotating 3D cup), animated stat marquee, About,
Menu (with cart), an image accordion Gallery, a Testimonial, a Directions/
Call CTA, and a dedicated `/order` page for reviewing and calling in an
order.

---

## Features

- **3D hero model** — a rotating coffee cup rendered with
  `@react-three/fiber` / `@react-three/drei`, viewed from a locked top-down
  angle, positioned as a soft background element on the right side of the
  hero.
- **Reactbits-style motion, hand-built** — staggered word reveal
  (`SplitReveal`), scroll fade-ins (`FadeUp`), a cursor-following
  ("magnetic") button, an animated count-up stat, and a cursor glow —
  all plain React + CSS, no animation library required for these.
- **React Bits `AccordionGallery`** — the actual open-source component
  (uses `gsap`), themed to match the site, powering the "Around The Bar"
  gallery.
- **Animated ember-field footer** — a canvas particle field of warm
  embers drifting upward and twinkling, behind the footer content.
  Respects `prefers-reduced-motion`.
- **Light / dark theme toggle** — a full second palette swapped via CSS
  variables and a `data-theme` attribute, shared through React context.
- **Menu with cart + call-in ordering** — "Get This Brew" adds an item to
  a cart (React context); the navbar's "Order Ahead" button (with a live
  item-count badge) opens a dedicated `/order` page where you can adjust
  quantities, see a running total, and finish by calling the shop or
  copying a plain-text order summary. No payment processing — this is
  designed around "call ahead, pick up in store."
- **Client-side routing** — `react-router-dom`, with `/` (the landing
  page) and `/order`. Includes SPA-fallback config for Netlify and
  Vercel so refreshing `/order` doesn't 404 once deployed.
- **Image system with graceful fallbacks** — menu and gallery images are
  dropped into `src/assets/menu/` and `src/assets/gallery/` and picked up
  automatically by filename via `import.meta.glob`. Gallery items fall
  back to bundled Unsplash stock photos if no local file is found; menu
  items fall back to a plain placeholder card.

---

## Tech stack

- [React 18](https://react.dev) + [Vite 5](https://vitejs.dev)
- [react-router-dom](https://reactrouter.com) — client-side routing
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) /
  [@react-three/drei](https://github.com/pmndrs/drei) /
  [three.js](https://threejs.org) — the 3D hero cup
- [gsap](https://gsap.com) — powers the React Bits `AccordionGallery`
- Plain CSS with custom properties for theming (no CSS framework)
- Google Fonts: `Fraunces` (display serif) + `Manrope` (body sans)

---

## Getting started

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build     # production build, output in dist/
npm run preview   # serve the production build locally
```

---

## Project structure

```
index.html                    # Vite entry HTML
package.json                  # scripts: dev / build / preview
vite.config.js                 # Vite + React plugin config
vercel.json                     # SPA rewrite config (Vercel deploys)
public/
  _redirects                    # SPA rewrite config (Netlify deploys)

src/
  main.jsx                    # mounts <App /> into #root
  App.jsx                     # routing (/, /order), ThemeProvider, CartProvider
  index.css                   # all styles + light/dark CSS variables

  context/
    ThemeContext.jsx          # light/dark theme state
    CartContext.jsx           # cart state: add/update/remove items, totals

  utils/
    scroll.js                 # smooth-scroll-to-section helper

  hooks/
    useReveal.js               # IntersectionObserver hook powering scroll reveals

  data/
    site.js                   # shop phone + address — single source of truth
    menu.js                   # menu items, filters, marquee words, gallery data

  assets/
    menu/                     # drop menu photos here (see README.txt inside)
    gallery/                  # drop gallery photos here (see README.txt inside)

  components/
    Navbar.jsx                # nav, theme toggle, Order Ahead + cart badge
    Hero.jsx                  # headline, stats, 3D cup canvas
    Marquee.jsx                # scrolling ticker
    About.jsx                 # story section + photo
    Menu.jsx                  # filterable menu grid, adds items to cart
    Gallery.jsx                # feeds photos into AccordionGallery
    Testimonial.jsx
    CTA.jsx                   # Get Directions / Call the Bar
    Footer.jsx                 # ember-field animated footer
    OrderPage.jsx               # /order — cart review + call-in checkout
    coffee.jsx                  # generated 3D model component (gltfjsx)
    ui/
      SplitReveal.jsx           # staggered word reveal
      FadeUp.jsx                 # fade + slide up on scroll
      MagneticButton.jsx         # cursor-following button
      CountUp.jsx                 # animated number count-up
      CursorGlow.jsx              # glow blob following the cursor
      EmberField.jsx               # canvas particle field (footer)
      AccordionGallery.jsx          # React Bits component (gallery)
      AccordionGallery.css
```

---

## How the moving parts fit together

### Theme (light/dark)

`ThemeContext` holds `theme` (`"dark"` | `"light"`) and `toggleTheme`.
`App.jsx` sets `data-theme={theme}` on the root `.shop-root` div; every
color in `index.css` is a CSS variable, redefined under
`.shop-root[data-theme="light"]`. Toggle it from the navbar's sun/moon
switch.

### Cart & ordering

`CartContext` holds the cart (`items`, `count`, `total`) and
`addItem` / `updateQty` / `removeItem` / `clearCart`. `Menu.jsx` calls
`addItem` when you click "Get This Brew". The navbar reads `count` for
its badge. `OrderPage.jsx` (route `/order`) is the only place the full
cart is displayed — there's no payment integration; it ends in a
"Call to Place Order" button (`tel:` link) and a "Copy Order Summary"
button, based on the phone number in `src/data/site.js`.

### Routing

`App.jsx` wraps everything in a `BrowserRouter` with two routes: `/`
(the full landing page) and `/order`. The navbar and footer render on
both routes; only the middle content swaps. A `ScrollManager` component
handles smooth-scrolling to `#section` hashes on client-side navigation
(e.g. clicking "Add more items" on `/order` takes you to `/#menu` and
scrolls there), since React Router doesn't do this automatically.

### Images (menu + gallery)

Both `Menu.jsx` and `Gallery.jsx` use
`import.meta.glob("../assets/.../*.{jpg,jpeg,png,webp}", { eager: true })`
to bundle whatever's in the matching `assets/` folder, keyed by filename.
Each item in `src/data/menu.js` has an `image` field naming the expected
file. If no matching file exists, menu items show a plain placeholder
card, and gallery items fall back to a bundled Unsplash photo URL. See
the `README.txt` inside each `assets/` subfolder for exact filenames.

### 3D coffee cup

`components/coffee.jsx` is a generated Three.js scene component (the
kind produced by [gltfjsx](https://github.com/pmndrs/gltfjsx) from a
`.glb` file). It expects a `coffee.glb` model file at `public/coffee.glb`
— **this repo does not include that binary file**; add your own model
there, or replace `Hero.jsx` / `About.jsx`'s `<Coffee />` usage with your
own 3D component or a static image if you don't have one.

---

## Customizing

- **Shop phone & address**: edit `src/data/site.js` — it feeds the CTA
  buttons and the footer automatically.
- **Menu items**: edit `src/data/menu.js` (`MENU` array) — `name`,
  `desc`, `price`, `tag`, `rating`, `image`.
- **Gallery items**: edit `GALLERY_ITEMS` in `src/data/menu.js` —
  `label`, `image` (local filename), `unsplash` (fallback URL).
- **Colors / theme**: edit the CSS variables at the top of `index.css`,
  both the default (dark) block on `.shop-root` and the
  `[data-theme="light"]` override.
- **Copy / sections**: edit directly inside each component in
  `src/components/`.
- **Fonts**: `Fraunces` + `Manrope` are pulled in via `@import` at the
  top of `index.css` — swap for a `<link>` tag in `index.html` if you'd
  rather avoid the render-blocking `@import`.

---

## Deployment

The site is a standard Vite SPA (`npm run build` → static files in
`dist/`), deployable anywhere that serves static files. Because it uses
client-side routing (`/order`), the host needs to fall back to
`index.html` for unknown paths — this repo already includes:

- `public/_redirects` — for **Netlify**
- `vercel.json` — for **Vercel**

Both platforms support "Import from GitHub" for automatic deploys on
every push. If you're using a different host, add an equivalent SPA
fallback rule there.

---

## Credits

- Gallery photos (fallback / defaults) via [Unsplash](https://unsplash.com),
  used under the [Unsplash License](https://unsplash.com/license) —
  free for commercial use, no attribution required.
- `AccordionGallery` component from [React Bits](https://reactbits.dev).
- Fonts: [Fraunces](https://fonts.google.com/specimen/Fraunces) and
  [Manrope](https://fonts.google.com/specimen/Manrope) via Google Fonts.

---

## Known limitations / still placeholder

- Phone number and address in `src/data/site.js` are fictional —
  update before going live.
- Footer social links (Instagram, Journal) and some links
  (Catering, Wholesale) are `href="#"` placeholders.
- No real online payment — ordering is "review cart → call the shop."
- `public/coffee.glb` isn't included; the 3D cup won't render until you
  add your own model there.#   c o f f e e - s h o p 
 
 #   c o f f e e - s h o p 
 
 "# coffee-shop" 
