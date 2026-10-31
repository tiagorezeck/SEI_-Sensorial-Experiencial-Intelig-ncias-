/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * LearnerType Brasil - Questionário Unificado SEI 360° (75 Questões em 3 Blocos)
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useLocale } from '../context/LocaleContext';
import {
  varkQuestions,
  kolbQuestions,
  gardnerQuestions,
  VarkModality,
  KolbDimension,
  GardnerIntelligence,
  likertScale,
} from '../data/quizData';
import {
  calculateVarkScores,
  determineVarkResult,
  calculateKolbScores,
  determineKolbResult,
  calculateGardnerScores,
  determineGardnerResult,
  getVarkResultProfile,
  getKolbResultProfile,
  getGardnerResultProfile,
  localize,
} from '../lib/scoring';
import { saveResult, saveQuizProgress, getQuizProgress, clearQuizProgress } from '../lib/storage';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  Info,
  Layers,
  Award,
  HelpCircle,
  Brain,
  Coffee,
  Check
} from 'lucide-react';

interface UnifiedQuizRunnerProps {
  onComplete: () => void;
  onExit: () => void;
}

export default function UnifiedQuizRunner({ onComplete, onExit }: UnifiedQuizRunnerProps) {
  const { locale, t } = useLocale();

  // Unified State: 75 total questions
  const totalQuestions = 75; // 20 VARK + 20 KOLB + 35 GARDNER

  // Try restoring saved progress for unified quiz
  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = getQuizProgress('unified_sei') as any;
    if (saved && typeof saved.currentIndex === 'number' && saved.currentIndex < totalQuestions) {
      return saved.currentIndex;
    }
    return 0;
  });

  const [varkAnswers, setVarkAnswers] = useState<(VarkModality | null)[]>(() => {
    const saved = getQuizProgress('unified_sei') as any;
    if (saved && Array.isArray(saved.varkAnswers) && saved.varkAnswers.length === 20) {
      return saved.varkAnswers;
    }
    return new Array(20).fill(null);
  });

  const [kolbAnswers, setKolbAnswers] = useState<(KolbDimension | null)[]>(() => {
    const saved = getQuizProgress('unified_sei') as any;
    if (saved && Array.isArray(saved.kolbAnswers) && saved.kolbAnswers.length === 20) {
      return saved.kolbAnswers;
    }
    return new Array(20).fill(null);
  });

  const [gardnerAnswers, setGardnerAnswers] = useState<(number | string | null)[]>(() => {
    const saved = getQuizProgress('unified_sei') as any;
    if (saved && Array.isArray(saved.gardnerAnswers) && saved.gardnerAnswers.length === 35) {
      return saved.gardnerAnswers;
    }
    return new Array(35).fill(null);
  });

  const [activeBreakModal, setActiveBreakModal] = useState<'block1' | 'block2' | null>(null);

  // Auto-save progress
  useEffect(() => {
    saveQuizProgress('unified_sei', currentIndex, {
      varkAnswers,
      kolbAnswers,
      gardnerAnswers,
    } as any);
  }, [currentIndex, varkAnswers, kolbAnswers, gardnerAnswers]);

  // Determine current block
  // Q01 - Q20: Bloco 1 (Sensorial)
  // Q21 - Q40: Bloco 2 (Experiencial)
  // Q41 - Q75: Bloco 3 (Inteligências Múltiplas)
  const currentBlockIndex = currentIndex < 20 ? 1 : currentIndex < 40 ? 2 : 3;

  // Question within current block
  const blockQuestionNum =
    currentBlockIndex === 1
      ? currentIndex + 1
      : currentBlockIndex === 2
      ? currentIndex - 19
      : currentIndex - 39;

  const blockTotalCount = currentBlockIndex === 1 ? 20 : currentBlockIndex === 2 ? 20 : 35;

  // Current Question Object
  const currentVarkQ = currentBlockIndex === 1 ? varkQuestions[currentIndex] : null;
  const currentKolbQ = currentBlockIndex === 2 ? kolbQuestions[currentIndex - 20] : null;
  const currentGardnerQ = currentBlockIndex === 3 ? gardnerQuestions[currentIndex - 40] : null;

  // Current Answer
  const currentAnswer =
    currentBlockIndex === 1
      ? varkAnswers[currentIndex]
      : currentBlockIndex === 2
      ? kolbAnswers[currentIndex - 20]
      : gardnerAnswers[currentIndex - 40];

  // Shuffled options for VARK / KOLB options
  const currentOptions = currentVarkQ?.options || currentKolbQ?.options || [];
  const questionIdForSeed = currentVarkQ?.id || currentKolbQ?.id || 'seed';

  const shuffledOptions = useMemo(() => {
    if (!currentOptions || currentOptions.length === 0) return [];
    const opts = [...currentOptions];
    let seed = 0;
    for (let i = 0; i < questionIdForSeed.length; i++) {
      seed = (seed << 5) - seed + questionIdForSeed.charCodeAt(i);
      seed |= 0;
    }
    for (let i = opts.length - 1; i > 0; i--) {
      seed = (seed * 9301 + 49297) % 233280;
      const j = Math.floor((seed / 233280) * (i + 1));
      const temp = opts[i];
      opts[i] = opts[j];
      opts[j] = temp;
    }
    return opts;
  }, [currentOptions, questionIdForSeed]);

  // Overall progress percentage
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Handlers for selecting answers
  const handleSelectVark = (tag: VarkModality) => {
    const next = [...varkAnswers];
    next[currentIndex] = tag;
    setVarkAnswers(next);
  };

  const handleSelectKolb = (tag: KolbDimension) => {
    const next = [...kolbAnswers];
    next[currentIndex - 20] = tag;
    setKolbAnswers(next);
  };

  const handleSelectGardner = (val: number | string) => {
    const next = [...gardnerAnswers];
    next[currentIndex - 40] = val;
    setGardnerAnswers(next);
  };

  const handleNext = () => {
    // Check if moving from Q20 to Q21 (Block 1 complete)
    if (currentIndex === 19) {
      setActiveBreakModal('block1');
      return;
    }
    // Check if moving from Q40 to Q41 (Block 2 complete)
    if (currentIndex === 39) {
      setActiveBreakModal('block2');
      return;
    }

    if (currentIndex === totalQuestions - 1) {
      // Finish unified test
      finishUnifiedQuiz();
    } else {
      setCurrentIndex((prev: number) => Math.min(prev + 1, totalQuestions - 1));
    }
  };

  const finishUnifiedQuiz = () => {
    // 1. VARK
    const vScores = calculateVarkScores(varkAnswers);
    const vResKey = determineVarkResult(vScores);
    const vProfile = getVarkResultProfile(vResKey);
    saveResult('vark', vResKey, localize(vProfile.title, locale), vScores);

    // 2. KOLB
    const kScores = calculateKolbScores(kolbAnswers);
    const kResKey = determineKolbResult(kScores);
    const kProfile = getKolbResultProfile(kResKey);
    saveResult('kolb', kResKey, localize(kProfile.title, locale), kScores);

    // 3. GARDNER
    const gScores = calculateGardnerScores(gardnerAnswers, gardnerQuestions);
    const gTypes = determineGardnerResult(gScores);
    const gProfile = getGardnerResultProfile(gTypes[0]);
    saveResult('gardner', gTypes.join(','), localize(gProfile.title, locale), gScores);

    clearQuizProgress('unified_sei');
    onComplete();
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev: number) => prev - 1);
    }
  };

  const handleReset = () => {
    if (window.confirm(locale === 'pt' ? 'Deseja reiniciar o teste unificado SEI 360°?' : 'Restart SEI 360° unified quiz?')) {
      clearQuizProgress('unified_sei');
      setVarkAnswers(new Array(20).fill(null));
      setKolbAnswers(new Array(20).fill(null));
      setGardnerAnswers(new Array(35).fill(null));
      setCurrentIndex(0);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === 'pt' ? 'Sair do teste' : 'Exit quiz'}</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 shadow-2xs">
            {locale === 'pt' ? 'Diagnóstico Unificado SEI 360° (75 Qs)' : 'SEI 360° Unified Diagnostic (75 Qs)'}
          </span>
          <button
            onClick={handleReset}
            title={locale === 'pt' ? 'Recomeçar teste' : 'Restart quiz'}
            className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{locale === 'pt' ? 'Recomeçar' : 'Restart'}</span>
          </button>
        </div>
      </div>

      {/* Block Progress Indicators */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
        <div
          className={`p-3 rounded-2xl border text-center transition-all ${
            currentBlockIndex === 1
              ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400/20'
              : currentIndex >= 20
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-slate-100 text-slate-500 border-slate-200'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">
            {locale === 'pt' ? 'Bloco 1 de 3' : 'Block 1 of 3'}
          </div>
          <div className="text-xs sm:text-sm font-black flex items-center justify-center gap-1">
            <span>{locale === 'pt' ? 'Sensorial (VARK)' : 'Sensory (VARK)'}</span>
            {currentIndex >= 20 && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
          </div>
          <div className="text-[10px] font-medium opacity-90 mt-0.5">20 Qs</div>
        </div>

        <div
          className={`p-3 rounded-2xl border text-center transition-all ${
            currentBlockIndex === 2
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-400/20'
              : currentIndex >= 40
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-slate-100 text-slate-500 border-slate-200'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">
            {locale === 'pt' ? 'Bloco 2 de 3' : 'Block 2 of 3'}
          </div>
          <div className="text-xs sm:text-sm font-black flex items-center justify-center gap-1">
            <span>{locale === 'pt' ? 'Experiencial (Kolb)' : 'Experiential (Kolb)'}</span>
            {currentIndex >= 40 && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
          </div>
          <div className="text-[10px] font-medium opacity-90 mt-0.5">20 Qs</div>
        </div>

        <div
          className={`p-3 rounded-2xl border text-center transition-all ${
            currentBlockIndex === 3
              ? 'bg-purple-600 text-white border-purple-600 shadow-md ring-2 ring-purple-400/20'
              : 'bg-slate-100 text-slate-500 border-slate-200'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">
            {locale === 'pt' ? 'Bloco 3 de 3' : 'Block 3 of 3'}
          </div>
          <div className="text-xs sm:text-sm font-black flex items-center justify-center gap-1">
            <span>{locale === 'pt' ? 'Inteligências (Gardner)' : 'Intelligences (Gardner)'}</span>
          </div>
          <div className="text-[10px] font-medium opacity-90 mt-0.5">35 Qs</div>
        </div>
      </div>

      {/* Global Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-2">
          <span>
            {locale === 'pt'
              ? `Questão ${currentIndex + 1} de ${totalQuestions} (Bloco ${currentBlockIndex}: Q${blockQuestionNum} de ${blockTotalCount})`
              : `Question ${currentIndex + 1} of ${totalQuestions} (Block ${currentBlockIndex}: Q${blockQuestionNum} of ${blockTotalCount})`}
          </span>
          <span className="text-indigo-600 font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* QUESTION CARD */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-9 mb-8 animate-in fade-in duration-200">
        {/* BLOCK 1 & 2 RENDERING (SINGLE SELECT OPTIONS) */}
        {(currentBlockIndex === 1 || currentBlockIndex === 2) && (
          <>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2 flex items-center gap-1.5">
              <span>
                {currentBlockIndex === 1
                  ? (locale === 'pt' ? 'Pilar S — Sensorial · Escolha a opção de maior afinidade' : 'Pillar S — Sensory · Select the option with highest affinity')
                  : (locale === 'pt' ? 'Pilar E — Experiencial · Escolha como você costuma agir' : 'Pillar E — Experiential · Select how you usually act')}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug mb-6">
              {localize((currentVarkQ || currentKolbQ)!.prompt, locale)}
            </h2>

            <div className="space-y-3.5">
              {shuffledOptions.map((option, idx) => {
                const isSelected = currentAnswer === option.tag;
                const letter = ['A', 'B', 'C', 'D'][idx];

                return (
                  <button
                    key={option.id || idx}
                    onClick={() =>
                      currentBlockIndex === 1
                        ? handleSelectVark(option.tag as VarkModality)
                        : handleSelectKolb(option.tag as KolbDimension)
                    }
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between focus:outline-hidden group ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-2 ring-indigo-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1 pr-2">
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                        }`}
                      >
                        {isSelected ? <CheckCircle2 className="w-4 h-4" /> : letter}
                      </div>

                      <span
                        className={`text-sm sm:text-base leading-relaxed ${
                          isSelected ? 'font-bold text-indigo-950' : 'text-slate-700'
                        }`}
                      >
                        {localize(option.text, locale)}
                      </span>
                    </div>

                    {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* BLOCK 3 RENDERING (GARDNER LIKERT / SITUATIONAL) */}
        {currentBlockIndex === 3 && currentGardnerQ && (
          <>
            {/* Gardner question rendering */}
            {'options' in currentGardnerQ && Array.isArray(currentGardnerQ.options) ? (
              /* Situational Scenario */
              <>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                  <span>{locale === 'pt' ? 'Pilar I — Análise Situacional · Escolha 1 opção' : 'Pillar I — Situational Scenario · Choose 1 option'}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug mb-8">
                  {localize(currentGardnerQ.prompt, locale)}
                </h2>

                <div className="space-y-3">
                  {currentGardnerQ.options.map((opt, optIdx) => {
                    const optionLetter = String.fromCharCode(65 + optIdx);
                    const isSelected = currentAnswer === opt.id || currentAnswer === opt.tag;
                    const optText = localize(opt.text, locale);

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectGardner(opt.id)}
                        className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-left focus:outline-hidden ${
                          isSelected
                            ? 'border-purple-600 bg-purple-50/90 text-purple-950 font-bold ring-2 ring-purple-500/20 shadow-md scale-[1.01]'
                            : 'border-slate-200 bg-white hover:border-purple-300 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 pr-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                              isSelected
                                ? 'bg-purple-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {optionLetter}
                          </div>
                          <span className="text-xs sm:text-sm font-medium leading-relaxed">{optText}</span>
                        </div>

                        {isSelected && <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              /* Likert 1 to 5 Statement */
              <>
                <div className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-2">
                  {locale === 'pt' ? 'Pilar I — Avalie o quanto esta afirmação se aplica a você' : 'Pillar I — Rate how much this statement applies to you'}
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug mb-8">
                  "{localize(currentGardnerQ.prompt, locale)}"
                </h2>

                <div className="space-y-2.5 sm:space-y-0 sm:grid sm:grid-cols-5 sm:gap-3">
                  {[1, 2, 3, 4, 5].map((num) => {
                    const isSelected = currentAnswer === num;
                    const labelObj = (likertScale.labels as any)[num];
                    const labelText = localize(labelObj, locale);

                    return (
                      <button
                        key={num}
                        onClick={() => handleSelectGardner(num)}
                        className={`w-full p-4 rounded-2xl border-2 transition-all flex flex-row sm:flex-col items-center justify-between sm:justify-center text-center focus:outline-hidden ${
                          isSelected
                            ? 'border-purple-600 bg-purple-50 text-purple-950 font-bold ring-2 ring-purple-500/20 shadow-md scale-[1.02]'
                            : 'border-slate-200 bg-white hover:border-purple-300 hover:bg-slate-50/70 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3 sm:flex-col sm:gap-1.5">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm transition-colors ${
                              isSelected
                                ? 'bg-purple-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {num}
                          </div>
                          <span className="text-xs sm:text-[11px] leading-tight text-left sm:text-center font-medium">
                            {labelText}
                          </span>
                        </div>

                        {isSelected && <CheckCircle2 className="w-4 h-4 text-purple-600 sm:mt-1 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                <div className="hidden sm:flex justify-between text-[11px] font-semibold text-slate-400 mt-4 px-1">
                  <span>← {locale === 'pt' ? 'Discordo totalmente' : 'Strongly disagree'}</span>
                  <span>{locale === 'pt' ? 'Concordo totalmente' : 'Strongly agree'} →</span>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handleBack}
          disabled={currentIndex === 0}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-colors ${
            currentIndex === 0
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'
              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-xs'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('quiz.prevButton')}</span>
        </button>

        <button
          onClick={handleNext}
          disabled={currentAnswer === null}
          className={`flex items-center gap-2 px-7 py-3.5 rounded-xl font-black text-sm text-white transition-all shadow-md ${
            currentAnswer !== null
              ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 shadow-indigo-200 transform hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-slate-300 cursor-not-allowed opacity-70'
          }`}
        >
          <span>
            {currentIndex === totalQuestions - 1
              ? (locale === 'pt' ? 'Concluir Diagnóstico Unificado' : 'Finish Unified Diagnostic')
              : currentIndex === 19 || currentIndex === 39
              ? (locale === 'pt' ? 'Concluir Bloco e Avançar' : 'Complete Block & Proceed')
              : t('quiz.nextButton')}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* CELEBRATORY BLOCK BREAK MODALS */}
      {activeBreakModal === 'block1' && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-black text-blue-600 uppercase tracking-wider block mb-1">
                {locale === 'pt' ? 'Bloco 1 Concluído (20 / 20)' : 'Block 1 Completed (20 / 20)'}
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {locale === 'pt' ? 'Pilar S — Canais Sensoriais Finalizado!' : 'Pillar S — Sensory Modalities Complete!'}
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {locale === 'pt'
                  ? 'Você mapeou com sucesso a forma como seu cérebro capta estímulos sensoriais. Faça uma pausa de 10 segundos, tome um gole de água e continue para o Bloco 2.'
                  : 'You have successfully mapped your sensory perception. Take a short breather and start Block 2.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-left">
              <Coffee className="w-5 h-5 text-indigo-600 shrink-0" />
              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-900 block">{locale === 'pt' ? 'Próxima Etapa: Pilar E — Experiencial' : 'Next Step: Pillar E — Experiential'}</span>
                <span>{locale === 'pt' ? '20 questões situacionais sobre o ciclo de aprendizagem de Kolb.' : '20 situational questions on Kolb’s learning cycle.'}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveBreakModal(null);
                setCurrentIndex(20);
              }}
              className="w-full py-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg shadow-indigo-200 transition-all transform hover:scale-[1.01]"
            >
              <span>{locale === 'pt' ? 'Iniciar Bloco 2: Pilar Experiencial (20 Qs)' : 'Start Block 2: Experiential Pillar (20 Qs)'}</span>
            </button>
          </div>
        </div>
      )}

      {activeBreakModal === 'block2' && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto shadow-sm">
              <Brain className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-black text-purple-600 uppercase tracking-wider block mb-1">
                {locale === 'pt' ? 'Bloco 2 Concluído (40 / 75 Questões)' : 'Block 2 Completed (40 / 75 Questions)'}
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {locale === 'pt' ? 'Pilar E — Ciclo Experiencial Finalizado!' : 'Pillar E — Experiential Cycle Complete!'}
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {locale === 'pt'
                  ? 'Você já concluiu 53% do teste total! Falta apenas o último bloco com as 35 questões do Pilar I (Inteligências Múltiplas).'
                  : 'You are over 50% done! Only Block 3 remains for Pillar I (Multiple Intelligences).'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex items-center gap-3 text-left">
              <Sparkles className="w-5 h-5 text-purple-600 shrink-0" />
              <div className="text-xs text-slate-700">
                <span className="font-bold text-slate-900 block">{locale === 'pt' ? 'Etapa Final: Pilar I — Inteligências Múltiplas' : 'Final Step: Pillar I — Multiple Intelligences'}</span>
                <span>{locale === 'pt' ? '30 declarações em escala de 1 a 5 + 5 situações cotidianas.' : '30 statements on a 1-5 scale + 5 everyday scenarios.'}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveBreakModal(null);
                setCurrentIndex(40);
              }}
              className="w-full py-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-200 transition-all transform hover:scale-[1.01]"
            >
              <span>{locale === 'pt' ? 'Iniciar Bloco 3: Inteligências Múltiplas (35 Qs)' : 'Start Block 3: Multiple Intelligences (35 Qs)'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
