import React from 'react';
import { ArrowRight, Sparkles, Calendar, Heart, ShieldCheck, CheckCircle2, Printer } from 'lucide-react';
import { WEEKS_INFO } from '../data/daysData';

interface HomeViewProps {
  completedCount: number;
  progressPercentage: number;
  activeDay: number;
  nextRecommendedDay: number;
  onStartChallenge: (day: number) => void;
  onGoToProgress: () => void;
  onOpenPrintModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  completedCount,
  progressPercentage,
  activeDay,
  nextRecommendedDay,
  onStartChallenge,
  onGoToProgress,
  onOpenPrintModal,
}) => {
  const targetDay = completedCount > 0 && completedCount < 30 ? nextRecommendedDay : activeDay;
  const startButtonText = completedCount === 0 ? 'COMEÇAR MEU DESAFIO' : `CONTINUAR NO DIA ${targetDay}`;

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* Hero Welcome Card */}
      <section className="relative overflow-hidden bg-white border border-[#E9E4DC] rounded-3xl shadow-sm">
        <div className="p-6 sm:p-10 md:p-12 space-y-6 max-w-4xl">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F2F7F4] border border-[#D5E5D9] rounded-full text-xs uppercase tracking-widest text-[#375A41] font-semibold">
              <span>Método Rotina Leve</span>
              <span aria-hidden="true">·</span>
              <span>30 Dias de Autocuidado</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#183122] font-normal leading-[1.15] text-balance">
              Desafio 30 Dias — Minha Rotina Leve
            </h1>
            <p className="font-serif text-lg sm:text-xl text-[#4A6351] italic leading-relaxed">
              Um pequeno passo por dia para organizar sua rotina com mais clareza e leveza.
            </p>
          </div>

          <div className="space-y-3 text-sm sm:text-base text-[#495B4F] leading-relaxed">
            <p>
              Durante os próximos 30 dias, você vai realizar pequenas práticas para colocar o Método Rotina Leve em ação.
            </p>
            <p>
              Você não precisa mudar tudo de uma vez. A proposta é observar, organizar, escolher, planejar e agir, um passo de cada vez.
            </p>
          </div>

          {/* Core Quote Box */}
          <div className="p-4 sm:p-5 bg-[#F5F8F5] border-l-3 border-[#4A7254] rounded-r-2xl text-[#2B4232] text-sm leading-relaxed space-y-1">
            <p className="font-medium text-[#1E3626]">
              “Você não precisa fazer mais. Precisa aprender a organizar melhor o que realmente importa.”
            </p>
            <p className="text-xs text-[#5C7564]">
              Pequenos passos também são progresso. Sem pressa, sem cobrança, no seu ritmo.
            </p>
          </div>

          {/* Main Action & Progress Highlight */}
          <div className="pt-2 space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onStartChallenge(targetDay)}
                className="px-8 py-3.5 bg-[#2B4E36] hover:bg-[#203D2A] text-white text-sm sm:text-base font-semibold tracking-wide rounded-2xl shadow-sm hover:shadow transition-all duration-150 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2.5 text-center"
              >
                <span>{startButtonText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onGoToProgress}
                className="px-5 py-3.5 bg-[#FAF8F5] hover:bg-[#F2EEE7] text-[#385340] border border-[#DDD6C9] text-xs sm:text-sm font-medium rounded-2xl transition-all cursor-pointer text-center"
              >
                Ver Meu Progresso
              </button>
            </div>

            {/* Progress Summary Card directly under CTA */}
            <div className="p-4 bg-[#FAF8F5] border border-[#EBE6DE] rounded-2xl space-y-2.5 max-w-md">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-medium text-[#293F30]">Seu progresso</span>
                <div className="flex items-center gap-2 text-[#56705D]">
                  <span className="font-semibold text-[#1F382A] tabular-nums">{completedCount} de 30 dias concluídos</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-bold text-[#2D5039] tabular-nums">{progressPercentage}% concluído</span>
                </div>
              </div>
              {/* Visual Progress Bar */}
              <div className="w-full bg-[#E5DFD4] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#4F7A5B] to-[#34593E] h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={onOpenPrintModal}
                className="w-full sm:w-auto px-4 py-2.5 bg-white hover:bg-[#F2ECE1] text-[#34523C] border border-[#D5CDC0] text-xs font-semibold rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-all shadow-xs"
                title="Baixe o PDF do caderno dos desafios"
              >
                <Printer className="w-3.5 h-3.5 text-[#4D7256]" />
                <span>Baixe o PDF do caderno dos desafios</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Steps of Método Rotina Leve */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-wider text-[#63806B] font-semibold">Os Fundamentos</span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1A3323] font-normal">
            As Cinco Etapas do Método
          </h2>
          <p className="text-sm text-[#54685A]">
            Você não precisa de ferramentas complicadas. Basta aplicar este ciclo simples:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {[
            { step: '01', title: 'Descarregar', desc: 'Tirar pensamentos e pendências da cabeça para o papel.' },
            { step: '02', title: 'Organizar', desc: 'Agrupar por áreas e dar destino ao que realmente existe.' },
            { step: '03', title: 'Priorizar', desc: 'Escolher o que importa e eliminar excessos desnecessários.' },
            { step: '04', title: 'Planejar', desc: 'Desenhar uma rotina realista, deixando margem para a vida real.' },
            { step: '05', title: 'Executar', desc: 'Dar o próximo passo com presença, foco e monotarefa.' },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white border border-[#E8E2D8] p-4 rounded-2xl shadow-xs space-y-2 hover:border-[#8FA893] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#66826E]">{item.step}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#82A18A]" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1A3323]">{item.title}</h3>
              <p className="text-xs text-[#526658] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The 4 Journey Phases */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E4DDD2] pb-3">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#63806B] font-semibold">Sua Jornada Guiada</span>
            <h2 className="font-serif text-2xl text-[#1A3323] font-normal">
              As 4 Fases do Desafio
            </h2>
          </div>
          <span className="text-xs text-[#597060]">
            Atividades de 5 a 15 minutos por dia
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WEEKS_INFO.map((week) => (
            <div
              key={week.week}
              className={`p-5 rounded-2xl border ${week.accentBorder} ${week.bgLight} space-y-3 transition-all hover:shadow-xs`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className={`font-semibold tracking-wide ${week.textAccent}`}>
                  {week.daysRange}
                </span>
                <span className={`px-2.5 py-0.5 rounded-md ${week.badgeBg} ${week.textAccent} font-medium text-[11px]`}>
                  Fase {week.week}
                </span>
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1B3424]">
                {week.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#4E6153] leading-relaxed">
                {week.goal}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Reassurance Banner */}
      <section className="bg-white border border-[#E8E2D8] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-[#E8EFE9] text-[#294B34] flex items-center justify-center shrink-0">
          <Heart className="w-7 h-7 stroke-[1.8]" />
        </div>
        <div className="space-y-1 text-center md:text-left flex-1">
          <h3 className="font-serif text-xl text-[#183122] font-medium">
            Sem pressão, sem competição e sem culpa
          </h3>
          <p className="text-sm text-[#4C6152] leading-relaxed">
            Aqui você não compete com ninguém. Se pular um dia ou precisar de mais tempo, apenas retome no seu ritmo. Pequenos passos sinceros geram transformações duradouras.
          </p>
        </div>
        <button
          onClick={() => onStartChallenge(targetDay)}
          className="px-6 py-3 bg-[#FAF7F2] hover:bg-[#EFECE5] text-[#284832] border border-[#D5CDC0] text-xs sm:text-sm font-semibold rounded-xl cursor-pointer transition-all shrink-0"
        >
          {completedCount === 0 ? 'Iniciar Dia 1' : `Continuar no Dia ${targetDay}`}
        </button>
      </section>
    </div>
  );
};
