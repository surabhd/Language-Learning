import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Profile } from '../types';

interface ProfileState {
  profiles: Profile[];
  activeProfileId: string;
  addProfile: (name: string, avatar?: string) => void;
  switchProfile: (id: string) => void;
  deleteProfile: (id: string) => void;
}

const AVATARS = ['🦊', '🐻', '🦉', '🦌', '🐰', '🐺', '🐿️', '🦆'];

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profiles: [
        {
          id: 'default',
          name: 'Learner',
          avatar: '🧑‍🎓',
          createdAt: new Date().toISOString()
        }
      ],
      activeProfileId: 'default',

      addProfile: (name: string, avatar?: string) => {
        const id = 'prof_' + Date.now().toString(36) + Math.random().toString(36).substring(2);
        const selectedAvatar = avatar || AVATARS[Math.floor(Math.random() * AVATARS.length)];
        
        set((state) => ({
          profiles: [
            ...state.profiles,
            { id, name, avatar: selectedAvatar, createdAt: new Date().toISOString() }
          ],
          activeProfileId: id
        }));
      },

      switchProfile: (id: string) => set({ activeProfileId: id }),

      deleteProfile: (id: string) => set((state) => {
        const newProfiles = state.profiles.filter(p => p.id !== id);
        // If we delete the active profile, switch to the first available one
        const activeProfileId = state.activeProfileId === id && newProfiles.length > 0
          ? newProfiles[0].id 
          : state.activeProfileId;
          
        return {
          profiles: newProfiles,
          activeProfileId
        };
      })
    }),
    { name: 'finnish-profiles' }
  )
);
