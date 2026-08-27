import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Progress, DailyActivity } from '../types';

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
  progress: Progress;
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  addQuizResult: (topic: string, level: string, score: number) => void;
  updateStreak: () => void;
  addPracticeTime: (minutes: number) => void;
  updateVocabSize: (size: number) => void;
  resetProgress: () => void;
  recordActivity: (xp: number, minutes: number) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: defaultProgress,

      addXP: (amount: number) => {
        set((state) => {
          const totalXP = state.progress.totalXP + amount;
          const level = Math.floor(totalXP / 500) + 1;
          return { progress: { ...state.progress, totalXP, level } };
        });
        get().updateStreak();
        get().recordActivity(amount, 0);
      },

      completeLesson: (lessonId: string) => {
        set((state) => {
          if (state.progress.lessonsCompleted.includes(lessonId)) return state;
          return {
            progress: {
              ...state.progress,
              lessonsCompleted: [...state.progress.lessonsCompleted, lessonId],
            },
          };
        });
      },

      addQuizResult: (topic: string, level: string, score: number) => {
        set((state) => ({
          progress: {
            ...state.progress,
            quizHistory: [
              { date: today(), score, topic, level: level as Progress['quizHistory'][0]['level'] },
              ...state.progress.quizHistory.slice(0, 49),
            ],
          },
        }));
      },

      updateStreak: () => {
        set((state) => {
          const lastActive = state.progress.lastActiveDate;
          const todayStr = today();
          if (lastActive === todayStr) return state;

          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];

          const newStreak = lastActive === yesterdayStr ? state.progress.streak + 1 : 1;
          const longestStreak = Math.max(newStreak, state.progress.longestStreak);

          return {
            progress: {
              ...state.progress,
              streak: newStreak,
              longestStreak,
              lastActiveDate: todayStr,
            },
          };
        });
      },

      addPracticeTime: (minutes: number) => {
        set((state) => ({
          progress: {
            ...state.progress,
            practiceMinutes: state.progress.practiceMinutes + minutes,
          },
        }));
        get().recordActivity(0, minutes);
      },

      updateVocabSize: (size: number) => {
        set((state) => ({ progress: { ...state.progress, vocabSize: size } }));
      },

      recordActivity: (xp: number, minutes: number) => {
        set((state) => {
          const todayStr = today();
          const existing = state.progress.weeklyActivity.find(d => d.date === todayStr);
          let weeklyActivity: DailyActivity[];

          if (existing) {
            weeklyActivity = state.progress.weeklyActivity.map(d =>
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
            weeklyActivity = [newEntry, ...state.progress.weeklyActivity].slice(0, 30);
          }

          return { progress: { ...state.progress, weeklyActivity } };
        });
      },

      resetProgress: () => set({ progress: defaultProgress }),
    }),
    { name: 'finnish-progress' }
  )
);
