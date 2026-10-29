/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLocale } from '../context/LocaleContext';
import { SavedResultItem } from '../lib/storage';
import {
  History,
  ArrowRight,
  Trash2,
  Award,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { ModelType } from '../data/quizData';

interface HistoryViewProps {
  savedResults: SavedResultItem[];
  onViewResult: (item: SavedResultItem) => void;
  onClearHistory: () => void;
  onBack: () => void;
  onStartQuiz: (model: ModelType) => void;
  onSeedSamples: () => void;
}

export default function HistoryView({
  savedResults,
  onViewResult,
  onClearHistory,
  onBack,
  onStartQuiz,
  onSeedSamples,
}: HistoryViewProps) {
  const { locale, t } = useLocale();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 animate-in fade-in duration-300">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-6 py-1"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{locale === 'pt' ? 'Voltar ao Início' : 'Back to Home'}</span>
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 border border-indigo-200/70 text-indigo-700 mb-2">
            <History className="w-3.5 h-3.5" />
            <span>{locale === 'pt' ? 'Memória Local' : 'Local Storage'}</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {t('nav.myResults')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {locale === 'pt'
              ? 'Seus resultados concluídos neste navegador são salvos com segurança de forma 100% privada.'
              : 'Your completed results in this browser, securely stored locally.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            onClick={onSeedSamples}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{locale === 'pt' ? 'Carregar Exemplo Completo SEI' : 'Load 3 Sample Reports'}</span>
          </button>

          {savedResults.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm(locale === 'pt' ? 'Tem certeza que deseja apagar o histórico de testes?' : 'Clear all test results?')) {
                  onClearHistory();
                }
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{locale === 'pt' ? 'Limpar Histórico' : 'Clear History'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Results List */}
      {savedResults.length === 0 ? (
        <div className="p-8 sm:p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-black text-slate-900 mb-2">
              {locale === 'pt' ? 'Deseja ver os relatórios SEI de exemplo?' : 'Want to preview sample completed reports?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
              {locale === 'pt'
                ? 'Clique no botão abaixo para carregar um perfil de exemplo preenchido com os 3 pilares SEI (Sensorial, Experiencial e Inteligências Múltiplas) e explorar todos os gráficos e recomendações.'
                : 'Click below to load sample answered tests for the 3 SEI pillars to explore all charts and recommendations.'}
            </p>
            <button
              onClick={onSeedSamples}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl text-xs sm:text-sm font-black text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-800 shadow-lg shadow-indigo-200 transition-all transform hover:scale-[1.02]"
            >
              ✨ {locale === 'pt' ? 'Carregar Exemplo dos 3 Pilares SEI' : 'Load Full SEI Sample'}
            </button>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-400 mb-3">
              {locale === 'pt' ? 'Ou comece a responder você mesmo:' : 'Or take a quiz yourself:'}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => onStartQuiz('vark')}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                {locale === 'pt' ? 'Pilar S: Sensorial (~3 min)' : 'Pillar S: Sensory'}
              </button>
              <button
                onClick={() => onStartQuiz('kolb')}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
              >
                {locale === 'pt' ? 'Pilar E: Experiencial (~3 min)' : 'Pillar E: Experiential'}
              </button>
              <button
                onClick={() => onStartQuiz('gardner')}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                {locale === 'pt' ? 'Pilar I: Inteligências (~4 min)' : 'Pillar I: Intelligences'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {savedResults.map((item) => {
            const dateStr = new Date(item.completedAt).toLocaleDateString(
              locale === 'pt' ? 'pt-BR' : 'en-US',
              { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
            );

            const badgeColor = {
              vark: 'bg-blue-100 text-blue-800 border-blue-200',
              kolb: 'bg-emerald-100 text-emerald-800 border-emerald-200',
              gardner: 'bg-purple-100 text-purple-800 border-purple-200',
            }[item.model];

            const pillarLabel = {
              vark: locale === 'pt' ? 'Pilar S · Sensorial' : 'Pillar S · Sensory',
              kolb: locale === 'pt' ? 'Pilar E · Experiencial' : 'Pillar E · Experiential',
              gardner: locale === 'pt' ? 'Pilar I · Inteligências' : 'Pillar I · Intelligences',
            }[item.model];

            return (
              <div
                key={item.id}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider border ${badgeColor}`}>
                      {pillarLabel}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Calendar className="w-3 h-3" />
                      <span>{dateStr}</span>
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    {item.resultTitle}
                  </h3>
                </div>

                <button
                  onClick={() => onViewResult(item)}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-indigo-600 transition-colors self-start sm:self-auto"
                >
                  <span>{locale === 'pt' ? 'Ver Resultado Completo' : 'View Full Report'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
