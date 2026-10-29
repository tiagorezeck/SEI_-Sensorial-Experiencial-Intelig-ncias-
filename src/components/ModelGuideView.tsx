/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { ModelType } from '../data/quizData';
import {
  BookOpen,
  ArrowRight,
  Eye,
  Compass,
  Sparkles,
  Award,
  Lightbulb,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface GuideSection {
  heading: string;
  content?: string;
  items?: { term: string; desc: string }[];
}

interface GuideData {
  title: string;
  subtitle: string;
  color: string;
  overview: string;
  sections: GuideSection[];
}

interface ModelGuideViewProps {
  initialModel?: ModelType;
  onStartQuiz: (model: ModelType) => void;
}

export default function ModelGuideView({ initialModel = 'vark', onStartQuiz }: ModelGuideViewProps) {
  const { locale } = useLocale();
  const [activeTab, setActiveTab] = useState<ModelType>(initialModel);

  const guidesMap: Record<ModelType, GuideData> = {
    vark: {
      title: locale === 'pt' ? 'Guia Completo do Modelo VARK' : 'Complete VARK Guide',
      subtitle: locale === 'pt' ? 'Neil Fleming, 1987 — Universidade de Lincoln, Nova Zelândia' : 'Neil Fleming, 1987 — Lincoln University, New Zealand',
      color: 'blue',
      overview: locale === 'pt'
        ? 'O modelo VARK foi desenvolvido por Neil Fleming como uma resposta prática às dificuldades que ele observava nas salas de aula: professores brilhantes nem sempre conseguiam alcançar todos os alunos, pois ensinavam usando apenas uma modalidade sensorial.'
        : 'The VARK model was formulated by Neil Fleming in 1987 as a practical inventory for sensory preferences in classrooms.',
      sections: [
        {
          heading: locale === 'pt' ? 'O que significa a sigla VARK?' : 'What does VARK stand for?',
          items: [
            {
              term: 'V — Visual',
              desc: locale === 'pt'
                ? 'Informações apresentadas em formatos gráficos: diagramas, mapas conceituais, fluxogramas, gráficos em setores e códigos de cores. Nota importante: Fleming especificava que VARK Visual não inclui textos e vídeos puramente falados, mas sim esquemas gráficos e espaciais.'
                : 'Information displayed in diagrams, mind maps, flowcharts, and spatial representations.'
            },
            {
              term: 'A — Auditory (Auditivo)',
              desc: locale === 'pt'
                ? 'Informações ouvidas ou faladas: aulas expositivas com diálogo, debates em sala, podcasts, gravações de áudio e a técnica de explicar em voz alta para entender.'
                : 'Spoken explanations, group debates, podcasts, and talking through concepts out loud.'
            },
            {
              term: 'R — Read / Write (Leitura / Escrita)',
              desc: locale === 'pt'
                ? 'Informações na forma de palavras escritas: livros didáticos, ensaios, relatórios, anotações de aula, dicionários, manuais técnicos e resumos escritos estruturados.'
                : 'Printed words, textbooks, articles, bulleted lists, and detailed note-taking.'
            },
            {
              term: 'K — Kinesthetic (Cinestésico / Prático)',
              desc: locale === 'pt'
                ? 'Aprendizagem por experiência direta, simulações da vida real, laboratórios, prática repetida, estudos de caso e conexão com situações cotidianas concretas.'
                : 'Hands-on practice, simulated tasks, field trials, physical demonstrations, and trial-and-error.'
            }
          ]
        },
        {
          heading: locale === 'pt' ? 'O Fenômeno Multimodal' : 'The Multimodal Phenomenon',
          content: locale === 'pt'
            ? 'Cerca de 60% a 70% da população adulta apresenta perfis multimodais (como V+A, V+R ou Equilibrado). Isso significa que a maioria das pessoas não depende de um único canal, mas sim da combinação sinérgica entre eles para alcançar compreensão profunda.'
            : 'Roughly 60-70% of people test as multimodal (e.g., V+A, V+R, or Balanced), benefiting from multi-sensory study approaches.'
        }
      ]
    },
    kolb: {
      title: locale === 'pt' ? 'Guia do Ciclo de Aprendizagem de Kolb' : 'Guide to Kolb Experiential Cycle',
      subtitle: locale === 'pt' ? 'David A. Kolb, 1984 — Teoria da Aprendizagem Experiencial' : 'David A. Kolb, 1984 — Experiential Learning Theory',
      color: 'emerald',
      overview: locale === 'pt'
        ? 'A teoria de David Kolb baseia-se nos trabalhos seminais de John Dewey, Kurt Lewin e Jean Piaget. Kolb concebeu o aprendizado não como um resultado fixo de aquisição passiva de fatos, mas como um processo contínuo e cíclico de transformação da experiência.'
        : 'David Kolb framed learning as a continuous four-stage cycle where experience is grasped and transformed into active knowledge.',
      sections: [
        {
          heading: locale === 'pt' ? 'As Duas Dimensões e os Quatro Polos' : 'The Two Core Axes',
          items: [
            {
              term: locale === 'pt' ? 'Eixo de Apreensão: Sentir vs. Pensar' : 'Grasping Axis: Feeling vs. Thinking',
              desc: locale === 'pt'
                ? 'Confronta a Experiência Concreta (EC: abertura para vivenciar de perto, sentir e se envolver humanamente) com a Conceituação Abstrata (CA: análise lógica, formulação de teorias e pensamento rigoroso).'
                : 'Concrete Experience (CE: feeling) vs. Abstract Conceptualization (AC: thinking).'
            },
            {
              term: locale === 'pt' ? 'Eixo de Transformação: Observar vs. Agir' : 'Transforming Axis: Watching vs. Doing',
              desc: locale === 'pt'
                ? 'Confronta a Observação Reflexiva (OR: pausar, assistir, refletir e examinar sob vários ângulos) com a Experimentação Ativa (EA: agir no mundo, testar rapidamente e aprender fazendo).'
                : 'Reflective Observation (RO: watching) vs. Active Experimentation (AE: doing).'
            }
          ]
        },
        {
          heading: locale === 'pt' ? 'Os 4 Estilos Resultantes' : 'The 4 Quadrant Styles',
          items: [
            {
              term: locale === 'pt' ? 'Divergente (EC + OR)' : 'Diverger (CE + RO)',
              desc: locale === 'pt'
                ? 'Forte em imaginação, empatia e geração de ideias ricas em brainstorming. Enxerga situações sob muitas perspectivas.'
                : 'Imaginative, empathetic, great at brainstorming and seeing multiple angles.'
            },
            {
              term: locale === 'pt' ? 'Assimilador (CA + OR)' : 'Assimilator (AC + RO)',
              desc: locale === 'pt'
                ? 'Habilidade para integrar dados em modelos conceituais lógicos e teorias elegantes. Prefere consistência conceitual à praticidade imediata.'
                : 'Excels at building robust theoretical models and organizing complex data logically.'
            },
            {
              term: locale === 'pt' ? 'Convergente (CA + EA)' : 'Converger (AC + AE)',
              desc: locale === 'pt'
                ? 'Focado em resolver problemas técnicos concretos, deduções lógicas e aplicação pragmática de hipóteses.'
                : 'Pragmatic problem-solver applying theories to technical questions and decision-making.'
            },
            {
              term: locale === 'pt' ? 'Acomodador (EC + EA)' : 'Accommodator (CE + AE)',
              desc: locale === 'pt'
                ? 'Aprende na prática imediata através de tentativa e erro, adapta-se com agilidade e gosta de novos desafios dinâmicos.'
                : 'Action-oriented, intuitive, agile in dynamic environments through trial-and-error.'
            }
          ]
        }
      ]
    },
    gardner: {
      title: locale === 'pt' ? 'Guia das Inteligências Múltiplas de Gardner' : 'Guide to Gardner Multiple Intelligences',
      subtitle: locale === 'pt' ? 'Howard Gardner, 1983 — Universidade de Harvard' : 'Howard Gardner, 1983 — Harvard University',
      color: 'purple',
      overview: locale === 'pt'
        ? 'No clássico livro "Estruturas da Mente" (1983), Howard Gardner desafiou frontalmente o conceito tradicional de QI (quociente de inteligência como uma métrica única e imutável). Ele propôs que o cérebro humano possui múltiplos módulos cognitivos relativamente autônomos.'
        : 'Howard Gardner revolutionized education in 1983 by showing that intelligence is not a single IQ number, but multiple distinct cognitive capacities.',
      sections: [
        {
          heading: locale === 'pt' ? 'As 7 Inteligências do Instrumento' : 'The 7 Mapped Intelligences',
          items: [
            {
              term: locale === 'pt' ? '1. Lógico-Matemática' : '1. Logical-Mathematical',
              desc: locale === 'pt' ? 'Cálculo, raciocínio hipotético-dedutivo, identificação de padrões e resolução de problemas analíticos.' : 'Deductive reasoning, pattern recognition, and scientific analysis.'
            },
            {
              term: locale === 'pt' ? '2. Linguística' : '2. Linguistic',
              desc: locale === 'pt' ? 'Sensibilidade para sintaxe, semântica, poesia, retórica e expressividade da língua falada e escrita.' : 'Sensitivity to language nuances, rhetoric, writing, and verbal expression.'
            },
            {
              term: locale === 'pt' ? '3. Espacial-Visual' : '3. Spatial-Visual',
              desc: locale === 'pt' ? 'Navegação tridimensional, artes gráficas, mapas mentais, desenho, maquetes e transformação espacial.' : '3D mental manipulation, maps, geometry, and visual design.'
            },
            {
              term: locale === 'pt' ? '4. Musical' : '4. Musical',
              desc: locale === 'pt' ? 'Apreciação e criação de ritmo, melodia, harmonia, timbre e sensibilidade a estímulos acústicos.' : 'Rhythmic patterns, pitch sensitivity, acoustic recall, and composition.'
            },
            {
              term: locale === 'pt' ? '5. Corporal-Cinestésica' : '5. Bodily-Kinesthetic',
              desc: locale === 'pt' ? 'Coordenação motora fina e grossa, destreza física, gesticulação e domínio corporal na aprendizagem.' : 'Physical control, manipulation of tools, and movement-based memory.'
            },
            {
              term: locale === 'pt' ? '6. Interpessoal' : '6. Interpersonal',
              desc: locale === 'pt' ? 'Capacidade de discernir intenções, humores e motivações de outras pessoas; liderança e cooperação.' : 'Empathy, social leadership, communication, and collaborative acumen.'
            },
            {
              term: locale === 'pt' ? '7. Intrapessoal' : '7. Intrapersonal',
              desc: locale === 'pt' ? 'Capacidade de autocompreensão, autorregulação emocional, autodisciplina e clareza sobre suas próprias metas.' : 'Self-awareness, emotional metacognition, and autonomous goal-setting.'
            }
          ]
        }
      ]
    }
  };

  const guide = guidesMap[activeTab];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 animate-in fade-in duration-300">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-indigo-50 border border-indigo-200/70 text-indigo-700 mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{locale === 'pt' ? 'Metodologia SEI' : 'SEI Methodology'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          {locale === 'pt' ? 'Guia Metodológico dos 3 Pilares SEI' : 'Theoretical Pillar Guides'}
        </h1>
        <p className="text-sm text-slate-600">
          {locale === 'pt'
            ? 'Entenda a fundamentação pedagógica e a origem científica de cada pilar da Metodologia SEI: Sensorial, Experiencial e Inteligências.'
            : 'Explore the origin, empirical background, and nuances of each SEI pillar.'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex rounded-2xl bg-slate-100 p-1.5 mb-8">
        <button
          onClick={() => setActiveTab('vark')}
          className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeTab === 'vark'
              ? 'bg-white text-blue-700 shadow-md ring-1 ring-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>{locale === 'pt' ? 'Pilar S (Sensorial)' : 'Pillar S (Sensory)'}</span>
        </button>

        <button
          onClick={() => setActiveTab('kolb')}
          className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeTab === 'kolb'
              ? 'bg-white text-emerald-700 shadow-md ring-1 ring-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>{locale === 'pt' ? 'Pilar E (Experiencial)' : 'Pillar E (Experiential)'}</span>
        </button>

        <button
          onClick={() => setActiveTab('gardner')}
          className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeTab === 'gardner'
              ? 'bg-white text-purple-700 shadow-md ring-1 ring-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{locale === 'pt' ? 'Pilar I (Inteligências)' : 'Pillar I (Intelligences)'}</span>
        </button>
      </div>

      {/* Guide Content Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 mb-8 space-y-8">
        <div>
          <span className="text-xs font-bold text-slate-400 block mb-1">{guide.subtitle}</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">{guide.title}</h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
            {guide.overview}
          </p>
        </div>

        {guide.sections.map((sec, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-indigo-600" />
              <span>{sec.heading}</span>
            </h3>

            {sec.content && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{sec.content}</p>
            )}

            {sec.items && (
              <div className="grid grid-cols-1 gap-3.5">
                {sec.items.map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <h4 className="font-bold text-sm text-slate-900 mb-1">{item.term}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Start Quiz CTA banner */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            {locale === 'pt' ? 'Pronto para descobrir seu perfil?' : 'Ready to discover your profile?'}
          </div>
          <button
            onClick={() => onStartQuiz(activeTab)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all"
          >
            <span>{locale === 'pt' ? `Fazer Teste de ${activeTab.toUpperCase()}` : `Start ${activeTab.toUpperCase()} Quiz`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
