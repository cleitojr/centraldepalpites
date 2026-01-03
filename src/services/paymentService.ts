import { supabase } from '../lib/supabase';

export interface Purchase {
    id: string;
    user_id: string;
    prediction_id: string;
    amount: number;
    status: 'pending' | 'completed' | 'cancelled';
    pix_code: string;
    created_at: string;
}

export const paymentService = {
    async createPixPayment(userId: string, predictionId: string, amount: number) {
        // In a real scenario, this would call a backend or Edge Function 
        // that communicates with Mercado Pago / Stripe to get a real PIX code.

        // Simulating PIX code generation
        const mockPixCode = `00020126580014BR.GOV.BCB.PIX0136palpite-pix-key-random-${Math.random().toString(36).substring(7)}520400005303986540${amount.toFixed(2)}5802BR5913CentralPalpite6009Sao Paulo62070503***6304CAFE`;

        const { data, error } = await supabase
            .from('purchases')
            .insert({
                user_id: userId,
                prediction_id: predictionId,
                amount,
                status: 'pending',
                pix_code: mockPixCode
            })
            .select()
            .single();

        if (error) throw error;
        return data as Purchase;
    },

    async checkPurchaseStatus(predictionId: string, userId: string): Promise<boolean> {
        const { data, error } = await supabase
            .from('purchases')
            .select('status')
            .eq('prediction_id', predictionId)
            .eq('user_id', userId)
            .single();

        if (error || !data) return false;
        return data.status === 'completed';
    },

    async simulatePaymentSuccess(purchaseId: string) {
        // ONLY FOR DEMO/DEVELOPMENT
        const { error } = await supabase
            .from('purchases')
            .update({ status: 'completed' })
            .eq('id', purchaseId);

        if (error) throw error;
    }
};
