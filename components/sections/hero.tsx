"use client";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="flex flex-col overflow-hidden pt-[120px]">
      <ContainerScroll
        titleComponent={
          <div className="space-y-4">
            {/* eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-200 bg-teal-50 text-teal-700 text-xs font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              First Synthesised 1835 · World's #3 Polymer · 45+ Mt / year
            </div>

            {/* heading */}
            <h1 className="font-serif text-5xl md:text-[6.5rem] font-normal leading-[0.95] tracking-tight text-neutral-900">
              Polyvinyl
              <br />
              <em className="text-teal-600 not-italic font-serif italic">
                Chloride
              </em>
            </h1>

            {/* subtext */}
            <p className="text-neutral-500 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed mt-4">
              A complete study — from molecular chain architecture and
              polymerization mechanisms to industrial manufacturing and
              sustainability.
            </p>

            {/* CTAs */}
            <div className="flex gap-3 justify-center pt-2 flex-wrap">
              <a
                href="#what"
                className="px-6 py-2.5 rounded-lg bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-700 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Start Reading
              </a>
              <a
                href="#structure"
                className="px-6 py-2.5 rounded-lg border border-neutral-200 text-neutral-800 text-sm font-medium hover:border-neutral-400 transition-all"
              >
                Explore Structure →
              </a>
            </div>
          </div>
        }
      >
        {/* ── what's inside the tilted card ── */}
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=1600&q=80"
            alt="PVC pipes"
            fill
            className="object-cover object-center"
            draggable={false}
            priority
          />
          {/* dark overlay so text pops */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* stat strip at bottom */}
          <div className="absolute bottom-0 left-0 right-0 px-6 py-5 flex gap-8 flex-wrap">
            {[
              { v: "1835", l: "First Synthesised" },
              { v: "45+ Mt", l: "Annual Production" },
              { v: "~80°C", l: "Glass Transition Tg" },
              { v: "#3", l: "Global Polymer Rank" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-mono text-2xl font-semibold text-white leading-none">
                  {s.v}
                </div>
                <div className="text-white/50 text-xs mt-1 uppercase tracking-widest">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
