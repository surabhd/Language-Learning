import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { VocabWord } from '../types';

// SM-2 Algorithm
function sm2(word: VocabWord, quality: 0 | 1 | 2 | 3 | 4 | 5): Partial<VocabWord> {
  const ef = word.easeFactor ?? 2.5;
  const reps = word.repetitions ?? 0;
  const interval = word.interval ?? 1;

  const newEF = Math.max(1.3, ef + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  let newInterval: number;
  let newReps: number;

  if (quality < 3) {
    newReps = 0;
    newInterval = 1;
  } else {
    newReps = reps + 1;
    if (reps === 0) newInterval = 1;
    else if (reps === 1) newInterval = 6;
    else newInterval = Math.round(interval * newEF);
  }

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + newInterval);

  return {
    easeFactor: newEF,
    repetitions: newReps,
    interval: newInterval,
    nextReview: nextReview.toISOString().split('T')[0],
    lastSeen: new Date().toISOString().split('T')[0],
    timesSeen: (word.timesSeen ?? 0) + 1,
    mastered: newReps >= 5 && quality >= 4,
    difficulty: quality >= 4 ? 'easy' : quality >= 2 ? 'medium' : 'hard',
  };
}

const INITIAL_VOCAB: VocabWord[] = [
  { id: 'v1', word: 'Hei', translation: 'Hello / Hi', level: 'beginner', category: 'greetings', pronunciation: 'hey', exampleFinnish: 'Hei! Miten menee?', exampleEnglish: 'Hi! How are you?', timesSeen: 0, mastered: false, difficulty: 'easy' },
  { id: 'v2', word: 'Kiitos', translation: 'Thank you', level: 'beginner', category: 'greetings', pronunciation: 'kee-tos', exampleFinnish: 'Kiitos paljon!', exampleEnglish: 'Thank you very much!', timesSeen: 0, mastered: false, difficulty: 'easy' },
  { id: 'v3', word: 'Anteeksi', translation: 'Excuse me / Sorry', level: 'beginner', category: 'greetings', pronunciation: 'an-tek-si', exampleFinnish: 'Anteeksi, missä on pankki?', exampleEnglish: 'Excuse me, where is the bank?', timesSeen: 0, mastered: false, difficulty: 'easy' },
  { id: 'v4', word: 'Kyllä', translation: 'Yes', level: 'beginner', category: 'basics', pronunciation: 'kül-lä', exampleFinnish: 'Kyllä, haluan kahvia.', exampleEnglish: 'Yes, I want coffee.', timesSeen: 0, mastered: false, difficulty: 'easy' },
  { id: 'v5', word: 'Ei', translation: 'No', level: 'beginner', category: 'basics', pronunciation: 'ay', exampleFinnish: 'Ei, kiitos.', exampleEnglish: 'No, thank you.', timesSeen: 0, mastered: false, difficulty: 'easy' },
  { id: 'v6', word: 'Yksi', translation: 'One', level: 'beginner', category: 'numbers', pronunciation: 'ük-si', exampleFinnish: 'Yksi kahvi, kiitos.', exampleEnglish: 'One coffee, please.', timesSeen: 0, mastered: false, difficulty: 'easy' },
  { id: 'v7', word: 'Kaksi', translation: 'Two', level: 'beginner', category: 'numbers', pronunciation: 'kak-si', exampleFinnish: 'Kaksi lippua, kiitos.', exampleEnglish: 'Two tickets, please.', timesSeen: 0, mastered: false, difficulty: 'easy' },
  { id: 'v8', word: 'Kolme', translation: 'Three', level: 'beginner', category: 'numbers', pronunciation: 'kol-me', exampleFinnish: 'Kolme euroa.', exampleEnglish: 'Three euros.', timesSeen: 0, mastered: false, difficulty: 'easy' },
  { id: 'v9', word: 'Vesi', translation: 'Water', level: 'beginner', category: 'food', pronunciation: 've-si', exampleFinnish: 'Saanko lasillisen vettä?', exampleEnglish: 'Can I have a glass of water?', timesSeen: 0, mastered: false, difficulty: 'easy' },
  { id: 'v10', word: 'Kahvi', translation: 'Coffee', level: 'beginner', category: 'food', pronunciation: 'kah-vi', exampleFinnish: 'Suomalaiset juovat paljon kahvia.', exampleEnglish: 'Finns drink a lot of coffee.', timesSeen: 0, mastered: false, difficulty: 'easy' },
  { id: 'v11', word: 'Leipä', translation: 'Bread', level: 'beginner', category: 'food', pronunciation: 'lay-pä', exampleFinnish: 'Haluatko leipää?', exampleEnglish: 'Do you want bread?', timesSeen: 0, mastered: false, difficulty: 'easy' },
  { id: 'v12', word: 'Äiti', translation: 'Mother', level: 'beginner', category: 'family', pronunciation: 'äy-ti', exampleFinnish: 'Minun äitini on lääkäri.', exampleEnglish: 'My mother is a doctor.', timesSeen: 0, mastered: false, difficulty: 'easy' },
  { id: 'v13', word: 'Isä', translation: 'Father', level: 'beginner', category: 'family', pronunciation: 'i-sä', exampleFinnish: 'Isä on kotona.', exampleEnglish: 'Father is at home.', timesSeen: 0, mastered: false, difficulty: 'easy' },
  { id: 'v14', word: 'Suomi', translation: 'Finland / Finnish language', level: 'beginner', category: 'basics', pronunciation: 'su-o-mi', exampleFinnish: 'Minä opiskelen suomea.', exampleEnglish: 'I am studying Finnish.', timesSeen: 0, mastered: false, difficulty: 'easy' },
  { id: 'v15', word: 'Helsinki', translation: 'Helsinki (capital of Finland)', level: 'beginner', category: 'places', pronunciation: 'hel-sin-ki', exampleFinnish: 'Helsinki on Suomen pääkaupunki.', exampleEnglish: 'Helsinki is the capital of Finland.', timesSeen: 0, mastered: false, difficulty: 'easy' },
  { id: 'v16', word: 'Partitiivia', translation: 'Partitive case', level: 'intermediate', category: 'grammar', pronunciation: 'par-ti-tii-vi-a', exampleFinnish: 'Juon kahvia.', exampleEnglish: 'I drink (some) coffee.', timesSeen: 0, mastered: false, difficulty: 'medium' },
  { id: 'v17', word: 'Nominatiivi', translation: 'Nominative case', level: 'intermediate', category: 'grammar', pronunciation: 'no-mi-na-tii-vi', exampleFinnish: 'Koira juoksee.', exampleEnglish: 'The dog runs.', timesSeen: 0, mastered: false, difficulty: 'medium' },
  { id: 'v18', word: 'Työ', translation: 'Work / Job', level: 'intermediate', category: 'workplace', pronunciation: 'tüö', exampleFinnish: 'Pidän työstäni.', exampleEnglish: 'I like my job.', timesSeen: 0, mastered: false, difficulty: 'medium' },
  { id: 'v19', word: 'Kokoous', translation: 'Meeting', level: 'intermediate', category: 'workplace', pronunciation: 'ko-ko-us', exampleFinnish: 'Meillä on kokous kello kolme.', exampleEnglish: 'We have a meeting at three o\'clock.', timesSeen: 0, mastered: false, difficulty: 'medium' },
  { id: 'v20', word: 'Saunoa', translation: 'To sauna / go to sauna', level: 'intermediate', category: 'culture', pronunciation: 'sau-no-a', exampleFinnish: 'Haluatko saunoa?', exampleEnglish: 'Do you want to go to the sauna?', timesSeen: 0, mastered: false, difficulty: 'medium' },
];

interface VocabState {
  words: VocabWord[];
  addWord: (word: Omit<VocabWord, 'id' | 'timesSeen' | 'mastered'>) => void;
  updateWord: (id: string, updates: Partial<VocabWord>) => void;
  reviewWord: (id: string, quality: 0 | 1 | 2 | 3 | 4 | 5) => void;
  removeWord: (id: string) => void;
  getDueWords: () => VocabWord[];
  getWordsByCategory: (category: string) => VocabWord[];
  getMasteredWords: () => VocabWord[];
  getWeakWords: () => VocabWord[];
}

export const useVocabStore = create<VocabState>()(
  persist(
    (set, get) => ({
      words: INITIAL_VOCAB,

      addWord: (word) => {
        const id = `v${Date.now()}`;
        set((state) => ({
          words: [...state.words, { ...word, id, timesSeen: 0, mastered: false }],
        }));
      },

      updateWord: (id, updates) => {
        set((state) => ({
          words: state.words.map(w => w.id === id ? { ...w, ...updates } : w),
        }));
      },

      reviewWord: (id, quality) => {
        const word = get().words.find(w => w.id === id);
        if (!word) return;
        const updates = sm2(word, quality);
        set((state) => ({
          words: state.words.map(w => w.id === id ? { ...w, ...updates } : w),
        }));
      },

      removeWord: (id) => {
        set((state) => ({ words: state.words.filter(w => w.id !== id) }));
      },

      getDueWords: () => {
        const today = new Date().toISOString().split('T')[0];
        return get().words.filter(w => {
          if (w.mastered) return false;
          if (!w.nextReview) return true;
          return w.nextReview <= today;
        });
      },

      getWordsByCategory: (category) => {
        return get().words.filter(w => w.category === category);
      },

      getMasteredWords: () => get().words.filter(w => w.mastered),

      getWeakWords: () => get().words.filter(w => w.difficulty === 'hard' && !w.mastered),
    }),
    { name: 'finnish-vocabulary' }
  )
);
