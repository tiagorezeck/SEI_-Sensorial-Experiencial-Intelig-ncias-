/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useLocale } from '../context/LocaleContext';
import { LikertQuestion, likertScale } from '../data/quizData';
import { localize } from '../lib/scoring';
import { saveQuizProgress, getQuizProgress, clearQuizProgress } from '../lib/storage';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  Info
} from 'lucide-react';

interface LikertQuizRunnerProps {
  questions: LikertQuestion[];
  onComplete: (answers: (number | null)[]) => void;
  onExit: () => void;
}

export default function LikertQuizRunner({
  questions,
  onComplete,
  onExit,
}: LikertQuizRunnerProps) {
  const { locale, t } = useLocale();

  // Try to restore previous progress
  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = getQuizProgress('gardner');
    if (saved && typeof saved.currentIndex === 'number' && saved.currentIndex < questions.length) {
      return saved.currentIndex;
    }
    return 0;
  });

  const [answers, setAnswers] = useState<(number | null)[]>(() => {
    const saved = getQuizProgress('gardner');
    if (saved && Array.isArray(saved.answers) && saved.answers.length === questions.length) {
      return saved.answers;
    }
    return new Array(questions.length).fill(null);
  });

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
  const isLastQuestion = currentIndex === questions.length - 1;
  const answeredCount = answers.filter((a) => a !== null).length;
  const allAnswered = answeredCount === questions.length;

  // Auto-save progress
  useEffect(() => {
    saveQuizProgress('gardner', currentIndex, answers);
  }, [answers, currentIndex]);

  // Keyboard shortcuts (1-5, arrows, enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const val = parseInt(e.key);
        handleSelectValue(val);
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (currentAnswer !== null) {
          handleNext();
        }
      } else if (e.key === 'ArrowLeft') {
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentAnswer, currentQuestion, answers]);

  const handleSelectValue = (value: number) => {
    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = value;
    setAnswers(nextAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      if (allAnswered) {
        clearQuizProgress('gardner');
        onComplete(answers);
      }
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    if (window.confirm(locale === 'pt' ? 'Deseja reiniciar este teste do começo?' : 'Restart this quiz from the beginning?')) {
      clearQuizProgress('gardner');
      setAnswers(new Array(questions.length).fill(null));
      setCurrentIndex(0);
    }
  };

  const scaleOptions = [1, 2, 3, 4, 5];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Header bar with exit & reset */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === 'pt' ? 'Sair do teste' : 'Exit quiz'}</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
            {locale === 'pt' ? 'Pilar I — Inteligências Múltiplas' : 'Pillar I — Multiple Intelligences'}
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

      {/* Progress Bar Container */}
      <div className="mb-8">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-2">
          <span>
            {t('quiz.questionOf', {
              current: currentIndex + 1,
              total: questions.length,
            })}
          </span>
          <span className="text-purple-600 font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-9 mb-8 animate-in fade-in duration-200">
        <div className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-2">
          {locale === 'pt' ? 'Avalie a afirmação abaixo' : 'Rate the statement below'}
        </div>

        {/* Statement Prompt */}
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug mb-8">
          "{localize(currentQuestion.prompt, locale)}"
        </h2>

        {/* Likert 1 to 5 scale buttons */}
        <div className="space-y-2.5 sm:space-y-0 sm:grid sm:grid-cols-5 sm:gap-3">
          {scaleOptions.map((num) => {
            const isSelected = currentAnswer === num;
            const labelObj = (likertScale.labels as any)[num];
            const labelText = localize(labelObj, locale);

            return (
              <button
                key={num}
                onClick={() => handleSelectValue(num)}
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

                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-purple-600 sm:mt-1 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile helper labels */}
        <div className="hidden sm:flex justify-between text-[11px] font-semibold text-slate-400 mt-4 px-1">
          <span>← {locale === 'pt' ? 'Nada a ver comigo' : 'Not me at all'}</span>
          <span>{locale === 'pt' ? 'Muito a ver comigo' : 'Very true for me'} →</span>
        </div>
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

        {isLastQuestion ? (
          <button
            onClick={handleNext}
            disabled={currentAnswer === null}
            className={`flex items-center gap-2 px-7 py-3.5 rounded-xl font-black text-sm text-white transition-all shadow-md ${
              currentAnswer !== null
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-200 transform hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-slate-300 cursor-not-allowed opacity-70'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{t('quiz.finishButton')}</span>
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={currentAnswer === null}
            className={`flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white transition-all shadow-md ${
              currentAnswer !== null
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-purple-200 transform hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-slate-300 cursor-not-allowed opacity-70'
            }`}
          >
            <span>{t('quiz.nextButton')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Keyboard Shortcut Note */}
      <div className="mt-6 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
        <Info className="w-3.5 h-3.5" />
        <span>{locale === 'pt' ? 'Dica: Você pode teclar 1 a 5 para responder rapidamente.' : 'Tip: You can press keys 1 through 5 to respond quickly.'}</span>
      </div>
    </div>
  );
}
