import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface SurveyState {
  currentQuestion: number
  answers: {
    age?: string
    category?: string
    subcategory?: string
    subsubcategory?: string
    [key: string]: string | string[] | undefined
  }
  setAnswer: (questionId: string, answer: string | string[]) => void
  nextQuestion: () => void
  prevQuestion: () => void
  resetSurvey: () => void
}

export const useSurveyStore = create<SurveyState>()(
  persist(
    (set) => ({
      currentQuestion: 0,
      answers: {},
      setAnswer: (questionId, answer) => 
        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: answer
          }
        })),
      nextQuestion: () => 
        set((state) => ({
          currentQuestion: state.currentQuestion + 1
        })),
      prevQuestion: () => 
        set((state) => ({
          currentQuestion: Math.max(0, state.currentQuestion - 1)
        })),
      resetSurvey: () => 
        set({
          currentQuestion: 0,
          answers: {}
        })
    }),
    {
      name: 'survey-storage',
      storage: createJSONStorage(() => localStorage), // localStorage 사용
    }
  )
)