// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  typescript: {
    typeCheck: false,
  },

  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', '@pinia/nuxt'],

  eslint: {
    config: {
      stylistic: true,
    },
    checker: false,
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Nubilato Puzzle',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { name: 'theme-color', content: '#1a0b2e' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      link: [
        { rel: 'manifest', href: '/manifest.webmanifest' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icons/icon-192.png' },
        { rel: 'apple-touch-icon', href: '/icons/icon-192.png' },
      ],
    },
  },

  srcDir: 'src/',
  ssr: false,
  compatibilityDate: '2024-07-04',
})
