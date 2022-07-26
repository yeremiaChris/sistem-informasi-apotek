export default {
  // ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "sistem-informasi-apotek",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/axios.js",
    "@/plugins/directives.js",
    { src: "@/plugins/vue-html2pdf", mode: "client" },
    { src: "@/plugins/line-chart", mode: "client" },
    // ...
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/dayjs",
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_BASE_URL || "http://localhost:4000/api", // Used as fallback if no runtime config is provided
  },

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    axios: {
      baseURL: process.env.API_BASE_URL || "http://localhost:4000/api",
    },
    imageURL: process.env.IMAGE_BASE_URL,
  },

  dayjs: {
    locales: ["en", "ja"],
    defaultLocale: "en",
    defaultTimeZone: "Asia/Tokyo",
    plugins: [
      "utc", // import 'dayjs/plugin/utc'
      "timezone", // import 'dayjs/plugin/timezone'
    ], // Your Day.js plugin
  },

  htmlToPdfOptions: {
    margin: 0,

    filename: `laporan.pdf`,

    image: {
      type: "jpeg",
      quality: 0.98,
    },

    enableLinks: false,

    html2canvas: {
      scale: 1,
      useCORS: true,
    },

    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait",
    },
  },

  auth: {
    redirect: {
      login: "/login",
      logout: "/login",
      callback: false,
      home: "/obat/list",
    },
    strategies: {
      local: {
        token: {
          property: "token",
          global: true,
          maxAge: false,
          // required: true,
          // type: 'Bearer'
        },
        user: false,
        endpoints: {
          login: { url: "/auth/login", method: "post" },
          refresh: false,
          user: false,
        },
      },
    },
  },
  router: {
    middleware: "auth",
  },
};
