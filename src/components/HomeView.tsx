import React from 'react';
import { ArrowRight, Printer, Sparkles, Clock, CheckCircle2, Heart } from 'lucide-react';
import { DAYS_DATA, WEEKS_INFO } from '../data/daysData';

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
  const isStarted = completedCount > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12 pb-16">
      {/* Hero Central Limpo & Acolhedor */}
      <section className="bg-white border border-[#E9E4DC] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#51735A] font-semibold">
            <span>Método Rotina Leve</span>
            <span aria-hidden="true">·</span>
            <span>30 Dias de Autocuidado</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#183122] font-normal leading-tight text-balance">
            Desafio 30 Dias — Minha Rotina Leve
          </h1>

          <p className="font-serif text-lg sm:text-xl text-[#4A6351] italic leading-relaxed">
            Um pequeno passo por dia para organizar sua vida com clareza, intenção e leveza.
          </p>
        </div>

        {/* Card de Ação Principal Direto ao Ponto */}
        <div className="bg-[#FAF8F5] border border-[#E7E1D7] rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
            <div>
              <span className="text-xs text-[#5F7565] uppercase font-semibold tracking-wider block">
                {isStarted ? 'Seu Andamento' : 'Primeiro Passo'}
              </span>
              <span className="font-serif text-xl sm:text-2xl text-[#1A3323] font-medium">
                {isStarted ? `Você está no Dia ${targetDay}` : 'Pronta para começar o Dia 1?'}
              </span>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-[#5F7565] block">Concluído</span>
              <span className="font-semibold text-[#1F3A28] tabular-nums text-base">
                {completedCount} de 30 dias ({progressPercentage}%)
              </span>
            </div>
          </div>

          {/* Barra de Progresso Suave */}
          <div className="w-full bg-[#E5DFD4] h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#386244] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Botões Principais Claros */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => onStartChallenge(targetDay)}
              className="px-7 py-3.5 bg-[#2B4E36] hover:bg-[#1E3B27] text-white text-sm sm:text-base font-semibold rounded-2xl shadow-sm hover:shadow transition-all duration-150 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{isStarted ? `Continuar no Dia ${targetDay}` : 'Começar meu Desafio'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenPrintModal}
              className="px-5 py-3.5 bg-white hover:bg-[#F2ECE1] text-[#2F4A37] border border-[#D5CDC0] text-xs sm:text-sm font-medium rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4 text-[#4A7254]" />
              <span>Baixar Caderno em PDF</span>
            </button>

            <button
              onClick={onGoToProgress}
              className="px-4 py-3.5 text-[#4D6554] hover:text-[#183122] text-xs sm:text-sm font-medium transition-colors cursor-pointer text-center sm:ml-auto"
            >
              Ver todos os 30 dias →
            </button>
          </div>
        </div>
      </section>

      {/* Como Funciona em 3 Pilares Claros (Sem repetição) */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-[#183122] font-normal text-center sm:text-left">
          Como funciona o desafio
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-[#E9E4DC] p-5 rounded-2xl space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#F0F6F2] text-[#2B4E36] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#1A3323]">1. Práticas Rápidas</h3>
            <p className="text-xs sm:text-sm text-[#506354] leading-relaxed">
              Atividades simples de 5 a 15 minutos que se encaixam naturalmente no seu dia real.
            </p>
          </div>

          <div className="bg-white border border-[#E9E4DC] p-5 rounded-2xl space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#F5F7F0] text-[#426135] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#1A3323]">2. Missão & Reflexão</h3>
            <p className="text-xs sm:text-sm text-[#506354] leading-relaxed">
              Uma ação prática para descarregar a mente e uma pergunta para trazer clareza à rotina.
            </p>
          </div>

          <div className="bg-white border border-[#E9E4DC] p-5 rounded-2xl space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#F7F2EC] text-[#7A5B3E] flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#1A3323]">3. No Seu Próprio Ritmo</h3>
            <p className="text-xs sm:text-sm text-[#506354] leading-relaxed">
              Sem pressa e sem cobrança. Você avança um dia de cada vez, com gentileza consigo mesma.
            </p>
          </div>
        </div>
      </section>

      {/* As 4 Semanas de Forma Compacta & Direta */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-[#183122] font-normal">
            As 4 Etapas da sua Jornada
          </h2>
          <span className="text-xs text-[#5E7564]">30 dias guiados</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {WEEKS_INFO.map((week) => (
            <div
              key={week.week}
              className="bg-white border border-[#EAE4DB] p-4.5 rounded-2xl flex items-start gap-3.5 hover:border-[#BFD3C3] transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-[#F0F5F1] text-[#294B34] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {week.week}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-base font-semibold text-[#193222]">{week.title}</h3>
                  <span className="text-[11px] text-[#637C6A] font-medium font-mono">({week.daysRange})</span>
                </div>
                <p className="text-xs text-[#526658] leading-relaxed">{week.goal}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grade Rápida dos 30 Dias (Acesso Direto em 1 Clique) */}
      <section className="bg-white border border-[#E9E4DC] rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EFECE5] pb-3">
          <div>
            <h2 className="font-serif text-xl text-[#183122] font-medium">Acesso Rápido aos Dias</h2>
            <p className="text-xs text-[#576D5D]">Clique em qualquer dia para abrir a atividade</p>
          </div>
          <span className="text-xs text-[#2D5038] font-semibold tabular-nums">
            {completedCount} de 30 concluídos
          </span>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-10 gap-2 pt-1">
          {DAYS_DATA.map((day) => {
            const isDone = day.id <= completedCount;
            const isCurrent = day.id === targetDay;

            return (
              <button
                key={day.id}
                onClick={() => onStartChallenge(day.id)}
                className={`h-10 sm:h-11 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center cursor-pointer ${
                  isCurrent
                    ? 'bg-[#2A4D35] text-white font-bold ring-2 ring-[#2A4D35] ring-offset-2'
                    : isDone
                    ? 'bg-[#E3EFE5] text-[#1E432A] font-semibold hover:bg-[#D4E7D7]'
                    : 'bg-[#FAF8F5] text-[#566B5C] border border-[#E5DFD4] hover:bg-[#F0ECE3]'
                }`}
                title={`Dia ${day.id}: ${day.title}`}
              >
                {isDone ? '✓' : day.id}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
