import React from "react"
import { cn } from "../lib/utils"

interface FilterTagsProps {
  items: string[]
  activeItem?: string
  onSelect?: (item: string) => void
  className?: string
}

export function FilterTags({ 
  items, 
  activeItem = "Todos", 
  onSelect,
  className 
}: FilterTagsProps) {
  const [selected, setSelected] = React.useState(activeItem);

  const handleSelect = (item: string) => {
    setSelected(item);
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <div className={cn("flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide mask-fade-right", className)}>
      {items.map((item) => (
        <button
          key={item}
          onClick={() => handleSelect(item)}
          className={cn(
            "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-all duration-200 border",
            selected === item 
              ? "bg-[#00FF88] text-slate-950 border-[#00FF88] shadow-[0_0_10px_-3px_#00FF88]" 
              : "bg-slate-900/50 text-slate-400 border-slate-800 hover:border-slate-600 hover:text-white"
          )}
        >
          {item}
        </button>
      ))}
    </div>
  )
}
