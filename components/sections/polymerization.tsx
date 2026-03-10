"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const N = 7;

const MONOMERS = [
  { startX: -220, startY: -55 },
  { startX:  200, startY: -75 },
  { startX: -170, startY:  60 },
  { startX:  240, startY:  45 },
  { startX: -130, startY: -85 },
  { startX:  190, startY: -20 },
  { startX: -180, startY:  80 },
];

const CHAIN_X = Array.from({ length: N }, (_, i) => (i - (N - 1) / 2) * 82);
const ZIG = 24;

function chainY(i: number) { return i % 2 === 0 ? -ZIG : ZIG; }
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}
function monomerP(overall: number, i: number) {
  return Math.max(0, Math.min(1, (overall - i * 0.1) / 0.3));
}
function bondP(overall: number) {
  return Math.max(0, Math.min(1, (overall - 0.65) / 0.3));
}

function SceneCanvas({ progress }: { progress: number }) {
  const bp = bondP(progress);

  return (
    <svg viewBox="-340 -130 680 260" className="w-full" style={{ height: 280 }} xmlns="http://www.w3.org/2000/svg">
      {/* Bonds */}
      {Array.from({ length: N - 1 }, (_, i) => {
        const p1 = monomerP(progress, i), p2 = monomerP(progress, i + 1);
        const bv = Math.max(0, Math.min(1, bp * Math.min(p1, p2)));
        const x1 = lerp(MONOMERS[i].startX, CHAIN_X[i], p1);
        const y1 = lerp(MONOMERS[i].startY, chainY(i), p1);
        const x2 = lerp(MONOMERS[i+1].startX, CHAIN_X[i+1], p2);
        const y2 = lerp(MONOMERS[i+1].startY, chainY(i+1), p2);
        return <line key={i} x1={x1} y1={y1}
          x2={x1+(x2-x1)*bv} y2={y1+(y2-y1)*bv}
          stroke="#475569" strokeWidth="3.5" strokeLinecap="round" opacity={bv}/>;
      })}

      {/* Monomers */}
      {MONOMERS.map((m, i) => {
        const p = monomerP(progress, i);
        const x = lerp(m.startX, CHAIN_X[i], p);
        const y = lerp(m.startY, chainY(i), p);
        const sc = lerp(0.75, 1, p);
        const op = lerp(0.5, 1, p);
        const isCl = i % 2 === 1;
        const side = i % 4 < 2 ? -1 : 1;
        const clVis = Math.max(0, (p - 0.5) / 0.5);
        const hVis  = Math.max(0, (p - 0.4) / 0.6);
        const dbFade = Math.max(0, 1 - p / 0.6);

        return (
          <g key={i} transform={`translate(${x},${y}) scale(${sc})`} opacity={op}>
            <line x1="-14" y1="0" x2="14" y2="0" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
            <line x1="-14" y1="-6" x2="14" y2="-6" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" opacity={dbFade}/>
            <circle cx="-15" cy="0" r="14" fill="white" stroke="#94a3b8" strokeWidth="2"/>
            <text x="-15" y="4.5" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="monospace" fill="#475569">C</text>
            <circle cx="15" cy="0" r="14" fill="white" stroke="#94a3b8" strokeWidth="2"/>
            <text x="15" y="4.5" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="monospace" fill="#475569">C</text>
            {isCl && (
              <g opacity={clVis}>
                <line x1="15" y1="0" x2="15" y2={side*42} stroke="#5eead4" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="15" cy={side*42} r="13" fill="#f0fdfa" stroke="#0d9488" strokeWidth="2.5"/>
                <text x="15" y={side*42+4.5} textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="monospace" fill="#0d9488">Cl</text>
              </g>
            )}
            <g opacity={hVis}>
              <line x1="-15" y1="0" x2="-15" y2={isCl ? side*-32 : -32} stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="-15" cy={isCl ? side*-32 : -32} r="9" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5"/>
              <text x="-15" y={(isCl ? side*-32 : -32)+3.5} textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#94a3b8">H</text>
              {!isCl && <>
                <line x1="15" y1="0" x2="15" y2="-30" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="15" cy="-30" r="9" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5"/>
                <text x="15" y="-26.5" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#94a3b8">H</text>
              </>}
            </g>
          </g>
        );
      })}

      {/* Continuation dots */}
      {progress > 0.82 && [-1,1].map(side => {
        const ei = side===-1 ? 0 : N-1;
        return [10,18,26].map(off => (
          <circle key={`${side}-${off}`}
            cx={CHAIN_X[ei]+side*off} cy={chainY(ei)}
            r="2.5" fill="#475569" opacity={(progress-0.82)/0.18}/>
        ));
      })}
    </svg>
  );
}

const steps = [
  { step:"01", title:"Initiation",    eq:"R–O–O–R  →  2 R–O•",
    body:"A thermal initiator (AIBN or organic peroxide) undergoes homolytic cleavage, generating free radicals that attack the C=C double bond of vinyl chloride monomer." },
  { step:"02", title:"Propagation",   eq:"~Ċ + CH₂=CHCl  →  chain (ΔH = −96 kJ/mol)",
    body:"Each radical adds VCM monomers head-to-tail. The double bond opens, a new C–C bond forms, and the radical propagates down the growing chain at ~12,300 L/(mol·s)." },
  { step:"03", title:"Termination",   eq:"2 R•  →  R–R  or  R–H + R=",
    body:"Chain growth ends by combination or disproportionation. The Trommsdorff effect causes auto-acceleration above ~20% conversion — a key reactor design constraint." },
];

export default function PolymerizationScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(v));

  const productOpacity = Math.max(0, (progress - 0.78) / 0.15);
  const statusText = progress < 0.35
    ? "CH₂=CHCl — vinyl chloride monomers, free radical initiator"
    : progress < 0.7
    ? "Radicals opening C=C double bonds — chain propagating…"
    : "–[CH₂–CHCl]ₙ– — polyvinyl chloride chain formed";

  return (
    <section ref={containerRef} className="section-dark py-32">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
          transition={{duration:0.6}} viewport={{once:true}}
          className="mb-16 text-center">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-teal-400 flex items-center justify-center gap-2 mb-4">
            <span className="w-5 h-px bg-teal-500"/>Scroll to Watch<span className="w-5 h-px bg-teal-500"/>
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight text-white mb-3">
            Free Radical Polymerisation
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
            Scroll down to watch vinyl chloride monomers link into a PVC chain in real time.
          </p>
        </motion.div>

        {/* Sticky canvas */}
        <div className="sticky top-24 z-10">
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6">
            <div className="text-center mb-2">
              <span className="font-mono text-xs text-slate-500 tracking-wider transition-all duration-300">
                {statusText}
              </span>
            </div>

            <SceneCanvas progress={progress} />

            <div className="text-center mt-2 h-9">
              <div className="inline-flex items-center gap-3 bg-teal-950/60 border border-teal-500/30 rounded-full px-5 py-2 transition-opacity duration-500"
                style={{opacity: productOpacity}}>
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"/>
                <span className="font-mono text-xs text-teal-300 tracking-wider">
                  PVC chain formed · n ≈ 500–1500 · MW ≈ 30–100 k g/mol
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll-alongside step cards */}
        <div className="mt-[-200px] space-y-64 pb-32">
          {steps.map((s) => (
            <motion.div key={s.step}
              initial={{opacity:0,x:50}} whileInView={{opacity:1,x:0}}
              transition={{duration:0.6}} viewport={{once:true,margin:"-80px"}}
              className="ml-auto max-w-sm bg-slate-800/80 border border-slate-700/50 rounded-2xl p-6">
              <div className="font-mono text-xs text-teal-400 tracking-widest mb-2">STAGE {s.step}</div>
              <div className="font-serif text-xl text-white mb-3">{s.title}</div>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">{s.body}</p>
              <div className="font-mono text-xs text-teal-300 bg-slate-950/60 rounded-lg px-4 py-2.5 border border-teal-900/40">
                {s.eq}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
