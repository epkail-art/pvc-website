"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Fixed random pattern for atactic — same every render
const ATACTIC = [true, false, true, true, false, true, false, false];

const types = [
  {
    id: "atactic",
    label: "Atactic",
    badge: "~95% of all commercial PVC",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
    crystallinity: "~5%",
    tg: "~80°C",
    desc: "Cl groups arranged randomly above and below the backbone. No regular pattern → largely amorphous structure. Softens gradually above Tg, making it easy to extrude and mould. The dominant commercial form.",
    pattern: ATACTIC,
  },
  {
    id: "syndiotactic",
    label: "Syndiotactic",
    badge: "Niche — high-performance",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    crystallinity: "~30–40%",
    tg: "~80°C / Tm 270°C",
    desc: "Cl groups strictly alternate — one above, one below, one above… Perfect regularity allows chains to pack tightly → ~30% crystallinity, superior stiffness, and a true melting point at 270°C. Made via Ziegler–Natta at low temperature.",
    pattern: [true, false, true, false, true, false, true, false],
  },
  {
    id: "isotactic",
    label: "Isotactic",
    badge: "Mainly academic interest",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    crystallinity: "High (theoretical)",
    tg: "N/A — poor stability",
    desc: "All Cl groups on the same side of the backbone. Very regular, but the steric bulk of Cl on every carbon causes strain — poor thermal stability and limited processability. Rarely produced commercially.",
    pattern: [true, true, true, true, true, true, true, true],
  },
];

// ── SVG zigzag chain — proper chemistry diagram ─────────────────────────
function ChainSVG({ pattern, tacticityId }: { pattern: boolean[]; tacticityId: string }) {
  const n = pattern.length; // number of CHCl / CH2 carbons
  const W = 56;  // horizontal spacing between carbons
  const MX = 40; // left margin
  const CY = 80; // centre y of backbone
  const ZIG = 28; // vertical zigzag amplitude
  const CL_OFFSET = 36; // distance Cl pendant hangs from carbon
  const R_C = 16; // carbon atom radius
  const R_CL = 14; // Cl atom radius
  const R_H = 10;  // H atom radius

  // Carbon positions along the zigzag backbone
  const carbons = Array.from({ length: n }, (_, i) => ({
    x: MX + i * W,
    y: CY + (i % 2 === 0 ? -ZIG : ZIG),
  }));

  const svgWidth = MX + (n - 1) * W + MX;
  const svgHeight = 200;

  return (
    <AnimatePresence mode="wait">
      <motion.svg
        key={tacticityId}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* ── Backbone bonds ── */}
        {carbons.map((c, i) => {
          if (i === 0) return null;
          const prev = carbons[i - 1];
          return (
            <motion.line
              key={`bond-${i}`}
              x1={prev.x} y1={prev.y}
              x2={c.x}    y2={c.y}
              stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
            />
          );
        })}

        {/* ── Cl pendants + H substituents ── */}
        {carbons.map((c, i) => {
          const clAbove = pattern[i]; // true = Cl above backbone, false = Cl below
          const clY = clAbove
            ? c.y - CL_OFFSET - R_C
            : c.y + CL_OFFSET + R_C;
          const hY = clAbove
            ? c.y + CL_OFFSET * 0.7 + R_C
            : c.y - CL_OFFSET * 0.7 - R_C;

          return (
            <g key={`subs-${i}`}>
              {/* Cl bond */}
              <motion.line
                x1={c.x} y1={c.y}
                x2={c.x} y2={clY}
                stroke="#5eead4" strokeWidth="2" strokeLinecap="round"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.07 + 0.15 }}
              />
              {/* Cl circle */}
              <motion.circle
                cx={c.x} cy={clY} r={R_CL}
                fill="#f0fdfa" stroke="#0d9488" strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.07 + 0.18 }}
              />
              <motion.text
                x={c.x} y={clY + 4}
                textAnchor="middle"
                fontSize="9" fontWeight="700" fontFamily="monospace"
                fill="#0d9488"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.07 + 0.22 }}
              >
                Cl
              </motion.text>

              {/* H bond */}
              <motion.line
                x1={c.x} y1={c.y}
                x2={c.x} y2={hY}
                stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: i * 0.07 + 0.2 }}
              />
              {/* H circle */}
              <motion.circle
                cx={c.x} cy={hY} r={R_H}
                fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2, delay: i * 0.07 + 0.22 }}
              />
              <motion.text
                x={c.x} y={hY + 3.5}
                textAnchor="middle"
                fontSize="8" fontWeight="600" fontFamily="monospace"
                fill="#94a3b8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.07 + 0.25 }}
              >
                H
              </motion.text>
            </g>
          );
        })}

        {/* ── Carbon atoms (drawn on top of bonds) ── */}
        {carbons.map((c, i) => (
          <g key={`c-${i}`}>
            <motion.circle
              cx={c.x} cy={c.y} r={R_C}
              fill="white" stroke="#94a3b8" strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
            />
            <motion.text
              x={c.x} y={c.y + 4}
              textAnchor="middle"
              fontSize="9" fontWeight="700" fontFamily="monospace"
              fill="#475569"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.07 + 0.05 }}
            >
              C
            </motion.text>
          </g>
        ))}

        {/* ── Chain continuation dots ── */}
        {[-1, 1].map((side) => {
          const edgeC = side === -1 ? carbons[0] : carbons[carbons.length - 1];
          const dotX = edgeC.x + side * 8;
          return [4, 10, 16].map((offset) => (
            <circle
              key={`dot-${side}-${offset}`}
              cx={dotX + side * offset}
              cy={edgeC.y}
              r="2" fill="#cbd5e1"
            />
          ));
        })}
      </motion.svg>
    </AnimatePresence>
  );
}

export default function Types() {
  const [active, setActive] = useState(types[0]);

  return (
    <section id="types" className="py-32 max-w-6xl mx-auto px-6">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-teal-600 flex items-center gap-2 mb-4">
          <span className="w-5 h-px bg-teal-500 inline-block" />
          Stereochemistry
        </p>
        <h2 className="font-display text-5xl md:text-6xl leading-none text-neutral-900">
          Tacticity
        </h2>
        <p className="text-neutral-400 mt-3 max-w-xl text-sm leading-relaxed">
          The spatial arrangement of chlorine substituents along the backbone
          controls crystallinity, mechanical performance, and processability.
          Click each type to see the difference.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="bg-white border border-neutral-100 rounded-2xl p-6 md:p-8 shadow-sm"
      >
        {/* Tab switcher */}
        <div className="flex gap-2 flex-wrap mb-8">
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all border ${
                active.id === t.id
                  ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                  : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-neutral-400"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Zigzag chain SVG */}
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[560px]">
            <ChainSVG pattern={active.pattern} tacticityId={active.id} />
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-5 mt-2 mb-6">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-teal-50 border-2 border-teal-400" />
            <span className="text-xs text-neutral-400 font-mono">Chlorine (Cl) — pendant</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-white border-2 border-slate-300" />
            <span className="text-xs text-neutral-400 font-mono">Carbon (C) — backbone</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-neutral-50 border border-neutral-200" />
            <span className="text-xs text-neutral-400 font-mono">Hydrogen (H)</span>
          </div>
        </div>

        {/* Description row */}
        <div className="pt-5 border-t border-neutral-100 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full border mb-3 ${active.badgeColor}`}>
              {active.badge}
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed">{active.desc}</p>
          </div>
          <div className="space-y-3">
            <div className="bg-neutral-50 rounded-xl p-4">
              <div className="font-mono text-lg font-semibold text-neutral-900">{active.crystallinity}</div>
              <div className="text-[0.62rem] uppercase tracking-widest text-neutral-400 mt-0.5 font-medium">Crystallinity</div>
            </div>
            <div className="bg-neutral-50 rounded-xl p-4">
              <div className="font-mono text-sm font-semibold text-neutral-900">{active.tg}</div>
              <div className="text-[0.62rem] uppercase tracking-widest text-neutral-400 mt-0.5 font-medium">Tg / Tm</div>
            </div>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
