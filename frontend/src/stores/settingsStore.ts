import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AISettings } from '../types';

interface SettingsState {
  settings: AISettings;
  darkMode: boolean;
  updateSettings: (s: Partial<AISettings>) => void;
  toggleDarkMode: () => void;
  setDarkMode: (v: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: {
        baseUrl: 'http://localhost:1234',
        model: 'local-model',
        temperature: 0.7,
        maxTokens: 1024,
      },
      darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      updateSettings: (s) => set((state) => ({ settings: { ...state.settings, ...s } })),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setDarkMode: (v) => set({ darkMode: v }),
    }),
    { name: 'finnish-settings' }
  )
);
