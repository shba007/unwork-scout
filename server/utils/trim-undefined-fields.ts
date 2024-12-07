export default function (params: { [s: string]: any }) {
  return Object.fromEntries(Object.entries(params).filter(([key, value]) => value !== undefined))
}
