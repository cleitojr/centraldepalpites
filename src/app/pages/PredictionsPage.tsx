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
              {dbMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  id={match.id!}
                  league={match.league}
                  date={new Date(match.match_date).toLocaleDateString('pt-BR', { weekday: 'long' })}
                  time={new Date(match.match_date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  homeTeam={match.home_team}
                  awayTeam={match.away_team}
                  winProbability={match.win_probability.home}
                  predictionType={match.prediction_type}
                  hasAiPrediction={!!match.ai_analysis}
                  hasExpertPrediction={!!match.expert_analysis}
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
