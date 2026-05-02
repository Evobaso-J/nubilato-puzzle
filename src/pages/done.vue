<script setup lang="ts">
import confetti from 'canvas-confetti'

const puzzleStore = usePuzzleStore()
const router = useRouter()

if (import.meta.client && !puzzleStore.isComplete) {
  router.replace('/')
}

onMounted(() => {
  fireConfetti()
})

function fireConfetti() {
  const duration = 2500
  const end = Date.now() + duration

  const tick = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#ec4899', '#fbbf24', '#a78bfa', '#f472b6'],
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#ec4899', '#fbbf24', '#a78bfa', '#f472b6'],
    })
    if (Date.now() < end) requestAnimationFrame(tick)
  }
  tick()

  confetti({
    particleCount: 120,
    spread: 90,
    origin: { y: 0.5 },
  })
}
</script>

<template>
  <main class="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-between px-4 py-8">
    <header class="text-center">
      <p class="text-xs uppercase tracking-[0.3em] text-celebration-gold">
        Mission complete
      </p>
      <h1 class="mt-2 text-4xl font-extrabold text-violet-50">
        You did it!
      </h1>
      <p class="mt-2 text-base text-violet-200">
        All 15 trials cleared. Here's your picture.
      </p>
    </header>

    <div class="my-6 w-full overflow-hidden rounded-2xl shadow-2xl shadow-pink-900/40 ring-2 ring-celebration-gold/50">
      <img
        src="/nubilato.jpeg"
        alt="Bachelorette reward"
        class="h-auto w-full"
      >
    </div>

    <footer class="w-full">
      <a
        href="/nubilato.jpeg"
        download="addio-al-celibato.jpg"
        class="block w-full rounded-2xl bg-celebration-accent py-4 text-center text-lg font-bold text-white shadow-lg shadow-pink-900/40 transition-transform active:scale-[0.98]"
      >
        Download picture
      </a>
    </footer>
  </main>
</template>
