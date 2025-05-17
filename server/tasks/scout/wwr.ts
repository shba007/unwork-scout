import puppeteer from 'puppeteer'
import prisma from '~~/server/utils/prisma'

export default defineTask({
  meta: {
    name: 'scout:wwr',
    description: 'Run We Work Remotely Scout',
  },
  async run({ payload, context }): Promise<{
    status: 'success' | 'failed'
    results?: any
  }> {
    console.info('Running We Work Remotely Scout task...')
    const browser =
      import.meta.env.NODE_ENV === 'production'
        ? await puppeteer.connect({
            browserWSEndpoint: import.meta.env.BROWSER_ENDPOINT,
          })
        : await puppeteer.launch({
            headless: false,
          })

    try {
      const { category, companyName, search, limit } = payload as {
        category?: string
        companyName?: string
        search?: string
        limit?: number
      }
      const WWR_BASE_URL = 'https://weworkremotely.com/categories/remote-sales-and-marketing-jobs'
      /* --------------------------- */
      const page = await browser.newPage()
      // await page.setViewport({ width: 1080, height: 1024 })
      await page.goto(WWR_BASE_URL, { waitUntil: 'networkidle0' })

      const results = await page.evaluate(() => {
        const jobElements = document.querySelectorAll('section.jobs article ul li')
        const jobList = []

        for (const jobElement of jobElements) {
          const company = jobElement.querySelector('.company')?.textContent.trim() || null
          const title = jobElement.querySelector('.title')?.textContent.trim() || null
          const location = jobElement.querySelector('.region.company')?.textContent.trim() || null
          const link = jobElement.querySelector('a')?.href || null
          const logoStyle = jobElement.querySelector('.flag-logo')?.getAttribute('style') || ''
          const logoMatch = logoStyle.match(/url\(([^)]+)\)/)
          const logo = logoMatch ? logoMatch[1].replace(/['"]/g, '') : null

          if (company) jobList.push({ company, title, location, link, logo })
        }

        return jobList
      })
      /* --------------------------- */

      console.info('Success We Work Remotely Scout task')
      return { status: 'success', results }
    } catch (error) {
      console.error('Failed We Work Remotely Scout task', error)
      return { status: 'failed' }
    } finally {
      await browser.close()
    }
  },
})
