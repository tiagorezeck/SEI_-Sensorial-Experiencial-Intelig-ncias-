/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  VarkModality,
  KolbDimension,
  GardnerIntelligence,
  GardnerQuestion,
  varkResults,
  kolbResults,
  gardnerResults,
  ResultProfile,
  Locale,
} from '../data/quizData';

// --- VARK Scoring ---
export type VarkScores = Record<VarkModality, number>;

export function calculateVarkScores(answers: (VarkModality | null)[]): VarkScores {
  const scores: VarkScores = { V: 0, A: 0, R: 0, K: 0 };
  for (const ans of answers) {
    if (ans && ans in scores) {
      scores[ans]++;
    }
  }
  return scores;
}

export function determineVarkResult(scores: VarkScores): string {
  const order: VarkModality[] = ['V', 'A', 'R', 'K'];
  const sorted = (Object.entries(scores) as [VarkModality, number][]).sort(
    (a, b) => b[1] - a[1]
  );

  const top1 = sorted[0];
  const top2 = sorted[1];
  const top4 = sorted[3];

  const maxScore = top1[1];
  const minScore = top4[1];

  // Balanced if max - min <= 2 and at least 3 within 1 of top
  const withinOneOfTop = sorted.filter((s) => maxScore - s[1] <= 1).length;
  if (maxScore - minScore <= 2 && withinOneOfTop >= 3) {
    return 'BALANCED';
  }

  // Multimodal if top1 - top2 <= 1
  if (top1[1] - top2[1] <= 1) {
    const multimodalPair = [top1[0], top2[0]].sort(
      (a, b) => order.indexOf(a) - order.indexOf(b)
    );
    const key = multimodalPair.join('+');
    if (key in varkResults) {
      return key;
    }
  }

  return top1[0];
}

export function getVarkResultProfile(resultKey: string): ResultProfile {
  return varkResults[resultKey] || varkResults['V'];
}

// --- Kolb Scoring ---
export type KolbScores = Record<KolbDimension, number>;

export function calculateKolbScores(answers: (KolbDimension | null)[]): KolbScores {
  const scores: KolbScores = { CE: 0, RO: 0, AC: 0, AE: 0 };
  for (const ans of answers) {
    if (ans && ans in scores) {
      scores[ans]++;
    }
  }
  return scores;
}

export interface KolbQuadrantScores {
  DIVERGER: number;     // CE + RO (Sentir + Observar)
  ASSIMILATOR: number;  // AC + RO (Pensar + Observar)
  CONVERGER: number;    // AC + AE (Pensar + Agir)
  ACCOMMODATOR: number; // CE + AE (Sentir + Agir)
}

export function calculateKolbQuadrants(scores: KolbScores): KolbQuadrantScores {
  return {
    DIVERGER: scores.CE + scores.RO,
    ASSIMILATOR: scores.AC + scores.RO,
    CONVERGER: scores.AC + scores.AE,
    ACCOMMODATOR: scores.CE + scores.AE,
  };
}

export function determineKolbResult(scores: KolbScores): string {
  const quadrants = calculateKolbQuadrants(scores);
  const sorted = (Object.entries(quadrants) as [keyof KolbQuadrantScores, number][]).sort(
    (a, b) => b[1] - a[1]
  );

  const top1 = sorted[0];
  const top2 = sorted[1];

  // If tie or within 1 point, return mixed
  if (top1[1] === top2[1] || top1[1] - top2[1] <= 1) {
    return 'MIXED_TEMPLATE';
  }

  return top1[0];
}

export function getKolbResultProfile(resultKey: string): ResultProfile {
  return kolbResults[resultKey] || kolbResults['DIVERGER'];
}

// --- Gardner Scoring ---
export type GardnerScores = Record<GardnerIntelligence, number>;

export function calculateGardnerScores(
  answers: (number | string | null)[],
  questionsOrTags?: GardnerQuestion[] | GardnerIntelligence[]
): GardnerScores {
  const likertSums: GardnerScores = { LOG: 0, LIN: 0, SPA: 0, MUS: 0, KIN: 0, INTER: 0, INTRA: 0 };
  const likertCounts: GardnerScores = { LOG: 0, LIN: 0, SPA: 0, MUS: 0, KIN: 0, INTER: 0, INTRA: 0 };
  const situationalBonuses: GardnerScores = { LOG: 0, LIN: 0, SPA: 0, MUS: 0, KIN: 0, INTER: 0, INTRA: 0 };

  const isQuestionArray = Array.isArray(questionsOrTags) && questionsOrTags.length > 0 && typeof questionsOrTags[0] === 'object';

  if (isQuestionArray) {
    const questions = questionsOrTags as GardnerQuestion[];
    questions.forEach((q, idx) => {
      const ans = answers[idx];
      if (ans === null || ans === undefined) return;

      if (!('options' in q)) {
        // Likert question
        const numVal = typeof ans === 'number' ? ans : parseInt(String(ans), 10);
        if (!isNaN(numVal) && numVal >= 1 && numVal <= 5) {
          const adjustedVal = q.isReversed ? (6 - numVal) : numVal;
          likertSums[q.tag] += adjustedVal;
          likertCounts[q.tag] += 1;
        }
      } else {
        // Situational question
        const selectedOpt = q.options.find((opt) => opt.id === ans || opt.tag === ans);
        if (selectedOpt) {
          situationalBonuses[selectedOpt.tag] += 0.4;
        }
      }
    });
  } else if (Array.isArray(questionsOrTags)) {
    // Fallback: array of tags
    const tags = questionsOrTags as GardnerIntelligence[];
    answers.forEach((ans, idx) => {
      const numVal = typeof ans === 'number' ? ans : parseInt(String(ans), 10);
      if (!isNaN(numVal) && tags[idx]) {
        const tag = tags[idx];
        likertSums[tag] += numVal;
        likertCounts[tag] += 1;
      }
    });
  }

  const finalScores: GardnerScores = { LOG: 0, LIN: 0, SPA: 0, MUS: 0, KIN: 0, INTER: 0, INTRA: 0 };

  (Object.keys(finalScores) as GardnerIntelligence[]).forEach((key) => {
    const baseAvg = likertCounts[key] > 0 ? likertSums[key] / likertCounts[key] : 3.0;
    const bonus = situationalBonuses[key] || 0;
    const total = Math.min(5.0, Math.max(1.0, baseAvg + bonus));
    finalScores[key] = Number(total.toFixed(2));
  });

  return finalScores;
}

export function determineGardnerResult(scores: GardnerScores): GardnerIntelligence[] {
  const sorted = (Object.entries(scores) as [GardnerIntelligence, number][]).sort(
    (a, b) => b[1] - a[1]
  );

  const top1 = sorted[0];
  const top2 = sorted[1];
  const top3 = sorted[2];

  const results: GardnerIntelligence[] = [top1[0], top2[0]];

  // Include top 3 if score diff is <= 0.3
  if (top2[1] - top3[1] <= 0.3 || top1[1] - top2[1] <= 0.3) {
    if (!results.includes(top3[0])) {
      results.push(top3[0]);
    }
  }

  return results.slice(0, 3);
}

export function getGardnerResultProfile(intelligence: GardnerIntelligence): ResultProfile {
  return gardnerResults[intelligence] || gardnerResults['LOG'];
}

// Helper to format localized string
export function localize<T extends { [K in Locale]: any }>(obj: T, locale: Locale): T[Locale] {
  return obj[locale] || obj['pt'] || obj['en'];
}
