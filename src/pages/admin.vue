<script setup lang="ts">
const puzzleStore = usePuzzleStore()
const jumpTarget = ref(0)

function jump() {
  puzzleStore.jumpTo(Number(jumpTarget.value) || 0)
}
</script>

<template>
  <main class="mx-auto flex min-h-screen w-full max-w-md flex-col gap-6 px-4 py-8">
    <header>
      <h1 class="text-2xl font-bold">
        Admin
      </h1>
      <p class="text-sm text-violet-300">
        Hidden controls. Do not share with the festeggiata.
      </p>
    </header>

    <section class="rounded-xl bg-violet-950/60 p-4 ring-1 ring-violet-800/50">
      <h2 class="mb-2 font-semibold">
        State
      </h2>
      <p class="text-sm text-violet-200">
        Trial index: {{ puzzleStore.currentTrialIndex }} / 15
      </p>
      <p class="text-sm text-violet-200">
        Unlocked: {{ puzzleStore.unlockedPieces.join(', ') || '—' }}
      </p>
      <p class="text-sm text-violet-200">
        Complete: {{ puzzleStore.isComplete }}
      </p>
    </section>

    <section class="rounded-xl bg-violet-950/60 p-4 ring-1 ring-violet-800/50">
      <h2 class="mb-3 font-semibold">
        Controls
      </h2>
      <div class="flex flex-col gap-3">
        <button
          type="button"
          class="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white"
          @click="puzzleStore.reset()"
        >
          Reset state
        </button>
        <div class="flex items-center gap-2">
          <input
            v-model.number="jumpTarget"
            type="number"
            min="0"
            max="15"
            class="w-24 rounded-lg border border-violet-700 bg-violet-950 px-3 py-2 text-violet-50"
          >
          <button
            type="button"
            class="flex-1 rounded-lg bg-violet-700 px-4 py-2 font-semibold text-white"
            @click="jump"
          >
            Jump to trial N
          </button>
        </div>
      </div>
    </section>

    <section class="rounded-xl bg-violet-950/60 p-4 ring-1 ring-violet-800/50">
      <h2 class="mb-3 font-semibold">
        Codes
      </h2>
      <table class="w-full text-left text-sm">
        <thead class="text-violet-400">
          <tr>
            <th class="py-1">
              #
            </th>
            <th class="py-1">
              Title
            </th>
            <th class="py-1 text-right">
              Code
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="t in puzzleStore.trials"
            :key="t.id"
            class="border-t border-violet-900"
          >
            <td class="py-2">
              {{ t.id }}
            </td>
            <td class="py-2">
              {{ t.title }}
            </td>
            <td class="py-2 text-right font-mono">
              {{ t.code }}
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <NuxtLink
      to="/"
      class="text-center text-sm text-violet-300 underline"
    >
      Back to puzzle
    </NuxtLink>
  </main>
</template>
