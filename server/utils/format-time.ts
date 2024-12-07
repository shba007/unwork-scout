import { formatDistanceToNow } from 'date-fns'

export default function (date: string | Date) {
  const dateObj = date instanceof Date ? date : new Date(date) // Convert to Date if necessary
  return formatDistanceToNow(dateObj, { addSuffix: true })
}
