/**
 * Types for Desafio 30 Dias — Minha Rotina Leve
 */

export type MethodPillar = 'Descarregar' | 'Organizar' | 'Priorizar' | 'Planejar' | 'Executar';

export interface DayData {
  id: number;
  week: number;
  weekTitle: string;
  weekGoal: string;
  themeColor: 'sage' | 'beige' | 'terracotta' | 'forest';
  title: string;
  duration: string;
  methodPillar: MethodPillar;
  whatWeWillDo: string;
  whyItMatters: string;
  mission: string;
  missionType: 'standard_text' | 'mental_dump' | 'deferred_list' | 'areas_organizer' | 'four_steps' | 'four_decisions' | 'day7_review' | 'day13_priorities' | 'day28_review' | 'day29_selection' | 'day30_special';
  missionPlaceholder?: string;
  reflection: string;
  reflectionPlaceholder?: string;
  appConnectionTip?: string;
}

export interface Day30Manifesto {
  rotinaLeveSignificado: string;
  fazerMais: string;
  fazerMenos: string;
  pararCarregar: string;
  simplificar: string;
  continuarPriorizando: string;
  prioridade1: string;
  prioridade2: string;
  prioridade3: string;
  lembreteDiario: string;
  compromissoComigo: string;
  nome: string;
  data: string;
}

export interface UserResponses {
  [dayId: number]: {
    missionResponse?: any;
    reflectionResponse?: string;
    completedAt?: string;
  };
}

export interface UserState {
  completedDays: number[];
  responses: UserResponses;
  day30Data: Partial<Day30Manifesto>;
  linearLock: boolean;
  activeDay: number;
}
