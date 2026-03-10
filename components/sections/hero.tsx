"use client";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

// SVG industrial PVC pipes scene — always renders, never 404s
function PVCPipesScene() {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-900">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(13,148,136,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(13,148,136,0.08),transparent_50%)]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "linear-gradient(rgba(13,148,136,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(13,148,136,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      {/* SVG pipe system */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 900 420" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pipeH" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.6"/>
            <stop offset="40%" stopColor="#cbd5e1" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#475569" stopOpacity="0.5"/>
          </linearGradient>
          <linearGradient id="pipeV" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#475569" stopOpacity="0.5"/>
            <stop offset="40%" stopColor="#cbd5e1" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.6"/>
          </linearGradient>
          <linearGradient id="pipeTeal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0d9488" stopOpacity="0.4"/>
            <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.4"/>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Main horizontal pipes */}
        <rect x="0" y="100" width="900" height="44" fill="url(#pipeH)" rx="2"/>
        <rect x="0" y="113" width="900" height="18" fill="rgba(255,255,255,0.08)" rx="1"/>
        
        <rect x="0" y="220" width="900" height="56" fill="url(#pipeH)" rx="2"/>
        <rect x="0" y="235" width="900" height="22" fill="rgba(255,255,255,0.06)" rx="1"/>

        <rect x="0" y="330" width="900" height="36" fill="url(#pipeH)" rx="2"/>
        <rect x="0" y="340" width="900" height="14" fill="rgba(255,255,255,0.06)" rx="1"/>

        {/* Vertical connecting pipes */}
        <rect x="160" y="100" width="36" height="276" fill="url(#pipeV)" rx="2"/>
        <rect x="173" y="100" width="12" height="276" fill="rgba(255,255,255,0.08)" rx="1"/>

        <rect x="380" y="80" width="44" height="296" fill="url(#pipeV)" rx="2"/>
        <rect x="395" y="80" width="16" height="296" fill="rgba(255,255,255,0.07)" rx="1"/>

        <rect x="620" y="100" width="32" height="266" fill="url(#pipeV)" rx="2"/>
        <rect x="631" y="100" width="11" height="266" fill="rgba(255,255,255,0.08)" rx="1"/>

        <rect x="800" y="144" width="36" height="186" fill="url(#pipeV)" rx="2"/>
        <rect x="812" y="144" width="12" height="186" fill="rgba(255,255,255,0.06)" rx="1"/>

        {/* Elbow joints */}
        {[
          [142,83],[178,83],[362,63],[424,63],[602,83],[652,83],[782,144],[836,144]
        ].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="22" fill="#334155" stroke="#64748b" strokeWidth="2"/>
        ))}
        {[
          [142,366],[178,366],[362,366],[424,366],[602,366],[652,366]
        ].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="18" fill="#334155" stroke="#64748b" strokeWidth="2"/>
        ))}

        {/* Flange rings on pipes */}
        {[60,240,420,580,760].map(x => (
          <g key={x}>
            <rect x={x} y="96" width="16" height="52" fill="#475569" rx="2"/>
            <rect x={x+2} y="99" width="12" height="46" fill="#64748b" rx="1"/>
          </g>
        ))}
        {[80,300,500,700,860].map(x => (
          <g key={x}>
            <rect x={x} y="214" width="14" height="66" fill="#475569" rx="2"/>
            <rect x={x+2} y="217" width="10" height="60" fill="#64748b" rx="1"/>
          </g>
        ))}

        {/* Teal accent pipe — the "active" one */}
        <rect x="0" y="176" width="900" height="28" fill="url(#pipeTeal)" rx="2" filter="url(#glow)"/>
        <rect x="0" y="183" width="900" height="10" fill="rgba(20,184,166,0.3)" rx="1"/>

        {/* Flow direction arrows on teal pipe */}
        {[100,250,400,550,700,820].map(x => (
          <g key={x} opacity="0.6">
            <polygon points={`${x},186 ${x+18},190 ${x},194`} fill="#14b8a6"/>
          </g>
        ))}

        {/* Molecule labels */}
        <text x="50" y="95" fontSize="9" fontFamily="monospace" fill="rgba(13,148,136,0.7)" fontWeight="600">–[CH₂–CHCl]ₙ–</text>
        <text x="440" y="60" fontSize="9" fontFamily="monospace" fill="rgba(148,163,184,0.6)">uPVC</text>
        <text x="660" y="78" fontSize="9" fontFamily="monospace" fill="rgba(148,163,184,0.6)">DN110</text>
      </svg>

      {/* Formula badge top-left */}
      <div className="absolute top-4 left-5 font-mono text-[0.65rem] text-teal-300/80 bg-slate-900/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-teal-500/20">
        Polyvinyl Chloride · –[CH₂–CHCl]<sub>n</sub>–
      </div>

      {/* Stat strip bottom */}
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
  );
}

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

            <h1 className="font-serif text-5xl md:text-[6.5rem] font-normal leading-[0.95] tracking-tight text-neutral-900">
              Polyvinyl
              <br />
              <em className="text-teal-600 italic font-serif">Chloride</em>
            </h1>

            <p className="text-neutral-500 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
              A complete study — from molecular chain architecture and
              polymerization mechanisms to industrial manufacturing and
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
        <PVCPipesScene />
      </ContainerScroll>
    </div>
  );
}
