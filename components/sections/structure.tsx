"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Three.js cannot run on the server — dynamic import with ssr:false
const Polymer3D = dynamic(() => import("@/components/ui/polymer-3d"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
      <span className="font-mono text-xs text-slate-500 animate-pulse">Loading 3D viewer…</span>
    </div>
  ),
});

const structureData = [
  { label: "Hybridisation",        value: "sp³",        note: "tetrahedral ~109.5°" },
  { label: "Degree of Polymer.",   value: "500–1,500",  note: "n in –[CH₂CHCl]ₙ–" },
  { label: "Molecular Weight",     value: "30–100 k",   note: "g/mol" },
  { label: "Crystallinity",        value: "~5%",        note: "atactic — largely amorphous" },
  { label: "Glass Transition Tg",  value: "~80°C",      note: "vs PE at −130°C" },
  { label: "C–Cl Bond Energy",     value: "339 kJ/mol", note: "enables flame retardancy" },
];

export default function Structure() {
  return (
    <section id="structure" className="py-32 bg-neutral-50/70">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-teal-600 flex items-center gap-2 mb-4">
            <span className="w-5 h-px bg-teal-500 inline-block" />
            Molecular Architecture
          </p>
          <h2 className="font-display text-5xl md:text-6xl leading-none text-neutral-900 mb-3">
            Chemical Structure
          </h2>
          <p className="text-neutral-400 text-sm max-w-xl leading-relaxed">
            Each repeat unit –[CH₂–CHCl]– shows how a single pendant chlorine controls the bulk properties of the entire polymer. Drag the 3D model to explore all bonds.
          </p>
        </motion.div>

        {/* 3D Viewer — full width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Polymer3D />
        </motion.div>

        {/* Data grid + explanation */}
        <div className="grid md:grid-cols-2 gap-8 items-start">

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3"
          >
            {structureData.map((d) => (
              <div
                key={d.label}
                className="bg-white border border-neutral-100 rounded-xl p-4 hover:border-teal-200 transition-colors"
              >
                <div className="font-mono text-lg font-semibold text-teal-600 leading-none mb-1">{d.value}</div>
                <div className="text-xs font-semibold text-neutral-700 mb-0.5">{d.label}</div>
                <div className="text-[0.65rem] text-neutral-400">{d.note}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="bg-white border border-neutral-100 rounded-2xl p-6">
              <h3 className="font-serif text-xl text-neutral-900 mb-3">Why chlorine changes everything</h3>
              <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                Chlorine&apos;s electronegativity (3.16 vs C at 2.55) creates a C–Cl dipole of ~1.44 D. This polarity drives PVC&apos;s Tg to ~80°C — compared to polyethylene at −130°C — giving it stiffness without any reinforcement.
              </p>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Add plasticisers to disrupt dipole forces → flexible PVC. Remove them → rigid uPVC. Same base polymer, completely different material.
              </p>
            </div>
            <div className="border-l-[3px] border-teal-400 bg-teal-50/80 rounded-r-xl pl-4 pr-5 py-3 text-sm text-neutral-600 leading-relaxed">
              <strong className="text-neutral-800">Thermal sensitivity:</strong> Above 100°C, PVC releases HCl by dehydrochlorination, causing chain degradation. Thermal stabilisers (organotin, Ca–Zn) are essential during processing at 160–200°C.
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
