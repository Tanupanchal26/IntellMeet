import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '../../constants';

type Theme = 'dark' | 'light';
type Panel = 'chat' | 'participants' | 'ai' | 'notes';

interface UIState {
  theme: Theme;
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  activeMeetingPanel: Panel;
  globalLoading: boolean;
}

const initialState: UIState = {
  theme: (localStorage.getItem(STORAGE_KEYS.THEME) as Theme) || 'dark',
  sidebarCollapsed: localStorage.getItem(STORAGE_KEYS.SIDEBAR) === 'true',
  mobileSidebarOpen: false,
  activeMeetingPanel: 'chat',
  globalLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEYS.THEME, state.theme);
    },
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
      localStorage.setItem(STORAGE_KEYS.SIDEBAR, String(state.sidebarCollapsed));
    },
    setMobileSidebar(state, { payload }: PayloadAction<boolean>) {
      state.mobileSidebarOpen = payload;
    },
    setActiveMeetingPanel(state, { payload }: PayloadAction<Panel>) {
      state.activeMeetingPanel = payload;
    },
    setGlobalLoading(state, { payload }: PayloadAction<boolean>) {
      state.globalLoading = payload;
    },
  },
});

export const { toggleTheme, toggleSidebar, setMobileSidebar, setActiveMeetingPanel, setGlobalLoading } = uiSlice.actions;
export default uiSlice.reducer;
