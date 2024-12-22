export default defineTask({
  meta: {
    name: 'scout:linkedin',
    description: 'Run Linkedin Scout',
  },
  async run({ payload, context }) {
    console.info('Running Linkedin Scout task...')
    try {
      const { category, companyName, search, limit } = payload as {
        category?: string
        companyName?: string
        search?: string
        limit?: number
      }

      const LINKEDIN_BASE_URL = ''

      console.info('Success Linkedin Scout task')
      return { status: 'success', result: '' }
    } catch (error) {
      console.error('Failed Linkedin Scout task', error)
      return { status: 'failed' }
    }
  },
})
