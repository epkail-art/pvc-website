# PVC Study — Next.js Scroll-Story Site

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Stack
- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Framer Motion** — ContainerScroll hero + whileInView section reveals
- **clsx + tailwind-merge** — for GlowingEffect component
- **lucide-react** — icons

## Structure
```
app/
  page.tsx          ← narrative section order
  layout.tsx
  globals.css

components/
  ui/
    container-scroll-animation.tsx  ← exact Aceternity ContainerScroll
    glowing-effect.tsx              ← Aceternity GlowingEffect
    display-cards.tsx               ← Aceternity DisplayCards

  sections/
    navbar.tsx
    hero.tsx          ← ContainerScroll + industrial PVC pipes image
    what-is-pvc.tsx   ← GlowingEffect bento grid for properties
    history.tsx       ← animated timeline
    structure.tsx     ← scroll-assembled polymer chain viz  ← id="structure"
    types.tsx         ← interactive tacticity switcher
    manufacturing.tsx ← animated process bars
    applications.tsx  ← icon + bullet card grid
    comparison.tsx    ← PVC vs PE vs PP table
    advantages.tsx
    environment.tsx
    footer.tsx

lib/
  utils.ts           ← cn() helper
```

## What was fixed
1. Hero image → industrial PVC pipes (relevant)
2. "Explore Structure" button → wired to #structure (actually works)
3. Text-heavy sections → GlowingEffect grid, bullet cards, comparison table
4. Scroll-assembled chain animation in Structure section
5. Section order follows scientific narrative logic
6. PVC vs PE vs PP comparison table added
