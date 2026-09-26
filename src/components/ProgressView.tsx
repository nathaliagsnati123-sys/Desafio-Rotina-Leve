import React, { useState } from 'react';
import { DAYS_DATA, WEEKS_INFO } from '../data/daysData';
import { Check, Lock, Unlock, ArrowRight, Printer, RotateCcw, Sparkles } from 'lucide-react';
import { UserResponses } from '../types';

interface ProgressViewProps {
  completedDays: number[];
  progressPercentage: number;
  activeDay: number;
  linearLock: boolean;
  responses: UserResponses;
  toggleLinearLock: () => void;
  onSelectDay: (dayId: number) => void;
  isDayUnlocked: (dayId: number) => boolean;
  onOpenPrintModal: () => void;
  onResetProgress: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  completedDays,
  progressPercentage,
  activeDay,
  linearLock,
  responses,
  toggleLinearLock,
  onSelectDay,
  isDayUnlocked,
  onOpenPrintModal,
  onResetProgress,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Group days by week
  const week1Days = DAYS_DATA.filter((d) => d.id >= 1 && d.id <= 7);
  const week2Days = DAYS_DATA.filter((d) => d.id >= 8 && d.id <= 14);
  const week3Days = DAYS_DATA.filter((d) => d.id >= 15 && d.id <= 21);
  const week4Days = DAYS_DATA.filter((d) => d.id >= 22 && d.id <= 28);
  const week5Days = DAYS_DATA.filter((d) => d.id >= 29 && d.id <= 30);

  const weeksGroups = [
    { title: 'Semana 1', label: 'Saindo do Automático', days: week1Days, color: 'border-[#8DA390] bg-[#F2F6F3]' },
    { title: 'Semana 2', label: 'Organizando o que Importa', days: week2Days, color: 'border-[#CBBDA9] bg-[#F9F7F2]' },
    { title: 'Semana 3', label: 'Planejando uma Rotina Possível', days: week3Days, color: 'border-[#CCA392] bg-[#FBF4F1]' },
    { title: 'Semana 4', label: 'Colocando em Movimento', days: week4Days, color: 'border-[#83A58C] bg-[#EFF5F1]' },
    { title: 'Consolidação', label: 'Encerramento & Manifesto', days: week5Days, color: 'border-[#5A7E65] bg-[#EAF2EC]' },
  ];

  const totalReflectionsFilled = Object.values(responses).filter(
    (r) => r.reflectionResponse && r.reflectionResponse.trim().length > 0
  ).length;

  return (
    <div className="space-y-8 sm:space-y-10 pb-16">
      {/* Header & Stats Banner */}
      <section className="bg-white border border-[#E9E4DC] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-semibold tracking-wider text-[#57755F]">
              Painel do Desafio
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#183122] font-normal">
              Meu progresso
            </h1>
            <p className="text-sm text-[#546A5B] max-w-xl leading-relaxed">
              Acompanhe aqui cada pequena etapa concluída. Lembre-se: o objetivo não é velocidade, mas a consistência de dar um passo de cada vez.
            </p>
          </div>

          {/* Quick Metrics Cluster */}
          <div className="flex items-center gap-4 bg-[#FAF8F5] border border-[#EBE5DB] p-4 rounded-2xl shrink-0">
            <div className="text-center px-2">
              <span className="text-xs text-[#637A6A] font-medium block">Dias concluídos</span>
              <span className="font-serif text-2xl sm:text-3xl text-[#1D3625] font-semibold tabular-nums">
                {completedDays.length}
                <span className="text-sm font-normal text-[#6B7D71]">/30</span>
              </span>
            </div>
            <div className="w-px h-10 bg-[#DDD5C8]" />
            <div className="text-center px-2">
              <span className="text-xs text-[#637A6A] font-medium block">Progresso</span>
              <span className="font-serif text-2xl sm:text-3xl text-[#2F533B] font-semibold tabular-nums">
                {progressPercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Big Progress Bar */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs text-[#526958]">
            <span>Início (Dia 1)</span>
            <span className="font-semibold text-[#203D2A] tabular-nums">{progressPercentage}% concluído</span>
            <span>Conclusão (Dia 30)</span>
          </div>
          <div className="w-full bg-[#EAE4D9] h-3.5 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-gradient-to-r from-[#4F7A5B] to-[#34593E] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Action strip & Options */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#EFEBE4] text-xs">
          {/* Linear lock toggle */}
          <button
            onClick={toggleLinearLock}
            className="flex items-center gap-2 px-3 py-2 bg-[#F9F7F3] hover:bg-[#F0EBE1] border border-[#DDD6C8] rounded-xl text-[#3E5545] cursor-pointer transition-colors"
          >
            {linearLock ? (
              <>
                <Lock className="w-3.5 h-3.5 text-[#865947]" />
                <span>Bloqueio linear de dias: <strong>Ativado</strong></span>
              </>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5 text-[#4D7055]" />
                <span>Bloqueio linear de dias: <strong>Desativado (Livre)</strong></span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            {/* Print / Export challenges */}
            <button
              onClick={onOpenPrintModal}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#F9F7F3] hover:bg-[#F0EBE1] border border-[#DDD6C8] rounded-xl text-[#2F4936] font-medium cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#3F6849]" />
              <span>Baixar / Imprimir Desafios</span>
            </button>

            {/* Reset button */}
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-1 px-3 py-2 text-[#7F5E52] hover:bg-[#FBF1EE] rounded-xl transition-colors cursor-pointer"
              title="Reiniciar progresso"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reiniciar</span>
            </button>
          </div>
        </div>
      </section>

      {/* 30-Day Grid Calendar Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E4DED3] pb-3">
          <div>
            <span className="text-xs uppercase font-semibold tracking-wider text-[#5D7B66]">
              Estrutura dos 30 Dias
            </span>
            <h2 className="font-serif text-2xl text-[#183122] font-normal">
              Grade do Desafio
            </h2>
          </div>
          <span className="text-xs text-[#5D7061]">
            Toque em qualquer dia para abrir sua prática
          </span>
        </div>

        <div className="space-y-5">
          {weeksGroups.map((group, wIdx) => (
            <div
              key={wIdx}
              className="bg-white border border-[#E8E2D7] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5"
            >
              <div className="flex items-center justify-between border-b border-[#F0EBE2] pb-2.5">
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#1A3323]">
                    {group.title}
                  </h3>
                  <span className="text-xs text-[#5A7060]">{group.label}</span>
                </div>
                <span className="text-xs text-[#637C6A] font-medium">
                  {group.days.filter((d) => completedDays.includes(d.id)).length} de {group.days.length} concluídos
                </span>
              </div>

              {/* Day items row/grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                {group.days.map((day) => {
                  const done = completedDays.includes(day.id);
                  const unlocked = isDayUnlocked(day.id);
                  const isCurrent = day.id === activeDay;

                  return (
                    <button
                      key={day.id}
                      onClick={() => onSelectDay(day.id)}
                      disabled={!unlocked}
                      className={`p-3 rounded-xl border text-left transition-all duration-150 relative cursor-pointer flex flex-col justify-between min-h-[96px] ${
                        done
                          ? 'bg-[#F2F8F4] border-[#A8CEB2] hover:bg-[#EAF3EC]'
                          : isCurrent
                          ? 'bg-white border-[#385E46] ring-2 ring-[#385E46]/20 shadow-xs'
                          : !unlocked
                          ? 'bg-[#F7F5F0] border-[#E5DFD4] opacity-60 cursor-not-allowed'
                          : 'bg-white border-[#DFD8CC] hover:border-[#9AB7A1] hover:bg-[#FCFAF7]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[11px] font-bold text-[#4B6854]">
                          Dia {day.id}
                        </span>
                        {done ? (
                          <span className="w-5 h-5 rounded-full bg-[#345B3F] text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 stroke-[2.8]" />
                          </span>
                        ) : !unlocked ? (
                          <Lock className="w-3.5 h-3.5 text-[#9E9385]" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-[#C6BDB0]" />
                        )}
                      </div>

                      <div className="mt-2">
                        <p className="text-xs font-medium text-[#223528] line-clamp-2 leading-snug">
                          {day.title}
                        </p>
                      </div>

                      {done && (
                        <span className="text-[10px] text-[#2F5A3B] font-semibold mt-1">
                          Concluído
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E3DBD0] rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-xl">
            <h3 className="font-serif text-xl text-[#2B3B30] font-medium">
              Reiniciar o desafio?
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6F61] leading-relaxed">
              Isso limpará os dias marcados como concluídos e suas anotações para que você possa recomeçar do zero. Deseja continuar?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-xs font-medium text-[#4B6152] hover:bg-[#F5F2EB] rounded-xl cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onResetProgress();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 bg-[#8C4F3C] text-white text-xs font-semibold rounded-xl hover:bg-[#77402F] cursor-pointer"
              >
                Sim, reiniciar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
