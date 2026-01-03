import { supabase } from '../lib/supabase'

export interface Prediction {
    id?: string
    match_name: string
    league: string
    match_date: string
    home_team: string
    away_team: string
    win_probability: {
        home: number
        draw: number
        away: number
    }
    expert_analysis?: string
    ai_analysis?: string
    status: 'pending' | 'won' | 'lost' | 'void'
    prediction_type: string
    is_premium?: boolean
    price?: number
    user_id: string
    created_at?: string
}

export const predictionService = {
    async getAll() {
        const { data, error } = await supabase
            .from('predictions')
            .select('*')
            .order('match_date', { ascending: true })

        if (error) throw error
        return data as Prediction[]
    },

    async create(prediction: Omit<Prediction, 'id' | 'created_at'>) {
        const { data, error } = await supabase
            .from('predictions')
            .insert(prediction)
            .select()
            .single()

        if (error) throw error
        return data as Prediction
    },

    async update(id: string, updates: Partial<Prediction>) {
        const { data, error } = await supabase
            .from('predictions')
            .update(updates)
            .match({ id })
            .select()
            .single()

        if (error) throw error
        return data as Prediction
    },

    async delete(id: string) {
        const { error } = await supabase
            .from('predictions')
            .delete()
            .match({ id })

        if (error) throw error
    }
}
