import { defineStore } from 'pinia'
import trialsData from '~/data/trials.json'
import type { Trial } from '~/types/trial'

const TOTAL_PIECES = 15

function pickRandomLockedPiece(unlocked: number[], total: number): number {
  const unlockedSet = new Set(unlocked)
  const locked: number[] = []
  for (let i = 1; i <= total; i++) {
    if (!unlockedSet.has(i)) locked.push(i)
  }
  if (locked.length === 0) return -1
  return locked[Math.floor(Math.random() * locked.length)]!
}

function randomSample(total: number, count: number): number[] {
  const pool = Array.from({ length: total }, (_, i) => i + 1)
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j]!, pool[i]!]
  }
  return pool.slice(0, count)
}

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
      const piece = pickRandomLockedPiece(this.unlockedPieces, TOTAL_PIECES)
      if (piece === -1) return { ok: false }
      this.unlockedPieces.push(piece)
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
      this.unlockedPieces = randomSample(TOTAL_PIECES, Math.min(clamped, TOTAL_PIECES))
    },
  },
  persist: {
    key: 'nubilato-puzzle',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    paths: ['currentTrialIndex', 'unlockedPieces'],
  },
})
