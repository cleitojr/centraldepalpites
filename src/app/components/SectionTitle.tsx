import React from "react"
import { cn } from "../lib/utils"

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  action?: React.ReactNode;
}

export function SectionTitle({ title, subtitle, className, action }: SectionTitleProps) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4", className)}>
      <div className="relative">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1.5 h-8 bg-gradient-to-b from-[#00FF88] to-[#00CCAA] rounded-full shadow-[0_0_15px_-2px_#00FF88]" />
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white italic uppercase">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-slate-400 font-medium ml-4.5 border-l-2 border-slate-800 pl-4 py-1 max-w-xl">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
