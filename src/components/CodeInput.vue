<script setup lang="ts">
defineProps<{
  modelValue: string
  error: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'submit': []
}>()

const inputRef = ref<HTMLInputElement | null>(null)

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  const cleaned = target.value.replace(/\D/g, '').slice(0, 4)
  emit('update:modelValue', cleaned)
  if (cleaned.length === 4) {
    emit('submit')
  }
}

function focus() {
  inputRef.value?.focus()
}

defineExpose({ focus })
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <input
      ref="inputRef"
      :value="modelValue"
      inputmode="numeric"
      pattern="\d{4}"
      maxlength="4"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      placeholder="••••"
      class="w-full max-w-xs rounded-xl border-2 bg-violet-950/50 px-4 py-4 text-center text-4xl font-bold tracking-[0.5em] text-violet-50 placeholder-violet-700 outline-none transition-colors focus:border-celebration-accent"
      :class="error ? 'animate-shake border-red-500' : 'border-violet-700'"
      @input="onInput"
    >
    <p
      v-if="error"
      class="text-sm text-red-400"
    >
      Wrong code, try again
    </p>
  </div>
</template>
