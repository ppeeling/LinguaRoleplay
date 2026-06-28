import { ScenarioProgress } from '../types';

/**
 * SuperMemo-2 (SM-2) Variant algorithm.
 * Calculates the next review date and parameters based on pass/fail.
 */
export function calculateNextReview(
  progress: Partial<ScenarioProgress>,
  score: 'pass' | 'fail'
): Omit<ScenarioProgress, 'scenarioId' | 'language'> {
  let { interval = 0, repetition = 0, efactor = 2.5 } = progress;

  if (score === 'pass') {
    if (repetition === 0) {
      interval = 1;
    } else if (repetition === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * efactor);
    }
    repetition += 1;
  } else {
    repetition = 0;
    interval = 1;
    efactor = Math.max(1.3, efactor - 0.2); // Degrade efactor but never go below 1.3
  }

  // Next review date in milliseconds
  const nextReviewDate = Date.now() + interval * 24 * 60 * 60 * 1000;

  return {
    interval,
    repetition,
    efactor,
    nextReviewDate,
    lastScore: score
  };
}
