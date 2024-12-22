export default defineTask({
  meta: {
    name: 'scout:wwr',
    description: 'Run We Work Remotely Scout',
  },
  async run({ payload, context }) {
    console.info('Running We Work Remotely Scout task...')
    try {
      const { category, companyName, search, limit } = payload as {
        category?: string
        companyName?: string
        search?: string
        limit?: number
      }
      const WWR_BASE_URL = 'https://we-work-remotely-staging.herokuapp.com/api/v1/remote-jobs'

      console.info('Success We Work Remotely Scout task')
      return { status: 'success', result: '' }
    } catch (error) {
      console.error('Failed We Work Remotely Scout task', error)
      return { status: 'failed' }
    }
  },
})
