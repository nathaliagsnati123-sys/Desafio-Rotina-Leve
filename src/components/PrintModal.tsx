import React, { useState, useEffect } from 'react';
import { DAYS_DATA, WEEKS_INFO } from '../data/daysData';
import { UserResponses, Day30Manifesto } from '../types';
import { X, Printer, Download, CheckCircle2, FileText, Calendar, BookOpen, Award } from 'lucide-react';

export type PrintMode = 'full_workbook' | 'current_day' | 'my_responses' | 'certificate';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedDays: number[];
  responses: UserResponses;
  day30Data: Partial<Day30Manifesto>;
  activeDay: number;
  initialMode?: PrintMode;
}

export const PrintModal: React.FC<PrintModalProps> = ({
  isOpen,
  onClose,
  completedDays,
  responses,
  day30Data,
  activeDay,
  initialMode = 'full_workbook',
}) => {
  const [printMode, setPrintMode] = useState<PrintMode>(initialMode);
  const [includeHandwritingLines, setIncludeHandwritingLines] = useState<boolean>(true);

  useEffect(() => {
    if (initialMode && isOpen) {
      setPrintMode(initialMode);
    }
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const currentDayData = DAYS_DATA.find((d) => d.id === activeDay) || DAYS_DATA[0];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    let content = `DESAFIO 30 DIAS — MINHA ROTINA LEVE\n30 dias. Pequenas ações. Uma rotina mais consciente.\n`;
    content += `==========================================================\n\n`;

    if (printMode === 'certificate') {
      content += `CERTIFICADO OFICIAL DE CONCLUSÃO\n`;
      content += `MÉTODO ROTINA LEVE — DESAFIO 30 DIAS\n`;
      content += `==========================================================\n\n`;
      content += `Parabéns pela dedicação e presença durante os 30 dias!\n\n`;
      content += `Você completou todas as 30 práticas diárias de autocuidado, clareza e organização.\n`;
      content += `Status: ${completedDays.length} de 30 dias concluídos (${Math.round((completedDays.length / 30) * 100)}%)\n\n`;
      if (day30Data.rotinaLeveSignificado) {
        content += `Para mim, Rotina Leve é:\n"${day30Data.rotinaLeveSignificado}"\n\n`;
      }
      if (day30Data.compromissoComigo) {
        content += `Meu compromisso comigo:\n"${day30Data.compromissoComigo}"\n\n`;
      }
      if (day30Data.lembreteDiario) {
        content += `Meu lembrete diário:\n"${day30Data.lembreteDiario}"\n\n`;
      }
      content += `“Sua rotina não precisa ser perfeita. Ela precisa fazer sentido para a vida que você realmente tem.”\n`;
      content += `Data: ${new Date().toLocaleDateString('pt-BR')}\n`;
    } else if (printMode === 'current_day') {
      content += `DIA ${currentDayData.id}: ${currentDayData.title.toUpperCase()}\n`;
      content += `${currentDayData.weekTitle} · Duração: ${currentDayData.duration}\n`;
      content += `Pilar do Método: ${currentDayData.methodPillar}\n\n`;
      content += `[O QUE VAMOS FAZER]\n${currentDayData.whatWeWillDo}\n\n`;
      content += `[POR QUE ISSO IMPORTA]\n${currentDayData.whyItMatters}\n\n`;
      content += `[SUA MISSÃO DE HOJE]\n${currentDayData.mission}\n`;
      const curRes = responses[currentDayData.id];
      if (curRes?.missionResponse) {
        content += `\nSua resposta: ${typeof curRes.missionResponse === 'string' ? curRes.missionResponse : JSON.stringify(curRes.missionResponse, null, 2)}\n`;
      }
      content += `\n[PARE E REFLITA]\n"${currentDayData.reflection}"\n`;
      if (curRes?.reflectionResponse) {
        content += `Sua reflexão: ${curRes.reflectionResponse}\n`;
      }
    } else {
      // Full Workbook or responses
      DAYS_DATA.forEach((day) => {
        const res = responses[day.id];
        const isDone = completedDays.includes(day.id);

        if (printMode === 'my_responses' && !isDone && !res?.missionResponse && !res?.reflectionResponse) {
          return;
        }

        content += `----------------------------------------------------------\n`;
        content += `DIA ${day.id}: ${day.title.toUpperCase()} ${isDone ? '[CONCLUÍDO]' : ''}\n`;
        content += `${day.weekTitle} | Tempo: ${day.duration} | Pilar: ${day.methodPillar}\n\n`;
        content += `O que vamos fazer: ${day.whatWeWillDo}\n`;
        content += `Por que importa: ${day.whyItMatters}\n\n`;
        content += `Missão: ${day.mission}\n`;
        if (res?.missionResponse) {
          content += `Minha Resposta: ${typeof res.missionResponse === 'string' ? res.missionResponse : JSON.stringify(res.missionResponse, null, 2)}\n`;
        }
        content += `\nReflexão: ${day.reflection}\n`;
        if (res?.reflectionResponse) {
          content += `Minha Reflexão: ${res.reflectionResponse}\n`;
        }
        content += `\n\n`;
      });

      if (day30Data.rotinaLeveSignificado || day30Data.compromissoComigo) {
        content += `==========================================================\n`;
        content += `MANIFESTO PESSOAL — MINHA ROTINA LEVE (DIA 30)\n`;
        content += `==========================================================\n`;
        if (day30Data.rotinaLeveSignificado) content += `Rotina leve significa: ${day30Data.rotinaLeveSignificado}\n`;
        if (day30Data.fazerMais) content += `Fazer mais: ${day30Data.fazerMais}\n`;
        if (day30Data.fazerMenos) content += `Fazer menos: ${day30Data.fazerMenos}\n`;
        if (day30Data.pararCarregar) content += `Parar de carregar: ${day30Data.pararCarregar}\n`;
        if (day30Data.simplificar) content += `Simplificar: ${day30Data.simplificar}\n`;
        if (day30Data.continuarPriorizando) content += `Continuar priorizando: ${day30Data.continuarPriorizando}\n`;
        if (day30Data.prioridade1) content += `Prioridade 1: ${day30Data.prioridade1}\n`;
        if (day30Data.prioridade2) content += `Prioridade 2: ${day30Data.prioridade2}\n`;
        if (day30Data.prioridade3) content += `Prioridade 3: ${day30Data.prioridade3}\n`;
        if (day30Data.lembreteDiario) content += `Lembrete diário: ${day30Data.lembreteDiario}\n`;
        if (day30Data.compromissoComigo) content += `Compromisso comigo: ${day30Data.compromissoComigo}\n`;
        if (day30Data.nome) content += `Nome: ${day30Data.nome}\n`;
        if (day30Data.data) content += `Data: ${day30Data.data}\n`;
      }
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Desafio_Rotina_Leve_${printMode}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-[#DDD5C8] rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden print-container">
        {/* Modal Top Bar (Controls for print & download) */}
        <div className="p-4 sm:p-5 border-b border-[#EAE3D7] bg-[#FAF8F5] no-print space-y-3 shrink-0">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="font-serif text-lg sm:text-xl font-medium text-[#183122]">
                Baixar e Imprimir os Desafios
              </h2>
              <p className="text-xs text-[#597160]">
                Gere um caderno impresso ou salve em PDF para levar sua rotina no papel.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-[#2B4E36] hover:bg-[#203D2A] text-white text-xs font-semibold rounded-xl cursor-pointer flex items-center gap-1.5 transition-all shadow-xs active:scale-98"
                title="Imprimir ou Salvar como PDF"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir / Salvar PDF</span>
              </button>
              <button
                onClick={handleDownloadTxt}
                className="px-3.5 py-2 bg-white hover:bg-[#F2ECE1] border border-[#DDD6C8] text-[#2F4937] text-xs font-medium rounded-xl cursor-pointer flex items-center gap-1.5 transition-all"
                title="Baixar em formato texto (.txt)"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Baixar Texto (.txt)</span>
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-[#EAE4D9] flex items-center justify-center text-[#55695C] cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#EFEBE4]">
            <div className="flex items-center gap-1 bg-[#EFECE5] p-1 rounded-xl text-xs font-medium">
              <button
                type="button"
                onClick={() => setPrintMode('full_workbook')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  printMode === 'full_workbook'
                    ? 'bg-white text-[#183122] font-semibold shadow-xs'
                    : 'text-[#5B7061] hover:text-[#183122]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Caderno Completo (30 Dias)</span>
              </button>

              <button
                type="button"
                onClick={() => setPrintMode('current_day')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  printMode === 'current_day'
                    ? 'bg-white text-[#183122] font-semibold shadow-xs'
                    : 'text-[#5B7061] hover:text-[#183122]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Ficha do Dia {activeDay}</span>
              </button>

              <button
                type="button"
                onClick={() => setPrintMode('my_responses')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  printMode === 'my_responses'
                    ? 'bg-white text-[#183122] font-semibold shadow-xs'
                    : 'text-[#5B7061] hover:text-[#183122]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Minhas Respostas Preenchidas</span>
              </button>

              <button
                type="button"
                onClick={() => setPrintMode('certificate')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  printMode === 'certificate'
                    ? 'bg-white text-[#183122] font-semibold shadow-xs'
                    : 'text-[#5B7061] hover:text-[#183122]'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-[#325A3F]" />
                <span>Certificado de Conclusão</span>
              </button>
            </div>

            {/* Checkbox for lined spaces */}
            {printMode === 'full_workbook' && (
              <label className="flex items-center gap-2 text-xs text-[#526859] cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeHandwritingLines}
                  onChange={(e) => setIncludeHandwritingLines(e.target.checked)}
                  className="rounded text-[#2B4E36] focus:ring-[#2B4E36]"
                />
                <span>Incluir linhas para preenchimento à mão</span>
              </label>
            )}
          </div>
        </div>

        {/* Scrollable Printable Document Preview */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-10 text-[#1F2E24]" id="printable-journal">
          {printMode === 'certificate' ? (
            <div className="max-w-2xl mx-auto border-4 border-double border-[#C2B7A3] p-8 sm:p-12 rounded-3xl bg-[#FCFAF7] text-center space-y-6 shadow-sm my-4">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-white border border-[#DFD7CB] p-2.5 flex items-center justify-center shadow-xs">
                <img
                  src="https://i.ibb.co/S7frFYCr/Chat-GPT-Image-24-de-set-de-2026-10-58-16.png"
                  alt="Rotina Leve"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest font-bold text-[#4B7356]">
                  Certificado Oficial de Conclusão
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#183122] font-normal">
                  Desafio 30 Dias — Minha Rotina Leve
                </h1>
                <div className="w-24 h-0.5 bg-[#8FA795] mx-auto my-3" />
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#3E5545] leading-relaxed max-w-lg mx-auto">
                <p>
                  Certificamos que você completou a jornada de 30 dias do <strong className="text-[#183122]">Método Rotina Leve</strong> com dedicação, presença e compromisso com o seu bem-estar.
                </p>
                <p className="text-xs sm:text-sm text-[#5B7362]">
                  Pequenos passos diários para organizar sua rotina com mais clareza, intenção e leveza — sem cobrança e no seu ritmo.
                </p>
              </div>

              {/* Manifesto highlights if present */}
              {(day30Data.compromissoComigo || day30Data.rotinaLeveSignificado) && (
                <div className="p-5 bg-white border border-[#E2DAD0] rounded-2xl text-left text-xs sm:text-sm space-y-3">
                  {day30Data.rotinaLeveSignificado && (
                    <div>
                      <span className="font-semibold text-[#274530] block">Para mim, Rotina Leve é:</span>
                      <p className="italic text-[#465E4E]">“{day30Data.rotinaLeveSignificado}”</p>
                    </div>
                  )}
                  {day30Data.compromissoComigo && (
                    <div>
                      <span className="font-semibold text-[#274530] block">Meu compromisso pessoal:</span>
                      <p className="italic text-[#465E4E]">“{day30Data.compromissoComigo}”</p>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-6 border-t border-[#DFD6C8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#637A6A]">
                <div>
                  <span className="block font-semibold text-[#1F3A29]">Status da Jornada</span>
                  <span>{completedDays.length} de 30 dias concluídos</span>
                </div>
                <div>
                  <span className="block font-semibold text-[#1F3A29]">Data de Emissão</span>
                  <span>{new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>

              <p className="font-serif italic text-xs text-[#526B59] pt-2">
                “Sua rotina não precisa ser perfeita. Ela precisa fazer sentido para a vida que você realmente tem.”
              </p>
            </div>
          ) : (
            <>
              {/* Cover Header */}
          <div className="text-center space-y-3 border-b-2 border-[#D5CDC0] pb-8">
            <img
              src="https://i.ibb.co/S7frFYCr/Chat-GPT-Image-24-de-set-de-2026-10-58-16.png"
              alt="Rotina Leve"
              className="h-14 w-auto mx-auto object-contain mb-1"
              referrerPolicy="no-referrer"
            />
            <span className="text-xs uppercase font-semibold text-[#5B7863] tracking-widest block">
              Método Rotina Leve
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#183122] font-normal">
              {printMode === 'current_day'
                ? `Ficha Diária — Dia ${currentDayData.id}: ${currentDayData.title}`
                : 'Caderno do Desafio 30 Dias — Minha Rotina Leve'}
            </h1>
            <p className="font-serif text-base sm:text-lg text-[#47604E] italic">
              “Você não precisa fazer mais. Precisa aprender a organizar melhor o que realmente importa.”
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-[#6B7E71] pt-1">
              <span>30 dias. Pequenas ações. Uma rotina mais consciente.</span>
              <span aria-hidden="true">·</span>
              <span>Pequenos passos também são progresso</span>
            </div>
          </div>

          {/* If Single Current Day */}
          {printMode === 'current_day' ? (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="p-5 bg-[#F9F7F3] border border-[#DDD5C8] rounded-2xl space-y-1">
                <div className="flex items-center justify-between text-xs text-[#526B5A]">
                  <span className="font-bold uppercase tracking-wider">{currentDayData.weekTitle}</span>
                  <span>Tempo sugerido: {currentDayData.duration}</span>
                </div>
                <h2 className="font-serif text-2xl text-[#183122] font-medium pt-1">
                  Dia {currentDayData.id}: {currentDayData.title}
                </h2>
                <span className="text-xs font-semibold text-[#30553C] block">
                  Pilar: {currentDayData.methodPillar}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs uppercase font-bold tracking-wider text-[#35543D]">
                  O que vamos fazer:
                </h3>
                <p className="text-sm text-[#27382C] leading-relaxed pl-3 border-l-2 border-[#D1DDD3]">
                  {currentDayData.whatWeWillDo}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs uppercase font-bold tracking-wider text-[#35543D]">
                  Por que isso importa:
                </h3>
                <p className="text-sm text-[#27382C] leading-relaxed pl-3 border-l-2 border-[#D1DDD3]">
                  {currentDayData.whyItMatters}
                </p>
              </div>

              <div className="p-4 bg-[#F2F7F4] border border-[#C5DEC9] rounded-2xl space-y-2">
                <h3 className="text-xs uppercase font-bold tracking-wider text-[#22482E]">
                  Sua missão de hoje:
                </h3>
                <p className="text-sm text-[#1B3524] font-medium leading-relaxed">
                  {currentDayData.mission}
                </p>

                {responses[currentDayData.id]?.missionResponse ? (
                  <div className="mt-3 p-3 bg-white rounded-xl border border-[#C0D7C4] text-xs text-[#2A3F30]">
                    <strong>Sua resposta:</strong>
                    <p className="whitespace-pre-wrap mt-1">
                      {typeof responses[currentDayData.id].missionResponse === 'string'
                        ? responses[currentDayData.id].missionResponse
                        : JSON.stringify(responses[currentDayData.id].missionResponse, null, 2)}
                    </p>
                  </div>
                ) : (
                  <div className="pt-2 space-y-2">
                    <div className="h-6 border-b border-dashed border-[#A4BCA9]" />
                    <div className="h-6 border-b border-dashed border-[#A4BCA9]" />
                    <div className="h-6 border-b border-dashed border-[#A4BCA9]" />
                  </div>
                )}
              </div>

              <div className="p-4 bg-[#FAF7F2] border border-[#E5DACB] rounded-2xl space-y-2">
                <h3 className="text-xs uppercase font-bold tracking-wider text-[#644933]">
                  Pare e reflita:
                </h3>
                <p className="font-serif text-base italic text-[#2B3B2F]">
                  “{currentDayData.reflection}”
                </p>

                {responses[currentDayData.id]?.reflectionResponse ? (
                  <div className="mt-2 p-3 bg-white rounded-xl border border-[#DDD3C2] text-xs italic text-[#2A3F30]">
                    “{responses[currentDayData.id].reflectionResponse}”
                  </div>
                ) : (
                  <div className="pt-2 space-y-2">
                    <div className="h-6 border-b border-dashed border-[#CBBCA9]" />
                    <div className="h-6 border-b border-dashed border-[#CBBCA9]" />
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Full Workbook or My Responses Mode */
            <div className="space-y-10">
              {/* Day 30 Manifesto Banner if filled */}
              {(day30Data.rotinaLeveSignificado || day30Data.compromissoComigo) && (
                <div className="p-6 bg-[#FAF7F2] border border-[#DDD4C5] rounded-2xl space-y-4 print-avoid-break">
                  <h3 className="font-serif text-xl text-[#1E3626] font-medium border-b border-[#EAE1D2] pb-2">
                    Manifesto Pessoal: Minha Rotina Leve
                  </h3>
                  {day30Data.rotinaLeveSignificado && (
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-[#526B5A]">Rotina Leve para mim significa:</span>
                      <p className="text-sm italic text-[#253A2B]">“{day30Data.rotinaLeveSignificado}”</p>
                    </div>
                  )}
                  {day30Data.compromissoComigo && (
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-[#526B5A]">Meu compromisso comigo:</span>
                      <p className="text-sm italic text-[#253A2B]">“{day30Data.compromissoComigo}”</p>
                    </div>
                  )}
                  {(day30Data.nome || day30Data.data) && (
                    <div className="text-right text-xs text-[#5E7364] pt-2">
                      <span>{day30Data.nome ? `${day30Data.nome} — ` : ''}</span>
                      <span>{day30Data.data || ''}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Loop of all 30 days */}
              <div className="space-y-8">
                {DAYS_DATA.map((day, idx) => {
                  const res = responses[day.id];
                  const isDone = completedDays.includes(day.id);
                  const missionResp = res?.missionResponse;
                  const reflectionResp = res?.reflectionResponse;

                  if (printMode === 'my_responses' && !isDone && !missionResp && !reflectionResp) {
                    return null;
                  }

                  let formattedMission = '';
                  if (typeof missionResp === 'string') {
                    formattedMission = missionResp;
                  } else if (typeof missionResp === 'object' && missionResp !== null) {
                    formattedMission = JSON.stringify(missionResp, null, 2);
                  }

                  // Page break every 2 or 3 days in print to keep sheets clean
                  const isPageBreak = (day.id % 2 === 0 && day.id < 30);

                  return (
                    <div
                      key={day.id}
                      className={`p-5 rounded-2xl border text-xs sm:text-sm space-y-3 print-avoid-break ${
                        isDone ? 'bg-[#FAFCFA] border-[#C8DEC8]' : 'bg-white border-[#E2DBD0]'
                      } ${isPageBreak ? 'print-page-break' : ''}`}
                    >
                      <div className="flex items-center justify-between border-b border-[#EFEBE4] pb-2">
                        <div className="space-y-0.5">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#4E7057]">
                            {day.weekTitle} · {day.duration}
                          </span>
                          <h3 className="font-serif text-lg font-semibold text-[#183122]">
                            Dia {day.id}: {day.title}
                          </h3>
                        </div>
                        <span className="text-xs text-[#4C6B53] font-medium">
                          {isDone ? '✓ Concluído' : `Pilar: ${day.methodPillar}`}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#3C5142]">
                        <p>
                          <strong>O que vamos fazer:</strong> {day.whatWeWillDo}
                        </p>
                        <p>
                          <strong>Por que importa:</strong> {day.whyItMatters}
                        </p>
                      </div>

                      {/* Mission */}
                      <div className="p-3 bg-[#F4F8F5] border border-[#D5E6D8] rounded-xl space-y-1">
                        <span className="text-[11px] font-bold text-[#234B30] uppercase tracking-wide">
                          Missão:
                        </span>
                        <p className="text-xs text-[#1C3524]">{day.mission}</p>
                        {formattedMission ? (
                          <div className="mt-2 pt-2 border-t border-[#CCE2D0] text-xs text-[#2A3E30] whitespace-pre-wrap">
                            <strong>Sua anotação:</strong> {formattedMission}
                          </div>
                        ) : includeHandwritingLines && printMode === 'full_workbook' ? (
                          <div className="pt-2 space-y-1.5 opacity-60">
                            <div className="h-4 border-b border-dashed border-[#A9C4AF]" />
                            <div className="h-4 border-b border-dashed border-[#A9C4AF]" />
                          </div>
                        ) : null}
                      </div>

                      {/* Reflection */}
                      <div className="p-3 bg-[#FAF8F5] border border-[#E9E2D5] rounded-xl space-y-1">
                        <span className="text-[11px] font-bold text-[#6B503B] uppercase tracking-wide">
                          Pare e Reflita:
                        </span>
                        <p className="font-serif text-xs sm:text-sm italic text-[#2D3F33]">
                          “{day.reflection}”
                        </p>
                        {reflectionResp ? (
                          <div className="mt-2 pt-2 border-t border-[#DFD6C8] text-xs text-[#2A3E30] italic">
                            “{reflectionResp}”
                          </div>
                        ) : includeHandwritingLines && printMode === 'full_workbook' ? (
                          <div className="pt-2 space-y-1.5 opacity-60">
                            <div className="h-4 border-b border-dashed border-[#C5B7A5]" />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          </>
          )}
        </div>
      </div>
    </div>
  );
};
