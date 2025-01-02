import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (email: string, password: string) => {
    // Simulate API call
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      enrolledCourses: [],
    };
    set({ user: mockUser });
  },
  logout: () => set({ user: null }),
}));