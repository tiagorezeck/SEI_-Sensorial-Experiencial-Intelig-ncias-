/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLocale } from '../context/LocaleContext';
import { ModelType, modelsMetadata } from '../data/quizData';
import { localize } from '../lib/scoring';
import {
  Eye,
  Compass,
  Sparkles,
  Clock,
  ArrowRight,
  BookOpen,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

interface ModelCardProps {
  model: ModelType;
  onSelect: (model: ModelType) => void;
  onInfo: (model: ModelType) => void;
  isCompleted?: boolean;
}

export default function ModelCard({ model, onSelect, onInfo, isCompleted }: ModelCardProps) {
  const { locale, t } = useLocale();
  const meta = modelsMetadata[model];

  const config = {
    vark: {
      accent: 'from-blue-600 to-indigo-600',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      hoverBorder: 'hover:border-blue-500',
      buttonBg: 'bg-blue-600 hover:bg-blue-700 text-white',
      icon: <Eye className="w-5 h-5" />,
      colorName: 'blue',
    },
    kolb: {
      accent: 'from-emerald-600 to-teal-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      hoverBorder: 'hover:border-emerald-500',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      icon: <Compass className="w-5 h-5" />,
      colorName: 'emerald',
    },
    gardner: {
      accent: 'from-purple-600 to-pink-600',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
      hoverBorder: 'hover:border-purple-500',
      buttonBg: 'bg-purple-600 hover:bg-purple-700 text-white',
      icon: <Sparkles className="w-5 h-5" />,
      colorName: 'purple',
    },
  }[model];

  return (
    <div
      className={`group relative flex flex-col justify-between bg-white rounded-2xl border-2 border-slate-200/90 ${config.hoverBorder} shadow-sm hover:shadow-xl transition-all duration-300 p-6 sm:p-7 overflow-hidden`}
    >
      {/* Top gradient accent line */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${config.accent}`} />

      <div>
        {/* Header row: Category & Completed Status */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${config.badgeBg}`}
          >
            {config.icon}
            <span>{localize(meta.category, locale)}</span>
          </span>

          {isCompleted && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{locale === 'pt' ? 'Concluído' : 'Completed'}</span>
            </span>
          )}
        </div>

        {/* Title and Author */}
        <h3 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors mb-1">
          {localize(meta.title, locale)}
        </h3>
        <p className="text-xs font-semibold text-slate-400 mb-3">
          {meta.author} ({meta.year}) • {localize(meta.subtitle, locale)}
        </p>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-5">
          {localize(meta.description, locale)}
        </p>

        {/* Time and Question Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{localize(meta.timeEstimate, locale)}</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            <span>{localize(meta.questionCount, locale)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <button
          onClick={() => onInfo(model)}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1 py-2 px-1 focus:outline-hidden"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{locale === 'pt' ? 'Como funciona' : 'Learn more'}</span>
        </button>

        <button
          onClick={() => onSelect(model)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all transform active:scale-95 ${config.buttonBg}`}
        >
          <span>{isCompleted ? (locale === 'pt' ? 'Ver / Refazer' : 'Retake') : (locale === 'pt' ? 'Iniciar Teste' : 'Start Quiz')}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
