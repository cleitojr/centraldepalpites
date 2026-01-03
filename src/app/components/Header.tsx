import * as React from "react"
import { Shield, Menu, X, BarChart2, FileText, TrendingUp, User, LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"
import { useAuth } from "../context/AuthContext"

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, isAdmin, signOut } = useAuth();

  const navItems = [
    { label: "Palpites", value: "predictions", icon: <Shield className="w-4 h-4 mr-2" /> },
    { label: "Blog", value: "blog", icon: <FileText className="w-4 h-4 mr-2" /> },
    { label: "Estatísticas", value: "stats", icon: <TrendingUp className="w-4 h-4 mr-2" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/75">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate("home")}
        >
          <div className="bg-[#00FF88] p-1 rounded-sm">
            <Shield className="w-6 h-6 text-slate-950 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">
            CENTRAL<span className="text-[#00FF88]"> DOS PALPITES</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => onNavigate(item.value)}
              aria-current={currentPage === item.value ? "page" : undefined}
              className={cn(
                "flex items-center text-sm font-semibold transition-all hover:text-[#00FF88] py-2 px-1 relative group",
                currentPage === item.value ? "text-[#00FF88]" : "text-slate-400"
              )}
            >
              {React.cloneElement(item.icon as any, {
                className: cn("w-4 h-4 mr-2 transition-transform group-hover:scale-110",
                  currentPage === item.value ? "text-[#00FF88]" : "text-slate-400 group-hover:text-[#00FF88]")
              })}
              {item.label}
              {currentPage === item.value && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00FF88] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Action & Warning */}
        <div className="hidden md:flex items-center gap-6">
          <div className="text-[10px] text-slate-500 text-right font-medium leading-[1.2] uppercase tracking-wider hidden lg:block">
            Responsabilidade Social<br />
            <span className="text-slate-400">18+ apenas</span>
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Button
                  variant="default"
                  size="sm"
                  className="bg-[#00FF88] text-slate-950 hover:bg-[#00FF88]/90 h-8 font-bold text-[10px] tracking-widest uppercase px-4 rounded-full shadow-lg shadow-[#00FF88]/10"
                  onClick={() => onNavigate("admin")}
                >
                  Painel Admin
                </Button>
              )}
              <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800">
                <User className="w-4 h-4 text-[#00FF88]" />
                <span className="text-xs font-bold text-slate-200">{user.email?.split('@')[0]}</span>
              </div>
              <button
                onClick={() => signOut()}
                className="text-slate-500 hover:text-red-400 transition-colors p-1"
                title="Sair"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="border-[#00FF88]/20 text-[#00FF88] hover:bg-[#00FF88]/10 h-9 font-bold tracking-tight"
              onClick={() => onNavigate("login")}
            >
              ENTRAR
            </Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-200 p-2 -mr-2 rounded-md hover:bg-slate-900 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950">
          <div className="container px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  onNavigate(item.value);
                  setIsMenuOpen(false);
                }}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors p-2 rounded-md hover:bg-slate-900",
                  currentPage === item.value ? "text-[#00FF88]" : "text-slate-400"
                )}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            {isAdmin && (
              <button
                onClick={() => {
                  onNavigate("admin");
                  setIsMenuOpen(false);
                }}
                className="flex items-center text-lg font-bold text-[#00FF88] transition-colors p-2 rounded-md hover:bg-[#00FF88]/10"
              >
                <Shield className="w-4 h-4 mr-2" />
                Painel Admin
              </button>
            )}
            <div className="border-t border-slate-800 pt-4 mt-2 text-center">
              <p className="text-xs text-slate-500 mb-4 uppercase tracking-wider font-bold">18+ Apenas</p>
              {user && (
                <Button
                  variant="ghost"
                  className="w-full text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  onClick={() => signOut()}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
