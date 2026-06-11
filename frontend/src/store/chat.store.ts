import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  type?: 'text' | 'system';
}

interface ChatState {
  messages: ChatMessage[];
  typingUsers: string[];
  addMessage: (msg: ChatMessage) => void;
  setMessages: (msgs: ChatMessage[]) => void;
  setTyping: (name: string, isTyping: boolean) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  typingUsers: [],
  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  setMessages: (msgs) => set({ messages: msgs }),
  setTyping: (name, isTyping) => set((s) => ({
    typingUsers: isTyping
      ? [...new Set([...s.typingUsers, name])]
      : s.typingUsers.filter(u => u !== name),
  })),
  clearChat: () => set({ messages: [], typingUsers: [] }),
}));
