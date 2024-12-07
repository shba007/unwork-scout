export default function (params: { [s: string]: any }) {
  const searchParams = new URLSearchParams(params)
  return searchParams.toString()
}
