/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VarkModality, KolbDimension, GardnerIntelligence } from '../data/quizData';
import { VarkScores, KolbScores, GardnerScores } from './scoring';

export interface SavedResultItem {
  id: string;
  model: 'vark' | 'kolb' | 'gardner';
  completedAt: string;
  resultKey: string;
  resultTitle: string;
  scores: VarkScores | KolbScores | GardnerScores;
}

const STORAGE_KEY_SAVED_RESULTS = 'learnertype_saved_results_v1';
const STORAGE_KEY_QUIZ_PROGRESS = 'learnertype_quiz_progress_v1';

export function saveResult(
  model: 'vark' | 'kolb' | 'gardner',
  resultKey: string,
  resultTitle: string,
  scores: VarkScores | KolbScores | GardnerScores
): void {
  try {
    const list = getSavedResults();
    // remove previous of same model if exists or keep history
    const item: SavedResultItem = {
      id: `${model}-${Date.now()}`,
      model,
      completedAt: new Date().toISOString(),
      resultKey,
      resultTitle,
      scores,
    };
    const updated = [item, ...list.filter((x) => x.model !== model)];
    localStorage.setItem(STORAGE_KEY_SAVED_RESULTS, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save result:', err);
  }
}

export function getSavedResults(): SavedResultItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY_SAVED_RESULTS);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function getSavedResultForModel(model: 'vark' | 'kolb' | 'gardner'): SavedResultItem | undefined {
  const results = getSavedResults();
  return results.find((r) => r.model === model);
}

export function saveQuizProgress(
  model: string,
  currentIndex: number,
  answers: (VarkModality | KolbDimension | number | null)[]
): void {
  try {
    localStorage.setItem(
      `${STORAGE_KEY_QUIZ_PROGRESS}_${model}`,
      JSON.stringify({ currentIndex, answers, timestamp: Date.now() })
    );
  } catch {
    // ignore
  }
}

export function getQuizProgress(
  model: string
): { currentIndex: number; answers: (any | null)[] } | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_QUIZ_PROGRESS}_${model}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed;
  } catch {
    return null;
  }
}

export function clearQuizProgress(model: string): void {
  try {
    localStorage.removeItem(`${STORAGE_KEY_QUIZ_PROGRESS}_${model}`);
  } catch {
    // ignore
  }
}

// --- SAMPLE / DEMONSTRATION FIXTURES ---
export const SAMPLE_VARK_DATA = {
  model: 'vark' as const,
  resultKey: 'V+K',
  resultTitle: {
    pt: 'Multimodal: Visual + Cinestésico (V+K)',
    en: 'Multimodal: Visual + Kinesthetic (V+K)',
    ko: '혼합형: 시각 + 체감 (V+K)',
  },
  scores: { V: 7, A: 2, R: 3, K: 6 } as VarkScores,
};

export const SAMPLE_KOLB_DATA = {
  model: 'kolb' as const,
  resultKey: 'DIVERGER',
  resultTitle: {
    pt: 'Estilo Divergente (Sentir e Observar)',
    en: 'Diverger (Feeling & Watching)',
    ko: '발산형 (Diverger)',
  },
  scores: { CE: 5, RO: 4, AC: 1, AE: 2 } as KolbScores,
};

export const SAMPLE_GARDNER_DATA = {
  model: 'gardner' as const,
  resultKey: 'LOG,SPA,INTRA',
  resultTypes: ['LOG', 'SPA', 'INTRA'] as GardnerIntelligence[],
  resultTitle: {
    pt: 'Inteligência Lógico-Matemática',
    en: 'Logical–Mathematical Intelligence',
    ko: '논리·수학 지능',
  },
  scores: {
    LOG: 4.7,
    LIN: 3.3,
    SPA: 4.3,
    MUS: 2.7,
    KIN: 3.0,
    INTER: 3.7,
    INTRA: 4.0,
  } as GardnerScores,
};

export function seedSampleResults(locale: 'pt' | 'en' | 'ko' = 'pt'): SavedResultItem[] {
  const now = new Date();
  const varkItem: SavedResultItem = {
    id: `vark-sample-${Date.now() - 3600000 * 3}`,
    model: 'vark',
    completedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    resultKey: SAMPLE_VARK_DATA.resultKey,
    resultTitle: SAMPLE_VARK_DATA.resultTitle[locale] || SAMPLE_VARK_DATA.resultTitle.pt,
    scores: SAMPLE_VARK_DATA.scores,
  };

  const kolbItem: SavedResultItem = {
    id: `kolb-sample-${Date.now() - 3600000 * 2}`,
    model: 'kolb',
    completedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    resultKey: SAMPLE_KOLB_DATA.resultKey,
    resultTitle: SAMPLE_KOLB_DATA.resultTitle[locale] || SAMPLE_KOLB_DATA.resultTitle.pt,
    scores: SAMPLE_KOLB_DATA.scores,
  };

  const gardnerItem: SavedResultItem = {
    id: `gardner-sample-${Date.now() - 3600000}`,
    model: 'gardner',
    completedAt: new Date(Date.now() - 3600000).toISOString(),
    resultKey: SAMPLE_GARDNER_DATA.resultKey,
    resultTitle: SAMPLE_GARDNER_DATA.resultTitle[locale] || SAMPLE_GARDNER_DATA.resultTitle.pt,
    scores: SAMPLE_GARDNER_DATA.scores,
  };

  const samples = [varkItem, kolbItem, gardnerItem];
  try {
    localStorage.setItem(STORAGE_KEY_SAVED_RESULTS, JSON.stringify(samples));
  } catch (err) {
    console.error('Failed to seed sample results:', err);
  }
  return samples;
}

