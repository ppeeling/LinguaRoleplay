export type SupportedLanguage = 'zh-TW' | 'de-DE' | 'fr-FR';
export type SpeakerRole = 'bot' | 'user';

export interface DialogueLine {
  id: string;
  speaker: SpeakerRole;
  text: string; // The literal text spoken in the target language
  translation: string; // English translation / instruction
  hint?: string; // Optional grammar or context hint
}

export interface RoleplayScenario {
  id: string;
  title: string;
  language: SupportedLanguage;
  level: string;
  context: string;
  lines: DialogueLine[];
}

export interface ScenarioProgress {
  scenarioId: string;
  language: SupportedLanguage;
  nextReviewDate: number; // Unix timestamp
  interval: number; // Days between reviews
  repetition: number;
  efactor: number; // Easiness factor for SM-2
  lastScore?: 'pass' | 'fail';
}
