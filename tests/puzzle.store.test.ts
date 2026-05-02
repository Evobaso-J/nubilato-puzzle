import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePuzzleStore } from '~/stores/puzzle'

describe('puzzle store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with no unlocked pieces', () => {
    const store = usePuzzleStore()
    expect(store.unlockedPieces).toEqual([])
    expect(store.currentTrialIndex).toBe(0)
    expect(store.isComplete).toBe(false)
    expect(store.currentTrial?.id).toBe(1)
  })

  it('unlocks a piece when the correct code is submitted', () => {
    const store = usePuzzleStore()
    const first = store.trials[0]
    if (!first) throw new Error('expected first trial')
    const result = store.submitCode(first.code)
    expect(result.ok).toBe(true)
    expect(store.unlockedPieces).toEqual([1])
    expect(store.currentTrialIndex).toBe(1)
    expect(store.currentTrial?.id).toBe(2)
  })

  it('rejects an incorrect code without mutating state', () => {
    const store = usePuzzleStore()
    const result = store.submitCode('0000')
    expect(result.ok).toBe(false)
    expect(store.unlockedPieces).toEqual([])
    expect(store.currentTrialIndex).toBe(0)
  })

  it('trims whitespace before comparing', () => {
    const store = usePuzzleStore()
    const first = store.trials[0]
    if (!first) throw new Error('expected first trial')
    expect(store.submitCode(`  ${first.code}  `).ok).toBe(true)
  })

  it('marks complete after all 15 codes', () => {
    const store = usePuzzleStore()
    for (const t of store.trials) {
      expect(store.submitCode(t.code).ok).toBe(true)
    }
    expect(store.isComplete).toBe(true)
    expect(store.unlockedPieces).toHaveLength(15)
    expect(store.currentTrial).toBeNull()
  })

  it('reset returns to initial state', () => {
    const store = usePuzzleStore()
    const first = store.trials[0]
    if (!first) throw new Error('expected first trial')
    store.submitCode(first.code)
    store.reset()
    expect(store.unlockedPieces).toEqual([])
    expect(store.currentTrialIndex).toBe(0)
  })

  it('jumpTo skips ahead and unlocks prior pieces', () => {
    const store = usePuzzleStore()
    store.jumpTo(5)
    expect(store.currentTrialIndex).toBe(5)
    expect(store.unlockedPieces).toEqual([1, 2, 3, 4, 5])
  })

  it('jumpTo clamps within bounds', () => {
    const store = usePuzzleStore()
    store.jumpTo(99)
    expect(store.currentTrialIndex).toBe(15)
    expect(store.isComplete).toBe(true)
  })
})
