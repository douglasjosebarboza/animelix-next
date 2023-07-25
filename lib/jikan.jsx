function delay() {
  return new Promise(resolve => setTimeout(resolve, 5))
}

export async function getSeasonNow(page) {
  const data = await fetch(`https://api.jikan.moe/v4/seasons/now?page=${page}&sfw`)
  await delay()
  return await data.json()
}

export async function getSearching(search, page) {
  const data = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&page=${page}&sfw`)
  await delay()
  return await data.json()
}

export async function getAnime(id) {
  const data = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`)
  await delay()
  return await data.json()
}