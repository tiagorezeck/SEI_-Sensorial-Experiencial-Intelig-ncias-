# Metodologia & Diagnóstico SEI: Aprendizagem Sensorial, Experiencial e Inteligências Múltiplas

Transformação da aplicação na plataforma **SEI**, um acrônimo pedagógico integrado e de alto impacto que unifica os 3 modelos de aprendizagem em pilares complementares:

$$\textbf{S} \text{ (Sensorial)} \quad+\quad \textbf{E} \text{ (Experiencial)} \quad+\quad \textbf{I} \text{ (Inteligências Múltiplas)}$$

Além de expressar com precisão científica os três eixos do aprendizado, o nome **SEI** carrega a força do verbo saber (*"Eu sei como aprendo"*), criando uma marca forte, brasileira e intuitiva.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Decisões incorporadas na revisão do plano:
> - **Nome e Marca Oficial da Plataforma:** **SEI — Aprendizagem Sensorial, Experiencial e Inteligências Múltiplas**.
> - **Estrutura dos 3 Pilares:**
>   - **Pilar S (Sensorial):** Canais Sensoriais de Aprendizagem (antigo VARK).
>   - **Pilar E (Experiencial):** Ciclo Experiencial de Aprendizagem (antigo Kolb).
>   - **Pilar I (Inteligências):** Perfil de Inteligências Múltiplas (antigo Gardner).
> - **Diagnóstico Integrado 360°:** O relatório comparativo passa a ser o **Relatório Integrado SEI**, conectando a captação sensorial (**S**), o processamento prático (**E**) e o talento cognitivo (**I**).

- **Decisão Confirmada 1 (Branding)**: O cabeçalho, `<title>`, metatags e rodapé passarão a exibir **SEI** como identidade oficial da aplicação.
- **Decisão Confirmada 2 (Pilares S-E-I)**: Cada card na página inicial e nas abas de navegação receberá destaque pelo seu respectivo pilar (**Pilar S**, **Pilar E**, **Pilar I**).
- **Decisão Confirmada 3 (Integridade de Dados)**: Manutenção dos identificadores internos no código (`vark`, `kolb`, `gardner`) para total segurança do histórico de respostas e sem quebra de persistência.

---

## 1. Overview & Core Concept

- **O que é o Diagnóstico SEI**: Um ecossistema completo de autoconhecimento cognitivo que responde às 3 perguntas fundamentais de qualquer aprendiz ou profissional:
  1. **Pilar S (Sensorial)**: *Como eu absorvo a informação?* (Visual, Auditiva, Leitura/Escrita ou Cinestésica).
  2. **Pilar E (Experiencial)**: *Como eu processo e aplico a experiência?* (Sentir, Observar, Conceituar ou Agir).
  3. **Pilar I (Inteligências)**: *Onde se manifestam meus maiores talentos cognitivos?* (Lógica, Espacial, Intrapessoal, Linguística, etc.).
- **Proposta de Valor**: Sai o labirinto de sobrenomes acadêmicos estrangeiros; entra uma metodologia unificada, acessível e fácil de lembrar e compartilhar.

---

## 2. User Experience & Visual Design

- **Identidade Visual e Layout**:
  - **Logo & Wordmark no Top Bar**: `"SEI"` com o subtítulo clean `"Aprendizagem Sensorial · Experiencial · Inteligências"`.
  - **Cores dos Pilares (Rigor 60-30-10 & Acessibilidade WCAG AA)**:
    - **Pilar S (Sensorial)**: Azul Safira / Índigo (representando clareza de percepção).
    - **Pilar E (Experiencial)**: Esmeralda / Menta (representando ação, ciclo e vivência prática).
    - **Pilar I (Inteligências)**: Violeta Real / Ametista (representando cognição superior e criatividade).
  - **Hero Section**:
    - Título: *"Descubra como você realmente aprende com a Metodologia SEI"*.
    - Subtítulo: *"Uma avaliação completa dos seus Canais Sensoriais (S), Ciclo Experiencial (E) e Inteligências Múltiplas (I)."*
    - Botões de Ação: `[ Iniciar Pilar S: Sensorial (~3 min) ]` e `[ Ver Matriz Integrada SEI ]`.
    - Banner de Testes Prontos: `"Quer inspecionar os relatórios agora? [ Carregar Exemplo Completo SEI ]"`.

- **Componente de Navegação de Relatórios (`ReportTabs`)**:
  - `[ S · Sensorial ]`
  - `[ E · Experiencial ]`
  - `[ I · Inteligências ]`
  - `[ Matriz SEI 360° ]`

- **Relatórios de Diagnóstico Individual e Integrado**:
  - Cada tela de resultado ganha uma insígnia de identificação do pilar correspondente (`Pilar S`, `Pilar E` ou `Pilar I`).
  - Dicas práticas de estudo personalizadas que ensinam como combinar os três pilares no dia a dia (ex: combinar canal visual **S** com ciclo reflexivo **E** e inteligência lógica **I**).

---

## 3. Key Product Decisions & Trade-Offs

- **Decisão 1: Arquitetura da Marca SEI**:
  - *Abordagem*: Adotar SEI como a marca primária e explicar a sigla (*Sensorial, Experiencial e Inteligências Múltiplas*) de forma elegante no cabeçalho e na introdução.
  - *Vantagem*: Memorização instantânea pelo usuário e distinção profissional frente a questionários genéricos de internet.
- **Decisão 2: Preservação Histórica e Científica**:
  - *Abordagem*: No guia aprofundado (`ModelGuideView`), cada pilar detalha sua base epistemológica (Neil Fleming para o Sensorial, David Kolb para o Experiencial e Howard Gardner para as Inteligências Múltiplas).
  - *Vantagem*: Total transparência acadêmica sem sobrecarregar a experiência de uso diária.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SEI Application Shell                             │
│                                                                             │
│   [ Header ] ───► Brand: "SEI" | Pilares: S · Sensorial | E · Experiencial  │
│                                           | I · Inteligências | Histórico   │
│                                                                             │
│   [ Home ] ─────► Hero SEI + Cards dos 3 Pilares + Carregador de Amostra    │
│                                                                             │
│   [ ReportTabs ]► Alternador: [S·Sensorial] [E·Experiencial]                │
│                               [I·Inteligências] [Matriz SEI 360°]           │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Localization & Pillar Taxonomy Layer                     │
│                                                                             │
│   src/data/quizData.ts:                                                     │
│   - t('header.brand')     = "SEI"                                           │
│   - t('header.tagline')   = "Sensorial · Experiencial · Inteligências"      │
│   - t('model.vark.name')  = "Pilar S · Canais Sensoriais"                   │
│   - t('model.kolb.name')  = "Pilar E · Ciclo Experiencial"                  │
│   - t('model.gardner.name') = "Pilar I · Inteligências Múltiplas"           │
│   - t('comparison.title') = "Matriz Integrada SEI (360°)"                   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       Engines & Persistent Storage                          │
│                                                                             │
│   - Chaves internas mantidas para estabilidade ('vark', 'kolb', 'gardner')  │
│   - Metadados atualizados: index.html e metadata.json com marca SEI         │
│   - localStorage: 'learnertype_saved_results_v1' compatível                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Plano de Edição por Arquivo:
1. `metadata.json` & `index.html`: Atualizar títulos e descrições para **SEI — Aprendizagem Sensorial, Experiencial e Inteligências Múltiplas**.
2. `src/data/quizData.ts`: Atualizar o dicionário de traduções em português com a nova nomenclatura dos pilares S, E e I.
3. `src/components/Header.tsx`: Atualizar logotipo, links de navegação para os Pilares e botão de exemplo SEI.
4. `src/components/ReportTabs.tsx`: Adicionar a marcação dos pilares `[ S · Sensorial ]`, `[ E · Experiencial ]`, `[ I · Inteligências ]` e `[ Matriz SEI 360° ]`.
5. `src/App.tsx`: Atualizar textos do Hero, banners de exemplo dos 3 testes e chamada dos testes para a metodologia SEI.
6. `src/components/ModelCard.tsx`, `ModelIntro.tsx`, `ComparisonView.tsx`: Exibir os pilares S, E e I com insígnias coordenadas e textos refinados.
