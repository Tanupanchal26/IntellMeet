import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  activeMeetingPanel: 'chat' | 'participants' | 'transcript' | 'actions';
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  setActiveMeetingPanel: (panel: 'chat' | 'participants' | 'transcript' | 'actions') => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  activeMeetingPanel: 'chat',
  theme: 'light',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setActiveMeetingPanel: (panel) => set({ activeMeetingPanel: panel }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }))
}));
