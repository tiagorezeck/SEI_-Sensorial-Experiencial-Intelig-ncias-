/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLocale } from '../context/LocaleContext';
import {
  BarChart2,
  Layers,
  ArrowRight,
  Eye,
  Compass,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Zap
} from 'lucide-react';
import { ModelType } from '../data/quizData';

interface ComparisonViewProps {
  onSelectModel: (model: ModelType) => void;
}

export default function ComparisonView({ onSelectModel }: ComparisonViewProps) {
  const { locale } = useLocale();

  const comparisonRows = [
    {
      feature: locale === 'pt' ? 'Foco Principal' : 'Core Focus',
      vark: locale === 'pt' ? 'Canais Sensoriais de Percepção (Olhos, Ouvidos, Leitura, Corpo)' : 'Sensory perception channels',
      kolb: locale === 'pt' ? 'Ciclo de Processamento da Experiência e Ação' : 'Experiential processing loop',
      gardner: locale === 'pt' ? 'Faculdades Cognitivas e Inteligências Autônomas' : 'Cognitive domains & intelligences',
    },
    {
      feature: locale === 'pt' ? 'Autor e Ano' : 'Author & Year',
      vark: 'Neil Fleming (1987)',
      kolb: 'David A. Kolb (1984)',
      gardner: 'Howard Gardner (1983)',
    },
    {
      feature: locale === 'pt' ? 'Número de Estilos / Tipos' : 'Number of Styles',
      vark: locale === 'pt' ? '4 modalidades básicas + 7 combinações multimodais' : '4 modalities + multimodal combinations',
      kolb: locale === 'pt' ? '4 quadrantes (Divergente, Assimilador, Convergente, Acomodador) + Misto' : '4 quadrants + Mixed',
      gardner: locale === 'pt' ? '7 inteligências independentes' : '7 independent intelligences',
    },
    {
      feature: locale === 'pt' ? 'Formato do Teste' : 'Quiz Format',
      vark: locale === 'pt' ? '16 questões situacionais de escolha única (~2-3 min)' : '16 single-choice questions (~2-3 min)',
      kolb: locale === 'pt' ? '12 questões de reflexão e prática (~3 min)' : '12 situational questions (~3 min)',
      gardner: locale === 'pt' ? '21 afirmações em escala Likert de 1 a 5 (~4-5 min)' : '21 statements on 1-5 scale (~4-5 min)',
    },
    {
      feature: locale === 'pt' ? 'Melhor Uso Prático' : 'Best Practical Use',
      vark: locale === 'pt' ? 'Descobrir como formatar resumos, anotações, mapas mentais e materiais de revisão' : 'Selecting study media, formatting notes and review sheets',
      kolb: locale === 'pt' ? 'Entender como você resolve problemas, trabalha em equipe e lidera projetos' : 'Navigating projects, teamwork, problem-solving, and continuous learning',
      gardner: locale === 'pt' ? 'Identificar talentos vocacionais, hobbies, pontos fortes e caminhos de carreira' : 'Career strengths, cognitive superpowers, and vocational alignment',
    },
  ];

  const synergyExamples = [
    {
      title: locale === 'pt' ? 'O Criador Visual (VARK Visual + Kolb Divergente + Gardner Espacial)' : 'The Visual Creator',
      desc: locale === 'pt'
        ? 'Pensa em imagens tridimensionais, tem alta empatia e gera ideias inovadoras. Brilha em design, arquitetura, produto, UX e direção de arte.'
        : 'Thinks in 3D, excels at empathetic brainstorming. Shines in product design, architecture, and creative direction.',
      tags: ['Design', 'Inovação', 'Visual'],
    },
    {
      title: locale === 'pt' ? 'O Estrategista Analítico (VARK Leitura + Kolb Assimilador + Gardner Lógico)' : 'The Analytical Strategist',
      desc: locale === 'pt'
        ? 'Lê aprofundadamente, constrói modelos teóricos elegantes e baseia decisões em dados. Brilha em ciência de dados, pesquisa acadêmica, direito e engenharia de software.'
        : 'Reads deeply, constructs elegant mental models, and decides with data. Shines in software engineering, law, and research.',
      tags: ['Análise', 'Ciência', 'Lógica'],
    },
    {
      title: locale === 'pt' ? 'O Construtor Prático (VARK Cinestésico + Kolb Acomodador + Gardner Corporal/Interpessoal)' : 'The Agile Builder',
      desc: locale === 'pt'
        ? 'Aprende fazendo, adapta-se com rapidez a imprevistos e mobiliza equipes pelo exemplo. Brilha em empreendedorismo, gestão de operações, esportes e liderança de campo.'
        : 'Learns by hands-on execution, thrives under uncertainty. Shines in entrepreneurship, operations, and agile field leadership.',
      tags: ['Ação', 'Empreendedorismo', 'Prática'],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-indigo-50 border border-indigo-200/70 text-indigo-700 mb-3">
          <BarChart2 className="w-3.5 h-3.5" />
          <span>{locale === 'pt' ? 'Matriz Integrada SEI (360°)' : 'SEI Integrated Matrix'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
          {locale === 'pt' ? 'Sensorial (S) · Experiencial (E) · Inteligências (I)' : 'Sensory (S) · Experiential (E) · Intelligences (I)'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {locale === 'pt'
            ? 'Nenhum pilar sozinho abrange toda a riqueza do seu potencial. Juntos, os 3 eixos da Metodologia SEI formam um mapa tridimensional de alta fidelidade da sua cognição.'
            : 'No single framework captures human cognition completely. Together, they offer a rich 3D profile of how you absorb, transform, and master knowledge.'}
        </p>
      </div>

      {/* 3 Quick Model Cards summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Pilar S */}
        <div className="p-6 rounded-3xl bg-white border-2 border-blue-200/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1">{locale === 'pt' ? 'Pilar S · Sensorial' : 'Pillar S · Sensory'}</h3>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-3">
              {locale === 'pt' ? 'Porta de Entrada' : 'Sensory Input'}
            </span>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              {locale === 'pt'
                ? 'Responde à pergunta: "Por qual canal perceptivo (olhos, ouvidos, leitura ou movimento) a informação é absorvida com mais clareza?"'
                : 'Answers: "Through which sensory channel does information click easiest for me?"'}
            </p>
          </div>
          <button
            onClick={() => onSelectModel('vark')}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <span>{locale === 'pt' ? 'Fazer Pilar S (Sensorial)' : 'Take Pillar S Quiz'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Pilar E */}
        <div className="p-6 rounded-3xl bg-white border-2 border-emerald-200/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1">{locale === 'pt' ? 'Pilar E · Experiencial' : 'Pillar E · Experiential'}</h3>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-3">
              {locale === 'pt' ? 'Transformação Prática' : 'Experiential Loop'}
            </span>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              {locale === 'pt'
                ? 'Responde à pergunta: "Como eu processo o que vivencio, resolvo problemas práticos e tomo decisões no dia a dia?"'
                : 'Answers: "How do I process experiences into theories and actionable experiments?"'}
            </p>
          </div>
          <button
            onClick={() => onSelectModel('kolb')}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
          >
            <span>{locale === 'pt' ? 'Fazer Pilar E (Experiencial)' : 'Take Pillar E Quiz'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Pilar I */}
        <div className="p-6 rounded-3xl bg-white border-2 border-purple-200/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1">{locale === 'pt' ? 'Pilar I · Inteligências' : 'Pillar I · Intelligences'}</h3>
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block mb-3">
              {locale === 'pt' ? 'Talentos Cognitivos' : 'Cognitive Strengths'}
            </span>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              {locale === 'pt'
                ? 'Responde à pergunta: "Em quais áreas de inteligência e habilidade mental meu cérebro demonstra maior fluência natural?"'
                : 'Answers: "In which domains of intelligence does my brain exhibit greatest natural fluency?"'}
            </p>
          </div>
          <button
            onClick={() => onSelectModel('gardner')}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          >
            <span>{locale === 'pt' ? 'Fazer Pilar I (Inteligências)' : 'Take Pillar I Quiz'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Side by side comparison table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-12">
        <div className="p-6 sm:p-8 bg-slate-900 text-white">
          <h2 className="text-xl font-black tracking-tight mb-1">
            {locale === 'pt' ? 'Tabela Comparativa dos 3 Pilares SEI' : 'Direct Comparison Table'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {locale === 'pt'
              ? 'Veja como cada pilar da metodologia responde a perguntas indispensáveis da aprendizagem.'
              : 'Detailed breakdown across educational dimensions.'}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-black">
                <th className="p-4 sm:p-5 w-1/4">{locale === 'pt' ? 'Critério' : 'Criteria'}</th>
                <th className="p-4 sm:p-5 w-1/4 text-blue-700">{locale === 'pt' ? 'Pilar S · Sensorial' : 'Pillar S · Sensory'}</th>
                <th className="p-4 sm:p-5 w-1/4 text-emerald-700">{locale === 'pt' ? 'Pilar E · Experiencial' : 'Pillar E · Experiential'}</th>
                <th className="p-4 sm:p-5 w-1/4 text-purple-700">{locale === 'pt' ? 'Pilar I · Inteligências' : 'Pillar I · Intelligences'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-900 bg-slate-50/40">{row.feature}</td>
                  <td className="p-4 sm:p-5 text-slate-700 leading-relaxed">{row.vark}</td>
                  <td className="p-4 sm:p-5 text-slate-700 leading-relaxed">{row.kolb}</td>
                  <td className="p-4 sm:p-5 text-slate-700 leading-relaxed">{row.gardner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Synergies Section */}
      <div className="bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-white rounded-3xl border border-indigo-100 p-6 sm:p-10 shadow-lg mb-12">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>{locale === 'pt' ? 'Sinergias & Arquétipos' : 'Synergies & Archetypes'}</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
            {locale === 'pt' ? 'Como Combinar Seus Resultados' : 'How to Integrate Your Results'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {locale === 'pt'
              ? 'Ao cruzar seus estilos nos três testes, surgem perfis de alta precisão que explicam tanto suas preferências de estudo quanto seu modo de trabalhar.'
              : 'Cross-referencing your results reveals composite superpowers for both learning and professional performance.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {synergyExamples.map((syn, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-2">{syn.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{syn.desc}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {syn.tags.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
