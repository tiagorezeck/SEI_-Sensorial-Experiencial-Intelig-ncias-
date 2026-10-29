/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { KolbScores, getKolbResultProfile, calculateKolbQuadrants, localize } from '../lib/scoring';
import {
  Sparkles,
  Share2,
  Copy,
  Check,
  RotateCcw,
  ArrowRight,
  Compass,
  Lightbulb,
  ShieldAlert,
  Award,
  RefreshCw,
  Layers,
} from 'lucide-react';
import ReportTabs from './ReportTabs';
import { ModelType } from '../data/quizData';

interface KolbResultViewProps {
  resultKey: string;
  scores: KolbScores;
  onRetake: () => void;
  onSelectOtherModel: (model: 'vark' | 'gardner' | 'kolb') => void;
  onCompare: () => void;
}

export default function KolbResultView({
  resultKey,
  scores,
  onRetake,
  onSelectOtherModel,
  onCompare,
}: KolbResultViewProps) {
  const { locale, t } = useLocale();
  const profile = getKolbResultProfile(resultKey);
  const quadrants = calculateKolbQuadrants(scores);
  const [copied, setCopied] = useState(false);

  // Coordinate in Kolb 2D plane:
  // X = Active Experimentation (AE) - Reflective Observation (RO)
  // Y = Concrete Experience (CE) - Abstract Conceptualization (AC)
  const coordX = scores.AE - scores.RO;
  const coordY = scores.CE - scores.AC;

  // Max diff possible is 12 (0 to 12)
  const normX = Math.max(-10, Math.min(10, coordX));
  const normY = Math.max(-10, Math.min(10, coordY));

  // Map to percentage (50% is center)
  const pctX = 50 + (normX / 10) * 40;
  const pctY = 50 - (normY / 10) * 40; // inverted because top is +Y

  const handleShare = async () => {
    const title = localize(profile.title, locale);
    const text = t('results.sharePrompt', { title });
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'LearnerType Brasil - Kolb',
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
    const title = localize(profile.title, locale);
    const summary = localize(profile.summary, locale);
    const traits = localize(profile.traits, locale).join('\n• ');
    const tips = localize(profile.study_tips, locale).map((tip, i) => `${i + 1}. ${tip}`).join('\n');

    const fullText = `[LearnerType Brasil - Resultado Kolb]\n\n🧭 Estilo: ${title}\n📝 Resumo: ${summary}\n\n📊 Dimensões:\nExperiência Concreta (EC): ${scores.CE} | Observação Reflexiva (OR): ${scores.RO}\nConceituação Abstrata (CA): ${scores.AC} | Experimentação Ativa (EA): ${scores.AE}\n\n✨ Características:\n• ${traits}\n\n💡 Dicas de Estudo:\n${tips}\n\nDescubra seu perfil em: ${window.location.href}`;

    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const dimensionCards = [
    {
      code: 'CE',
      title: locale === 'pt' ? 'Experiência Concreta (EC)' : 'Concrete Experience (CE)',
      action: locale === 'pt' ? 'Sentir & Vivenciar' : 'Feeling & Experiencing',
      score: scores.CE,
      color: 'bg-rose-500',
      bg: 'bg-rose-50 text-rose-900 border-rose-200',
    },
    {
      code: 'RO',
      title: locale === 'pt' ? 'Observação Reflexiva (OR)' : 'Reflective Observation (RO)',
      action: locale === 'pt' ? 'Observar & Refletir' : 'Watching & Reflecting',
      score: scores.RO,
      color: 'bg-blue-500',
      bg: 'bg-blue-50 text-blue-900 border-blue-200',
    },
    {
      code: 'AC',
      title: locale === 'pt' ? 'Conceituação Abstrata (CA)' : 'Abstract Conceptualization (AC)',
      action: locale === 'pt' ? 'Pensar & Modelar' : 'Thinking & Conceptualizing',
      score: scores.AC,
      color: 'bg-purple-500',
      bg: 'bg-purple-50 text-purple-900 border-purple-200',
    },
    {
      code: 'AE',
      title: locale === 'pt' ? 'Experimentação Ativa (EA)' : 'Active Experimentation (AE)',
      action: locale === 'pt' ? 'Agir & Testar' : 'Doing & Testing',
      score: scores.AE,
      color: 'bg-emerald-500',
      bg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 animate-in fade-in duration-300">
      {/* 3-Model Report Switcher Tabs */}
      <ReportTabs
        currentModel="kolb"
        onSwitchModel={(m) => onSelectOtherModel(m)}
        onViewComparison={onCompare}
      />

      {/* Hero Result Banner */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl mb-8 relative overflow-hidden">
        <div className="relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 mb-4">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('results.badge')} • Kolb</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            {localize(profile.title, locale)}
          </h1>

          <p className="text-base sm:text-lg text-emerald-100 max-w-3xl leading-relaxed">
            {localize(profile.summary, locale)}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-emerald-950 hover:bg-emerald-50 shadow-md transition-all active:scale-95"
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

      {/* 2D Quadrant Map */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-600" />
            <span>{locale === 'pt' ? 'Mapa do Quadrante de Aprendizagem de Kolb' : 'Kolb Learning Quadrant Map'}</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            {locale === 'pt' ? 'O ponto azul indica sua posição no ciclo' : 'Blue dot shows your plotted position'}
          </span>
        </div>

        {/* The 2x2 Quadrant Grid */}
        <div className="relative w-full max-w-lg mx-auto aspect-square bg-slate-50 border-2 border-slate-200 rounded-3xl p-4 overflow-hidden shadow-inner">
          {/* Axis Labels */}
          {/* Top: CE */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center z-10">
            <span className="text-[11px] font-black uppercase tracking-wider text-rose-700 bg-rose-50/90 px-2 py-0.5 rounded-md border border-rose-200">
              {locale === 'pt' ? 'Sentir (Experiência Concreta)' : 'Feeling (Concrete Exp.)'}
            </span>
          </div>
          {/* Bottom: AC */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center z-10">
            <span className="text-[11px] font-black uppercase tracking-wider text-purple-700 bg-purple-50/90 px-2 py-0.5 rounded-md border border-purple-200">
              {locale === 'pt' ? 'Pensar (Conceituação Abstrata)' : 'Thinking (Abstract Concept.)'}
            </span>
          </div>
          {/* Left: RO */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-center z-10 max-w-[70px]">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50/90 px-1.5 py-1 rounded-md border border-blue-200 block">
              {locale === 'pt' ? 'Observar' : 'Watching'}
            </span>
          </div>
          {/* Right: AE */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-center z-10 max-w-[70px]">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50/90 px-1.5 py-1 rounded-md border border-emerald-200 block">
              {locale === 'pt' ? 'Agir' : 'Doing'}
            </span>
          </div>

          {/* Grid lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-0.5 bg-slate-300 border-dashed" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-full w-0.5 bg-slate-300 border-dashed" />
          </div>

          {/* Quadrants background cards */}
          <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-1 text-center p-6">
            {/* Top-Left: Divergente (Sentir + Observar) */}
            <div
              className={`rounded-2xl p-2 flex flex-col justify-center items-center transition-all ${
                resultKey === 'DIVERGER'
                  ? 'bg-blue-100/90 border-2 border-blue-500 shadow-md ring-2 ring-blue-400/30'
                  : 'bg-white/70 border border-slate-200/60'
              }`}
            >
              <span className="text-xs font-black text-slate-800">
                {locale === 'pt' ? 'Divergente' : 'Diverger'}
              </span>
              <span className="text-[10px] text-slate-500">
                {locale === 'pt' ? 'EC + OR (Sentir + Observar)' : 'CE + RO'}
              </span>
              <span className="text-xs font-bold text-blue-700 mt-1">{quadrants.DIVERGER} pts</span>
            </div>

            {/* Top-Right: Acomodador (Sentir + Agir) */}
            <div
              className={`rounded-2xl p-2 flex flex-col justify-center items-center transition-all ${
                resultKey === 'ACCOMMODATOR'
                  ? 'bg-amber-100/90 border-2 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                  : 'bg-white/70 border border-slate-200/60'
              }`}
            >
              <span className="text-xs font-black text-slate-800">
                {locale === 'pt' ? 'Acomodador' : 'Accommodator'}
              </span>
              <span className="text-[10px] text-slate-500">
                {locale === 'pt' ? 'EC + EA (Sentir + Agir)' : 'CE + AE'}
              </span>
              <span className="text-xs font-bold text-amber-700 mt-1">{quadrants.ACCOMMODATOR} pts</span>
            </div>

            {/* Bottom-Left: Assimilador (Pensar + Observar) */}
            <div
              className={`rounded-2xl p-2 flex flex-col justify-center items-center transition-all ${
                resultKey === 'ASSIMILATOR'
                  ? 'bg-purple-100/90 border-2 border-purple-500 shadow-md ring-2 ring-purple-400/30'
                  : 'bg-white/70 border border-slate-200/60'
              }`}
            >
              <span className="text-xs font-black text-slate-800">
                {locale === 'pt' ? 'Assimilador' : 'Assimilator'}
              </span>
              <span className="text-[10px] text-slate-500">
                {locale === 'pt' ? 'CA + OR (Pensar + Observar)' : 'AC + RO'}
              </span>
              <span className="text-xs font-bold text-purple-700 mt-1">{quadrants.ASSIMILATOR} pts</span>
            </div>

            {/* Bottom-Right: Convergente (Pensar + Agir) */}
            <div
              className={`rounded-2xl p-2 flex flex-col justify-center items-center transition-all ${
                resultKey === 'CONVERGER'
                  ? 'bg-emerald-100/90 border-2 border-emerald-500 shadow-md ring-2 ring-emerald-400/30'
                  : 'bg-white/70 border border-slate-200/60'
              }`}
            >
              <span className="text-xs font-black text-slate-800">
                {locale === 'pt' ? 'Convergente' : 'Converger'}
              </span>
              <span className="text-[10px] text-slate-500">
                {locale === 'pt' ? 'CA + EA (Pensar + Agir)' : 'AC + AE'}
              </span>
              <span className="text-xs font-bold text-emerald-700 mt-1">{quadrants.CONVERGER} pts</span>
            </div>
          </div>

          {/* User plotted coordinate dot */}
          <div
            className="absolute w-5 h-5 rounded-full bg-indigo-600 border-2 border-white shadow-lg -translate-x-1/2 -translate-y-1/2 transition-all duration-700 flex items-center justify-center animate-pulse"
            style={{ left: `${pctX}%`, top: `${pctY}%` }}
            title={`Coordenadas: X=${coordX}, Y=${coordY}`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        </div>
      </div>

      {/* 4 Dimensions breakdown */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 mb-8">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
          <Layers className="w-5 h-5 text-emerald-600" />
          <span>{locale === 'pt' ? 'Pontuações das 4 Dimensões de Kolb' : '4 Dimensions Scores'}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dimensionCards.map((dim) => (
            <div
              key={dim.code}
              className={`p-5 rounded-2xl border ${dim.bg} flex items-center justify-between`}
            >
              <div>
                <span className="text-xs font-black tracking-wider uppercase opacity-75">
                  {dim.code} • {dim.action}
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-0.5">{dim.title}</h4>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-slate-900">{dim.score}</span>
                <span className="text-xs text-slate-500 block">/ 12 pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kolb 4-Stage Learning Cycle Loop */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 mb-8">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
          <RefreshCw className="w-5 h-5 text-teal-600" />
          <span>{t('results.learningCycleTitle')}</span>
        </h2>
        <p className="text-xs text-slate-600 mb-6">
          {locale === 'pt'
            ? 'David Kolb demonstrou que a aprendizagem mais duradoura ocorre quando passamos pelas 4 fases sucessivas do ciclo:'
            : 'David Kolb demonstrated that learning is most potent when flowing through all four stages of the experiential loop:'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200/80">
            <span className="text-xs font-black text-rose-800 uppercase block mb-1">
              1. {locale === 'pt' ? 'Vivenciar' : 'Experience'}
            </span>
            <span className="text-xs text-slate-600">
              {locale === 'pt' ? 'Mergulhar na experiência concreta e sentir o contexto' : 'Engage fully in concrete experience'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/80">
            <span className="text-xs font-black text-blue-800 uppercase block mb-1">
              2. {locale === 'pt' ? 'Observar' : 'Reflect'}
            </span>
            <span className="text-xs text-slate-600">
              {locale === 'pt' ? 'Refletir sob múltiplos ângulos sobre o que aconteceu' : 'Pause and observe from multiple viewpoints'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200/80">
            <span className="text-xs font-black text-purple-800 uppercase block mb-1">
              3. {locale === 'pt' ? 'Conceituar' : 'Conceptualize'}
            </span>
            <span className="text-xs text-slate-600">
              {locale === 'pt' ? 'Criar teorias, modelos e princípios gerais' : 'Synthesize theories and logical models'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80">
            <span className="text-xs font-black text-emerald-800 uppercase block mb-1">
              4. {locale === 'pt' ? 'Testar' : 'Experiment'}
            </span>
            <span className="text-xs text-slate-600">
              {locale === 'pt' ? 'Aplicar as teorias em novos desafios práticos' : 'Apply ideas to solve problems in practice'}
            </span>
          </div>
        </div>
      </div>

      {/* Traits Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 mb-8">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <span>{t('results.traitsTitle')}</span>
        </h2>

        <div className="space-y-3.5">
          {localize(profile.traits, locale).map((trait, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3.5 p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100/70"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                ✓
              </div>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                {trait}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Study Tips */}
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

      {/* Recommended Formats */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 mb-8">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
          <Compass className="w-5 h-5 text-teal-600" />
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
            ? 'Nota pedagógica: Seu estilo de Kolb indica onde você se sente mais confiante. Ao treinar conscientemente os outros quadrantes do ciclo, você desenvolve adaptabilidade excepcional.'
            : 'Pedagogical note: Your Kolb quadrant represents your primary comfort zone. Actively practicing the other quadrants builds full-spectrum cognitive flexibility.'}
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
