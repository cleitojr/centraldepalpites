import { supabase } from '../lib/supabase';

export const aiService = {
    async generateAnalysis(matchName: string, league: string, teamHome: string, teamAway: string) {
        try {
            // Calling a Supabase Edge Function to keep API keys secure
            const { data, error } = await supabase.functions.invoke('generate-prediction-analysis', {
                body: {
                    matchName,
                    league,
                    teamHome,
                    teamAway
                }
            });

            if (error) throw error;
            return data.analysis;
        } catch (error) {
            console.error('Error generating AI analysis:', error);
            // Fallback for demo/development if function isn't deployed yet
            return `Análise para ${matchName} (${league}): Com base no desempenho recente de ${teamHome} e ${teamAway}, espera-se um jogo equilibrado com tendência a poucos gols.`;
        }
    }
};
