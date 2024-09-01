import { create } from 'zustand'

interface SurveyState {
  currentQuestion: number
  answers: Record<string, any>
  setAnswer: (question: string, answer: any) => void
  nextQuestion: () => void
  prevQuestion: () => void
  resetSurvey: () => void // 새로운 메서드 추가
}

export const useSurveyStore = create<SurveyState>((set) => ({
  currentQuestion: 0,
  answers: {},
  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    })),
  nextQuestion: () =>
    set((state) => ({ currentQuestion: state.currentQuestion + 1 })),
  prevQuestion: () =>
    set((state) => ({ currentQuestion: Math.max(0, state.currentQuestion - 1) })),
  resetSurvey: () => set({ currentQuestion: 0, answers: {} }) // 새로운 메서드 구현
}))