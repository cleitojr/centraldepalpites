import React from "react"
import { Calendar, UserCheck, Brain, ChevronRight, TrendingUp } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { cn } from "../lib/utils"

interface MatchCardProps {
  id: string;
  league: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo?: string;
  awayLogo?: string;
  hasAiPrediction?: boolean;
  hasExpertPrediction?: boolean;
  winProbability?: number;
  predictionType?: string;
  featured?: boolean;
  onClick?: () => void;
}

export function MatchCard({
  league,
  date,
  time,
  homeTeam,
  awayTeam,
  hasAiPrediction,
  hasExpertPrediction,
  winProbability,
  predictionType,
  featured,
  onClick
}: MatchCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:border-[#00FF88]/50 hover:shadow-lg hover:shadow-[#00FF88]/10 cursor-pointer bg-slate-900 border-2",
        featured ? "border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800" : "border-slate-800"
      )}
      onClick={onClick}
    >
      {/* Header Info */}
      <CardHeader className="pb-2 pt-4 px-4 flex-row items-center justify-between space-y-0">
        <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-widest text-slate-200 bg-slate-800/80 border-slate-700 px-2 py-0.5">
          {league}
        </Badge>
        <div className="flex items-center text-[11px] text-slate-300 font-mono font-medium" aria-label={`Data e hora: ${date} às ${time}`}>
          <Calendar className="w-3 h-3 mr-1.5 text-[#00FF88]" />
          {date} • {time}
        </div>
      </CardHeader>

      <CardContent className="px-4 py-4">
        {/* Teams Display */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col items-center gap-2 w-1/3">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border-2 border-slate-700 group-hover:border-[#00FF88] transition-colors">
              <span className="font-bold text-lg text-slate-300">{homeTeam.substring(0, 1)}</span>
            </div>
            <span className="text-sm font-bold text-center leading-tight truncate w-full">{homeTeam}</span>
          </div>

          <div className="flex flex-col items-center justify-center w-1/3">
            <span className="text-xs text-slate-500 mb-1">VS</span>
            {winProbability && (
              <div className="flex flex-col items-center">
                <div className="h-1 w-16 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00FF88]"
                    style={{ width: `${winProbability}%` }}
                  />
                </div>
                <span className="text-[10px] text-[#00FF88] mt-1 font-mono">{winProbability}% Prob.</span>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-2 w-1/3">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border-2 border-slate-700 group-hover:border-slate-500 transition-colors">
              <span className="font-bold text-lg text-slate-300">{awayTeam.substring(0, 1)}</span>
            </div>
            <span className="text-sm font-bold text-center leading-tight truncate w-full">{awayTeam}</span>
          </div>
        </div>

        {/* Prediction Preview */}
        {(hasAiPrediction || hasExpertPrediction) && (
          <div className="bg-slate-950/80 rounded-lg p-3 border border-slate-800/80 shadow-inner group-hover:border-[#00FF88]/20 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Palpite Sugerido</span>
              <div className="flex gap-2">
                {hasExpertPrediction && (
                  <Badge variant="secondary" className="h-5 px-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 flex gap-1 items-center">
                    <UserCheck className="w-3 h-3" />
                    <span className="text-[9px] font-bold">EXPERT</span>
                  </Badge>
                )}
                {hasAiPrediction && (
                  <Badge variant="secondary" className="h-5 px-1.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 flex gap-1 items-center">
                    <Brain className="w-3 h-3" />
                    <span className="text-[9px] font-bold">IA</span>
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-white italic tracking-tight">
                {predictionType || "Análise Disponível"}
              </span>
              <TrendingUp className="w-4 h-4 text-[#00FF88] animate-pulse" />
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-0">
        <Button
          className="w-full transition-all flex items-center justify-between px-4 group/btn variant-outline group-hover:bg-[#00FF88] group-hover:text-black border-slate-700"
          variant="outline"
        >
          <span className="font-black text-[11px] uppercase tracking-tighter">
            Ver Análise Completa
          </span>
          <ChevronRight className="w-4 h-4 opacity-50 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  )
}
