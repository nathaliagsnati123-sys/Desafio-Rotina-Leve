import { useState, useEffect, useCallback } from 'react';
import { UserState, UserResponses, Day30Manifesto } from '../types';

const STORAGE_KEY = 'rotina_leve_desafio_30d_v1';

const defaultDay30Data: Day30Manifesto = {
  rotinaLeveSignificado: '',
  fazerMais: '',
  fazerMenos: '',
  pararCarregar: '',
  simplificar: '',
  continuarPriorizando: '',
  prioridade1: '',
  prioridade2: '',
  prioridade3: '',
  lembreteDiario: '',
  compromissoComigo: '',
  nome: '',
  data: new Date().toLocaleDateString('pt-BR'),
};

const defaultState: UserState = {
  completedDays: [],
  responses: {},
  day30Data: defaultDay30Data,
  linearLock: false, // default friendly open mode, user can toggle on if they want strict sequence
  activeDay: 1,
};

export function useChallengeProgress() {
  const [state, setState] = useState<UserState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultState,
          ...parsed,
          day30Data: { ...defaultDay30Data, ...(parsed.day30Data || {}) },
        };
      }
    } catch (e) {
      console.error('Error loading challenge progress from storage:', e);
    }
    return defaultState;
  });

  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      const now = new Date();
      setLastSavedTime(
        now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      );
    } catch (e) {
      console.error('Error saving challenge progress to storage:', e);
    }
  }, [state]);

  const toggleDayCompletion = useCallback((dayId: number) => {
    setState((prev) => {
      const isCompleted = prev.completedDays.includes(dayId);
      const newCompleted = isCompleted
        ? prev.completedDays.filter((id) => id !== dayId)
        : [...prev.completedDays, dayId].sort((a, b) => a - b);

      const existingResponse = prev.responses[dayId] || {};
      const updatedResponses = {
        ...prev.responses,
        [dayId]: {
          ...existingResponse,
          completedAt: !isCompleted ? new Date().toISOString() : undefined,
        },
      };

      return {
        ...prev,
        completedDays: newCompleted,
        responses: updatedResponses,
      };
    });
  }, []);

  const updateDayResponse = useCallback(
    (dayId: number, missionResponse?: any, reflectionResponse?: string) => {
      setState((prev) => {
        const existing = prev.responses[dayId] || {};
        return {
          ...prev,
          responses: {
            ...prev.responses,
            [dayId]: {
              ...existing,
              ...(missionResponse !== undefined ? { missionResponse } : {}),
              ...(reflectionResponse !== undefined ? { reflectionResponse } : {}),
            },
          },
        };
      });
    },
    []
  );

  const updateDay30Manifesto = useCallback(
    (field: keyof Day30Manifesto, value: string) => {
      setState((prev) => ({
        ...prev,
        day30Data: {
          ...prev.day30Data,
          [field]: value,
        },
      }));
    },
    []
  );

  const setActiveDay = useCallback((day: number) => {
    setState((prev) => ({ ...prev, activeDay: Math.max(1, Math.min(30, day)) }));
  }, []);

  const toggleLinearLock = useCallback(() => {
    setState((prev) => ({ ...prev, linearLock: !prev.linearLock }));
  }, []);

  const isDayUnlocked = useCallback(
    (dayId: number) => {
      if (!state.linearLock) return true;
      if (dayId === 1) return true;
      // Day is unlocked if previous day is completed
      return state.completedDays.includes(dayId - 1);
    },
    [state.linearLock, state.completedDays]
  );

  const resetProgress = useCallback(() => {
    const fresh = { ...defaultState, activeDay: 1 };
    setState(fresh);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const progressPercentage = Math.round(
    (state.completedDays.length / 30) * 100
  );

  // Next recommended day to do
  const nextRecommendedDay = (() => {
    for (let i = 1; i <= 30; i++) {
      if (!state.completedDays.includes(i)) {
        return i;
      }
    }
    return 30;
  })();

  return {
    state,
    completedDays: state.completedDays,
    completedCount: state.completedDays.length,
    progressPercentage,
    activeDay: state.activeDay,
    linearLock: state.linearLock,
    day30Data: state.day30Data,
    lastSavedTime,
    nextRecommendedDay,
    setActiveDay,
    toggleDayCompletion,
    updateDayResponse,
    updateDay30Manifesto,
    toggleLinearLock,
    isDayUnlocked,
    resetProgress,
  };
}
