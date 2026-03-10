"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamically import the 3D component — Three.js can't SSR
const Polymer3D = dynamic(() => import("@/components/ui/polymer-3d"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
      <span className="font-mono text-xs text-slate-500 animate-pulse">Loading 3D viewer…</span>
    </div>
  ),
});

function MonomerUnit({ index, total }: { index: number; total: number }) {
  const isCHCl = index % 2 === 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.7 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      viewport={{ once: true, margin: "-20px" }}
      className="flex flex-col items-center gap-1.5 flex-shrink-0"
    >
      {isCHCl ? (
        <div className="w-9 h-9 rounded-full bg-teal-50 border-2 border-teal-400 flex items-center justify-center text-[0.62rem] font-bold font-mono text-teal-700 shadow-sm">Cl</div>
      ) : <div className="w-9 h-9" />}
      <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center text-[0.7rem] font-bold font-mono text-slate-600 shadow-sm z-10">C</div>
      <div className="w-7 h-7 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center text-[0.58rem] font-bold font-mono text-neutral-400">H</div>
    </motion.div>
  );
}

function ScrollChain() {
  const n = 10;
  return (
    <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm overflow-x-auto">
      <div className="text-[0.6rem] font-mono text-neutral-400 uppercase tracking-widest mb-4">2D Chain — atoms appear as you read</div>
      <div className="flex items-center gap-0 min-w-max py-4">
        <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className="font-mono text-lg text-neutral-300 mr-2">···</motion.div>
        {Array.from({ length: n }).map((_, i) => (
          <div key={i} className="flex items-center">
            {i > 0 && (
              <motion.div initial={{scaleX:0}} whileInView={{scaleX:1}} transition={{duration:0.25, delay: i*0.07-0.03}} viewport={{once:true}} className="w-6 h-0.5 bg-neutral-300 origin-left flex-shrink-0"/>
            )}
            <MonomerUnit index={i} total={n}/>
          </div>
        ))}
        <motion.div initial={{opacity:0}} whileInView={{opacity:1}} transition={{delay:n*0.07+0.1}} viewport={{once:true}} className="font-mono text-lg text-neutral-300 ml-2">···</motion.div>
      </div>
      <div className="flex gap-5 mt-2 pt-4 border-t border-neutral-100">
        {[{c:"bg-teal-50 border-2 border-teal-400",l:"Cl"},
          {c:"bg-white border-2 border-slate-300",l:"C"},
          {c:"bg-neutral-50 border border-neutral-200",l:"H"}].map(x=>(
          <div key={x.l} className="flex items-center gap-1.5">
            <div className={`w-4 h-4 rounded-full ${x.c}`}/>
            <span className="text-xs text-neutral-400 font-mono">{x.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const structureData = [
  { label:"Hybridisation",         value:"sp³",       note:"tetrahedral ~109.5°" },
  { label:"Degree of Polymer.",    value:"500–1,500",  note:"n in –[CH₂CHCl]ₙ–" },
  { label:"Molecular Weight",      value:"30–100 k",  note:"g/mol" },
  { label:"Crystallinity",         value:"~5%",        note:"atactic — largely amorphous" },
  { label:"Glass Transition Tg",   value:"~80°C",      note:"vs PE at −130°C" },
  { label:"C–Cl Bond Energy",      value:"339 kJ/mol", note:"enables flame retardancy" },
];

export default function Structure() {
  return (
    <section id="structure" className="py-32 bg-neutral-50/70">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} transition={{duration:0.6}} viewport={{once:true}} className="mb-12">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-teal-600 flex items-center gap-2 mb-4">
            <span className="w-5 h-px bg-teal-500 inline-block"/>Molecular Architecture
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight leading-[1.05] text-neutral-900 mb-3">
            Chemical Structure
          </h2>
          <p className="text-neutral-400 text-sm max-w-xl leading-relaxed">
            Each repeat unit –[CH₂–CHCl]– shows how a single pendant chlorine controls the bulk properties of the entire polymer.
          </p>
        </motion.div>

        {/* 3D Viewer */}
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.6}} viewport={{once:true}} className="mb-8">
          <Polymer3D/>
        </motion.div>

        {/* 2D scroll chain */}
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.5}} viewport={{once:true}} className="mb-10">
          <ScrollChain/>
        </motion.div>

        {/* Data grid + explanation */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div initial={{opacity:0,x:-24}} whileInView={{opacity:1,x:0}} transition={{duration:0.6}} viewport={{once:true}} className="grid grid-cols-2 gap-3">
            {structureData.map((d) => (
              <div key={d.label} className="bg-white border border-neutral-100 rounded-xl p-4 hover:border-teal-200 transition-colors">
                <div className="font-mono text-lg font-semibold text-teal-600 leading-none mb-1">{d.value}</div>
                <div className="text-xs font-semibold text-neutral-700 mb-0.5">{d.label}</div>
                <div className="text-[0.65rem] text-neutral-400">{d.note}</div>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{opacity:0,x:24}} whileInView={{opacity:1,x:0}} transition={{duration:0.6}} viewport={{once:true}} className="space-y-4">
            <div className="bg-white border border-neutral-100 rounded-2xl p-6">
              <h3 className="font-semibold text-neutral-900 mb-3 text-sm uppercase tracking-wider">Why chlorine changes everything</h3>
              <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                Chlorine&apos;s electronegativity (3.16 vs C at 2.55) creates a C–Cl dipole of ~1.44 D. This polarity drives PVC&apos;s Tg to ~80°C — compared to polyethylene at −130°C — and gives it stiffness without reinforcement.
              </p>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Add plasticisers to disrupt those dipole forces → flexible PVC. Remove them → rigid uPVC. Same base polymer, completely different material.
              </p>
            </div>
            <div className="border-l-[3px] border-teal-400 bg-teal-50 rounded-r-xl pl-4 pr-5 py-3 text-sm text-neutral-600 leading-relaxed">
              <strong className="text-neutral-800">Thermal sensitivity:</strong> Above 100°C, PVC releases HCl by dehydrochlorination, causing chain degradation. Thermal stabilisers (organotin, Ca–Zn) are essential for processing at 160–200°C.
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
