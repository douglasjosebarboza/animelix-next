'use client'
import { SearchContext } from "@/context/SearchContext"
import { useState, useEffect, useContext } from "react"
import { getSearching, getSeasonNow } from "@/lib/jikan"
import Pagination from "../../components/pagination"
import Loading from "../../components/loading"
import CardAnime from "@/components/cardAnime"
import Header from "@/components/header"


export default function HomePage(){
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [maxPages, setMaxPages] = useState(1)
  const [animes, setAnimes] = useState([])

  const { searching } = useContext(SearchContext)

  useEffect(() => {
    fetchAnimes()
  }, [page, searching])

  async function fetchAnimes(){
    setIsLoading(true)
    let data = null
    if(!searching)
      data = await getSeasonNow(page)
    else
      data = await getSearching(searching, page)
    setAnimes([])
    setAnimes(data.data)
    setMaxPages(data.pagination.last_visible_page)
    setIsLoading(false)
  }

  if(isLoading)
    return <Loading />
  
  return(
    <>
      <Header
        inputCondition={true}
      />
      <main className="flex h-screen justify-center pt-10">
        <div className="flex flex-col mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 my-14 gap-4">
              {animes.map((anime, index) => {
                return (
                  <CardAnime
                  key = {anime.mal_id + (index + 1)}
                  id = {anime.mal_id}
                  data = {anime}
                  indexList = {index}
                  />
                )
              })}
          </div>
          {!isLoading && <Pagination
            page={page}
            maxPages={maxPages}
            pageChange={setPage}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />}
        </div>
      </main>
    </> 
  )
}