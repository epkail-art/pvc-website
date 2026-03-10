"use client";
import { motion } from "framer-motion";
import { Building2, Zap, Car, HeartPulse, Package, Shirt } from "lucide-react";
import { cn } from "@/lib/utils";

const apps = [
  {
    icon: <Building2 className="w-5 h-5" />,
    title: "Construction",
    share: "~60%",
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
    highlight: "border-t-teal-400",
    points: ["Pressure pipes & fittings", "uPVC window profiles", "Roofing membranes", "LVT flooring, siding"],
    note: "A uPVC window frame contains ~6 kg PVC with 40+ year service life",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Electrical",
    share: "~10%",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-100",
    highlight: "border-t-yellow-400",
    points: ["Cable insulation & jacketing", "Conduit & trunking", "Switch gear components"],
    note: "PVC insulates >70% of global low-voltage wire — 30 kV/mm dielectric strength",
  },
  {
    icon: <Car className="w-5 h-5" />,
    title: "Automotive",
    share: "~8%",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    highlight: "border-t-blue-400",
    points: ["Dashboard skins & door panels", "Wiring harnesses", "Seals & gaskets"],
    note: "Flexible PVC provides weight reduction vs rubber while meeting durability standards",
  },
  {
    icon: <HeartPulse className="w-5 h-5" />,
    title: "Healthcare",
    share: "~5%",
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-100",
    highlight: "border-t-red-400",
    points: ["Blood bags & IV tubing", "Catheters & oxygen masks", "Surgical gloves"],
    note: "Medical-grade PVC meets ISO 10993 biocompatibility. Phthalate-free alternatives increasing.",
  },
  {
    icon: <Package className="w-5 h-5" />,
    title: "Packaging",
    share: "~8%",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
    highlight: "border-t-purple-400",
    points: ["Blister packs & clamshells", "Pharmaceutical packaging", "Shrink film & bottle caps"],
    note: "PVC's clarity, stiffness, and barrier properties suit pharma and food-contact packaging",
  },
  {
    icon: <Shirt className="w-5 h-5" />,
    title: "Consumer Goods",
    share: "~9%",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
    highlight: "border-t-orange-400",
    points: ["Synthetic leather & flooring", "Garden hoses & sportswear", "Credit cards & rainwear"],
    note: "Flexible PVC mimics leather textures and accepts vivid colour — omnipresent in daily life",
  },
];

export default function Applications() {
  return (
    <section id="applications" className="py-32 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-teal-600 flex items-center gap-2 mb-4">
            <span className="w-5 h-px bg-teal-500 inline-block" />
            Industrial Use
          </p>
          <h2 className="font-display text-5xl md:text-6xl leading-none text-neutral-900 mb-3">
            Applications of PVC
          </h2>
          <p className="text-neutral-400 text-sm max-w-xl leading-relaxed">
            PVC pipes carry water beneath every modern city. Blood bags in hospitals, cable insulation in walls,
            window frames in buildings — PVC is infrastructure most people never see.
          </p>
        </motion.div>

        {/* Visual cards — icon + bullet points, not prose */}
        <div className="grid md:grid-cols-3 gap-5">
          {apps.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              viewport={{ once: true, margin: "-60px" }}
              className={cn(
                "group bg-white border border-neutral-100 rounded-2xl overflow-hidden",
                "hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300",
                "border-t-2", a.highlight
              )}
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("p-2 rounded-xl", a.bg, a.border, "border", a.color)}>
                    {a.icon}
                  </div>
                  <div className={cn("font-mono text-xs font-semibold px-2 py-1 rounded-full", a.bg, a.color)}>
                    {a.share} of global use
                  </div>
                </div>

                <div className="font-display text-2xl text-neutral-900 mb-3">{a.title}</div>

                {/* Bullet points — visual, scannable */}
                <ul className="space-y-1.5 mb-4">
                  {a.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-neutral-500">
                      <span className={cn("mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0", a.bg.replace("50","400").replace("bg-","bg-"))} />
                      {pt}
                    </li>
                  ))}
                </ul>

                {/* Note */}
                <div className={cn("text-xs leading-relaxed p-3 rounded-xl", a.bg, "text-neutral-500")}>
                  {a.note}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
