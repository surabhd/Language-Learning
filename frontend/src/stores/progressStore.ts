import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Progress, DailyActivity } from '../types';
import { useProfileStore } from './profileStore';

const today = () => new Date().toISOString().split('T')[0];

const defaultProgress: Progress = {
  streak: 0,
  longestStreak: 0,
  totalXP: 0,
  level: 1,
  lessonsCompleted: [],
  quizHistory: [],
  vocabSize: 0,
  practiceMinutes: 0,
  weeklyActivity: [],
  lastActiveDate: '',
};

interface ProgressState {
  data: Record<string, Progress>;
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  addQuizResult: (topic: string, level: string, score: number) => void;
  updateStreak: () => void;
  addPracticeTime: (minutes: number) => void;
  updateVocabSize: (size: number) => void;
  resetProgress: () => void;
  recordActivity: (xp: number, minutes: number) => void;
}

// Helper to get active profile ID
const getActiveId = () => useProfileStore.getState().activeProfileId;

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      data: { default: defaultProgress },

      addXP: (amount: number) => {
        const id = getActiveId();
        set((state) => {
          const current = state.data[id] || defaultProgress;
          const totalXP = current.totalXP + amount;
          const level = Math.floor(totalXP / 500) + 1;
          return { data: { ...state.data, [id]: { ...current, totalXP, level } } };
        });
        get().updateStreak();
        get().recordActivity(amount, 0);
      },

      completeLesson: (lessonId: string) => {
        const id = getActiveId();
        set((state) => {
          const current = state.data[id] || defaultProgress;
          if (current.lessonsCompleted.includes(lessonId)) return state;
          return {
            data: {
              ...state.data,
              [id]: { ...current, lessonsCompleted: [...current.lessonsCompleted, lessonId] }
            },
          };
        });
      },

      addQuizResult: (topic: string, level: string, score: number) => {
        const id = getActiveId();
        set((state) => {
          const current = state.data[id] || defaultProgress;
          return {
            data: {
              ...state.data,
              [id]: {
                ...current,
                quizHistory: [
                  { date: today(), score, topic, level: level as Progress['quizHistory'][0]['level'] },
                  ...current.quizHistory.slice(0, 49),
                ],
              }
            }
          };
        });
      },

      updateStreak: () => {
        const id = getActiveId();
        set((state) => {
          const current = state.data[id] || defaultProgress;
          const lastActive = current.lastActiveDate;
          const todayStr = today();
          if (lastActive === todayStr) return state;

          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];

          const newStreak = lastActive === yesterdayStr ? current.streak + 1 : 1;
          const longestStreak = Math.max(newStreak, current.longestStreak);

          return {
            data: {
              ...state.data,
              [id]: { ...current, streak: newStreak, longestStreak, lastActiveDate: todayStr }
            }
          };
        });
      },

      addPracticeTime: (minutes: number) => {
        const id = getActiveId();
        set((state) => {
          const current = state.data[id] || defaultProgress;
          return {
            data: {
              ...state.data,
              [id]: { ...current, practiceMinutes: current.practiceMinutes + minutes }
            }
          };
        });
        get().recordActivity(0, minutes);
      },

      updateVocabSize: (size: number) => {
        const id = getActiveId();
        set((state) => {
          const current = state.data[id] || defaultProgress;
          return { data: { ...state.data, [id]: { ...current, vocabSize: size } } };
        });
      },

      recordActivity: (xp: number, minutes: number) => {
        const id = getActiveId();
        set((state) => {
          const current = state.data[id] || defaultProgress;
          const todayStr = today();
          const existing = current.weeklyActivity.find(d => d.date === todayStr);
          let weeklyActivity: DailyActivity[];

          if (existing) {
            weeklyActivity = current.weeklyActivity.map(d =>
              d.date === todayStr
                ? { ...d, xp: d.xp + xp, minutesPracticed: d.minutesPracticed + minutes }
                : d
            );
          } else {
            const newEntry: DailyActivity = {
              date: todayStr,
              xp,
              minutesPracticed: minutes,
              lessonsCompleted: 0,
              quizzesTaken: 0,
            };
            weeklyActivity = [newEntry, ...current.weeklyActivity].slice(0, 30);
          }

          return { data: { ...state.data, [id]: { ...current, weeklyActivity } } };
        });
      },

      resetProgress: () => {
        const id = getActiveId();
        set((state) => ({ data: { ...state.data, [id]: defaultProgress } }));
      }
    }),
    { name: 'finnish-progress-v2' } // Version bump to avoid clash with old format
  )
);
