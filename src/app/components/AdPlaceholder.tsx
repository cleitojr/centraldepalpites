import React from "react"
import { cn } from "../lib/utils"

interface AdPlaceholderProps {
  className?: string;
  label?: string;
  size?: "banner" | "sidebar" | "box";
}

export function AdPlaceholder({ className, label = "Publicidade", size = "box" }: AdPlaceholderProps) {
  const sizeClasses = {
    banner: "h-24 w-full",
    sidebar: "h-[600px] w-full",
    box: "h-[250px] w-full"
  }

  return (
    <div className={cn(
      "bg-slate-900/30 border border-dashed border-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden group",
      sizeClasses[size],
      className
    )}>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-shine opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="text-xs font-mono text-slate-600 uppercase tracking-widest pointer-events-none select-none">
        {label}
      </span>
    </div>
  )
}
