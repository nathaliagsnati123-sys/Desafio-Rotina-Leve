import React from 'react';
import { Day30Manifesto } from '../types';
import { PrintMode } from './PrintModal';
import {
  Smartphone,
  Printer,
  CheckCircle2,
  Award,
  Download,
  ExternalLink,
} from 'lucide-react';

interface CompletionViewProps {
  completedCount: number;
  day30Data: Partial<Day30Manifesto>;
  onGoToDay30: () => void;
  onOpenPrintModal: (mode?: PrintMode) => void;
}

export const CompletionView: React.FC<CompletionViewProps> = ({
  completedCount,
  day30Data,
  onGoToDay30,
  onOpenPrintModal,
}) => {
  const isChallengeComplete = completedCount >= 30;

  return (
    <div className="space-y-10 sm:space-y-12 pb-20">
      {/* Top Completion or Finalization Banner */}
      <section className="bg-white border border-[#E9E4DC] rounded-3xl p-6 sm:p-10 shadow-sm text-center space-y-6">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#FAF8F5] border border-[#E2DBD0] flex items-center justify-center mx-auto shadow-xs overflow-hidden p-2.5">
          <img
            src="https://i.ibb.co/S7frFYCr/Chat-GPT-Image-24-de-set-de-2026-10-58-16.png"
            alt="Logotipo Oficial LEVE"
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-[#4F755A]">
            Parabéns
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#183122] font-normal leading-tight">
            VOCÊ CONCLUIU O DESAFIO!
          </h1>
          <p className="font-serif text-lg sm:text-xl text-[#4A6451] italic">
            30 dias. 30 pequenos passos.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-3 text-sm sm:text-base text-[#465E4E] leading-relaxed text-balance">
          <p className="font-medium text-[#253D2C]">
            Você não precisa voltar ao automático.
          </p>
          <p>
            Agora você sabe que pode parar, perceber, organizar, escolher, planejar e agir.
          </p>
          <p className="text-base sm:text-lg text-[#1E3626] font-serif italic pt-1">
            “Sua rotina não precisa ser perfeita. Ela precisa fazer sentido para a vida que você realmente tem.”
          </p>
        </div>

        {/* Visual representation of the 5 Stages */}
        <div className="pt-4 max-w-3xl mx-auto">
          <span className="text-xs uppercase font-semibold text-[#5B7763] tracking-wider block mb-3">
            O Ciclo Contínuo da Rotina Leve
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-semibold text-[#274833]">
            {[
              { stage: 'DESCARREGAR', step: '01' },
              { stage: 'ORGANIZAR', step: '02' },
              { stage: 'PRIORIZAR', step: '03' },
              { stage: 'PLANEJAR', step: '04' },
              { stage: 'EXECUTAR', step: '05' },
            ].map((st) => (
              <div
                key={st.stage}
                className="p-3 bg-[#F2F7F4] border border-[#CADBCD] rounded-xl flex flex-col items-center justify-center space-y-1"
              >
                <span className="text-[10px] text-[#557760] font-normal">{st.step}</span>
                <span className="tracking-wide text-xs">{st.stage}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Options to Download / Print this completion */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onOpenPrintModal('certificate')}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#2B4E36] hover:bg-[#203D2A] text-white text-xs sm:text-sm font-semibold tracking-wide rounded-2xl shadow-sm hover:shadow transition-all duration-150 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <Award className="w-4 h-4 text-[#A8D1B2]" />
            <span>Baixar Certificado de Conclusão (PDF)</span>
          </button>
        </div>
      </section>

      {/* Day 30 Manifesto Summary Card (if filled) */}
      {(day30Data.rotinaLeveSignificado || day30Data.compromissoComigo) && (
        <section className="bg-[#FAF7F2] border border-[#DFD6C7] rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8DFC9] pb-3">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#637C69] font-semibold">
                Seu Documento Pessoal
              </span>
              <h2 className="font-serif text-2xl text-[#1E3626] font-normal">
                Meu Manifesto de Rotina Leve
              </h2>
            </div>
            <button
              onClick={() => onOpenPrintModal('my_responses')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#D5CDC0] text-[#344F3B] hover:bg-[#F2ECE1] rounded-xl text-xs font-medium cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Salvar PDF</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            {day30Data.rotinaLeveSignificado && (
              <div className="p-4 bg-white rounded-2xl border border-[#EBE3D7] space-y-1">
                <span className="text-xs font-semibold text-[#526B5A]">Para mim, Rotina Leve é:</span>
                <p className="text-[#253A2B] italic">“{day30Data.rotinaLeveSignificado}”</p>
              </div>
            )}
            {day30Data.compromissoComigo && (
              <div className="p-4 bg-white rounded-2xl border border-[#EBE3D7] space-y-1">
                <span className="text-xs font-semibold text-[#526B5A]">Meu compromisso comigo:</span>
                <p className="text-[#253A2B] italic">“{day30Data.compromissoComigo}”</p>
              </div>
            )}
            {day30Data.lembreteDiario && (
              <div className="p-4 bg-white rounded-2xl border border-[#EBE3D7] space-y-1 md:col-span-2">
                <span className="text-xs font-semibold text-[#526B5A]">A partir de hoje quero me lembrar que:</span>
                <p className="text-[#253A2B] italic">“{day30Data.lembreteDiario}”</p>
              </div>
            )}
          </div>

          {(day30Data.nome || day30Data.data) && (
            <div className="text-right text-xs text-[#5E7364] pt-2">
              <span>{day30Data.nome ? `${day30Data.nome} · ` : ''}</span>
              <span>{day30Data.data || ''}</span>
            </div>
          )}
        </section>
      )}

      {/* Gentle notice that the user can use the app to organize their day-to-day */}
      <section className="bg-white border border-[#E9E4DC] rounded-3xl p-6 sm:p-8 shadow-sm space-y-3 max-w-2xl mx-auto text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#EAF2EC] text-[#274B33] flex items-center justify-center mx-auto">
          <Smartphone className="w-6 h-6 stroke-[1.8]" />
        </div>
        <div className="space-y-4 pt-1">
          <h3 className="font-serif text-2xl text-[#183122] font-medium">
            Continue sua organização no aplicativo
          </h3>
          <div>
            <a
              href="https://leve-seven.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#2B4E36] hover:bg-[#203D2A] text-white text-sm font-semibold rounded-2xl shadow-sm hover:shadow transition-all duration-150 active:scale-[0.98] cursor-pointer"
            >
              <span>Acessar o Aplicativo LEVE</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
