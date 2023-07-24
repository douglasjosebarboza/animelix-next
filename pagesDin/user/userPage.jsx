'use client'

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { getAnime } from "@/lib/jikan"
import Loading from "../../components/loading"


export default function UserPage() {
  const [ animes, setAnimes] = useState([])
  const [ episodes, setEpisodes] = useState([])
  const [ isLoading, setIsLoading ] = useState(true);
  const session = useSession()

  useEffect(() => {
    if(session.status === 'authenticated') {
      fetchAnime()
    }
  }, [session])

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function fetchAnime() {
    setIsLoading(true)
    const userEmail = session.data.user.email
    const request = await fetch("/api/userAnimes", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        userEmail: userEmail
      })
    })
    const animesReq = await request.json()
    let episodesArray = []
    let animesArray = []
    for (let i = 0; i < animesReq.length; i++) {
      const delayTime = 1000
      const anime = await getAnime(animesReq[i].malId)
      animesArray.push(anime)
      episodesArray.push(animesReq[i].episodes)
      await delay(delayTime)
    }
    setAnimes(animesArray)
    setEpisodes(episodesArray)
    setIsLoading(false)
  }

  if(isLoading)
    return <Loading />
  return (
    <div className="flex flex-col items-center pt-20">
      <div>
        <p className="text-white text-3xl [text-shadow:_0_0_7px_black] font-bold my-5">Seu histórico de animes</p>
      </div>
      <div className="flex flex-col gap-4 mb-4">
        {animes.map((anime, index) => (
          <Link key={index} className="transition ease-in-out duration-100 hover:scale-105" href={`/anime/${anime.data.mal_id}`}>
            <div className="flex items-center gap-4 bg-blue-500 rounded-xl overflow-hidden w-full pr-4 shadow-2xl">
              <div>
                <Image
                  src={anime.data.images.jpg.large_image_url}
                  alt={anime.data.title}
                  width={200}
                  height={200}
                  priority
                />
              </div>
              <div className="w-full">
                <div>
                  <h1 className="text-center text-white text-xl [text-shadow:_0_0_7px_black] font-bold mb-8">{anime.data.title}</h1>
                  <div className="text-white">
                    <p><strong>Status de lançamento:</strong> {anime.data.status}</p>
                    <p><strong>Dia:</strong> {anime.data.broadcast.day}</p>
                    <p><strong>Hora:</strong> {anime.data.broadcast.time} JPT</p>
                    <p><strong>Ultimo episódio visto:</strong> {episodes[index]}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
)}