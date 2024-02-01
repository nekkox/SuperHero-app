import { md5 } from 'js-md5'

const publicKey = import.meta.env.VITE_APP_MARVEL_API_PUBLIC
const privateKey = import.meta.env.VITE_APP_MARVEL_API_PRIVATE
const MARVEL_API_URL = 'https://gateway.marvel.com/v1/public'
const ITEMS_PER_PAGE = 20
const API_SIGN = Api_Sign();

function Api_Sign() {
    const ts = Date.now()
    const params = new URLSearchParams({
      ts: ts,
      apikey: publicKey,
      hash: md5(ts + privateKey + publicKey)
    })
    return `${params}`
  }


function createURL(param) {
  const ts = Date.now()
  const params = new URLSearchParams({
    ts: ts,
    apikey: publicKey,
    hash: md5(ts + privateKey + publicKey)
  })
  const endpoint = `${MARVEL_API_URL}/${param}?`
  const url = endpoint + params

  // Return the complete API request URL
  return url
}

export const useComics = async (page = 1) => {
  const param = 'comics'
  const pagination = page ? `&offset=${page * ITEMS_PER_PAGE}` : ''
  const res = await fetch(createURL(param) + pagination)
  const jsonRes = await res.json()
  console.log(jsonRes)

  const res2 = await fetch(getRequestUri('comics','', getPagination(4)))
  console.log(res2)
  console.log(Api_Sign());
  console.log(API_SIGN);
  return jsonRes.data
}

function getPagination(page) {
  return page ? `&offset=${page * ITEMS_PER_PAGE}` : ''
}

function getQuery(query) {
  return query ? `&${query}` : ''
}

function getRequestUri(path, pagination, query) {

  const apiPath = `${MARVEL_API_URL}/${path}`
  return `${apiPath}?${API_SIGN}${query}${pagination}`;

}

export async function useFetch(requestURI){
    const res = await fetch(requestURI)
    const jsonRes = await res.json();
    return jsonRes.data
}


export async function useMarvelAPI (path, options={}){
    const pagination = getPagination(options.page)
    const query = getQuery(options.query)
    const requestURI = getRequestUri(path,query, pagination)
    console.log(requestURI);
    console.log(options);
    console.log(await useFetch(requestURI));
    return useFetch(requestURI);
}


  const ApiOptions = {
    query:null,
    page: null, 
  }