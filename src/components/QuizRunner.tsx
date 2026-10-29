/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useLocale } from '../context/LocaleContext';
import { SingleSelectQuestion, VarkModality, KolbDimension } from '../data/quizData';
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

interface QuizRunnerProps<T extends VarkModality | KolbDimension> {
  modelName: string;
  modelKey: 'vark' | 'kolb';
  questions: SingleSelectQuestion<T>[];
  onComplete: (answers: (T | null)[]) => void;
  onExit: () => void;
}

export default function QuizRunner<T extends VarkModality | KolbDimension>({
  modelName,
  modelKey,
  questions,
  onComplete,
  onExit,
}: QuizRunnerProps<T>) {
  const { locale, t } = useLocale();

  // Try to restore previous progress
  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = getQuizProgress(modelKey);
    if (saved && typeof saved.currentIndex === 'number' && saved.currentIndex < questions.length) {
      return saved.currentIndex;
    }
    return 0;
  });

  const [answers, setAnswers] = useState<(T | null)[]>(() => {
    const saved = getQuizProgress(modelKey);
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
    saveQuizProgress(modelKey, currentIndex, answers);
  }, [answers, currentIndex, modelKey]);

  // Handle keyboard shortcuts (1, 2, 3, 4, Enter, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Numbers 1-4
      if (['1', '2', '3', '4'].includes(e.key)) {
        const optIndex = parseInt(e.key) - 1;
        if (currentQuestion.options[optIndex]) {
          handleSelectOption(currentQuestion.options[optIndex].tag);
        }
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

  const handleSelectOption = (tag: T) => {
    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = tag;
    setAnswers(nextAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      if (allAnswered) {
        clearQuizProgress(modelKey);
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
      clearQuizProgress(modelKey);
      setAnswers(new Array(questions.length).fill(null));
      setCurrentIndex(0);
    }
  };

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
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
            {modelName}
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
          <span className="text-indigo-600 font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-9 mb-8 animate-in fade-in duration-200">
        {/* Question Prompt */}
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug mb-6">
          {localize(currentQuestion.prompt, locale)}
        </h2>

        {/* Options List */}
        <div className="space-y-3.5">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = currentAnswer === option.tag;
            const letter = ['A', 'B', 'C', 'D'][idx];

            return (
              <button
                key={option.id || idx}
                onClick={() => handleSelectOption(option.tag)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 flex items-start gap-4 focus:outline-hidden group ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                {/* Radio badge */}
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  }`}
                >
                  {isSelected ? <CheckCircle2 className="w-4 h-4" /> : letter}
                </div>

                {/* Option text */}
                <div className="flex-1">
                  <span
                    className={`text-sm sm:text-base leading-relaxed ${
                      isSelected ? 'font-bold text-indigo-950' : 'text-slate-700'
                    }`}
                  >
                    {localize(option.text, locale)}
                  </span>
                </div>

                {/* Keyboard shortcut hint */}
                <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400 opacity-60">
                  [{idx + 1}]
                </span>
              </button>
            );
          })}
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
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-indigo-200 transform hover:scale-[1.02] active:scale-[0.98]'
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
        <span>{t('quiz.keyboardHint')}</span>
      </div>
    </div>
  );
}
