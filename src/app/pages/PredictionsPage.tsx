import React, { useEffect, useState } from "react"
import { MatchCard } from "../components/MatchCard"
import { SectionTitle } from "../components/SectionTitle"
import { AdPlaceholder } from "../components/AdPlaceholder"
import { Button } from "../components/ui/button"
import { FilterTags } from "../components/FilterTags"
import { predictionService, Prediction } from "../../services/predictionService"
import { paymentService, Purchase } from "../../services/paymentService"
import { useAuth } from "../context/AuthContext"
import { CheckoutModal } from "../components/Shop/CheckoutModal"
import { Loader2, Lock } from "lucide-react"

export function PredictionsPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [dbMatches, setDbMatches] = useState<Prediction[]>([])
  const [loading, setLoading] = useState(true)
  const [userPurchases, setUserPurchases] = useState<string[]>([])
  const { user } = useAuth()

  // Checkout State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null)
  const [activePurchase, setActivePurchase] = useState<Purchase | null>(null)

  const fetchPredictions = async () => {
    try {
      const data = await predictionService.getAll()
      setDbMatches(data)

      if (user) {
        // Fetch user purchases to know what to unlock
        const { data: purchases } = await supabase
          .from('purchases')
          .select('prediction_id')
          .eq('user_id', user.id)
          .eq('status', 'completed')

        if (purchases) {
          setUserPurchases(purchases.map(p => p.prediction_id))
        }
      }
    } catch (error) {
      console.error("Error fetching predictions:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPredictions()
  }, [user])

  const handleMatchClick = async (match: Prediction) => {
    if (match.is_premium) {
      if (!user) {
        alert('Você precisa estar logado para comprar um palpite.')
        onNavigate('login')
        return
      }

      // If already purchased, go to detail
      if (userPurchases.includes(match.id!)) {
        onNavigate('detail')
        return
      }

      // Otherwise, start checkout
      try {
        setLoading(true)
        const purchase = await paymentService.createPixPayment(user.id, match.id!, match.price || 0)
        setActivePurchase(purchase)
        setSelectedPrediction(match)
        setIsCheckoutOpen(true)
      } catch (error) {
        console.error('Error starting checkout:', error)
        alert('Erro ao iniciar pagamento. Tente novamente.')
      } finally {
        setLoading(false)
      }
    } else {
      onNavigate('detail')
    }
  }

  const handlePaymentSuccess = () => {
    setIsCheckoutOpen(false)
    fetchPredictions() // Refresh to unlock the content
    alert('Pagamento confirmado! O palpite foi desbloqueado.')
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <SectionTitle
            title="Palpites de Hoje"
            subtitle="Explore todas as análises para os jogos selecionados"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {/* Filters ... (Keep existing) */}
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
                  isPremium={match.is_premium && !userPurchases.includes(match.id!)}
                  price={match.price}
                  onClick={() => handleMatchClick(match)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {isCheckoutOpen && selectedPrediction && activePurchase && (
        <CheckoutModal
          prediction={selectedPrediction}
          purchase={activePurchase}
          onClose={() => setIsCheckoutOpen(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  )
}

import { supabase } from "../../lib/supabase"
