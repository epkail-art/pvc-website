"use client";
import { cn } from "@/lib/utils";

export interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  bgClassName?: string;
}

function DisplayCard({
  className,
  icon,
  title = "Featured",
  description = "Discover amazing content",
  date,
  iconClassName = "text-teal-500",
  titleClassName = "text-teal-600",
  bgClassName = "bg-white",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        // Base: sized card, relative so ::before pseudo works
        "relative flex h-40 w-[28rem] select-none flex-col justify-between",
        "rounded-2xl border border-neutral-200/80 p-5 shadow-sm",
        "transition-all duration-700 cursor-pointer",
        bgClassName,
        className
      )}
    >
      {/* Grayscale overlay that lifts on hover — applied via before: pseudo */}
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
        <p className={cn("font-display text-xl leading-none mb-1.5 tracking-wide", titleClassName)}>
          {title}
        </p>
        <p className="font-sans text-sm text-neutral-500 leading-snug line-clamp-2">
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
  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center w-full">
      {cards.map((card, i) => (
        <DisplayCard key={i} {...card} />
      ))}
    </div>
  );
}
