import { atom } from 'recoil';
import { Chat } from '../types/chat';
import { Stock } from '../types/stock';
import { StreamStatus } from '../types/streamStatus';

export const chatListAtom = atom<Chat[]>({
  key: 'chatListAtom',
  default: [],
});

export const chatStageAtom = atom<StreamStatus>({
  key: 'chatStageAtom',
  default: StreamStatus.IDLE,

});

export const inputTextAtom = atom<string>({
  key: 'inputTextAtom',
  default: '',
});