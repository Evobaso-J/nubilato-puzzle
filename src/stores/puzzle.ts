import { defineStore } from 'pinia'
import trialsData from '~/data/trials.json'
import type { Trial } from '~/types/trial'

const TOTAL_PIECES = 15

export const usePuzzleStore = defineStore('puzzle', {
  state: () => ({
    trials: trialsData as Trial[],
    currentTrialIndex: 0,
    unlockedPieces: [] as number[],
  }),
  getters: {
    isComplete: state => state.unlockedPieces.length >= TOTAL_PIECES,
    currentTrial(state): Trial | null {
      return state.trials[state.currentTrialIndex] ?? null
    },
    progress: state => state.unlockedPieces.length,
  },
  actions: {
    submitCode(input: string): { ok: boolean } {
      const trial = this.trials[this.currentTrialIndex]
      if (!trial) return { ok: false }
      if (input.trim() !== trial.code) return { ok: false }
      this.unlockedPieces.push(trial.id)
      this.currentTrialIndex += 1
      return { ok: true }
    },
    reset() {
      this.currentTrialIndex = 0
      this.unlockedPieces = []
    },
    jumpTo(index: number) {
      const clamped = Math.max(0, Math.min(this.trials.length, index))
      this.currentTrialIndex = clamped
      this.unlockedPieces = this.trials.slice(0, clamped).map(t => t.id)
    },
  },
  persist: {
    key: 'nubilato-puzzle',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    paths: ['currentTrialIndex', 'unlockedPieces'],
  },
})
