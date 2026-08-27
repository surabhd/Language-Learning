import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { VocabWord } from '../types';
import { useProfileStore } from './profileStore';
import { YKI_FULL_VOCAB_BANK } from '../data/ykiVocabBank';

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

const INITIAL_VOCAB = YKI_FULL_VOCAB_BANK;

interface VocabProfileState {
  words: VocabWord[];
}

interface VocabState {
  data: Record<string, VocabProfileState>;
  addWord: (word: Omit<VocabWord, 'id' | 'timesSeen' | 'mastered'>) => void;
  updateWord: (id: string, updates: Partial<VocabWord>) => void;
  reviewWord: (id: string, quality: 0 | 1 | 2 | 3 | 4 | 5) => void;
  removeWord: (id: string) => void;
  getDueWords: () => VocabWord[];
  getWordsByCategory: (category: string) => VocabWord[];
  getMasteredWords: () => VocabWord[];
  getWeakWords: () => VocabWord[];
}

const getActiveId = () => useProfileStore.getState().activeProfileId;
const getWordsForActive = (state: VocabState) => state.data[getActiveId()]?.words || INITIAL_VOCAB;

export const useVocabStore = create<VocabState>()(
  persist(
    (set, get) => ({
      data: { default: { words: INITIAL_VOCAB } },

      addWord: (word) => {
        const id = getActiveId();
        const wid = `v${Date.now()}`;
        set((state) => {
          const words = state.data[id]?.words || INITIAL_VOCAB;
          return {
            data: {
              ...state.data,
              [id]: { words: [...words, { ...word, id: wid, timesSeen: 0, mastered: false }] }
            }
          };
        });
      },

      updateWord: (wid, updates) => {
        const id = getActiveId();
        set((state) => {
          const words = state.data[id]?.words || INITIAL_VOCAB;
          return {
            data: {
              ...state.data,
              [id]: { words: words.map(w => w.id === wid ? { ...w, ...updates } : w) }
            }
          };
        });
      },

      reviewWord: (wid, quality) => {
        const id = getActiveId();
        set((state) => {
          const words = state.data[id]?.words || INITIAL_VOCAB;
          const word = words.find(w => w.id === wid);
          if (!word) return state;
          const updates = sm2(word, quality);
          return {
            data: {
              ...state.data,
              [id]: { words: words.map(w => w.id === wid ? { ...w, ...updates } : w) }
            }
          };
        });
      },

      removeWord: (wid) => {
        const id = getActiveId();
        set((state) => {
          const words = state.data[id]?.words || INITIAL_VOCAB;
          return {
            data: {
              ...state.data,
              [id]: { words: words.filter(w => w.id !== wid) }
            }
          };
        });
      },

      getDueWords: () => {
        const today = new Date().toISOString().split('T')[0];
        const words = getWordsForActive(get());
        return words.filter(w => {
          if (w.mastered) return false;
          if (!w.nextReview) return true;
          return w.nextReview <= today;
        });
      },

      getWordsByCategory: (category) => {
        return getWordsForActive(get()).filter(w => w.category === category);
      },

      getMasteredWords: () => getWordsForActive(get()).filter(w => w.mastered),

      getWeakWords: () => getWordsForActive(get()).filter(w => w.difficulty === 'hard' && !w.mastered),
    }),
    { name: 'finnish-vocabulary-v5' } // Increment version to v5 to load the new 520-word database
  )
);
