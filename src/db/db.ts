import Dexie, { type EntityTable } from 'dexie';
import { ScenarioProgress } from '../types';

const db = new Dexie('LinguaRoleplayDB') as Dexie & {
  progress: EntityTable<ScenarioProgress, 'scenarioId'>;
};

// Declare schema
db.version(1).stores({
  progress: 'scenarioId, language, nextReviewDate'
});

export { db };
