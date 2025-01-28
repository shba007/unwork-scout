//https://nitro.unjs.io/config
export default defineNitroConfig({
  compatibilityDate: '2024-12-05',
  srcDir: 'server',
  routeRules: {
    '/**': { cors: true, headers: { 'access-control-allow-methods': 'GET,PUT,POST,DELETE' } },
  },
  experimental: {
    tasks: true,
  },
  scheduledTasks: {
    '1-59/3 * * * *': ['scout:remotive'],
    '2-59/3 * * * *': ['scout:naukri'],
    '0-58/3 * * * *': ['scout:wwr'],
  },
})
