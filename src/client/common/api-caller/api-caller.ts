import { NextPageContext } from 'next'

export const createAbsoluteUrl = (
  relativePath: string
): string => `${process.env.NEXT_PUBLIC_API_URL?.trim()}${relativePath}`

export const fetchApi = (
  url: RequestInfo,
  init?: RequestInit
): Promise<any> => fetch(createAbsoluteUrl(url as any), {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  mode: 'cors',
  credentials: 'include',
  ...init
})

export const fetchAuthorizedApiMultipart = async (
  url: RequestInfo,
  init?: RequestInit,
  context?: NextPageContext
): Promise<any> => {
  const headers = {
    ...(init && init.headers ? init.headers : {})
  } as HeadersInit

  if (context && context.req && context.req.headers) {
    (headers as any).Cookie = context.req.headers.cookie
  }

  const response = await fetchApi(url, {
    ...init,
    headers: { ...headers },
    mode: 'cors',
    credentials: 'include'
  })

  if (process.browser && response.status === 401) {
    (window as any).location = '/'
  }

  return response
}

export const fetchAuthorizedApi = async (
  url: RequestInfo,
  init?: RequestInit,
  context?: NextPageContext
): Promise<any> => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(init && init.headers ? init.headers : {})
  } as HeadersInit

  if (context && context.req && context.req.headers) {
    (headers as any).Cookie = context.req.headers.cookie
  }

  const response = await fetchApi(url, {
    ...init,
    headers: { ...headers },
    mode: 'cors',
    credentials: 'include'
  })

  if (response.status === 401) {
    if (process.browser) {
      (window as any).location = '/'
    } else {
      // TODO: redirect server side to homepage
    }
  }

  return response
}

export const apiCaller = {
  authorizedMultipartFetch: fetchAuthorizedApiMultipart,
  fetch: fetchApi,
  authorizedFetch: fetchAuthorizedApi,
  createAbsoluteUrl
}
