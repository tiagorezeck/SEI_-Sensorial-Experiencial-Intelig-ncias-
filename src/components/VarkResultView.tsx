/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { VarkScores, getVarkResultProfile, localize } from '../lib/scoring';
import { VarkModality } from '../data/quizData';
import {
  Sparkles,
  Share2,
  Copy,
  Check,
  RotateCcw,
  ArrowRight,
  Eye,
  Headphones,
  BookOpen,
  Activity,
  Lightbulb,
  ShieldAlert,
  Award,
  Layers,
} from 'lucide-react';
import ReportTabs from './ReportTabs';
import { ModelType } from '../data/quizData';

interface VarkResultViewProps {
  resultKey: string;
  scores: VarkScores;
  onRetake: () => void;
  onSelectOtherModel: (model: 'kolb' | 'gardner' | 'vark') => void;
  onCompare: () => void;
}

export default function VarkResultView({
  resultKey,
  scores,
  onRetake,
  onSelectOtherModel,
  onCompare,
}: VarkResultViewProps) {
  const { locale, t } = useLocale();
  const profile = getVarkResultProfile(resultKey);
  const [copied, setCopied] = useState(false);

  const totalPoints = scores.V + scores.A + scores.R + scores.K || 1;

  const modalitiesList: { tag: VarkModality; name: string; icon: React.ReactNode; color: string; bg: string }[] = [
    {
      tag: 'V',
      name: locale === 'pt' ? 'Visual (V)' : 'Visual (V)',
      icon: <Eye className="w-4 h-4" />,
      color: 'bg-blue-600',
      bg: 'bg-blue-50 text-blue-800 border-blue-200'
    },
    {
      tag: 'A',
      name: locale === 'pt' ? 'Auditivo (A)' : 'Auditory (A)',
      icon: <Headphones className="w-4 h-4" />,
      color: 'bg-indigo-600',
      bg: 'bg-indigo-50 text-indigo-800 border-indigo-200'
    },
    {
      tag: 'R',
      name: locale === 'pt' ? 'Leitura / Escrita (R)' : 'Reading/Writing (R)',
      icon: <BookOpen className="w-4 h-4" />,
      color: 'bg-purple-600',
      bg: 'bg-purple-50 text-purple-800 border-purple-200'
    },
    {
      tag: 'K',
      name: locale === 'pt' ? 'Cinestésico (K)' : 'Kinesthetic (K)',
      icon: <Activity className="w-4 h-4" />,
      color: 'bg-rose-600',
      bg: 'bg-rose-50 text-rose-800 border-rose-200'
    },
  ];

  const handleShare = async () => {
    const title = localize(profile.title, locale);
    const text = t('results.sharePrompt', { title });
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'LearnerType Brasil - VARK',
          text,
          url,
        });
        return;
      } catch {
        // user cancelled or fallback
      }
    }

    // Fallback: clipboard
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const handleCopySummary = async () => {
    const title = localize(profile.title, locale);
    const summary = localize(profile.summary, locale);
    const traits = localize(profile.traits, locale).join('\n• ');
    const tips = localize(profile.study_tips, locale).map((tip, i) => `${i + 1}. ${tip}`).join('\n');

    const fullText = `[Metodologia SEI - Pilar S: Sensorial]\n\n🎯 Perfil: ${title}\n📝 Resumo: ${summary}\n\n📊 Pontuação:\nVisual: ${scores.V} | Auditivo: ${scores.A} | Leitura/Escrita: ${scores.R} | Cinestésico: ${scores.K}\n\n✨ Características:\n• ${traits}\n\n💡 Dicas de Estudo:\n${tips}\n\nDescubra seu perfil no SEI em: ${window.location.href}`;

    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 animate-in fade-in duration-300">
      {/* 3-Model Report Switcher Tabs */}
      <ReportTabs
        currentModel="vark"
        onSwitchModel={(m) => onSelectOtherModel(m)}
        onViewComparison={onCompare}
      />

      {/* Hero Result Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl mb-8 relative overflow-hidden">
        <div className="relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/20 text-indigo-200 mb-4">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('results.badge')} • {locale === 'pt' ? 'Pilar S (Sensorial)' : 'Pillar S (Sensory)'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            {localize(profile.title, locale)}
          </h1>

          <p className="text-base sm:text-lg text-indigo-100 max-w-3xl leading-relaxed">
            {localize(profile.summary, locale)}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-indigo-950 hover:bg-indigo-50 shadow-md transition-all active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? t('results.shareTextCopied') : t('results.shareTitle')}</span>
            </button>

            <button
              onClick={handleCopySummary}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{t('results.downloadSummary')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Score Distribution Chart Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 mb-8">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
          <Layers className="w-5 h-5 text-indigo-600" />
          <span>{t('results.scoreDistribution')}</span>
        </h2>

        <div className="space-y-4">
          {modalitiesList.map((m) => {
            const val = scores[m.tag];
            const pct = Math.round((val / totalPoints) * 100);
            const isHighest = val === Math.max(scores.V, scores.A, scores.R, scores.K);

            return (
              <div key={m.tag} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                  <div className="flex items-center gap-2">
                    <span className={`p-1.5 rounded-lg border ${m.bg}`}>{m.icon}</span>
                    <span className={isHighest ? 'text-indigo-950 font-black' : 'text-slate-700'}>
                      {m.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-xs text-slate-400">({pct}%)</span>
                    <span className={`text-base ${isHighest ? 'text-indigo-600 font-black' : 'text-slate-700 font-bold'}`}>
                      {val} pts
                    </span>
                  </div>
                </div>

                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${m.color}`}
                    style={{ width: `${Math.max(pct, 5)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Traits Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 mb-8">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <span>{t('results.traitsTitle')}</span>
        </h2>

        <div className="space-y-3.5">
          {localize(profile.traits, locale).map((trait, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3.5 p-4 rounded-2xl bg-indigo-50/40 border border-indigo-100/70"
            >
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                ✓
              </div>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                {trait}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Actionable Study Tips */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 mb-8">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <span>{t('results.tipsTitle')}</span>
        </h2>

        <div className="space-y-4">
          {localize(profile.study_tips, locale).map((tip, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-amber-50/50 border border-amber-200/60"
            >
              <div className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 text-xs font-black">
                {idx + 1}
              </div>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Formats and Tools */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 mb-8">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
          <Activity className="w-5 h-5 text-indigo-600" />
          <span>{t('results.formatsTitle')}</span>
        </h2>

        <div className="flex flex-wrap gap-2.5">
          {localize(profile.recommended_formats, locale).map((fmt, idx) => (
            <span
              key={idx}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 text-slate-800 border border-slate-200/80 shadow-xs"
            >
              {fmt}
            </span>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200/80 flex items-start gap-3 mb-10 text-xs text-slate-600">
        <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p>
          {locale === 'pt'
            ? 'Lembre-se: O modelo VARK descreve suas preferências sensoriais dominantes. A maioria das pessoas aprende com maior solidez quando combina múltiplos canais no dia a dia.'
            : 'Remember: The VARK model highlights dominant preferences. True mastery often comes from combining multiple sensory modalities.'}
        </p>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={onRetake}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 font-bold text-sm text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t('results.tryAgain')}</span>
        </button>

        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onSelectOtherModel('kolb')}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
          >
            <span>{locale === 'pt' ? 'Fazer Teste de Kolb' : 'Take Kolb Quiz'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSelectOtherModel('gardner')}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100 transition-colors"
          >
            <span>{locale === 'pt' ? 'Fazer Teste de Gardner' : 'Take Gardner Quiz'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onCompare}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            <span>{t('results.compareModels')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
