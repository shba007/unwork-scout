import promisePool from '~/utils/promise-pool'
import prisma from '~~/lib/prisma'

interface REMOTIVE_API_JOB_RESPONSE {
  'job-count': number
  jobs: {
    id: number
    url: string
    title: string
    company_name: string
    company_logo: string
    category: string
    job_type: string
    publication_date: string
    candidate_required_location: string
    salary: string
    description: string
  }[]
}

interface REMOTIVE_API_CATEGORY_RESPONSE {
  'job-count': number
  jobs: {
    id: number
    name: string
    slug: string
  }[]
}

export default defineTask({
  meta: {
    name: 'scout:remotive',
    description: 'Run Remotive Scout',
  },
  async run({ payload, context }) {
    console.info('Running Remotive Scout task...')
    try {
      const { category, companyName, search, limit } = payload as {
        category?: string
        companyName?: string
        search?: string
        limit?: number
      }

      const REMOTIVE_BASE_URL = 'https://remotive.com'
      const response = await $fetch<REMOTIVE_API_JOB_RESPONSE>(`${REMOTIVE_BASE_URL}/api/remote-jobs`, {
        query: trimUndefinedFields({
          category,
          company_name: companyName,
          search,
          limit,
        }),
      })

      const result = (await promisePool(response.jobs.map(({ id, url, category, candidate_required_location, job_type, salary, title, company_name, company_logo, description, publication_date }) => {
        return () => prisma.job.upsert({
          create: {
            source: 'REMOTIVE',
            sourceId: `${id}`,
            category,
            candidateRequiredLocation: candidate_required_location,
            jobType: job_type,
            salary,
            title,
            companyName: company_name,
            companyLogo: company_logo,
            description,
            url,
            createdAt: new Date(publication_date),
          },
          update: {
            category,
            candidateRequiredLocation: candidate_required_location,
            jobType: job_type,
            salary,
            title,
            companyName: company_name,
            companyLogo: company_logo,
            description,
            url,
          },
          where: {
            source_sourceId: {
              source: 'REMOTIVE',
              sourceId: `${id}`,
            },
          },
        })
      }))).filter(({ status }) => status === 'fullfilled').map(({ value }) => value)

      console.info('Success Remotive Scout task')
      return {
        status: 'success',
        result: result.map(({ id, createdAt, title, candidateRequiredLocation }) => ({
          id,
          publishedAgo: formatTime(createdAt),
          title,
          candidateRequiredLocation,
        })),
      }
    } catch (error) {
      console.error('Failed Remotive Scout task', error)
      return { status: 'failed', }
    }
  },
})
