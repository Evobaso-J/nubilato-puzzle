import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia as { use: (plugin: unknown) => void } | undefined
  if (pinia) {
    pinia.use(piniaPluginPersistedstate)
  }
})
