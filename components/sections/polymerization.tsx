"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function FreeMonomer({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="flex flex-col items-center gap-1 bg-white border border-neutral-100 rounded-xl p-3 shadow-sm hover:border-teal-200 transition-colors"
    >
      <div className="font-mono text-xs text-center text-neutral-500">CH<sub>2</sub>=CHCl</div>
      <div className="flex items-end gap-1 py-1">
        <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-[0.52rem] font-bold font-mono text-slate-500">C</div>
        <div className="flex flex-col gap-[3px] mb-1.5">
          <div className="w-4 h-[1.5px] bg-slate-300"/>
          <div className="w-4 h-[1.5px] bg-slate-300"/>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-5 h-5 rounded-full bg-teal-50 border border-teal-300 flex items-center justify-center text-[0.48rem] font-bold font-mono text-teal-600">Cl</div>
          <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-[0.52rem] font-bold font-mono text-slate-500">C</div>
        </div>
      </div>
      <div className="font-mono text-[0.58rem] text-teal-500">vinyl chloride</div>
    </motion.div>
  );
}

function ScrollMonomer({ index, total, scrollProgress }: {
  index: number; total: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = 0.15 + (index / total) * 0.7;
  const end = start + 0.12;
  const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
  const y = useTransform(scrollProgress, [start, end], [-40, 0]);
  const bondScale = useTransform(scrollProgress, [start - 0.05, start + 0.05], [0, 1]);
  const isOdd = index % 2 === 1;

  return (
    <div className="flex items-center flex-shrink-0">
      {index > 0 && (
        <motion.div
          style={{ scaleX: bondScale, opacity }}
          className="w-7 h-[2.5px] bg-neutral-300 origin-left flex-shrink-0"
        />
      )}
      <motion.div style={{ opacity, y }} className="flex flex-col items-center gap-1 flex-shrink-0">
        {!isOdd ? (
          <>
            <div className="w-8 h-8 rounded-full bg-teal-50 border-2 border-teal-400 flex items-center justify-center text-[0.58rem] font-bold font-mono text-teal-700">Cl</div>
            <div className="w-[2px] h-2.5 bg-teal-200" />
          </>
        ) : <div className="w-8 h-[42px]" />}
        <div className="w-9 h-9 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center text-[0.65rem] font-bold font-mono text-slate-600 shadow-sm z-10">C</div>
        {isOdd ? (
          <>
            <div className="w-[2px] h-2.5 bg-teal-200" />
            <div className="w-8 h-8 rounded-full bg-teal-50 border-2 border-teal-400 flex items-center justify-center text-[0.58rem] font-bold font-mono text-teal-700">Cl</div>
          </>
        ) : <div className="w-8 h-[42px]" />}
      </motion.div>
    </div>
  );
}

function ChainProgress({ n, scrollProgress }: {
  n: number; scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const trackScale = useTransform(scrollProgress, [0.15, 0.95], [0, 1]);
  return (
    <div className="overflow-x-auto pb-2">
      <div className="min-w-[520px] relative">
        <motion.div style={{ scaleX: trackScale }} className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal-400/20 origin-left rounded-full" />
        <div className="flex items-center py-4 gap-0">
          {Array.from({ length: n }).map((_, i) => (
            <ScrollMonomer key={i} index={i} total={n} scrollProgress={scrollProgress} />
          ))}
          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
            {[0,1,2].map(j => <div key={j} className="w-1.5 h-1.5 rounded-full bg-neutral-200" />)}
          </div>
        </div>
        <div className="flex gap-5 pt-2 border-t border-neutral-50">
          {[
            { c: "bg-teal-50 border-2 border-teal-400", l: "Chlorine (Cl)" },
            { c: "bg-white border-2 border-slate-300",  l: "Carbon (C)" },
          ].map(x => (
            <div key={x.l} className="flex items-center gap-1.5">
              <div className={`w-4 h-4 rounded-full ${x.c}`} />
              <span className="text-xs text-neutral-400 font-mono">{x.l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Polymerization() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"],
  });

  return (
    <section ref={sectionRef} id="polymerization" className="py-32 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6">

        {/*
          ── Hero image ──────────────────────────────────────
          Place your own image at: public/pvc.jpeg
          This slot is reserved for it.
        */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 w-full h-[340px] rounded-2xl overflow-hidden relative bg-neutral-100 border border-neutral-200"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/pvc.jpeg"
            alt="PVC — polyvinyl chloride"
            className="w-full h-full object-cover object-center"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              // If image not found yet, show a clean placeholder
              const t = e.currentTarget as HTMLImageElement;
              t.style.display = "none";
              const parent = t.parentElement;
              if (parent && !parent.querySelector(".img-placeholder")) {
                const ph = document.createElement("div");
                ph.className = "img-placeholder w-full h-full flex flex-col items-center justify-center gap-3";
                ph.innerHTML = `
                  <div style="font-family:monospace;font-size:0.7rem;color:#9ca3af;letter-spacing:0.15em;text-transform:uppercase">
                    Add your image to
                  </div>
                  <div style="font-family:monospace;font-size:1rem;color:#0d9488;font-weight:600">
                    public/pvc.jpeg
                  </div>
                  <div style="font-family:monospace;font-size:0.65rem;color:#d1d5db">
                    Recommended: 1600 × 700px · .jpeg or .jpg
                  </div>`;
                parent.appendChild(ph);
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-50/60 to-transparent pointer-events-none" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-14">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-teal-600 flex items-center gap-2 mb-4">
            <span className="w-5 h-px bg-teal-500 inline-block" />
            Mechanism
          </p>
          <h2 className="font-display text-5xl md:text-6xl leading-none text-neutral-900">
            Polymerisation
          </h2>
          <p className="text-neutral-400 mt-3 max-w-xl text-sm leading-relaxed">
            Scroll through this section to watch vinyl chloride monomers chain together into PVC.
            Free-radical addition polymerisation — the C=C double bond opens and links the backbone.
          </p>
        </motion.div>

        {/* Reaction row */}
        <div className="flex items-center gap-5 flex-wrap mb-12">
          {[0, 0.1, 0.2].map((d, i) => <FreeMonomer key={i} delay={d} />)}
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="font-mono text-xl text-neutral-300">···</motion.span>
          <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.5, delay: 0.5 }} viewport={{ once: true }} className="flex flex-col items-center gap-0.5 origin-left flex-shrink-0">
            <span className="font-mono text-[0.62rem] text-teal-500 whitespace-nowrap">R· free-radical</span>
            <div className="flex items-center"><div className="w-14 h-[2px] bg-teal-400"/><span className="text-teal-400 text-lg">→</span></div>
            <span className="font-mono text-[0.62rem] text-neutral-400 whitespace-nowrap">n CH₂=CHCl</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} viewport={{ once: true }} className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 flex-shrink-0">
            <div className="font-mono text-sm font-semibold text-teal-700">–[CH₂–CHCl]ₙ–</div>
            <div className="font-mono text-[0.62rem] text-teal-500 mt-0.5">PVC · n = 500–1500</div>
          </motion.div>
        </div>

        {/* Scroll-assembled chain */}
        <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm mb-10">
          <div className="text-[0.6rem] font-mono text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="animate-bounce inline-block">↓</span> scroll to polymerise
          </div>
          <ChainProgress n={10} scrollProgress={scrollYProgress} />
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { n: "01", t: "Initiation",   d: "A free radical (R·) attacks the CH₂ end of vinyl chloride, opening the C=C double bond and creating a new radical centre at the terminal carbon." },
            { n: "02", t: "Propagation",  d: "The chain radical adds successive monomers — each addition extends the backbone by –CH₂–CHCl– and regenerates the radical. Rate ∝ [M][R·]^0.5." },
            { n: "03", t: "Termination",  d: "Two radicals couple or disproportionate. Chain length (degree of polymerisation n = 500–1500) is set by initiator concentration and reaction temperature." },
          ].map(s => (
            <motion.div key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }} className="bg-white border border-neutral-100 rounded-2xl p-5 hover:border-teal-200 transition-colors">
              <div className="font-mono text-3xl font-semibold text-neutral-100 mb-2">{s.n}</div>
              <div className="font-semibold text-neutral-800 text-sm mb-2">{s.t}</div>
              <p className="text-neutral-500 text-xs leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
