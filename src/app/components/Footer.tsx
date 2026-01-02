import React from 'react';
import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 py-12 text-slate-400">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-slate-800 p-1 rounded-sm">
                <Shield className="w-5 h-5 text-[#00FF88] fill-current" />
              </div>
              <span className="text-lg font-bold tracking-tighter text-white">
                CENTRAL<span className="text-[#00FF88]">DO PALPITE</span>
              </span>
            </div>
            <p className="text-sm max-w-sm mb-6">
              A sua central definitiva de análises esportivas. 
              Combinamos a expertise de analistas profissionais com o poder da inteligência artificial 
              para entregar o melhor conteúdo informativo.
            </p>
            <div className="flex gap-4">
               {/* Social placeholders */}
               <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center hover:bg-[#00FF88] hover:text-black transition-colors cursor-pointer">IG</div>
               <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center hover:bg-[#00FF88] hover:text-black transition-colors cursor-pointer">TW</div>
               <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center hover:bg-[#00FF88] hover:text-black transition-colors cursor-pointer">YT</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Plataforma</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-[#00FF88] cursor-pointer">Futebol Brasileiro</li>
              <li className="hover:text-[#00FF88] cursor-pointer">Champions League</li>
              <li className="hover:text-[#00FF88] cursor-pointer">Premier League</li>
              <li className="hover:text-[#00FF88] cursor-pointer">La Liga</li>
              <li className="hover:text-[#00FF88] cursor-pointer">NBA</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-[#00FF88] cursor-pointer">Termos de Uso</li>
              <li className="hover:text-[#00FF88] cursor-pointer">Política de Privacidade</li>
              <li className="hover:text-[#00FF88] cursor-pointer">Jogo Responsável</li>
              <li className="hover:text-[#00FF88] cursor-pointer">Sobre Nós</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 Central do Palpite. Todos os direitos reservados.</p>
          <div className="flex items-center gap-2">
            <span className="block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="font-semibold text-slate-300">PROIBIDO PARA MENORES DE 18 ANOS</span>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-slate-900/50 rounded-lg text-[10px] leading-relaxed text-slate-500 text-center">
          DISCLAIMER: A Central do Palpite é uma plataforma estritamente informativa e de análise estatística. 
          Não realizamos apostas, não intermediamos transações financeiras e não garantimos lucros. 
          As análises representam opiniões baseadas em dados. Jogue com responsabilidade.
        </div>
      </div>
    </footer>
  );
}
