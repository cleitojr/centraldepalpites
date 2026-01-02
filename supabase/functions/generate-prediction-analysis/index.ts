import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { matchName, league, teamHome, teamAway } = await req.json()
        const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')

        if (!GEMINI_API_KEY) {
            throw new Error('GEMINI_API_KEY is not set')
        }

        const prompt = `Você é um especialista em análise de apostas esportivas para o site "Central do Palpite".
Analise o seguinte jogo de futebol:
Partida: ${matchName}
Liga: ${league}
Time da Casa: ${teamHome}
Time de Fora: ${teamAway}

Crie uma análise técnica e curta (máximo 400 caracteres) com argumentos sólidos sobre o que esperar deste jogo. 
Foque em tendências recentes, força dos elencos e clima da partida.
Seja profissional e persuasivo. Não use negrito ou formatação markdown complexa, apenas texto limpo.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        const data = await response.json();
        const analysis = data.candidates?.[0]?.content?.parts?.[0]?.text || "Não foi possível gerar a análise no momento.";

        return new Response(
            JSON.stringify({ analysis }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200
            }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400
            }
        )
    }
})
