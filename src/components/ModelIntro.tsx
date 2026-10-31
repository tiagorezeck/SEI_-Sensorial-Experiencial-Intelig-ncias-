/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLocale } from '../context/LocaleContext';
import { ModelType, modelsMetadata } from '../data/quizData';
import { localize } from '../lib/scoring';
import {
  Clock,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';

interface ModelIntroProps {
  model: ModelType;
  onStart: () => void;
  onBack: () => void;
}

export default function ModelIntro({ model, onStart, onBack }: ModelIntroProps) {
  const { locale, t } = useLocale();
  const meta = modelsMetadata[model];

  const highlights = {
    vark: [
      {
        title: locale === 'pt' ? 'Visual (V)' : 'Visual (V)',
        desc: locale === 'pt' ? 'Mapas mentais, diagramas, esquemas visuais, cores e organização espacial.' : 'Mind maps, diagrams, color coding, and visual layouts.',
        badge: 'bg-blue-100 text-blue-800'
      },
      {
        title: locale === 'pt' ? 'Auditivo (A)' : 'Auditory (A)',
        desc: locale === 'pt' ? 'Explicações faladas, podcasts, debates, leituras em voz alta e escuta ativa.' : 'Spoken lectures, podcasts, debates, and discussing concepts out loud.',
        badge: 'bg-indigo-100 text-indigo-800'
      },
      {
        title: locale === 'pt' ? 'Leitura / Escrita (R)' : 'Reading/Writing (R)',
        desc: locale === 'pt' ? 'Apostilas, textos aprofundados, anotações detalhadas, listas e resumos escritos.' : 'Textbooks, detailed note-taking, lists, and written summaries.',
        badge: 'bg-purple-100 text-purple-800'
      },
      {
        title: locale === 'pt' ? 'Cinestésico (K)' : 'Kinesthetic (K)',
        desc: locale === 'pt' ? 'Prática direta, exercícios aplicados, experimentos, simulações e tentativa e erro.' : 'Hands-on practice, labs, field tests, simulations, and real examples.',
        badge: 'bg-rose-100 text-rose-800'
      }
    ],
    kolb: [
      {
        title: locale === 'pt' ? 'Divergente' : 'Diverger',
        desc: locale === 'pt' ? 'Sentir + Observar. Criatividade, empatia, geração de ideias e visão ampla de cenários.' : 'Concrete Experience + Reflective Observation. Ideation and empathy.',
        badge: 'bg-emerald-100 text-emerald-800'
      },
      {
        title: locale === 'pt' ? 'Assimilador' : 'Assimilator',
        desc: locale === 'pt' ? 'Pensar + Observar. Modelos conceituais, teorias robustas e coerência lógica rigorosa.' : 'Abstract Conceptualization + Reflective Observation. Logic and theoretical models.',
        badge: 'bg-teal-100 text-teal-800'
      },
      {
        title: locale === 'pt' ? 'Convergente' : 'Converger',
        desc: locale === 'pt' ? 'Pensar + Agir. Soluções técnicas práticas, resolução de problemas e tomada de decisões.' : 'Abstract Conceptualization + Active Experimentation. Technical problem solving.',
        badge: 'bg-cyan-100 text-cyan-800'
      },
      {
        title: locale === 'pt' ? 'Acomodador' : 'Accommodator',
        desc: locale === 'pt' ? 'Sentir + Agir. Ação ágil no campo, adaptação a mudanças e aprendizagem pela prática direta.' : 'Concrete Experience + Active Experimentation. Fast field action and adaptation.',
        badge: 'bg-amber-100 text-amber-800'
      }
    ],
    gardner: [
      {
        title: locale === 'pt' ? '7 Inteligências Mapeadas' : '7 Mapped Intelligences',
        desc: locale === 'pt' ? 'Lógica, Linguística, Espacial, Musical, Corporal-Cinestésica, Interpessoal e Intrapessoal.' : 'Logical, Linguistic, Spatial, Musical, Bodily, Interpersonal, Intrapersonal.',
        badge: 'bg-purple-100 text-purple-800'
      },
      {
        title: locale === 'pt' ? 'Escala Likert 1 a 5' : '1 to 5 Likert Scale',
        desc: locale === 'pt' ? '21 afirmações intuitivas para avaliar suas tendências e talentos naturais.' : '21 statements measuring your spontaneous strengths and preferences.',
        badge: 'bg-pink-100 text-pink-800'
      }
    ]
  }[model];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-6 py-1"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{locale === 'pt' ? 'Voltar para a seleção de testes' : 'Back to model selection'}</span>
      </button>

      {/* Main Intro Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/20 text-indigo-200 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>{localize(meta.category, locale)}</span>
              <span>•</span>
              <span>{meta.author} ({meta.year})</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
              {localize(meta.title, locale)}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {localize(meta.subtitle, locale)}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
                <Clock className="w-4 h-4 text-indigo-300" />
                <span>{localize(meta.timeEstimate, locale)}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
                <BookOpen className="w-4 h-4 text-indigo-300" />
                <span>{localize(meta.questionCount, locale)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* What it measures */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              <span>{locale === 'pt' ? 'O que este teste avalia?' : 'What does this quiz measure?'}</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {localize(meta.whatItMeasures, locale)}
            </p>
          </section>

          {/* Highlights grid */}
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
              {locale === 'pt' ? 'Dimensões Avaliadas' : 'Assessed Dimensions'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-indigo-200 transition-all"
                >
                  <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-bold ${item.badge} mb-2`}>
                    {item.title}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Instructions and tips */}
          <section className="bg-indigo-50/60 rounded-2xl p-5 border border-indigo-100 flex items-start gap-3.5">
            <Lightbulb className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-indigo-950 space-y-1">
              <span className="font-bold">
                {locale === 'pt' ? 'Dica para um resultado preciso: ' : 'Tip for accurate results: '}
              </span>
              <p className="text-slate-700">
                {localize(meta.instructions, locale)} {locale === 'pt' ? 'Responda com espontaneidade, pensando em suas atitudes mais naturais no dia a dia, e não na resposta que considera "ideal".' : 'Answer naturally based on how you actually behave, rather than how you think you should.'}
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200/80 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-900 leading-relaxed">
              <span className="font-bold">{locale === 'pt' ? 'Aviso Ético: ' : 'Ethical note: '}</span>
              {localize(meta.disclaimer, locale)}
            </p>
          </section>

          {/* Bottom Action Bar */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onBack}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
            >
              {locale === 'pt' ? 'Voltar ao Início' : 'Back to Home'}
            </button>

            <button
              onClick={onStart}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-black text-sm text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg shadow-indigo-200 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{locale === 'pt' ? 'Começar Questionário Agora' : 'Start Assessment Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
