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
  Brain,
  Zap,
  Target,
  Compass,
  CheckCircle2,
  BookMarked,
  Printer
} from 'lucide-react';
import ReportTabs from './ReportTabs';
import {
  VARK_MODALITIES_INFO,
  VARK_COMBINATIONS_INFO,
  DEEP_PROFILE_GUIDES,
  FIVE_TRAITS_MAP,
  ModalityDetail,
  CombinationDetail,
  DeepLearningGuide
} from '../data/varkExplanationData';

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

  // Determine detected combination for the user
  const sortedModalities = (Object.entries(scores) as [VarkModality, number][]).sort((a, b) => b[1] - a[1]);
  const top1 = sortedModalities[0][0];
  const top2 = sortedModalities[1][0];
  
  const detectedComboKey = resultKey in VARK_COMBINATIONS_INFO 
    ? resultKey 
    : [top1, top2].sort().join('+') in VARK_COMBINATIONS_INFO 
      ? [top1, top2].sort().join('+') 
      : 'V+A';

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

  const deepGuide: DeepLearningGuide = DEEP_PROFILE_GUIDES[resultKey] || DEEP_PROFILE_GUIDES['V'];
  const userComboInfo: CombinationDetail = VARK_COMBINATIONS_INFO[detectedComboKey] || VARK_COMBINATIONS_INFO['V+A'];

  // Retrieve 5 characteristics for the user profile
  const traitsList: string[] = FIVE_TRAITS_MAP[resultKey] || FIVE_TRAITS_MAP[detectedComboKey] || [
    ...localize(profile.traits, locale),
    'Aprende de forma mais sólida quando o ambiente favorece a concentração e a ausência de distrações.',
    'Consolida os aprendizados aplicando o conhecimento em desafios do dia a dia.'
  ];

  const handleShare = async () => {
    const title = localize(profile.title, locale);
    const text = t('results.sharePrompt', { title });
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Metodologia SEI Brasil - Pilar S (VARK)',
          text,
          url,
        });
        return;
      } catch {
        // fallback
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
    const traitsStr = traitsList.map((t) => `• ${t}`).join('\n');
    const tipsStr = localize(profile.study_tips, locale).map((tip, i) => `${i + 1}. ${tip}`).join('\n');

    const fullText = `[Metodologia SEI - Pilar S: Sensorial]\n\n🎯 Perfil: ${title}\n📝 Resumo: ${summary}\n\n📊 Índices de Aprendizagem:\nVisual: ${scores.V} | Auditivo: ${scores.A} | Leitura/Escrita: ${scores.R} | Cinestésico: ${scores.K}\n\n💡 Mecanismo Cognitivo:\n${deepGuide.cognitiveProfile}\n\n✨ 5 Características Principais:\n${traitsStr}\n\n💡 Dicas Práticas:\n${tipsStr}\n\nDescubra seu perfil no SEI em: ${window.location.href}`;

    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 animate-in fade-in duration-300">
      {/* 3-Model Report Switcher Tabs */}
      <ReportTabs
        currentModel="vark"
        onSwitchModel={(m) => onSelectOtherModel(m)}
        onViewComparison={onCompare}
      />

      {/* Hero Result Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl mb-8 relative overflow-hidden">
        <div className="relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/20 text-indigo-200 mb-4">
            <Award className="w-4 h-4 text-amber-400" />
            <span>{t('results.badge')} • {locale === 'pt' ? 'Pilar S (Sensorial / VARK)' : 'Pillar S (Sensory / VARK)'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            {localize(profile.title, locale)}
          </h1>

          <p className="text-base sm:text-lg text-indigo-100 max-w-3xl leading-relaxed mb-6 font-medium">
            {localize(profile.summary, locale)}
          </p>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 mb-6 text-sm text-indigo-100">
            <p className="font-medium leading-relaxed">
              <span className="font-bold text-amber-300">🧠 Insight Cognitivo: </span>
              {deepGuide.cognitiveProfile}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white text-indigo-950 hover:bg-indigo-50 shadow-md transition-all active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? t('results.shareTextCopied') : t('results.shareTitle')}</span>
            </button>

            <button
              onClick={handleCopySummary}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{t('results.downloadSummary')}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-colors print:hidden"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir Relatório</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. CARD: ÍNDICE DE APRENDIZAGEM (RENOMEADO DE DISTRIBUIÇÃO DAS SUAS PONTUAÇÕES) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-indigo-600" />
            <span>Índice de Aprendizagem</span>
          </h2>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
            Total da escala: {totalPoints} pontos
          </span>
        </div>

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
                    {isHighest && (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                        Canal Principal
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-xs text-slate-400">({pct}%)</span>
                    <span className={`text-base ${isHighest ? 'text-indigo-600 font-black' : 'text-slate-700 font-bold'}`}>
                      {val} pts
                    </span>
                  </div>
                </div>

                <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${m.color}`}
                    style={{ width: `${Math.max(pct, 5)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. CARD: COMBINAÇÃO MULTIMODAL (APENAS O RESULTADO DO TESTE) - COLOCADO LOGO ABAIXO DO ÍNDICE DE APRENDIZAGEM */}
      <div className="bg-gradient-to-br from-indigo-50/80 via-blue-50/50 to-white rounded-3xl border border-indigo-150 shadow-xl p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-indigo-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-black px-3 py-1 rounded-lg bg-indigo-600 text-white">
                {userComboInfo.code}
              </span>
              <h2 className="text-xl font-black text-slate-900">
                Combinação Multimodal: {userComboInfo.title}
              </h2>
            </div>
            <p className="text-xs font-bold text-indigo-600 mt-1">
              Alcunha do Perfil: {userComboInfo.nickname}
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-black uppercase tracking-wider shrink-0 shadow-xs">
            ★ Resultado do seu Teste
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mb-5 bg-white/80 p-4 rounded-2xl border border-indigo-100">
          {userComboInfo.summary}
        </p>

        <div className="space-y-4">
          {/* How they learn */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1 flex items-center gap-1.5">
              <Brain className="w-4 h-4" /> Como Aprende esta Dupla Sensorial
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {userComboInfo.howTheyLearn}
            </p>
          </div>

          {/* Practical Example */}
          <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1 flex items-center gap-1.5">
              📌 Exemplo Prático do Dia a Dia (Estudo / Trabalho)
            </h3>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              {userComboInfo.practicalExample}
            </p>
          </div>

          {/* Strategy & Synergy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1.5">
                ⚡ Estratégia de Aprendizado Recomendada
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {userComboInfo.studyStrategy}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1 flex items-center gap-1.5">
                💡 Dica de Ouro de Sinergia Sensorial
              </h3>
              <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
                {userComboInfo.synergyTip}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CARD: ANÁLISE APROFUNDADA: COMO VOCÊ APRENDE NA PRÁTICA (CONSOLIDADO EM MODO CLARO) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 mb-8 space-y-8">
        {/* Header section */}
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
          <div className="p-3.5 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-2xs">
            <Brain className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Análise Aprofundada: Como Você Aprende na Prática
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Diagnóstico neuro-pedagógico completo customizado para o perfil <strong className="text-indigo-600 font-bold">{localize(profile.title, locale)}</strong>
            </p>
          </div>
        </div>

        {/* Section A: Cognitive Routine & Memory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="text-sm font-bold text-amber-800 flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Rotina & Preparação Ideal de Estudo</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {deepGuide.optimalRoutine}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="text-sm font-bold text-emerald-800 flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-emerald-600" />
              <span>Estratégia de Memória de Longo Prazo</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {deepGuide.memoryStrategy}
            </p>
          </div>
        </div>

        {/* Blindspot Warning */}
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-amber-900 block mb-1">Atenção ao Ponto Cego de Aprendizagem:</span>
            <p className="leading-relaxed font-medium">{deepGuide.blindspotWarning}</p>
          </div>
        </div>

        {/* Action Plan */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            <span>Plano de Ação Imediato em 3 Passos:</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {deepGuide.actionPlan.map((step, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-3">
                <span className="w-6 h-6 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="text-xs text-slate-800 leading-relaxed font-semibold">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Section B: 5 Características Principais e Padrões de Comportamento */}
        <div>
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span>5 Características Principais e Padrões de Comportamento</span>
          </h3>

          <div className="space-y-3">
            {traitsList.map((trait, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/90"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {trait}
                </p>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Section C: Dicas Práticas para Potencializar Seus Estudos */}
        <div>
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span>Dicas Práticas para Potencializar Seus Estudos</span>
          </h3>

          <div className="space-y-3.5">
            {localize(profile.study_tips, locale).map((tip, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70"
              >
                <div className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 text-xs font-black">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Section D: Formatos, Ferramentas e Recursos Recomendados */}
        <div>
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-indigo-600" />
            <span>Formatos, Ferramentas e Recursos Recomendados</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {localize(profile.recommended_formats, locale).map((fmt, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold flex items-center gap-2.5 shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                <span>{fmt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. CARD: FUNCIONALIDADE VARK (RENOMEADO DE "O QUE É E COMO FUNCIONA CADA CANAL VARK") - TODOS OS 4 CARDS EXIBIDOS UM ABAIXO DO OUTRO */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 mb-8 space-y-8">
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <BookMarked className="w-6 h-6 text-indigo-600" />
            <span>Funcionalidade VARK</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Entenda a fundo a estrutura e o funcionamento dos 4 canais sensoriais de captação de estímulos
          </p>
        </div>

        {/* Display ALL 4 Modalities Sequentially (One Below Another) */}
        <div className="space-y-8">
          {(['V', 'A', 'R', 'K'] as const).map((modalityTag) => {
            const info: ModalityDetail = VARK_MODALITIES_INFO[modalityTag];
            const val = scores[modalityTag];
            const pct = Math.round((val / totalPoints) * 100);
            const isDominant = val === Math.max(scores.V, scores.A, scores.R, scores.K);

            return (
              <div
                key={modalityTag}
                className="p-6 rounded-3xl bg-slate-50/80 border border-slate-200 shadow-xs space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <span className={`p-3 rounded-2xl border text-xl ${
                      modalityTag === 'V' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                      modalityTag === 'A' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' :
                      modalityTag === 'R' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                      'bg-rose-100 text-rose-700 border-rose-200'
                    }`}>
                      {modalityTag === 'V' && <Eye className="w-6 h-6" />}
                      {modalityTag === 'A' && <Headphones className="w-6 h-6" />}
                      {modalityTag === 'R' && <BookOpen className="w-6 h-6" />}
                      {modalityTag === 'K' && <Activity className="w-6 h-6" />}
                    </span>
                    <div>
                      <h3 className="text-xl font-black text-slate-900">
                        {info.name}
                      </h3>
                      <p className="text-xs font-bold text-indigo-600">
                        {info.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isDominant && (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                        ★ Canal Dominante
                      </span>
                    )}
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white border border-slate-300 text-slate-800 shadow-xs">
                      {val} pts ({pct}%)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* O que é */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      📌 O que é este canal
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {info.definition}
                    </p>
                  </div>

                  {/* Como Funciona no Cérebro */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      🧠 Como funciona no cérebro
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {info.howItWorks}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Pontos Fortes */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Pontos Fortes do Perfil
                    </h4>
                    <ul className="space-y-1.5">
                      {info.strengths.map((str, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span className="font-medium">{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Melhores Ferramentas */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5" /> Melhores Ferramentas & Recursos
                    </h4>
                    <ul className="space-y-1.5">
                      {info.bestTools.map((tool, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                          <span className="text-indigo-500 font-bold">✓</span>
                          <span className="font-medium">{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Ambiente Ideal */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700">
                  <span className="font-bold text-slate-900 block mb-0.5">🏡 Ambiente Ideal de Estudo:</span>
                  <p className="text-slate-600 font-medium">{info.idealEnvironment}</p>
                </div>
              </div>
            );
          })}
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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 print:hidden">
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
            <span>{locale === 'pt' ? 'Fazer Pilar E (Kolb)' : 'Take Kolb Quiz'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSelectOtherModel('gardner')}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100 transition-colors"
          >
            <span>{locale === 'pt' ? 'Fazer Pilar I (Gardner)' : 'Take Gardner Quiz'}</span>
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
