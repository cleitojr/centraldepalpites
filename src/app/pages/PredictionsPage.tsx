import React, { useEffect, useState } from "react"
import { MatchCard } from "../components/MatchCard"
import { SectionTitle } from "../components/SectionTitle"
import { AdPlaceholder } from "../components/AdPlaceholder"
import { Button } from "../components/ui/button"
import { FilterTags } from "../components/FilterTags"
import { predictionService, Prediction } from "../../services/predictionService"
import { Loader2 } from "lucide-react"

export function PredictionsPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [dbMatches, setDbMatches] = useState<Prediction[]>([])
  const [loading, setLoading] = useState(true)

  const mockMatches = [
    { id: "1", league: "Brasileirão", date: "Hoje", time: "21:30", home: "Flamengo", away: "Palmeiras", prob: 65, type: "Vitória Casa", ai: true, expert: true },
    { id: "2", league: "Champions League", date: "Amanhã", time: "16:00", home: "Real Madrid", away: "Man City", prob: 45, type: "Ambos Marcam", ai: true, expert: false },
    { id: "3", league: "Premier League", date: "Sábado", time: "09:30", home: "Liverpool", away: "Arsenal", prob: 55, type: "Mais de 2.5 Gols", ai: false, expert: true },
    { id: "4", league: "La Liga", date: "Sábado", time: "17:00", home: "Barcelona", away: "Atl. Madrid", prob: 60, type: "Vitória Casa", ai: true, expert: true },
    { id: "5", league: "Serie A", date: "Domingo", time: "11:00", home: "Juventus", away: "Milan", prob: 30, type: "Empate", ai: true, expert: false },
  ];

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const data = await predictionService.getAll()
        setDbMatches(data)
      } catch (error) {
        console.error("Error fetching predictions:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPredictions()
  }, [])

  // Combine DB matches with mock ones for a fuller experience initially
  const displayedMatches = [
    ...dbMatches.map(m => ({
      id: m.id!,
      league: m.league,
      date: new Date(m.match_date).toLocaleDateString('pt-BR', { weekday: 'long' }),
      time: new Date(m.match_date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      home: m.home_team,
      away: m.away_team,
      prob: m.win_probability.home,
      type: m.prediction_type,
      ai: !!m.ai_analysis,
      expert: !!m.expert_analysis
    })),
    ...mockMatches.filter(m => !dbMatches.some(dm => dm.match_name === `${m.home} vs ${m.away}`))
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <SectionTitle
            title="Palpites de Hoje"
            subtitle="Explore todas as análises para os jogos selecionados"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800/80">
              <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Filtrar por Campeonato</h3>
              <FilterTags
                items={["Todos", "Brasileirão", "Premier League", "La Liga", "Champions League", "Serie A", "Bundesliga"]}
                activeItem="Todos"
              />
            </div>

            <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800/80">
              <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Filtrar por Data</h3>
              <FilterTags
                items={["Todas", "Hoje", "Amanhã", "Sábado", "Domingo"]}
                activeItem="Todas"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-12 h-12 text-[#00FF88] animate-spin" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Carregando palpites...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayedMatches.map((match) => (
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
          )}

          <div className="flex justify-center mt-8">
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-12 border-slate-800 text-slate-400 hover:text-[#00FF88]">
              Carregar mais palpites
            </Button>
          </div>
        </div>

        <aside className="w-full md:w-[300px] flex flex-col gap-6">
          <AdPlaceholder size="sidebar" />
          <AdPlaceholder size="box" />
        </aside>
      </div>
    </div>
  )
}
