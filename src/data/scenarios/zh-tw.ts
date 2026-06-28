import { RoleplayScenario } from '../../types';

export const zhTWCafe: RoleplayScenario = {
  id: 'zh-tw-cafe-1',
  title: 'Ordering Coffee',
  language: 'zh-TW',
  level: 'Beginner',
  context: 'You are at a cafe in Taipei ordering an iced americano.',
  lines: [
    {
      id: 'z-1',
      speaker: 'bot',
      text: '歡迎光臨！請問今天要喝點什麼？',
      translation: 'Welcome! What would you like to drink today?'
    },
    {
      id: 'z-2',
      speaker: 'user',
      text: '我要一杯冰美式咖啡。',
      translation: 'I would like an iced americano.',
      hint: '我要 (wǒ yào) = I want / I would like'
    },
    {
      id: 'z-3',
      speaker: 'bot',
      text: '好的，冰美式。需要加糖或奶精嗎？',
      translation: 'Okay, iced americano. Do you need sugar or cream?'
    },
    {
      id: 'z-4',
      speaker: 'user',
      text: '不用，謝謝。',
      translation: 'No, thank you.'
    },
    {
      id: 'z-5',
      speaker: 'bot',
      text: '好的，一共是八十元。',
      translation: 'Okay, that will be 80 NT dollars total.'
    }
  ]
};
