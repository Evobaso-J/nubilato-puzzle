<script setup lang="ts">
const props = defineProps<{
  index: number
  unlocked: boolean
  cols: number
  rows: number
}>()

const col = computed(() => props.index % props.cols)
const row = computed(() => Math.floor(props.index / props.cols))

const bgPosition = computed(() => {
  const x = (col.value / Math.max(props.cols - 1, 1)) * 100
  const y = (row.value / Math.max(props.rows - 1, 1)) * 100
  return `${x}% ${y}%`
})

const bgSize = computed(() => `${props.cols * 100}% ${props.rows * 100}%`)
</script>

<template>
  <div
    class="relative aspect-square overflow-hidden rounded-md transition-colors"
    :class="unlocked ? 'bg-violet-950' : 'bg-gradient-to-br from-violet-900 to-violet-950 ring-1 ring-violet-800/50'"
  >
    <Transition enter-active-class="animate-reveal-bounce">
      <div
        v-if="unlocked"
        class="absolute inset-0 bg-no-repeat"
        :style="{
          backgroundImage: `url('/nubilato.jpeg')`,
          backgroundSize: bgSize,
          backgroundPosition: bgPosition,
        }"
      />
    </Transition>
    <div
      v-if="!unlocked"
      class="absolute inset-0 flex items-center justify-center text-violet-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="h-6 w-6 opacity-60"
      >
        <path
          fill-rule="evenodd"
          d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</template>
