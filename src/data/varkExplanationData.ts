/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Informações detalhadas, didáticas e profundas sobre os canais sensoriais do VARK
 * e suas combinações multimodais para a Metodologia SEI (Pilar S - Sensorial).
 */

export interface ModalityDetail {
  code: 'V' | 'A' | 'R' | 'K';
  name: string;
  tagline: string;
  definition: string;
  howItWorks: string;
  brainProcessing: string;
  strengths: string[];
  bestTools: string[];
  idealEnvironment: string;
  commonHabits: string[];
}

export interface CombinationDetail {
  code: string;
  modalities: string[];
  title: string;
  nickname: string;
  summary: string;
  howTheyLearn: string;
  practicalExample: string;
  studyStrategy: string;
  synergyTip: string;
}

export interface DeepLearningGuide {
  resultKey: string;
  cognitiveProfile: string;
  optimalRoutine: string;
  memoryStrategy: string;
  blindspotWarning: string;
  actionPlan: string[];
}

export const VARK_MODALITIES_INFO: Record<'V' | 'A' | 'R' | 'K', ModalityDetail> = {
  V: {
    code: 'V',
    name: 'Visual (V)',
    tagline: 'Aprende vendo a estrutura, conexões e layouts gráficos',
    definition: 'O canal Visual refere-se à preferência por informações apresentadas sob forma de mapas, diagramas, esquemas, fluxogramas, gráficos, códigos de cores e arranjos espaciais.',
    howItWorks: 'O cérebro visual constrói um "mapa espacial" dos conceitos. Para fixar um tema, o estudante precisa visualizar a hierarquia e como as peças se conectam graficamente no espaço.',
    brainProcessing: 'Processamento simultâneo e holístico: capta imagens completas em frações de segundo e organiza ideias por posição espacial e relações de contraste visual.',
    strengths: [
      'Visão holística e rápida compreensão de sistemas complexos',
      'Excelente orientação espacial e memória fotográfica de esquemas',
      'Capacidade de sintetizar grandes volumes de dados em uma única tela/mapa'
    ],
    bestTools: [
      'Mapas Mentais e Conceituais (XMind, Miro, Canva)',
      'Fluxogramas de processos e diagramas de blocos',
      'Código de cores consistente em anotações (marca-textos)',
      'Infográficos, tabelas comparativas e slides visuais'
    ],
    idealEnvironment: 'Ambiente visualmente limpo, com quadro branco próximo, tela ampla para organizar janelas e materiais destacados em cores vibrantes.',
    commonHabits: [
      'Desenha setas, caixas e esquemas enquanto assiste a uma explicação',
      'Lembra exatamente em qual posição da página uma informação estava escrita',
      'Prefere apresentações cheias de imagens e gráficos em vez de textos corridos'
    ]
  },
  A: {
    code: 'A',
    name: 'Auditivo (A)',
    tagline: 'Aprende ouvindo, verbalizando e debatendo ideias em voz alta',
    definition: 'O canal Auditivo representa a preferência por receber e processar informações por meio da linguagem falada, palestras, conversas, gravações de áudio e debates.',
    howItWorks: 'O estudante auditivo internaliza os conceitos escutando a cadência, tom e ritmo da fala. Ao explicar um assunto para outra pessoa (ou para si mesmo), ele organiza a lógica na sua própria mente.',
    brainProcessing: 'Processamento sequencial e fonológico: decodifica frequências sonoras, modulações de voz e constrói redes de memória associadas à audição e fala.',
    strengths: [
      'Grande facilidade para captar nuances em explicações orais e aulas expostas',
      'Excelente oratória e habilidade para explicar conceitos em voz alta',
      'Retenção de detalhes de conversas, podcasts e podcasts educativos'
    ],
    bestTools: [
      'Audiobooks, podcasts e videoaulas narradas',
      'Gravações de voz com resumos próprios',
      'Discussões em grupo e dinâmicas de "Ensine alguém" (Técnica Feynman)',
      'Repetição ritmada e rimas para memorização'
    ],
    idealEnvironment: 'Espaço com acústica agradável, fones de ouvido para áudios educativos ou um local privativo onde possa falar em voz alta sem interrupções.',
    commonHabits: [
      'Mexe os lábios ou lê em voz baixa para assimilar o conteúdo',
      'Prefere perguntar diretamente a um especialista em vez de ler o manual',
      'Grava áudios de lembretes para si mesmo ao longo do dia'
    ]
  },
  R: {
    code: 'R',
    name: 'Leitura / Escrita (R)',
    tagline: 'Aprende lendo textos bem estruturados e redigindo anotações',
    definition: 'O canal Reading/Writing (R) é caracterizado pela forte afinidade por informações apresentadas sob forma de palavras escritas, textos, livros, manuais, resumos e listas enumeradas.',
    howItWorks: 'O estudante de Leitura/Escrita traduz o mundo em símbolos textuais. Ele precisa ler definições precisas, reler artigos e reescrever os aprendizados em suas próprias palavras para fixá-los.',
    brainProcessing: 'Processamento analítico-linguístico: decodifica sintaxe, gramática e estrutura lógica das palavras, convertendo o texto em memórias semânticas sólidas.',
    strengths: [
      'Rigor conceitual, precisão vocabular e apreensão de detalhes teóricos',
      'Capacidade de produzir documentações, ensaios e resumos de alto nível',
      'Independência nos estudos através da leitura de livros e artigos'
    ],
    bestTools: [
      'Resumos estruturados em tópicos e fichamentos',
      'Listas de verificação (checklists) e glossários de termos',
      'Leitura de artigos científicos, livros didáticos e e-books',
      'Anotações digitais estruturadas (Notion, Obsidian, Google Docs)'
    ],
    idealEnvironment: 'Ambiente silencioso, mesa de estudos organizada com caderno, caneta e acesso a bibliotecas ou acervos digitais de texto.',
    commonHabits: [
      'Escreve resumos detalhados à mão ou digitados para fixar a matéria',
      'Procura dicionários e termos exatos quando surge uma dúvida',
      'Prefere receber instruções por e-mail ou documento do que oralmente'
    ]
  },
  K: {
    code: 'K',
    name: 'Cinestésico (K)',
    tagline: 'Aprende pela prática, experiência direta, simulações e movimento',
    definition: 'O canal Cinestésico relaciona-se com a aprendizagem orientada à experiência: o uso da percepção tátil, movimento corporal, exemplos práticos, simuladores e atividades hands-on.',
    howItWorks: 'O aprendiz cinestésico precisa conectar o conceito abstrato a uma aplicação real no mundo físico. Ele aprende "fazendo", testando hipóteses e sentindo o efeito prático das decisões.',
    brainProcessing: 'Processamento motor e somatossensorial: a memória de longo prazo é ancorada na execução física, propriocepção e resolução de problemas na prática.',
    strengths: [
      'Rápida aplicação prática de teorias em cenários reais do dia a dia',
      'Alta intuição para solução de problemas práticos e experimentação',
      'Alta memorização duradoura quando realiza projetos e atividades físicas'
    ],
    bestTools: [
      'Projetos práticos, oficinas e construção de protótipos',
      'Estudos de caso reais e exercícios de simulação',
      'Flashcards físicos manipuláveis durante caminhadas',
      'Experimentos de laboratório e aplicação imediata no trabalho'
    ],
    idealEnvironment: 'Espaço dinâmico com espaço para movimentação, ferramentas práticas, quadros táteis e pausas ativas frequentes.',
    commonHabits: [
      'Fica irrequieto ao assistir a longas aulas expositivas sem prática',
      'Clica em tudo ou desmonta algo para entender como funciona',
      'Associa lembranças às sensações físicas ou ao local onde praticou a tarefa'
    ]
  }
};

export const VARK_COMBINATIONS_INFO: Record<string, CombinationDetail> = {
  'V+A': {
    code: 'V+A',
    modalities: ['V', 'A'],
    title: 'Visual + Auditivo',
    nickname: 'O Perfil Audiovisual',
    summary: 'Sinergia perfeita entre o que se vê e o que se ouve. Absorve conteúdos com velocidade máxima em videoaulas, apresentações com narração e explicações guiadas por slides.',
    howTheyLearn: 'O aprendiz V+A constrói esquemas mentais visuais e os valida com explicações faladas. Ele precisa ver a estrutura na tela e ouvir a linha de raciocínio para conectar os pontos com fluidez.',
    practicalExample: 'Ao estudar um novo tema de gestão, ele assiste a uma palestra (A) acompanhando os slides ilustrados (V) e, em seguida, grava um vídeo de 1 minuto narrando o mapa mental que criou.',
    studyStrategy: 'Utilize videoaulas em velocidade 1.25x a 1.5x acompanhando o material visual e leia seus mapas mentais em voz alta durante as revisões.',
    synergyTip: 'Ao desenhar um diagrama, narre cada seta e conexão em voz alta. Essa dupla estimulação fixa a memória 2x mais rápido.'
  },
  'V+R': {
    code: 'V+R',
    modalities: ['V', 'R'],
    title: 'Visual + Leitura/Escrita',
    nickname: 'O Leitor Estruturado',
    summary: 'Combina a clareza espacial dos esquemas com o rigor conceitual dos textos. É o perfil dos infográficos informativos, tabelas explicativas e resumos visuais.',
    howTheyLearn: 'O aprendiz V+R precisa de estrutura visual (cores, tópicos, colunas) aliada a frases claras. Ele lê com atenção e organiza o conteúdo em diagramas textuais estruturados.',
    practicalExample: 'Para aprender um regulamento, ele lê a lei (R) criando uma tabela comparativa colorida (V) com duas colunas: "O que muda" vs. "O que permanece".',
    studyStrategy: 'Crie esquemas visuais com textos curtos em marcadores (bullet points). Use ferramentas como Notion ou Obsidian com blocos coloridos e diagramas de texto.',
    synergyTip: 'Transforme textos densos em tabelas de duas entradas ou fluxogramas com legendas detalhadas.'
  },
  'V+K': {
    code: 'V+K',
    modalities: ['V', 'K'],
    title: 'Visual + Cinestésico',
    nickname: 'O Construtor Visual',
    summary: 'Aprende vendo e fazendo. É impulsionado por demonstrações práticas em vídeo, simuladores visuais interativos e criação de protótipos desenhados.',
    howTheyLearn: 'O aprendiz V+K precisa primeiro ver como se faz (demonstração visual) para depois replicar com as próprias mãos. Ele traduz ideias em esboços físicos e protótipos.',
    practicalExample: 'Para aprender a usar um software, assiste a um tutorial gravado em vídeo (V) enquanto clica e testa os botões no próprio computador ao mesmo tempo (K).',
    studyStrategy: 'Aprenda através de demonstrações visuais seguidas de prática imediata. Desenhe o plano de ação antes de executar qualquer projeto.',
    synergyTip: 'Use post-its coloridos em uma parede física (Kanban tátil) para organizar seus estudos com movimento do corpo.'
  },
  'A+R': {
    code: 'A+R',
    modalities: ['A', 'R'],
    title: 'Auditivo + Leitura/Escrita',
    nickname: 'O Verbalista Completo',
    summary: 'Domínio total da linguagem falada e escrita. Aprende lendo documentos profundos e discutindo os textos em reuniões, debates ou grupos de estudo.',
    howTheyLearn: 'O aprendiz A+R conecta a palavra escrita à linguagem falada. Ele assimila lendo artigos e consolida conversando ou ditando resumos para o papel.',
    practicalExample: 'Lê um capítulo de livro didático (R), em seguida participa de um podcast de estudo (A) e finaliza redigindo uma resenha crítica de 3 parágrafos.',
    studyStrategy: 'Leia textos em voz alta, participe de clubes de leitura/estudo e utilize a digitação por voz para ditar seus resumos.',
    synergyTip: 'Transcreva os pontos principais de palestras em notas escritas estruturadas ou grave áudios lendo suas próprias anotações.'
  },
  'A+K': {
    code: 'A+K',
    modalities: ['A', 'K'],
    title: 'Auditivo + Cinestésico',
    nickname: 'O Praticante Dialogado',
    summary: 'Aprende conversando enquanto coloca a mão na massa. Gosta de treinamentos interativos, orientação verbal passo a passo e role-playing.',
    howTheyLearn: 'O aprendiz A+K precisa de feedback falado enquanto executa a tarefa. Ele gosta de instruções orais enquanto manuseia equipamentos ou resolve problemas.',
    practicalExample: 'Em um laboratório ou oficina, aprende a realizar um procedimento ouvindo a explicação do instrutor ao lado (A) enquanto executa os passos fisicamente (K).',
    studyStrategy: 'Ouça podcasts educativos durante caminhadas ou exercícios físicos. Estude em duplas onde um dita o desafio e o outro resolve na prática.',
    synergyTip: 'Fale o passo a passo em voz alta enquanto realiza um exercício prático. O movimento associado à voz sela o aprendizado.'
  },
  'R+K': {
    code: 'R+K',
    modalities: ['R', 'K'],
    title: 'Leitura/Escrita + Cinestésico',
    nickname: 'O Prático Documentado',
    summary: 'Aprende seguindo roteiros escritos passo a passo e executando na prática. Perfil ideal para seguir manuais de bancada, guias de laboratório e receitas.',
    howTheyLearn: 'O aprendiz R+K precisa do texto para ter clareza das etapas e da prática para vivenciar a teoria. Ele lê uma instrução e a executa em seguida.',
    practicalExample: 'Ao aprender programação, lê a documentação técnica (R) em uma tela e escreve o código no editor de texto executando o programa (K).',
    studyStrategy: 'Crie listas de verificação (checklists) de tarefas e marque com um "check" físico conforme conclui cada passo prático.',
    synergyTip: 'Mantenha um diário de bordo ou diário de bordo prático: escreva em poucas linhas o que tentou, o que deu certo e o que aprendeu.'
  },
  'BALANCED': {
    code: 'BALANCED',
    modalities: ['V', 'A', 'R', 'K'],
    title: 'Multimodal Integrado (VARK Completo)',
    nickname: 'O Aprendiz Holístico',
    summary: 'Equilíbrio notável entre os 4 canais sensoriais. Adapta-se facilmente a qualquer método de ensino (vídeos, palestras, textos ou workshops práticos).',
    howTheyLearn: 'O aprendiz holístico retém a informação com ainda mais profundidade quando transita entre múltiplos canais. Ele pode ver um diagrama, ouvir uma explicação, ler um resumo e praticar.',
    practicalExample: 'Para dominar um assunto complexo, assiste ao vídeo (V), escuta a discussão (A), lê a documentação (R) e resolve o exercício de fixação (K).',
    studyStrategy: 'Alterne os canais ao longo das fases de estudo: Entrada visual/auditiva → Processamento em leitura → Saída e fixação cinestésica.',
    synergyTip: 'Não se limite a um único formato; explore a riqueza de alternar mídias para evitar a fadiga mental.'
  }
};

export const DEEP_PROFILE_GUIDES: Record<string, DeepLearningGuide> = {
  V: {
    resultKey: 'V',
    cognitiveProfile: 'Sua mente processa o conhecimento como uma grande tela de conexões espaciais. Quando você observa um gráfico ou mapa visual, seu cérebro sintetiza instantaneamente a hierarquia do conteúdo.',
    optimalRoutine: 'Antes de ler qualquer texto ou assistir a uma aula, gaste 2 minutos olhando o índice ou imagens para montar o "esqueleto visual" da matéria.',
    memoryStrategy: 'Ancoragem por Cor e Posição: Vincule conceitos-chave a cores fixas (ex: Azul = Teoria, Verde = Exemplos, Vermelho = Pegadinhas).',
    blindspotWarning: 'Cuidado com textos longos sem ilustrações: você pode perder o foco rápido. Quando isso ocorrer, desenhe o texto enquanto lê!',
    actionPlan: [
      'Transforme cada capítulo lido em um mapa mental sintetizado',
      'Use quadros brancos digitais para desenhar fluxos de causas e efeitos',
      'Associe símbolos visuais e ícones aos termos técnicos mais difíceis'
    ]
  },
  A: {
    resultKey: 'A',
    cognitiveProfile: 'Sua memória é fortemente ancorada em registros fonológicos e audição ativa. Ouvir a explicação de um professor ou falar sobre o tema ativa suas conexões neurais com máxima eficiência.',
    optimalRoutine: 'Comece a sessão de estudo ouvindo uma introdução em áudio ou explicando em voz alta o que você já sabe sobre o tema.',
    memoryStrategy: 'Método Feynman Falado: Gravadores de voz são seus maiores aliados. Grave resumos de 1 minuto em áudio e escute-os no dia seguinte.',
    blindspotWarning: 'Aulas silenciosas puramente textuais podem parecer arrastadas. Resolva isso verbalizando o texto em sussurro ou lendo em voz alta.',
    actionPlan: [
      'Grave seus resumos em áudio no celular e ouça durante caminhadas',
      'Crie um grupo de estudos para debater e tirar dúvidas oralmente',
      'Utilize a técnica de repetimento ritmado para memorizar fórmulas e conceitos'
    ]
  },
  R: {
    resultKey: 'R',
    cognitiveProfile: 'Sua cognição opera no nível dos símbolos linguísticos e da organização lógica de ideias. Ler definições formais e escrever sínteses é o motor da sua aprendizagem.',
    optimalRoutine: 'Organize suas sessões de estudo com um bloco de notas (físico ou digital) ao lado. Leia o material e faça fichamentos imediatos.',
    memoryStrategy: 'Sintaxe Reflexiva: Reescreva cada parágrafo difícil em uma única frase simples usando suas próprias palavras sem olhar para o original.',
    blindspotWarning: 'Risco de cópia passiva: não se limite a reescrever o texto idêntico. O segredo é REESTRUTURAR o texto com suas próprias análises.',
    actionPlan: [
      'Construa um glossário pessoal organizado com definições claras',
      'Escreva resumos em tópicos numerados ao final de cada módulo',
      'Utilize listas de verificação (checklists) para acompanhar seus avanços'
    ]
  },
  K: {
    resultKey: 'K',
    cognitiveProfile: 'Sua aprendizagem é fundamentada na memória motora, tátil e na resolução prática de problemas. O conceito abstrato ganha vida quando você o aplica.',
    optimalRoutine: 'Reduza o tempo de leitura pura e aumente o tempo de prática. Use a regra 30/70: 30% absorção teórica e 70% aplicação prática.',
    memoryStrategy: 'Ancoragem por Ação: Resolva exercícios reais, construa protótipos ou simule situações reais para fixar a teoria na prática.',
    blindspotWarning: 'Fadiga por imobilidade: assistir a palestras longas sem interação física reduz drasticamente sua atenção. Use pausas ativas a cada 25 minutos.',
    actionPlan: [
      'Faça simulados e resolva questões práticas logo após ler a teoria',
      'Estude em pé ou utilizando flashcards físicos com movimento corporal',
      'Aplique o conhecimento em projetos pessoais ou estudos de caso reais'
    ]
  },
  'V+A': {
    resultKey: 'V+A',
    cognitiveProfile: 'Sua aprendizagem atinge o ápice quando visual e audição trabalham em sintonia. Você é extremamente estimulado por narrativas audiovisuais e explicações acompanhadas de apresentações visuais.',
    optimalRoutine: 'Assista a aulas gravadas observando os slides e ouvindo a explicação. Pause no meio para sintetizar o que viu e ouviu em um esboço rápido.',
    memoryStrategy: 'Recodificação Audiovisual: Assista ao gráfico e explique-o em voz alta simultaneamente para selar a informação nos dois córtex.',
    blindspotWarning: 'Materiais que oferecem apenas áudio (como podcasts sem slides) ou apenas texto corrido exigem mais esforço. Crie o elemento visual que falta!',
    actionPlan: [
      'Prefira videoaulas dinâmicas com ilustrações na tela',
      'Crie mapas mentais e apresente-os em voz alta para si mesmo',
      'Grave telas explicando esquemas gráficos com sua própria voz'
    ]
  },
  'V+R': {
    resultKey: 'V+R',
    cognitiveProfile: 'Você domina o processamento de dados visuais e textuais. Sua mente se destaca ao ler conteúdos ricos em gráficos, tabelas e infográficos com texto conciso.',
    optimalRoutine: 'Comece lendo o texto e transformando-o imediatamente em uma tabela estruturada ou em um infográfico simples.',
    memoryStrategy: 'Mapeamento Textual: Destaque o texto com códigos de cores e monte uma hierarquia visual de títulos, subtítulos e marcadores.',
    blindspotWarning: 'Aulas faladas sem apoio de texto ou slides visuais podem deixar lacunas. Anote rapidamente em tópicos enquanto escuta.',
    actionPlan: [
      'Crie resumos no Notion ou Obsidian usando tabelas e blocos coloridos',
      'Converta capítulos extensos em um guia visual de uma página',
      'Use marca-textos coloridos com lógica conceitual bem definida'
    ]
  },
  'V+K': {
    resultKey: 'V+K',
    cognitiveProfile: 'Seu cérebro aprende vendo como se faz e executando na prática. Você combina a imaginação visual à memória motora para construir soluções concretas.',
    optimalRoutine: 'Assista a uma demonstração prática ou vídeo tutorial e em seguida replique exatamente os mesmos passos com as suas próprias mãos.',
    memoryStrategy: 'Desenhar para Executar: Esboce um diagrama da tarefa ou processo antes de começar a montar ou codificar.',
    blindspotWarning: 'Explicações puramente teóricas ou orais sem apelo visual ou prático perdem sua atenção rápido. Peça um exemplo prático ou vídeo!',
    actionPlan: [
      'Monte quadros visuais físicos (Kanban com post-its na parede)',
      'Aprenda usando simuladores visuais interativos e softwares práticos',
      'Crie protótipos rápidos esboçados no papel antes de construir'
    ]
  },
  'A+R': {
    resultKey: 'A+R',
    cognitiveProfile: 'Sua força reside no domínio completo do código verbal (ouvir, falar, ler e escrever). Você articula pensamentos complexos com extrema facilidade linguística.',
    optimalRoutine: 'Combine a leitura de artigos profundos com discussões orais ou gravação de notas de voz refletindo sobre a leitura.',
    memoryStrategy: 'Diálogo com o Texto: Ao ler um parágrafo, comente-o em voz alta como se estivesse debatendo com o próprio autor do livro.',
    blindspotWarning: 'A ausência de estímulos verbais pode deixar o aprendizado abstrato. Evite tentar aprender temas práticos sem ler a documentação ou ouvir a explicação.',
    actionPlan: [
      'Utilize leitores de tela em voz alta para acompanhar livros didáticos',
      'Participe de grupos de estudo com debates de artigos e capítulos',
      'Redija resenhas e resumos detalhados após assistir a palestras'
    ]
  },
  'A+K': {
    resultKey: 'A+K',
    cognitiveProfile: 'Você é um aprendiz dinâmico e comunicativo. Aprende muito melhor quando pode interagir verbalmente enquanto realiza uma atividade ou experimento.',
    optimalRoutine: 'Estude com fones de ouvido escutando podcasts educativos enquanto faz caminhadas ou realize tarefas práticas enquanto recebe orientações em áudio.',
    memoryStrategy: 'Ensaios Práticos Narrados: Realize a tarefa prática narrando passo a passo em voz alta cada ação que você está fazendo.',
    blindspotWarning: 'Ficar preso em uma mesa lendo em silêncio por horas é ineficiente para você. Introduza movimento e áudio na sua rotina!',
    actionPlan: [
      'Ouça materiais de estudo enquanto se movimenta ou se exercita',
      'Pratique simulações acompanhado de um mentor ou colega para conversar',
      'Narre o raciocínio das suas ações práticas durante a resolução de problemas'
    ]
  },
  'R+K': {
    resultKey: 'R+K',
    cognitiveProfile: 'Sua aprendizagem é metódica e orientada à aplicação. Você lê procedimentos, manuais e teorias com atenção e os traduz imediatamente em prática.',
    optimalRoutine: 'Tenha o manual ou checklist ao lado e vá executando cada passo prático no mundo real conforme conclui a leitura.',
    memoryStrategy: 'Diário de Execução: Anote em um bloco de notas o resultado de cada teste prático que realizou (O que funcionou x O que falhou).',
    blindspotWarning: 'Evite pular a leitura das instruções por ansiedade de praticar; sua leitura garante a precisão do que você vai executar.',
    actionPlan: [
      'Crie manuais de procedimentos e checklists para suas rotinas de estudo',
      'Aprenda resolvendo exercícios de fixação com a teoria aberta ao lado',
      'Documente seus projetos práticos em um diário de bordo textual'
    ]
  },
  BALANCED: {
    resultKey: 'BALANCED',
    cognitiveProfile: 'Seu perfil Multimodal Integrado concede flexibilidade cognitiva excepcional. Você possui canais sensoriais equilibrados para absorver conhecimento de múltiplas formas.',
    optimalRoutine: 'Aproveite seu repertório amplo alternando os formatos de entrada ao longo da semana para manter a motivação alta.',
    memoryStrategy: 'Ciclo Multimodal de 4 Etapas: 1. Veja o diagrama (V) → 2. Escute a aula (A) → 3. Escreva o resumo (R) → 4. Resolva o exercício (K).',
    blindspotWarning: 'A abundância de escolhas pode causar indecisão. Escolha um método principal para cada disciplina sem perder tempo mudando de formato a todo momento.',
    actionPlan: [
      'Varie as mídias de estudo entre vídeos, áudios, textos e projetos',
      'Construa materiais de revisão que integrem imagens, notas e exercícios',
      'Sirva como ponte de comunicação em equipes de estudo com perfis variados'
    ]
  }
};

export const FIVE_TRAITS_MAP: Record<string, string[]> = {
  V: [
    'Compreende o quadro geral muito mais rápido através de diagramas, mapas conceituais e slides estruturados.',
    'Possui excelente memória espacial para cores, tipografias, layouts e posições relativas de elementos na página.',
    'Sente necessidade de desenhar setas, caixas e símbolos visuais durante o raciocínio.',
    'Perde a concentração facilmente diante de blocos contínuos de texto sem qualquer apoio gráfico ou recurso visual.',
    'Retém melhor os aprendizados quando cria esquemas de uma única página sintetizando toda a matéria.'
  ],
  A: [
    'Retém falas, tons de voz, ritmos e explicações orais com notável precisão e facilidade.',
    'Assimila os conceitos mais difíceis quando tem espaço para formular perguntas e debater em grupo.',
    'Tende a ler em voz alta ou movimentar os lábios para internalizar a lógica dos conteúdos.',
    'Sente que ler em silêncio por horas seguidas é cansativo; verbalizar o assunto renova sua energia.',
    'Conecta teorias a histórias contadas por professores e palestrantes com alta fidelidade auditiva.'
  ],
  R: [
    'Valoriza o rigor conceitual, definições formais precisas e textos bem articulados.',
    'Transforma leituras extensas em fichamentos, resumos ordenados e listas estruturadas.',
    'Sente confiança no conhecimento quando o traduz em documentos e anotações com suas próprias palavras.',
    'Prefere receber orientações por escrito ou e-mail a receber breves instruções orais.',
    'Organiza o raciocínio com facilidade usando títulos, subtítulos, tópicos e marcadores textuais.'
  ],
  K: [
    'Aprende pela vivência direta, experimentação prática e resolução de problemas do mundo real.',
    'Necessita simular ou ver o resultado prático para que conceitos abstratos façam sentido completo.',
    'Ficar imóvel por longos períodos em aulas puramente expositivas reduz drasticamente seu foco.',
    'Memoriza de forma sólida quando pode manusear objetos, usar ferramentas ou movimentar-se.',
    'Tende a aprender por tentativa e erro, descobrindo como as coisas funcionam na prática.'
  ],
  'V+A': [
    'Associa instantaneamente o que observa em slides e esquemas à fala e narração do instrutor.',
    'Absorve conteúdo com rendimento máximo em videoaulas dinâmicas, tutoriais gravados e animações.',
    'Gosta de acompanhar gráficos e fluxos visuais enquanto ouve comentários explicativos detalhados.',
    'Memoriza conceitos ao explicar mapas mentais em voz alta para si mesmo ou para colegas.',
    'Sente desconforto em materiais de canal único (apenas texto estático ou apenas áudio sem imagem).'
  ],
  'V+R': [
    'Aprende melhor quando diagramas e mapas conceituais são acompanhados por legendas e textos explicativos.',
    'Seus cadernos e anotações digitais combinam esquemas gráficos com tópicos minuciosamente redigidos.',
    'Lê com velocidade e atenção redobradas quando o texto está estruturado em tabelas e infográficos.',
    'Destaca materiais de estudo utilizando um código de cores consistente associado a termos-chave.',
    'Converte facilmente imagens em descrições escritas e textos em resumos visuais de apoio.'
  ],
  'V+K': [
    'Aprende observando uma demonstração visual passo a passo e reproduzindo-a imediatamente na prática.',
    'Utiliza esboços gráficos, fluxogramas e protótipos em papel para planejar suas ações práticas.',
    'Prefere simuladores interativos em vídeo a manuais teóricos puramente textuais.',
    'Mantém alto engajamento quando pode manipular post-its visuais em quadros táteis (ex: Kanban).',
    'Associa a memória dos aprendizados às imagens dos testes práticos e às sensações da execução.'
  ],
  'A+R': [
    'Capta os pontos centrais durante palestras e explicações orais e os consolida redigindo resumos.',
    'Lê materiais em voz alta ou escuta audiobooks enquanto acompanha a transcrição escrita.',
    'Possui notável articulação linguística, expressando-se com clareza tanto falando quanto escrevendo.',
    'Beneficia-se de grupos de estudos nos quais lê artigos prévios e debate os textos com colegas.',
    'Sente necessidade de transformar falas em atas, guias escritos e relatórios bem documentados.'
  ],
  'A+K': [
    'Aprende com eficiência máxima ao receber instruções orais enquanto coloca a mão na massa.',
    'Prefere ser orientado verbalmente durante a execução de uma tarefa a ler extensos manuais.',
    'Gosta de escutar podcasts e audiobooks educativos enquanto realiza caminhadas ou exercícios.',
    'Memoriza procedimentos quando narra em voz alta cada etapa prática que está realizando.',
    'Rende melhor em dinâmicas de treinamento prático (role-playing) com feedback falado imediato.'
  ],
  'R+K': [
    'Lê guias, manuais e listas de verificação com atenção e executa cada passo prático em seguida.',
    'Necessita do suporte escrito para garantir a precisão antes de iniciar um experimento prático.',
    'Documenta seus projetos e testes práticos em diários de bordo com anotações de erros e acertos.',
    'Consolida teorias resolvendo listas de exercícios práticos com a documentação aberta ao lado.',
    'Sente-se seguro quando possui um roteiro claro por escrito e a liberdade de aplicá-lo fisicamente.'
  ],
  BALANCED: [
    'Demonstra alta flexibilidade cognitiva para aprender através de vídeos, áudios, textos ou oficinas.',
    'Transita entre múltiplos canais sensoriais sem perda de rendimento ou desgaste excessivo.',
    'Retém o conhecimento de forma holística quando o conteúdo é exposto de variadas maneiras.',
    'Atua com destaque em equipes heterogêneas por compreender as preferências de diferentes colegas.',
    'Beneficia-se de rotinas de estudo dinâmicas que alternam mídias visuais, auditivas, lidas e práticas.'
  ]
};

