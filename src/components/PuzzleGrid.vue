<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    cols?: number
    rows?: number
    unlockedPieces: number[]
  }>(),
  { cols: 5, rows: 3 },
)

const total = computed(() => props.cols * props.rows)
const unlockedSet = computed(() => new Set(props.unlockedPieces))

function isUnlocked(index: number) {
  return unlockedSet.value.has(index + 1)
}
</script>

<template>
  <div
    class="grid w-full gap-1.5"
    :style="{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }"
  >
    <PuzzlePiece
      v-for="i in total"
      :key="i"
      :index="i - 1"
      :cols="cols"
      :rows="rows"
      :unlocked="isUnlocked(i - 1)"
    />
  </div>
</template>
