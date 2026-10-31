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
  Briefcase,
  Brain,
  Zap,
  BookMarked,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import ReportTabs from './ReportTabs';

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
          title: 'Metodologia SEI - Ciclo Experiencial (Kolb)',
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

    const fullText = `[Metodologia SEI - Resultado Ciclo Experiencial (Kolb)]\n\n🧭 Estilo: ${title}\n📝 Resumo: ${summary}\n\n📊 Índice de Aprendizagem:\nExperiência Concreta (EC): ${scores.CE}/12 | Observação Reflexiva (OR): ${scores.RO}/12\nConceituação Abstrata (CA): ${scores.AC}/12 | Experimentação Ativa (EA): ${scores.AE}/12\n\n✨ Características Principais:\n• ${traits}\n\n💡 Dicas de Estudo:\n${tips}\n\nDescubra seu perfil em: ${window.location.href}`;

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
      bg: 'bg-rose-50/70 text-rose-900 border-rose-200',
    },
    {
      code: 'RO',
      title: locale === 'pt' ? 'Observação Reflexiva (OR)' : 'Reflective Observation (RO)',
      action: locale === 'pt' ? 'Observar & Refletir' : 'Watching & Reflecting',
      score: scores.RO,
      color: 'bg-blue-500',
      bg: 'bg-blue-50/70 text-blue-900 border-blue-200',
    },
    {
      code: 'AC',
      title: locale === 'pt' ? 'Conceituação Abstrata (CA)' : 'Abstract Conceptualization (AC)',
      action: locale === 'pt' ? 'Pensar & Modelar' : 'Thinking & Conceptualizing',
      score: scores.AC,
      color: 'bg-purple-500',
      bg: 'bg-purple-50/70 text-purple-900 border-purple-200',
    },
    {
      code: 'AE',
      title: locale === 'pt' ? 'Experimentação Ativa (EA)' : 'Active Experimentation (AE)',
      action: locale === 'pt' ? 'Agir & Testar' : 'Doing & Testing',
      score: scores.AE,
      color: 'bg-emerald-500',
      bg: 'bg-emerald-50/70 text-emerald-900 border-emerald-200',
    },
  ];

  // Methodology ELT Extensions
  const problemSolvingMap: Record<string, { pt: string; en: string }> = {
    DIVERGER: {
      pt: 'Aborda problemas explorando múltiplas causas hipotéticas e gerando uma ampla lista de alternativas criativas e empáticas antes de afunilar a escolha.',
      en: 'Approaches problems by exploring multiple hypothetical causes and generating broad creative alternatives before narrowing options.',
    },
    ASSIMILATOR: {
      pt: 'Aborda problemas construindo hipóteses conceituais rigorosas, identificando inconsistências lógicas e estruturando modelos teóricos explicativos.',
      en: 'Approaches problems by forming conceptual hypotheses, spotting logical inconsistencies, and organizing explanatory theoretical models.',
    },
    CONVERGER: {
      pt: 'Aborda problemas por raciocínio dedutivo focado, isolando a causa técnica principal para aplicar a melhor solução direta, prática e eficaz.',
      en: 'Approaches problems through focused deductive reasoning, isolating the primary technical cause to apply the single best direct fix.',
    },
    ACCOMMODATOR: {
      pt: 'Aborda problemas por experimentação direta no local de ação, adaptando a estratégia em tempo real por tentativa e erro e intuição prática.',
      en: 'Approaches problems through direct hands-on experimentation, adjusting strategies in real-time through rapid trial and error.',
    },
    MIXED_TEMPLATE: {
      pt: 'Aborda problemas combinando análise lógica prévia com prototipagem prática ágil, oscilando de forma adaptativa entre reflexão e teste.',
      en: 'Approaches problems by blending preliminary logical analysis with agile hands-on prototyping, balancing reflection and testing.',
    },
  };

  const careerFitMap: Record<string, { pt: string; en: string }> = {
    DIVERGER: {
      pt: 'Recursos Humanos, Psicologia, Gestão de Pessoas, Design de Experiência do Usuário (UX), Comunicação Social, Artes e Consultoria Organizacional.',
      en: 'Human Resources, Psychology, Talent Management, UX Design, Communications, Arts, and Organizational Consulting.',
    },
    ASSIMILATOR: {
      pt: 'Pesquisa & Desenvolvimento (P&D), Análise de Dados, Ciência de Dados, Arquitetura de Software, Planejamento Estratégico, Física Teórica e Direito.',
      en: 'R&D, Data Analytics, Data Science, Software Architecture, Strategic Planning, Theoretical Physics, and Legal Analysis.',
    },
    CONVERGER: {
      pt: 'Engenharia Técnica, TI & Infraestrutura de Sistemas, Medicina & Cirurgia, Finanças Quantitativas, Análise de Processos e Produção Industrial.',
      en: 'Technical Engineering, IT Infrastructure, Medicine/Surgery, Quantitative Finance, Systems Engineering, and Manufacturing.',
    },
    ACCOMMODATOR: {
      pt: 'Vendas & Negociação Comercial, Marketing de Campo, Operações de Projetos, Empreendedorismo, Gestão de Crises e Logística de Emergência.',
      en: 'Sales & Commercials, Field Marketing, Project Operations, Entrepreneurship, Emergency Response, and Logistics.',
    },
    MIXED_TEMPLATE: {
      pt: 'Gestão de Projetos Multidisciplinares, Liderança de Produtos (Product Management), Consultoria de Inovação e Educação Ativa.',
      en: 'Multidisciplinary Project Management, Product Management, Innovation Consulting, and Active Educational Design.',
    },
  };

  const blindSpotsMap: Record<string, { pt: string; en: string }> = {
    DIVERGER: {
      pt: 'Risco de Paralisia por Análise: Ficar preso na fase de ideação e debate, hesitating em tomar uma decisão prática definitiva no prazo estabelecido.',
      en: 'Risk of Analysis Paralysis: Getting stuck in ideation and discussion, hesitating to make timely practical decisions.',
    },
    ASSIMILATOR: {
      pt: 'Risco de Abstração Desconectada: Criar modelos teoricamente perfeitos no papel que enfrentam atrito ou falham ao serem aplicados na realidade prática.',
      en: 'Risk of Disconnected Abstraction: Creating theoretically perfect models on paper that encounter friction in real-world practice.',
    },
    CONVERGER: {
      pt: 'Risco de Solução Precipitada: Decidir rápido demais por uma solução técnica sem considerar devidamente o impacto nas pessoas e o fator humano.',
      en: 'Risk of Premature Solutioning: Deciding on a technical fix too quickly without factoring in human and team dynamics.',
    },
    ACCOMMODATOR: {
      pt: 'Risco de Ação Impulsiva: Iniciar a execução sem planejamento ou reflexão suficiente, correndo o risco de repetir erros por falta de fundamentação.',
      en: 'Risk of Impulsive Action: Jumping into execution without adequate planning, risking repeated mistakes from missing rationale.',
    },
    MIXED_TEMPLATE: {
      pt: 'Risco de Dispersão Metodológica: Mudar de técnica com muita frequência antes de aprofundar e consolidar os resultados de cada fase.',
      en: 'Risk of Methodological Drift: Switching learning techniques too frequently before consolidating results.',
    },
  };

  const psInfo = problemSolvingMap[resultKey] || problemSolvingMap['DIVERGER'];
  const cfInfo = careerFitMap[resultKey] || careerFitMap['DIVERGER'];
  const bsInfo = blindSpotsMap[resultKey] || blindSpotsMap['DIVERGER'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 animate-in fade-in duration-300">
      {/* 3-Model Report Switcher Tabs */}
      <ReportTabs
        currentModel="kolb"
        onSwitchModel={(m) => onSelectOtherModel(m)}
        onViewComparison={onCompare}
      />

      {/* Hero Result Banner */}
      <div className="bg-gradient-to-br from-teal-950 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl mb-8 relative overflow-hidden border border-emerald-800/40">
        <div className="relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 mb-4">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('results.badge')} • Pilar E (Ciclo Experiencial)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            {localize(profile.title, locale)}
          </h1>

          <p className="text-base sm:text-lg text-emerald-100 max-w-3xl leading-relaxed font-medium">
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

      {/* TOP SECTION: 2-COLUMN GRID (Left: 2D Quadrant Map | Right: Score Bars - Índice de Aprendizagem) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-stretch">
        {/* LEFT: 2D Quadrant Map */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-600" />
              <span>{locale === 'pt' ? 'Mapa do Quadrante de Aprendizagem' : 'Learning Quadrant Map'}</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              {locale === 'pt' ? 'O ponto azul indica sua posição no ciclo' : 'Blue dot shows your plotted position'}
            </span>
          </div>

          {/* The 2x2 Quadrant Grid */}
          <div className="relative w-full max-w-md mx-auto aspect-square bg-slate-50 border-2 border-slate-200 rounded-3xl p-4 overflow-hidden shadow-inner flex-1 my-auto">
            {/* Axis Labels */}
            {/* Top: CE */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center z-10">
              <span className="text-[11px] font-black uppercase tracking-wider text-rose-700 bg-rose-50/90 px-2.5 py-1 rounded-md border border-rose-200 shadow-xs">
                {locale === 'pt' ? 'Sentir (Experiência Concreta)' : 'Feeling (Concrete Exp.)'}
              </span>
            </div>
            {/* Bottom: AC */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center z-10">
              <span className="text-[11px] font-black uppercase tracking-wider text-purple-700 bg-purple-50/90 px-2.5 py-1 rounded-md border border-purple-200 shadow-xs">
                {locale === 'pt' ? 'Pensar (Conceituação Abstrata)' : 'Thinking (Abstract Concept.)'}
              </span>
            </div>
            {/* Left: RO */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-center z-10 max-w-[75px]">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50/90 px-1.5 py-1 rounded-md border border-blue-200 block shadow-xs">
                {locale === 'pt' ? 'Observar' : 'Watching'}
              </span>
            </div>
            {/* Right: AE */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-center z-10 max-w-[75px]">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50/90 px-1.5 py-1 rounded-md border border-emerald-200 block shadow-xs">
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
            <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-1.5 text-center p-6">
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
                <span className="text-[10px] text-slate-500 font-medium">
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
                <span className="text-[10px] text-slate-500 font-medium">
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
                <span className="text-[10px] text-slate-500 font-medium">
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
                <span className="text-[10px] text-slate-500 font-medium">
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

        {/* RIGHT: Índice de Aprendizagem (4 Dimensions Scores with filled progress bars) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" />
                <span>{locale === 'pt' ? 'Índice de Aprendizagem' : 'Learning Index'}</span>
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                {locale === 'pt' ? 'Pontuações por dimensão (0 a 12 pts)' : 'Dimension scores (0 to 12 pts)'}
              </span>
            </div>

            <div className="space-y-4">
              {dimensionCards.map((dim) => {
                const pct = Math.min(100, Math.max(0, Math.round((dim.score / 12) * 100)));
                return (
                  <div
                    key={dim.code}
                    className={`p-4 sm:p-5 rounded-2xl border ${dim.bg} flex flex-col justify-between shadow-xs transition-all`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-[11px] font-black tracking-wider uppercase opacity-75 block">
                          {dim.code} • {dim.action}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">{dim.title}</h4>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <span className="text-xl sm:text-2xl font-black text-slate-900">{dim.score}</span>
                        <span className="text-xs text-slate-500 block font-medium">/ 12 pts</span>
                      </div>
                    </div>
                    {/* Horizontal Progress Bar from total to filled */}
                    <div className="w-full bg-slate-200/80 rounded-full h-2.5 overflow-hidden mt-1 shadow-inner">
                      <div
                        className={`h-full ${dim.color} transition-all duration-700 rounded-full`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* NEW CARD: EXPLICAÇÃO DETALHADA DE CADA UMA DAS 4 DIMENSÕES DE KOLB */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 mb-8 space-y-6">
        <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2.5">
              <BookMarked className="w-5 h-5 text-emerald-600" />
              <span>{locale === 'pt' ? 'Funcionalidade das 4 Dimensões de Kolb' : 'How the 4 Kolb Dimensions Work'}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              {locale === 'pt'
                ? 'Entenda a fundo o que significa e como funciona cada um dos 4 pilares do processamento experiencial'
                : 'Understand what each of the 4 experiential processing dimensions represents and how it operates'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* EC */}
          <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-rose-800">
                EC • Experiência Concreta
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-200/80 text-rose-900">
                Sentir & Vivenciar
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {locale === 'pt' ? 'Aprendizagem pela Intuição e Vivência Direta' : 'Learning by Feeling and Direct Experience'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {locale === 'pt'
                ? 'Mergulha de cabeça no momento presente. Valoriza relacionamentos humanos, sensibilidade, histórias reais e sentimentos imediatos em vez de teorias frias.'
                : 'Engages directly in current experiences, valuing personal interactions, feelings, and real stories over abstract theory.'}
            </p>
          </div>

          {/* RO */}
          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-blue-800">
                OR • Observação Reflexiva
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-200/80 text-blue-900">
                Observar & Refletir
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {locale === 'pt' ? 'Aprendizagem pela Análise Ponderada e Perspectivas' : 'Learning by Careful Reflection and Perspectives'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {locale === 'pt'
                ? 'Examina as situações com calma a partir de múltiplos pontos de vista. Busca compreender o significado profundo do que aconteceu antes de emitir julgamentos ou agir.'
                : 'Pauses to observe from multiple angles, seeking to understand the underlying meaning of events before acting.'}
            </p>
          </div>

          {/* AC */}
          <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-purple-800">
                CA • Conceituação Abstrata
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-200/80 text-purple-900">
                Pensar & Modelar
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {locale === 'pt' ? 'Aprendizagem pela Lógica e Estruturação Teórica' : 'Learning by Logic and Theoretical Frameworks'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {locale === 'pt'
                ? 'Utiliza análise lógica rigorosa e elaboração de hipóteses. Cria modelos, sistemas conceituais e regras gerais para organizar a informação com precisão.'
                : 'Uses logical analysis and hypothesis building to synthesize theories, models, and systematic principles.'}
            </p>
          </div>

          {/* AE */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                EA • Experimentação Ativa
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900">
                Agir & Testar
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {locale === 'pt' ? 'Aprendizagem pela Execução Prática e Resultados' : 'Learning by Action and Tangible Testing'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {locale === 'pt'
                ? 'Coloca ideias em prática imediatamente. Aprende testando hipóteses no mundo real, assumindo riscos e buscando impacto prático e resolução de problemas.'
                : 'Puts ideas to work in the real world, learning by doing, taking calculated risks, and solving concrete problems.'}
            </p>
          </div>
        </div>
      </div>

      {/* Kolb 4-Stage Experiential Learning Cycle Loop */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 mb-8">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
          <RefreshCw className="w-5 h-5 text-teal-600" />
          <span>{t('results.learningCycleTitle')}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
          {locale === 'pt'
            ? 'David Kolb demonstrou que a aprendizagem profunda ocorre quando circulamos pelas 4 etapas do processo. Seu perfil indica o ponto de partida predileto por onde seu cérebro prefere entrar no ciclo:'
            : 'David Kolb demonstrated that deep learning happens when flowing through all 4 stages. Your profile indicates your brain’s natural entry point into the cycle:'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
          <div
            className={`p-4 rounded-2xl border transition-all ${
              resultKey === 'DIVERGER' || resultKey === 'ACCOMMODATOR'
                ? 'bg-rose-100/80 border-rose-400 ring-2 ring-rose-400/30 shadow-md'
                : 'bg-rose-50/60 border-rose-200/80'
            }`}
          >
            <span className="text-xs font-black text-rose-800 uppercase block mb-1">
              1. {locale === 'pt' ? 'Vivenciar (EC)' : 'Experience (CE)'}
            </span>
            <span className="text-xs text-slate-600 leading-tight block font-medium">
              {locale === 'pt' ? 'Mergulhar na experiência concreta e sentir o contexto' : 'Engage fully in concrete experience'}
            </span>
          </div>

          <div
            className={`p-4 rounded-2xl border transition-all ${
              resultKey === 'DIVERGER' || resultKey === 'ASSIMILATOR'
                ? 'bg-blue-100/80 border-blue-400 ring-2 ring-blue-400/30 shadow-md'
                : 'bg-blue-50/60 border-blue-200/80'
            }`}
          >
            <span className="text-xs font-black text-blue-800 uppercase block mb-1">
              2. {locale === 'pt' ? 'Observar (OR)' : 'Reflect (RO)'}
            </span>
            <span className="text-xs text-slate-600 leading-tight block font-medium">
              {locale === 'pt' ? 'Refletir sob múltiplos ângulos sobre o que ocorreu' : 'Pause and observe from multiple viewpoints'}
            </span>
          </div>

          <div
            className={`p-4 rounded-2xl border transition-all ${
              resultKey === 'ASSIMILATOR' || resultKey === 'CONVERGER'
                ? 'bg-purple-100/80 border-purple-400 ring-2 ring-purple-400/30 shadow-md'
                : 'bg-purple-50/60 border-purple-200/80'
            }`}
          >
            <span className="text-xs font-black text-purple-800 uppercase block mb-1">
              3. {locale === 'pt' ? 'Conceituar (CA)' : 'Conceptualize (AC)'}
            </span>
            <span className="text-xs text-slate-600 leading-tight block font-medium">
              {locale === 'pt' ? 'Criar modelos lógicos e teorias explicativas' : 'Synthesize theories and logical models'}
            </span>
          </div>

          <div
            className={`p-4 rounded-2xl border transition-all ${
              resultKey === 'CONVERGER' || resultKey === 'ACCOMMODATOR'
                ? 'bg-emerald-100/80 border-emerald-400 ring-2 ring-emerald-400/30 shadow-md'
                : 'bg-emerald-50/60 border-emerald-200/80'
            }`}
          >
            <span className="text-xs font-black text-emerald-800 uppercase block mb-1">
              4. {locale === 'pt' ? 'Testar (EA)' : 'Experiment (AE)'}
            </span>
            <span className="text-xs text-slate-600 leading-tight block font-medium">
              {locale === 'pt' ? 'Aplicar as teorias em novos desafios práticos' : 'Apply ideas to solve problems in practice'}
            </span>
          </div>
        </div>
      </div>

      {/* Deep-Dive Analysis Section: Análise Aprofundada Metodológica (EM MODO CLARO AGORA) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 mb-8 space-y-8 text-slate-900">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
          <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-2xs">
            <Brain className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {locale === 'pt' ? 'Análise Aprofundada: Como Você Aprende na Prática' : 'Deep-Dive Experiential Analysis'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {locale === 'pt'
                ? 'Guia pedagógico customizado para o perfil de Kolb'
                : 'Custom pedagogical breakdown for your Kolb profile'}
            </p>
          </div>
        </div>

        {/* 5 Key Characteristics */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-700 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{locale === 'pt' ? '5 Características Principais de Comportamento' : '5 Key Behavioral Traits'}</span>
          </h3>

          <div className="space-y-3">
            {localize(profile.traits, locale).map((trait, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-slate-800"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
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

        {/* Methodological Extensions Grid (Problem Solving + Career Fit) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Problem Solving Style */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider mb-2">
                <Zap className="w-4 h-4 text-teal-600" />
                <span>{locale === 'pt' ? 'Resolução de Problemas & Tomada de Decisão' : 'Problem Solving & Decision Style'}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {locale === 'pt' ? psInfo.pt : psInfo.en}
              </p>
            </div>
          </div>

          {/* Career & Environment Fit */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-2">
                <Briefcase className="w-4 h-4 text-amber-600" />
                <span>{locale === 'pt' ? 'Ambientes & Funções de Maior Afinidade' : 'Career & Environment Fit'}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {locale === 'pt' ? cfInfo.pt : cfInfo.en}
              </p>
            </div>
          </div>
        </div>

        {/* Blind Spots & Overuse Risks Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
              {locale === 'pt' ? 'Atenção ao Ponto Cego & Uso Excessivo' : 'Overuse Risk & Blind Spot'}
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed text-amber-900 font-medium">
              {locale === 'pt' ? bsInfo.pt : bsInfo.en}
            </p>
          </div>
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
