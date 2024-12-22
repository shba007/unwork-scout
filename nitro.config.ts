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
    '1-59/2 * * * *': ['scout:remotive'],
    '0-58/2 * * * *': ['scout:naukri'],
  },
})
