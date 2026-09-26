import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ChallengeView } from './components/ChallengeView';
import { ProgressView } from './components/ProgressView';
import { HowItWorksView } from './components/HowItWorksView';
import { CompletionView } from './components/CompletionView';
import { PrintModal, PrintMode } from './components/PrintModal';
import { useChallengeProgress } from './hooks/useChallengeProgress';

export default function App() {
  const [currentTab, setCurrentTab] = useState<
    'home' | 'challenge' | 'progress' | 'how-it-works' | 'completion'
  >('home');

  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [printInitialMode, setPrintInitialMode] = useState<PrintMode>('full_workbook');

  const {
    state,
    completedDays,
    completedCount,
    progressPercentage,
    activeDay,
    linearLock,
    day30Data,
    lastSavedTime,
    nextRecommendedDay,
    setActiveDay,
    toggleDayCompletion,
    updateDayResponse,
    updateDay30Manifesto,
    toggleLinearLock,
    isDayUnlocked,
    resetProgress,
  } = useChallengeProgress();

  const handleOpenPrintModal = (mode: PrintMode = 'full_workbook') => {
    setPrintInitialMode(mode);
    setIsPrintModalOpen(true);
  };

  // Scroll to top when changing tab
  const handleTabChange = (
    tab: 'home' | 'challenge' | 'progress' | 'how-it-works' | 'completion'
  ) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartChallenge = (day: number) => {
    setActiveDay(day);
    setCurrentTab('challenge');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#243329] flex flex-col font-sans selection:bg-[#E2ECE4] selection:text-[#183122]">
      {/* Top Navbar Contract */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        completedCount={completedCount}
        activeDay={activeDay}
        onContinue={() => {
          if (completedCount === 30) {
            handleTabChange('completion');
          } else {
            handleStartChallenge(activeDay);
          }
        }}
        onOpenPrintModal={() => setIsPrintModalOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8 md:pt-10">
        {currentTab === 'home' && (
          <HomeView
            completedCount={completedCount}
            progressPercentage={progressPercentage}
            activeDay={activeDay}
            nextRecommendedDay={nextRecommendedDay}
            onStartChallenge={handleStartChallenge}
            onGoToProgress={() => handleTabChange('progress')}
            onOpenPrintModal={() => setIsPrintModalOpen(true)}
          />
        )}

        {currentTab === 'challenge' && (
          <ChallengeView
            activeDay={activeDay}
            setActiveDay={setActiveDay}
            completedDays={completedDays}
            responses={state.responses}
            day30Data={day30Data}
            toggleDayCompletion={toggleDayCompletion}
            updateDayResponse={updateDayResponse}
            updateDay30Manifesto={updateDay30Manifesto}
            lastSavedTime={lastSavedTime}
            linearLock={linearLock}
            isDayUnlocked={isDayUnlocked}
            toggleLinearLock={toggleLinearLock}
            onGoToCompletion={() => handleTabChange('completion')}
            onOpenPrintModal={() => setIsPrintModalOpen(true)}
          />
        )}

        {currentTab === 'progress' && (
          <ProgressView
            completedDays={completedDays}
            progressPercentage={progressPercentage}
            activeDay={activeDay}
            linearLock={linearLock}
            responses={state.responses}
            toggleLinearLock={toggleLinearLock}
            onSelectDay={(dayId) => {
              setActiveDay(dayId);
              setCurrentTab('challenge');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isDayUnlocked={isDayUnlocked}
            onOpenPrintModal={() => setIsPrintModalOpen(true)}
            onResetProgress={resetProgress}
          />
        )}

        {currentTab === 'how-it-works' && (
          <HowItWorksView onStart={() => handleStartChallenge(activeDay)} />
        )}

        {currentTab === 'completion' && (
          <CompletionView
            completedCount={completedCount}
            day30Data={day30Data}
            onGoToDay30={() => {
              setActiveDay(30);
              setCurrentTab('challenge');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenPrintModal={handleOpenPrintModal}
          />
        )}
      </main>

      {/* Printable and Summary Modal */}
      <PrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        completedDays={completedDays}
        responses={state.responses}
        day30Data={day30Data}
        activeDay={activeDay}
        initialMode={printInitialMode}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-[#E8E2D8] bg-[#FAF8F5] py-8 pb-24 md:pb-10 no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#5D7364]">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <img
              src="https://i.ibb.co/S7frFYCr/Chat-GPT-Image-24-de-set-de-2026-10-58-16.png"
              alt="Rotina Leve"
              className="h-8 w-auto object-contain rounded-md"
              referrerPolicy="no-referrer"
            />
            <div className="flex items-center gap-2">
              <span className="font-serif font-semibold text-[#183122] text-sm">
                Rotina Leve
              </span>
              <span className="hidden sm:inline" aria-hidden="true">·</span>
              <span>Desafio 30 Dias — Minha Rotina Leve</span>
            </div>
          </div>

          <div className="text-center sm:text-right space-y-1">
            <p>Pequenos passos também são progresso. Uma rotina mais consciente.</p>
            <p className="text-[11px] text-[#7E9183]">
              Suas anotações são salvas com privacidade diretamente no seu navegador.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
