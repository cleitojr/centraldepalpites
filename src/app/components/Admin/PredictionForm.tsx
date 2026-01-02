import React, { useState } from 'react';
import { Sparkles, Save, X, Target, Info, Calendar, Trophy, Percent } from 'lucide-react';
import { Prediction, predictionService } from '../../../services/predictionService';
import { aiService } from '../../../services/aiService';

interface PredictionFormProps {
    prediction?: Prediction;
    onClose: () => void;
    onSuccess: () => void;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({ prediction, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [generatingAI, setGeneratingAI] = useState(false);
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
            user_id: '', // Will be set by service or effect
        }
    );

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
            alert('Erro ao salvar palpite. Verifique os campos e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateAI = async () => {
        if (!formData.match_name || !formData.league) {
            alert('Preencha pelo menos o nome da partida e a liga para gerar a análise.');
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
            <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-6 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900 z-10">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        {prediction ? <Edit2 className="w-5 h-5 text-[#00FF88]" /> : <Plus className="w-5 h-5 text-[#00FF88]" />}
                        {prediction ? 'Editar Palpite' : 'Novo Palpite'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-xl transition-all">
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                <Target className="w-4 h-4" /> Nome da Partida
                            </label>
                            <input
                                required
                                value={formData.match_name}
                                onChange={e => setFormData({ ...formData, match_name: e.target.value })}
                                placeholder="Ex: Flamengo vs Palmeiras"
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-[#00FF88] transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                <Trophy className="w-4 h-4" /> Liga
                            </label>
                            <input
                                required
                                value={formData.league}
                                onChange={e => setFormData({ ...formData, league: e.target.value })}
                                placeholder="Ex: Brasileirão Série A"
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 focus:border-[#00FF88] transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> Data do Jogo
                            </label>
                            <input
                                type="datetime-local"
                                value={formData.match_date.slice(0, 16)}
                                onChange={e => setFormData({ ...formData, match_date: new Date(e.target.value).toISOString() })}
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

                    {/* Analysis with IA Button */}
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

                    <div className="flex gap-4 pt-4">
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
