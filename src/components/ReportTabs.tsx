/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLocale } from '../context/LocaleContext';
import { Eye, Compass, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { ModelType } from '../data/quizData';

interface ReportTabsProps {
  currentModel: ModelType;
  onSwitchModel: (model: ModelType) => void;
  onViewComparison: () => void;
  hasAllThree?: boolean;
}

export default function ReportTabs({
  currentModel,
  onSwitchModel,
  onViewComparison,
  hasAllThree = true,
}: ReportTabsProps) {
  const { locale } = useLocale();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-2 sm:p-2.5 mb-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 self-start sm:self-auto px-2">
          <Layers className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
            {locale === 'pt' ? 'Relatórios SEI:' : 'SEI Reports:'}
          </span>
        </div>

        <div className="w-full sm:w-auto flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => onSwitchModel('vark')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
              currentModel === 'vark'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{locale === 'pt' ? 'Pilar S · Sensorial' : 'Pillar S · Sensory'}</span>
          </button>

          <button
            onClick={() => onSwitchModel('kolb')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
              currentModel === 'kolb'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{locale === 'pt' ? 'Pilar E · Experiencial' : 'Pillar E · Experiential'}</span>
          </button>

          <button
            onClick={() => onSwitchModel('gardner')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
              currentModel === 'gardner'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{locale === 'pt' ? 'Pilar I · Inteligências' : 'Pillar I · Intelligences'}</span>
          </button>

          <button
            onClick={onViewComparison}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
          >
            <span>{locale === 'pt' ? 'Matriz SEI 360°' : 'SEI 360° Matrix'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
