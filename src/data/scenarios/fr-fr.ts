import { RoleplayScenario } from '../../types';

export const frFRDirections: RoleplayScenario = {
  id: 'fr-fr-dir-1',
  title: 'Asking for Directions',
  language: 'fr-FR',
  level: 'Beginner',
  context: 'You are on the street asking someone for the train station.',
  lines: [
    {
      id: 'f-1',
      speaker: 'bot',
      text: 'Excusez-moi, je suis perdu. Où est la gare, s\'il vous plaît?',
      translation: 'Excuse me, I\'m lost. Where is the train station, please?'
    },
    {
      id: 'f-2',
      speaker: 'user',
      text: 'Allez tout droit et tournez à gauche.',
      translation: 'Go straight and turn left.',
      hint: 'tout droit = straight ahead; à gauche = to the left'
    },
    {
      id: 'f-3',
      speaker: 'bot',
      text: 'C\'est loin d\'ici?',
      translation: 'Is it far from here?'
    },
    {
      id: 'f-4',
      speaker: 'user',
      text: 'Non, c\'est à cinq minutes à pied.',
      translation: 'No, it is a five minute walk.'
    },
    {
      id: 'f-5',
      speaker: 'bot',
      text: 'Merci beaucoup!',
      translation: 'Thank you very much!'
    }
  ]
};
