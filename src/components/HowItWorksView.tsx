import React from 'react';
import { ArrowRight, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

interface HowItWorksViewProps {
  onStart: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onStart }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16">
      {/* Cabeçalho Limpo */}
      <section className="bg-white border border-[#E9E4DC] rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
        <span className="text-xs uppercase font-semibold tracking-wider text-[#54735C]">
          Guia do Desafio
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#183122] font-normal">
          Como funciona a sua jornada
        </h1>
        <p className="text-sm sm:text-base text-[#465E4E] leading-relaxed max-w-2xl">
          Durante 30 dias, você recebe uma prática curta por dia (5 a 15 minutos). O método foi desenhado para ser leve, acolhedor e perfeitamente aplicável à sua vida real.
        </p>
      </section>

      {/* Os 5 Pilares do Método de Forma Elegante */}
      <section className="bg-white border border-[#E9E4DC] rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="font-serif text-2xl text-[#183122] font-normal">
            Os 5 Pilares do Método
          </h2>
          <p className="text-xs sm:text-sm text-[#576D5D]">A lógica por trás de cada dia</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              num: '1',
              title: 'Descarregar',
              desc: 'Tirar pensamentos e pendências da cabeça para o papel para aliviar a sobrecarga mental.',
            },
            {
              num: '2',
              title: 'Organizar',
              desc: 'Separar por áreas da vida (trabalho, casa, autocuidado) para enxergar com clareza.',
            },
            {
              num: '3',
              title: 'Priorizar',
              desc: 'Saber o que realmente importa hoje e eliminar excessos desnecessários.',
            },
            {
              num: '4',
              title: 'Planejar',
              desc: 'Desenhar uma agenda possível para a vida real, com margem para respirar.',
            },
            {
              num: '5',
              title: 'Executar',
              desc: 'Dar um passo de cada vez com foco, calma e presença no momento.',
            },
          ].map((pillar) => (
            <div key={pillar.num} className="p-4 bg-[#FAF8F5] border border-[#EAE4DB] rounded-2xl flex items-start gap-3.5">
              <span className="w-7 h-7 rounded-xl bg-[#EAF2EC] text-[#24472F] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {pillar.num}
              </span>
              <div className="space-y-1">
                <h3 className="font-serif text-base font-semibold text-[#1A3323]">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-[#4E6253] leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 text-center sm:text-left">
          <button
            onClick={onStart}
            className="px-6 py-3.5 bg-[#2B4E36] hover:bg-[#1E3B27] text-white text-xs sm:text-sm font-semibold rounded-2xl shadow-sm transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Ir para o Desafio de Hoje</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
