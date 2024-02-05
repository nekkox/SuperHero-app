import { md5 } from 'js-md5'

const publicKey = import.meta.env.VITE_APP_MARVEL_API_PUBLIC
const privateKey = import.meta.env.VITE_APP_MARVEL_API_PRIVATE
const MARVEL_API_URL = 'https://gateway.marvel.com/v1/public'
const ITEMS_PER_PAGE = 20
const API_SIGN = Api_Sign()

//Construct Authentication credentials
function Api_Sign() {
  const ts = Date.now()
  const params = new URLSearchParams({
    ts: ts,
    apikey: publicKey,
    hash: md5(ts + privateKey + publicKey)
  })
  return `${params}`
}

//Construct request url
export async function useMarvelAPI(path, options = {}) {
  const pagination = getPagination(options.page)
  const query = getQuery(options.query)

  const requestURI = getRequestUri(path, query, pagination)

  return useFetch(requestURI)
}

export async function useFetch(requestURI) {
  const res = await fetch(requestURI)
  if (!res.ok) {
    throw new Error('Data fetch error')
  }
  const jsonRes = await res.json()
  return jsonRes.data
}

function getPagination(page) {
  let offsetx = page * ITEMS_PER_PAGE - 20
  return page ? `&offset=${offsetx}` : ''
}

function getQuery(query) {
  return query ? `&${query}` : ''
}

function getRequestUri(path, pagination, query) {
  const apiPath = `${MARVEL_API_URL}/${path}`
  return `${apiPath}?${API_SIGN}${query}${pagination}`
}

//Main function for fetch comics data
export const useComics = async (page = 0) => {
  try {
    return await useMarvelAPI('comics', { page: page, query: '' })
  } catch {
    throw new Error('An error occurred while trying to read comics')
  }
}

export async function useCharacterSearch(query, page = 0) {
  try {
    return await useMarvelAPI('characters', { page: page, query: `nameStartsWith=${query}` })
  } catch {
    throw new Error('An error occurred while trying to read searched characters')
  }
}
