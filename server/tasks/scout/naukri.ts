import prisma from '~~/server/utils/prisma'

interface NAUKRI_API_JOB_RESPONSE {
  noOfJobs: number
  clusters: {
    [key: string]: {
      id: string
      count: number
      label: string
    }[]
  }
  jobDetails: {
    title: string
    logoPath: string
    logoPathV3: string
    jobId: string
    currency: Currency
    footerPlaceholderLabel: FooterPlaceholderLabel
    footerPlaceholderColor: FooterPlaceholderColor
    companyName: string
    isSaved: boolean
    tagsAndSkills: string
    placeholders: {
      type: Type
      label: string
    }[]
    companyId: number
    jdURL: string
    staticUrl: string
    ambitionBoxData?: {
      Url: string
      ReviewsCount: number
      AggregateRating: string
      Title: string
    }
    jobDescription: string
    showMultipleApply: boolean
    groupId: number
    isTopGroup: number
    createdDate: number
    mode: Mode
    board: string
  }[]
  fatFooter: {
    tab: string
    highlight: boolean
    urlSet: {
      text: string
      url: string
    }[]
  }[]
  suggesterModel: {
    qparams: {
      pFarea: number
    }
  }
  seo: {
    title: string
    descp: string
  }
  bellyFilters: {
    positions: number[]
    order: string[]
  }
  sid: string
  isLoggedIn: boolean
  variantName: string
  clusterOrder: string[]
  internshipSRP: boolean
}

enum Currency {
  Inr = 'INR',
}

enum FooterPlaceholderColor {
  Grey = 'grey',
}

enum FooterPlaceholderLabel {
  The22DaysAgo = '22 Days Ago',
  The30DaysAgo = '30+ Days Ago',
  The3DaysAgo = '3 Days Ago',
}

enum Mode {
  Crawled = 'crawled',
}

enum Type {
  Experience = 'experience',
  Location = 'location',
  Salary = 'salary',
}

export default defineTask({
  meta: {
    name: 'scout:naukri',
    description: 'Run Naukri Scout',
  },
  async run({ payload, context }) {
    console.info('Running Naukri Scout task...')
    try {
      const { category, companyName, search, limit } = payload as {
        category?: string
        companyName?: string
        search?: string
        limit?: number
      }

      const NAUKRI_BASE_URL = 'https://www.naukri.com'
      const BEARER_TOKEN = process.env.NAUKRI_JWT_TOKEN

      const response = await $fetch<NAUKRI_API_JOB_RESPONSE>(`${NAUKRI_BASE_URL}/jobapi/v3/search`, {
        query: {
          noOfResults: limit ?? 100,
          urlType: 'search_by_key_loc',
          searchType: 'adv',
          location: 'Kolkata',
          keyword: 'project manager',
          pageNo: 1,
          // experience: 1,
        },
        headers: {
          'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
          Authorization: `Bearer ${BEARER_TOKEN}`,
          appid: '109',
          systemid: 'Naukri',
        },
      })

      const result = (
        await promisePool(
          response.jobDetails.map(({ jobId, title, logoPath, companyName, jobDescription, jdURL, createdDate }) => {
            return () =>
              prisma.job.upsert({
                create: {
                  source: 'NAUKRI',
                  sourceId: `${jobId}`,
                  category: 'Project Management',
                  candidateRequiredLocation: 'Kolkata',
                  jobType: 'fulltime',
                  salary: 'null',
                  title,
                  companyName,
                  companyLogo: logoPath,
                  description: jobDescription,
                  url: `${NAUKRI_BASE_URL}${jdURL}`,
                  createdAt: new Date(createdDate),
                },
                update: {
                  category,
                  candidateRequiredLocation: 'Kolkata',
                  jobType: 'fulltime',
                  salary: 'null',
                  title,
                  companyName,
                  companyLogo: logoPath,
                  description: jobDescription,
                  url: `${NAUKRI_BASE_URL}${jdURL}`,
                },
                where: {
                  source_sourceId: {
                    source: 'NAUKRI',
                    sourceId: `${jobId}`,
                  },
                },
              })
          })
        )
      )
        .filter(({ status }) => status === 'fullfilled')
        .map(({ value }) => value)

      console.info('Success Naukri Scout task')
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
      console.error('Failed Naukri Scout task', error)
      return { status: 'failed' }
    }
  },
})
