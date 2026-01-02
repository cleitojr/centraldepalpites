import React from "react"
import { Shield, Brain, UserCheck, Share2, CheckCircle2, BarChart3, TrendingUp } from "lucide-react"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { AdPlaceholder } from "../components/AdPlaceholder"
import { cn } from "../lib/utils"

export function PredictionDetailPage() {
  return (
    <div className="pb-12">
      {/* Match Hero */}
      <div className="relative border-b border-slate-800 py-12 bg-slate-950 overflow-hidden group">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 select-none">
          <img
            src="https://images.unsplash.com/photo-1658522406018-4109d2b11afd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwc29jY2VyJTIwc3RhZGl1bSUyMG5pZ2h0JTIwbGlnaHRzfGVufDF8fHx8MTc2NzM4NzgyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Stadium Background"
            className="w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-slate-950/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-start mb-6">
            <Badge className="bg-slate-800/80 backdrop-blur text-slate-300 hover:bg-slate-800">Brasileirão Série A • Rodada 24</Badge>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-white"><Share2 className="w-4 h-4" /></Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-5xl mx-auto">
            {/* Home */}
            <div className="flex flex-col items-center flex-1 group/team">
              <div className="w-32 h-32 bg-red-950/30 rounded-full flex items-center justify-center border-4 border-red-600 mb-6 shadow-[0_0_30px_rgba(220,38,38,0.2)] backdrop-blur-md transition-transform group-hover/team:scale-110 duration-500">
                <span className="text-4xl font-black text-white italic">FLA</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white text-center italic tracking-tighter drop-shadow-lg">Flamengo</h1>
              <div className="flex gap-1.5 mt-4" aria-label="Forma recente: V V E D V">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              </div>
            </div>

            {/* Vs Info */}
            <div className="flex flex-col items-center justify-center min-w-[240px] px-8 py-6 rounded-3xl bg-slate-950/40 backdrop-blur-sm border border-slate-800/50">
              <div className="text-[#00FF88] font-black text-xs mb-3 tracking-[0.3em] uppercase drop-shadow-sm">Matchday 24</div>
              <div className="text-6xl font-black text-white my-2 italic tracking-tighter drop-shadow-2xl">VS</div>
              <div className="text-slate-400 font-bold text-[11px] mt-3 uppercase tracking-widest">26 OUT • 21:30</div>
            </div>

            {/* Away */}
            <div className="flex flex-col items-center flex-1 group/team">
              <div className="w-32 h-32 bg-green-950/30 rounded-full flex items-center justify-center border-4 border-green-600 mb-6 shadow-[0_0_30px_rgba(22,163,74,0.2)] backdrop-blur-md transition-transform group-hover/team:scale-110 duration-500">
                <span className="text-4xl font-black text-white italic">PAL</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white text-center italic tracking-tighter drop-shadow-lg">Palmeiras</h1>
              <div className="flex gap-1.5 mt-4" aria-label="Forma recente: V D D V E">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Column 1 & 2: Main Analysis Content */}
        <div className="lg:col-span-2 space-y-12">

          {/* Main Prediction Box */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-1 overflow-hidden shadow-2xl">
            <div className="bg-slate-950/50 p-8 rounded-[1.4rem]">
              <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3 italic tracking-tight">
                <Shield className="text-[#00FF88] w-7 h-7" /> Veredito Central
              </h2>

              <div className="flex flex-col gap-8">
                {/* Expert Opinion */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-400 font-black uppercase text-[11px] tracking-[0.2em]">
                      <UserCheck className="w-4 h-4" /> Análise do Especialista
                    </div>
                    <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">EXPERT INSIGHT</Badge>
                  </div>
                  <div className="bg-blue-500/[0.03] border border-blue-500/20 p-8 rounded-2xl relative overflow-hidden group hover:border-blue-500/40 transition-all shadow-xl">
                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                      <UserCheck className="w-48 h-48 text-blue-500" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-start gap-5 mb-8">
                        <div className="h-16 w-16 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shrink-0 shadow-lg">
                          <span className="font-black text-xl text-blue-400 italic">EXP</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-white mb-1 italic tracking-tight">Vitória do Flamengo</h3>
                          <p className="text-blue-300/60 text-sm font-bold uppercase tracking-widest">Confiança Central: Alta</p>
                        </div>
                      </div>

                      <ul className="grid gap-4 mb-8">
                        <li className="flex items-start gap-4 text-slate-300 text-base leading-relaxed group/item">
                          <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                          <span className="font-medium">Retorno de peças fundamentais <span className="text-white font-bold">(Arrascaeta e Pedro)</span> potencializa drasticamente o setor ofensivo do mandante.</span>
                        </li>
                        <li className="flex items-start gap-4 text-slate-300 text-base leading-relaxed group/item">
                          <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                          <span className="font-medium">O Palmeiras deve poupar titulares visando o confronto decisivo da <span className="text-white font-bold">Libertadores</span> na próxima semana.</span>
                        </li>
                        <li className="flex items-start gap-4 text-slate-300 text-base leading-relaxed group/item">
                          <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                          <span className="font-medium">Histórico recente no Maracanã mostra ampla superioridade rubro-negra em confrontos diretos cruciais.</span>
                        </li>
                      </ul>

                      <div className="bg-blue-500/10 p-5 rounded-xl border border-blue-500/20 shadow-inner">
                        <p className="text-blue-100 text-sm italic leading-relaxed font-medium">
                          "A imposição física e técnica do Flamengo nos primeiros 15 minutos tende a ser o fator decisivo. Com o apoio da torcida e o elenco completo, o time da casa tem todas as ferramentas para controlar a partida contra um Palmeiras fragilizado."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Opinion */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-purple-400 font-black uppercase text-[11px] tracking-[0.2em]">
                      <Brain className="w-4 h-4" /> Inteligência Artificial
                    </div>
                    <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">PREDICTIVE AI V4</Badge>
                  </div>
                  <div className="bg-purple-500/[0.03] border border-purple-500/20 p-8 rounded-2xl relative overflow-hidden group hover:border-blue-500/40 transition-all shadow-xl">
                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                      <Brain className="w-48 h-48 text-purple-500" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-start gap-5 mb-8">
                        <div className="h-16 w-16 rounded-2xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30 shrink-0 shadow-lg">
                          <span className="font-black text-xl text-purple-400 italic">IA</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-white mb-1 italic tracking-tight">Mais de 1.5 Gols</h3>
                          <p className="text-purple-300/60 text-sm font-bold uppercase tracking-widest">Probabilidade Calculada: 78.2%</p>
                        </div>
                      </div>

                      <ul className="grid gap-4 mb-8">
                        <li className="flex items-start gap-4 text-slate-300 text-base leading-relaxed group/item">
                          <CheckCircle2 className="w-6 h-6 text-purple-500 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                          <span className="font-medium">O xG (Gols Esperados) combinado das equipes supera <span className="text-white font-bold">2.8</span> nas últimas 5 rodadas da liga.</span>
                        </li>
                        <li className="flex items-start gap-4 text-slate-300 text-base leading-relaxed group/item">
                          <CheckCircle2 className="w-6 h-6 text-purple-500 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                          <span className="font-medium"><span className="text-white font-bold">80%</span> dos jogos do Flamengo em casa terminaram com mais de 1.5 gols nesta temporada atual.</span>
                        </li>
                        <li className="flex items-start gap-4 text-slate-300 text-base leading-relaxed group/item">
                          <CheckCircle2 className="w-6 h-6 text-purple-500 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                          <span className="font-medium">A defesa do Palmeiras sofreu gols em 4 dos últimos 5 jogos como visitante no campeonato.</span>
                        </li>
                      </ul>

                      <div className="bg-purple-500/10 p-5 rounded-xl border border-purple-500/20 mb-6 shadow-inner">
                        <p className="text-purple-100 text-sm leading-relaxed font-medium">
                          A I.A. identificou uma forte tendência estatística de "Over" (Mais Gols) quando o mandante possui alto volume de criação contra equipes que utilizam linhas defensivas altas. O padrão se repetiu em 7 dos últimos 9 confrontos diretos nessas condições.
                        </p>
                      </div>

                      <div className="bg-black/60 p-4 rounded-xl border border-purple-500/10 font-mono text-[10px] text-purple-300/60 flex justify-between items-center">
                        <div className="space-y-1">
                          <div>{`> ALGORITMO: HIGH_CONFIDENCE_V4`}</div>
                          <div>{`> PATTERN: OVER_PERFORMING_ATTACK`}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-purple-400 font-bold uppercase tracking-widest mb-1">Data Points</div>
                          <div className="text-white font-black text-sm">12.450+</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PERFORMANCE / RENDIMENTO */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-[#00FF88] rounded-full shadow-[0_0_15px_-2px_#00FF88]" />
              <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Rendimento</h2>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              {/* Team Selector / Header */}
              <div className="bg-slate-950/60 p-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex gap-4">
                  <button className="px-5 py-2 rounded-xl bg-[#00FF88] text-slate-950 font-black text-xs uppercase tracking-widest shadow-[0_0_15px_-5px_#00FF88]">Todos</button>
                  <button className="px-5 py-2 rounded-xl bg-slate-800 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-white transition-colors">Casa</button>
                  <button className="px-5 py-2 rounded-xl bg-slate-800 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-white transition-colors">Fora</button>
                </div>
                <div className="flex gap-8 items-center mr-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-red-600/20 border border-red-600 flex items-center justify-center text-[10px] font-black text-white shadow-[0_0_10px_-2px_#dc2626]">F</div>
                    <span className="text-[11px] font-black text-slate-300 uppercase">FLA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-600/20 border border-green-600 flex items-center justify-center text-[10px] font-black text-white shadow-[0_0_10px_-2px_#16a34a]">P</div>
                    <span className="text-[11px] font-black text-slate-300 uppercase">PAL</span>
                  </div>
                </div>
              </div>

              {/* Results List */}
              <div className="divide-y divide-slate-800/50">
                {[
                  { league: "Brasileirão", date: "30 dez.", home: "Flamengo", away: "Cuiabá", score: "2-1", win: true },
                  { league: "Brasileirão", date: "27 dez.", home: "Fortaleza", away: "Flamengo", score: "0-0", draw: true },
                  { league: "Brasileirão", date: "21 dez.", home: "Flamengo", away: "Vitória", score: "3-1", win: true },
                  { league: "Libertadores", date: "14 dez.", home: "Peñarol", away: "Flamengo", score: "0-1", win: true },
                  { league: "Brasileirão", date: "11 dez.", home: "Grêmio", away: "Flamengo", score: "3-2", loss: true }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-5 hover:bg-white/5 transition-colors group">
                    <div className="flex flex-col gap-1 w-[180px]">
                      <span className="text-[10px] font-black text-[#00FF88] uppercase tracking-widest">{item.league}</span>
                      <span className="text-[11px] font-medium text-slate-500">{item.date}</span>
                    </div>

                    <div className="flex-1 flex items-center justify-center gap-6">
                      <span className={cn("text-sm font-bold transition-colors", item.home === "Flamengo" ? "text-white" : "text-slate-500")}>{item.home}</span>
                      <div className={cn("px-3 py-1 rounded text-xs font-black min-w-[45px] text-center shadow-inner",
                        item.win ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                          item.draw ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" :
                            "bg-red-500/20 text-red-400 border border-red-500/30")}>
                        {item.score}
                      </div>
                      <span className={cn("text-sm font-bold transition-colors", item.away === "Flamengo" ? "text-white" : "text-slate-500")}>{item.away}</span>
                    </div>

                    <div className="w-[80px] flex justify-end">
                      <div className={cn("w-6 h-6 rounded flex items-center justify-center text-[10px] font-black italic shadow-inner",
                        item.win ? "bg-green-500 text-slate-950" :
                          item.draw ? "bg-yellow-500 text-slate-950" :
                            "bg-red-500 text-white")}>
                        {item.win ? "V" : item.draw ? "E" : "D"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CONFRONTO DIRETO (H2H) */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-blue-500 rounded-full shadow-[0_0_15px_-2px_#3b82f6]" />
              <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Confronto Direto (H2H)</h2>
            </div>

            <div className="bg-slate-950/40 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-8 relative">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <TrendingUp className="w-32 h-32 text-blue-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 relative z-10">
                <div className="text-center">
                  <span className="block text-4xl font-black text-white italic tracking-tighter mb-1">12</span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Vitórias FLA</span>
                </div>
                <div className="text-center border-x border-slate-800 px-4">
                  <span className="block text-4xl font-black text-slate-400 italic tracking-tighter mb-1">08</span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Empates</span>
                </div>
                <div className="text-center">
                  <span className="block text-4xl font-black text-white italic tracking-tighter mb-1">10</span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Vitórias PAL</span>
                </div>
              </div>

              <div className="space-y-3 relative z-10">
                {[
                  { date: "05/04/2025", home: "Flamengo", away: "Palmeiras", score: "2-1", league: "Brasileirão" },
                  { date: "14/12/2024", home: "Palmeiras", away: "Flamengo", score: "2-1", league: "Brasileirão" },
                  { date: "24/02/2024", home: "Flamengo", away: "Palmeiras", score: "4-2", league: "Florida Cup" },
                  { date: "05/11/2023", home: "Palmeiras", away: "Flamengo", score: "2-0", league: "Brasileirão" }
                ].map((match, idx) => (
                  <div key={idx} className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 bg-slate-900/30 p-4 rounded-2xl border border-slate-800/50 hover:border-slate-700/80 transition-all group">
                    <div className="text-right flex flex-col">
                      <span className="text-sm font-black text-white italic group-hover:text-blue-400 transition-colors uppercase">{match.home}</span>
                      <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{match.league}</span>
                    </div>
                    <div className="bg-slate-950 px-4 py-1.5 rounded-lg border border-slate-800 shadow-inner">
                      <span className="font-black text-white font-mono text-sm">{match.score}</span>
                    </div>
                    <div className="text-left flex flex-col">
                      <span className="text-sm font-black text-white italic group-hover:text-blue-400 transition-colors uppercase">{match.away}</span>
                      <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{match.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Sidebar */}
        <div className="space-y-8">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-[#00FF88]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-slate-500 text-[10px] mb-4 uppercase tracking-[0.3em] font-black">Probabilidades Extra Oficiais</h3>

            <div className="grid grid-cols-3 gap-2 mb-8">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/50">
                <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Casa</span>
                <span className="text-lg font-black text-white italic">1.85</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/50">
                <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Empate</span>
                <span className="text-lg font-black text-white italic">3.40</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/50">
                <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Fora</span>
                <span className="text-lg font-black text-white italic">4.20</span>
              </div>
            </div>

            <Button className="w-full h-16 bg-[#00FF88] text-slate-950 hover:bg-[#00FFBB] font-black text-lg uppercase tracking-widest shadow-[0_0_25px_-5px_#00FF88] rounded-2xl transition-all hover:scale-[1.02]">
              VER SITE OFICIAL
            </Button>
            <p className="text-[10px] text-slate-600 mt-6 font-bold uppercase tracking-widest leading-relaxed">
              Publicidade Parceira. <br />Jogue com responsabilidade. 18+
            </p>
          </div>

          {/* Classification Table Sneak Peek */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#00FF88]" /> Classificação Série A
            </h3>
            <div className="space-y-2">
              {[
                { pos: 1, team: "Botafogo", pts: 52, active: false },
                { pos: 2, team: "Palmeiras", pts: 48, active: true },
                { pos: 3, team: "Flamengo", pts: 46, active: true },
                { pos: 4, team: "Fortaleza", pts: 45, active: false }
              ].map((row, i) => (
                <div key={i} className={cn("flex items-center justify-between p-3 rounded-xl transition-all",
                  row.active ? "bg-[#00FF88]/10 border border-[#00FF88]/20 shadow-inner" : "border border-transparent hover:bg-white/5")}>
                  <div className="flex items-center gap-3">
                    <span className={cn("text-xs font-black w-4", row.active ? "text-[#00FF88]" : "text-slate-500")}>{row.pos}</span>
                    <span className={cn("text-sm font-bold", row.active ? "text-white" : "text-slate-400")}>{row.team}</span>
                  </div>
                  <span className={cn("text-xs font-black italic", row.active ? "text-[#00FF88]" : "text-slate-300")}>{row.pts} pts</span>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] hover:text-[#00FF88]">
              Ver Tabela Completa
            </Button>
          </div>

          <AdPlaceholder size="sidebar" />
        </div>
      </div>
    </div>
  )
}
