export default {
  server: {
    port: process.env.APP_PORT || 3000,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'DBS Manage Account',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-svg', href: '/favicon.svg' }],
  },

  loading: {
    color: '#090909',
    continuous: true,
    duration: 2000,
    throttle: 0,
  },

  layoutTransition: {
    name: 'layout',
    mode: 'out-in',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources',
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  styleResources: {
    scss: [],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/postcss8',
    [
      'nuxt-vue-material',
      {
        theme: 'default',
      },
    ],
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        // eslint-disable-next-line no-param-reassign
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map';
      }
    },

    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      ],
    },

    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  vue: {
    config: {
      productionTip: false,
      devtools: process.env.NODE_ENV === 'development' || process.env.DEBUG,
    },
  },
};
