import React, { useState } from 'react'
import { Shield, Mail, Lock, AlertCircle, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '../components/ui/button'
import { supabase } from '../../lib/supabase'

interface LoginProps {
    onNavigate: (page: string) => void
}

export function LoginPage({ onNavigate }: LoginProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSignUp, setIsSignUp] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                })
                if (error) throw error
                setSuccess('Verifique seu e-mail para confirmar o cadastro!')
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
                onNavigate('home')
            }
        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro inesperado')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#00FF88]/5 to-transparent opacity-50" />

                    <div className="relative z-10">
                        <div className="flex flex-col items-center mb-8">
                            <div className="bg-[#00FF88] p-3 rounded-2xl mb-4 shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                                <Shield className="w-8 h-8 text-slate-950 fill-current" />
                            </div>
                            <h1 className="text-2xl font-black text-white italic tracking-tighter uppercase">
                                {isSignUp ? 'Criar Conta' : 'Acessar Conta'}
                            </h1>
                            <p className="text-slate-400 text-sm mt-2 text-center">
                                {isSignUp
                                    ? 'Junte-se à elite dos palpites esportivos'
                                    : 'Entre para conferir as análises de hoje'}
                            </p>
                        </div>

                        <form onSubmit={handleAuth} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                    E-mail
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#00FF88] transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] transition-all"
                                        placeholder="seu@email.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                    Senha
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#00FF88] transition-colors" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20 text-xs animate-in fade-in slide-in-from-top-1">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="flex items-center gap-2 text-[#00FF88] bg-[#00FF88]/10 p-4 rounded-xl border border-[#00FF88]/20 text-xs animate-in fade-in slide-in-from-top-1">
                                    <Shield className="w-4 h-4 shrink-0" />
                                    {success}
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 bg-[#00FF88] text-slate-950 hover:bg-[#00FFBB] font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_4px_15px_rgba(0,255,136,0.2)] disabled:opacity-50"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        {isSignUp ? 'CADASTRAR' : 'ENTRAR'}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                            <button
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="text-sm font-bold text-slate-500 hover:text-[#00FF88] transition-colors"
                            >
                                {isSignUp
                                    ? 'Já possui uma conta? Entre aqui'
                                    : 'Não tem conta? Crie sua conta grátis'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
