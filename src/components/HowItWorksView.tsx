import React from 'react';
import { ArrowRight, CheckCircle2, Clock, Sparkles, HeartHandshake, Compass } from 'lucide-react';

interface HowItWorksViewProps {
  onStart: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onStart }) => {
  return (
    <div className="space-y-10 sm:space-y-12 pb-16">
      {/* Intro Header Card with botanical illustration */}
      <section className="bg-white border border-[#E9E4DC] rounded-3xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-4">
            <span className="text-xs uppercase font-semibold tracking-wider text-[#54735C]">
              O Caminho do Método
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#183122] font-normal leading-tight">
              Como funciona o desafio?
            </h1>
            <p className="text-sm sm:text-base text-[#465E4E] leading-relaxed">
              Durante 30 dias, você receberá uma pequena prática por dia. O desafio foi desenhado para ser leve, acolhedor e perfeitamente aplicável à sua vida real.
            </p>
            <div className="p-4 bg-[#F5F8F5] border-l-3 border-[#4A7254] rounded-r-xl text-xs sm:text-sm text-[#2D4534] leading-relaxed">
              <strong>Pequenos passos também são progresso.</strong> A maioria das atividades leva entre <strong>5 a 15 minutos</strong>. Você não precisa parar o seu dia nem mudar tudo de uma vez.
            </div>
          </div>

          <div className="lg:col-span-5 h-60 lg:h-full min-h-[280px] bg-[#EFECE5] relative overflow-hidden">
            <img
              src="/src/assets/images/journal_organization_1790423634457.jpg"
              alt="Ilustração delicada de planejamento e organização com ramos de eucalipto"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Standard Day Anatomy Section */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase font-semibold tracking-wider text-[#5A7862]">
            Estrutura Padrão
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#183122] font-normal">
            O que você encontrará em cada dia
          </h2>
          <p className="text-xs sm:text-sm text-[#546A5B]">
            Todos os 30 dias seguem a mesma ordem gentil para que você sinta previsibilidade e paz:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
          {[
            {
              step: '1',
              title: 'O que vamos fazer',
              desc: 'Uma explicação curta e clara sobre o tema do dia.',
              color: 'border-[#CAD8CD] bg-[#F4F8F5]',
            },
            {
              step: '2',
              title: 'Por que isso importa',
              desc: 'A relação direta daquela atividade com uma rotina mais leve e sem sobrecarga.',
              color: 'border-[#D5DDCF] bg-[#F7FAF4]',
            },
            {
              step: '3',
              title: 'Sua missão de hoje',
              desc: 'Uma ação prática, simples e pontual para colocar em movimento.',
              color: 'border-[#DEE2CF] bg-[#FAFBF5]',
            },
            {
              step: '4',
              title: 'Pare e reflita',
              desc: 'Uma pergunta profunda para conectar a atividade à sua vida de verdade.',
              color: 'border-[#E7D6CB] bg-[#FDF7F3]',
            },
            {
              step: '5',
              title: 'Concluir dia',
              desc: 'O botão para registrar seu avanço e celebrar mais um passo concluído.',
              color: 'border-[#B8D7BE] bg-[#EEF6F0]',
            },
          ].map((item) => (
            <div
              key={item.step}
              className={`p-4 rounded-2xl border ${item.color} space-y-2 shadow-xs`}
            >
              <div className="w-6 h-6 rounded-full bg-white/80 border border-black/10 flex items-center justify-center text-xs font-bold text-[#2A4B33]">
                {item.step}
              </div>
              <h3 className="font-serif text-base font-semibold text-[#1B3524]">{item.title}</h3>
              <p className="text-xs text-[#526657] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The 5 Pillars of Método Rotina Leve */}
      <section className="bg-white border border-[#E9E4DC] rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <span className="text-xs uppercase font-semibold tracking-wider text-[#5B7963]">
            Metodologia
          </span>
          <h2 className="font-serif text-2xl text-[#183122] font-normal">
            Os 5 Pilares do Método Rotina Leve
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: '1. Descarregar',
              desc: 'Esvaziar a mente. Enquanto tarefas e preocupações continuarem flutuando apenas na sua memória, o cansaço mental persistirá.',
            },
            {
              title: '2. Organizar',
              desc: 'Separar por áreas da vida. Agrupar o que é trabalho, casa, autocuidado e família para enxergar com nitidez.',
            },
            {
              title: '3. Priorizar',
              desc: 'Entender que nem tudo merece ser feito hoje. Eliminar excessos, saber o que pode esperar e proteger o essencial.',
            },
            {
              title: '4. Planejar',
              desc: 'Desenhar uma agenda possível para a pessoa que você realmente é, incluindo margem para respirar e imprevistos.',
            },
            {
              title: '5. Executar',
              desc: 'Agir com calma e presença. Dar um passo de cada vez, utilizando o poder da monotarefa e vencendo a inércia.',
            },
          ].map((pillar, i) => (
            <div key={i} className="p-4 bg-[#FAF8F5] border border-[#EBE6DC] rounded-2xl space-y-1.5">
              <h3 className="font-serif text-lg font-medium text-[#1A3323]">{pillar.title}</h3>
              <p className="text-xs sm:text-sm text-[#4E6253] leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onStart}
            className="px-7 py-3.5 bg-[#2B4E36] hover:bg-[#203D2A] text-white text-xs sm:text-sm font-semibold rounded-2xl shadow-sm transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Ir para as atividades do desafio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
