/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * LearnerType Brasil - Matriz Integrada SEI 360° (Sensorial, Experiencial, Inteligências)
 */

import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import {
  getSavedResults,
  SavedResultItem,
} from '../lib/storage';
import {
  VarkScores,
  KolbScores,
  GardnerScores,
  determineVarkResult,
  determineKolbResult,
  determineGardnerResult,
  getVarkResultProfile,
  getKolbResultProfile,
  getGardnerResultProfile,
  localize,
} from '../lib/scoring';
import { GardnerIntelligence, ModelType, varkResults, kolbResults, gardnerResults } from '../data/quizData';
import {
  BarChart2,
  Layers,
  ArrowRight,
  Eye,
  Compass,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Zap,
  Brain,
  Lightbulb,
  ShieldCheck,
  Target,
  BookOpen,
  RotateCcw,
  Check,
  Award
} from 'lucide-react';

import ReportTabs from './ReportTabs';

interface ComparisonViewProps {
  onSelectModel: (model: ModelType | 'unified') => void;
}

export default function ComparisonView({ onSelectModel }: ComparisonViewProps) {
  const { locale } = useLocale();

  // Active intersection node state for interactive SVG Triad
  const [selectedIntersection, setSelectedIntersection] = useState<
    'core' | 'SE' | 'EI' | 'SI' | 'S' | 'E' | 'I'
  >('core');

  // Load saved results
  const savedResults = getSavedResults();
  const savedVark = savedResults.find((r) => r.model === 'vark');
  const savedKolb = savedResults.find((r) => r.model === 'kolb');
  const savedGardner = savedResults.find((r) => r.model === 'gardner');

  // Effective Scores (use sample fallbacks if not taken yet)
  const varkScores: VarkScores = (savedVark?.scores as VarkScores) || { V: 7, A: 2, R: 3, K: 6 };
  const varkKey = savedVark?.resultKey || 'V+K';
  const varkProfile = getVarkResultProfile(varkKey);

  const kolbScores: KolbScores = (savedKolb?.scores as KolbScores) || { CE: 5, RO: 4, AC: 1, AE: 2 };
  const kolbKey = savedKolb?.resultKey || 'DIVERGER';
  const kolbProfile = getKolbResultProfile(kolbKey);

  const gardnerScores: GardnerScores = (savedGardner?.scores as GardnerScores) || {
    LOG: 4.7,
    LIN: 3.3,
    SPA: 4.3,
    MUS: 2.7,
    KIN: 3.0,
    INTER: 3.7,
    INTRA: 4.0,
  };
  const gardnerTopTypes = savedGardner
    ? (savedGardner.resultKey.split(',') as GardnerIntelligence[])
    : (['LOG', 'SPA', 'INTRA'] as GardnerIntelligence[]);
  const gardnerPrimaryProfile = getGardnerResultProfile(gardnerTopTypes[0]);

  // Gardner Intelligence Labels
  const gardnerNames: Record<GardnerIntelligence, { pt: string; en: string }> = {
    LOG: { pt: 'Lógico-Matemática', en: 'Logical-Mathematical' },
    LIN: { pt: 'Linguística', en: 'Linguistic' },
    SPA: { pt: 'Espacial-Visual', en: 'Spatial-Visual' },
    MUS: { pt: 'Musical-Auditiva', en: 'Musical-Auditory' },
    KIN: { pt: 'Cinestésica-Corporal', en: 'Bodily-Kinesthetic' },
    INTER: { pt: 'Interpessoal', en: 'Interpersonal' },
    INTRA: { pt: 'Intrapessoal', en: 'Intrapersonal' },
  };

  // Find lowest scores for "Bridge Weakness" strategy
  const lowestGardnerEntry = (Object.entries(gardnerScores) as [GardnerIntelligence, number][]).sort(
    (a, b) => a[1] - b[1]
  )[0];

  const lowestVarkEntry = (Object.entries(varkScores) as ['V' | 'A' | 'R' | 'K', number][]).sort(
    (a, b) => a[1] - b[1]
  )[0];

  // Intersection Node Data Explanations
  const intersectionDetails = {
    core: {
      title: locale === 'pt' ? 'Centro de Alta Sinergia SEI (Hyper-Learning Core)' : 'SEI High Synergy Core',
      badge: locale === 'pt' ? 'Interseção Triádica S ∩ E ∩ I' : 'Triadic Intersection S ∩ E ∩ I',
      desc:
        locale === 'pt'
          ? `Sua maior fluência ocorre quando a informação entra pelo seu canal sensorial dominante (${localize(
              varkProfile.title,
              locale
            )}), é processada no seu ciclo de ação (${localize(
              kolbProfile.title,
              locale
            )}) e aplicada no seu domínio cognitivo de maior talento (${
              gardnerNames[gardnerTopTypes[0]].pt
            }). Esta tríade é seu supercarregador de estudos.`
          : `Maximum fluency happens when information is captured via ${localize(
              varkProfile.title,
              locale
            )}, processed through ${localize(
              kolbProfile.title,
              locale
            )}, and mastered with your ${gardnerNames[gardnerTopTypes[0]].en} intelligence.`,
      actionTip:
        locale === 'pt'
          ? 'Estude sempre criando um produto ou projeto prático que utilize esquemas do seu canal sensorial e que resulte em uma aplicação alinhada à sua inteligência dominante.'
          : 'Always create hands-on projects combining your sensory channel with your primary cognitive strength.',
    },
    SE: {
      title: locale === 'pt' ? 'Filtro Sensorial-Experiencial (S ∩ E)' : 'Sensory-Experiential Filter (S ∩ E)',
      badge: locale === 'pt' ? 'Captação & Transformação' : 'Capture & Transformation',
      desc:
        locale === 'pt'
          ? `Conecta a forma como seu cérebro capta estímulos (${localize(
              varkProfile.title,
              locale
            )}) com como você age no mundo (${localize(
              kolbProfile.title,
              locale
            )}). Garante que a teoria seja convertida em vivência prática sem fadiga mental.`
          : `Connects how you receive stimuli (${localize(
              varkProfile.title,
              locale
            )}) with how you act (${localize(
              kolbProfile.title,
              locale
            )}).`,
      actionTip:
        locale === 'pt'
          ? 'Se o seu pilar S é Visual e seu Kolb é Divergente, crie mapas mentais conceituais em grupo antes de executar.'
          : 'Pair visual mind maps with collaborative group discussions before building.',
    },
    EI: {
      title: locale === 'pt' ? 'Alavanca Experiencial-Cognitiva (E ∩ I)' : 'Experiential-Cognitive Lever (E ∩ I)',
      badge: locale === 'pt' ? 'Ação & Talento Natural' : 'Action & Natural Talent',
      desc:
        locale === 'pt'
          ? `Alinha seu ciclo de aprendizagem (${localize(
              kolbProfile.title,
              locale
            )}) com sua habilidade nata (${
              gardnerNames[gardnerTopTypes[0]].pt
            }). Define a melhor maneira de resolver problemas complexos e tomar decisões sob pressão.`
          : `Aligns your experiential cycle (${localize(
              kolbProfile.title,
              locale
            )}) with your top talent (${gardnerNames[gardnerTopTypes[0]].en}).`,
      actionTip:
        locale === 'pt'
          ? 'Use exercícios práticos e simulados para desafiar diretamente seu raciocínio de maior domínio.'
          : 'Use practical simulations to test and sharpen your top cognitive domain.',
    },
    SI: {
      title: locale === 'pt' ? 'Codificação Sensorial-Talento (S ∩ I)' : 'Sensory-Talent Encoding (S ∩ I)',
      badge: locale === 'pt' ? 'Entrada & Absorção Profunda' : 'Input & Deep Absorption',
      desc:
        locale === 'pt'
          ? `Determina o formato do material didático (vídeos, textos, áudios ou labs) exigido para que sua inteligência dominante (${
              gardnerNames[gardnerTopTypes[0]].pt
            }) absorva o assunto em tempo recorde.`
          : `Determines the exact study media format required for your primary intelligence to process content at top speed.`,
      actionTip:
        locale === 'pt'
          ? 'Adapte todo texto denso para o formato do seu canal sensorial antes de tentar memorizar.'
          : 'Convert dense text into your primary sensory format before memorizing.',
    },
    S: {
      title: locale === 'pt' ? 'Pilar Sensorial isolado (S)' : 'Sensory Pillar Alone (S)',
      badge: locale === 'pt' ? 'Canal Perceptivo' : 'Perceptive Channel',
      desc: locale === 'pt' ? 'Define a porta de entrada física dos dados (olhos, ouvidos, leitura ou movimento).' : 'Defines input channels.',
      actionTip: locale === 'pt' ? 'Evite estudar usando apenas mídias passivas do seu canal fraco.' : 'Avoid studying solely via your weakest sensory format.',
    },
    E: {
      title: locale === 'pt' ? 'Pilar Experiencial isolado (E)' : 'Experiential Pillar Alone (E)',
      badge: locale === 'pt' ? 'Ciclo Kolb' : 'Kolb Cycle',
      desc: locale === 'pt' ? 'Define como você processa a vivência (Sentir, Observar, Pensar, Agir).' : 'Defines how you process experience.',
      actionTip: locale === 'pt' ? 'Complete todas as 4 etapas do ciclo para não deixar lacunas.' : 'Complete all 4 cycle phases.',
    },
    I: {
      title: locale === 'pt' ? 'Pilar Inteligências isolado (I)' : 'Intelligences Pillar Alone (I)',
      badge: locale === 'pt' ? 'Teoria de Gardner' : 'Gardner Theory',
      desc: locale === 'pt' ? 'Mapeia seus talentos e facilidades cognitivas autônomas.' : 'Maps cognitive superpowers.',
      actionTip: locale === 'pt' ? 'Combine inteligências fortes para apoiar áreas em desenvolvimento.' : 'Combine strong intelligences to lift developing ones.',
    },
  };

  const activeNode = intersectionDetails[selectedIntersection];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-in fade-in duration-300 space-y-10">
      {/* SEI REPORT SUB-NAVIGATION TABS */}
      <ReportTabs
        currentModel="comparison"
        onSwitchModel={(m) => onSelectModel(m)}
        onViewComparison={() => {}}
      />

      {/* HEADER HERO */}
      <div className="text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 border border-indigo-200 text-indigo-700 mb-4 shadow-2xs">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>{locale === 'pt' ? 'Matriz Neuro-Pedagógica SEI 360°' : 'SEI 360° Neuro-Pedagogical Matrix'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
          {locale === 'pt'
            ? 'Diagnóstico Integrado dos 3 Pilares Cognitivos'
            : 'Integrated Diagnostic of the 3 Cognitive Pillars'}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {locale === 'pt'
            ? 'A aprendizagem de alto rendimento acontece na confluência entre como você capta o mundo (Sensorial), como transforma a vivência em ação (Experiencial) e quais são suas forças mentais dominantes (Inteligências Múltiplas).'
            : 'High-performance learning occurs at the intersection of sensory input, experiential action, and cognitive superpowers.'}
        </p>
      </div>

      {/* SECTION 1: INTERACTIVE TRIAD GRAPHIC (GRÁFICO DE INTERSEÇÃO 3D / VENN) */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-indigo-900/50">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>{locale === 'pt' ? 'Gráfico de Interseção Triádica SEI' : 'SEI Triadic Intersection Graph'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            {locale === 'pt' ? 'Mapa de Sinergia dos 3 Pilares Cognitivos' : '3-Pillar Synergy Map'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {locale === 'pt'
              ? 'Clique nos nós e interseções do gráfico abaixo para entender como seu canal sensorial (S), ciclo de ação (E) e inteligência dominante (I) interagem entre si.'
              : 'Click the nodes and overlapping regions in the diagram below to inspect your cognitive synergies.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Interactive SVG Venn Triad */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center p-2">
              <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl select-none">
                <defs>
                  <radialGradient id="gradS" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.15" />
                  </radialGradient>
                  <radialGradient id="gradE" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.15" />
                  </radialGradient>
                  <radialGradient id="gradI" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#6b21a8" stopOpacity="0.15" />
                  </radialGradient>
                </defs>

                {/* Circle S: Sensorial (Top Left) */}
                <circle
                  cx="150"
                  cy="150"
                  r="110"
                  fill="url(#gradS)"
                  stroke="#60a5fa"
                  strokeWidth={selectedIntersection === 'S' ? '4' : '2'}
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setSelectedIntersection('S')}
                />

                {/* Circle E: Experiencial (Top Right) */}
                <circle
                  cx="250"
                  cy="150"
                  r="110"
                  fill="url(#gradE)"
                  stroke="#34d399"
                  strokeWidth={selectedIntersection === 'E' ? '4' : '2'}
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setSelectedIntersection('E')}
                />

                {/* Circle I: Inteligências (Bottom Center) */}
                <circle
                  cx="200"
                  cy="240"
                  r="110"
                  fill="url(#gradI)"
                  stroke="#c084fc"
                  strokeWidth={selectedIntersection === 'I' ? '4' : '2'}
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setSelectedIntersection('I')}
                />

                {/* Labels on Circles */}
                <text x="110" y="110" fill="#93c5fd" fontSize="13" fontWeight="900" textAnchor="middle">
                  PILAR S (Sensorial)
                </text>
                <text x="110" y="128" fill="#e0f2fe" fontSize="11" textAnchor="middle">
                  {varkKey}
                </text>

                <text x="290" y="110" fill="#6ee7b7" fontSize="13" fontWeight="900" textAnchor="middle">
                  PILAR E (Kolb)
                </text>
                <text x="290" y="128" fill="#ecfdf5" fontSize="11" textAnchor="middle">
                  {kolbKey}
                </text>

                <text x="200" y="315" fill="#e9d5ff" fontSize="13" fontWeight="900" textAnchor="middle">
                  PILAR I (Gardner)
                </text>
                <text x="200" y="332" fill="#faf5ff" fontSize="11" textAnchor="middle">
                  {gardnerTopTypes.join(', ')}
                </text>

                {/* INTERSECTION BUTTON NODES */}
                {/* S ∩ E Node */}
                <g className="cursor-pointer" onClick={() => setSelectedIntersection('SE')}>
                  <circle cx="200" cy="130" r="22" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <text x="200" y="134" fill="#38bdf8" fontSize="11" fontWeight="800" textAnchor="middle">
                    S ∩ E
                  </text>
                </g>

                {/* E ∩ I Node */}
                <g className="cursor-pointer" onClick={() => setSelectedIntersection('EI')}>
                  <circle cx="240" cy="205" r="22" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                  <text x="240" y="209" fill="#34d399" fontSize="11" fontWeight="800" textAnchor="middle">
                    E ∩ I
                  </text>
                </g>

                {/* S ∩ I Node */}
                <g className="cursor-pointer" onClick={() => setSelectedIntersection('SI')}>
                  <circle cx="160" cy="205" r="22" fill="#1e293b" stroke="#c084fc" strokeWidth="2" />
                  <text x="160" y="209" fill="#c084fc" fontSize="11" fontWeight="800" textAnchor="middle">
                    S ∩ I
                  </text>
                </g>

                {/* CENTER CORE: S ∩ E ∩ I */}
                <g className="cursor-pointer" onClick={() => setSelectedIntersection('core')}>
                  <circle cx="200" cy="180" r="26" fill="#f59e0b" stroke="#fef3c7" strokeWidth="3" className="animate-pulse" />
                  <text x="200" y="184" fill="#78350f" fontSize="11" fontWeight="900" textAnchor="middle">
                    CORE
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* Interactive Card Explaining Selected Intersection */}
          <div className="lg:col-span-6 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {activeNode.badge}
              </span>
              <span className="text-xs text-slate-400">
                {locale === 'pt' ? 'Clique em outro nó para explorar' : 'Click another node to explore'}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">{activeNode.title}</h3>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{activeNode.desc}</p>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-left">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-200 leading-relaxed">
                <span className="font-bold block mb-0.5 text-amber-300">
                  {locale === 'pt' ? 'Estratégia Prática Recomendada:' : 'Recommended Action:'}
                </span>
                <span>{activeNode.actionTip}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: PROFOUND SYNERGY REPORT (UNINDO AS MAIORES FORÇAS) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 space-y-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>{locale === 'pt' ? 'Sinergia Triádica Customizada' : 'Customized Triadic Synergy'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
            {locale === 'pt' ? 'Como Potencializar Seu Aprendizado Unindo Seus 3 Pilares' : 'Supercharging Learning by Combining All 3 Pillars'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Análise neuro-pedagógica combinando seu canal sensorial **{localize(varkProfile.title, locale)}**, seu estilo experiencial **{localize(kolbProfile.title, locale)}** e sua maior inteligência **{gardnerNames[gardnerTopTypes[0]].pt}**.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Rotina de Estudo Ideal */}
          <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              {locale === 'pt' ? 'Formatação e Entrada de Conteúdo' : 'Content Formatting'}
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              {locale === 'pt'
                ? `Converta todo texto teórico para esquemas do seu canal (${varkKey}). Em seguida, utilize seu estilo (${kolbKey}) para construir um mapa de dúvidas e hipóteses antes de ler.`
                : `Convert theoretical text into your sensory channel (${varkKey}).`}
            </p>
          </div>

          {/* Card 2: Processamento e Retenção */}
          <div className="p-6 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              {locale === 'pt' ? 'Processamento Experiencial & Prática' : 'Experiential Processing'}
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              {locale === 'pt'
                ? `Ao estudar matérias difíceis, não fique parado lendo. Use sua inteligência dominante (${
                    gardnerNames[gardnerTopTypes[0]].pt
                  }) para explicar o conceito criando analogias ou resolvendo problemas reais.`
                : `Use your primary intelligence (${gardnerNames[gardnerTopTypes[0]].en}) to explain concepts.`}
            </p>
          </div>

          {/* Card 3: Consolidação e Memória */}
          <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              {locale === 'pt' ? 'Consolidação e Aplicação Prática' : 'Consolidation & Application'}
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              {locale === 'pt'
                ? `Finalize cada sessão de estudos construindo um 'entregável' (um resumo em 1 página, uma simulação ou um mini-projeto) que prove seu domínio prático.`
                : `Finish study sessions by building an artifact (1-page summary, project, or demo).`}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: STRATEGY "PONTE COGNITIVA" (FORÇA ALAVANCANDO FRAQUEZA) */}
      <div className="bg-gradient-to-br from-amber-50/70 via-orange-50/30 to-white rounded-3xl border border-amber-200 p-6 sm:p-10 shadow-lg space-y-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{locale === 'pt' ? 'Estratégia Ponte Cognitiva' : 'Cognitive Bridge Strategy'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
            {locale === 'pt' ? 'Como Usar uma Força Dominante para Desenvolver uma Fraqueza' : 'Using a Strength to Overcome a Weakness'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {locale === 'pt'
              ? `Análise dos seus pontos de menor pontuação (Sua área de oportunidade em Inteligência: ${
                  gardnerNames[lowestGardnerEntry[0]].pt
                } - Nota ${lowestGardnerEntry[1]} / 5.0) e como superá-la usando suas maiores alavancas.`
              : `Protocol for elevating developing domains using your primary cognitive levers.`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-600" />
              <span>{locale === 'pt' ? 'Protocolo 1: Tradução Cognitiva' : 'Protocol 1: Cognitive Translation'}</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {locale === 'pt'
                ? `Se você precisa aprender um assunto que exige a inteligência ${gardnerNames[lowestGardnerEntry[0]].pt}, nunca estude no formato tradicional. Traduza o conteúdo para a linguagem da sua inteligência principal (${gardnerNames[gardnerTopTypes[0]].pt}).`
                : `Translate content from weak domains into your primary intelligence format.`}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Brain className="w-5 h-5 text-amber-600" />
              <span>{locale === 'pt' ? 'Protocolo 2: Ancoragem Sensorial' : 'Protocol 2: Sensory Anchoring'}</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {locale === 'pt'
                ? `Utilize o seu canal sensorial mais forte (${varkKey}) como âncora de atenção ao lidar com tópicos onde você tem menor facilidade, evitando dispersão e desmotivação.`
                : `Use your strongest sensory channel as an anchor when studying hard topics.`}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4: MASTER 5-STEP ACTION PLAN */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{locale === 'pt' ? 'Plano de Ação Mestre' : 'Master Action Plan'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {locale === 'pt' ? 'Rotina de Estudos Integrada em 5 Etapas' : '5-Step Integrated Study Routine'}
          </h2>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
              01
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">
                {locale === 'pt' ? 'Captação Sensorial Customizada (Filtro S)' : 'Custom Sensory Capture'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {locale === 'pt'
                  ? 'Inicie estudos preparando o terreno visual/auditivo/textual do seu canal primário. Monte resumos visuais de 1 página antes de ler capítulos longos.'
                  : 'Prepare study materials matching your sensory channel.'}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
              02
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">
                {locale === 'pt' ? 'Ciclo Experiencial Ativo (Processamento E)' : 'Active Experiential Cycle'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {locale === 'pt'
                  ? 'Intercale 25 minutos de estudo teórico com 10 minutos de aplicação prática ou simulação de problemas.'
                  : 'Alternate 25 minutes of theory with 10 minutes of active problem solving.'}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0">
              03
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">
                {locale === 'pt' ? 'Aplicação Cognitiva de Alto Desempenho (Domínio I)' : 'High Performance Cognitive Application'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {locale === 'pt'
                  ? 'Utilize sua maior inteligência para ensinar o conteúdo em voz alta, desenhar diagramas 3D ou criar modelos lógicos de causa e efeito.'
                  : 'Leverage your top intelligence to teach or build mental models.'}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
            <div className="w-8 h-8 rounded-xl bg-amber-600 text-white font-black text-xs flex items-center justify-center shrink-0">
              04
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">
                {locale === 'pt' ? 'Gestão de Pontos Cego e Prevenção de Fadiga' : 'Blind Spot Management'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {locale === 'pt'
                  ? 'Reconheça quando uma metodologia está gerando bloqueio e troque imediatamente o formato para o seu pilar secundário.'
                  : 'Switch format to secondary pillar if feeling blocked.'}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
              05
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">
                {locale === 'pt' ? 'Ambiente e Rotina Neuro-Compatível' : 'Neuro-Compatible Environment'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {locale === 'pt'
                  ? 'Organize seu espaço com estímulos alinhados: boa iluminação visual, silêncio/música ambiente adequada e espaço para se movimentar.'
                  : 'Design your workspace to match your cognitive profile.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: DETAILED SIDE-BY-SIDE CARDS OF THE 3 PILLARS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* PILAR S SUMMARY CARD */}
        <div className="bg-white rounded-3xl border border-blue-200 p-6 shadow-md flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                Pilar S · Sensorial
              </span>
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">{localize(varkProfile.title, locale)}</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">{localize(varkProfile.summary, locale)}</p>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Pontuações VARK</span>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">V: {varkScores.V} pts</div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">A: {varkScores.A} pts</div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">R: {varkScores.R} pts</div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">K: {varkScores.K} pts</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectModel('vark')}
            className="w-full py-2.5 rounded-xl font-bold text-xs bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>{locale === 'pt' ? 'Refazer Pilar S' : 'Retake Pillar S'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* PILAR E SUMMARY CARD */}
        <div className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-md flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Pilar E · Experiencial
              </span>
              <Compass className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">{localize(kolbProfile.title, locale)}</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">{localize(kolbProfile.summary, locale)}</p>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Dimensões de Kolb</span>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">CE: {kolbScores.CE}</div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">RO: {kolbScores.RO}</div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">AC: {kolbScores.AC}</div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">AE: {kolbScores.AE}</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectModel('kolb')}
            className="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>{locale === 'pt' ? 'Refazer Pilar E' : 'Retake Pillar E'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* PILAR I SUMMARY CARD */}
        <div className="bg-white rounded-3xl border border-purple-200 p-6 shadow-md flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                Pilar I · Inteligências
              </span>
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">{localize(gardnerPrimaryProfile.title, locale)}</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">{localize(gardnerPrimaryProfile.summary, locale)}</p>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Top Inteligências</span>
              <div className="flex flex-wrap gap-1.5">
                {gardnerTopTypes.map((t, idx) => (
                  <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-100 text-purple-900 border border-purple-200">
                    #{idx + 1} {gardnerNames[t].pt} ({gardnerScores[t].toFixed(1)})
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectModel('gardner')}
            className="w-full py-2.5 rounded-xl font-bold text-xs bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>{locale === 'pt' ? 'Refazer Pilar I' : 'Retake Pillar I'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
