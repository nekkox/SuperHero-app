import { md5 } from 'js-md5'

const publicKey = import.meta.env.VITE_APP_MARVEL_API_PUBLIC
const privateKey = import.meta.env.VITE_APP_MARVEL_API_PRIVATE
const MARVEL_API_URL = 'https://gateway.marvel.com/v1/public'

function createURL() {
  const ts = Date.now()
  const params = new URLSearchParams({
    ts: ts,
    apikey: publicKey,
    hash: md5(ts + privateKey + publicKey)
  })
  const endpoint = `${MARVEL_API_URL}/characters?`
  const url = endpoint + params

  // Return the complete API request URL
  return url
}

export const useComics = async () => {
  const res = await fetch(createURL())
  const jsonRes = await res.json()
  return jsonRes.data
}
