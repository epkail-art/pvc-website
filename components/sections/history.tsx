"use client";
import { motion } from "framer-motion";

const events = [
  {
    year: "1835",
    title: "First Synthesis — Regnault",
    desc: "French chemist Henri Victor Regnault first synthesised vinyl chloride monomer by reacting ethylene dichloride with potassium hydroxide.",
  },
  {
    year: "1872",
    title: "Accidental Polymerisation — Baumann",
    desc: "German chemist Eugen Baumann observed spontaneous polymerisation of vinyl chloride when exposed to sunlight — forming the first PVC as a white powder.",
  },
  {
    year: "1912–1926",
    title: "Plasticisation Breakthrough — Semon",
    desc: "Waldo Semon at BF Goodrich discovered that adding plasticisers like dibutyl phthalate transformed brittle PVC into a flexible, processable material. The pivotal commercial breakthrough.",
  },
  {
    year: "1930s–1940s",
    title: "Industrial Scale Production",
    desc: "Commercial production began in the USA and Germany. WWII accelerated demand — PVC replaced rubber for wire insulation and military applications due to wartime shortages.",
  },
  {
    year: "1950s–Present",
    title: "Global Polymer Industry Leader",
    desc: "Annual production now exceeds 45 million metric tonnes. Modern formulations include heat stabilisers, impact modifiers, and sustainable plasticiser alternatives. PVC ranks third globally, behind only PE and PP.",
  },
];

export default function History() {
  return (
    <section
      id="history"
      className="py-32 bg-neutral-50"
    >
      <div className="max-w-4xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-teal-600 flex items-center gap-2 mb-4">
            <span className="w-5 h-px bg-teal-500" />
            Origins
          </p>
          <h2 className="font-display text-5xl md:text-6xl leading-none text-neutral-900">
            A History of Accidental<br />Discovery
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-10">
          {/* vertical line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-teal-400 to-transparent" />

          {events.map((e, i) => (
            <motion.div
              key={e.year}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-60px" }}
              className="relative pb-12 last:pb-0"
            >
              {/* dot */}
              <div className="absolute -left-10 top-1 w-3 h-3 rounded-full bg-teal-500 border-2 border-neutral-50 shadow-[0_0_0_3px_#ccfbf1]" />

              <div className="font-mono text-xs text-teal-600 tracking-wider font-medium mb-1">
                {e.year}
              </div>
              <div className="font-display text-2xl text-neutral-900 mb-2 leading-snug">
                {e.title}
              </div>
              <p className="text-neutral-500 text-sm leading-relaxed max-w-2xl">
                {e.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
