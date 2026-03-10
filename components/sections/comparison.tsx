"use client";
import { motion } from "framer-motion";

type Rating = "●●●" | "●●○" | "●○○";

interface Row {
  property: string;
  pvc: Rating | string;
  pe: Rating | string;
  pp: Rating | string;
  note: string;
}

const rows: Row[] = [
  { property: "Rigidity",            pvc: "●●●", pe: "●○○", pp: "●●○", note: "uPVC — no plasticisers needed" },
  { property: "Chemical Resistance", pvc: "●●●", pe: "●●●", pp: "●●●", note: "All three excellent vs acids/alkalis" },
  { property: "Flame Retardancy",    pvc: "●●●", pe: "●○○", pp: "●○○", note: "PVC: inherent via Cl — PE/PP require additives" },
  { property: "Cost",                pvc: "●●●", pe: "●●●", pp: "●●●", note: "All are low-cost commodity polymers" },
  { property: "UV Resistance",       pvc: "●●○", pe: "●●○", pp: "●○○", note: "All need UV stabilisers for outdoor use" },
  { property: "Recyclability",       pvc: "●●○", pe: "●●●", pp: "●●●", note: "PVC recycling infrastructure less developed" },
  { property: "Dielectric Strength", pvc: "●●●", pe: "●●○", pp: "●●○", note: "PVC: ~30 kV/mm — preferred cable insulation" },
  { property: "Density (g/cm³)",     pvc: "1.38", pe: "0.92–0.97", pp: "0.90–0.91", note: "PVC heaviest — more material per volume" },
  { property: "Max service temp",    pvc: "60°C",  pe: "80°C",      pp: "100°C",    note: "Rigid PVC softens above ~60°C" },
  { property: "Flexibility",         pvc: "●●●", pe: "●●○", pp: "●●○", note: "PVC uniquely rigid OR flexible by formulation" },
];

function RatingDots({ val }: { val: string }) {
  if (!val.includes("●")) return <span className="font-mono text-sm text-neutral-600">{val}</span>;
  return (
    <span className="flex gap-1 justify-center">
      {val.split("").map((c, i) =>
        c === "●" ? (
          <span key={i} className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
        ) : (
          <span key={i} className="w-2 h-2 rounded-full bg-neutral-200 inline-block" />
        )
      )}
    </span>
  );
}

export default function Comparison() {
  return (
    <section id="comparison" className="py-32 max-w-6xl mx-auto px-6">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-teal-600 flex items-center gap-2 mb-4">
          <span className="w-5 h-px bg-teal-500 inline-block" />
          Analytical Context
        </p>
        <h2 className="font-display text-5xl md:text-6xl leading-none text-neutral-900 mb-3">
          PVC vs Other Plastics
        </h2>
        <p className="text-neutral-400 text-sm max-w-xl leading-relaxed">
          PVC, polyethylene (PE), and polypropylene (PP) are the world's three most-produced polymers.
          Understanding where PVC wins — and loses — reveals why it dominates certain applications.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50">
              <th className="text-left px-5 py-3.5 font-display text-base text-neutral-600 tracking-wider w-1/4">Property</th>
              <th className="text-center px-4 py-3.5 font-display text-lg text-teal-600 tracking-wider w-1/6 bg-teal-50/50">
                <div>PVC</div>
                <div className="font-mono font-normal text-[0.62rem] text-teal-400 mt-0.5">–[CH₂CHCl]ₙ–</div>
              </th>
              <th className="text-center px-4 py-3.5 font-display text-lg text-neutral-500 tracking-wider w-1/6">
                <div>PE</div>
                <div className="font-mono font-normal text-[0.62rem] text-neutral-300 mt-0.5">–[CH₂CH₂]ₙ–</div>
              </th>
              <th className="text-center px-4 py-3.5 font-display text-lg text-neutral-500 tracking-wider w-1/6">
                <div>PP</div>
                <div className="font-mono font-normal text-[0.62rem] text-neutral-300 mt-0.5">–[CH₂CHCH₃]ₙ–</div>
              </th>
              <th className="text-left px-4 py-3.5 font-serif italic text-sm text-neutral-400 hidden md:table-cell">Note</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={row.property}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                viewport={{ once: true }}
                className="border-b border-neutral-50 hover:bg-neutral-50/70 transition-colors"
              >
                <td className="px-5 py-3 font-serif text-base text-neutral-800">{row.property}</td>
                <td className="px-4 py-3 text-center bg-teal-50/30">
                  <RatingDots val={row.pvc} />
                </td>
                <td className="px-4 py-3 text-center">
                  <RatingDots val={row.pe} />
                </td>
                <td className="px-4 py-3 text-center">
                  <RatingDots val={row.pp} />
                </td>
                <td className="px-4 py-3 font-sans text-[0.72rem] text-neutral-400 hidden md:table-cell leading-snug">{row.note}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        <div className="px-5 py-3 bg-neutral-50 border-t border-neutral-100 flex gap-4 items-center">
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
              <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
              <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
            </div>
            <span className="text-xs text-neutral-400">High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
              <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
              <span className="w-2 h-2 rounded-full bg-neutral-200 inline-block" />
            </div>
            <span className="text-xs text-neutral-400">Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
              <span className="w-2 h-2 rounded-full bg-neutral-200 inline-block" />
              <span className="w-2 h-2 rounded-full bg-neutral-200 inline-block" />
            </div>
            <span className="text-xs text-neutral-400">Low</span>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
