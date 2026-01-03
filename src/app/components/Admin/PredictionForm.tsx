import React, { useState, useEffect } from 'react';
import { Sparkles, Save, X, Target, Info, Calendar, Trophy, Percent, Search, ChevronDown, Activity } from 'lucide-react';
import { Prediction, predictionService } from '../../../services/predictionService';
import { aiService } from '../../../services/aiService';
import { sportsService, League, Match } from '../../../services/sportsService';

interface PredictionFormProps {
    prediction?: Prediction;
    onClose: () => void;
    onSuccess: () => void;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({ prediction, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [generatingAI, setGeneratingAI] = useState(false);
    const [leagues] = useState<League[]>(sportsService.getLeagues());
    const [matches, setMatches] = useState<Match[]>([]);
    const [loadingMatches, setLoadingMatches] = useState(false);

    const [formData, setFormData] = useState<Omit<Prediction, 'id' | 'created_at'>>(
        prediction ? {
            match_name: prediction.match_name,
            league: prediction.league,
            match_date: prediction.match_date,
            home_team: prediction.home_team,
            away_team: prediction.away_team,
            win_probability: prediction.win_probability,
            expert_analysis: prediction.expert_analysis,
            ai_analysis: prediction.ai_analysis,
            status: prediction.status,
            prediction_type: prediction.prediction_type,
            is_premium: prediction.is_premium || false,
            price: prediction.price || 0,
            user_id: prediction.user_id,
        } : {
            match_name: '',
            league: '',
            match_date: new Date().toISOString(),
            home_team: '',
            away_team: '',
            win_probability: { home: 33, draw: 34, away: 33 },
            expert_analysis: '',
            ai_analysis: '',
            status: 'pending',
            prediction_type: 'Vencedor do Jogo',
            is_premium: false,
            price: 0,
            user_id: '',
        }
    );

    useEffect(() => {
        if (!prediction && formData.league) {
            const leagueObj = leagues.find(l => l.name === formData.league);
            loadMatches(leagueObj?.id);
        }
    }, [formData.league]);

    const loadMatches = async (leagueId?: number) => {
        setLoadingMatches(true);
        try {
            const data = await sportsService.getUpcomingMatches(leagueId);
            setMatches(data);
        } catch (error) {
            console.error('Error loading matches:', error);
        } finally {
            setLoadingMatches(false);
        }
    };

    const handleSelectMatch = (match: Match) => {
        setFormData(prev => ({
            ...prev,
            match_name: `${match.homeTeam} vs ${match.awayTeam}`,
            home_team: match.homeTeam,
            away_team: match.awayTeam,
            match_date: match.utcDate,
            league: match.league
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (prediction?.id) {
                await predictionService.update(prediction.id, formData);
            } else {
                await predictionService.create(formData);
            }
            onSuccess();
        } catch (error) {
            console.error('Error saving prediction:', error);
            alert('Erro ao salvar palpite.');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateAI = async () => {
        if (!formData.match_name || !formData.league) {
            alert('Selecione uma partida primeiro para gerar a análise.');
            return;
        }

        setGeneratingAI(true);
        try {
            const analysis = await aiService.generateAnalysis(
                formData.match_name,
                formData.league,
                formData.home_team || 'Time da Casa',
                formData.away_team || 'Time de Fora'
            );
            setFormData(prev => ({ ...prev, expert_analysis: analysis }));
        } catch (error) {
            console.error('AI generation failed:', error);
        } finally {
            setGeneratingAI(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900 z-10">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Activity className="w-5 h-5 text-[#00FF88]" />
                            {prediction ? 'Editar Palpite' : 'Novo Palpite Inteligente'}
                        </h2>
                        {!prediction && <p className="text-xs text-slate-500">Selecione uma liga e um jogo para preencher automaticamente</p>}
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-xl transition-all">
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
                    {/* Select League & Match */}
                    {!prediction && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-800/30 rounded-2xl border border-slate-800/50">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                    <Trophy className="w-4 h-4" /> 1. Escolha a Liga
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.league}
                                        onChange={e => setFormData(prev => ({ ...prev, league: e.target.value }))}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 appearance-none focus:border-[#00FF88] transition-all cursor-pointer"
                                    >
                                        <option value="">Selecione uma Liga...</option>
                                        {leagues.map(l => (
                                            <option key={l.id} value={l.name}>{l.name}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" /> 2. Próximos Jogos
                                </label>
                                <div className="relative">
                                    <select
                                        disabled={!formData.league || loadingMatches}
                                        onChange={e => {
                                            const match = matches.find(m => m.id === parseInt(e.target.value));
                                            if (match) handleSelectMatch(match);
                                        }}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 appearance-none focus:border-[#00FF88] transition-all cursor-pointer disabled:opacity-50"
                                    >
                                        <option value="">{loadingMatches ? 'Carregando jogos...' : 'Selecione o Jogo...'}</option>
                                        {matches.map(m => (
                                            <option key={m.id} value={m.id}>{m.homeTeam} vs {m.awayTeam}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Basic Info (Fields are prefilled but editable) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                <Target className="w-4 h-4" /> Partida
                            </label>
                            <input
                                required
                                value={formData.match_name}
                                onChange={e => setFormData({ ...formData, match_name: e.target.value })}
                                placeholder="Selecione um jogo ou digite aqui"
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-[#00FF88] transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                <Info className="w-4 h-4" /> Tipo de Palpite
                            </label>
                            <input
                                value={formData.prediction_type}
                                onChange={e => setFormData({ ...formData, prediction_type: e.target.value })}
                                placeholder="Ex: Vencedor do Jogo"
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-[#00FF88] transition-all"
                            />
                        </div>
                    </div>

                    {/* Probabilities */}
                    <div className="space-y-3 p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
                        <label className="text-sm font-medium text-slate-400 flex items-center gap-2 mb-2">
                            <Percent className="w-4 h-4" /> Probabilidades (%)
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Casa</span>
                                <input
                                    type="number"
                                    value={formData.win_probability.home}
                                    onChange={e => setFormData({ ...formData, win_probability: { ...formData.win_probability, home: parseInt(e.target.value) } })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 focus:border-[#00FF88] text-center"
                                />
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Empate</span>
                                <input
                                    type="number"
                                    value={formData.win_probability.draw}
                                    onChange={e => setFormData({ ...formData, win_probability: { ...formData.win_probability, draw: parseInt(e.target.value) } })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 focus:border-[#00FF88] text-center"
                                />
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Fora</span>
                                <input
                                    type="number"
                                    value={formData.win_probability.away}
                                    onChange={e => setFormData({ ...formData, win_probability: { ...formData.win_probability, away: parseInt(e.target.value) } })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 focus:border-[#00FF88] text-center"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Monetization */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[#CCFF00]/5 rounded-2xl border border-[#CCFF00]/20">
                        <div className="flex items-center justify-between p-2">
                            <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                🌟 Palpite Premium
                            </label>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, is_premium: !formData.is_premium })}
                                className={`w-12 h-6 rounded-full transition-all relative ${formData.is_premium ? 'bg-[#CCFF00]' : 'bg-slate-700'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.is_premium ? 'left-7' : 'left-1'}`} />
                            </button>
                        </div>
                        {formData.is_premium && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Preço (R$)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 focus:border-[#CCFF00] transition-all text-[#CCFF00] font-bold"
                                />
                            </div>
                        )}
                    </div>

                    {/* AI Analysis */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-400">Análise do Especialista</label>
                            <button
                                type="button"
                                onClick={handleGenerateAI}
                                disabled={generatingAI}
                                className="flex items-center gap-1.5 text-xs font-bold text-[#00FF88] hover:bg-[#00FF88]/10 px-3 py-1.5 rounded-lg transition-all border border-[#00FF88]/20 disabled:opacity-50"
                            >
                                <Sparkles className={`w-3.5 h-3.5 ${generatingAI ? 'animate-pulse' : ''}`} />
                                {generatingAI ? 'Gerando...' : 'Gerar com IA'}
                            </button>
                        </div>
                        <textarea
                            rows={4}
                            value={formData.expert_analysis}
                            onChange={e => setFormData({ ...formData, expert_analysis: e.target.value })}
                            placeholder="Descreva os argumentos para este palpite..."
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:border-[#00FF88] transition-all resize-none"
                        />
                    </div>

                    <div className="flex gap-4 pt-4 sticky bottom-0 bg-slate-900 pb-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-slate-800 hover:bg-slate-700 hover:text-white px-6 py-3 rounded-xl font-bold transition-all border border-slate-700"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] bg-[#00FF88] hover:bg-[#00DD77] text-slate-950 px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-[#00FF88]/20 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <Save className="w-5 h-5" />
                            {loading ? 'Salvando...' : 'Salvar Palpite'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Edit2 = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>;
const Plus = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
