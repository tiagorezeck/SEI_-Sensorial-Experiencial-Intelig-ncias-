/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * LearnerType Brasil - Base de Dados de Estilos de Aprendizagem
 * Inclui os três modelos pedagógicos consagrados: VARK, Kolb e Gardner.
 * Totalmente traduzido e adaptado para o Português do Brasil com suporte multilíngue (PT-BR, EN, KO).
 */

export type Locale = 'pt' | 'en' | 'ko';
export type ModelType = 'vark' | 'kolb' | 'gardner';

export type VarkModality = 'V' | 'A' | 'R' | 'K';
export type KolbDimension = 'CE' | 'RO' | 'AC' | 'AE';
export type GardnerIntelligence = 'LOG' | 'LIN' | 'SPA' | 'MUS' | 'KIN' | 'INTER' | 'INTRA';

export interface LocalizedString {
  pt: string;
  en: string;
  ko: string;
}

export interface LocalizedStringArray {
  pt: string[];
  en: string[];
  ko: string[];
}

export interface QuestionOption<T = string> {
  id: string;
  text: LocalizedString;
  tag: T;
}

export interface SingleSelectQuestion<T = string> {
  id: string;
  prompt: LocalizedString;
  options: QuestionOption<T>[];
}

export interface LikertQuestion {
  id: string;
  tag: GardnerIntelligence;
  prompt: LocalizedString;
}

export interface ResultProfile {
  title: LocalizedString;
  summary: LocalizedString;
  traits: LocalizedStringArray;
  study_tips: LocalizedStringArray;
  recommended_formats: LocalizedStringArray;
}

export interface ModelMetadata {
  id: ModelType;
  name: LocalizedString;
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  timeEstimate: LocalizedString;
  questionCount: LocalizedString;
  author: string;
  year: string;
  category: LocalizedString;
  disclaimer: LocalizedString;
  whatItMeasures: LocalizedString;
  instructions: LocalizedString;
  tags: string[];
}

export const modelsMetadata: Record<ModelType, ModelMetadata> = {
  vark: {
    id: 'vark',
    name: { pt: 'Pilar S · Canais Sensoriais', en: 'Pillar S · Sensory Modalities', ko: 'S기둥 · 감각 양식' },
    title: { pt: 'Pilar S — Canais Sensoriais de Aprendizagem', en: 'Pillar S — Sensory Learning Modalities', ko: 'S기둥 — 감각 양식 모델' },
    subtitle: { pt: 'Como seu cérebro capta e assimila estímulos (Visual, Auditivo, Leitura, Prática)', en: 'How your senses capture incoming information', ko: '감각 양식 중심의 정보 흡수' },
    description: {
      pt: 'Descubra sua forma primária de captar informações: Visual (V), Auditiva (A), por Leitura/Escrita (R) ou Cinestésica (K). Identifica também perfis multimodais como V+A, V+K ou Equilibrado.',
      en: 'Discover whether you learn best through Visual, Auditory, Reading/Writing, or Kinesthetic modalities, including multimodal profiles.',
      ko: '시각(V), 청각(A), 읽기/쓰기(R), 체감(K) 중 선호하는 감각 양식을 파악합니다.'
    },
    timeEstimate: { pt: '~2–3 min', en: '~2–3 min', ko: '~2-3분' },
    questionCount: { pt: '16 questões de escolha única', en: '16 single-choice questions', ko: '16개 문항 (단일 선택)' },
    author: 'Origem: Neil Fleming',
    year: '1987',
    category: { pt: 'Pilar S · Sensorial', en: 'Pillar S · Sensory', ko: 'S기둥 · 감각' },
    disclaimer: {
      pt: 'Este questionário é uma ferramenta educacional para autorreflexão e melhoria de métodos de estudo. Não constitui diagnóstico médico, psicológico ou de déficit de aprendizagem.',
      en: 'This result is for self-reflection and learning guidance, not a diagnosis.',
      ko: '이 결과는 자기 이해를 돕기 위한 참고용입니다. 진단 목적이 아닙니다.'
    },
    whatItMeasures: {
      pt: 'Mede as preferências nos quatro canais sensoriais: estímulos visuais e esquemas (Visual), escuta e diálogo (Auditivo), palavras escritas e listas (Leitura/Escrita) ou movimento e prática física (Cinestésico).',
      en: 'Measures your preference among four sensory modalities: Visual, Auditory, Reading/Writing, and Kinesthetic.',
      ko: '시각, 청각, 읽기/쓰기, 체감 네 가지 감각 양식 중 어떤 경로로 정보를 가장 효율적으로 받아들이는지 측정합니다.'
    },
    instructions: {
      pt: 'Para cada situação, escolha a alternativa que melhor descreve sua reação natural mais frequente.',
      en: 'Choose the single option that best describes your natural reaction in each situation.',
      ko: '각 문항에서 가장 나와 가까운 1개를 선택하세요.'
    },
    tags: ['Sensorial', 'Visual', 'Auditivo', 'Leitura', 'Prática']
  },
  kolb: {
    id: 'kolb',
    name: { pt: 'Pilar E · Ciclo Experiencial', en: 'Pillar E · Experiential Cycle', ko: 'E기둥 · 경험 순환' },
    title: { pt: 'Pilar E — Ciclo de Aprendizagem Experiencial', en: 'Pillar E — Experiential Learning Cycle', ko: 'E기둥 — 경험 학습 사이클' },
    subtitle: { pt: 'Como você transforma vivências em ação prática (Sentir, Observar, Pensar, Agir)', en: 'How you process experiences and make decisions', ko: '경험을 통한 순환적 학습과 변환' },
    description: {
      pt: 'Mapeia sua posição no ciclo de quatro etapas entre apreensão (Sentir vs. Pensar) e transformação (Observar vs. Agir), revelando seu estilo de ação: Divergente, Assimilador, Convergente ou Acomodador.',
      en: 'Understand how you grasp and transform experience: Diverger, Assimilator, Converger, or Accommodator.',
      ko: '경험적 학습 과정에서 경험을 어떻게 처리하고 변환하는지에 따라 4가지 학습 스타일로 분류합니다.'
    },
    timeEstimate: { pt: '~3 min', en: '~3 min', ko: '~3분' },
    questionCount: { pt: '12 questões situacionais', en: '12 situational questions', ko: '12개 문항 (단일 선택)' },
    author: 'Origem: David Kolb',
    year: '1984',
    category: { pt: 'Pilar E · Experiencial', en: 'Pillar E · Experiential', ko: 'E기둥 · 경험' },
    disclaimer: {
      pt: 'Os estilos do ciclo experiencial são preferências dinâmicas que podem se desenvolver e mudar com a experiência. Use como guia para enriquecer todas as etapas do seu aprendizado.',
      en: 'Experiential styles are preferences that can evolve. Use this as educational self-reflection.',
      ko: '이 결과는 자기 이해를 돕기 위한 참고용이며 진단 목적이 아닙니다.'
    },
    whatItMeasures: {
      pt: 'Mede as duas dimensões fundamentais do aprendizado: como você apreende a informação (Sentir vs. Pensar) e como você a processa (Observar vs. Agir).',
      en: 'Measures two fundamental learning dimensions: grasping experience (Feeling vs. Thinking) and transforming experience (Watching vs. Doing).',
      ko: '구체적 경험(CE), 반성적 관찰(RO), 추상적 개념화(AC), 능동적 실험(AE) 네 차원의 균형을 측정합니다.'
    },
    instructions: {
      pt: 'Selecione a opção que melhor reflete como você costuma agir ao aprender ou solucionar desafios.',
      en: 'Select the option that best reflects how you approach challenges and learning.',
      ko: '각 문항에서 자신에게 가장 잘 맞는 옵션 1개를 선택하세요.'
    },
    tags: ['Experiencial', 'Reflexão', 'Ação', 'Teoria', 'Prática']
  },
  gardner: {
    id: 'gardner',
    name: { pt: 'Pilar I · Inteligências Múltiplas', en: 'Pillar I · Multiple Intelligences', ko: 'I기둥 · 다중 지능' },
    title: { pt: 'Pilar I — Teoria das Inteligências Múltiplas', en: 'Pillar I — Multiple Intelligences Theory', ko: 'I기둥 — 다중 지능 이론' },
    subtitle: { pt: 'Mapeamento de 7 domínios de competência cognitiva e talento natural', en: '7 domains of human cognitive ability', ko: '7가지 인지 영역의 강점' },
    description: {
      pt: 'A cognição não é um número único. Descubra seus maiores pontos fortes nas 7 dimensões: Lógico-Matemática, Linguística, Espacial, Musical, Cinestésica, Interpessoal e Intrapessoal.',
      en: 'Intelligence is multifaceted. Identify your top strengths among 7 distinct intelligences.',
      ko: '인간의 지능을 독립된 영역으로 분류하여 논리, 언어, 공간, 음악, 신체, 대인, 자기성찰 강점을 측정합니다.'
    },
    timeEstimate: { pt: '~4–5 min', en: '~4–5 min', ko: '~4-5분' },
    questionCount: { pt: '21 afirmações (Escala 1 a 5)', en: '21 statements (1-5 Likert scale)', ko: '21개 문항 (5점 척도)' },
    author: 'Origem: Howard Gardner',
    year: '1983',
    category: { pt: 'Pilar I · Inteligências', en: 'Pillar I · Intelligences', ko: 'I기둥 · 지능' },
    disclaimer: {
      pt: 'Todas as pessoas possuem as 7 inteligências em graus variados e todas podem ser desenvolvidas ao longo da vida através de prática intencional.',
      en: 'Everyone has all intelligences to varying degrees and can cultivate them through practice.',
      ko: '이 결과는 개인의 잠재력과 선호도를 발견하기 위한 참고용이며 단일 IQ 테스트가 아닙니다.'
    },
    whatItMeasures: {
      pt: 'Avalia a intensidade relativa de 7 inteligências humanas independentes, apontando seus dois ou três pontos mais fortes.',
      en: 'Assesses your relative strengths across 7 independent human intelligences.',
      ko: '논리·수학, 언어, 공간, 음악, 신체·운동, 대인관계, 자기성찰 등 7대 지능 영역의 상대적 발달도를 측정합니다.'
    },
    instructions: {
      pt: 'Indique o quanto cada afirmação tem a ver com você, em uma escala de 1 (Discordo totalmente) a 5 (Concordo totalmente).',
      en: 'Rate how much each statement describes you on a 1-5 scale (1 = Strongly disagree, 5 = Strongly agree).',
      ko: '각 문장에 대해 나와의 일치 정도를 1(전혀 아니다)부터 5(매우 그렇다)까지 평가하세요.'
    },
    tags: ['Múltiplas Inteligências', 'Cognição', 'Talentos', 'Autoconhecimento']
  }
};

export const varkQuestions: SingleSelectQuestion<VarkModality>[] = [
  {
    "id": "VARK-01",
    "prompt": {
      "pt": "Ao começar a estudar um assunto novo, geralmente eu…",
      "en": "When I start learning a new topic, I usually…",
      "ko": "새로운 주제를 배울 때, 보통 나는…"
    },
    "options": [
      {
        "id": "VARK-01-A",
        "tag": "V",
        "text": {
          "pt": "Busco esquemas, infográficos e diagramas para ter a visão geral da estrutura.",
          "en": "I look for diagrams to see the overall structure.",
          "ko": "그림/도표로 전체 흐름부터 잡는다."
        }
      },
      {
        "id": "VARK-01-B",
        "tag": "A",
        "text": {
          "pt": "Compreendo melhor ouvindo alguém explicar e conversando sobre o assunto.",
          "en": "I understand by listening and talking it through.",
          "ko": "누가 설명해주면 듣고 대화하면서 이해한다."
        }
      },
      {
        "id": "VARK-01-C",
        "tag": "R",
        "text": {
          "pt": "Leio resumos escritos, definições e anoto para organizar as ideias.",
          "en": "I read a written summary/definitions and organize it.",
          "ko": "글로 된 요약/정의를 읽으면서 정리한다."
        }
      },
      {
        "id": "VARK-01-D",
        "tag": "K",
        "text": {
          "pt": "Prefiro colocar a mão na massa ou seguir um exemplo prático para pegar o jeito.",
          "en": "I try it hands-on or follow an example to get the feel.",
          "ko": "일단 해보거나 예시를 따라 하며 감을 잡는다."
        }
      }
    ]
  },
  {
    "id": "VARK-02",
    "prompt": {
      "pt": "Para fixar o que aprendi em uma aula ou reunião importante…",
      "en": "To remember what I learned in a class/meeting…",
      "ko": "수업/회의 내용을 오래 기억하려면…"
    },
    "options": [
      {
        "id": "VARK-02-A",
        "tag": "V",
        "text": {
          "pt": "Recursos visuais como slides, gráficos e códigos de cores ajudam muito.",
          "en": "Visuals like slides, charts, and color cues help.",
          "ko": "슬라이드, 차트, 색 표시 같은 시각 자료가 도움이 된다."
        }
      },
      {
        "id": "VARK-02-B",
        "tag": "A",
        "text": {
          "pt": "Ouvir novamente uma gravação ou resumir em voz alta funciona melhor.",
          "en": "Re-listening or summarizing out loud helps.",
          "ko": "녹음해서 다시 듣거나 핵심을 말로 정리하면 좋다."
        }
      },
      {
        "id": "VARK-02-C",
        "tag": "R",
        "text": {
          "pt": "Anotações detalhadas e reler meus próprios resumos funcionam melhor.",
          "en": "Detailed notes and rereading work best.",
          "ko": "노트를 꼼꼼히 적고 다시 읽어보면 기억이 난다."
        }
      },
      {
        "id": "VARK-02-D",
        "tag": "K",
        "text": {
          "pt": "Colocar em prática através de exercícios, projetos ou tarefas me ajuda a fixar.",
          "en": "Applying it through practice/tasks makes it stick.",
          "ko": "과제/실습으로 직접 적용해보면 잘 기억난다."
        }
      }
    ]
  },
  {
    "id": "VARK-03",
    "prompt": {
      "pt": "Ao navegar para um lugar novo onde nunca fui antes, eu…",
      "en": "When finding my way somewhere new, I…",
      "ko": "처음 가는 곳을 찾아갈 때 나는…"
    },
    "options": [
      {
        "id": "VARK-03-A",
        "tag": "V",
        "text": {
          "pt": "Prefiro olhar mapas e a visão visual do GPS na tela.",
          "en": "Prefer maps/visual navigation screens.",
          "ko": "지도를 보거나 동선이 보이는 화면을 참고한다."
        }
      },
      {
        "id": "VARK-03-B",
        "tag": "A",
        "text": {
          "pt": "Sigo instruções por voz ('vire à direita ao ver o semáforo').",
          "en": "Follow spoken directions (“turn here when you see…”).",
          "ko": "“어디서 꺾고, 뭐가 보이면…” 같은 설명을 듣고 따라간다."
        }
      },
      {
        "id": "VARK-03-C",
        "tag": "R",
        "text": {
          "pt": "Sigo instruções escritas passo a passo com referências de ruas.",
          "en": "Follow written directions step-by-step.",
          "ko": "주소/길 안내를 글로 읽고 그대로 따라간다."
        }
      },
      {
        "id": "VARK-03-D",
        "tag": "K",
        "text": {
          "pt": "Aprendo fazendo o trajeto uma vez e memorizando o caminho pelo movimento.",
          "en": "Learn by going once and building memory through movement.",
          "ko": "한 번 직접 가보면서 몸으로 익히는 편이다."
        }
      }
    ]
  },
  {
    "id": "VARK-04",
    "prompt": {
      "pt": "Ao aprender a usar um novo aplicativo ou ferramenta digital, prefiro…",
      "en": "When learning a new app/tool, I prefer…",
      "ko": "새로운 앱/도구를 배울 때 가장 편한 건…"
    },
    "options": [
      {
        "id": "VARK-04-A",
        "tag": "V",
        "text": {
          "pt": "Ver capturas de tela, tutoriais ilustrados e demonstrações visuais.",
          "en": "Following screenshots/visual walkthroughs.",
          "ko": "화면 캡처/짧은 튜토리얼 이미지 보면서 따라 하기"
        }
      },
      {
        "id": "VARK-04-B",
        "tag": "A",
        "text": {
          "pt": "Ter alguém me orientando verbalmente enquanto eu acompanho.",
          "en": "Someone guiding me verbally as I follow along.",
          "ko": "옆에서 말로 알려주는 걸 들으면서 따라 하기"
        }
      },
      {
        "id": "VARK-04-C",
        "tag": "R",
        "text": {
          "pt": "Ler o manual, o guia de instruções ou a documentação primeiro.",
          "en": "Reading the guide/docs first.",
          "ko": "사용법 문서/가이드를 읽고 이해한 뒤 시작하기"
        }
      },
      {
        "id": "VARK-04-D",
        "tag": "K",
        "text": {
          "pt": "Sair clicando e explorando por tentativa e erro até descobrir.",
          "en": "Clicking around and learning by trial and error.",
          "ko": "일단 눌러보며 시행착오로 익히기"
        }
      }
    ]
  },
  {
    "id": "VARK-05",
    "prompt": {
      "pt": "Ao me preparar para uma prova, exame ou apresentação importante…",
      "en": "When preparing for an exam/presentation…",
      "ko": "시험/발표 준비할 때 나는…"
    },
    "options": [
      {
        "id": "VARK-05-A",
        "tag": "V",
        "text": {
          "pt": "Mapeio tudo com mapas mentais, esquemas e quadros visuais.",
          "en": "I map it out with diagrams/mind maps.",
          "ko": "마인드맵/도식으로 한 번에 정리한다."
        }
      },
      {
        "id": "VARK-05-B",
        "tag": "A",
        "text": {
          "pt": "Explico o conteúdo em voz alta para outra pessoa ou para mim mesmo.",
          "en": "I explain it out loud to someone (or to myself).",
          "ko": "소리 내서 설명하거나 누군가에게 말로 풀어본다."
        }
      },
      {
        "id": "VARK-05-C",
        "tag": "R",
        "text": {
          "pt": "Escrevo resumos estruturados e releio várias vezes.",
          "en": "I write summaries and reread them.",
          "ko": "요약 노트를 쓰고 반복해서 읽는다."
        }
      },
      {
        "id": "VARK-05-D",
        "tag": "K",
        "text": {
          "pt": "Treino resolvendo exercícios práticos ou ensaiando a apresentação física.",
          "en": "I practice with problems or rehearsal.",
          "ko": "문제를 풀거나 리허설처럼 실제로 연습한다."
        }
      }
    ]
  },
  {
    "id": "VARK-06",
    "prompt": {
      "pt": "Para compreender um conceito complexo e abstrato, eu…",
      "en": "To understand a complex concept, I…",
      "ko": "복잡한 개념을 이해할 때 나는…"
    },
    "options": [
      {
        "id": "VARK-06-A",
        "tag": "V",
        "text": {
          "pt": "Entendo muito mais rápido com fluxogramas e representações visuais.",
          "en": "Understand faster with structure/flow diagrams.",
          "ko": "구조도/흐름도를 보면 이해가 빨라진다."
        }
      },
      {
        "id": "VARK-06-B",
        "tag": "A",
        "text": {
          "pt": "Preciso debater, tirar dúvidas e falar sobre o assunto com outras pessoas.",
          "en": "Need to talk through it and ask questions.",
          "ko": "질문하면서 대화로 풀어야 감이 온다."
        }
      },
      {
        "id": "VARK-06-C",
        "tag": "R",
        "text": {
          "pt": "Preciso ler definições formais, artigos e justificativas escritas detalhadas.",
          "en": "Need written definitions/reasoning.",
          "ko": "정의/근거를 글로 정리해야 머리에 들어온다."
        }
      },
      {
        "id": "VARK-06-D",
        "tag": "K",
        "text": {
          "pt": "Preciso conectar a um exemplo da vida real ou a uma aplicação prática.",
          "en": "Need to apply it to a real example.",
          "ko": "실제 사례에 적용해봐야 확실히 이해된다."
        }
      }
    ]
  },
  {
    "id": "VARK-07",
    "prompt": {
      "pt": "Ao compartilhar informações com a minha equipe ou colegas, prefiro…",
      "en": "When sharing information in a team, I prefer…",
      "ko": "팀에서 내용을 공유할 때 내가 선호하는 방식은…"
    },
    "options": [
      {
        "id": "VARK-07-A",
        "tag": "V",
        "text": {
          "pt": "Apresentar um infográfico ou resumo visual em uma página.",
          "en": "A one-page visual summary/infographic.",
          "ko": "한 장짜리 도표/인포그래픽으로 정리"
        }
      },
      {
        "id": "VARK-07-B",
        "tag": "A",
        "text": {
          "pt": "Fazer uma reunião rápida ou explicação verbal direta.",
          "en": "A quick verbal briefing.",
          "ko": "짧게 브리핑하면서 말로 설명"
        }
      },
      {
        "id": "VARK-07-C",
        "tag": "R",
        "text": {
          "pt": "Enviar um documento escrito bem estruturado ou memorando.",
          "en": "A written doc/memo.",
          "ko": "문서/메모로 글로 정리해서 공유"
        }
      },
      {
        "id": "VARK-07-D",
        "tag": "K",
        "text": {
          "pt": "Fazer uma demonstração prática ao vivo mostrando como se faz.",
          "en": "A live demo/show-and-tell.",
          "ko": "직접 데모/시연하면서 보여주기"
        }
      }
    ]
  },
  {
    "id": "VARK-08",
    "prompt": {
      "pt": "Ao aprender uma nova receita culinária, eu…",
      "en": "When learning a recipe, I…",
      "ko": "레시피(요리)를 배울 때 나는…"
    },
    "options": [
      {
        "id": "VARK-08-A",
        "tag": "V",
        "text": {
          "pt": "Acompanho fotos do passo a passo ou um vídeo de culinária.",
          "en": "Follow photos/videos step-by-step.",
          "ko": "사진/영상으로 단계 확인하면서 한다."
        }
      },
      {
        "id": "VARK-08-B",
        "tag": "A",
        "text": {
          "pt": "Prefiro que alguém dite os passos e me explique enquanto cozinho.",
          "en": "Prefer spoken guidance while cooking.",
          "ko": "누가 말로 알려주면 듣고 따라 한다."
        }
      },
      {
        "id": "VARK-08-C",
        "tag": "R",
        "text": {
          "pt": "Leio atentamente os ingredientes e o modo de preparo por escrito.",
          "en": "Read the recipe text and follow it.",
          "ko": "레시피 글을 읽고 순서대로 한다."
        }
      },
      {
        "id": "VARK-08-D",
        "tag": "K",
        "text": {
          "pt": "Vou fazendo direto na cozinha, sentindo o ponto dos ingredientes.",
          "en": "Learn by doing and adjusting through feel.",
          "ko": "일단 만들어보며 간/불 조절은 감으로 맞춘다."
        }
      }
    ]
  },
  {
    "id": "VARK-09",
    "prompt": {
      "pt": "Ao escolher materiais para estudar, eu…",
      "en": "When choosing study materials, I…",
      "ko": "공부 자료를 고를 때 나는…"
    },
    "options": [
      {
        "id": "VARK-09-A",
        "tag": "V",
        "text": {
          "pt": "Prefiro materiais com diagramas, ilustrações e destaques visuais.",
          "en": "Prefer materials with visuals and highlights.",
          "ko": "표/그림/강조 표시가 잘 된 자료가 좋다."
        }
      },
      {
        "id": "VARK-09-B",
        "tag": "A",
        "text": {
          "pt": "Prefiro videoaulas narradas, podcasts ou gravações explicativas.",
          "en": "Prefer materials with audio explanations.",
          "ko": "듣는 설명(오디오/강의)이 있으면 더 좋다."
        }
      },
      {
        "id": "VARK-09-C",
        "tag": "R",
        "text": {
          "pt": "Prefiro livros didáticos, apostilas e textos bem estruturados.",
          "en": "Prefer well-structured text.",
          "ko": "글로 논리적으로 정리된 자료가 좋다."
        }
      },
      {
        "id": "VARK-09-D",
        "tag": "K",
        "text": {
          "pt": "Prefiro materiais acompanhados de exercícios, laboratórios ou estudos práticos.",
          "en": "Prefer materials with exercises/activities.",
          "ko": "연습문제/활동이 포함된 자료가 좋다."
        }
      }
    ]
  },
  {
    "id": "VARK-10",
    "prompt": {
      "pt": "Para memorizar conteúdos difíceis ou fórmulas…",
      "en": "To memorize difficult content, I…",
      "ko": "어려운 내용을 외울 때 나는…"
    },
    "options": [
      {
        "id": "VARK-10-A",
        "tag": "V",
        "text": {
          "pt": "Crio esquemas visuais com cores e disposição espacial marcante.",
          "en": "Create visual scenes with color/layout cues.",
          "ko": "이미지/색/배치로 ‘장면’처럼 기억한다."
        }
      },
      {
        "id": "VARK-10-B",
        "tag": "A",
        "text": {
          "pt": "Repito em voz alta usando rimas, ritmo ou mnemônicos sonoros.",
          "en": "Repeat out loud or use rhythm/rhyme.",
          "ko": "소리 내 반복하거나 리듬/라임으로 외운다."
        }
      },
      {
        "id": "VARK-10-C",
        "tag": "R",
        "text": {
          "pt": "Faço listas escritas, fichamentos e releio repetidamente.",
          "en": "Write lists and reread them.",
          "ko": "목록으로 정리해 적고 여러 번 읽는다."
        }
      },
      {
        "id": "VARK-10-D",
        "tag": "K",
        "text": {
          "pt": "Uso flashcards físicos enquanto ando ou gesticulo pelo ambiente.",
          "en": "Use flashcards/movement while studying.",
          "ko": "플래시카드/동작 같은 ‘몸을 쓰는 방식’을 섞는다."
        }
      }
    ]
  },
  {
    "id": "VARK-11",
    "prompt": {
      "pt": "Ao iniciar um novo projeto, geralmente eu…",
      "en": "When starting a project, I usually…",
      "ko": "프로젝트를 시작할 때 나는 보통…"
    },
    "options": [
      {
        "id": "VARK-11-A",
        "tag": "V",
        "text": {
          "pt": "Desenho o esboço da estrutura geral e o layout primeiro.",
          "en": "Sketch the overall structure first.",
          "ko": "전체 구조를 먼저 그려본다."
        }
      },
      {
        "id": "VARK-11-B",
        "tag": "A",
        "text": {
          "pt": "Converso e alinho expectativas verbalmente com os envolvidos.",
          "en": "Talk it through to align direction.",
          "ko": "누군가와 말로 방향을 맞춘다."
        }
      },
      {
        "id": "VARK-11-C",
        "tag": "R",
        "text": {
          "pt": "Escrevo os objetivos, lista de requisitos e planejamento por escrito.",
          "en": "Write goals/requirements.",
          "ko": "목표/요구사항을 문서로 정리한다."
        }
      },
      {
        "id": "VARK-11-D",
        "tag": "K",
        "text": {
          "pt": "Construo um protótipo rápido para ver algo funcionando de verdade.",
          "en": "Build a quick prototype.",
          "ko": "작은 샘플/프로토타입을 바로 만들어본다."
        }
      }
    ]
  },
  {
    "id": "VARK-12",
    "prompt": {
      "pt": "Ao corrigir erros ou resolver problemas técnicos (bugs)…",
      "en": "When fixing mistakes/bugs, I…",
      "ko": "실수나 오류를 잡을 때 나는…"
    },
    "options": [
      {
        "id": "VARK-12-A",
        "tag": "V",
        "text": {
          "pt": "Comparo telas, gráficos ou logs visuais para notar padrões anômalos.",
          "en": "Compare screens/logs to spot patterns.",
          "ko": "화면/로그를 비교하며 패턴을 찾는다."
        }
      },
      {
        "id": "VARK-12-B",
        "tag": "A",
        "text": {
          "pt": "Explico o problema em voz alta para identificar a causa raiz.",
          "en": "Explain the situation out loud to find the cause.",
          "ko": "누군가에게 상황을 말로 설명하며 원인을 찾는다."
        }
      },
      {
        "id": "VARK-12-C",
        "tag": "R",
        "text": {
          "pt": "Sigo um checklist detalhado e documentação de passos de depuração.",
          "en": "Follow a written step-by-step checklist.",
          "ko": "단계별 체크리스트처럼 적어가며 확인한다."
        }
      },
      {
        "id": "VARK-12-D",
        "tag": "K",
        "text": {
          "pt": "Testo pequenas variações rapidamente na prática para ver o que muda.",
          "en": "Quickly test variations to see what works.",
          "ko": "방법을 바꿔가며 빨리 테스트해서 되는 조합을 찾는다."
        }
      }
    ]
  },
  {
    "id": "VARK-13",
    "prompt": {
      "pt": "Eu mantenho meu melhor foco quando…",
      "en": "I focus best when…",
      "ko": "내가 집중이 가장 잘 되는 학습 환경은…"
    },
    "options": [
      {
        "id": "VARK-13-A",
        "tag": "V",
        "text": {
          "pt": "O ambiente de trabalho e os materiais estão visualmente limpos e organizados.",
          "en": "The space/materials are visually organized.",
          "ko": "자료/공간이 시각적으로 깔끔하게 정돈돼 있을 때"
        }
      },
      {
        "id": "VARK-13-B",
        "tag": "A",
        "text": {
          "pt": "Posso tirar dúvidas com alguém ou falar comigo mesmo para processar.",
          "en": "I can ask questions or talk things out.",
          "ko": "필요하면 말로 질문하거나 설명할 수 있을 때"
        }
      },
      {
        "id": "VARK-13-C",
        "tag": "R",
        "text": {
          "pt": "O ambiente está em silêncio absoluto para que eu possa ler e escrever.",
          "en": "It’s quiet for reading/writing.",
          "ko": "조용히 읽고 쓰기 좋은 환경일 때"
        }
      },
      {
        "id": "VARK-13-D",
        "tag": "K",
        "text": {
          "pt": "Posso me movimentar um pouco, mudar de postura ou manipular objetos enquanto penso.",
          "en": "I can move a bit or do something hands-on.",
          "ko": "가끔 움직이거나 손으로 할 게 있을 때"
        }
      }
    ]
  },
  {
    "id": "VARK-14",
    "prompt": {
      "pt": "Para compreender uma nova regra, política ou regulamento, eu…",
      "en": "To understand a new rule/policy, I…",
      "ko": "새로운 규칙/정책을 이해할 때 나는…"
    },
    "options": [
      {
        "id": "VARK-14-A",
        "tag": "V",
        "text": {
          "pt": "Preciso de um fluxograma ou mapa conceitual resumido.",
          "en": "Need a diagram/visual summary.",
          "ko": "핵심을 도표로 요약해보면 바로 이해된다."
        }
      },
      {
        "id": "VARK-14-B",
        "tag": "A",
        "text": {
          "pt": "Prefiro uma explicação oral que traga exemplos claros.",
          "en": "Prefer verbal explanation with examples.",
          "ko": "사례를 들어 말로 설명해주면 이해가 쉽다."
        }
      },
      {
        "id": "VARK-14-C",
        "tag": "R",
        "text": {
          "pt": "Preciso ler o documento oficial integral com atenção aos detalhes.",
          "en": "Need to read the original document.",
          "ko": "문서 원문을 읽어봐야 확신이 든다."
        }
      },
      {
        "id": "VARK-14-D",
        "tag": "K",
        "text": {
          "pt": "Compreendo melhor ao aplicar a regra em uma situação prática e ver o impacto.",
          "en": "Understand by applying it to a real situation.",
          "ko": "실제 상황에 적용해보며 감을 잡는다."
        }
      }
    ]
  },
  {
    "id": "VARK-15",
    "prompt": {
      "pt": "Ao aprender termos técnicos ou novos conceitos de vocabulário, eu…",
      "en": "When learning terms/concepts, I…",
      "ko": "용어/개념을 배울 때 나는…"
    },
    "options": [
      {
        "id": "VARK-15-A",
        "tag": "V",
        "text": {
          "pt": "Associo a termos visuais, ícones ou figuras mentais.",
          "en": "Link them to images/icons.",
          "ko": "그림/아이콘과 연결해서 기억한다."
        }
      },
      {
        "id": "VARK-15-B",
        "tag": "A",
        "text": {
          "pt": "Repito a pronúncia e presto atenção à sonoridade da palavra.",
          "en": "Repeat pronunciation/sounds.",
          "ko": "발음/소리를 반복하면서 익힌다."
        }
      },
      {
        "id": "VARK-15-C",
        "tag": "R",
        "text": {
          "pt": "Escrevo a definição e frases de exemplo com o termo.",
          "en": "Write definitions and example sentences.",
          "ko": "정의를 적고 예문을 써보며 익힌다."
        }
      },
      {
        "id": "VARK-15-D",
        "tag": "K",
        "text": {
          "pt": "Uso a palavra em conversas reais ou cenários práticos imediatos.",
          "en": "Practice using them in real contexts.",
          "ko": "실제 상황에서 써보며 익힌다."
        }
      }
    ]
  },
  {
    "id": "VARK-16",
    "prompt": {
      "pt": "Sinto que realmente aprendi e dominei um conteúdo quando…",
      "en": "I feel I learned well when…",
      "ko": "“이제 알겠다”라고 느끼는 순간은…"
    },
    "options": [
      {
        "id": "VARK-16-A",
        "tag": "V",
        "text": {
          "pt": "Consigo 'enxergar' a estrutura do tema desenhada na minha mente.",
          "en": "I can “see” the structure in my head.",
          "ko": "머릿속에 구조가 그림처럼 그려질 때"
        }
      },
      {
        "id": "VARK-16-B",
        "tag": "A",
        "text": {
          "pt": "Consigo explicar o assunto com clareza em voz alta para qualquer pessoa.",
          "en": "I can explain it clearly out loud.",
          "ko": "누군가에게 말로 쉽게 설명할 수 있을 때"
        }
      },
      {
        "id": "VARK-16-C",
        "tag": "R",
        "text": {
          "pt": "Minhas anotações escritas estão completas, lógicas e bem estruturadas.",
          "en": "My written notes feel logically complete.",
          "ko": "글로 정리했을 때 논리가 딱 맞아떨어질 때"
        }
      },
      {
        "id": "VARK-16-D",
        "tag": "K",
        "text": {
          "pt": "Consigo realizar a tarefa na prática ou construir algo sozinho com aquilo.",
          "en": "I can actually do it or build something with it.",
          "ko": "실제로 해내거나 만들어낼 수 있을 때"
        }
      }
    ]
  }
];

export const kolbQuestions: SingleSelectQuestion<KolbDimension>[] = [
  {
    "id": "KOLB-01",
    "prompt": {
      "pt": "Ao aprender uma nova habilidade, geralmente eu…",
      "en": "When learning a new skill, I usually…",
      "ko": "새로운 기술을 배울 때 나는 보통…"
    },
    "options": [
      {
        "id": "KOLB-01-A",
        "tag": "AE",
        "text": {
          "pt": "Mergulho de cabeça e começo tentando na prática logo de cara.",
          "en": "Jump in and try first.",
          "ko": "일단 해보면서 감을 잡는다."
        }
      },
      {
        "id": "KOLB-01-B",
        "tag": "RO",
        "text": {
          "pt": "Observo com atenção primeiro para compreender o fluxo geral.",
          "en": "Observe first to see the flow.",
          "ko": "먼저 지켜보고 흐름을 파악한다."
        }
      },
      {
        "id": "KOLB-01-C",
        "tag": "AC",
        "text": {
          "pt": "Compreendo a teoria e os conceitos antes de dar início.",
          "en": "Understand the theory before starting.",
          "ko": "원리/개념을 이해한 뒤 시작한다."
        }
      },
      {
        "id": "KOLB-01-D",
        "tag": "CE",
        "text": {
          "pt": "Conecto com minhas vivências anteriores para sentir como é na prática.",
          "en": "Connect it to lived experience first.",
          "ko": "내 경험과 연결해 “어떤 느낌인지”부터 잡는다."
        }
      }
    ]
  },
  {
    "id": "KOLB-02",
    "prompt": {
      "pt": "Quando surge um problema inesperado, eu…",
      "en": "When a problem shows up, I…",
      "ko": "문제가 생기면 나는…"
    },
    "options": [
      {
        "id": "KOLB-02-A",
        "tag": "AE",
        "text": {
          "pt": "Testo várias tentativas de solução de forma ágil e prática.",
          "en": "Try several fixes quickly.",
          "ko": "해결책을 여러 개 빠르게 시도해본다."
        }
      },
      {
        "id": "KOLB-02-B",
        "tag": "RO",
        "text": {
          "pt": "Faço uma pausa e reflito sobre o que está realmente acontecendo.",
          "en": "Pause and reflect on what’s happening.",
          "ko": "잠깐 멈추고 상황을 정리해 돌아본다."
        }
      },
      {
        "id": "KOLB-02-C",
        "tag": "AC",
        "text": {
          "pt": "Analiso as causas e efeitos de maneira lógica e analítica.",
          "en": "Analyze cause-and-effect logically.",
          "ko": "원인-결과를 논리적으로 분석한다."
        }
      },
      {
        "id": "KOLB-02-D",
        "tag": "CE",
        "text": {
          "pt": "Avalio a situação pelo impacto real nas pessoas e pelo sentimento do momento.",
          "en": "Feel it from the real-world perspective first.",
          "ko": "현장/사람 입장에서 먼저 체감해본다."
        }
      }
    ]
  },
  {
    "id": "KOLB-03",
    "prompt": {
      "pt": "Meu modo favorito de aprender é através de…",
      "en": "My preferred learning is…",
      "ko": "내가 선호하는 학습 방식은…"
    },
    "options": [
      {
        "id": "KOLB-03-A",
        "tag": "AE",
        "text": {
          "pt": "Projetos práticos, oficinas e experimentos reais.",
          "en": "Learn through projects/experiments",
          "ko": "프로젝트/실험으로 배우기"
        }
      },
      {
        "id": "KOLB-03-B",
        "tag": "RO",
        "text": {
          "pt": "Análise cuidadosa de casos reais e interpretação de significados.",
          "en": "Interpret meaning from cases",
          "ko": "사례를 보고 의미를 해석해보기"
        }
      },
      {
        "id": "KOLB-03-C",
        "tag": "AC",
        "text": {
          "pt": "Modelos teóricos, esquemas conceituais e princípios lógicos.",
          "en": "Organize via models/frameworks",
          "ko": "모델/프레임워크로 정리해보기"
        }
      },
      {
        "id": "KOLB-03-D",
        "tag": "CE",
        "text": {
          "pt": "Experiências humanas diretas, vivências e sentimentos.",
          "en": "Learn through real experiences",
          "ko": "실제 경험/현장에서 부딪히며 배우기"
        }
      }
    ]
  },
  {
    "id": "KOLB-04",
    "prompt": {
      "pt": "Em uma equipe, para amadurecer uma nova ideia, eu costumo…",
      "en": "In a team, to develop an idea, I…",
      "ko": "팀에서 아이디어를 발전시킬 때 나는…"
    },
    "options": [
      {
        "id": "KOLB-04-A",
        "tag": "AE",
        "text": {
          "pt": "Construir um protótipo rápido ou piloto imediato.",
          "en": "Build a quick prototype.",
          "ko": "빨리 프로토타입/샘플을 만들어본다."
        }
      },
      {
        "id": "KOLB-04-B",
        "tag": "RO",
        "text": {
          "pt": "Ouvir as diferentes opiniões e refletir sobre os pontos de vista.",
          "en": "Gather views and reflect.",
          "ko": "여러 의견을 듣고 정리해본다."
        }
      },
      {
        "id": "KOLB-04-C",
        "tag": "AC",
        "text": {
          "pt": "Formular hipóteses, premissas sólidas e encadeamento lógico.",
          "en": "Start with hypotheses and logic.",
          "ko": "가설과 논리를 먼저 세운다."
        }
      },
      {
        "id": "KOLB-04-D",
        "tag": "CE",
        "text": {
          "pt": "Partir das histórias, dores e percepções dos usuários ou pessoas de campo.",
          "en": "Start with user/field stories.",
          "ko": "사용자/현장 이야기를 먼저 듣는다."
        }
      }
    ]
  },
  {
    "id": "KOLB-05",
    "prompt": {
      "pt": "Durante uma aula, palestra ou curso, eu…",
      "en": "In a lecture, I…",
      "ko": "강의를 들을 때 나는…"
    },
    "options": [
      {
        "id": "KOLB-05-A",
        "tag": "AE",
        "text": {
          "pt": "Fico pensando em como aplicar aquele conhecimento imediatamente.",
          "en": "Look for how to use it immediately.",
          "ko": "“이걸 어디에 써먹지?”를 먼저 찾는다."
        }
      },
      {
        "id": "KOLB-05-B",
        "tag": "RO",
        "text": {
          "pt": "Escuto com atenção para refletir e organizar os pensamentos depois.",
          "en": "Reflect and organize after listening.",
          "ko": "듣고 나서 정리하며 곱씹는다."
        }
      },
      {
        "id": "KOLB-05-C",
        "tag": "AC",
        "text": {
          "pt": "Presto muita atenção às definições, consistência lógica e estrutura teórica.",
          "en": "Definitions and structure matter most.",
          "ko": "정의/구조/원리가 중요하다."
        }
      },
      {
        "id": "KOLB-05-D",
        "tag": "CE",
        "text": {
          "pt": "Compreendo melhor quando o professor traz relatos pessoais e exemplos da vida real.",
          "en": "I understand best when it connects to my experience.",
          "ko": "내 경험과 연결될 때 가장 잘 이해된다."
        }
      }
    ]
  },
  {
    "id": "KOLB-06",
    "prompt": {
      "pt": "Ao receber uma informação completamente nova, eu…",
      "en": "When I receive new information, I…",
      "ko": "새 정보를 접하면 나는…"
    },
    "options": [
      {
        "id": "KOLB-06-A",
        "tag": "AE",
        "text": {
          "pt": "Valido rapidamente fazendo um pequeno teste prático.",
          "en": "Validate by doing a small test.",
          "ko": "작게라도 바로 실행해보며 확인한다."
        }
      },
      {
        "id": "KOLB-06-B",
        "tag": "RO",
        "text": {
          "pt": "Deixo a ideia amadurecer internamente e reflito sobre ela.",
          "en": "Sit with it and reflect.",
          "ko": "시간을 두고 의미를 생각해본다."
        }
      },
      {
        "id": "KOLB-06-C",
        "tag": "AC",
        "text": {
          "pt": "Encaixo a informação dentro de um modelo ou sistema conceitual.",
          "en": "Fit it into a conceptual model.",
          "ko": "기존 지식 체계에 논리적으로 끼워 넣는다."
        }
      },
      {
        "id": "KOLB-06-D",
        "tag": "CE",
        "text": {
          "pt": "Busco dar sentido a ela a partir das minhas próprias experiências passadas.",
          "en": "Make sense of it through experience.",
          "ko": "내가 겪어본 경험과 연결해 납득한다."
        }
      }
    ]
  },
  {
    "id": "KOLB-07",
    "prompt": {
      "pt": "Ao tomar uma decisão importante, eu costumo…",
      "en": "When making a decision, I…",
      "ko": "결정을 내릴 때 나는…"
    },
    "options": [
      {
        "id": "KOLB-07-A",
        "tag": "AE",
        "text": {
          "pt": "Agir prontamente e ir fazendo ajustes ao longo do caminho.",
          "en": "Act, then adjust.",
          "ko": "일단 해보고 필요하면 수정한다."
        }
      },
      {
        "id": "KOLB-07-B",
        "tag": "RO",
        "text": {
          "pt": "Pesar os prós e contras com calma e ponderar as consequências.",
          "en": "Weigh pros/cons and reflect.",
          "ko": "장단점을 더 보고 생각을 정리한다."
        }
      },
      {
        "id": "KOLB-07-C",
        "tag": "AC",
        "text": {
          "pt": "Decidir com base em lógica rigorosa, dados e evidências objetivas.",
          "en": "Decide with logic/data.",
          "ko": "데이터/논리로 결론을 낸다."
        }
      },
      {
        "id": "KOLB-07-D",
        "tag": "CE",
        "text": {
          "pt": "Confiar na minha intuição, sensibilidade e experiência prática.",
          "en": "Trust intuition and experience.",
          "ko": "직관과 경험에서 오는 감각을 믿는다."
        }
      }
    ]
  },
  {
    "id": "KOLB-08",
    "prompt": {
      "pt": "Ao avaliar se uma ideia nova é promissora, eu…",
      "en": "When evaluating a new idea, I…",
      "ko": "새로운 아이디어를 평가할 때 나는…"
    },
    "options": [
      {
        "id": "KOLB-08-A",
        "tag": "AE",
        "text": {
          "pt": "Coloco em prática em pequena escala para ver o que acontece.",
          "en": "Run a small test first.",
          "ko": "작은 테스트를 먼저 해본다."
        }
      },
      {
        "id": "KOLB-08-B",
        "tag": "RO",
        "text": {
          "pt": "Comparo com casos similares que já observei anteriormente.",
          "en": "Compare similar cases.",
          "ko": "비슷한 사례를 비교해본다."
        }
      },
      {
        "id": "KOLB-08-C",
        "tag": "AC",
        "text": {
          "pt": "Verifico a coerência lógica e a solidez teórica da proposta.",
          "en": "Check theoretical consistency.",
          "ko": "이론적으로 말이 되는지 본다."
        }
      },
      {
        "id": "KOLB-08-D",
        "tag": "CE",
        "text": {
          "pt": "Sinto se ela tem relevância real e faz sentido para as pessoas.",
          "en": "Sense real-world usefulness.",
          "ko": "실제로 쓸모가 느껴지는지 본다."
        }
      }
    ]
  },
  {
    "id": "KOLB-09",
    "prompt": {
      "pt": "Logo após terminar de aprender um conteúdo, costumo…",
      "en": "After learning, I usually…",
      "ko": "학습 후 나는 보통…"
    },
    "options": [
      {
        "id": "KOLB-09-A",
        "tag": "AE",
        "text": {
          "pt": "Aplicar imediatamente na minha rotina ou trabalho.",
          "en": "Apply immediately.",
          "ko": "바로 실전에 적용해본다."
        }
      },
      {
        "id": "KOLB-09-B",
        "tag": "RO",
        "text": {
          "pt": "Revisar com calma o que foi visto e planejar os próximos passos.",
          "en": "Review and plan next steps.",
          "ko": "복기하면서 다음 계획을 세운다."
        }
      },
      {
        "id": "KOLB-09-C",
        "tag": "AC",
        "text": {
          "pt": "Reestruturar as ideias no meu próprio framework conceitual.",
          "en": "Rebuild it into my own framework.",
          "ko": "개념을 정리해 내 방식의 구조로 만든다."
        }
      },
      {
        "id": "KOLB-09-D",
        "tag": "CE",
        "text": {
          "pt": "Anotar o que mais me tocou emocionalmente ou fez sentido prático.",
          "en": "Note what resonated in experience.",
          "ko": "“어떤 점이 와닿았는지” 기록한다."
        }
      }
    ]
  },
  {
    "id": "KOLB-10",
    "prompt": {
      "pt": "Tenho mais dificuldade quando a metodologia de ensino é…",
      "en": "I struggle most with learning that is…",
      "ko": "나에게 가장 힘든 학습은…"
    },
    "options": [
      {
        "id": "KOLB-10-A",
        "tag": "AE",
        "text": {
          "pt": "Pura conversa e teoria sem nenhuma atividade prática.",
          "en": "All talk, no doing",
          "ko": "실행 없이 말/정리만 길게 이어지는 것"
        }
      },
      {
        "id": "KOLB-10-B",
        "tag": "RO",
        "text": {
          "pt": "Acelerada demais, sem tempo para pensar ou refletir.",
          "en": "Too fast, no reflection",
          "ko": "너무 빨리 지나가서 돌아볼 시간이 없는 것"
        }
      },
      {
        "id": "KOLB-10-C",
        "tag": "AC",
        "text": {
          "pt": "Baseada apenas em intuição pessoal, sem embasamento ou lógica.",
          "en": "Intuition with no rationale",
          "ko": "근거 없이 “감으로만” 하자는 것"
        }
      },
      {
        "id": "KOLB-10-D",
        "tag": "CE",
        "text": {
          "pt": "Puramente abstrata, distante da realidade e sem conexão humana.",
          "en": "Pure abstraction with no connection",
          "ko": "현실과 전혀 연결되지 않는 추상만 있는 것"
        }
      }
    ]
  },
  {
    "id": "KOLB-11",
    "prompt": {
      "pt": "Ao fazer perguntas em uma discussão, costumo perguntar…",
      "en": "When I ask questions, I often ask…",
      "ko": "질문을 할 때 나는 보통…"
    },
    "options": [
      {
        "id": "KOLB-11-A",
        "tag": "AE",
        "text": {
          "pt": "'Qual é o próximo passo prático que devemos executar?'",
          "en": "“What should I do next?”",
          "ko": "“그럼 지금 뭘 하면 돼요?”"
        }
      },
      {
        "id": "KOLB-11-B",
        "tag": "RO",
        "text": {
          "pt": "'Por que isso aconteceu dessa maneira específica?'",
          "en": "“Why did this happen?”",
          "ko": "“왜 이렇게 된 거죠?”"
        }
      },
      {
        "id": "KOLB-11-C",
        "tag": "AC",
        "text": {
          "pt": "'Qual é a premissa fundamental ou regra por trás disso?'",
          "en": "“What’s the principle/assumption?”",
          "ko": "“원리/전제는 뭐예요?”"
        }
      },
      {
        "id": "KOLB-11-D",
        "tag": "CE",
        "text": {
          "pt": "'Como foi a experiência real de quem passou por isso?'",
          "en": "“What was it like in practice?”",
          "ko": "“실제로 해보면 어떤 느낌이었어요?”"
        }
      }
    ]
  },
  {
    "id": "KOLB-12",
    "prompt": {
      "pt": "Para mim, 'entendi o conteúdo' significa que…",
      "en": "“I understand” means…",
      "ko": "내가 “이해했다”는 의미는…"
    },
    "options": [
      {
        "id": "KOLB-12-A",
        "tag": "AE",
        "text": {
          "pt": "Eu sou capaz de fazer e executar na prática.",
          "en": "I can do it.",
          "ko": "실제로 해낼 수 있다."
        }
      },
      {
        "id": "KOLB-12-B",
        "tag": "RO",
        "text": {
          "pt": "Eu sou capaz de refletir sobre o seu significado e implicações.",
          "en": "I can reflect on its meaning.",
          "ko": "의미를 돌아보며 설명할 수 있다."
        }
      },
      {
        "id": "KOLB-12-C",
        "tag": "AC",
        "text": {
          "pt": "Eu sou capaz de explicar os princípios teóricos e conceituais.",
          "en": "I can explain it conceptually.",
          "ko": "개념적으로 구조화해 설명할 수 있다."
        }
      },
      {
        "id": "KOLB-12-D",
        "tag": "CE",
        "text": {
          "pt": "Eu sinto uma conexão real entre isso e a vida prática.",
          "en": "It makes sense through experience.",
          "ko": "내 경험으로 납득이 된다."
        }
      }
    ]
  }
];

export const gardnerQuestions: LikertQuestion[] = [
  {
    "id": "MI-01",
    "tag": "LOG",
    "prompt": {
      "pt": "Eu gosto de identificar padrões, regularidades e deduzir regras lógicas.",
      "en": "I enjoy spotting patterns and inferring rules.",
      "ko": "나는 규칙/패턴을 찾아내는 걸 좋아한다."
    }
  },
  {
    "id": "MI-02",
    "tag": "LOG",
    "prompt": {
      "pt": "Entendo conceitos com mais rapidez quando são explicados com números, gráficos ou dados.",
      "en": "I understand faster when explained with numbers or data.",
      "ko": "숫자나 데이터로 설명하면 더 빨리 이해된다."
    }
  },
  {
    "id": "MI-03",
    "tag": "LOG",
    "prompt": {
      "pt": "Tenho o hábito de dividir problemas complexos em etapas lógicas para resolvê-los.",
      "en": "I tend to break problems into steps to solve them.",
      "ko": "문제를 단계별로 쪼개서 해결하는 편이다."
    }
  },
  {
    "id": "MI-04",
    "tag": "LIN",
    "prompt": {
      "pt": "Colocar meus pensamentos por escrito torna minhas ideias muito mais claras.",
      "en": "Writing things down makes my thinking clearer.",
      "ko": "글로 적어보면 생각이 더 또렷해진다."
    }
  },
  {
    "id": "MI-05",
    "tag": "LIN",
    "prompt": {
      "pt": "Gosto de aprimorar a forma como as coisas são ditas e escolher as palavras certas.",
      "en": "I enjoy refining how things are expressed in words.",
      "ko": "말/글 표현을 다듬는 걸 은근히 즐긴다."
    }
  },
  {
    "id": "MI-06",
    "tag": "LIN",
    "prompt": {
      "pt": "Ler ou escrever é uma das melhores maneiras de manter minha concentração.",
      "en": "Reading or writing helps me focus.",
      "ko": "읽기나 글쓰기를 하면 집중이 잘 된다."
    }
  },
  {
    "id": "MI-07",
    "tag": "SPA",
    "prompt": {
      "pt": "Consigo imaginar disposições espaciais, plantas ou estruturas 3D na minha mente com facilidade.",
      "en": "I can imagine layouts/structures in my head.",
      "ko": "머릿속으로 배치/구조를 그려가며 생각하는 편이다."
    }
  },
  {
    "id": "MI-08",
    "tag": "SPA",
    "prompt": {
      "pt": "Diagramas, mapas visuais e esquemas aceleram bastante meu entendimento.",
      "en": "Diagrams, maps, or visuals speed up my understanding.",
      "ko": "그림/도식/지도 같은 자료가 있으면 이해가 빨라진다."
    }
  },
  {
    "id": "MI-09",
    "tag": "SPA",
    "prompt": {
      "pt": "Costumo lembrar de detalhes visuais como cores, posições, formatos e layouts.",
      "en": "I tend to remember visual details like color, shape, and position.",
      "ko": "색, 모양, 위치 같은 시각 정보를 잘 기억한다."
    }
  },
  {
    "id": "MI-10",
    "tag": "MUS",
    "prompt": {
      "pt": "Ritmo, melodias ou músicas de fundo me ajudam a memorizar e fixar informações.",
      "en": "Rhythm or melody helps me remember.",
      "ko": "리듬이나 멜로디가 있으면 더 잘 외워진다."
    }
  },
  {
    "id": "MI-11",
    "tag": "MUS",
    "prompt": {
      "pt": "Sou muito sensível a variações de tom de voz, entonação e ritmo na fala das pessoas.",
      "en": "I’m fairly sensitive to changes in tone/pitch.",
      "ko": "말투/톤 변화(억양)에 비교적 민감한 편이다."
    }
  },
  {
    "id": "MI-12",
    "tag": "MUS",
    "prompt": {
      "pt": "Noto rapidamente padrões sonoros repetitivos, batidas ou ruídos no ambiente.",
      "en": "I quickly notice repeating sound patterns.",
      "ko": "반복되는 소리 패턴을 금방 알아차린다."
    }
  },
  {
    "id": "MI-13",
    "tag": "KIN",
    "prompt": {
      "pt": "Aprendo muito mais rápido quando eu mesmo realizo a atividade fisicamente.",
      "en": "I learn much faster by doing it myself.",
      "ko": "직접 해보면 훨씬 빨리 배운다."
    }
  },
  {
    "id": "MI-14",
    "tag": "KIN",
    "prompt": {
      "pt": "Ficar parado sentado por muito tempo prejudica meu foco; me movimentar recarrega minha atenção.",
      "en": "Sitting too long hurts my focus; moving helps me refocus.",
      "ko": "오래 앉아 있으면 집중이 떨어지고, 움직이면 다시 집중된다."
    }
  },
  {
    "id": "MI-15",
    "tag": "KIN",
    "prompt": {
      "pt": "Manusear ferramentas, objetos ou gesticular enquanto explico facilita meu aprendizado.",
      "en": "Hands-on manipulation helps me learn.",
      "ko": "손으로 만지고 조작하는 활동이 이해에 도움이 된다."
    }
  },
  {
    "id": "MI-16",
    "tag": "INTER",
    "prompt": {
      "pt": "Conversar e debater com outras pessoas me ajuda a organizar minhas próprias ideias.",
      "en": "Talking with people helps organize my thoughts.",
      "ko": "사람과 얘기하다 보면 생각이 정리된다."
    }
  },
  {
    "id": "MI-17",
    "tag": "INTER",
    "prompt": {
      "pt": "Tenho facilidade para perceber os sentimentos dos outros e sentir o clima do ambiente.",
      "en": "I’m fairly good at reading others’ emotions and the room.",
      "ko": "상대의 감정/분위기를 빠르게 파악하는 편이다."
    }
  },
  {
    "id": "MI-18",
    "tag": "INTER",
    "prompt": {
      "pt": "Fico mais motivado e rendo melhor trabalhando em grupo do que sozinho.",
      "en": "I’m more motivated and perform better with others than alone.",
      "ko": "혼자보다 같이 할 때 동기나 성과가 더 난다."
    }
  },
  {
    "id": "MI-19",
    "tag": "INTRA",
    "prompt": {
      "pt": "Consigo analisar com clareza os motivos pelos quais gosto ou desgosto de algo.",
      "en": "I can explain to myself why I like/dislike something.",
      "ko": "내가 왜 이걸 좋아/싫어하는지 스스로 설명할 수 있다."
    }
  },
  {
    "id": "MI-20",
    "tag": "INTRA",
    "prompt": {
      "pt": "Tenho facilidade para definir metas pessoais e dosar meu próprio ritmo de aprendizado.",
      "en": "I’m good at setting goals and pacing myself.",
      "ko": "목표를 세우고 혼자 페이스를 잡는 편이다."
    }
  },
  {
    "id": "MI-21",
    "tag": "INTRA",
    "prompt": {
      "pt": "Preciso de momentos a sós em silêncio para processar o que aprendi e recarregar energias.",
      "en": "I need alone time to process and reset.",
      "ko": "혼자 생각 정리할 시간이 꼭 필요하다."
    }
  }
];

export const likertScale = {
  "min": 1,
  "max": 5,
  "labels": {
    "1": {
      "pt": "Discordo totalmente",
      "en": "Strongly disagree",
      "ko": "전혀 아니다"
    },
    "2": {
      "pt": "Discordo em parte",
      "en": "Disagree",
      "ko": "별로 아니다"
    },
    "3": {
      "pt": "Neutro / Às vezes",
      "en": "Neutral / Sometimes",
      "ko": "보통이다"
    },
    "4": {
      "pt": "Concordo em parte",
      "en": "Agree",
      "ko": "대체로 그렇다"
    },
    "5": {
      "pt": "Concordo totalmente",
      "en": "Strongly agree",
      "ko": "매우 그렇다"
    }
  }
};

export const varkResults: Record<string, ResultProfile> = {
  "V": {
    "title": {
      "pt": "Estilo Visual (V)",
      "en": "Visual (V)",
      "ko": "시각형 (Visual)"
    },
    "summary": {
      "pt": "Você aprende com rapidez e clareza máxima quando consegue enxergar a estrutura visual, padrões e fluxos das informações.",
      "en": "You learn fastest when you can see the structure and visual patterns.",
      "ko": "당신은 시각 정보로 구조를 빠르게 파악하는 학습자입니다."
    },
    "traits": {
      "pt": [
        "Compreende o quadro geral muito mais rápido através de diagramas, mapas conceituais e slides estruturados.",
        "Excelente memória para pistas visuais como cores, disposição espacial e tipografia.",
        "Textos longos sem diagramação podem dispersar o foco; uma boa estrutura visual eleva seu rendimento."
      ],
      "en": [
        "Diagrams and clean slides make it click quickly.",
        "You rely on visual cues like color, layout, and structure.",
        "Long text can drag, but structure boosts focus."
      ],
      "ko": [
        "표/도식/정리된 슬라이드를 보면 바로 감이 옵니다.",
        "색, 위치, 레이아웃 같은 시각 단서에 강합니다.",
        "글이 길어지면 지치기 쉽지만, 구조화되면 집중이 크게 올라갑니다."
      ]
    },
    "study_tips": {
      "pt": [
        "Comece seus estudos criando mapas mentais e fluxogramas antes de redigir anotações textuais.",
        "Adote resumos visuais de uma página (diagrama + palavras-chave) como rotina fixa de revisão.",
        "Estabeleça um código de cores consistente (ex: conceitos-chave, exemplos e avisos) para destacar conteúdos."
      ],
      "en": [
        "Create a one-page visual summary first, then add short sentences.",
        "Use consistent color rules (definitions/key points/cautions/examples).",
        "Re-map mistakes with arrows/flows so they stick."
      ],
      "ko": [
        "“한 장 요약(도식+키워드)” → “짧은 문장” 순서로 정리하세요.",
        "색 규칙을 고정하세요(정의/핵심/주의/예시).",
        "오답/실수는 화살표/흐름도로 다시 그려보면 오래 갑니다."
      ]
    },
    "recommended_formats": {
      "pt": [
        "Mapas mentais e conceituais",
        "Infográficos e tabelas",
        "Apresentações com slides visuais",
        "Quadros brancos virtuais",
        "Videoaulas com esquemas visuais"
      ],
      "en": [
        "Mind maps",
        "Flowcharts",
        "Infographics",
        "Slide summaries",
        "Whiteboarding"
      ],
      "ko": [
        "마인드맵",
        "흐름도",
        "인포그래픽",
        "슬라이드 요약",
        "화이트보드 정리"
      ]
    }
  },
  "A": {
    "title": {
      "pt": "Estilo Auditivo (A)",
      "en": "Auditory (A)",
      "ko": "청각형 (Auditory)"
    },
    "summary": {
      "pt": "Você aprende e consolida o conhecimento ouvindo explicações, conversando e debatendo os conceitos em voz alta.",
      "en": "You learn best by listening and talking it through.",
      "ko": "당신은 듣고 대화하며 이해하는 학습자입니다."
    },
    "traits": {
      "pt": [
        "Retém falas, tons de voz e explicações orais com facilidade e precisão.",
        "Aprende profundamente quando tem espaço para formular perguntas e discutir em grupo.",
        "Ler em silêncio por longos períodos pode cansar; verbalizar ajuda a manter a concentração."
      ],
      "en": [
        "Hearing explanations helps you lock it in; speaking clarifies it.",
        "You improve quickly through discussion and Q&A.",
        "Silent reading-only sessions may feel less effective."
      ],
      "ko": [
        "설명을 들으면서 이해가 붙고, 말해보면 더 또렷해집니다.",
        "스터디/질문/대화에서 실력이 빨리 늡니다.",
        "혼자 조용히 읽기만 하면 효율이 떨어질 수 있습니다."
      ]
    },
    "study_tips": {
      "pt": [
        "Grave suas próprias sínteses em áudio e escute-as durante deslocamentos ou revisões.",
        "Explique a matéria para si mesmo ou para colegas como se estivesse dando uma aula (Técnica Feynman).",
        "Participe ativamente de grupos de estudo, podcasts temáticos e discussões em grupo."
      ],
      "en": [
        "Record a 30-second explanation and replay it the next day.",
        "Assign yourself a teach-back part in study groups.",
        "Memorize with short rhythmic/mnemonic lines."
      ],
      "ko": [
        "핵심 개념을 “30초 설명”으로 녹음해두고, 다음날 한 번 더 들어보세요.",
        "스터디에서는 “내가 설명할 파트”를 정하면 이해가 확 올라갑니다(teach-back).",
        "암기 내용은 리듬/라임/연상 문장으로 짧게 만들어 반복하세요."
      ]
    },
    "recommended_formats": {
      "pt": [
        "Podcasts educativos e audiobooks",
        "Grupos de estudo e debates",
        "Gravações de áudio próprias",
        "Videoaulas dialogadas",
        "Sessões de perguntas e respostas"
      ],
      "en": [
        "Audio lectures",
        "Podcasts",
        "Voice notes",
        "Group discussion",
        "Explain-out-loud practice"
      ],
      "ko": [
        "인강(오디오 포함)",
        "팟캐스트",
        "음성 메모",
        "스터디 토론",
        "발표/설명 연습"
      ]
    }
  },
  "R": {
    "title": {
      "pt": "Estilo Leitura / Escrita (R)",
      "en": "Reading/Writing (R)",
      "ko": "읽기/쓰기형 (Reading/Writing)"
    },
    "summary": {
      "pt": "Você aprende de forma sólida ao ler textos aprofundados e reescrever o conhecimento com suas próprias palavras.",
      "en": "You learn best by reading and writing it into your own words.",
      "ko": "당신은 읽고 쓰는 과정에서 가장 잘 배우는 학습자입니다."
    },
    "traits": {
      "pt": [
        "Valoriza precisão conceitual, definições formais e textos bem articulados.",
        "Transformar leituras em fichamentos, resumos e listas é o que consolida sua memória.",
        "Gosta de organizar o pensamento através de tópicos, glossários e hierarquias textuais."
      ],
      "en": [
        "You prefer structured text: definitions, outlines, docs.",
        "Note-taking, summarizing, and rewriting are strengths.",
        "Converting ideas into text builds confidence."
      ],
      "ko": [
        "정의/정리된 문서/목차가 있으면 안정적으로 이해합니다.",
        "필기, 요약, 재구성이 강점입니다.",
        "말로 들은 내용도 글로 바꾸면 확신이 생깁니다."
      ]
    },
    "study_tips": {
      "pt": [
        "Reescreva anotações após as aulas transformando-as em resumos sintéticos e organizados em tópicos.",
        "Crie glossários pessoais com os conceitos mais importantes de cada disciplina.",
        "Utilize a escrita reflexiva: após ler um capítulo, escreva um parágrafo sintetizando a ideia central sem consultar o livro."
      ],
      "en": [
        "Use a post-study template: 5-line summary + 5 keywords + 3 questions.",
        "Translate tables/diagrams into sentences to deepen retention.",
        "Write mistake notes as cause → correct reasoning → prevention."
      ],
      "ko": [
        "학습 직후 10분: “요약 5줄 + 키워드 5개 + 질문 3개” 템플릿을 쓰세요.",
        "표/그림은 문장으로 번역해 적어보세요(번역하면 기억이 오래 갑니다).",
        "오답노트는 “원인–정답 근거–재발 방지”로 정리하면 시험에서 강력합니다."
      ]
    },
    "recommended_formats": {
      "pt": [
        "Livros didáticos e artigos",
        "Anotações e fichamentos estruturados",
        "Checklists e manuais técnicos",
        "Ensaios e sínteses escritas",
        "Flashcards textuais"
      ],
      "en": [
        "Docs/handouts",
        "Textbooks",
        "Summaries",
        "Checklists",
        "Q&A flashcards"
      ],
      "ko": [
        "문서/핸드아웃",
        "교재",
        "요약 노트",
        "체크리스트",
        "Q&A 플래시카드"
      ]
    }
  },
  "K": {
    "title": {
      "pt": "Estilo Cinestésico (K)",
      "en": "Kinesthetic (K)",
      "ko": "체감형 (Kinesthetic)"
    },
    "summary": {
      "pt": "Você aprende melhor na prática: experimentando, construindo, testando e conectando a teoria a situações reais.",
      "en": "You learn fastest by doing, testing, and applying.",
      "ko": "당신은 직접 해보고 적용할 때 가장 빠르게 배우는 학습자입니다."
    },
    "traits": {
      "pt": [
        "Aprende pelo exemplo prático e pela vivência direta da tarefa.",
        "Necessita ver o resultado concreto ou simular a aplicação para que o conceito faça sentido.",
        "Ficar imóvel por longos períodos assistindo a aulas puramente expositivas pode diminuir seu rendimento."
      ],
      "en": [
        "Practice and application make it click quickly.",
        "Long passive sessions may reduce focus.",
        "Learning sticks when you produce artifacts (demos/projects)."
      ],
      "ko": [
        "실습/과제/사례 적용에서 이해가 확 붙습니다.",
        "듣기만/읽기만 오래 하면 집중이 떨어질 수 있습니다.",
        "결과물이 있을 때(데모/과제/프로젝트) 학습이 고정됩니다."
      ]
    },
    "study_tips": {
      "pt": [
        "Alterne blocos de estudo teórico com resolução imediata de exercícios práticos ou projetos aplicados.",
        "Utilize simulações, estudos de caso e resolva problemas reais para testar seu domínio.",
        "Estude fazendo pausas ativas a cada 25-30 minutos e use flashcards físicos ou caminhadas reflexivas."
      ],
      "en": [
        "Attach a 10–15 minute mini-practice per concept.",
        "Use 25/5 focus cycles with movement breaks.",
        "Keep a simple failure log: what → why → next change."
      ],
      "ko": [
        "개념 1개당 “미니 실습 10–15분”을 붙이세요(바로 써먹기).",
        "25분 집중 + 5분 움직임(스트레칭/걷기) 루틴이 잘 맞습니다.",
        "실패 기록을 간단히 남기세요: 무엇→왜→다음 변경."
      ]
    },
    "recommended_formats": {
      "pt": [
        "Laboratórios e projetos 'mão na massa'",
        "Estudos de caso reais",
        "Simulados e exercícios aplicados",
        "Dramatizações e role-play",
        "Construção de protótipos"
      ],
      "en": [
        "Labs",
        "Projects",
        "Simulations",
        "Workshops",
        "Case studies"
      ],
      "ko": [
        "실습 과제",
        "프로젝트",
        "시뮬레이션",
        "워크숍",
        "케이스 스터디"
      ]
    }
  },
  "V+A": {
    "title": {
      "pt": "Multimodal: Visual + Auditivo (V+A)",
      "en": "Multimodal: Visual + Auditory (V+A)",
      "ko": "혼합형: 시각 + 청각 (V+A)"
    },
    "summary": {
      "pt": "Você combina a força dos recursos visuais com a explicação oral, absorvendo o conteúdo com máxima eficácia através de apresentações audiovisuais.",
      "en": "You learn best with narrated visuals.",
      "ko": "당신은 시각 자료와 음성 설명이 함께 제공될 때 가장 잘 배웁니다."
    },
    "traits": {
      "pt": [
        "Associa com muita facilidade o que vê nos slides ou diagramas com a fala do apresentador.",
        "Memoriza muito bem videoaulas bem ilustradas e apresentações dinâmicas.",
        "Gosta de acompanhar gráficos enquanto alguém comenta suas variações."
      ],
      "en": [
        "You thrive with screen + explanation.",
        "Combining visual notes with spoken explanation boosts retention.",
        "Visual-only or audio-only can feel incomplete."
      ],
      "ko": [
        "인강/영상처럼 화면+해설 조합에서 몰입이 좋습니다.",
        "시각 요약과 구두 설명을 같이 쓰면 기억이 오래 갑니다.",
        "혼자 보기만 하거나 듣기만 하면 효율이 덜할 수 있습니다."
      ]
    },
    "study_tips": {
      "pt": [
        "Assista a videoaulas pausando para esboçar graficamente os conceitos explicados.",
        "Ao revisar seus mapas mentais, leia-os e explique-os em voz alta.",
        "Grave vídeos curtos ou áudios explicando diagramas para si mesmo."
      ],
      "en": [
        "Speak your summary while watching; record a 30-second recap.",
        "Next day: quick 2x review + replay your recap.",
        "Pick 3 key screenshots and explain them aloud."
      ],
      "ko": [
        "영상 보면서 핵심을 따라 말하고, 30초 음성 요약을 남기세요.",
        "다음날 2배속 스킵 복습 + 내 음성 요약 재생을 붙이세요.",
        "슬라이드/판서 캡처 3장만 골라 “말로 설명”해보면 정리가 됩니다."
      ]
    },
    "recommended_formats": {
      "pt": [
        "Videoaulas ricas em gráficos",
        "Apresentações com narração oral",
        "Sessões com quadros interativos e diálogo"
      ],
      "en": [
        "Narrated videos",
        "Screen-share tutorials",
        "Explained slide decks",
        "Audio + slides",
        "Whiteboard videos"
      ],
      "ko": [
        "인강/강의 영상",
        "화면 공유 튜토리얼",
        "설명형 슬라이드",
        "오디오+슬라이드",
        "화이트보드 영상"
      ]
    }
  },
  "V+R": {
    "title": {
      "pt": "Multimodal: Visual + Leitura/Escrita (V+R)",
      "en": "Multimodal: Visual + Reading/Writing (V+R)",
      "ko": "혼합형: 시각 + 읽기/쓰기 (V+R)"
    },
    "summary": {
      "pt": "Você capta a visão geral pelos diagramas visuais e fixa os detalhes aprofundando-se na leitura e na escrita estruturada.",
      "en": "Visual map first, written notes to lock it in.",
      "ko": "당신은 시각적 구조를 먼저 잡고, 글로 정리하여 지식을 완성합니다."
    },
    "traits": {
      "pt": [
        "Gosta de materiais com boa diagramação, tabelas comparativas e esquemas explicativos.",
        "Seus cadernos e anotações costumam misturar esquemas gráficos com tópicos minuciosos.",
        "Lê com foco redobrado quando há ilustrações e tabelas de apoio."
      ],
      "en": [
        "Diagrams give you the big picture quickly.",
        "Writing creates confidence and clarity.",
        "You speed up as your notes accumulate."
      ],
      "ko": [
        "도식으로 큰 틀을 잡으면 공부가 훨씬 편해집니다.",
        "글로 정리할 때 ‘이해했다’는 확신이 생깁니다.",
        "정리물이 쌓이면 속도가 점점 빨라지는 편입니다."
      ]
    },
    "study_tips": {
      "pt": [
        "Crie esquemas visuais acompanhados de breves parágrafos de síntese ao lado de cada diagrama.",
        "Converta tabelas e fluxogramas em resumos escritos e vice-versa para reforçar a memorização.",
        "Sublinhe textos usando um código de cores e anote palavras-chave nas margens."
      ],
      "en": [
        "Convert mind maps into a one-page outline.",
        "Translate visuals into sentences for strong recall.",
        "For mistakes: 1 diagram + 3 sentences."
      ],
      "ko": [
        "마인드맵 → 1페이지 목차형 요약으로 변환하세요.",
        "표/그림을 “문장으로 번역”해 적으면 시험 때 강합니다.",
        "오답은 “그림 1개 + 문장 3줄” 조합으로 정리하세요."
      ]
    },
    "recommended_formats": {
      "pt": [
        "Apostilas ilustradas",
        "Artigos técnicos diagramados",
        "Mapas conceituais com descrições detalhadas"
      ],
      "en": [
        "Annotated diagrams",
        "Infographic + summary",
        "Structured notes",
        "Comparison tables",
        "One-page summaries"
      ],
      "ko": [
        "도식+노트",
        "인포그래픽+요약",
        "정리 문서",
        "개념 비교표",
        "한 장 요약"
      ]
    }
  },
  "V+K": {
    "title": {
      "pt": "Multimodal: Visual + Cinestésico (V+K)",
      "en": "Multimodal: Visual + Kinesthetic (V+K)",
      "ko": "혼합형: 시각 + 체감 (V+K)"
    },
    "summary": {
      "pt": "Você aprende observando uma demonstração visual clara e logo em seguida partindo para a execução prática.",
      "en": "Watch, then immediately do.",
      "ko": "당신은 시각적으로 과정을 확인한 뒤, 즉시 직접 해보며 배웁니다."
    },
    "traits": {
      "pt": [
        "Aprende rapidamente com tutoriais práticos em vídeo e demonstrações passo a passo.",
        "Precisa ver alguém fazendo para então reproduzir o processo por conta própria.",
        "Fixa conceitos com muito mais facilidade quando há interação física ou simulação visual."
      ],
      "en": [
        "Examples boost your practice accuracy.",
        "You improve fast by copying, then adapting.",
        "Demo → practice works better than long explanations."
      ],
      "ko": [
        "예시(샘플)가 있으면 실습 정확도가 확 올라갑니다.",
        "따라 한 뒤 변형해보는 과정에서 실력이 빨리 늘어납니다.",
        "긴 설명보다 ‘데모 → 실습’ 흐름이 잘 맞습니다."
      ]
    },
    "study_tips": {
      "pt": [
        "Assista a tutoriais passo a passo e execute cada etapa simultaneamente na prática.",
        "Construa modelos físicos ou esboce protótipos visuais interativos para testar suas ideias.",
        "Desenhe à mão livre em quadros ou folhas grandes enquanto resolve exercícios práticos."
      ],
      "en": [
        "After copying one example, build one personal variant.",
        "Capture steps (screenshots/notes) to speed repetition.",
        "Compare before/after outputs visually."
      ],
      "ko": [
        "예시 1개 따라 만든 뒤, “내 버전 1개”를 바로 추가하세요.",
        "과정 캡처(스크린샷/메모)로 반복 학습 속도를 올리세요.",
        "실습 결과를 “전/후”로 비교해 차이를 눈으로 확인하세요."
      ]
    },
    "recommended_formats": {
      "pt": [
        "Vídeos tutoriais com demonstração prática",
        "Workshops interativos",
        "Simuladores gráficos e visuais"
      ],
      "en": [
        "Tutorial + practice",
        "Demo tasks",
        "Workshops",
        "Follow-along courses",
        "Project-based learning"
      ],
      "ko": [
        "튜토리얼+실습",
        "데모 과제",
        "워크숍",
        "따라하기 코스",
        "프로젝트 기반 학습"
      ]
    }
  },
  "A+R": {
    "title": {
      "pt": "Multimodal: Auditivo + Leitura/Escrita (A+R)",
      "en": "Multimodal: Auditory + Reading/Writing (A+R)",
      "ko": "혼합형: 청각 + 읽기/쓰기 (A+R)"
    },
    "summary": {
      "pt": "Você processa a informação ouvindo debates e explicações orais e consolida o aprendizado colocando-o por escrito.",
      "en": "Listen, then write to solidify.",
      "ko": "당신은 듣고 이해한 내용을 글로 정리할 때 지식을 완벽히 소화합니다."
    },
    "traits": {
      "pt": [
        "Excelente capacidade de captar pontos-chave durante aulas e transformá-los em resumos escritos.",
        "Gosta de ler textos em voz alta para assimilar melhor a informação.",
        "Articula ideias com fluidez tanto na expressão oral quanto na redação."
      ],
      "en": [
        "Lectures + note structure completes learning for you.",
        "Writing reveals gaps and strengthens understanding.",
        "Templates significantly boost consistency."
      ],
      "ko": [
        "강의를 들은 뒤 필기/요약으로 정리하면 학습이 완성됩니다.",
        "말로 이해한 걸 글로 바꾸는 과정에서 빈틈이 보입니다.",
        "정리 템플릿이 있으면 성과가 크게 올라갑니다."
      ]
    },
    "study_tips": {
      "pt": [
        "Participe de discussões ou assista a aulas gravadas e redija um relatório pessoal logo em seguida.",
        "Leia resumos e anotações em voz alta para ativar simultaneamente os canais auditivo e verbal.",
        "Transforme podcasts educativos em resumos organizados por tópicos."
      ],
      "en": [
        "Use a fixed routine: 5-line summary + 3 questions + 5 keywords.",
        "Keep both a 30-second audio recap and a short text recap.",
        "Next day, revisit only the 3 questions for fast review."
      ],
      "ko": [
        "강의 후 “요약 5줄 + 질문 3개 + 키워드 5개”를 고정 루틴으로.",
        "30초 음성 요약 + 5줄 텍스트 요약을 둘 다 남겨보세요.",
        "다음날 질문 3개만 다시 풀어도 복습 효과가 큽니다."
      ]
    },
    "recommended_formats": {
      "pt": [
        "Audiobooks acompanhados do texto",
        "Podcasts com transcrição/resumo",
        "Grupos de discussão com notas compartilhadas"
      ],
      "en": [
        "Lectures + notes",
        "Audio + summaries",
        "Structured templates",
        "Lecture notes",
        "Q&A docs"
      ],
      "ko": [
        "인강+필기",
        "오디오+요약",
        "요약 노트 템플릿",
        "강의노트",
        "Q&A 문서"
      ]
    }
  },
  "A+K": {
    "title": {
      "pt": "Multimodal: Auditivo + Cinestésico (A+K)",
      "en": "Multimodal: Auditory + Kinesthetic (A+K)",
      "ko": "혼합형: 청각 + 체감 (A+K)"
    },
    "summary": {
      "pt": "Você aprende melhor quando alguém o orienta verbalmente enquanto você realiza a atividade na prática.",
      "en": "Verbal guidance + hands-on practice is your best combo.",
      "ko": "당신은 말로 안내를 받으며 직접 손으로 해볼 때 가장 효율적입니다."
    },
    "traits": {
      "pt": [
        "Excelente rendimento em treinamentos orientados, mentorias e oficinas práticas com instrutor.",
        "Gosta de conversar e pensar em voz alta enquanto resolve problemas e executa tarefas.",
        "Aprende rápido em dinâmicas participativas e simulações com diálogo."
      ],
      "en": [
        "You grow fastest with coached, feedback-rich practice.",
        "Real-time questions and fixes suit you.",
        "Pure theory without action can feel frustrating."
      ],
      "ko": [
        "코칭/피드백이 있는 실습에서 성장 속도가 빠릅니다.",
        "실행 중에 바로 질문하고 바로 해결하는 스타일이 잘 맞습니다.",
        "혼자 조용히 이론만 보면 답답할 수 있습니다."
      ]
    },
    "study_tips": {
      "pt": [
        "Busque parceiros de estudo ou mentores com quem você possa interagir verbalmente durante a prática.",
        "Coloque o conteúdo em prática enquanto repete os procedimentos em voz alta.",
        "Utilize flashcards físicos fazendo perguntas e respondendo oralmente em pé ou caminhando."
      ],
      "en": [
        "Choose follow-along practice; resolve blockers immediately.",
        "Record practice to see what to improve next time.",
        "End by verbally summarizing 3 things you did today."
      ],
      "ko": [
        "따라하기 실습을 선택하고, 막히면 즉시 질문/검색으로 해결하세요.",
        "실습을 녹화/기록해 “다음엔 어디를 줄일지” 체크하세요.",
        "실습 끝나면 “오늘 배운 동작 3개”만 말로 정리하면 기억이 유지됩니다."
      ]
    },
    "recommended_formats": {
      "pt": [
        "Mentorias práticas",
        "Laboratórios com instrutor",
        "Estudos de caso participativos com simulação prática"
      ],
      "en": [
        "Coached sessions",
        "Workshops",
        "Pair practice",
        "Live coding/demos",
        "Practice-first courses"
      ],
      "ko": [
        "코칭형 수업",
        "워크숍",
        "페어 실습",
        "라이브 코딩/라이브 데모",
        "실습 중심 강의"
      ]
    }
  },
  "R+K": {
    "title": {
      "pt": "Multimodal: Leitura/Escrita + Cinestésico (R+K)",
      "en": "Multimodal: Reading/Writing + Kinesthetic (R+K)",
      "ko": "혼합형: 읽기/쓰기 + 체감 (R+K)"
    },
    "summary": {
      "pt": "Você lê com atenção os manuais e instruções passo a passo para depois aplicá-los com rigor na prática.",
      "en": "Read the steps, then lock it in by doing.",
      "ko": "당신은 글로 된 절차를 파악한 뒤, 직접 실습하며 완성하는 학습자입니다."
    },
    "traits": {
      "pt": [
        "Gosta de ter roteiros claros e documentação detalhada antes de iniciar qualquer atividade prática.",
        "Registra por escrito os resultados de seus testes e experimentos para aprender com os erros e acertos.",
        "Excelente precisão na execução de protocolos técnicos e operacionais."
      ],
      "en": [
        "Guides/checklists dramatically improve your practice speed.",
        "Logs and notes stabilize long-term skill.",
        "Read → do → record is your best cycle."
      ],
      "ko": [
        "가이드/체크리스트가 있으면 실습 효율이 급상승합니다.",
        "기록(로그/노트)이 쌓일수록 실력이 안정적으로 올라갑니다.",
        "“읽고 → 해보고 → 기록” 사이클이 잘 맞습니다."
      ]
    },
    "study_tips": {
      "pt": [
        "Leia a fundamentação ou instruções escritas antes de ir para o laboratório ou exercício prático.",
        "Mantenha um diário de bordo ou relatório documentando o que funcionou e o que precisa ser ajustado.",
        "Elabore seus próprios checklists passo a passo para tarefas complexas."
      ],
      "en": [
        "Practice via checklists and keep one-line outcome logs.",
        "Document errors as cause → fix → prevention.",
        "Skim docs before practice; revisit after to reflect."
      ],
      "ko": [
        "체크리스트대로 실습하고, 결과를 한 줄 로그로 남기세요.",
        "오류는 “원인–해결–재발 방지”로 정리하면 같은 실수를 줄입니다.",
        "실습 전 2분만 문서를 훑고(목차), 실습 후 다시 문서로 복기하세요."
      ]
    },
    "recommended_formats": {
      "pt": [
        "Roteiros de laboratório",
        "Manuais técnicos com tutoriais práticos",
        "Exercícios práticos com gabarito comentado por escrito"
      ],
      "en": [
        "Manuals + practice",
        "Recipe-style guides",
        "Doc-driven projects",
        "Checklist learning",
        "Mistake/error notes"
      ],
      "ko": [
        "매뉴얼+실습",
        "레시피형 가이드",
        "문서 기반 프로젝트",
        "체크리스트 학습",
        "오답/오류 노트"
      ]
    }
  },
  "BALANCED": {
    "title": {
      "pt": "Multimodal Equilibrado (VARK Completo)",
      "en": "Balanced (VARK Multimodal)",
      "ko": "균형형 (VARK Multimodal)"
    },
    "summary": {
      "pt": "Você possui pontuações próximas em todos os estilos, adaptando sua forma de aprender com flexibilidade dependendo da matéria e do contexto.",
      "en": "You adapt your learning style flexibly to the goal and context.",
      "ko": "당신은 상황과 목표에 따라 다양한 학습 방식을 유연하게 활용합니다."
    },
    "traits": {
      "pt": [
        "Transita com facilidade entre leitura, recursos visuais, explicações orais e prática aplicada.",
        "Geralmente tem uma compreensão mais completa e holística dos assuntos complexos.",
        "Pode demorar um pouco mais para escolher por onde começar se houver múltiplos formatos disponíveis."
      ],
      "en": [
        "You’re resilient across different learning contexts.",
        "You can optimize methods based on goals.",
        "Strong routines make your performance very consistent."
      ],
      "ko": [
        "한 가지 방식에 고정되지 않아 환경 변화에 강합니다.",
        "목표에 따라 최적 조합을 찾는 능력이 있습니다.",
        "루틴만 잘 만들면 성과가 안정적으로 올라갑니다."
      ]
    },
    "study_tips": {
      "pt": [
        "Aproveite a flexibilidade: use recursos visuais para a introdução, leitura para aprofundar, áudio para revisar e prática para fixar.",
        "Selecione o formato mais adequado à natureza de cada disciplina (ex: exatas com prática e esquemas, humanas com leitura e debate).",
        "Ao sentir bloqueio em um formato, alterne imediatamente para outro para destravar o aprendizado."
      ],
      "en": [
        "Match format to goal: concepts (V/R) → apply (K) → review (A).",
        "Use a 3-step loop: visual summary + written summary + mini practice.",
        "On low-energy days, stick to one simple format (e.g., 5-line recap)."
      ],
      "ko": [
        "목표별로 포맷을 정하세요: 개념(V/R) → 적용(K) → 복습(A).",
        "한 주제당 “시각 요약 + 텍스트 요약 + 미니 실습” 3단 루틴이 잘 맞습니다.",
        "컨디션이 떨어지는 날은 ‘한 가지 포맷’만 고정해도 충분합니다(예: 요약 5줄)."
      ]
    },
    "recommended_formats": {
      "pt": [
        "Cursos integrados com vídeos, apostilas, podcasts e exercícios aplicados",
        "Ambientes de aprendizado mistos (Blended Learning)"
      ],
      "en": [
        "Blended routines (video + docs + practice)",
        "Projects + summaries",
        "Group + solo review",
        "Weekly review routines",
        "Mixed-format learning"
      ],
      "ko": [
        "혼합 루틴(영상+문서+실습)",
        "프로젝트+요약",
        "스터디+개인 복습",
        "주간 복습 루틴",
        "포맷 교차 학습"
      ]
    }
  }
};

export const kolbResults: Record<string, ResultProfile> = {
  "DIVERGER": {
    "title": {
      "pt": "Estilo Divergente (Sentir e Observar)",
      "en": "Diverger",
      "ko": "발산형 (Diverger)"
    },
    "summary": {
      "pt": "Você aprende observando situações concretas sob múltiplos ângulos e explorando os significados mais profundos com criatividade e empatia.",
      "en": "You learn by observing and exploring multiple perspectives.",
      "ko": "당신은 다양한 관점을 관찰하고 의미를 해석하며 배웁니다."
    },
    "traits": {
      "pt": [
        "Excelente capacidade imaginativa, empatia e facilidade para enxergar o contexto humano e emocional.",
        "Muito forte em geração de ideias (brainstorming), interpretação de casos e perguntas sobre o 'porquê'.",
        "Prefere observar e refletir com cuidado antes de se precipitar em tomar uma atitude."
      ],
      "en": [
        "Strong at context and empathy-based understanding.",
        "Great at ideation and interpreting “why.”",
        "You prefer reflection before action."
      ],
      "ko": [
        "사람/상황의 맥락을 잘 읽고 공감 기반 이해가 강합니다.",
        "아이디어 발상, 사례 해석, “왜?” 질문에 강합니다.",
        "실행 전 관찰·정리 시간이 있어야 몰입이 됩니다."
      ]
    },
    "study_tips": {
      "pt": [
        "Após analisar um caso de estudo, registre: 3 observações cuidadosas + 1 insight reflexivo.",
        "Em grupos de estudo, compare suas percepções com as opiniões dos outros antes de tirar conclusões.",
        "Reserve momentos de silêncio para reflexão pessoal após aulas densas."
      ],
      "en": [
        "After a case: write 3 observations + 1 insight.",
        "Separate your view vs others’ view in notes.",
        "Compare 2–3 more examples before final conclusions."
      ],
      "ko": [
        "케이스 1개를 보고 “관찰 3개 + 인사이트 1개”를 남기세요.",
        "토론 후 ‘내 관점 vs 다른 관점’을 분리해 적으세요.",
        "결론을 서두르기보다 비교 사례를 2–3개 더 보세요."
      ]
    },
    "recommended_formats": {
      "pt": [
        "Estudos de caso reais",
        "Discussões em grupo e debates",
        "Diários reflexivos",
        "Palestras orientadas a vivências",
        "Análise de cenários"
      ],
      "en": [
        "Case studies",
        "Discussion",
        "Journaling",
        "Reflective lectures",
        "Reflection templates"
      ],
      "ko": [
        "케이스 스터디",
        "토론",
        "저널링",
        "관찰 기반 강의",
        "리플렉션 템플릿"
      ]
    }
  },
  "ASSIMILATOR": {
    "title": {
      "pt": "Estilo Assimilador (Pensar e Observar)",
      "en": "Assimilator",
      "ko": "동화형 (Assimilator)"
    },
    "summary": {
      "pt": "Você aprende criando modelos mentais sólidos, integrando ideias dispersas em teorias coerentes, elegantes e lógicas.",
      "en": "You learn by building clear theories and mental models.",
      "ko": "당신은 명확한 이론과 개념 모델을 만들며 배웁니다."
    },
    "traits": {
      "pt": [
        "Habilidade excepcional para lidar com informações teóricas amplas e organizá-las de modo lógico e estruturado.",
        "Mais interessado em conceitos abstratos, rigor conceitual e lógica do que em pessoas ou aplicações imediatas.",
        "Gosta de entender o funcionamento profundo dos sistemas e frameworks teóricos."
      ],
      "en": [
        "You prioritize structure, principles, and clarity.",
        "You want “why” before “how.”",
        "Frameworks and conceptual notes are your strength."
      ],
      "ko": [
        "정의/원리/구조가 명확할수록 편합니다.",
        "“왜 그런가”를 먼저 알고 싶어합니다.",
        "프레임워크/정리 노트에서 강점이 큽니다."
      ]
    },
    "study_tips": {
      "pt": [
        "Crie sínteses conceituais e organize as informações em matrizes, frameworks e modelos próprios.",
        "Ao aprender novos temas, procure a bibliografia de referência e os fundamentos teóricos clássicos.",
        "Sistematize o aprendizado identificando a regra central e suas ramificações lógicas."
      ],
      "en": [
        "Use definition → assumptions → exceptions → examples.",
        "Build hierarchical notes for long-term recall.",
        "Validate the model with quick Q&A before practice."
      ],
      "ko": [
        "‘정의–전제–예외–예시’ 템플릿으로 정리하세요.",
        "트리 구조(대주제→소주제)로 노트를 만들면 기억이 오래 갑니다.",
        "실습 전에 Q&A로 개념이 흔들리지 않는지 점검하세요."
      ]
    },
    "recommended_formats": {
      "pt": [
        "Leituras teóricas e acadêmicas",
        "Palestras expositivas estruturadas",
        "Modelagem conceitual",
        "Análise de dados",
        "Pesquisa científica"
      ],
      "en": [
        "Textbooks/papers",
        "Framework lectures",
        "Concept docs",
        "Structured notes",
        "Concept maps"
      ],
      "ko": [
        "교재/논문 요약",
        "프레임워크 강의",
        "개념 정리 문서",
        "요약 노트",
        "개념 지도"
      ]
    }
  },
  "CONVERGER": {
    "title": {
      "pt": "Estilo Convergente (Pensar e Agir)",
      "en": "Converger",
      "ko": "수렴형 (Converger)"
    },
    "summary": {
      "pt": "Você aprende aplicando teorias e conceitos abstratos na prática para resolver problemas específicos e tomar decisões objetivas.",
      "en": "You learn by applying concepts to solve concrete problems.",
      "ko": "당신은 개념을 적용해 구체적인 문제를 해결하며 배웁니다."
    },
    "traits": {
      "pt": [
        "Focado em encontrar a melhor solução técnica para um problema bem definido.",
        "Raciocínio dedutivo refinado e pragmatismo: prefere lidar com tarefas técnicas e lógicas.",
        "Gosta de testar ideias para comprovar sua utilidade e eficiência no mundo real."
      ],
      "en": [
        "Strong in real-world application and problem-solving.",
        "Clear goals and criteria increase speed.",
        "Too much theory without use can feel slow."
      ],
      "ko": [
        "실전 적용과 문제 해결에 강합니다.",
        "목표/기준이 뚜렷할수록 속도가 납니다.",
        "추상적인 얘기만 길면 지루할 수 있습니다."
      ]
    },
    "study_tips": {
      "pt": [
        "Formule hipóteses claras ('Se eu fizer X, o resultado será Y') e teste-as imediatamente.",
        "Dedique a maior parte do tempo de estudo à resolução de problemas complexos e simulações técnicas.",
        "Conecte cada teoria aprendida a um problema prático do seu dia a dia profissional."
      ],
      "en": [
        "For each concept, do 3 problems (basic/applied/real).",
        "Break work into checklists with clear completion criteria.",
        "Validate learning via metrics and tangible outputs."
      ],
      "ko": [
        "개념 1개당 문제 3개(기본/응용/실전)로 바로 적용하세요.",
        "작업을 체크리스트로 쪼개고, 완료 기준(DoD)을 정하세요.",
        "결과를 지표/산출물로 확인하면 학습이 더 빨라집니다."
      ]
    },
    "recommended_formats": {
      "pt": [
        "Resolução de listas de problemas",
        "Laboratórios técnicos e simulações",
        "Projetos de tecnologia",
        "Tomada de decisão com base em dados",
        "Estudos de viabilidade"
      ],
      "en": [
        "Problem sets",
        "Labs",
        "Projects",
        "Hands-on exercises",
        "Applied cases"
      ],
      "ko": [
        "문제 풀이",
        "실습",
        "프로젝트",
        "랩",
        "케이스 기반 과제"
      ]
    }
  },
  "ACCOMMODATOR": {
    "title": {
      "pt": "Estilo Acomodador (Sentir e Agir)",
      "en": "Accommodator",
      "ko": "조절형 (Accommodator)"
    },
    "summary": {
      "pt": "Você aprende através da ação direta, da experiência real e da capacidade de se adaptar rapidamente a situações imprevisíveis.",
      "en": "You learn fastest through trial-and-error and real experience.",
      "ko": "당신은 시행착오와 직접적인 경험을 통해 가장 빠르게 배웁니다."
    },
    "traits": {
      "pt": [
        "Aprende fazendo: arrisca-se com facilidade, aprende com tentativa e erro e gosta de desafios dinâmicos.",
        "Confia na intuição e na experiência imediata muito mais do que em teorias abstratas.",
        "Excelente capacidade de adaptação quando as circunstâncias mudam de repente."
      ],
      "en": [
        "You prefer “try, then adjust.”",
        "Real situations energize you.",
        "Fast feedback accelerates your growth."
      ],
      "ko": [
        "일단 해보고 조정하는 데 강합니다.",
        "실전/현장에서 에너지가 올라갑니다.",
        "피드백이 있으면 성장 속도가 더 빨라집니다."
      ]
    },
    "study_tips": {
      "pt": [
        "Trabalhe em projetos de ritmo dinâmico com entregas curtas e frequentes (estilo sprint).",
        "Aprenda por meio de experimentação real, assumindo iniciativas práticas e testes em campo.",
        "Combine sua facilidade de ação com um pequeno checklist de reflexão para não repetir erros do passado."
      ],
      "en": [
        "Run quick 10–20 minute experiments in short cycles.",
        "Keep a 3-line failure log: what → why → next change.",
        "Build a fast feedback loop with a mentor/peer."
      ],
      "ko": [
        "10–20분 단위로 작은 실험을 반복하세요(빠른 사이클).",
        "실패 기록: 무엇→왜→다음 변경(딱 3줄이면 충분).",
        "멘토/동료에게 빠르게 피드백 받는 루프를 만드세요."
      ]
    },
    "recommended_formats": {
      "pt": [
        "Oficinas práticas (workshops)",
        "Projetos de campo e empreendedorismo",
        "Simulações interativas e gamificação",
        "Desafios em equipe",
        "Protótipos rápidos"
      ],
      "en": [
        "Prototyping",
        "Real-world projects",
        "Coaching/feedback",
        "Hackathon-style learning",
        "Experiment-driven learning"
      ],
      "ko": [
        "프로토타이핑",
        "현장 프로젝트",
        "코칭/피드백",
        "해커톤형 학습",
        "실험 기반 학습"
      ]
    }
  },
  "MIXED_TEMPLATE": {
    "title": {
      "pt": "Estilo Integrado do Ciclo de Kolb",
      "en": "Mixed",
      "ko": "혼합형 (Mixed)"
    },
    "summary": {
      "pt": "Suas preferências estão muito próximas em mais de uma dimensão, permitindo que você navegue pelo ciclo completo de aprendizagem com equilíbrio.",
      "en": "Two styles are very close. Depending on context, both can be strengths.",
      "ko": "두 가지 이상의 학습 스타일이 균형을 이루며 발달되어 있습니다."
    },
    "traits": {
      "pt": [
        "Capacidade de circular com naturalidade entre sentir, refletir, teorizar e praticar.",
        "Versátil em diferentes ambientes de aprendizado, adaptando sua postura conforme a demanda.",
        "Equilibra análise teórica com ímpeto de execução prática."
      ],
      "en": [
        "Alternate both approaches to discover the routine that works best for you."
      ],
      "ko": [
        "두 스타일의 장점을 번갈아 적용해보며 나에게 맞는 루틴을 찾는 것이 효과적입니다."
      ]
    },
    "study_tips": {
      "pt": [
        "Aproveite para fechar o ciclo de Kolb: Vivencie → Reflita sobre o que ocorreu → Conceitue uma regra geral → Teste a regra em um novo contexto.",
        "Identifique a fase do ciclo em que você mais hesita e dedique atenção especial a ela."
      ],
      "en": [
        "Try each style’s tips for a week and lock in the combination that yields better results."
      ],
      "ko": [
        "결과 화면에서 두 스타일의 팁을 번갈아 1주씩 적용해보고, 효율이 더 좋은 조합을 고정하세요."
      ]
    },
    "recommended_formats": {
      "pt": [
        "Métodos ativos de aprendizagem",
        "PBL (Problem-Based Learning)",
        "Projetos integradores multidisciplinares"
      ],
      "en": [
        "Blend the recommended formats from both styles"
      ],
      "ko": [
        "두 스타일의 추천 포맷을 혼합"
      ]
    }
  }
};

export const gardnerResults: Record<string, ResultProfile> = {
  "LOG": {
    "title": {
      "pt": "Inteligência Lógico-Matemática",
      "en": "Logical–Mathematical",
      "ko": "논리·수학 지능"
    },
    "summary": {
      "pt": "Facilidade para raciocínio dedutivo, cálculo, pensamento científico, identificação de padrões e resolução lógica de problemas.",
      "en": "You learn best through logic, rules, and problem-solving.",
      "ko": "당신은 논리와 규칙, 문제 해결 과정을 통해 가장 잘 배웁니다."
    },
    "traits": {
      "pt": [
        "Analisa causas e efeitos com rigor e busca a lógica por trás de cada fenômeno.",
        "Trabalha com rapidez ao receber metas com regras, métricas e restrições bem definidas.",
        "Prefere explicações embasadas em dados objetivos em vez de argumentos puramente intuitivos."
      ],
      "en": [
        "Strong with cause-effect, patterns, and stepwise reasoning.",
        "Clear constraints increase your speed.",
        "Intuition-only explanations may feel unsatisfying."
      ],
      "ko": [
        "원인-결과, 패턴, 단계적 해결에 강합니다.",
        "기준/제약조건이 명확할수록 속도가 납니다.",
        "근거 없이 “그냥 이렇게 하자”는 설명이 답답할 수 있습니다."
      ]
    },
    "study_tips": {
      "pt": [
        "Estruture o conhecimento em fluxogramas condicionais do tipo 'se... então...'.",
        "Pergunte o 'porquê' até desvendar o mecanismo básico do tema.",
        "Pratique resolvendo exercícios do mais simples ao mais avançado para construir padrões sólidos."
      ],
      "en": [
        "Convert concepts into if/then rules and constraints.",
        "Ask “why?” three times and summarize the logic chain in one line.",
        "Practice by difficulty (basic → applied → variations) to build patterns."
      ],
      "ko": [
        "개념을 규칙/조건문으로 바꿔 적어보세요(“만약~이면, ~한다”).",
        "“왜?”를 3번 물어 논리 흐름을 한 줄로 요약하세요.",
        "문제는 난이도별(기본→응용→변형)로 반복해 패턴을 쌓으세요."
      ]
    },
    "recommended_formats": {
      "pt": [
        "Resolução de problemas",
        "Análise de gráficos e estatísticas",
        "Cadernos de lógica e algoritmos",
        "Projetos científicos e experimentação"
      ],
      "en": [
        "Problem sets",
        "Data/graph explanations",
        "Logic notes",
        "Algorithmic summaries",
        "Experiment design"
      ],
      "ko": [
        "문제 풀이",
        "데이터/그래프 설명",
        "로직 노트",
        "알고리즘식 정리",
        "실험 설계"
      ]
    }
  },
  "LIN": {
    "title": {
      "pt": "Inteligência Linguística",
      "en": "Linguistic",
      "ko": "언어 지능"
    },
    "summary": {
      "pt": "Sensibilidade aguçada para o significado, sonoridade e poder das palavras, expressando-se com fluidez tanto na fala quanto na escrita.",
      "en": "Language—reading, writing, and expression—drives your learning.",
      "ko": "당신은 읽기, 쓰기, 말하기 등 언어를 통한 표현에서 가장 뛰어난 학습자입니다."
    },
    "traits": {
      "pt": [
        "Aprende lendo, debatendo, redigindo resumos e usando a linguagem com precisão.",
        "Excelente vocabulário, facilidade para contar histórias e sintetizar ideias complexas.",
        "Gosta de nuances de significado, etimologias e discussões ricas em vocabulário."
      ],
      "en": [
        "Explaining in your own words strengthens understanding.",
        "Analogies/examples improve retention.",
        "You like clear wording; ambiguity pushes you to clarify."
      ],
      "ko": [
        "내 말로 설명하거나 글로 쓰면 이해가 단단해집니다.",
        "예시/비유를 만들면 기억이 오래 갑니다.",
        "표현이 애매하면 찝찝해서 더 확인하려는 경향이 있습니다."
      ]
    },
    "study_tips": {
      "pt": [
        "Mantenha um diário de aprendizagem onde você escreve reflexões sobre os temas estudados.",
        "Ensine o conteúdo para outra pessoa ou grave explicações orais dos pontos-chave.",
        "Leia autores de referência e crie fichamentos comentados de textos-chave."
      ],
      "en": [
        "Use a “5 sentences in my own words” routine.",
        "Write 1 analogy + 1 example sentence for hard concepts.",
        "Prefer Q&A flashcards over pure definitions."
      ],
      "ko": [
        "“내 말로 5문장 요약”을 기본 루틴으로 잡으세요.",
        "어려운 개념은 비유 1개 + 예시 1개를 문장으로 만들어보세요.",
        "플래시카드는 ‘정의’보다 ‘질문-답’ 형태가 더 강합니다."
      ]
    },
    "recommended_formats": {
      "pt": [
        "Leituras dirigidas",
        "Redação de ensaios e artigos",
        "Debates estruturados",
        "Flashcards com definições",
        "Gravações orais"
      ],
      "en": [
        "Summaries",
        "Writing (notes/blog)",
        "Discussion scripts",
        "Reading + annotation",
        "Presentation scripts"
      ],
      "ko": [
        "요약 노트",
        "글쓰기(노션/블로그)",
        "토론 스크립트",
        "독서/정리",
        "발표 원고"
      ]
    }
  },
  "SPA": {
    "title": {
      "pt": "Inteligência Espacial-Visual",
      "en": "Spatial",
      "ko": "공간 지능"
    },
    "summary": {
      "pt": "Capacidade de perceber o mundo visual com precisão, recriar imagens na mente e orientar-se com maestria no espaço tridimensional.",
      "en": "Visual structure and spatial thinking accelerate learning.",
      "ko": "당신은 시각적 구조와 공간적 상상력을 통해 빠르게 학습합니다."
    },
    "traits": {
      "pt": [
        "Pensa em imagens, visualiza diagramas e lembra da posição espacial dos itens em uma página.",
        "Aprecia artes visuais, mapas, maquetes, infográficos, arquitetura e design.",
        "Compreende muito melhor quando conceitos abstratos são transformados em analogias visuais."
      ],
      "en": [
        "Diagrams give you the big picture fast.",
        "Mental layouts support long-term recall.",
        "Long text can feel scattered without structure."
      ],
      "ko": [
        "도식/지도/그림이 있으면 바로 큰 틀이 잡힙니다.",
        "머릿속에 배치가 잡히면 기억이 오래 갑니다.",
        "글만 길게 늘어지면 내용이 ‘흩어져’ 보일 수 있습니다."
      ]
    },
    "study_tips": {
      "pt": [
        "Substitua anotações lineares por mapas mentais, diagramas de Venn e esboços visuais.",
        "Use marcadores de texto com sistema de cores padronizado para mapear as páginas.",
        "Visualize mentalmente o processo como uma animação antes de responder a questões."
      ],
      "en": [
        "Create a one-diagram summary per topic and connect flows with arrows.",
        "Compare similar concepts in a table (differences/commonalities).",
        "Reuse consistent colors/icons to make review easier."
      ],
      "ko": [
        "주제당 “그림 1장 요약”을 만들고, 화살표로 흐름을 연결하세요.",
        "비슷한 개념은 표로 비교(차이점/공통점)하면 정리가 빨라집니다.",
        "색/아이콘을 고정해 반복 사용하면 복습이 훨씬 쉬워집니다."
      ]
    },
    "recommended_formats": {
      "pt": [
        "Infográficos",
        "Mapas mentais",
        "Vídeos em motion graphics",
        "Modelos 3D e diagramas",
        "Tabelas comparativas coloridas"
      ],
      "en": [
        "Mind maps",
        "Flowcharts",
        "Infographics",
        "Whiteboarding",
        "Visual note-taking"
      ],
      "ko": [
        "마인드맵",
        "흐름도",
        "인포그래픽",
        "화이트보드",
        "시각 노트(스케치노트)"
      ]
    }
  },
  "MUS": {
    "title": {
      "pt": "Inteligência Musical",
      "en": "Musical",
      "ko": "음악 지능"
    },
    "summary": {
      "pt": "Sensibilidade para ritmos, melodias, timbres e padrões sonoros, usando a cadência para memorizar e organizar informações.",
      "en": "Sound cues (rhythm, tone, repetition) strengthen memory.",
      "ko": "당신은 리듬과 멜로디, 소리 패턴을 활용할 때 기억력과 집중력이 극대화됩니다."
    },
    "traits": {
      "pt": [
        "Nota rapidamente alterações sutis no tom de voz e no ritmo ambiental.",
        "Conecta sons, batidas e rimas a memórias e conceitos.",
        "Geralmente estuda melhor com música adequada ou usa sons para manter o fluxo de concentração."
      ],
      "en": [
        "Rhythm and repetition boost memorization.",
        "You’re sensitive to tone and nuance.",
        "Audio summaries help retention."
      ],
      "ko": [
        "리듬/반복이 들어가면 암기가 확 좋아집니다.",
        "억양/톤/말투 변화에 민감해 뉘앙스를 잘 잡는 편입니다.",
        "‘소리로 한번 정리’하면 기억이 오래 유지됩니다."
      ]
    },
    "study_tips": {
      "pt": [
        "Crie rimas, paródias ou mnemônicos ritmados para memorizar sequências ou fórmulas.",
        "Associe tópicos de estudo a playlists específicas (música instrumental / Lo-Fi / frequências binaurais).",
        "Leia anotações com cadência rítmica marcada para reforçar a memorização fonética."
      ],
      "en": [
        "Turn key points into short rhythmic phrases and repeat them.",
        "Encode hard content with rhyme/mnemonic lines.",
        "Record voice notes and replay during commutes."
      ],
      "ko": [
        "핵심을 짧은 문장으로 만들고 리듬 있게 반복하세요.",
        "어려운 내용은 라임/연상 구절로 “코드화”해보세요.",
        "음성 메모로 요약하고 이동 시간에 반복 재생하세요."
      ]
    },
    "recommended_formats": {
      "pt": [
        "Mnemônicos sonoros",
        "Podcasts educativos",
        "Playlists focadas em concentração",
        "Aulas dialogadas com boa entonação"
      ],
      "en": [
        "Audio recaps",
        "Read-aloud",
        "Rhythm mnemonics",
        "Presentation practice",
        "Replay-based review"
      ],
      "ko": [
        "오디오 요약",
        "낭독",
        "리듬 암기법",
        "발표 연습",
        "반복 청취"
      ]
    }
  },
  "KIN": {
    "title": {
      "pt": "Inteligência Corporal-Cinestésica",
      "en": "Bodily–Kinesthetic",
      "ko": "신체·운동 지능"
    },
    "summary": {
      "pt": "Domínio e consciência corporal, habilidade para manipular objetos com destreza e aprendizado por meio do movimento físico.",
      "en": "Hands-on practice and movement drive your learning.",
      "ko": "당신은 직접 몸을 움직이고 도구를 조작하며 배울 때 가장 큰 성과를 냅니다."
    },
    "traits": {
      "pt": [
        "Aprende com as mãos: precisa manusear, montar, desmontar e fazer para entender.",
        "A retenção diminui se for forçado a ficar imóvel em aulas expositivas monótonas.",
        "Gesticula enquanto fala e usa a linguagem corporal de maneira expressiva."
      ],
      "en": [
        "Hands-on activity boosts your focus.",
        "Producing something makes learning feel real.",
        "Sitting too long can reduce efficiency."
      ],
      "ko": [
        "실습/제작/조작이 들어가면 집중이 잘 됩니다.",
        "결과물이 나와야 ‘이해했다’는 감각이 생깁니다.",
        "오래 앉아 있기만 하면 효율이 떨어질 수 있습니다."
      ]
    },
    "study_tips": {
      "pt": [
        "Utilize a técnica Pomodoro com pausas físicas ativas (caminhadas curtas, alongamentos).",
        "Estude caminhando pela sala enquanto revisa cartões de estudo físicos.",
        "Transforme o estudo em dramatizações, simulações ou construção de protótipos manuais."
      ],
      "en": [
        "Attach a 10–15 minute mini-practice per concept.",
        "Use movement breaks every 20–30 minutes.",
        "Save artifacts (demos/logs) to speed up future learning."
      ],
      "ko": [
        "개념 1개당 미니 실습을 붙이세요(10–15분이면 충분).",
        "20–30분마다 짧은 움직임 휴식을 넣어 리셋하세요.",
        "산출물(데모/과제/기록)을 남기면 다음 학습이 훨씬 빨라집니다."
      ]
    },
    "recommended_formats": {
      "pt": [
        "Laboratórios práticos",
        "Maquetes e modelos físicos",
        "Simulações de situações reais",
        "Técnicas de estudo em movimento"
      ],
      "en": [
        "Labs",
        "Projects",
        "Workshops",
        "Simulations",
        "Making/building"
      ],
      "ko": [
        "실습 과제",
        "프로젝트",
        "워크숍",
        "시뮬레이션",
        "메이킹/제작"
      ]
    }
  },
  "INTER": {
    "title": {
      "pt": "Inteligência Interpessoal",
      "en": "Interpersonal",
      "ko": "대인관계 지능"
    },
    "summary": {
      "pt": "Facilidade para compreender intenções, motivações e sentimentos dos outros, destacando-se na liderança, colaboração e empatia.",
      "en": "You learn best through interaction and collaboration.",
      "ko": "당신은 사람들과의 상호작용, 협력, 대화를 통해 가장 잘 배웁니다."
    },
    "traits": {
      "pt": [
        "Processa pensamentos e soluciona problemas conversando e trocando ideias com outras pessoas.",
        "Excelente capacidade de mediação de conflitos, escuta ativa e trabalho em time.",
        "Sente-se muito mais motivado em dinâmicas de grupo do que em estudos isolados."
      ],
      "en": [
        "Conversation and feedback clarify fast.",
        "Groups increase motivation and performance.",
        "Teaching others accelerates your growth."
      ],
      "ko": [
        "대화/피드백으로 이해가 빠르게 정리됩니다.",
        "스터디/협업 환경에서 동기와 성과가 올라갑니다.",
        "설명(teach-back)을 할 때 실력이 가장 빨리 늡니다."
      ]
    },
    "study_tips": {
      "pt": [
        "Organize grupos de estudos focados onde cada participante explica um tópico para o grupo.",
        "Participe de fóruns, comunidades de prática e mentorias.",
        "Aplique a técnica de ensinar para aprender: prepare pequenas explicações para seus colegas."
      ],
      "en": [
        "Assign yourself a teach-back segment in a group.",
        "Prepare question lists and validate answers in discussion.",
        "Build a routine of explaining to someone, even for 5 minutes."
      ],
      "ko": [
        "스터디에서 ‘내가 발표할 파트’를 정해 책임감을 만들세요.",
        "질문 리스트를 미리 만들고, 대화로 답을 검증하세요.",
        "5분이라도 “누군가에게 설명”하는 시간을 루틴으로 넣으세요."
      ]
    },
    "recommended_formats": {
      "pt": [
        "Grupos de estudo colaborativos",
        "Dinâmicas de co-criação",
        "Debates em pares",
        "Mentorias",
        "Projetos em equipe"
      ],
      "en": [
        "Study groups",
        "Mentoring",
        "Coaching",
        "Peer learning",
        "Review sessions"
      ],
      "ko": [
        "스터디",
        "멘토링",
        "코칭",
        "페어 학습",
        "리뷰 미팅"
      ]
    }
  },
  "INTRA": {
    "title": {
      "pt": "Inteligência Intrapessoal",
      "en": "Intrapersonal",
      "ko": "자기성찰 지능"
    },
    "summary": {
      "pt": "Profundo autoconhecimento, consciência das próprias emoções, forças e limites, com alta capacidade de automotivação e disciplina autônoma.",
      "en": "Self-reflection and internal clarity fuel your learning.",
      "ko": "당신은 깊은 자기 성찰과 내면의 명확성을 바탕으로 자율적으로 학습합니다."
    },
    "traits": {
      "pt": [
        "Sabe exatamente como funciona sua própria mente, o que o distrai e quando rende melhor.",
        "Independente, autodidata e confortável estudando sozinho em ambientes calmos.",
        "Valoriza muito o alinhamento entre o que está estudando e seus objetivos de vida pessoais."
      ],
      "en": [
        "Strong self-management of goals and motivation.",
        "A clear “why” sustains long focus.",
        "Without solo reflection time, learning can feel scattered."
      ],
      "ko": [
        "목표/동기를 스스로 조절하는 힘이 있습니다.",
        "“왜 배우는지”가 분명할수록 집중이 오래 갑니다.",
        "혼자 생각 정리 시간이 없으면 학습이 흩어질 수 있습니다."
      ]
    },
    "study_tips": {
      "pt": [
        "Defina um plano de estudos autônomo com metas claras, prazos realistas e critérios de autoavaliação.",
        "Mantenha um diário de progresso anotando seus rendimentos e estados de ânimo.",
        "Estude em ambientes tranquilos e sem interrupções para entrar em estado de fluxo (flow)."
      ],
      "en": [
        "Before: write 1 goal + 1 success criterion (2 minutes).",
        "After: log what worked, what didn’t, and your next adjustment (3 minutes).",
        "Schedule deep-work blocks and reduce distractions."
      ],
      "ko": [
        "시작 전 2분: 오늘 목표 1개 + 성공 기준 1개를 적으세요.",
        "끝나고 3분: 됐던 것/안 됐던 것/다음 조정을 기록하세요.",
        "몰입 시간을 캘린더에 고정하고, 방해 요소를 줄이세요."
      ]
    },
    "recommended_formats": {
      "pt": [
        "Estudo autônomo autodidata",
        "Diários e autoavaliações",
        "Metas de curto e longo prazo (OKRs)",
        "Cursos online individuais no próprio ritmo"
      ],
      "en": [
        "Self-paced courses",
        "Journaling",
        "Personal note systems",
        "Reflection routines",
        "Quiet solo study"
      ],
      "ko": [
        "자기주도 강좌",
        "저널링",
        "개인 노트 시스템(노션/옵시디언)",
        "복기 루틴",
        "조용한 독학"
      ]
    }
  }
};

export const uiStrings = {
  pt: {
    nav: {
      brand: 'SEI',
      tagline: 'Sensorial · Experiencial · Inteligências',
      home: 'Início',
      models: 'Os 3 Pilares SEI',
      comparison: 'Matriz SEI (360°)',
      guides: 'Guia Metodológico',
      myResults: 'Histórico de Resultados',
      startQuiz: 'Começar Diagnóstico'
    },
    home: {
      badge: 'Metodologia SEI de Aprendizagem',
      title: 'Descubra Como Você Aprende com o Método SEI',
      subtitle: 'Compreenda a fundo sua forma única de absorver, processar e reter conhecimento através dos 3 pilares integrados: Canais Sensoriais (S), Ciclo Experiencial (E) e Inteligências Múltiplas (I).',
      selectModelHeading: 'Os Três Pilares da Metodologia SEI',
      selectModelSub: 'Cada pilar analisa uma dimensão complementar: captação sensorial, processamento prático e competências cognitivas naturais.',
      whyLearnTitle: 'Por que conhecer seu perfil na Metodologia SEI?',
      benefit1Title: 'Estude com Menos Esforço',
      benefit1Desc: 'Pare de perder horas com métodos genéricos que não funcionam para o seu cérebro e concentre sua energia no que traz retenção real.',
      benefit2Title: 'Melhore Notas e Desempenho',
      benefit2Desc: 'Aplique as técnicas recomendadas para provas, vestibulares, concursos, faculdade ou aperfeiçoamento profissional.',
      benefit3Title: 'Autonomia e Foco',
      benefit3Desc: 'Descubra quais ferramentas, formatos e ambientes maximizam seu foco e evitam a procrastinação e o cansaço mental.',
      whichFirstTitle: 'Por qual pilar devo começar?',
      whichFirstDesc: 'Recomendamos começar pelo Pilar S (Sensorial, ~2-3 min) para descobrir os melhores formatos de resumos e aulas. Em seguida, faça o Pilar E (Experiencial) para entender como você resolve problemas, e conclua no Pilar I (Inteligências) para mapear seus talentos.',
      comparisonTeaserTitle: 'A Sinergia dos Três Pilares SEI',
      comparisonTeaserDesc: 'Veja como os canais sensoriais (S), o ciclo prático (E) e as faculdades mentais (I) se conectam em uma matriz integrada 360°.'
    },
    quiz: {
      questionOf: 'Questão {current} de {total}',
      progress: 'Progresso: {percent}%',
      prevButton: 'Anterior',
      nextButton: 'Próxima Questão',
      finishButton: 'Finalizar e Ver Resultados',
      keyboardHint: 'Dica: Você também pode usar as teclas numéricas no teclado.',
      savedNotice: 'Progresso salvo automaticamente'
    },
    results: {
      badge: 'Diagnóstico do Pilar SEI',
      scoreDistribution: 'Distribuição das Suas Pontuações',
      traitsTitle: 'Características Principais e Padrões de Comportamento',
      tipsTitle: 'Dicas Práticas para Potencializar Seus Estudos',
      formatsTitle: 'Formatos, Ferramentas e Recursos Recomendados',
      secondaryTitle: 'Forças Secundárias e Habilidades de Apoio',
      learningCycleTitle: 'O Ciclo de Aprendizagem em 4 Etapas',
      shareTitle: 'Compartilhar Resultado',
      shareTextCopied: 'Resultado copiado para a área de transferência!',
      sharePrompt: 'Meu perfil no diagnóstico SEI (Sensorial, Experiencial e Inteligências Múltiplas) é: {title}! Descubra o seu também.',
      downloadSummary: 'Baixar Resumo em Texto',
      tryAgain: 'Refazer este Pilar',
      tryAnother: 'Explorar Próximo Pilar',
      compareModels: 'Ver Matriz Integrada SEI (360°)'
    },
    footer: {
      tagline: 'Plataforma SEI — Avaliação integrada de aprendizagem Sensorial, Experiencial e Inteligências Múltiplas.',
      privacy: 'Privacidade',
      terms: 'Termos de Uso',
      contact: 'Contato',
      copyright: '© 2026 Metodologia SEI. Conteúdo educacional aberto.'
    }
  },
  en: {
    nav: {
      brand: 'LearnerType',
      tagline: 'Learning Styles',
      home: 'Home',
      models: 'Models & Quizzes',
      comparison: 'Compare Theories',
      guides: 'Model Guides',
      myResults: 'Saved Results',
      startQuiz: 'Start Quiz'
    },
    home: {
      badge: 'Scientific Learning Methodologies',
      title: 'Discover How You Learn Best',
      subtitle: 'Understand your unique way of absorbing, processing, and retaining knowledge with the three most respected models in educational psychology: VARK, Kolb, and Gardner.',
      selectModelHeading: 'Choose a Model to Start',
      selectModelSub: 'Each model analyzes your learning through a distinct and complementary lens.',
      whyLearnTitle: 'Why understand your learning style?',
      benefit1Title: 'Study with Less Friction',
      benefit1Desc: 'Stop wasting hours on generic study habits that do not fit your brain. Focus on what gives you true retention.',
      benefit2Title: 'Boost Performance & Recall',
      benefit2Desc: 'Apply tailored techniques for exams, university courses, creative work, and professional development.',
      benefit3Title: 'Autonomy and Flow',
      benefit3Desc: 'Identify the exact formats, environments, and pacing that keep you engaged and prevent mental burnout.',
      whichFirstTitle: 'Which quiz should I take first?',
      whichFirstDesc: 'If you want immediate study format tips, start with VARK (~3 min). For problem-solving and experiential habits, take Kolb. To map your broad cognitive intelligences, take Gardner.',
      comparisonTeaserTitle: 'Three Complementary Frameworks',
      comparisonTeaserDesc: 'See how sensory modalities (VARK), experiential action (Kolb), and cognitive faculties (Gardner) unite.'
    },
    quiz: {
      questionOf: 'Question {current} of {total}',
      progress: 'Progress: {percent}%',
      prevButton: 'Previous',
      nextButton: 'Next Question',
      finishButton: 'See Results',
      keyboardHint: 'Tip: You can also use number keys on your keyboard.',
      savedNotice: 'Progress saved automatically'
    },
    results: {
      badge: 'Your Learning Profile',
      scoreDistribution: 'Score Distribution',
      traitsTitle: 'Key Traits & Behavioral Patterns',
      tipsTitle: 'Actionable Study & Revision Tips',
      formatsTitle: 'Recommended Formats & Tools',
      secondaryTitle: 'Secondary Strengths & Supporting Channels',
      learningCycleTitle: 'The 4-Stage Experiential Learning Loop',
      shareTitle: 'Share Result',
      shareTextCopied: 'Result copied to clipboard!',
      sharePrompt: 'My learning style on LearnerType is: {title}! Check out your profile as well.',
      downloadSummary: 'Download Summary',
      tryAgain: 'Retake Quiz',
      tryAnother: 'Try Another Model',
      compareModels: 'Compare with Other Models'
    },
    footer: {
      tagline: 'Educational self-reflection and learning strategy platform.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      contact: 'Contact',
      copyright: '© 2026 LearnerType. Educational open resource.'
    }
  },
  ko: {
    nav: {
      brand: 'LearnerType',
      tagline: '학습 스타일 진단',
      home: '홈',
      models: '진단 모델',
      comparison: '모델 비교',
      guides: '이론 가이드',
      myResults: '내 결과 기록',
      startQuiz: '진단 시작'
    },
    home: {
      badge: '검증된 학습 이론 프레임워크',
      title: '나만의 최적 학습 스타일을 발견하세요',
      subtitle: 'VARK, Kolb, Gardner 다중 지능 등 세 가지 대표적인 교육심리학 모델을 통해 당신의 정보 처리 및 학습 강점을 체계적으로 파악하세요.',
      selectModelHeading: '시작할 모델을 선택하세요',
      selectModelSub: '각 모델은 서로 다른 측면에서 당신의 학습 방식을 조명합니다.',
      whyLearnTitle: '학습 스타일을 알아야 하는 이유',
      benefit1Title: '효율적인 학습 습관',
      benefit1Desc: '나에게 맞지 않는 비효율적인 공부법 대신 뇌가 가장 잘 반응하는 방식으로 학습하세요.',
      benefit2Title: '성취도 및 기억력 향상',
      benefit2Desc: '시험 준비, 자격증, 업무 역량 개발에 즉시 적용 가능한 실천적 전략을 제공합니다.',
      benefit3Title: '자기 주도적 몰입',
      benefit3Desc: '집중력을 극대화하고 번아웃을 줄여주는 환경과 학습 도구를 파악하세요.',
      whichFirstTitle: '어떤 진단을 먼저 해야 할까요?',
      whichFirstDesc: '노트 필기와 시청각 자료 활용 팁을 원하시면 VARK(~3분)를, 문제 해결과 실습 스타일을 알고 싶으시면 Kolb를, 전반적인 인지 강점을 보시려면 Gardner를 추천합니다.',
      comparisonTeaserTitle: '세 모델의 상호보완적 시너지',
      comparisonTeaserDesc: '감각(VARK), 경험 순환(Kolb), 다중 지능(Gardner)이 어떻게 연결되는지 확인해보세요.'
    },
    quiz: {
      questionOf: '{current} / {total} 문항',
      progress: '진행률: {percent}%',
      prevButton: '이전',
      nextButton: '다음 문항',
      finishButton: '결과 보기',
      keyboardHint: '키보드 숫자 키로도 선택할 수 있습니다.',
      savedNotice: '진행 상황 자동 저장됨'
    },
    results: {
      badge: '나의 학습 스타일 결과',
      scoreDistribution: '점수 분포',
      traitsTitle: '주요 특징과 학습 행동 양식',
      tipsTitle: '실전 맞춤형 학습 팁',
      formatsTitle: '권장 학습 형식 및 추천 도구',
      secondaryTitle: '보조 강점 및 복합 성향',
      learningCycleTitle: '4단계 경험 학습 사이클',
      shareTitle: '결과 공유하기',
      shareTextCopied: '결과가 클립보드에 복사되었습니다!',
      sharePrompt: 'LearnerType에서 확인한 나의 학습 스타일은 "{title}"입니다!',
      downloadSummary: '텍스트 요약 저장',
      tryAgain: '이 모델 다시 검사하기',
      tryAnother: '다른 모델 검사하기',
      compareModels: '3가지 모델 통합 비교하기'
    },
    footer: {
      tagline: '자기 이해와 효과적 학습을 돕는 교육용 플랫폼.',
      privacy: '개인정보처리방침',
      terms: '이용약관',
      contact: '문의하기',
      copyright: '© 2026 LearnerType. 교육용 오픈 리소스.'
    }
  }
};
