"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  FlaskConical, Clock, Atom, Zap, Layers,
  Factory, Building2, BarChart3, Leaf,
} from "lucide-react";

const topics = [
  { href: "#what",           label: "What is PVC",       sub: "Formula, properties, why it matters",         icon: FlaskConical, color: "teal"   },
  { href: "#history",        label: "History",            sub: "190 years — 1835 to present",                icon: Clock,        color: "sky"    },
  { href: "#structure",      label: "Structure",          sub: "sp³ geometry, C–Cl bonds, 3D model",         icon: Atom,         color: "violet" },
  { href: "#polymerization", label: "Polymerisation",     sub: "Free radical mechanism, C=C bond breaking",  icon: Zap,          color: "amber"  },
  { href: "#types",          label: "Tacticity",          sub: "Atactic · Syndiotactic · Isotactic",         icon: Layers,       color: "rose"   },
  { href: "#manufacturing",  label: "Manufacturing",      sub: "Suspension · Emulsion · Bulk processes",     icon: Factory,      color: "orange" },
  { href: "#applications",   label: "Applications",       sub: "Construction · Healthcare · Electrical",     icon: Building2,    color: "emerald"},
  { href: "#comparison",     label: "vs Other Plastics",  sub: "PVC vs PE vs PP — full comparison",          icon: BarChart3,    color: "indigo" },
  { href: "#environment",    label: "Environment",        sub: "Recyclability, lifecycle, sustainability",   icon: Leaf,         color: "green"  },
];

// Tailwind colour maps — must be full strings (no dynamic interpolation)
const colours: Record<string, { icon: string; bg: string; border: string; num: string; bar: string }> = {
  teal:    { icon: "text-teal-600",    bg: "bg-teal-50",    border: "hover:border-teal-400",    num: "text-teal-400",    bar: "bg-teal-500"    },
  sky:     { icon: "text-sky-600",     bg: "bg-sky-50",     border: "hover:border-sky-400",     num: "text-sky-400",     bar: "bg-sky-500"     },
  violet:  { icon: "text-violet-600",  bg: "bg-violet-50",  border: "hover:border-violet-400",  num: "text-violet-400",  bar: "bg-violet-500"  },
  amber:   { icon: "text-amber-600",   bg: "bg-amber-50",   border: "hover:border-amber-400",   num: "text-amber-400",   bar: "bg-amber-500"   },
  rose:    { icon: "text-rose-600",    bg: "bg-rose-50",    border: "hover:border-rose-400",    num: "text-rose-400",    bar: "bg-rose-500"    },
  orange:  { icon: "text-orange-600",  bg: "bg-orange-50",  border: "hover:border-orange-400",  num: "text-orange-400",  bar: "bg-orange-500"  },
  emerald: { icon: "text-emerald-600", bg: "bg-emerald-50", border: "hover:border-emerald-400", num: "text-emerald-400", bar: "bg-emerald-500" },
  indigo:  { icon: "text-indigo-600",  bg: "bg-indigo-50",  border: "hover:border-indigo-400",  num: "text-indigo-400",  bar: "bg-indigo-500"  },
  green:   { icon: "text-green-700",   bg: "bg-green-50",   border: "hover:border-green-500",   num: "text-green-500",   bar: "bg-green-600"   },
};

export default function TopicNavigator() {
  const navigate = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-teal-600 flex items-center gap-2 mb-3">
            <span className="w-5 h-px bg-teal-500 inline-block" />
            Study Guide
          </p>
          <h2 className="font-display text-5xl md:text-6xl leading-none text-neutral-900">
            9 Topics
          </h2>
          <p className="text-neutral-400 text-sm mt-2">
            Click any topic to jump straight to that section.
          </p>
        </div>

        {/* Topic grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {topics.map((t, i) => {
            const c = colours[t.color];
            const Icon = t.icon;
            return (
              <motion.button
                key={t.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                viewport={{ once: true }}
                onClick={() => navigate(t.href)}
                className={cn(
                  "group text-left w-full rounded-2xl border border-neutral-200 bg-white",
                  "p-5 shadow-sm transition-all duration-200",
                  "hover:-translate-y-1 hover:shadow-md",
                  c.border
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("p-2.5 rounded-xl", c.bg, c.icon)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={cn("font-mono text-[0.62rem] tracking-widest", c.num)}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Colour accent bar */}
                <div className={cn("w-6 h-0.5 rounded-full mb-2.5", c.bar)} />

                <div className="font-display text-xl leading-none text-neutral-900 mb-1.5">
                  {t.label}
                </div>
                <div className="text-xs text-neutral-400 leading-relaxed">
                  {t.sub}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
