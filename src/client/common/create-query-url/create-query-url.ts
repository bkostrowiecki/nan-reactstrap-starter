export const createQueryUrl = (url: string, queryParams: any) => {
  const params = new URLSearchParams(queryParams)

  return `${url}?${params.toString()}`
}
