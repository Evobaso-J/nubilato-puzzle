<script setup lang="ts">
import type { Trial } from '~/types/trial'

const props = defineProps<{
  open: boolean
  trial: Trial | null
  trialNumber: number
  totalTrials: number
}>()

const emit = defineEmits<{
  close: []
  solved: []
}>()

const code = ref('')
const error = ref(false)
const codeInputRef = ref<{ focus: () => void } | null>(null)

const puzzleStore = usePuzzleStore()

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      code.value = ''
      error.value = false
      nextTick(() => codeInputRef.value?.focus())
    }
  },
)

function trySubmit() {
  if (code.value.length !== 4) return
  const result = puzzleStore.submitCode(code.value)
  if (result.ok) {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(50)
    }
    emit('solved')
  }
  else {
    error.value = true
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.([40, 60, 40])
    }
    setTimeout(() => {
      code.value = ''
      error.value = false
      codeInputRef.value?.focus()
    }, 500)
  }
}
</script>

<template>
  <Transition
    enter-active-class="transition-transform duration-300 ease-out"
    enter-from-class="translate-y-full"
    enter-to-class="translate-y-0"
    leave-active-class="transition-transform duration-200 ease-in"
    leave-from-class="translate-y-0"
    leave-to-class="translate-y-full"
  >
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex flex-col bg-celebration-bg"
    >
      <header class="flex items-center justify-between px-5 pb-4 pt-6">
        <span class="text-sm uppercase tracking-widest text-violet-400">
          Trial {{ trialNumber }} / {{ totalTrials }}
        </span>
        <button
          type="button"
          class="rounded-full p-2 text-violet-300 hover:text-violet-100"
          aria-label="Close"
          @click="emit('close')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </header>

      <div
        v-if="trial"
        class="flex flex-1 flex-col gap-6 overflow-y-auto px-6 pb-6"
      >
        <div class="flex-1">
          <h1 class="mb-3 text-3xl font-bold leading-tight text-violet-50">
            {{ trial.title }}
          </h1>
          <p class="text-lg leading-relaxed text-violet-200">
            {{ trial.description }}
          </p>
        </div>

        <div class="flex flex-col gap-4 pb-6">
          <p class="text-center text-sm text-violet-300">
            Ask Anita for the code, then enter it below
          </p>
          <CodeInput
            ref="codeInputRef"
            v-model="code"
            :error="error"
            @submit="trySubmit"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>
