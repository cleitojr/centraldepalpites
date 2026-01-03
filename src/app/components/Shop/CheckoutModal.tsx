import React, { useState } from 'react';
import { X, Copy, Check, QrCode, AlertCircle, Loader2 } from 'lucide-react';
import { Purchase, paymentService } from '../../../services/paymentService';
import { Prediction } from '../../../services/predictionService';

interface CheckoutModalProps {
    prediction: Prediction;
    purchase: Purchase;
    onClose: () => void;
    onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ prediction, purchase, onClose, onSuccess }) => {
    const [copied, setCopied] = useState(false);
    const [confirming, setConfirming] = useState(false);

    const handleCopy = () => {
        if (purchase.pix_code) {
            navigator.clipboard.writeText(purchase.pix_code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleConfirmSimulation = async () => {
        setConfirming(true);
        try {
            // In real app, this would be automatic via Webhook
            await paymentService.simulatePaymentSuccess(purchase.id);
            onSuccess();
        } catch (error) {
            console.error('Error confirming payment:', error);
        } finally {
            setConfirming(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                        <QrCode className="w-5 h-5 text-[#00FF88]" />
                        Pagamento via PIX
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                <div className="p-8 space-y-8 flex flex-col items-center">
                    {/* Price Tag */}
                    <div className="text-center">
                        <p className="text-slate-400 text-sm font-medium mb-1">Total a pagar</p>
                        <p className="text-4xl font-black text-[#00FF88]">R$ {purchase.amount.toFixed(2).replace('.', ',')}</p>
                    </div>

                    {/* Mock QR Code */}
                    <div className="bg-white p-4 rounded-2xl shadow-lg">
                        <div className="w-48 h-48 bg-slate-100 flex items-center justify-center relative rounded-lg border-2 border-slate-200">
                            <QrCode className="w-32 h-32 text-slate-900" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">CENTRAL</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="w-full space-y-4">
                        <p className="text-center text-slate-400 text-xs px-4">
                            Abra o app do seu banco, escolha <strong>Pix Copia e Cola</strong> ou aponte a câmera para o <strong>QR Code</strong>.
                        </p>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Copy className="h-4 w-4 text-slate-500" />
                            </div>
                            <input
                                readOnly
                                value={purchase.pix_code}
                                className="block w-full pl-11 pr-12 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-300 font-mono focus:ring-0 focus:border-slate-600 transition-all cursor-default"
                            />
                            <button
                                onClick={handleCopy}
                                className="absolute inset-y-0 right-0 px-4 flex items-center text-[#00FF88] hover:text-white transition-colors"
                            >
                                {copied ? <Check className="h-4 w-4" /> : <span className="text-[10px] font-bold">COPIAR</span>}
                            </button>
                        </div>
                    </div>

                    {/* Notice */}
                    <div className="bg-[#00FF88]/5 border border-[#00FF88]/10 p-4 rounded-xl flex gap-3 text-left w-full">
                        <AlertCircle className="w-5 h-5 text-[#00FF88] shrink-0" />
                        <p className="text-[11px] text-[#00FF88]/80 leading-relaxed">
                            Após o pagamento, o acesso ao palpite será liberado instantaneamente. Esta é uma simulação de pagamento seguro.
                        </p>
                    </div>

                    {/* Temporary Confirmation Button (Simulating Webhook) */}
                    <Button
                        onClick={handleConfirmSimulation}
                        disabled={confirming}
                        className="w-full py-6 rounded-2xl bg-[#00FF88] hover:bg-[#00DD77] text-slate-950 font-black text-sm transition-all shadow-lg shadow-[#00FF88]/20"
                    >
                        {confirming ? (
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        ) : (
                            'SIMULAR PAGAMENTO CONCLUÍDO'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

const Button = ({ children, className, ...props }: any) => (
    <button className={`flex items-center justify-center gap-2 transition-all ${className}`} {...props}>
        {children}
    </button>
);
