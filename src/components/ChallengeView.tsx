import React from 'react';
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
  Printer,
  Smartphone,
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
      {/* Navegador de Dias Superior Limpo */}
      <div className="bg-white border border-[#E9E4DC] rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevDay}
            disabled={activeDay === 1}
            className={`min-h-[40px] px-3 flex items-center gap-1.5 rounded-xl border border-[#E2DDD3] text-[#2C4835] text-xs font-medium transition-all cursor-pointer ${
              activeDay === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#F3EFE9] active:scale-95'
            }`}
            aria-label="Dia anterior"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          <div className="text-center">
            <span className="text-[11px] uppercase tracking-wider text-[#607D69] font-semibold block">
              {currentDayData.weekTitle}
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="font-serif text-xl sm:text-2xl text-[#183122] font-medium">
                Dia {activeDay} de 30
              </span>
              {isCompleted && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#275336] bg-[#DFF0E3] px-2 py-0.5 rounded-full">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                  Concluído
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleNextDay}
            disabled={activeDay === 30}
            className={`min-h-[40px] px-3 flex items-center gap-1.5 rounded-xl border border-[#E2DDD3] text-[#2C4835] text-xs font-medium transition-all cursor-pointer ${
              activeDay === 30 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#F3EFE9] active:scale-95'
            }`}
            aria-label="Próximo dia"
          >
            <span className="hidden sm:inline">Próximo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Linha Rápida dos Dias */}
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
                className={`min-w-[34px] h-8 rounded-lg text-xs font-medium transition-all shrink-0 flex items-center justify-center cursor-pointer ${
                  isCur
                    ? 'bg-[#294B34] text-white font-bold shadow-xs'
                    : done
                    ? 'bg-[#E3EFE5] text-[#234830] hover:bg-[#D5E6D8]'
                    : !unlocked
                    ? 'bg-[#EFECE6] text-[#A69E90] cursor-not-allowed opacity-50'
                    : 'bg-[#F8F6F2] text-[#55695C] hover:bg-[#EAE4D9]'
                }`}
                title={`Dia ${d.id}: ${d.title}${done ? ' (Concluído)' : ''}`}
              >
                {done ? '✓' : d.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bloqueio linear suave (caso ativo) */}
      {!isUnlocked ? (
        <div className="bg-white border border-[#E0D8CB] rounded-3xl p-8 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 bg-[#F6EFEB] text-[#8C5E4A] rounded-2xl flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="font-serif text-2xl text-[#1B3424]">Dia Bloqueado</h3>
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
        /* Cartão Principal do Dia Limpo & Arejado */
        <article className="bg-white border border-[#E8E2D8] rounded-3xl shadow-sm p-6 sm:p-10 space-y-8">
          {/* Cabeçalho do Dia */}
          <div className="space-y-3 border-b border-[#F0EBE3] pb-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#597561]">
              <span className="font-semibold text-[#2D5039]">Pilar: {currentDayData.methodPillar}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {currentDayData.duration}
              </span>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={onOpenPrintModal}
                className="text-[#41684B] hover:text-[#183122] underline cursor-pointer"
              >
                Imprimir / PDF
              </button>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#173021] font-normal leading-snug">
              {currentDayData.title}
            </h1>
          </div>

          {/* Contexto: O que é & Por que importa (Leitura Fluida) */}
          <div className="space-y-4 text-sm sm:text-base text-[#34483B] leading-relaxed">
            <p>{currentDayData.whatWeWillDo}</p>
            <p className="text-xs sm:text-sm text-[#5A7061] italic bg-[#FAF8F4] p-3.5 rounded-xl border border-[#EDE7DC]">
              <strong>Por que importa:</strong> {currentDayData.whyItMatters}
            </p>
          </div>

          {/* Missão Prática */}
          <section className="space-y-4">
            <div className="p-4 sm:p-5 bg-[#F5F8F6] border border-[#DCE8DE] rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#2A5237]">
                <Sparkles className="w-4 h-4 text-[#3C6949]" />
                <span>Sua Missão de Hoje</span>
              </div>
              <p className="text-sm sm:text-base text-[#1E3626] font-medium leading-relaxed">
                {currentDayData.mission}
              </p>
            </div>

            {/* Campos interativos da missão */}
            <DayCustomInputs
              day={currentDayData}
              missionResponse={currentResponse.missionResponse}
              onUpdateMissionResponse={(val) =>
                updateDayResponse(activeDay, val, currentResponse.reflectionResponse)
              }
              day30Data={day30Data}
              onUpdateDay30Field={updateDay30Manifesto}
            />
          </section>

          {/* Reflexão do Dia */}
          <section className="space-y-3 pt-2">
            <div className="space-y-1">
              <span className="text-xs uppercase font-bold tracking-wider text-[#685341] block">
                Pare e Reflita
              </span>
              <p className="font-serif text-base sm:text-lg text-[#26382C] italic">
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

          {/* Ação de Conclusão */}
          <div className="pt-6 border-t border-[#EAE4DA] space-y-4">
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

              <span className="text-xs text-[#6B7E72] self-center sm:self-auto">
                {lastSavedTime ? `Salvo automaticamente às ${lastSavedTime}` : 'Salvamento automático ativo'}
              </span>
            </div>

            {/* Sucesso e Botão Próximo Dia */}
            {isCompleted && (
              <div className="p-4 bg-[#EFF5F1] border border-[#C5DDCB] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in duration-300">
                <span className="text-xs sm:text-sm font-medium text-[#1E432A]">
                  🌿 Dia {activeDay} registrado com sucesso!
                </span>

                {activeDay < 30 ? (
                  <button
                    onClick={handleNextDay}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#2B4E36] hover:bg-[#1E3B27] text-white text-xs sm:text-sm font-semibold rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Ir ao Dia {activeDay + 1}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={onGoToCompletion}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#2B4E36] text-white text-xs sm:text-sm font-semibold rounded-xl cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Ver Certificado de Conclusão</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </article>
      )}
    </div>
  );
};
