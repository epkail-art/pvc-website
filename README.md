# PVC Study — Next.js Site

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev
```

Open http://localhost:3000

## Stack
- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion (ContainerScroll + all section animations)
- Instrument Serif / Instrument Sans / JetBrains Mono (Google Fonts)

## Structure
```
app/
  page.tsx          ← assembles all sections
  layout.tsx        ← root layout + metadata
  globals.css       ← Tailwind + font imports

components/
  ui/
    container-scroll-animation.tsx  ← exact Aceternity component
  sections/
    navbar.tsx
    hero.tsx          ← ContainerScroll with PVC pipes image
    what-is-pvc.tsx
    history.tsx       ← staggered timeline
    types.tsx         ← interactive tacticity switcher
    manufacturing.tsx ← animated bar charts
    applications.tsx  ← hover cards grid
    advantages.tsx    ← animated performance bars
    environment.tsx   ← impact assessment
    footer.tsx
```
