"use client";
import { useEffect, useState } from "react";


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

    </nav>
  );
}
