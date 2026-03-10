"use client";
import { motion } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import { Zap, Shield, Recycle, DollarSign, Thermometer } from "lucide-react";

const properties: Array<{area: string; icon: React.ReactNode; title: string; description: string}> = [
  {
    area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
    icon: <Shield className="h-4 w-4" />,
    title: "Chemical Resistance",
    description: "Resistant to most acids, alkalis, salts and many organic solvents. Ideal for pipes carrying corrosive fluids.",
  },
  {
    area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
    icon: <DollarSign className="h-4 w-4" />,
    title: "Cost Efficiency",
    description: "One of the most economical polymers. 57% of its mass is chlorine derived from cheap, abundant salt (NaCl).",
  },
  {
    area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
    icon: <Zap className="h-4 w-4" />,
    title: "Inherent Flame Retardancy",
    description: "Chlorine acts as a radical scavenger during combustion — PVC is self-extinguishing without additional flame retardant additives, unlike polyethylene or polypropylene.",
  },
  {
    area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
    icon: <Thermometer className="h-4 w-4" />,
    title: "Tunable Stiffness",
    description: "Add plasticisers → flexible PVC (cables, flooring). Remove them → rigid uPVC (pipes, window frames). Same base polymer, completely different properties.",
  },
  {
    area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
    icon: <Recycle className="h-4 w-4" />,
    title: "Durability & Recyclability",
    description: "PVC pipes last 40–100 years. Rigid PVC (resin code #3) is mechanically recyclable 5+ times. VinylPlus recycled 771,000 tonnes in 2022.",
  },
];

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function GridItem({ area, icon, title, description }: GridItemProps) {
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-neutral-200 p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={2} />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-neutral-100 bg-white p-6 shadow-sm">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-neutral-100 bg-neutral-50 p-2 text-teal-600">
              {icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold font-sans tracking-tight text-neutral-900">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-500">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function WhatIsPVC() {
  return (
    <section id="what" className="py-32 max-w-6xl mx-auto px-6">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-14"
      >
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-teal-600 flex items-center gap-2 mb-4">
          <span className="w-5 h-px bg-teal-500 inline-block" />
          The Material
        </p>
        <h2 className="font-display text-5xl md:text-6xl leading-none text-neutral-900 mb-3">
          Why PVC Matters
        </h2>
        <p className="text-neutral-400 text-sm max-w-xl leading-relaxed">
          PVC's unique property profile — no other single polymer covers this range without modification.
        </p>
      </motion.div>

      {/* GlowingEffect bento grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
          {properties.map((p) => (
            <GridItem key={p.title} {...p} />
          ))}
        </ul>
      </motion.div>

      {/* Molecular formula card + bond data — visual, not a wall of text */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white border border-neutral-100 rounded-2xl p-8 shadow-sm"
        >
          {/* SVG backbone diagram */}
          <div className="text-[0.6rem] font-mono text-neutral-400 uppercase tracking-widest mb-3">Repeat Unit</div>
          <div className="font-mono text-2xl text-teal-600 text-center py-4 border-y border-neutral-100 mb-6">
            –[CH₂–CHCl]<sub>n</sub>–
          </div>
          {/* 
            Proper sp3 zigzag backbone: 6 carbons, Cl + H pendants on each CHCl,
            H+H pendants on each CH2. Viewbox expanded to fit H atoms above/below.
          */}
          <svg viewBox="-8 -5 456 175" className="w-full" xmlns="http://www.w3.org/2000/svg">
            {/* ── Backbone bonds ── */}
            <line x1="48" y1="78" x2="108" y2="50" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="108" y1="50" x2="168" y2="78" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="168" y1="78" x2="228" y2="50" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="228" y1="50" x2="288" y2="78" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="288" y1="78" x2="348" y2="50" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="348" y1="50" x2="400" y2="68" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" opacity="0.5"/>

            {/* ── C1 (CH2) at (48,78) — 2×H pendants ── */}
            <line x1="48" y1="78" x2="26" y2="56" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="22" cy="52" r="9" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5"/>
            <text x="22" y="55.5" textAnchor="middle" fontSize="7" fontWeight="600" fontFamily="monospace" fill="#94a3b8">H</text>
            <line x1="48" y1="78" x2="26" y2="100" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="22" cy="104" r="9" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5"/>
            <text x="22" y="107.5" textAnchor="middle" fontSize="7" fontWeight="600" fontFamily="monospace" fill="#94a3b8">H</text>

            {/* ── C2 (CHCl) at (108,50) — Cl above, H below ── */}
            <line x1="108" y1="50" x2="108" y2="18" stroke="#5eead4" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="108" cy="12" r="11" fill="#f0fdfa" stroke="#0d9488" strokeWidth="2"/>
            <text x="108" y="15.5" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="monospace" fill="#0d9488">Cl</text>
            <line x1="108" y1="50" x2="108" y2="82" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="108" cy="88" r="9" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5"/>
            <text x="108" y="91.5" textAnchor="middle" fontSize="7" fontWeight="600" fontFamily="monospace" fill="#94a3b8">H</text>

            {/* ── C3 (CH2) at (168,78) — 2×H pendants ── */}
            <line x1="168" y1="78" x2="168" y2="52" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="168" cy="46" r="9" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5"/>
            <text x="168" y="49.5" textAnchor="middle" fontSize="7" fontWeight="600" fontFamily="monospace" fill="#94a3b8">H</text>
            <line x1="168" y1="78" x2="168" y2="104" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="168" cy="110" r="9" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5"/>
            <text x="168" y="113.5" textAnchor="middle" fontSize="7" fontWeight="600" fontFamily="monospace" fill="#94a3b8">H</text>

            {/* ── C4 (CHCl) at (228,50) — Cl above, H below ── */}
            <line x1="228" y1="50" x2="228" y2="18" stroke="#5eead4" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="228" cy="12" r="11" fill="#f0fdfa" stroke="#0d9488" strokeWidth="2"/>
            <text x="228" y="15.5" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="monospace" fill="#0d9488">Cl</text>
            <line x1="228" y1="50" x2="228" y2="82" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="228" cy="88" r="9" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5"/>
            <text x="228" y="91.5" textAnchor="middle" fontSize="7" fontWeight="600" fontFamily="monospace" fill="#94a3b8">H</text>

            {/* ── C5 (CH2) at (288,78) — 2×H pendants ── */}
            <line x1="288" y1="78" x2="288" y2="52" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="288" cy="46" r="9" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5"/>
            <text x="288" y="49.5" textAnchor="middle" fontSize="7" fontWeight="600" fontFamily="monospace" fill="#94a3b8">H</text>
            <line x1="288" y1="78" x2="288" y2="104" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="288" cy="110" r="9" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5"/>
            <text x="288" y="113.5" textAnchor="middle" fontSize="7" fontWeight="600" fontFamily="monospace" fill="#94a3b8">H</text>

            {/* ── C6 (CHCl) at (348,50) — Cl above, H below ── */}
            <line x1="348" y1="50" x2="348" y2="18" stroke="#5eead4" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="348" cy="12" r="11" fill="#f0fdfa" stroke="#0d9488" strokeWidth="2"/>
            <text x="348" y="15.5" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="monospace" fill="#0d9488">Cl</text>
            <line x1="348" y1="50" x2="348" y2="82" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="348" cy="88" r="9" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5"/>
            <text x="348" y="91.5" textAnchor="middle" fontSize="7" fontWeight="600" fontFamily="monospace" fill="#94a3b8">H</text>

            {/* ── Carbon atoms (on top) ── */}
            {[{x:48,y:78},{x:108,y:50},{x:168,y:78},{x:228,y:50},{x:288,y:78},{x:348,y:50}].map(({x,y},i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="14" fill="white" stroke="#94a3b8" strokeWidth="2"/>
                <text x={x} y={y+4.5} textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="monospace" fill="#475569">C</text>
              </g>
            ))}

            {/* ── Legend ── */}
            <circle cx="16" cy="148" r="6" fill="#f0fdfa" stroke="#0d9488" strokeWidth="1.5"/>
            <text x="28" y="151.5" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">Cl — pendant</text>
            <circle cx="120" cy="148" r="6" fill="white" stroke="#94a3b8" strokeWidth="1.5"/>
            <text x="132" y="151.5" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">C — backbone</text>
            <circle cx="224" cy="148" r="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5"/>
            <text x="236" y="151.5" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">H — hydrogen</text>
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-3"
        >
          {[
            { v: "1.54 Å",     l: "C–C Bond Length" },
            { v: "1.77 Å",     l: "C–Cl Bond Length" },
            { v: "109.5°",     l: "Bond Angle (sp³)" },
            { v: "62.5 g/mol", l: "Monomer MW" },
            { v: "3.16",       l: "Cl Electronegativity" },
            { v: "1.44 D",     l: "Dipole Moment" },
            { v: "339 kJ/mol", l: "C–Cl Bond Energy" },
            { v: "~80°C",      l: "Glass Transition Tg" },
          ].map((b) => (
            <div key={b.l} className="bg-neutral-50 border border-neutral-100 rounded-xl p-3 hover:border-teal-200 transition-colors">
              <div className="font-mono text-sm font-semibold text-neutral-900">{b.v}</div>
              <div className="text-[0.6rem] uppercase tracking-wider text-neutral-400 mt-0.5 font-medium">{b.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
