import React, { useEffect, useState } from "react"
import { MatchCard } from "../components/MatchCard"
import { SectionTitle } from "../components/SectionTitle"
import { AdPlaceholder } from "../components/AdPlaceholder"
import { Button } from "../components/ui/button"
import { ArrowRight, Trophy, TrendingUp, Shield, BarChart3, Users, Brain, Loader2 } from "lucide-react"
import { FilterTags } from "../components/FilterTags"
import { predictionService, Prediction } from "../../services/predictionService"

export function HomePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [dbMatches, setDbMatches] = useState<Prediction[]>([])
  const [loading, setLoading] = useState(true)

  const mockFeatured = [
    { id: "1", league: "Brasileirão", date: "Hoje", time: "21:30", home: "Flamengo", away: "Palmeiras", prob: 65, type: "Vitória Casa", ai: true, expert: true },
    { id: "2", league: "Champions League", date: "Amanhã", time: "16:00", home: "Real Madrid", away: "Man City", prob: 45, type: "Ambos Marcam", ai: true, expert: false },
    { id: "3", league: "Premier League", date: "Sábado", time: "09:30", home: "Liverpool", away: "Arsenal", prob: 55, type: "Mais de 2.5 Gols", ai: false, expert: true },
  ];

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const data = await predictionService.getAll()
        setDbMatches(data.slice(0, 4))
      } catch (error) {
        console.error("Error fetching home data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchHomeData()
  }, [])

  const featured = dbMatches.length > 0
    ? dbMatches.map(m => ({
      id: m.id!,
      league: m.league,
      date: new Date(m.match_date).toLocaleDateString('pt-BR', { weekday: 'short' }),
      time: new Date(m.match_date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      home: m.home_team,
      away: m.away_team,
      prob: m.win_probability.home,
      type: m.prediction_type,
      ai: !!m.ai_analysis,
      expert: !!m.expert_analysis
    }))
    : mockFeatured;

  return (
    <div className="space-y-16 pb-20">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] bg-[#00FF88] text-slate-950 px-4 py-2 rounded-md font-bold shadow-2xl">
        Pular para o conteúdo
      </a>

      <section id="main-content" className="bg-slate-950 pt-12 pb-16 border-b border-slate-800/80">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-12 gap-8">
            <div className="max-w-3xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF88]/10 text-[#00FF88] text-[11px] font-black uppercase tracking-[0.2em] mb-6 border border-[#00FF88]/20">
                <Shield className="w-3.5 h-3.5" /> Oficial Central do Palpite
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter mb-6 leading-[0.9]">
                DADOS QUE <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF88] via-[#00FFBB] to-[#00CCAA]">JOGAM</span> COM VOCÊ
              </h1>
              <p className="text-xl text-slate-300 font-medium max-w-2xl leading-relaxed">
                A única plataforma que une <span className="text-white font-bold underline decoration-[#00FF88]/40">análise estatística de ponta</span> com o olhar clínico de especialistas em futebol.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button onClick={() => onNavigate("predictions")} size="lg" className="h-14 px-10 text-lg">
                Ver Palpites de Hoje
              </Button>
            </div>
          </div>

          <SectionTitle title="Destaques da Semana" subtitle="Os jogos mais aguardados com análise completa" />

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader2 className="w-10 h-10 text-[#00FF88] animate-spin" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Buscando destaques...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map((match: any) => (
                <MatchCard
                  key={match.id}
                  id={match.id}
                  league={match.league}
                  date={match.date}
                  time={match.time}
                  homeTeam={match.home}
                  awayTeam={match.away}
                  winProbability={match.prob}
                  predictionType={match.type}
                  hasAiPrediction={match.ai}
                  hasExpertPrediction={match.expert}
                  featured={true}
                  onClick={() => onNavigate("detail")}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Ad Banner */}
      <div className="container mx-auto px-4">
        <AdPlaceholder size="banner" />
      </div>

      {/* Recent Analysis */}
      <section className="container mx-auto px-4">
        <SectionTitle
          title="Análises Recentes"
          action={
            <Button variant="ghost" onClick={() => onNavigate("predictions")} className="text-[#00FF88]">
              Ver mais <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          }
        />

        <FilterTags
          items={["Destaques", "Ao Vivo", "Brasileirão", "Premier League", "Libertadores"]}
          className="mb-6"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((match: any) => (
            <MatchCard
              key={match.id}
              id={match.id}
              league={match.league}
              date={match.date}
              time={match.time}
              homeTeam={match.home}
              awayTeam={match.away}
              winProbability={match.prob}
              predictionType={match.type}
              hasAiPrediction={match.ai}
              hasExpertPrediction={match.expert}
              onClick={() => onNavigate("detail")}
            />
          ))}
        </div>
      </section>

      {/* Editorial / Value Prop */}
      <section className="bg-slate-900/50 border-y border-slate-800/80 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#00FF88]/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF88]/10 text-[#00FF88] text-[11px] font-black uppercase tracking-widest mb-6 border border-[#00FF88]/20">
                <BarChart3 className="w-3.5 h-3.5" /> Metodologia Central
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 italic tracking-tighter leading-tight">
                POR QUE CONFIAR NA <br />
                <span className="text-[#00FF88]">CENTRAL DO PALPITE?</span>
              </h2>
              <div className="grid gap-8">
                <div className="flex gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 group-hover:border-[#00FF88] transition-all group-hover:shadow-[0_0_15px_-5px_rgba(0,255,136,0.4)]">
                    <Users className="w-7 h-7 text-[#00FF88]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Analistas de Elite</h3>
                    <p className="text-slate-400 font-medium leading-relaxed">Nossa equipe é formada por ex-scouts e jornalistas táticos que analisam cada variável que os números não explicam.</p>
                  </div>
                </div>
                <div className="flex gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 group-hover:border-purple-500 transition-all group-hover:shadow-[0_0_15px_-5px_rgba(168,85,247,0.4)]">
                    <Brain className="w-7 h-7 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">IA Preditiva de Ponta</h3>
                    <p className="text-slate-400 font-medium leading-relaxed">Algoritmos proprietários processam terabytes de dados históricos para identificar anomalias e padrões de lucro.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-2xl relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF88]/20 to-purple-500/20 rounded-[2rem] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-8 border-b border-slate-800/80 pb-6">
                  <div>
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-1">Performance Consolidada</span>
                    <span className="text-2xl font-black text-white">Outubro / 2025</span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-[#00FF88]">+24.5%</span>
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">Yield Total</span>
                  </div>
                </div>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between text-xs mb-3">
                      <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                        <Brain className="w-3.5 h-3.5 text-purple-400" /> Precisão da IA
                      </span>
                      <span className="text-purple-400 font-black">78.2%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-900 rounded-full border border-slate-800 overflow-hidden">
                      <div className="h-full w-[78.2%] bg-gradient-to-r from-purple-600 to-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-3">
                      <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-blue-400" /> Precisão Experts
                      </span>
                      <span className="text-blue-400 font-black">72.4%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-900 rounded-full border border-slate-800 overflow-hidden">
                      <div className="h-full w-[72.4%] bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
