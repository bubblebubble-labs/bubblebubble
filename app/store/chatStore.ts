import { create } from 'zustand';
import { Chat } from '../types/chat';
import { StreamStatus } from '../types/streamStatus';

interface ChatStore {
  chatList: Chat[];
  setChatList: (value: Chat[] | ((prevList: Chat[]) => Chat[])) => void;
  chatStage: StreamStatus;
  setChatStage: (stage: StreamStatus) => void;
  inputText: string;
  setInputText: (text: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chatList: [],
  setChatList: (value) => set((state) => ({
    chatList: typeof value === 'function' ? value(state.chatList) : value
  })),
  chatStage: StreamStatus.IDLE,
  setChatStage: (stage) => set({ chatStage: stage }),
  inputText: '',
  setInputText: (text) => set({ inputText: text }),
}));
