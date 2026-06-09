import { create } from 'zustand';

interface MeetingState {
  currentRoom: string | null;
  isInCall: boolean;
  participantsCount: number;
  setCurrentRoom: (room: string | null) => void;
  setInCall: (inCall: boolean) => void;
  setParticipantsCount: (count: number) => void;
  resetMeeting: () => void;
}

export const useMeetingStore = create<MeetingState>((set) => ({
  currentRoom: null,
  isInCall: false,
  participantsCount: 0,
  setCurrentRoom: (room) => set({ currentRoom: room }),
  setInCall: (inCall) => set({ isInCall: inCall }),
  setParticipantsCount: (count) => set({ participantsCount: count }),
  resetMeeting: () => set({ currentRoom: null, isInCall: false, participantsCount: 0 })
}));
