/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LocaleProvider, useLocale } from './context/LocaleContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ModelCard from './components/ModelCard';
import ModelIntro from './components/ModelIntro';
import QuizRunner from './components/QuizRunner';
import LikertQuizRunner from './components/LikertQuizRunner';
import VarkResultView from './components/VarkResultView';
import KolbResultView from './components/KolbResultView';
import GardnerResultView from './components/GardnerResultView';
import ComparisonView from './components/ComparisonView';
import ModelGuideView from './components/ModelGuideView';
import HistoryView from './components/HistoryView';
import LegalViews from './components/LegalViews';

import {
  varkQuestions,
  kolbQuestions,
  gardnerQuestions,
  ModelType,
  VarkModality,
  KolbDimension,
  GardnerIntelligence,
} from './data/quizData';

import {
  calculateVarkScores,
  determineVarkResult,
  calculateKolbScores,
  determineKolbResult,
  calculateGardnerScores,
  determineGardnerResult,
  VarkScores,
  KolbScores,
  GardnerScores,
  getVarkResultProfile,
  getKolbResultProfile,
  getGardnerResultProfile,
  localize,
} from './lib/scoring';

import {
  saveResult,
  getSavedResults,
  SavedResultItem,
  seedSampleResults,
  SAMPLE_VARK_DATA,
  SAMPLE_KOLB_DATA,
  SAMPLE_GARDNER_DATA,
} from './lib/storage';

import {
  Sparkles,
  ArrowRight,
  BookOpen,
  BarChart2,
  CheckCircle2,
  Zap,
  HelpCircle,
  Award,
  Layers,
  Brain
} from 'lucide-react';

function MainApp() {
  const { locale, t } = useLocale();

  // Route / View state
  const [currentView, setCurrentView] = useState<string>('home');

  // Saved results state
  const [savedResults, setSavedResults] = useState<SavedResultItem[]>(() => getSavedResults());

  // Active result state for results views
  const [activeVarkResult, setActiveVarkResult] = useState<{
    resultKey: string;
    scores: VarkScores;
  } | null>(null);

  const [activeKolbResult, setActiveKolbResult] = useState<{
    resultKey: string;
    scores: KolbScores;
  } | null>(null);

  const [activeGardnerResult, setActiveGardnerResult] = useState<{
    resultTypes: GardnerIntelligence[];
    scores: GardnerScores;
  } | null>(null);

  // Sync with browser URL hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setCurrentView(hash);
      }
    };

    if (window.location.hash) {
      handleHash();
    }
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (view: string) => {
    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Completion handlers for quizzes
  const handleVarkComplete = (answers: (VarkModality | null)[]) => {
    const scores = calculateVarkScores(answers);
    const resultKey = determineVarkResult(scores);
    const profile = getVarkResultProfile(resultKey);
    const title = localize(profile.title, locale);

    saveResult('vark', resultKey, title, scores);
    setSavedResults(getSavedResults());
    setActiveVarkResult({ resultKey, scores });
    navigateTo('result:vark');
  };

  const handleKolbComplete = (answers: (KolbDimension | null)[]) => {
    const scores = calculateKolbScores(answers);
    const resultKey = determineKolbResult(scores);
    const profile = getKolbResultProfile(resultKey);
    const title = localize(profile.title, locale);

    saveResult('kolb', resultKey, title, scores);
    setSavedResults(getSavedResults());
    setActiveKolbResult({ resultKey, scores });
    navigateTo('result:kolb');
  };

  const handleGardnerComplete = (answers: (number | null)[]) => {
    const intelligences = gardnerQuestions.map((q) => q.tag);
    const scores = calculateGardnerScores(answers, intelligences);
    const resultTypes = determineGardnerResult(scores);
    const primaryProfile = getGardnerResultProfile(resultTypes[0]);
    const title = localize(primaryProfile.title, locale);

    saveResult('gardner', resultTypes.join(','), title, scores);
    setSavedResults(getSavedResults());
    setActiveGardnerResult({ resultTypes, scores });
    navigateTo('result:gardner');
  };

  const handleViewSavedResult = (item: SavedResultItem) => {
    if (item.model === 'vark') {
      setActiveVarkResult({
        resultKey: item.resultKey,
        scores: item.scores as VarkScores,
      });
      navigateTo('result:vark');
    } else if (item.model === 'kolb') {
      setActiveKolbResult({
        resultKey: item.resultKey,
        scores: item.scores as KolbScores,
      });
      navigateTo('result:kolb');
    } else if (item.model === 'gardner') {
      const types = item.resultKey.split(',') as GardnerIntelligence[];
      setActiveGardnerResult({
        resultTypes: types,
        scores: item.scores as GardnerScores,
      });
      navigateTo('result:gardner');
    }
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem('learnertype_saved_results_v1');
      setSavedResults([]);
    } catch {
      // ignore
    }
  };

  const handleSeedSamples = () => {
    const samples = seedSampleResults(locale);
    setSavedResults(samples);
    setActiveVarkResult({
      resultKey: SAMPLE_VARK_DATA.resultKey,
      scores: SAMPLE_VARK_DATA.scores,
    });
    setActiveKolbResult({
      resultKey: SAMPLE_KOLB_DATA.resultKey,
      scores: SAMPLE_KOLB_DATA.scores,
    });
    setActiveGardnerResult({
      resultTypes: SAMPLE_GARDNER_DATA.resultTypes,
      scores: SAMPLE_GARDNER_DATA.scores,
    });
    navigateTo('result:vark');
  };

  const getEffectiveVark = () => {
    if (activeVarkResult) return activeVarkResult;
    const saved = savedResults.find((r) => r.model === 'vark');
    if (saved) return { resultKey: saved.resultKey, scores: saved.scores as VarkScores };
    return { resultKey: SAMPLE_VARK_DATA.resultKey, scores: SAMPLE_VARK_DATA.scores };
  };

  const getEffectiveKolb = () => {
    if (activeKolbResult) return activeKolbResult;
    const saved = savedResults.find((r) => r.model === 'kolb');
    if (saved) return { resultKey: saved.resultKey, scores: saved.scores as KolbScores };
    return { resultKey: SAMPLE_KOLB_DATA.resultKey, scores: SAMPLE_KOLB_DATA.scores };
  };

  const getEffectiveGardner = () => {
    if (activeGardnerResult) return activeGardnerResult;
    const saved = savedResults.find((r) => r.model === 'gardner');
    if (saved) {
      return {
        resultTypes: saved.resultKey.split(',') as GardnerIntelligence[],
        scores: saved.scores as GardnerScores,
      };
    }
    return {
      resultTypes: SAMPLE_GARDNER_DATA.resultTypes,
      scores: SAMPLE_GARDNER_DATA.scores,
    };
  };

  const isModelCompleted = (model: ModelType) => {
    return savedResults.some((r) => r.model === model);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* Sticky Header */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        savedResultsCount={savedResults.length}
        onSeedSamples={handleSeedSamples}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {/* HOME VIEW */}
        {currentView === 'home' && (
          <div className="space-y-16 py-10 sm:py-16">
            {/* Hero Section */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-indigo-50 border border-indigo-200/80 text-indigo-700 shadow-xs mb-6">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>{t('home.badge')}</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                {t('home.title')}
              </h1>

              <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
                {t('home.subtitle')}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => navigateTo('intro:vark')}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-800 shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{locale === 'pt' ? 'Iniciar Pilar S: Sensorial (~3 min)' : 'Start Pillar S: Sensory (~3 min)'}</span>
                </button>

                <button
                  onClick={() => navigateTo('comparison')}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-colors"
                >
                  <BarChart2 className="w-4 h-4 text-slate-500" />
                  <span>{locale === 'pt' ? 'Ver Matriz Integrada SEI (360°)' : 'View SEI Integrated Matrix'}</span>
                </button>
              </div>

              {/* Sample answered tests callout */}
              <div className="mt-8 max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 border border-indigo-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">
                      {locale === 'pt' ? 'Exemplo dos 3 Pilares SEI Respondidos' : 'Sample of All 3 SEI Pillars'}
                    </h4>
                    <p className="text-xs text-slate-600">
                      {locale === 'pt'
                        ? 'Explore os diagnósticos de Sensorial (S), Experiencial (E) e Inteligências (I) com gráficos e plano de estudos em 1 clique.'
                        : 'Inspect complete diagnostic reports, charts, and 360° matrix with one click.'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSeedSamples}
                  className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>{locale === 'pt' ? 'Ver Diagnóstico Completo' : 'View Full Report'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* Model Selection Cards Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
                  {t('home.selectModelHeading')}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t('home.selectModelSub')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <ModelCard
                  model="vark"
                  isCompleted={isModelCompleted('vark')}
                  onSelect={(m) => navigateTo(`intro:${m}`)}
                  onInfo={(m) => navigateTo('guides')}
                />
                <ModelCard
                  model="kolb"
                  isCompleted={isModelCompleted('kolb')}
                  onSelect={(m) => navigateTo(`intro:${m}`)}
                  onInfo={(m) => navigateTo('guides')}
                />
                <ModelCard
                  model="gardner"
                  isCompleted={isModelCompleted('gardner')}
                  onSelect={(m) => navigateTo(`intro:${m}`)}
                  onInfo={(m) => navigateTo('guides')}
                />
              </div>
            </section>

            {/* Benefits Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
                    {t('home.whyLearnTitle')}
                  </h2>
                  <p className="text-sm text-slate-300">
                    {locale === 'pt'
                      ? 'Ao invés de forçar métodos que geram frustração, adapte sua rotina ao funcionamento natural dos seus três pilares cognitivos.'
                      : 'Stop forcing study techniques that drain your energy. Align your routine with your cognitive profile.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-lg mb-4">
                      S
                    </div>
                    <h3 className="text-lg font-bold mb-2">{locale === 'pt' ? 'Pilar Sensorial (S)' : t('home.benefit1Title')}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {locale === 'pt'
                        ? 'Descubra a porta de entrada da informação (olhos, ouvidos, leitura ou movimento) e monte resumos que seu cérebro assimila no primeiro contato.'
                        : t('home.benefit1Desc')}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-lg mb-4">
                      E
                    </div>
                    <h3 className="text-lg font-bold mb-2">{locale === 'pt' ? 'Pilar Experiencial (E)' : t('home.benefit2Title')}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {locale === 'pt'
                        ? 'Entenda como você transforma teoria em prática, lida com desafios e fecha o ciclo de retenção contínua e resolução de problemas.'
                        : t('home.benefit2Desc')}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-lg mb-4">
                      I
                    </div>
                    <h3 className="text-lg font-bold mb-2">{locale === 'pt' ? 'Pilar Inteligências (I)' : t('home.benefit3Title')}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {locale === 'pt'
                        ? 'Identifique em quais domínios cognitivos você tem facilidade natural (lógica, espacial, interpessoal, etc.) e acelere seu crescimento.'
                        : t('home.benefit3Desc')}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Which test first recommendation */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
                    {locale === 'pt' ? 'Orientação Inicial' : 'Quick Guide'}
                  </span>
                  <h3 className="text-xl font-black text-slate-900">
                    {t('home.whichFirstTitle')}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                    {t('home.whichFirstDesc')}
                  </p>
                </div>

                <button
                  onClick={() => navigateTo('comparison')}
                  className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                >
                  <span>{locale === 'pt' ? 'Ver Matriz Integrada SEI' : 'View Comparison Matrix'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>
          </div>
        )}

        {/* INTRO VIEWS */}
        {currentView === 'intro:vark' && (
          <ModelIntro
            model="vark"
            onStart={() => navigateTo('quiz:vark')}
            onBack={() => navigateTo('home')}
          />
        )}
        {currentView === 'intro:kolb' && (
          <ModelIntro
            model="kolb"
            onStart={() => navigateTo('quiz:kolb')}
            onBack={() => navigateTo('home')}
          />
        )}
        {currentView === 'intro:gardner' && (
          <ModelIntro
            model="gardner"
            onStart={() => navigateTo('quiz:gardner')}
            onBack={() => navigateTo('home')}
          />
        )}

        {/* QUIZ VIEWS */}
        {currentView === 'quiz:vark' && (
          <QuizRunner<VarkModality>
            modelKey="vark"
            modelName="Pilar S — Canais Sensoriais"
            questions={varkQuestions}
            onComplete={handleVarkComplete}
            onExit={() => navigateTo('home')}
          />
        )}
        {currentView === 'quiz:kolb' && (
          <QuizRunner<KolbDimension>
            modelKey="kolb"
            modelName="Pilar E — Ciclo Experiencial"
            questions={kolbQuestions}
            onComplete={handleKolbComplete}
            onExit={() => navigateTo('home')}
          />
        )}
        {currentView === 'quiz:gardner' && (
          <LikertQuizRunner
            questions={gardnerQuestions}
            onComplete={handleGardnerComplete}
            onExit={() => navigateTo('home')}
          />
        )}

        {/* RESULTS VIEWS */}
        {currentView === 'result:vark' && (
          <VarkResultView
            resultKey={getEffectiveVark().resultKey}
            scores={getEffectiveVark().scores}
            onRetake={() => navigateTo('quiz:vark')}
            onSelectOtherModel={(m) => navigateTo(`result:${m}`)}
            onCompare={() => navigateTo('comparison')}
          />
        )}
        {currentView === 'result:kolb' && (
          <KolbResultView
            resultKey={getEffectiveKolb().resultKey}
            scores={getEffectiveKolb().scores}
            onRetake={() => navigateTo('quiz:kolb')}
            onSelectOtherModel={(m) => navigateTo(`result:${m}`)}
            onCompare={() => navigateTo('comparison')}
          />
        )}
        {currentView === 'result:gardner' && (
          <GardnerResultView
            resultTypes={getEffectiveGardner().resultTypes}
            scores={getEffectiveGardner().scores}
            onRetake={() => navigateTo('quiz:gardner')}
            onSelectOtherModel={(m) => navigateTo(`result:${m}`)}
            onCompare={() => navigateTo('comparison')}
          />
        )}

        {/* COMPARISON VIEW */}
        {currentView === 'comparison' && (
          <ComparisonView onSelectModel={(m) => navigateTo(`intro:${m}`)} />
        )}

        {/* GUIDES VIEW */}
        {currentView === 'guides' && (
          <ModelGuideView onStartQuiz={(m) => navigateTo(`intro:${m}`)} />
        )}

        {/* HISTORY VIEW */}
        {currentView === 'history' && (
          <HistoryView
            savedResults={savedResults}
            onViewResult={handleViewSavedResult}
            onClearHistory={handleClearHistory}
            onBack={() => navigateTo('home')}
            onStartQuiz={(m) => navigateTo(`intro:${m}`)}
            onSeedSamples={handleSeedSamples}
          />
        )}

        {/* LEGAL VIEWS */}
        {currentView === 'privacy' && (
          <LegalViews view="privacy" onBack={() => navigateTo('home')} />
        )}
        {currentView === 'terms' && (
          <LegalViews view="terms" onBack={() => navigateTo('home')} />
        )}
        {currentView === 'contact' && (
          <LegalViews view="contact" onBack={() => navigateTo('home')} />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default function App() {
  return (
    <LocaleProvider>
      <MainApp />
    </LocaleProvider>
  );
}
