"use client";
import { motion } from "framer-motion";

const processes = [
  {
    tag: "~80%",
    tagColor: "bg-teal-50 text-teal-700 border-teal-200",
    barColor: "bg-teal-500",
    barW: "80%",
    name: "Suspension (S-PVC)",
    label: "Dominant Process",
    desc: "VCM dispersed as 50–200 μm droplets in water with suspending agents (HPMC, PVA). Oil-soluble initiator resides in VCM droplets. 40–70°C, 6–12 bar. Produces porous particles with excellent plasticiser absorption. K-value K57–K80.",
  },
  {
    tag: "~12%",
    tagColor: "bg-purple-50 text-purple-700 border-purple-200",
    barColor: "bg-purple-500",
    barW: "12%",
    name: "Emulsion (E-PVC)",
    label: "Fine Particles",
    desc: "VCM emulsified with surfactants, water-soluble initiators generate radicals in the aqueous phase. Produces 0.1–1 μm latex particles. Used for PVC pastes and plastisols: coatings, gloves, artificial leather.",
  },
  {
    tag: "~6%",
    tagColor: "bg-amber-50 text-amber-700 border-amber-200",
    barColor: "bg-amber-500",
    barW: "6%",
    name: "Bulk / Mass",
    label: "Highest Purity",
    desc: "Pure VCM with oil-soluble initiator — no solvent or water. Two-stage process. Cleanest product with fewest residual additives, preferred for food-contact and medical-grade PVC.",
  },
  {
    tag: "~2%",
    tagColor: "bg-red-50 text-red-700 border-red-200",
    barColor: "bg-red-400",
    barW: "2%",
    name: "Solution",
    label: "Speciality",
    desc: "VCM polymerised in organic solvent. Narrow molecular weight distribution, excellent heat transfer control. Used for speciality coatings and adhesives requiring solution-form PVC.",
  },
];

const steps = [
  { n: "01", title: "Polymerisation", desc: "Vinyl chloride monomers are polymerised via free radical mechanism (suspension, emulsion, bulk, or solution) to form PVC resin powder." },
  { n: "02", title: "Compounding", desc: "Stabilisers, plasticisers, lubricants, impact modifiers, and pigments are mixed into the resin at precise ratios to achieve the target formulation." },
  { n: "03", title: "Processing", desc: "The compound is processed via extrusion (pipes, profiles), calendering (film, flooring), injection moulding, or blow moulding at 160–200°C." },
  { n: "04", title: "Finishing", desc: "Products are cooled, cut, inspected, and tested. QC includes dimensional checks, pressure testing (pipes), and UV/impact resistance tests." },
];

export default function Manufacturing() {
  return (
    <section id="manufacturing" className="py-32 bg-neutral-50">
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
            Industrial Processing
          </p>
          <h2 className="font-display text-5xl md:text-6xl leading-none text-neutral-900 mb-4">
            Manufacturing Processes
          </h2>
          <p className="text-neutral-400 max-w-lg text-sm leading-relaxed">
            Four distinct polymerisation routes produce PVC with different particle morphology, purity, and molecular weight — each matched to specific downstream applications.
          </p>
        </motion.div>

        {/* Process cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-20">
          {processes.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true, margin: "-60px" }}
              className="bg-white border border-neutral-100 rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border mb-3 ${p.tagColor}`}>
                {p.label}
              </div>
              <div className="flex items-end justify-between mb-3">
                <div className="font-display text-2xl text-neutral-900">{p.name}</div>
                <div className={`font-mono text-2xl font-semibold ${p.tagColor.split(" ")[1]}`}>{p.tag}</div>
              </div>
              {/* share bar */}
              <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: p.barW }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: i * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className={`h-full rounded-full ${p.barColor}`}
                />
              </div>
              <p className="text-neutral-500 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Process steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-2xl text-neutral-900 mb-8">From Monomer to Product</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="bg-white border border-neutral-100 rounded-xl p-5"
              >
                <div className="font-mono text-xs text-teal-500 font-semibold tracking-widest mb-2">STEP {s.n}</div>
                <div className="font-semibold text-neutral-900 mb-2">{s.title}</div>
                <p className="text-neutral-400 text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
