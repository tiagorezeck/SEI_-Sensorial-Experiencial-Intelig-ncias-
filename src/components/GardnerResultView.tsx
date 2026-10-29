/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import {
  GardnerScores,
  getGardnerResultProfile,
  localize,
} from '../lib/scoring';
import { GardnerIntelligence } from '../data/quizData';
import {
  Sparkles,
  Share2,
  Copy,
  Check,
  RotateCcw,
  ArrowRight,
  Lightbulb,
  ShieldAlert,
  Star,
  Zap,
  Activity,
  Award,
  Layers,
} from 'lucide-react';
import ReportTabs from './ReportTabs';
import { ModelType } from '../data/quizData';

interface GardnerResultViewProps {
  resultTypes: GardnerIntelligence[];
  scores: GardnerScores;
  onRetake: () => void;
  onSelectOtherModel: (model: 'vark' | 'kolb' | 'gardner') => void;
  onCompare: () => void;
}

export default function GardnerResultView({
  resultTypes,
  scores,
  onRetake,
  onSelectOtherModel,
  onCompare,
}: GardnerResultViewProps) {
  const { locale, t } = useLocale();
  const primaryType = resultTypes[0] || 'LOG';
  const primaryProfile = getGardnerResultProfile(primaryType);

  const secondaryType = resultTypes[1];
  const secondaryProfile = secondaryType ? getGardnerResultProfile(secondaryType) : null;

  const tertiaryType = resultTypes[2];
  const tertiaryProfile = tertiaryType ? getGardnerResultProfile(tertiaryType) : null;

  const [copied, setCopied] = useState(false);

  const intelligenceInfo: Record<
    GardnerIntelligence,
    { name: string; icon: string; color: string; barColor: string }
  > = {
    LOG: {
      name: locale === 'pt' ? 'Lógico-Matemática' : 'Logical-Mathematical',
      icon: '🔢',
      color: 'text-blue-700 bg-blue-50 border-blue-200',
      barColor: 'bg-blue-600',
    },
    LIN: {
      name: locale === 'pt' ? 'Linguística' : 'Linguistic',
      icon: '✍️',
      color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
      barColor: 'bg-indigo-600',
    },
    SPA: {
      name: locale === 'pt' ? 'Espacial-Visual' : 'Spatial-Visual',
      icon: '🎨',
      color: 'text-cyan-700 bg-cyan-50 border-cyan-200',
      barColor: 'bg-cyan-600',
    },
    MUS: {
      name: locale === 'pt' ? 'Musical' : 'Musical',
      icon: '🎵',
      color: 'text-pink-700 bg-pink-50 border-pink-200',
      barColor: 'bg-pink-600',
    },
    KIN: {
      name: locale === 'pt' ? 'Corporal-Cinestésica' : 'Bodily-Kinesthetic',
      icon: '🏃',
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      barColor: 'bg-amber-600',
    },
    INTER: {
      name: locale === 'pt' ? 'Interpessoal' : 'Interpersonal',
      icon: '🤝',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      barColor: 'bg-emerald-600',
    },
    INTRA: {
      name: locale === 'pt' ? 'Intrapessoal' : 'Intrapersonal',
      icon: '🧘',
      color: 'text-purple-700 bg-purple-50 border-purple-200',
      barColor: 'bg-purple-600',
    },
  };

  // Sort all 7 intelligences by score descending
  const sortedIntelligences = (Object.keys(scores) as GardnerIntelligence[]).sort(
    (a, b) => (scores[b] || 0) - (scores[a] || 0)
  );

  const handleShare = async () => {
    const title = localize(primaryProfile.title, locale);
    const text = t('results.sharePrompt', { title });
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'LearnerType Brasil - Gardner',
          text,
          url,
        });
        return;
      } catch {
        // user cancelled or fallback
      }
    }

    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const handleCopySummary = async () => {
    const title = localize(primaryProfile.title, locale);
    const summary = localize(primaryProfile.summary, locale);
    const traits = localize(primaryProfile.traits, locale).join('\n• ');
    const tips = localize(primaryProfile.study_tips, locale).map((tip, i) => `${i + 1}. ${tip}`).join('\n');

    const rankingText = sortedIntelligences
      .map((k) => `${intelligenceInfo[k].name}: ${scores[k]}/5.0`)
      .join('\n');

    const fullText = `[LearnerType Brasil - Resultado Gardner (Inteligências Múltiplas)]\n\n🌟 Força Principal: ${title}\n📝 Resumo: ${summary}\n\n📊 Ranking das 7 Inteligências:\n${rankingText}\n\n✨ Características:\n• ${traits}\n\n💡 Dicas de Estudo:\n${tips}\n\nDescubra seu perfil em: ${window.location.href}`;

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
        currentModel="gardner"
        onSwitchModel={(m) => onSelectOtherModel(m)}
        onViewComparison={onCompare}
      />

      {/* Hero Result Banner */}
      <div className="bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl mb-8 relative overflow-hidden">
        <div className="relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/20 text-purple-200 mb-4">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('results.badge')} • Gardner</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3 text-white">
            {localize(primaryProfile.title, locale)}
          </h1>

          {/* Strengths badges */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
              {locale === 'pt' ? 'Principais Forças:' : 'Top Strengths:'}
            </span>
            {resultTypes.map((type, idx) => (
              <span
                key={type}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white/20 border border-white/30 text-white"
              >
                <span>{intelligenceInfo[type].icon}</span>
                <span>{intelligenceInfo[type].name}</span>
                <span className="opacity-80">({scores[type]})</span>
              </span>
            ))}
          </div>

          <p className="text-base sm:text-lg text-purple-100 max-w-3xl leading-relaxed">
            {localize(primaryProfile.summary, locale)}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-purple-950 hover:bg-purple-50 shadow-md transition-all active:scale-95"
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

      {/* Ranked Horizontal Bar Chart for all 7 Intelligences */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 mb-8">
        <div className="flex items-center justify-between gap-2 mb-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-600" />
            <span>{locale === 'pt' ? 'Mapeamento das 7 Inteligências (Escala 1 a 5)' : '7 Intelligences Profile (Scale 1 to 5)'}</span>
          </h2>
          <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
            {locale === 'pt' ? 'Ordenado por intensidade' : 'Sorted by intensity'}
          </span>
        </div>

        <div className="space-y-4">
          {sortedIntelligences.map((intKey, rank) => {
            const scoreVal = scores[intKey] || 0;
            const pct = Math.round((scoreVal / 5) * 100);
            const isTop = resultTypes.includes(intKey);
            const info = intelligenceInfo[intKey];

            return (
              <div key={intKey} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{info.icon}</span>
                    <span className={isTop ? 'text-purple-950 font-black' : 'text-slate-700'}>
                      {info.name}
                    </span>
                    {isTop && (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                        {rank === 0 ? (locale === 'pt' ? '1º Lugar' : '1st') : rank === 1 ? (locale === 'pt' ? '2º Lugar' : '2nd') : (locale === 'pt' ? '3º Lugar' : '3rd')}
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-sm sm:text-base font-black text-slate-800">
                    {scoreVal.toFixed(1)} <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
                  </div>
                </div>

                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${info.barColor}`}
                    style={{ width: `${Math.max(pct, 8)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Primary Intelligence In-Depth Details */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 mb-8">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          <span>{locale === 'pt' ? 'Sua Inteligência Mais Marcante em Detalhes' : 'Your Primary Intelligence in Detail'}</span>
        </h2>

        {/* Traits */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
            {t('results.traitsTitle')}
          </h3>
          {localize(primaryProfile.traits, locale).map((trait, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3.5 p-4 rounded-2xl bg-purple-50/40 border border-purple-100/70"
            >
              <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                ✓
              </div>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                {trait}
              </p>
            </div>
          ))}
        </div>

        {/* Study tips */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
            {t('results.tipsTitle')}
          </h3>
          {localize(primaryProfile.study_tips, locale).map((tip, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60"
            >
              <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 text-xs font-black">
                {idx + 1}
              </div>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                {tip}
              </p>
            </div>
          ))}
        </div>

        {/* Recommended Formats */}
        <div>
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
            {t('results.formatsTitle')}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {localize(primaryProfile.recommended_formats, locale).map((fmt, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 text-slate-800 border border-slate-200/80 shadow-xs"
              >
                {fmt}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary & Tertiary Strengths Cards */}
      {secondaryProfile && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Secondary Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                {locale === 'pt' ? 'Segunda Maior Força' : 'Second Strength'}
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">
              {localize(secondaryProfile.title, locale)}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              {localize(secondaryProfile.summary, locale)}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {localize(secondaryProfile.recommended_formats, locale).slice(0, 3).map((f, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg text-xs bg-indigo-50 text-indigo-800 font-medium"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Tertiary Card (if present) */}
          {tertiaryProfile && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                  {locale === 'pt' ? 'Terceira Maior Força' : 'Third Strength'}
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                {localize(tertiaryProfile.title, locale)}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {localize(tertiaryProfile.summary, locale)}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {localize(tertiaryProfile.recommended_formats, locale).slice(0, 3).map((f, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs bg-purple-50 text-purple-800 font-medium"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200/80 flex items-start gap-3 mb-10 text-xs text-slate-600">
        <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p>
          {locale === 'pt'
            ? 'Importante: A teoria de Gardner defende que a inteligência humana é maleável. Você não está limitado aos seus pontos fortes atuais; todas as 7 faculdades podem ser estimuladas e expandidas através de prática intencional.'
            : 'Important: Gardner emphasized that intelligences are developmental and dynamic. Practice expands your capabilities across all seven areas.'}
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
            onClick={() => onSelectOtherModel('vark')}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100 transition-colors"
          >
            <span>{locale === 'pt' ? 'Fazer Teste VARK' : 'Take VARK Quiz'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSelectOtherModel('kolb')}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
          >
            <span>{locale === 'pt' ? 'Fazer Teste de Kolb' : 'Take Kolb Quiz'}</span>
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
