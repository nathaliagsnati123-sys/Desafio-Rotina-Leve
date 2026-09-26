import React from 'react';
import { Home, Compass, BarChart3, HelpCircle, Sparkles, CheckCircle2, Printer } from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'challenge' | 'progress' | 'how-it-works' | 'completion';
  setCurrentTab: (tab: 'home' | 'challenge' | 'progress' | 'how-it-works' | 'completion') => void;
  completedCount: number;
  activeDay: number;
  onContinue: () => void;
  onOpenPrintModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  completedCount,
  activeDay,
  onContinue,
  onOpenPrintModal,
}) => {
  const navItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'challenge', label: 'Desafio', icon: Compass },
    { id: 'progress', label: 'Meu Progresso', icon: BarChart3 },
    { id: 'how-it-works', label: 'Como Funciona', icon: HelpCircle },
    { id: 'completion', label: 'Finalização', icon: Sparkles },
  ] as const;

  return (
    <>
      {/* Desktop / Tablet Top Bar (Adheres to Section 2 Top Bar Contract) */}
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E3DA] transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Zone 1: Brand logo */}
          <button
            onClick={() => setCurrentTab('home')}
            className="flex items-center text-left group cursor-pointer focus:outline-none"
            aria-label="Início - LEVE"
          >
            <img
              src="https://i.ibb.co/S7frFYCr/Chat-GPT-Image-24-de-set-de-2026-10-58-16.png"
              alt="LEVE"
              className="h-11 w-auto object-contain rounded-lg transition-transform group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </button>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4D6353]">
            <button
              onClick={() => setCurrentTab('home')}
              className={`hover:text-[#1F382B] transition-colors py-1 cursor-pointer relative ${
                currentTab === 'home'
                  ? 'text-[#1F382B] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#4D7257]'
                  : ''
              }`}
            >
              Início
            </button>
            <button
              onClick={() => setCurrentTab('challenge')}
              className={`hover:text-[#1F382B] transition-colors py-1 cursor-pointer relative ${
                currentTab === 'challenge'
                  ? 'text-[#1F382B] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#4D7257]'
                  : ''
              }`}
            >
              Desafio
            </button>
            <button
              onClick={() => setCurrentTab('progress')}
              className={`hover:text-[#1F382B] transition-colors py-1 cursor-pointer relative ${
                currentTab === 'progress'
                  ? 'text-[#1F382B] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#4D7257]'
                  : ''
              }`}
            >
              Meu Progresso
            </button>
            <button
              onClick={() => setCurrentTab('how-it-works')}
              className={`hover:text-[#1F382B] transition-colors py-1 cursor-pointer relative ${
                currentTab === 'how-it-works'
                  ? 'text-[#1F382B] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#4D7257]'
                  : ''
              }`}
            >
              Como Funciona
            </button>
            <button
              onClick={() => setCurrentTab('completion')}
              className={`hover:text-[#1F382B] transition-colors py-1 cursor-pointer relative ${
                currentTab === 'completion'
                  ? 'text-[#1F382B] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#4D7257]'
                  : ''
              }`}
            >
              Finalização
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenPrintModal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#32523A] hover:text-[#183122] bg-[#F7F4EE] hover:bg-[#EFE9DF] border border-[#DDD5C7] rounded-xl transition-all cursor-pointer whitespace-nowrap"
              title="Baixar ou Imprimir Caderno dos Desafios"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Baixar / Imprimir</span>
            </button>

            <button
              onClick={onContinue}
              className="px-4 py-2 text-xs font-semibold tracking-wide text-white bg-[#30533C] hover:bg-[#254230] rounded-xl transition-all shadow-sm hover:shadow active:scale-[0.98] cursor-pointer whitespace-nowrap flex items-center gap-1.5"
            >
              <span>{completedCount === 30 ? 'Ver Conclusão' : `Ir ao Dia ${activeDay}`}</span>
              <CheckCircle2 className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fixed Bottom Navigation Bar (Pattern 1 from Mobile Touch Reference) */}
      <nav
        aria-label="Navegação inferior"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#E8E3DA] pb-[env(safe-area-inset-bottom)] no-print"
      >
        <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center rounded-lg transition-colors cursor-pointer ${
                  isActive ? 'text-[#20402C]' : 'text-[#7A8B7E] hover:text-[#4A6150]'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.6]'}`} />
                  {item.id === 'progress' && completedCount > 0 && (
                    <span className="absolute -top-1 -right-2 text-[9px] font-bold bg-[#385E46] text-white rounded-full w-3.5 h-3.5 flex items-center justify-center">
                      {completedCount}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] tracking-tight mt-1 font-medium truncate max-w-[58px] ${
                    isActive ? 'font-semibold text-[#1F382B]' : 'text-[#6C7E72]'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
