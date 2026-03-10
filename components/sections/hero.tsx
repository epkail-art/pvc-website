"use client";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function HeroSection() {
  return (
    <div className="flex flex-col overflow-hidden pt-[120px]">
      <ContainerScroll
        titleComponent={
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-200 bg-teal-50 text-teal-700 text-xs font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              First Synthesised 1835 · World&apos;s #3 Polymer · 45+ Mt / year
            </div>

            <h1 className="font-display text-7xl md:text-[8.5rem] leading-[0.88] text-neutral-900">
              Polyvinyl
              <br />
              <span className="text-teal-600">Chloride</span>
            </h1>

            <p className="text-neutral-500 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
              A complete study — from molecular chain architecture and
              polymerisation mechanisms to industrial manufacturing and
              sustainability.
            </p>

            <div className="flex gap-3 justify-center pt-2 flex-wrap">
              <a href="#what" className="px-6 py-2.5 rounded-lg bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-700 transition-all hover:-translate-y-0.5 hover:shadow-lg">
                Start Reading
              </a>
              <a href="#structure" className="px-6 py-2.5 rounded-lg border border-neutral-200 text-neutral-800 text-sm font-medium hover:border-teal-400 hover:text-teal-600 transition-all">
                Explore Structure →
              </a>
            </div>
          </div>
        }
      >
        {/*
          Place your pvc.jpeg in the /public folder:
            pvc-site/public/pvc.jpeg
          It will render here automatically.
        */}
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/pvc.jpeg"
            alt="PVC"
            className="w-full h-full object-cover object-center"
            draggable={false}
          />

          {/* Gradient overlay — lets stat strip read cleanly */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Formula badge top-left */}
          <div className="absolute top-4 left-5 font-mono text-[0.65rem] text-teal-300/80 bg-slate-900/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-teal-500/20">
            –[CH₂–CHCl]<sub>n</sub>– · MW monomer = 62.5 g/mol
          </div>

          {/* Stat strip */}
          <div className="absolute bottom-0 left-0 right-0 px-6 py-4 flex gap-8 flex-wrap border-t border-white/5 bg-slate-900/60 backdrop-blur-sm">
            {[
              { v: "1835",   l: "First Synthesised" },
              { v: "45+ Mt", l: "Annual Production" },
              { v: "~80°C",  l: "Glass Transition Tg" },
              { v: "#3",     l: "Global Polymer Rank" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-mono text-xl font-semibold text-white leading-none">{s.v}</div>
                <div className="text-white/35 text-[0.65rem] mt-1 uppercase tracking-widest">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
