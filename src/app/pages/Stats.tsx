import React from "react"
import { SectionTitle } from "../components/SectionTitle"
import { Card } from "../components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts"

export function StatsPage() {
  const performanceData = [
    { name: 'Brasileirão', ia: 68, expert: 62 },
    { name: 'Premier League', ia: 55, expert: 70 },
    { name: 'La Liga', ia: 72, expert: 65 },
    { name: 'Champions', ia: 60, expert: 60 },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle title="Transparência & Estatísticas" subtitle="Nossos números são auditados e abertos" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="bg-slate-900 border-slate-800 p-8 flex flex-col items-center justify-center text-center shadow-xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/5 rounded-full blur-2xl group-hover:bg-[#00FF88]/10 transition-colors" />
          <span className="text-5xl font-black text-white mb-2 italic tracking-tighter">68.4%</span>
          <span className="text-[11px] text-slate-400 uppercase tracking-[0.2em] font-black">Assertividade Global</span>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-8 flex flex-col items-center justify-center text-center shadow-xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/5 rounded-full blur-2xl group-hover:bg-[#00FF88]/10 transition-colors" />
          <span className="text-5xl font-black text-[#00FF88] mb-2 italic tracking-tighter">+12.5%</span>
          <span className="text-[11px] text-slate-400 uppercase tracking-[0.2em] font-black">ROI Médio (Preditor IA)</span>
        </Card>
        <Card className="bg-slate-900 border-slate-800 p-8 flex flex-col items-center justify-center text-center shadow-xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
          <span className="text-5xl font-black text-blue-500 mb-2 italic tracking-tighter">1.240</span>
          <span className="text-[11px] text-slate-400 uppercase tracking-[0.2em] font-black">Análises Auditadas</span>
        </Card>
      </div>

      <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-8 h-[450px] shadow-inner mb-12">
        <h3 className="text-lg font-black text-white mb-8 italic tracking-tight flex items-center gap-3">
          <div className="w-1.5 h-6 bg-[#00FF88] rounded-full" />
          Comparativo: IA vs Especialistas (Acertos %)
        </h3>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={performanceData}>
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} fontWeight="bold" dy={10} />
            <YAxis stroke="#94a3b8" fontSize={11} fontWeight="bold" dx={-5} />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.03)' }}
              contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
            />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }} />
            <Bar dataKey="ia" name="Inteligência Artificial" fill="#00FF88" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expert" name="Especialistas" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
