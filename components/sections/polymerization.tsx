"use client";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";


export default function Polymerization() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"],
  });

  return (
    <section ref={sectionRef} id="polymerization" className="py-32 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6">


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
