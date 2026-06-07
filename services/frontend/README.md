# Frontend — React App

React 19 + TypeScript + Vite 8 single-page application. Guests authenticate through an animated gate page before landing on the main wedding site.

## Stack

| Package | Version | Purpose |
|---|---|---|
| `react` + `react-dom` | ^19 | UI framework |
| `typescript` | ~6.0 | Type checking |
| `vite` | ^8 | Dev server and bundler |
| `tailwindcss` | ^4 | Utility CSS (via `@tailwindcss/vite` plugin) |
| `@vitejs/plugin-react` | ^6 | React + React Compiler integration |
| `yarn` | 4.15.0 | Package manager |

## Running locally

The dev server starts automatically via the VS Code task, but you can also run it manually:

```bash
cd services/frontend
yarn dev
```

The app is served at `http://localhost:5173`. All `/api/*` requests are proxied to the Flask backend at `http://localhost:5000`.

## Scripts

| Command | Description |
|---|---|
| `yarn dev` | Start Vite dev server with HMR |
| `yarn build` | Type-check and compile to `dist/` |
| `yarn lint` | Run ESLint |
| `yarn preview` | Serve the production build locally |

## Environment Variables

Create a `.env` file in this directory if needed:

| Variable | Default | Description |
|---|---|---|
| `VITE_INVITATION_CODE` | `password` | Client-side fallback code used if the API is unreachable |

## Application Structure

```
src/
├── App.tsx               # Root — routes between GatePage and MainSite
├── main.tsx              # React DOM entry point
├── index.css             # Tailwind import, @theme tokens, global keyframes
├── pages/
│   ├── GatePage.tsx      # Authentication flow (typewriter → card flip → zoom)
│   └── MainSite.tsx      # Main site shell with fullscreen fade-scroll
└── components/
    ├── Navbar.tsx         # Fixed pill nav
    ├── HeroSection.tsx    # Full-bleed hero image
    ├── OurStorySection.tsx  # Horizontal polaroid carousel
    ├── DateSection.tsx    # Date + location display
    ├── EventInfoSection.tsx  # Date-locked event details (unlocks Dec 6 2026)
    ├── FAQsSection.tsx    # Accordion FAQ (one item date-locked)
    ├── RSVPSection.tsx    # Multi-step RSVP form
    └── GallerySection.tsx  # Photo gallery (placeholder)
```

## Routing

There is no React Router. `App.tsx` checks `localStorage` for a stored guest name:

- No name stored → render `GatePage`
- Name stored → render `MainSite`

Authentication sets `localStorage.wedding_guest_name` and triggers a re-render.

## Gate Page Animation Sequence

1. **Typewriter** — four lines type out in sequence on the cream background.
2. **Card fade-in** — an invitation card fades in below the text.
3. **3D flip** — entering the correct code flips the card (CSS `rotateY`) to reveal the name entry form on the back face.
4. **Zoom to site** — submitting a name triggers a CSS scale animation that expands the card to fill the entire viewport, then `onAuthenticated` fires and `MainSite` fades in.

## Fullscreen Scroll

All sections in `MainSite` are stacked with `position: absolute; inset: 0`. Only the active section has `opacity: 1; pointer-events: auto`. Navigation (mouse wheel, touch swipe, keyboard arrows, nav clicks) transitions between sections with a 700ms opacity cross-fade.

Scroll hijacking is smart — if the user is inside a scrollable child element (like the story carousel or FAQ accordion) and hasn't reached its boundary, the section does not advance.

## Styling

Tailwind CSS v4 is configured via `@theme {}` in `src/index.css` — there is no `tailwind.config.js`.

Custom design tokens:

| Token | Value | Usage |
|---|---|---|
| `--color-cream` | `#F5F0E8` | Page background |
| `--color-forest` | `#2D4A35` | Primary text, buttons |
| `--color-sage` | `#8A9E8A` | Secondary text, labels |
| `--color-gold` | `#C8B89A` | Borders, accents |
| `--font-display` | Cormorant Garamond | Headings, monogram |
| `--font-body` | Inter | All body text |

Fonts are loaded via `<link>` tags in `index.html` (not CSS `@import`) to satisfy CSS spec import ordering rules.

## Production Build

The Dockerfile uses a multi-stage build:

- **`react-frontend-dev`** — Yarn + Vite dev server
- **`react-frontend-prod`** — compiles to `dist/`, then copies into an nginx image served on port 80

```bash
docker build --target react-frontend-prod -t wedding-frontend .
docker run -p 80:80 wedding-frontend
```

## Adding packages

```bash
yarn add <package>           # runtime dependency
yarn add -D <package>        # dev dependency
```

Commit both `package.json` and `yarn.lock`.
