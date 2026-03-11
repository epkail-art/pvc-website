"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface DisplayCardProps {
  className?: string;
  key?: number;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon,
  title = "Featured",
  description = "Discover content",
  date,
  iconClassName = "text-teal-600",
  titleClassName = "text-teal-700",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-44 w-[28rem] select-none flex-col justify-between",
        "rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm",
        "transition-all duration-700",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn("p-2 rounded-xl bg-neutral-50 border border-neutral-100", iconClassName)}>
          {icon}
        </div>
        {date && (
          <span className="font-mono text-[0.6rem] text-neutral-400 uppercase tracking-widest mt-1">
            {date}
          </span>
        )}
      </div>
      <div>
        <p className={cn("font-display text-xl leading-none mb-2 tracking-wide", titleClassName)}>
          {title}
        </p>
        {/* DM Sans — no font-serif, no ugly transitional fonts */}
        <p className="text-sm text-neutral-500 leading-snug line-clamp-3" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
          {description}
        </p>
      </div>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards = [] }: DisplayCardsProps) {
  const [fanned, setFanned] = useState(false);

  // Stacked offsets for each card position
  const stackedClasses = [
    // Top card — sits on front, lifts on hover when stacked
    "[grid-area:stack] z-30 cursor-pointer",
    // Middle card
    "[grid-area:stack] z-20 translate-x-10 translate-y-8",
    // Back card
    "[grid-area:stack] z-10 translate-x-20 translate-y-16",
  ];

  // Fanned out — cards spread horizontally
  const fannedClasses = [
    "[grid-area:stack] z-30 -translate-x-[18rem] -translate-y-2",
    "[grid-area:stack] z-20 translate-x-0",
    "[grid-area:stack] z-10 translate-x-[18rem] translate-y-2",
  ];

  return (
    <div
      className="grid [grid-template-areas:'stack'] place-items-center w-full cursor-pointer"
      onClick={() => setFanned((prev: boolean) => !prev)}
      title={fanned ? "Click to stack" : "Click to fan out"}
    >
      {/* Click hint */}
      <div className="[grid-area:stack] z-40 -translate-y-[160px] pointer-events-none">
        <span className="font-mono text-[0.58rem] text-neutral-400 uppercase tracking-widest">
          {fanned ? "↩ click to stack" : "click to expand →"}
        </span>
      </div>

      {(cards.length ? cards : []).map((card, i) => (
        <DisplayCard
          key={i}
          {...card}
          className={cn(
            fanned ? fannedClasses[i] : stackedClasses[i],
            card.className
          )}
        />
      ))}
    </div>
  );
}
