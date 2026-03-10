"use client";
import { motion } from "framer-motion";

const impacts = [
  { label: "Product Longevity",           val: 90, color: "bg-teal-500",  tag: "Excellent",    tagClass: "bg-teal-50 text-teal-700 border-teal-200" },
  { label: "Mechanical Recyclability",    val: 65, color: "bg-teal-400",  tag: "Good",         tagClass: "bg-teal-50 text-teal-700 border-teal-200" },
  { label: "Plasticiser Migration Risk",  val: 55, color: "bg-amber-400", tag: "Medium",       tagClass: "bg-amber-50 text-amber-700 border-amber-200" },
  { label: "HCl Release (incineration)", val: 80, color: "bg-red-400",   tag: "High concern", tagClass: "bg-red-50 text-red-700 border-red-200" },
  { label: "Dioxin Emissions (prod.)",   val: 70, color: "bg-red-400",   tag: "High concern", tagClass: "bg-red-50 text-red-700 border-red-200" },
];

const benefits = [
  "Long service life (40+ years for pipes and profiles) reduces replacement frequency",
  "Mechanical recycling well-established — rigid PVC can be recycled 5+ times",
  "VinylPlus recycled 771,000 tonnes in 2022, targeting 900,000 t/year by 2025",
  "Energy-efficient production relative to many competing materials",
];

const challenges = [
  "Chlorine-based polymer — requires careful dioxin management in production",
  "Legacy phthalate plasticisers (DEHP) being phased out for DINCH, DOTP alternatives",
  "Mixed and flexible PVC streams are harder to recycle mechanically",
  "Incineration releases HCl without appropriate flue-gas treatment",
];

export default function Environment() {
  return (
    <section id="environment" className="py-32 max-w-6xl mx-auto px-6">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-teal-600 flex items-center gap-2 mb-4">
          <span className="w-5 h-px bg-teal-500" />
          Sustainability
        </p>
        <h2 className="font-display text-5xl md:text-6xl leading-none text-neutral-900 mb-4">
          Environmental Impact
        </h2>
        <p className="text-neutral-400 max-w-xl text-sm leading-relaxed">
          PVC presents a complex environmental picture — genuine durability and recyclability benefits alongside real challenges in chlorine chemistry and end-of-life management.
        </p>
      </motion.div>

      {/* Impact bars */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white border border-neutral-100 rounded-2xl p-7 mb-12 shadow-sm"
      >
        <h3 className="font-semibold text-neutral-900 mb-6 text-sm uppercase tracking-wider">Impact Assessment</h3>
        <div className="space-y-5">
          {impacts.map((im, i) => (
            <div key={im.label} className="flex items-center gap-4">
              <div className="w-52 text-sm text-neutral-600 font-medium flex-shrink-0">{im.label}</div>
              <div className="flex-1 h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${im.val}%` }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: i * 0.08 + 0.1 }}
                  viewport={{ once: true }}
                  className={`h-full rounded-full ${im.color}`}
                />
              </div>
              <div className={`text-xs font-semibold px-2.5 py-1 rounded-full border flex-shrink-0 ${im.tagClass}`}>
                {im.tag}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Benefits / Challenges */}
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-2xl text-neutral-900 mb-5">Benefits</h3>
          <ul className="space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex gap-3 text-sm text-neutral-500 leading-relaxed">
                <span className="text-teal-500 font-bold flex-shrink-0 mt-0.5">→</span>
                {b}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-2xl text-neutral-900 mb-5">Challenges</h3>
          <ul className="space-y-3">
            {challenges.map((c) => (
              <li key={c} className="flex gap-3 text-sm text-neutral-500 leading-relaxed">
                <span className="text-amber-500 font-bold flex-shrink-0 mt-0.5">⚠</span>
                {c}
              </li>
            ))}
          </ul>

          <div className="mt-6 border-l-[3px] border-teal-400 bg-teal-50 rounded-r-xl pl-4 pr-5 py-3 text-sm text-neutral-600 leading-relaxed">
            Chemical recycling via solvent dissolution can recover chlorine and hydrocarbon fractions from contaminated PVC waste — enabling circular use not possible with mechanical recycling.
          </div>
        </motion.div>
      </div>

    </section>
  );
}
