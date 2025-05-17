import prisma from '~~/server/utils/prisma'

export default defineTask({
  meta: {
    name: 'filter',
    description: 'Run Filter',
  },
  async run({ payload, context }) {
    console.log('Running Filter task...')

    const { category, location, daysAgo, sortBy } = payload as {
      category?: string
      location?: string
      daysAgo?: number
      sortBy?: string
    }

    // Apply filters
    const cutoffDate = daysAgo ? new Date(new Date().setDate(new Date().getDate() - daysAgo)) : undefined

    const filteredJobs = await prisma.job.findMany({
      where: {
        candidateRequiredLocation: location ? { contains: location, mode: 'insensitive' } : undefined,
        createdAt: cutoffDate
          ? { gte: cutoffDate } // Filters jobs created on or after the cutoff date
          : undefined,
        category: category
          ? { contains: category, mode: 'insensitive' } // Case-insensitive filter for category
          : undefined,
      },
      orderBy:
        sortBy === 'recency'
          ? { createdAt: 'desc' } // Sort by recency (newest first)
          : sortBy === 'title'
            ? { title: 'asc' } // Sort by title alphabetically
            : undefined, // No sorting if sortBy is not provided
    })

    return {
      result: filteredJobs.map(({ description, id, category, candidateRequiredLocation, title, companyName, jobType, createdAt, updatedAt, ...rest }) => ({
        id,
        category,
        candidateRequiredLocation,
        title,
        companyName,
        jobType,
        createdAt: formatTime(createdAt),
        updatedAt: formatTime(updatedAt),
      })),
    }
  },
})
