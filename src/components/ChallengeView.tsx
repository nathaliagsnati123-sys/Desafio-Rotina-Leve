import React, { useState } from 'react';
import { DAYS_DATA } from '../data/daysData';
import { DayCustomInputs } from './DayCustomInputs';
import { Day30Manifesto, UserResponses } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  CheckCircle2,
  Clock,
  Sparkles,
  Lock,
  Unlock,
  RotateCcw,
  Smartphone,
  CalendarDays,
  Printer,
} from 'lucide-react';

interface ChallengeViewProps {
  activeDay: number;
  setActiveDay: (day: number) => void;
  completedDays: number[];
  responses: UserResponses;
  day30Data: Partial<Day30Manifesto>;
  toggleDayCompletion: (dayId: number) => void;
  updateDayResponse: (dayId: number, mission?: any, reflection?: string) => void;
  updateDay30Manifesto: (field: keyof Day30Manifesto, value: string) => void;
  lastSavedTime: string | null;
  linearLock: boolean;
  isDayUnlocked: (dayId: number) => boolean;
  toggleLinearLock: () => void;
  onGoToCompletion: () => void;
  onOpenPrintModal: () => void;
}

export const ChallengeView: React.FC<ChallengeViewProps> = ({
  activeDay,
  setActiveDay,
  completedDays,
  responses,
  day30Data,
  toggleDayCompletion,
  updateDayResponse,
  updateDay30Manifesto,
  lastSavedTime,
  linearLock,
  isDayUnlocked,
  toggleLinearLock,
  onGoToCompletion,
  onOpenPrintModal,
}) => {
  const currentDayData = DAYS_DATA.find((d) => d.id === activeDay) || DAYS_DATA[0];
  const isCompleted = completedDays.includes(activeDay);
  const isUnlocked = isDayUnlocked(activeDay);

  const currentResponse = responses[activeDay] || {};
  const reflectionText = currentResponse.reflectionResponse || '';

  const handleNextDay = () => {
    if (activeDay < 30) {
      setActiveDay(activeDay + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onGoToCompletion();
    }
  };

  const handlePrevDay = () => {
    if (activeDay > 1) {
      setActiveDay(activeDay - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      {/* Day Selector & Carousel Control */}
      <div className="bg-white border border-[#E9E4DC] rounded-2xl p-3.5 sm:p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevDay}
            disabled={activeDay === 1}
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-[#E2DDD3] text-[#2C4835] transition-all cursor-pointer ${
              activeDay === 1 ? 'opacity-35 cursor-not-allowed' : 'hover:bg-[#F3EFE9] active:scale-95'
            }`}
            aria-label="Dia anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <span className="text-xs uppercase font-semibold tracking-wider text-[#5C7964] block">
              {currentDayData.weekTitle}
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="font-serif text-xl sm:text-2xl text-[#183122] font-medium">
                Dia {activeDay} de 30
              </span>
              {isCompleted && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#275336] bg-[#DFF0E3] px-2 py-0.5 rounded-full">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                  Concluído
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleNextDay}
            disabled={activeDay === 30}
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-[#E2DDD3] text-[#2C4835] transition-all cursor-pointer ${
              activeDay === 30 ? 'opacity-35 cursor-not-allowed' : 'hover:bg-[#F3EFE9] active:scale-95'
            }`}
            aria-label="Próximo dia"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Horizontal Mini Strip of Days */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none no-scrollbar">
          {DAYS_DATA.map((d) => {
            const done = completedDays.includes(d.id);
            const isCur = d.id === activeDay;
            const unlocked = isDayUnlocked(d.id);

            return (
              <button
                key={d.id}
                onClick={() => {
                  setActiveDay(d.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={!unlocked}
                className={`min-w-[36px] h-9 rounded-lg text-xs font-medium transition-all shrink-0 flex items-center justify-center cursor-pointer ${
                  isCur
                    ? 'bg-[#294B34] text-white shadow-xs font-bold scale-105'
                    : done
                    ? 'bg-[#E3EFE5] text-[#234830] hover:bg-[#D5E6D8]'
                    : !unlocked
                    ? 'bg-[#EFECE6] text-[#A69E90] cursor-not-allowed opacity-60'
                    : 'bg-[#F5F2EC] text-[#55695C] hover:bg-[#ECE8E0]'
                }`}
                title={`Dia ${d.id}: ${d.title}${done ? ' (Concluído)' : ''}`}
              >
                {done ? '✓' : d.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Locked Guard (If linear lock is enabled and day is still locked) */}
      {!isUnlocked ? (
        <div className="bg-white border border-[#E0D8CB] rounded-3xl p-8 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 bg-[#F6EFEB] text-[#8C5E4A] rounded-2xl flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="font-serif text-2xl text-[#1B3424]">Este dia está protegido</h3>
            <p className="text-sm text-[#546A5B] leading-relaxed">
              O modo sequencial está ativado. Para liberar o Dia {activeDay}, conclua primeiro o Dia {activeDay - 1}.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setActiveDay(activeDay - 1)}
              className="px-5 py-2.5 bg-[#2E4F39] text-white text-xs sm:text-sm font-semibold rounded-xl cursor-pointer"
            >
              Ir ao Dia {activeDay - 1}
            </button>
            <button
              onClick={toggleLinearLock}
              className="px-4 py-2.5 bg-[#F6F3EE] hover:bg-[#EDE8DE] text-[#475C4E] border border-[#D5CDC0] text-xs font-medium rounded-xl cursor-pointer"
            >
              Liberar navegação livre
            </button>
          </div>
        </div>
      ) : (
        /* Main Day Activity Card */
        <article className="bg-white border border-[#E8E2D8] rounded-3xl shadow-sm overflow-hidden transition-all">
          {/* Day Header Banner */}
          <div className="p-6 sm:p-8 border-b border-[#EFEBE3] bg-gradient-to-b from-[#FBF9F6] to-white space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#5D7665]">
              <span className="font-semibold uppercase tracking-wider text-[#35573E]">
                {currentDayData.weekTitle}
              </span>
              <div className="flex items-center gap-2.5 text-xs">
                <span className="flex items-center gap-1 font-medium text-[#465E4E]">
                  <Clock className="w-3.5 h-3.5" />
                  {currentDayData.duration}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-[#2D5039]">
                  Método: {currentDayData.methodPillar}
                </span>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={onOpenPrintModal}
                  className="inline-flex items-center gap-1 text-[#33533B] hover:text-[#183122] font-semibold underline underline-offset-2 decoration-[#B4CAB9] cursor-pointer"
                  title="Imprimir ou baixar os desafios"
                >
                  <Printer className="w-3 h-3" />
                  <span>Imprimir / Baixar</span>
                </button>
              </div>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#173021] font-normal leading-tight">
              {currentDayData.title}
            </h1>

            <p className="text-xs sm:text-sm text-[#5C7162] italic">
              {currentDayData.weekGoal}
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Section 1: O que vamos fazer hoje? */}
            <section className="space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#486B52]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#486B52]" />
                <h2>O que vamos fazer hoje?</h2>
              </div>
              <p className="text-sm sm:text-base text-[#2E4234] leading-relaxed pl-3.5 border-l-2 border-[#DCE8DF]">
                {currentDayData.whatWeWillDo}
              </p>
            </section>

            {/* Section 2: Por que isso importa? */}
            <section className="space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#486B52]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#486B52]" />
                <h2>Por que isso importa?</h2>
              </div>
              <p className="text-sm sm:text-base text-[#2E4234] leading-relaxed pl-3.5 border-l-2 border-[#DCE8DF]">
                {currentDayData.whyItMatters}
              </p>
            </section>

            {/* Section 3: Sua missão de hoje */}
            <section className="space-y-3.5 pt-2">
              <div className="p-4 bg-[#F5F8F6] border border-[#DEE9E0] rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#264D32]">
                  <Sparkles className="w-4 h-4 text-[#3C6949]" />
                  <h2>Sua missão de hoje</h2>
                </div>
                <p className="text-sm sm:text-base text-[#1E3626] font-medium leading-relaxed">
                  {currentDayData.mission}
                </p>
              </div>

              {/* Interactive workspace inputs */}
              <div className="space-y-1">
                <DayCustomInputs
                  day={currentDayData}
                  missionResponse={currentResponse.missionResponse}
                  onUpdateMissionResponse={(val) =>
                    updateDayResponse(activeDay, val, currentResponse.reflectionResponse)
                  }
                  day30Data={day30Data}
                  onUpdateDay30Field={updateDay30Manifesto}
                />
              </div>
            </section>

            {/* Section 4: Pare e reflita */}
            <section className="space-y-3 pt-2">
              <div className="p-4 bg-[#FAF7F2] border border-[#E8DECf] rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#634833]">
                  <span className="w-2 h-2 rounded-full bg-[#A87954]" />
                  <h2>Pare e reflita</h2>
                </div>
                <p className="font-serif text-base sm:text-lg text-[#2B3B30] italic leading-relaxed">
                  “{currentDayData.reflection}”
                </p>
              </div>

              <textarea
                value={reflectionText}
                onChange={(e) =>
                  updateDayResponse(activeDay, currentResponse.missionResponse, e.target.value)
                }
                placeholder={currentDayData.reflectionPlaceholder || 'Escreva sua reflexão sincera aqui...'}
                rows={3}
                className="w-full p-4 rounded-xl border border-[#D5CDC2] bg-white focus:outline-none focus:ring-2 focus:ring-[#567E62] focus:border-transparent text-sm sm:text-base text-[#243329] leading-relaxed resize-y placeholder:text-[#9EA8A0]"
              />
            </section>

            {/* Subtle Rotina Leve App connection notice */}
            {currentDayData.appConnectionTip && (
              <div className="p-3.5 bg-[#FAF9F5] border border-[#E8E2D7] rounded-xl flex items-start gap-3 text-xs text-[#526859]">
                <Smartphone className="w-4 h-4 text-[#44664F] shrink-0 mt-0.5" />
                <p className="leading-relaxed">{currentDayData.appConnectionTip}</p>
              </div>
            )}

            {/* Section 5: Conclusão do Dia */}
            <div className="pt-6 border-t border-[#EAE4DA] space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => toggleDayCompletion(activeDay)}
                  className={`min-h-[48px] px-7 py-3 rounded-2xl text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 shadow-xs ${
                    isCompleted
                      ? 'bg-[#E3EFE5] hover:bg-[#D5E6D8] text-[#1E432A] border border-[#A6CEAF]'
                      : 'bg-[#2B4E36] hover:bg-[#203D2A] text-white active:scale-[0.98]'
                  }`}
                >
                  <CheckCircle2 className={`w-5 h-5 ${isCompleted ? 'text-[#204E2D]' : 'text-white/90'}`} />
                  <span>{isCompleted ? 'DIA CONCLUÍDO (DESMARCAR)' : 'CONCLUIR DIA'}</span>
                </button>

                <div className="text-xs text-[#6B7E72] flex items-center gap-1.5 self-center sm:self-auto">
                  <span className="w-2 h-2 rounded-full bg-[#528260]" />
                  <span>
                    {lastSavedTime ? `Salvo automaticamente às ${lastSavedTime}` : 'Salvamento automático ativo'}
                  </span>
                </div>
              </div>

              {/* Success celebration card & Next button */}
              {isCompleted && (
                <div className="p-5 bg-[#EFF5F1] border border-[#C5DDCB] rounded-2xl space-y-3 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 text-sm sm:text-base font-medium text-[#1E432A]">
                    <span className="text-lg">🌿</span>
                    <span>Você concluiu mais um passo. Parabéns pelo cuidado com a sua rotina!</span>
                  </div>

                  <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    {activeDay < 30 ? (
                      <button
                        onClick={handleNextDay}
                        className="px-6 py-3 bg-[#2B4E36] hover:bg-[#203D2A] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                      >
                        <span>IR PARA O PRÓXIMO DIA (DIA {activeDay + 1})</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={onGoToCompletion}
                        className="px-6 py-3 bg-[#B06852] hover:bg-[#97533E] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                      >
                        <span>VER TELA FINAL DE CONCLUSÃO</span>
                        <Sparkles className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>
      )}
    </div>
  );
};
