"use client";
import { motion } from "framer-motion";

const advantages = [
  { label: "Durability",            val: 92, note: "40+ year service life for pipes & profiles" },
  { label: "Chemical Resistance",  val: 88, note: "Resistant to acids, alkalis, and most solvents" },
  { label: "Dielectric Strength",  val: 78, note: "~30 kV/mm — ideal cable insulation" },
  { label: "Flame Retardancy",     val: 85, note: "Inherent via Cl radical scavenging, no additives" },
  { label: "Cost Efficiency",      val: 90, note: "#3 most-produced polymer by volume" },
  { label: "Recyclability",        val: 65, note: "VinylPlus recycled 771,000 t in 2022" },
];

const cards = [
  { title: "Durable",           sub: "40+ year lifespan" },
  { title: "Cost Efficient",    sub: "Low raw material cost" },
  { title: "Flame Retardant",   sub: "Inherent Cl chemistry" },
  { title: "Lightweight",       sub: "Density 1.38 g/cm³" },
  { title: "Chemically Inert",  sub: "Acid & alkali resistant" },
  { title: "Electrically Safe", sub: "30 kV/mm dielectric" },
  { title: "Versatile",         sub: "Rigid or flexible" },
  { title: "Recyclable",        sub: "Resin code #3" },
];

export default function Advantages() {
  return (
    <section id="advantages" className="py-32 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-teal-600 flex items-center gap-2 mb-4">
            <span className="w-5 h-px bg-teal-500" />
            Performance
          </p>
          <h2 className="font-display text-5xl md:text-6xl leading-none text-neutral-900">
            Advantages of PVC
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Bar chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {advantages.map((a, i) => (
              <div key={a.label}>
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="text-sm font-medium text-neutral-700">{a.label}</span>
                  <span className="font-mono text-xs text-teal-600 font-semibold">{a.val}/100</span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full overflow-hidden mb-1">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${a.val}%` }}
                    transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: i * 0.07 + 0.1 }}
                    viewport={{ once: true }}
                    className="h-full rounded-full bg-teal-500"
                  />
                </div>
                <p className="text-neutral-400 text-xs">{a.note}</p>
              </div>
            ))}
          </motion.div>

          {/* Cards grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3"
          >
            {cards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="bg-white border border-neutral-100 rounded-xl p-4 hover:border-teal-200 hover:shadow-sm transition-all"
              >
                <div className="font-semibold text-neutral-900 text-sm mb-0.5">{c.title}</div>
                <div className="text-neutral-400 text-xs">{c.sub}</div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
