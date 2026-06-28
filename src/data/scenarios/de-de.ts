import { RoleplayScenario } from '../../types';

export const deDEBakery: RoleplayScenario = {
  id: 'de-de-bakery-1',
  title: 'At the Bakery',
  language: 'de-DE',
  level: 'Beginner',
  context: 'You are at a bakery in Berlin ordering pretzels.',
  lines: [
    {
      id: 'd-1',
      speaker: 'bot',
      text: 'Guten Morgen! Was darf es sein?',
      translation: 'Good morning! What would you like?'
    },
    {
      id: 'd-2',
      speaker: 'user',
      text: 'Ich hätte gerne zwei Brezeln, bitte.',
      translation: 'I would like two pretzels, please.',
      hint: 'Ich hätte gerne... = I would like...'
    },
    {
      id: 'd-3',
      speaker: 'bot',
      text: 'Gerne. Sonst noch etwas?',
      translation: 'Gladly. Anything else?'
    },
    {
      id: 'd-4',
      speaker: 'user',
      text: 'Nein, das ist alles.',
      translation: 'No, that is all.'
    },
    {
      id: 'd-5',
      speaker: 'bot',
      text: 'Das macht dann zwei Euro vierzig, bitte.',
      translation: 'That will be 2.40 euros, please.'
    }
  ]
};
