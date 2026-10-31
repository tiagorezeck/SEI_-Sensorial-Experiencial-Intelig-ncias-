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
  Award,
  Layers,
  Link2,
  BookMarked,
  Brain,
  CheckCircle2,
  Target,
} from 'lucide-react';
import ReportTabs from './ReportTabs';

interface GardnerResultViewProps {
  resultTypes: GardnerIntelligence[];
  scores: GardnerScores;
  onRetake: () => void;
  onSelectOtherModel: (model: 'vark' | 'kolb' | 'gardner') => void;
  onCompare: () => void;
}

interface SynergyInfo {
  title: string;
  synergy: string;
}

const SYNERGY_MAP: Record<string, { pt: SynergyInfo; en: SynergyInfo }> = {
  'LOG+LIN': {
    pt: {
      title: 'Lógico-Matemática + Linguística',
      synergy: 'Raciocínio discursivo estruturado e alta precisão conceitual. Capacidade de traduzir algoritmos e raciocínios lógicos complexos em argumentos escritos persuasivos e documentos técnicos impecáveis.',
    },
    en: {
      title: 'Logical + Linguistic',
      synergy: 'Structured discursive reasoning and high conceptual precision. Ability to translate complex logical frameworks into persuasive written arguments and clear technical docs.',
    },
  },
  'LOG+SPA': {
    pt: {
      title: 'Lógico-Matemática + Espacial',
      synergy: 'Pensamento sistêmico 3D e visão arquitetural. Facilidade para mapear dados em diagramas complexos, modelar geometrias e solucionar problemas de estrutura de sistemas.',
    },
    en: {
      title: 'Logical + Spatial',
      synergy: '3D systems thinking and architectural vision. Easily maps data onto complex diagrams, models geometries, and solves structural system problems.',
    },
  },
  'LOG+KIN': {
    pt: {
      title: 'Lógico-Matemática + Cinestésica',
      synergy: 'Engenharia prática e resolução no chão de fábrica. Aplica regras lógicas diretamente na montagem, testes de equipamentos, física experimental e simulação mecânica.',
    },
    en: {
      title: 'Logical + Kinesthetic',
      synergy: 'Practical engineering and hands-on problem solving. Applies logical rules directly to assembly, equipment testing, and mechanical simulation.',
    },
  },
  'LOG+INTER': {
    pt: {
      title: 'Lógico-Matemática + Interpessoal',
      synergy: 'Negociação baseada em dados e liderança analítica. Explica conceitos técnicos complexos de forma acessível e mobiliza equipes com clareza e evidências objetivas.',
    },
    en: {
      title: 'Logical + Interpersonal',
      synergy: 'Data-driven negotiation and analytical leadership. Explains complex technical concepts accessibly and mobilizes teams with objective evidence.',
    },
  },
  'LOG+INTRA': {
    pt: {
      title: 'Lógico-Matemática + Intrapessoal',
      synergy: 'Metacognição analítica e planejamento autônomo. Estabelece métricas e metas de desenvolvimento pessoal com lógica e autodisciplina impecáveis.',
    },
    en: {
      title: 'Logical + Intrapersonal',
      synergy: 'Analytical metacognition and autonomous planning. Sets metrics and personal goals with logic and strong self-discipline.',
    },
  },
  'LOG+MUS': {
    pt: {
      title: 'Lógico-Matemática + Musical',
      synergy: 'Percepção de padrões matemáticos e frequência sonoros. Identifica estruturas harmônicas, algoritmos sonoros e cadências abstratas em sistemas.',
    },
    en: {
      title: 'Logical + Musical',
      synergy: 'Mathematical pattern recognition and sound frequency awareness. Identifies harmonic structures, sound algorithms, and abstract cadences.',
    },
  },
  'LIN+SPA': {
    pt: {
      title: 'Linguística + Espacial',
      synergy: 'Comunicação visual e storytelling ilustrado. Facilidade para transformar relatórios e livros em infográficos, design editorial e apresentações visualmente marcantes.',
    },
    en: {
      title: 'Linguistic + Spatial',
      synergy: 'Visual communication and illustrated storytelling. Easily turns text reports into infographics, editorial design, and striking visual presentations.',
    },
  },
  'LIN+INTER': {
    pt: {
      title: 'Linguística + Interpessoal',
      synergy: 'Oratória, diplomacia e persuasão social. Domínio da palavra falada e escrita para inspirar grupos, mediar conflitos e conectar pessoas.',
    },
    en: {
      title: 'Linguistic + Interpersonal',
      synergy: 'Public speaking, diplomacy, and social persuasion. Mastery of spoken/written word to inspire groups, mediate conflict, and connect people.',
    },
  },
  'LIN+INTRA': {
    pt: {
      title: 'Linguística + Intrapessoal',
      synergy: 'Expressão autêntica e escrita reflexiva. Capacidade de traduzir sentimentos profundos e estados internos em diários, ensaios e reflexões com vocabulário rico.',
    },
    en: {
      title: 'Linguistic + Intrapersonal',
      synergy: 'Authentic expression and reflective writing. Translates deep emotions and internal states into journals, essays, and rich prose.',
    },
  },
  'LIN+KIN': {
    pt: {
      title: 'Linguística + Cinestésica',
      synergy: 'Expressividade corporal-verbal e atuação. Combina gestos marcantes à fala para ensinar, palestrar, atuar e conduzir treinamentos dinâmicos.',
    },
    en: {
      title: 'Linguistic + Kinesthetic',
      synergy: 'Physical-verbal expression and teaching. Combines body language with speech to instruct, present, act, and lead dynamic workshops.',
    },
  },
  'LIN+MUS': {
    pt: {
      title: 'Linguística + Musical',
      synergy: 'Métrica, poesia e fluência auditiva-verbal. Sensibilidade para o ritmo das palavras, sonoridade, pronúncia de idiomas e memorização por rimas.',
    },
    en: {
      title: 'Linguistic + Musical',
      synergy: 'Metrics, poetry, and auditory-verbal fluency. Sensitivity to word rhythm, phonetics, language acquisition, and rhyme memorization.',
    },
  },
  'SPA+KIN': {
    pt: {
      title: 'Espacial + Cinestésica',
      synergy: 'Inteligência visuo-motora e prototipagem física. Habilidade para desenhar, esculpir, construir maquetes e manipular objetos no espaço tridimensional com destreza.',
    },
    en: {
      title: 'Spatial + Kinesthetic',
      synergy: 'Visuomotor intelligence and physical prototyping. Ability to sketch, sculpt, build models, and manipulate objects skillfully in 3D space.',
    },
  },
  'SPA+INTER': {
    pt: {
      title: 'Espacial + Interpessoal',
      synergy: 'Facilitação gráfica e arquitetura de ambientes coletivos. Projeta espaços de convivência agradáveis e conduz dinâmicas de grupo usando painéis visuais compartilhados.',
    },
    en: {
      title: 'Spatial + Interpersonal',
      synergy: 'Graphic facilitation and social space design. Designs engaging communal environments and guides groups with shared visual boards.',
    },
  },
  'SPA+INTRA': {
    pt: {
      title: 'Espacial + Intrapessoal',
      synergy: 'Imaginação visual introspectiva. Constrói mapas mentais detalhados e simula cenários complexos de vida internamente na própria mente.',
    },
    en: {
      title: 'Spatial + Intrapersonal',
      synergy: 'Introspective visual imagination. Builds detailed mental maps and internalizes complex scenarios inside their own mind.',
    },
  },
  'SPA+MUS': {
    pt: {
      title: 'Espacial + Musical',
      synergy: 'Composição multimídia e sensibilidade estética. Associa cores, formas e luzes a ritmos e timbres sonoros de maneira artística e harmoniosa.',
    },
    en: {
      title: 'Spatial + Musical',
      synergy: 'Multimedia composition and aesthetic sensitivity. Associates colors, shapes, and lighting with audio rhythms and timbres.',
    },
  },
  'INTER+INTRA': {
    pt: {
      title: 'Interpessoal + Intrapessoal',
      synergy: 'Inteligência Emocional Plena (EQ). Profundo autoconhecimento combinado com empatia social, permitindo liderar a si mesmo e aos outros com equilíbrio notável.',
    },
    en: {
      title: 'Interpersonal + Intrapersonal',
      synergy: 'Full Emotional Intelligence (EQ). Deep self-awareness combined with social empathy, enabling balanced self-leadership and relationship management.',
    },
  },
  'INTER+KIN': {
    pt: {
      title: 'Interpessoal + Cinestésica',
      synergy: 'Liderança de campo, esportes em equipe e presença marcante. Coordena dinâmicas de grupo ativas com presença física acolhedora e empatia corporal.',
    },
    en: {
      title: 'Interpersonal + Kinesthetic',
      synergy: 'Field leadership, team sports, and physical presence. Guides active group dynamics with welcoming body language and kinesthetic empathy.',
    },
  },
  'INTER+MUS': {
    pt: {
      title: 'Interpessoal + Musical',
      synergy: 'Harmonia em grupo e escuta ativa apurada. Capta nuances sutis no tom de voz das pessoas nas conversas e cria ambientes colaborativos ritmados.',
    },
    en: {
      title: 'Interpersonal + Musical',
      synergy: 'Group harmony and refined active listening. Picks up subtle tone shifts in spoken dialogue and fosters rhythmic collaborative spaces.',
    },
  },
  'INTRA+KIN': {
    pt: {
      title: 'Intrapessoal + Cinestésica',
      synergy: 'Autodisciplina física, atletismo individual e foco prático. Domínio do próprio corpo e ritmo pessoal em atividades de concentração solo.',
    },
    en: {
      title: 'Intrapersonal + Kinesthetic',
      synergy: 'Physical self-discipline, individual athletics, and practical focus. Mastery over body and personal pacing during solo deep work.',
    },
  },
  'INTRA+MUS': {
    pt: {
      title: 'Intrapessoal + Musical',
      synergy: 'Foco através do som e autorregulação auditiva. Utiliza música e frequências sonoras para entrar em estado de fluxo (flow) e processar emoções internas.',
    },
    en: {
      title: 'Intrapersonal + Musical',
      synergy: 'Sound-based focus and auditory self-regulation. Uses music and soundscapes to enter deep flow states and process internal emotions.',
    },
  },
  'KIN+MUS': {
    pt: {
      title: 'Cinestésica + Musical',
      synergy: 'Ritmo corporal e coordenação motora musical. Conecta o ritmo do som ao movimento físico com precisão, destreza e sensibilidade auditiva.',
    },
    en: {
      title: 'Kinesthetic + Musical',
      synergy: 'Body rhythm and musical motor coordination. Syncs sound rhythms to physical movement with precision and auditory agility.',
    },
  },
};

const ALL_INTELLIGENCES_DETAILS: Record<
  GardnerIntelligence,
  {
    definition: { pt: string; en: string };
    howItWorks: { pt: string; en: string };
    thinkingStyle: { pt: string; en: string };
    bestApplications: { pt: string[]; en: string[] };
  }
> = {
  LOG: {
    definition: {
      pt: 'Capacidade de analisar problemas de forma rigorosa, realizar cálculos e deduzir regras lógicas e científicas.',
      en: 'Ability to analyze problems logically, carry out mathematical calculations, and investigate scientifically.',
    },
    howItWorks: {
      pt: 'Processa o conhecimento encadeando premissas de causa e efeito, algoritmos, categorizações e busca por evidências objetivas.',
      en: 'Processes knowledge by chaining cause-and-effect premises, algorithms, categorizations, and objective evidence.',
    },
    thinkingStyle: {
      pt: 'Raciocínio dedutivo refinado, estruturação de fluxogramas condicionais ("se... então...") e depuração de erros.',
      en: 'Refined deductive reasoning, conditional flowchart structuring ("if... then..."), and error debugging.',
    },
    bestApplications: {
      pt: ['Análise de dados e estatística', 'Programação e ciência da computação', 'Resolução de problemas complexos', 'Pesquisa científica e lógica'],
      en: ['Data analysis & statistics', 'Programming & CS', 'Complex problem solving', 'Scientific research & logic'],
    },
  },
  LIN: {
    definition: {
      pt: 'Sensibilidade apurada para o significado, sonoridade, estrutura e poder transformador das palavras.',
      en: 'Deep sensitivity to the meaning, sound, structure, and power of spoken and written words.',
    },
    howItWorks: {
      pt: 'Processa e retém o conhecimento articulando ideias em frases, resumos, metáforas, debates e argumentos textuais.',
      en: 'Processes and retains knowledge by articulating ideas into sentences, summaries, metaphors, and discussions.',
    },
    thinkingStyle: {
      pt: 'Pensamento verbal e discursivo, vocabulário amplo, facilidade para explicar conceitos em voz alta e redigir.',
      en: 'Verbal & discursive thinking, broad vocabulary, ease of explaining concepts out loud, and strong writing skills.',
    },
    bestApplications: {
      pt: ['Redação de artigos e resumos', 'Oratória e apresentações', 'Leitura crítica e síntese de textos', 'Ensino e explicação para terceiros'],
      en: ['Article & summary writing', 'Public speaking & presentations', 'Critical reading & text synthesis', 'Teaching & explaining to others'],
    },
  },
  SPA: {
    definition: {
      pt: 'Habilidade para reconhecer, criar, manipular e transformar padrões no espaço tridimensional e mental.',
      en: 'Ability to recognize, create, manipulate, and transform patterns in 3D and mental space.',
    },
    howItWorks: {
      pt: 'Processa o conhecimento convertendo conceitos abstratos em imagens, mapas conceituais, diagramas e layouts.',
      en: 'Processes knowledge by converting abstract concepts into images, concept maps, diagrams, and layouts.',
    },
    thinkingStyle: {
      pt: 'Pensamento visual em imagens e quadros, excelente memória espacial e sensibilidade a cores, formatos e proporções.',
      en: 'Visual thinking in scenes and boards, strong spatial memory, and acute sensitivity to colors, shapes, and layouts.',
    },
    bestApplications: {
      pt: ['Mapeamento mental e infográficos', 'Design de interfaces e arquitetura', 'Esboços visuais e diagramas', 'Visualização de dados 3D'],
      en: ['Mind mapping & infographics', 'UI design & architecture', 'Visual sketches & flowcharts', '3D data visualization'],
    },
  },
  MUS: {
    definition: {
      pt: 'Sensibilidade para reconhecer, criar e apreciar ritmos, tons de voz, timbres e padrões sonoros.',
      en: 'Sensitivity to recognizing, creating, and appreciating rhythms, vocal tones, timbres, and sound patterns.',
    },
    howItWorks: {
      pt: 'Processa informações codificando dados em cadências rítmicas, mnemônicos sonoros e frequências auditivas.',
      en: 'Processes information by encoding data into rhythmic cadences, auditory mnemonics, and sound frequencies.',
    },
    thinkingStyle: {
      pt: 'Sensibilidade a variações de entonação na fala, escuta atenta e uso do som e música para induzir estado de foco.',
      en: 'Sensitivity to vocal pitch shifts, active listening, and using sound/music to induce deep focus.',
    },
    bestApplications: {
      pt: ['Mnemônicos ritmados e rimas', 'Gravação e escuta de áudios', 'Aulas expositivas dialogadas', 'Estudo com frequências de foco'],
      en: ['Rhythmic mnemonics & rhymes', 'Audio notes & listening', 'Interactive audio lectures', 'Study sessions with binaural focus'],
    },
  },
  KIN: {
    definition: {
      pt: 'Capacidade de utilizar o próprio corpo para resolver problemas, construir objetos ou realizar tarefas com coordenação.',
      en: 'Capacity to use one’s body to solve problems, build artifacts, or execute tasks with motor coordination.',
    },
    howItWorks: {
      pt: 'Processa o conhecimento por meio do movimento físico, simulação tátil, experimentação prática e memória motora.',
      en: 'Processes knowledge through physical movement, tactile simulation, hands-on testing, and motor memory.',
    },
    thinkingStyle: {
      pt: 'Aprendizagem "mão na massa", necessidade de gesticulação e ação física para destravar raciocínios complexos.',
      en: 'Hands-on learning, need for physical gesture and action to unlock complex logical blocks.',
    },
    bestApplications: {
      pt: ['Laboratórios e projetos práticos', 'Flashcards em movimento e pausas ativas', 'Construção de protótipos', 'Simulações no mundo real'],
      en: ['Labs & practical projects', 'Active movement flashcards', 'Prototype building', 'Real-world simulations'],
    },
  },
  INTER: {
    definition: {
      pt: 'Facilidade para compreender motivações, intenções, emoções e estados de espírito de outras pessoas.',
      en: 'Acuity in understanding the motivations, intentions, emotions, and moods of other people.',
    },
    howItWorks: {
      pt: 'Processa e consolida o aprendizado através do diálogo, trabalho colaborativo em grupo, debates e trocas de ideias.',
      en: 'Processes and consolidates learning through dialogue, collaborative teamwork, debates, and idea exchange.',
    },
    thinkingStyle: {
      pt: 'Empatia aguçada, escuta ativa, liderança cooperativa e facilidade para aprender ensinando a colegas (teach-back).',
      en: 'Deep empathy, active listening, cooperative leadership, and learning fast by teaching peers (teach-back).',
    },
    bestApplications: {
      pt: ['Grupos de estudo e debates', 'Técnica de ensinar para aprender', 'Trabalhos em equipe multidisciplinares', 'Sessões de feedback e co-criação'],
      en: ['Study groups & debates', 'Teach-back technique', 'Multidisciplinary team projects', 'Feedback & co-creation sessions'],
    },
  },
  INTRA: {
    definition: {
      pt: 'Profundo autoconhecimento, consciência das próprias forças e limites, com alta capacidade de auto-orientação.',
      en: 'Deep self-knowledge, awareness of personal strengths and limits, with strong self-direction capacity.',
    },
    howItWorks: {
      pt: 'Processa o conhecimento por reflexão interna, diários de aprendizado, autoavaliação e estudo autônomo sem distrações.',
      en: 'Processes knowledge via internal reflection, learning journals, self-evaluation, and distraction-free solo study.',
    },
    thinkingStyle: {
      pt: 'Metacognição elevada, autodisciplina, independença e necessidade de alinhar o estudo a objetivos pessoais de vida.',
      en: 'High metacognition, self-discipline, independence, and aligning study with personal life goals.',
    },
    bestApplications: {
      pt: ['Estudo autônomo individual', 'Diários de bordo e autoavaliação', 'Planejamento de metas (OKRs)', 'Cursos no próprio ritmo'],
      en: ['Individual self-study', 'Learning journals & self-review', 'Personal goal setting (OKRs)', 'Self-paced courses'],
    },
  },
};

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

  // Identify active intelligences (score >= 4.0)
  const activeKeys = sortedIntelligences.filter((k) => (scores[k] || 0) >= 4.0);

  // If fewer than 2 scored >= 4.0, fallback to the top 2 highest scoring intelligences
  const effectiveActiveKeys =
    activeKeys.length >= 2 ? activeKeys : sortedIntelligences.slice(0, 2);

  // Helper to categorize score level according to user request
  const getLevelBadge = (score: number) => {
    if (score >= 4.0) {
      return {
        label: locale === 'pt' ? 'Atuante (Força Dominante)' : 'Active (Dominant Strength)',
        bg: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-black',
        levelText: locale === 'pt' ? 'Nota ≥ 4.0' : 'Score ≥ 4.0',
      };
    }
    if (score >= 3.0) {
      return {
        label: locale === 'pt' ? 'Potencial em Expansão' : 'Expanding Potential',
        bg: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
        levelText: locale === 'pt' ? 'Nota 3.0 a 3.9' : 'Score 3.0 to 3.9',
      };
    }
    return {
      label: locale === 'pt' ? 'Área de Oportunidade' : 'Opportunity Area',
      bg: 'bg-slate-100 text-slate-700 border-slate-300 font-semibold',
      levelText: locale === 'pt' ? 'Nota < 3.0' : 'Score < 3.0',
    };
  };

  // Find pairwise synergies for effective active keys
  const activePairSynergies: { pairKey: string; info: SynergyInfo }[] = [];
  for (let i = 0; i < effectiveActiveKeys.length; i++) {
    for (let j = i + 1; j < effectiveActiveKeys.length; j++) {
      const k1 = effectiveActiveKeys[i];
      const k2 = effectiveActiveKeys[j];
      const p1 = `${k1}+${k2}`;
      const p2 = `${k2}+${k1}`;

      if (SYNERGY_MAP[p1]) {
        const item = SYNERGY_MAP[p1];
        const info = (locale === 'en' ? item.en : item.pt);
        activePairSynergies.push({ pairKey: p1, info });
      } else if (SYNERGY_MAP[p2]) {
        const item = SYNERGY_MAP[p2];
        const info = (locale === 'en' ? item.en : item.pt);
        activePairSynergies.push({ pairKey: p2, info });
      }
    }
  }

  const handleShare = async () => {
    const title = localize(primaryProfile.title, locale);
    const text = t('results.sharePrompt', { title });
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Metodologia SEI - Pilar I (Gardner)',
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

    const fullText = `[Metodologia SEI - Pilar I: Inteligências Múltiplas]\n\n🌟 Força Principal: ${title}\n📝 Resumo: ${summary}\n\n📊 Ranking das 7 Inteligências:\n${rankingText}\n\n✨ Características:\n• ${traits}\n\n💡 Dicas de Estudo:\n${tips}\n\nDescubra seu perfil em: ${window.location.href}`;

    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 animate-in fade-in duration-300">
      {/* 3-Model Report Switcher Tabs */}
      <ReportTabs
        currentModel="gardner"
        onSwitchModel={(m) => onSelectOtherModel(m)}
        onViewComparison={onCompare}
      />

      {/* Hero Result Banner */}
      <div className="bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl mb-8 relative overflow-hidden border border-purple-800/40">
        <div className="relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/20 text-purple-200 mb-4">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('results.badge')} • Pilar I (Inteligências Múltiplas)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3 text-white">
            {localize(primaryProfile.title, locale)}
          </h1>

          {/* Strengths badges */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
              {locale === 'pt' ? 'Inteligências Atuantes (Nota ≥ 4.0):' : 'Active Intelligences (Score ≥ 4.0):'}
            </span>
            {effectiveActiveKeys.map((type) => (
              <span
                key={type}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white/20 border border-white/30 text-white shadow-xs"
              >
                <span>{intelligenceInfo[type].icon}</span>
                <span>{intelligenceInfo[type].name}</span>
                <span className="text-amber-300">({scores[type].toFixed(1)})</span>
              </span>
            ))}
          </div>

          <p className="text-base sm:text-lg text-purple-100 max-w-3xl leading-relaxed font-medium">
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

      {/* 1. Mapeamento Geral e Níveis das 7 Inteligências */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-purple-600" />
              <span>{locale === 'pt' ? 'Mapeamento Geral e Níveis do Pilar I' : '7 Intelligences Mapping'}</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {locale === 'pt'
                ? 'Atuante (≥ 4.0) • Potencial em Expansão (3.0 a 3.9) • Área de Oportunidade (< 3.0)'
                : 'Active (≥ 4.0) • Expanding Potential (3.0–3.9) • Opportunity Area (< 3.0)'}
            </p>
          </div>
          <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
            Escala 1.0 a 5.0 pts
          </span>
        </div>

        <div className="space-y-4">
          {sortedIntelligences.map((intKey, rank) => {
            const scoreVal = scores[intKey] || 0;
            const pct = Math.round((scoreVal / 5) * 100);
            const info = intelligenceInfo[intKey];
            const badge = getLevelBadge(scoreVal);

            return (
              <div key={intKey} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm font-bold">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-lg">{info.icon}</span>
                    <span className="text-slate-900 font-black text-base">{info.name}</span>
                    <span className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-2xs ${badge.bg}`}>
                      {badge.label}
                    </span>
                  </div>
                  <div className="font-mono text-sm sm:text-base font-black text-slate-900 self-end sm:self-auto">
                    {scoreVal.toFixed(1)} <span className="text-xs text-slate-400 font-normal">/ 5.0 pts</span>
                  </div>
                </div>

                <div className="w-full h-3 bg-slate-200/80 rounded-full overflow-hidden p-0.5 shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${info.barColor}`}
                    style={{ width: `${Math.max(pct, 6)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. CARD NOVO: INTER-RELAÇÕES ENTRE AS INTELIGÊNCIAS ATUANTES (NOTA ≥ 4.0) */}
      <div className="bg-gradient-to-br from-purple-50/90 via-indigo-50/50 to-white rounded-3xl border border-purple-200 shadow-xl p-6 sm:p-8 mb-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-purple-100">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-purple-600 text-white shadow-xs">
                <Link2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-slate-900">
                {locale === 'pt' ? 'Inter-relações das Inteligências Atuantes' : 'Inter-relations of Active Intelligences'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              {locale === 'pt'
                ? 'Análise das sinergias entre suas inteligências com pontuação igual ou superior a 4.0 (Atuantes)'
                : 'Synergy analysis for intelligences scoring 4.0 or above (Active)'}
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-600 text-white text-xs font-black uppercase tracking-wider shrink-0 shadow-xs">
            ★ {effectiveActiveKeys.length} Inteligências Atuantes
          </span>
        </div>

        {/* Active badges list */}
        <div className="flex flex-wrap items-center gap-2 p-4 rounded-2xl bg-white/80 border border-purple-150">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            {locale === 'pt' ? 'Núcleo Atuante:' : 'Active Core:'}
          </span>
          {effectiveActiveKeys.map((k) => (
            <span
              key={k}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-100/90 text-purple-900 text-xs font-black border border-purple-250"
            >
              <span>{intelligenceInfo[k].icon}</span>
              <span>{intelligenceInfo[k].name}</span>
              <span className="text-purple-700">({scores[k].toFixed(1)})</span>
            </span>
          ))}
        </div>

        {/* Synergies Cards */}
        <div className="space-y-4">
          {activePairSynergies.map((s, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-purple-150 shadow-xs space-y-2 transition-all hover:border-purple-300"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-purple-700">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Sinergia: {s.info.title}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                {s.info.synergy}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CARD NOVO: FUNCIONALIDADE DAS 7 INTELIGÊNCIAS MÚLTIPLAS */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 mb-8 space-y-8">
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <BookMarked className="w-6 h-6 text-purple-600" />
            <span>Funcionalidade das 7 Inteligências Múltiplas</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Entenda o significado, o funcionamento cerebral e as aplicações práticas de cada uma das 7 inteligências
          </p>
        </div>

        <div className="space-y-6">
          {sortedIntelligences.map((intKey) => {
            const info = intelligenceInfo[intKey];
            const detail = ALL_INTELLIGENCES_DETAILS[intKey];
            const scoreVal = scores[intKey] || 0;
            const badge = getLevelBadge(scoreVal);

            return (
              <div
                key={intKey}
                className="p-6 rounded-3xl bg-slate-50/80 border border-slate-200/90 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <span className="p-3 rounded-2xl bg-white border border-slate-200 text-2xl shadow-2xs">
                      {info.icon}
                    </span>
                    <div>
                      <h3 className="text-xl font-black text-slate-900">
                        {info.name}
                      </h3>
                      <span className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border inline-block mt-0.5 ${badge.bg}`}>
                        {badge.label}
                      </span>
                    </div>
                  </div>

                  <div className="font-mono text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full bg-white border border-slate-300 text-slate-800 shrink-0 self-start sm:self-auto shadow-2xs">
                    Pontuação: <strong className="text-purple-700 text-base">{scoreVal.toFixed(1)}</strong> / 5.0
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* O que é */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-purple-600" />
                      <span>O que é esta inteligência</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {locale === 'pt' ? detail.definition.pt : detail.definition.en}
                    </p>
                  </div>

                  {/* Como Funciona no Cérebro */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Como funciona o processamento</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {locale === 'pt' ? detail.howItWorks.pt : detail.howItWorks.en}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Estilo de Pensamento */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>Estilo de Pensamento Típico</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {locale === 'pt' ? detail.thinkingStyle.pt : detail.thinkingStyle.en}
                    </p>
                  </div>

                  {/* Melhores Aplicações Práticas */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Aplicações Práticas Recomendadas</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {(locale === 'pt' ? detail.bestApplications.pt : detail.bestApplications.en).map((app, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg text-xs bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200">
                          ✓ {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Primary Intelligence In-Depth Details */}
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
            <span>{locale === 'pt' ? 'Fazer Pilar S (VARK)' : 'Take VARK Quiz'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSelectOtherModel('kolb')}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
          >
            <span>{locale === 'pt' ? 'Fazer Pilar E (Kolb)' : 'Take Kolb Quiz'}</span>
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
