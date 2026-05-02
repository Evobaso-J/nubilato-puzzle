<script setup lang="ts">
const puzzleStore = usePuzzleStore()
const router = useRouter()

const sheetOpen = ref(false)

watch(
  () => puzzleStore.isComplete,
  (done) => {
    if (done) {
      setTimeout(() => router.push('/done'), 600)
    }
  },
)

function openSheet() {
  if (puzzleStore.isComplete) {
    router.push('/done')
    return
  }
  sheetOpen.value = true
}

function onSolved() {
  sheetOpen.value = false
}
</script>

<template>
  <main class="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-6">
    <header class="mb-4 text-center">
      <p class="text-xs uppercase tracking-[0.3em] text-violet-400">
        Bachelorette
      </p>
      <h1 class="text-2xl font-bold text-violet-50">
        Nubilato Puzzle
      </h1>
      <p class="mt-1 text-sm text-violet-300">
        {{ puzzleStore.progress }} / 15 pieces unlocked
      </p>
    </header>

    <section class="flex-1">
      <PuzzleGrid
        :cols="5"
        :rows="3"
        :unlocked-pieces="puzzleStore.unlockedPieces"
      />
    </section>

    <footer class="mt-6 pb-2">
      <button
        type="button"
        class="w-full rounded-2xl bg-celebration-accent py-4 text-lg font-bold text-white shadow-lg shadow-pink-900/40 transition-transform active:scale-[0.98]"
        @click="openSheet"
      >
        {{ puzzleStore.isComplete ? 'See your reward' : 'Next trial' }}
      </button>
    </footer>

    <TrialSheet
      :open="sheetOpen"
      :trial="puzzleStore.currentTrial"
      :trial-number="puzzleStore.currentTrialIndex + 1"
      :total-trials="15"
      @close="sheetOpen = false"
      @solved="onSolved"
    />
  </main>
</template>
