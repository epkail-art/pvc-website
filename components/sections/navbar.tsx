"use client";
import { useEffect, useState } from "react";

const links = [
  { href: "#what",          label: "What is PVC" },
  { href: "#history",       label: "History" },
  { href: "#structure",     label: "Structure" },
  { href: "#polymerization", label: "Polymerisation" },
  { href: "#types",         label: "Tacticity" },
  { href: "#manufacturing", label: "Manufacturing" },
  { href: "#applications",  label: "Applications" },
  { href: "#comparison",    label: "vs Other Plastics" },
  { href: "#environment",   label: "Environment" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center justify-between px-6 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-neutral-200 shadow-sm"
          : "bg-white/60 backdrop-blur-sm"
      }`}
    >
      <a href="#" className="font-display text-xl text-neutral-900 hover:text-teal-600 transition-colors flex-shrink-0">
        PVC Study
      </a>

      <ul className="hidden md:flex gap-0.5 list-none overflow-x-auto">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-[0.75rem] font-medium text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 px-2.5 py-1.5 rounded-lg transition-all whitespace-nowrap"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
