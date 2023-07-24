export async function getSeasonNow(page) {
  const data = await fetch(`https://api.jikan.moe/v4/seasons/now?page=${page}&sfw`)
  return await data.json()
}

export async function getSearching(search, page) {
  const data = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&page=${page}&sfw`)
  return await data.json()
}

export async function getAnime(id) {
  const data = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`)
  return await data.json()
}