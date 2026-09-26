import React from 'react';
import { DayData, Day30Manifesto } from '../types';
import { Check, Plus, Trash2, Clock } from 'lucide-react';

interface DayCustomInputsProps {
  day: DayData;
  missionResponse: any;
  onUpdateMissionResponse: (val: any) => void;
  day30Data: Partial<Day30Manifesto>;
  onUpdateDay30Field: (field: keyof Day30Manifesto, value: string) => void;
}

export const DayCustomInputs: React.FC<DayCustomInputsProps> = ({
  day,
  missionResponse,
  onUpdateMissionResponse,
  day30Data,
  onUpdateDay30Field,
}) => {
  // Day 3: Mental dump with quick optional timer
  if (day.id === 3) {
    const textVal = typeof missionResponse === 'string' ? missionResponse : '';
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-[#5B7362]">
          <span>Coloque tudo para fora livremente: tarefas, preocupações, ideias.</span>
          <span className="flex items-center gap-1 font-medium bg-[#EBF2EC] px-2.5 py-1 rounded-md text-[#2B4C35]">
            <Clock className="w-3.5 h-3.5" />
            10 minutos
          </span>
        </div>
        <textarea
          value={textVal}
          onChange={(e) => onUpdateMissionResponse(e.target.value)}
          placeholder={day.missionPlaceholder}
          rows={7}
          className="w-full p-4 rounded-xl border border-[#D5CDC2] bg-white focus:outline-none focus:ring-2 focus:ring-[#567E62] focus:border-transparent text-sm sm:text-base text-[#243329] leading-relaxed resize-y placeholder:text-[#9EA8A0]"
        />
      </div>
    );
  }

  // Day 4: 5 delayed items + choose 1 to analyze
  if (day.id === 4) {
    const items: string[] = Array.isArray(missionResponse?.items)
      ? missionResponse.items
      : ['', '', '', '', ''];
    const chosenIndex = typeof missionResponse?.chosenIndex === 'number' ? missionResponse.chosenIndex : 0;

    const handleItemChange = (idx: number, text: string) => {
      const next = [...items];
      next[idx] = text;
      onUpdateMissionResponse({ items: next, chosenIndex });
    };

    const handleSelectChosen = (idx: number) => {
      onUpdateMissionResponse({ items, chosenIndex: idx });
    };

    return (
      <div className="space-y-4">
        <p className="text-xs text-[#526B5A]">
          Escreva até 5 coisas que você vem adiando e toque para escolher uma delas para analisar:
        </p>
        <div className="space-y-2">
          {items.map((val, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 ${
                chosenIndex === idx ? 'bg-[#F2F7F3] border-[#5E8B6A] ring-1 ring-[#5E8B6A]' : 'bg-white border-[#D9D3C7]'
              }`}
            >
              <button
                type="button"
                onClick={() => handleSelectChosen(idx)}
                className={`w-6 h-6 rounded-full border text-xs flex items-center justify-center shrink-0 cursor-pointer ${
                  chosenIndex === idx
                    ? 'bg-[#31573D] text-white border-[#31573D]'
                    : 'border-[#BDC7BE] text-[#55695C] hover:border-[#31573D]'
                }`}
                title="Escolher para analisar"
              >
                {idx + 1}
              </button>
              <input
                type="text"
                value={val}
                onChange={(e) => handleItemChange(idx, e.target.value)}
                placeholder={`Item ${idx + 1} sendo adiado...`}
                className="w-full bg-transparent text-sm text-[#25352A] focus:outline-none"
              />
              {chosenIndex === idx && (
                <span className="text-[11px] font-semibold text-[#2F573B] px-2 py-0.5 bg-[#DCEDDF] rounded-md shrink-0">
                  Em análise
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Day 7: Review of week 1 with 5 structured questions
  if (day.id === 7) {
    const questions = [
      { key: 'q1', label: '1. O que descobri sobre minha rotina?' },
      { key: 'q2', label: '2. O que mais estava ocupando minha cabeça?' },
      { key: 'q3', label: '3. O que posso simplificar?' },
      { key: 'q4', label: '4. O que estava carregando sem precisar?' },
      { key: 'q5', label: '5. Qual foi a mudança mais importante?' },
    ];
    const answers = typeof missionResponse === 'object' && missionResponse !== null ? missionResponse : {};

    const handleAnswer = (k: string, val: string) => {
      onUpdateMissionResponse({ ...answers, [k]: val });
    };

    return (
      <div className="space-y-4">
        {questions.map((q) => (
          <div key={q.key} className="space-y-1.5">
            <label className="text-xs font-semibold text-[#344E3B]">{q.label}</label>
            <textarea
              value={answers[q.key] || ''}
              onChange={(e) => handleAnswer(q.key, e.target.value)}
              rows={2}
              placeholder="Escreva sua percepção..."
              className="w-full p-3 rounded-xl border border-[#D5CDC2] bg-white focus:outline-none focus:ring-1 focus:ring-[#567E62] text-sm text-[#25352A]"
            />
          </div>
        ))}
      </div>
    );
  }

  // Day 8: Separating areas of life
  if (day.id === 8) {
    const areas = [
      { id: 'pessoal', label: 'Pessoal & Autocuidado' },
      { id: 'trabalho', label: 'Trabalho & Estudos' },
      { id: 'casa', label: 'Casa & Rotina Doméstica' },
      { id: 'financeiro', label: 'Financeiro' },
      { id: 'relacionamentos', label: 'Relacionamentos' },
      { id: 'outros', label: 'Outros' },
    ];
    const stateVal = typeof missionResponse === 'object' && missionResponse !== null ? missionResponse : {};

    const handleAreaChange = (areaId: string, val: string) => {
      onUpdateMissionResponse({ ...stateVal, [areaId]: val });
    };

    return (
      <div className="space-y-3">
        <p className="text-xs text-[#526B5A]">
          Anote as principais tarefas ou pendências que pertencem a cada área:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {areas.map((area) => (
            <div key={area.id} className="p-3 bg-white border border-[#DDD6C8] rounded-xl space-y-1.5">
              <span className="text-xs font-semibold text-[#395540]">{area.label}</span>
              <textarea
                value={stateVal[area.id] || ''}
                onChange={(e) => handleAreaChange(area.id, e.target.value)}
                rows={2}
                placeholder="Ex: consultas, projetos, compras..."
                className="w-full p-2 bg-[#FBF9F6] border border-[#E8E2D7] rounded-lg text-xs sm:text-sm text-[#243329] focus:outline-none focus:ring-1 focus:ring-[#5B8566]"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Day 13: 3 priorities + 1 main priority
  if (day.id === 13) {
    const p1 = missionResponse?.p1 || '';
    const p2 = missionResponse?.p2 || '';
    const p3 = missionResponse?.p3 || '';
    const mainP = missionResponse?.mainP || 'p1';

    const update = (field: string, val: string) => {
      onUpdateMissionResponse({
        p1,
        p2,
        p3,
        mainP,
        [field]: val,
      });
    };

    return (
      <div className="space-y-4">
        <p className="text-xs text-[#526B5A]">
          Defina três prioridades importantes para o momento atual e selecione qual é a sua PRIORIDADE PRINCIPAL:
        </p>
        <div className="space-y-2.5">
          {[
            { id: 'p1', label: 'Prioridade 1', val: p1 },
            { id: 'p2', label: 'Prioridade 2', val: p2 },
            { id: 'p3', label: 'Prioridade 3', val: p3 },
          ].map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-xl border flex items-center gap-3 transition-colors ${
                mainP === item.id ? 'bg-[#F2F7F3] border-[#5E8B6A] ring-1 ring-[#5E8B6A]' : 'bg-white border-[#D9D3C7]'
              }`}
            >
              <button
                type="button"
                onClick={() => update('mainP', item.id)}
                className={`w-6 h-6 rounded-full border text-xs flex items-center justify-center shrink-0 cursor-pointer ${
                  mainP === item.id
                    ? 'bg-[#2E553B] text-white border-[#2E553B]'
                    : 'border-[#BDC7BE] text-[#55695C] hover:border-[#2E553B]'
                }`}
                title="Definir como prioridade principal"
              >
                {mainP === item.id ? <Check className="w-3.5 h-3.5" /> : ''}
              </button>
              <div className="flex-1">
                <span className="text-[11px] font-semibold text-[#486350] block">{item.label}</span>
                <input
                  type="text"
                  value={item.val}
                  onChange={(e) => update(item.id, e.target.value)}
                  placeholder={`Descreva a ${item.label.toLowerCase()}...`}
                  className="w-full bg-transparent text-sm text-[#25352A] focus:outline-none"
                />
              </div>
              {mainP === item.id && (
                <span className="text-[11px] font-bold text-[#234930] px-2 py-0.5 bg-[#DCEDDF] rounded-md shrink-0">
                  Principal
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Day 16: Dividing a large task into 4 steps
  if (day.id === 16) {
    const mainTask = missionResponse?.mainTask || '';
    const steps: string[] = Array.isArray(missionResponse?.steps)
      ? missionResponse.steps
      : ['', '', '', ''];

    const updateStep = (idx: number, text: string) => {
      const next = [...steps];
      next[idx] = text;
      onUpdateMissionResponse({ mainTask, steps: next });
    };

    return (
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#344E3B]">Tarefa que parece grande ou intimidante:</label>
          <input
            type="text"
            value={mainTask}
            onChange={(e) => onUpdateMissionResponse({ mainTask: e.target.value, steps })}
            placeholder="Ex: Fazer a declaração do imposto / Organizar o guarda-roupa"
            className="w-full p-3 rounded-xl border border-[#D5CDC2] bg-white text-sm text-[#25352A] focus:outline-none focus:ring-1 focus:ring-[#567E62]"
          />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#344E3B] block">Dividida em 4 micropassos simples:</span>
          {steps.map((st, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2.5 bg-white border border-[#DCD5C9] rounded-xl">
              <span className="text-xs font-bold text-[#4B6854] w-5 h-5 rounded-full bg-[#EBF2ED] flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <input
                type="text"
                value={st}
                onChange={(e) => updateStep(idx, e.target.value)}
                placeholder={`Passo ${idx + 1}...`}
                className="w-full bg-transparent text-xs sm:text-sm text-[#25352A] focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Day 27: Cleaning list with 4 decisions (Fazer, Planejar, Delegar, Eliminar)
  if (day.id === 27) {
    const decisions = [
      { key: 'fazer', label: 'FAZER (Ações imediatas e rápidas)' },
      { key: 'planejar', label: 'PLANEJAR (Importante, com data definida)' },
      { key: 'delegar', label: 'DELEGAR (Compartilhar com alguém)' },
      { key: 'eliminar', label: 'ELIMINAR (Retirar de vez da rotina)' },
    ];
    const val = typeof missionResponse === 'object' && missionResponse !== null ? missionResponse : {};

    const handleDec = (k: string, text: string) => {
      onUpdateMissionResponse({ ...val, [k]: text });
    };

    return (
      <div className="space-y-3">
        <p className="text-xs text-[#526B5A]">
          Classifique suas pendências em cada um dos 4 destinos do método:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {decisions.map((d) => (
            <div key={d.key} className="p-3 bg-white border border-[#DDD6C8] rounded-xl space-y-1.5">
              <span className="text-xs font-bold text-[#35523C] tracking-wide">{d.label}</span>
              <textarea
                value={val[d.key] || ''}
                onChange={(e) => handleDec(d.key, e.target.value)}
                rows={2}
                placeholder="Liste os itens aqui..."
                className="w-full p-2 bg-[#FBF9F6] border border-[#E8E2D7] rounded-lg text-xs sm:text-sm text-[#243329] focus:outline-none focus:ring-1 focus:ring-[#5B8566]"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Day 28: General review with 5 questions
  if (day.id === 28) {
    const questions = [
      { key: 'q1', label: '1. O que mudou?' },
      { key: 'q2', label: '2. O que ficou mais claro?' },
      { key: 'q3', label: '3. O que aprendi sobre minhas prioridades?' },
      { key: 'q4', label: '4. O que aprendi sobre meu tempo?' },
      { key: 'q5', label: '5. Qual atividade mais fez diferença?' },
    ];
    const answers = typeof missionResponse === 'object' && missionResponse !== null ? missionResponse : {};

    const handleAnswer = (k: string, val: string) => {
      onUpdateMissionResponse({ ...answers, [k]: val });
    };

    return (
      <div className="space-y-3.5">
        {questions.map((q) => (
          <div key={q.key} className="space-y-1">
            <label className="text-xs font-semibold text-[#344E3B]">{q.label}</label>
            <textarea
              value={answers[q.key] || ''}
              onChange={(e) => handleAnswer(q.key, e.target.value)}
              rows={2}
              placeholder="Sua resposta sincera..."
              className="w-full p-3 rounded-xl border border-[#D5CDC2] bg-white focus:outline-none focus:ring-1 focus:ring-[#567E62] text-sm text-[#25352A]"
            />
          </div>
        ))}
      </div>
    );
  }

  // Day 29: What to take forward
  if (day.id === 29) {
    const val = typeof missionResponse === 'object' && missionResponse !== null ? missionResponse : {};
    const handle = (k: string, text: string) => onUpdateMissionResponse({ ...val, [k]: text });

    return (
      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#344E3B]">3 práticas para continuar na sua rotina:</label>
          <textarea
            value={val.praticas || ''}
            onChange={(e) => handle('praticas', e.target.value)}
            rows={2}
            placeholder="1. Descarrego mental\n2. Prioridade do dia\n3. Uma coisa de cada vez"
            className="w-full p-3 rounded-xl border border-[#D5CDC2] bg-white text-sm text-[#25352A] focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#344E3B]">1 coisa para PARAR de fazer:</label>
            <input
              type="text"
              value={val.parar || ''}
              onChange={(e) => handle('parar', e.target.value)}
              placeholder="Ex: abrir rede social ao acordar"
              className="w-full p-2.5 rounded-xl border border-[#D5CDC2] bg-white text-xs sm:text-sm text-[#25352A] focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#344E3B]">1 coisa para SIMPLIFICAR:</label>
            <input
              type="text"
              value={val.simplificar || ''}
              onChange={(e) => handle('simplificar', e.target.value)}
              placeholder="Ex: cardápio da semana"
              className="w-full p-2.5 rounded-xl border border-[#D5CDC2] bg-white text-xs sm:text-sm text-[#25352A] focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#344E3B]">1 coisa para continuar PRIORIZANDO:</label>
            <input
              type="text"
              value={val.priorizar || ''}
              onChange={(e) => handle('priorizar', e.target.value)}
              placeholder="Ex: meu sono e descanso"
              className="w-full p-2.5 rounded-xl border border-[#D5CDC2] bg-white text-xs sm:text-sm text-[#25352A] focus:outline-none"
            />
          </div>
        </div>
      </div>
    );
  }

  // Day 30: Minha Rotina Leve - Complete Manifesto Form
  if (day.id === 30) {
    return (
      <div className="p-5 sm:p-6 bg-[#FAF7F2] border border-[#DDD4C5] rounded-2xl space-y-6">
        <div className="border-b border-[#E3DBD0] pb-3 space-y-1">
          <h4 className="font-serif text-xl text-[#1B3524] font-medium">
            Seu Manifesto Pessoal — Minha Rotina Leve
          </h4>
          <p className="text-xs text-[#597361] leading-relaxed">
            Agora é hora de consolidar a sua própria definição de uma rotina leve.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#294532]">
              Uma rotina leve, para mim, significa:
            </label>
            <textarea
              value={day30Data.rotinaLeveSignificado || ''}
              onChange={(e) => onUpdateDay30Field('rotinaLeveSignificado', e.target.value)}
              rows={2}
              placeholder="Descreva com suas palavras o que significa leveza no seu dia a dia..."
              className="w-full p-3 rounded-xl border border-[#D0C6B5] bg-white text-sm text-[#25352A] focus:outline-none focus:ring-1 focus:ring-[#567E62]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#294532]">Quero fazer mais:</label>
              <input
                type="text"
                value={day30Data.fazerMais || ''}
                onChange={(e) => onUpdateDay30Field('fazerMais', e.target.value)}
                placeholder="Ex: pausas conscientes, ler, caminhar..."
                className="w-full p-2.5 rounded-xl border border-[#D0C6B5] bg-white text-xs sm:text-sm text-[#25352A] focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#294532]">Quero fazer menos:</label>
              <input
                type="text"
                value={day30Data.fazerMenos || ''}
                onChange={(e) => onUpdateDay30Field('fazerMenos', e.target.value)}
                placeholder="Ex: cobrança excessiva, multitarefa..."
                className="w-full p-2.5 rounded-xl border border-[#D0C6B5] bg-white text-xs sm:text-sm text-[#25352A] focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#294532]">Quero parar de carregar:</label>
              <input
                type="text"
                value={day30Data.pararCarregar || ''}
                onChange={(e) => onUpdateDay30Field('pararCarregar', e.target.value)}
                placeholder="Ex: a obrigação de agradar a todos..."
                className="w-full p-2.5 rounded-xl border border-[#D0C6B5] bg-white text-xs sm:text-sm text-[#25352A] focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#294532]">Quero simplificar:</label>
              <input
                type="text"
                value={day30Data.simplificar || ''}
                onChange={(e) => onUpdateDay30Field('simplificar', e.target.value)}
                placeholder="Ex: minha organização semanal..."
                className="w-full p-2.5 rounded-xl border border-[#D0C6B5] bg-white text-xs sm:text-sm text-[#25352A] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#294532]">Quero continuar priorizando:</label>
            <input
              type="text"
              value={day30Data.continuarPriorizando || ''}
              onChange={(e) => onUpdateDay30Field('continuarPriorizando', e.target.value)}
              placeholder="Ex: minha paz, minha saúde mental e física..."
              className="w-full p-2.5 rounded-xl border border-[#D0C6B5] bg-white text-xs sm:text-sm text-[#25352A] focus:outline-none"
            />
          </div>

          {/* 3 Priorities */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-[#294532] block">
              Minhas 3 prioridades neste momento:
            </label>
            <div className="space-y-2">
              <input
                type="text"
                value={day30Data.prioridade1 || ''}
                onChange={(e) => onUpdateDay30Field('prioridade1', e.target.value)}
                placeholder="1. Primeira prioridade..."
                className="w-full p-2.5 rounded-xl border border-[#D0C6B5] bg-white text-xs sm:text-sm text-[#25352A] focus:outline-none"
              />
              <input
                type="text"
                value={day30Data.prioridade2 || ''}
                onChange={(e) => onUpdateDay30Field('prioridade2', e.target.value)}
                placeholder="2. Segunda prioridade..."
                className="w-full p-2.5 rounded-xl border border-[#D0C6B5] bg-white text-xs sm:text-sm text-[#25352A] focus:outline-none"
              />
              <input
                type="text"
                value={day30Data.prioridade3 || ''}
                onChange={(e) => onUpdateDay30Field('prioridade3', e.target.value)}
                placeholder="3. Terceira prioridade..."
                className="w-full p-2.5 rounded-xl border border-[#D0C6B5] bg-white text-xs sm:text-sm text-[#25352A] focus:outline-none"
              />
            </div>
          </div>

          {/* Commitments */}
          <div className="space-y-3 pt-3 border-t border-[#E3DBD0]">
            <span className="text-xs uppercase font-bold tracking-wider text-[#3C5A44]">
              Meu compromisso daqui para frente
            </span>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#374F3F]">A partir de hoje, eu quero me lembrar que...</label>
              <textarea
                value={day30Data.lembreteDiario || ''}
                onChange={(e) => onUpdateDay30Field('lembreteDiario', e.target.value)}
                rows={2}
                placeholder="Ex: eu não preciso dar conta de tudo perfeitamente todos os dias..."
                className="w-full p-3 rounded-xl border border-[#D0C6B5] bg-white text-sm text-[#25352A] focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#374F3F]">Meu compromisso comigo é...</label>
              <textarea
                value={day30Data.compromissoComigo || ''}
                onChange={(e) => onUpdateDay30Field('compromissoComigo', e.target.value)}
                rows={2}
                placeholder="Ex: respeitar meus limites e continuar dando um passo de cada vez..."
                className="w-full p-3 rounded-xl border border-[#D0C6B5] bg-white text-sm text-[#25352A] focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#374F3F]">Seu Nome:</label>
                <input
                  type="text"
                  value={day30Data.nome || ''}
                  onChange={(e) => onUpdateDay30Field('nome', e.target.value)}
                  placeholder="Seu nome completo ou como prefere ser chamada(o)"
                  className="w-full p-2.5 rounded-xl border border-[#D0C6B5] bg-white text-xs sm:text-sm text-[#25352A] focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#374F3F]">Data de Conclusão:</label>
                <input
                  type="text"
                  value={day30Data.data || ''}
                  onChange={(e) => onUpdateDay30Field('data', e.target.value)}
                  placeholder="DD/MM/AAAA"
                  className="w-full p-2.5 rounded-xl border border-[#D0C6B5] bg-white text-xs sm:text-sm text-[#25352A] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Standard Textarea for all other days
  const textVal = typeof missionResponse === 'string' ? missionResponse : '';
  return (
    <div className="space-y-2">
      <textarea
        value={textVal}
        onChange={(e) => onUpdateMissionResponse(e.target.value)}
        placeholder={day.missionPlaceholder || 'Escreva sua resposta para a ação prática de hoje...'}
        rows={4}
        className="w-full p-4 rounded-xl border border-[#D5CDC2] bg-white focus:outline-none focus:ring-2 focus:ring-[#567E62] focus:border-transparent text-sm sm:text-base text-[#243329] leading-relaxed resize-y placeholder:text-[#9EA8A0]"
      />
    </div>
  );
};
