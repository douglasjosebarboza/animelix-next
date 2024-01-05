'use client'
import Image from 'next/image'
import Header from '@/components/header'
import Loading from '../../components/loading'
import { Button } from '@/components/ui/button'
import { getAnime } from '@/lib/jikan'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AnimePage({ id }) {
  const [anime, setAnime] = useState([])
  const { register, handleSubmit } = useForm()
  const session = useSession()
  const router = useRouter()

  const onSubmit = async (episodes) => {
    const userEmail = session.data.user.email
    const episode = episodes.episode
    const request = await fetch('/api/animes', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        animeId: anime.mal_id,
        episode,
        userEmail,
      }),
    })
    router.push('/user')
  }

  useEffect(() => {
    fetchAnime()
  }, [])

  async function fetchAnime() {
    setAnime([])
    const data = await getAnime(id)
    setAnime(data.data)
  }

  if (anime.length === 0) return <Loading />
  else {
    const paragraphs = anime.synopsis.split('\n\n')
    const episodeOptions = []
    for (let i = 1; i <= anime.episodes; i++) {
      episodeOptions.push(i)
    }
    return (
      <>
        <Header inputCondition={false} />
        <main className="flex h-[calc(100vh - 4rem)] pt-32 justify-center items-center">
          <div className="flex flex-row rounded-3xl w-4/5 h-fit bg-blue-500 overflow-hidden shadow-2xl">
            <div>
              <Image
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                width={400}
                height={400}
                priority
              />
            </div>
            <div className="flex flex-col items-center justify-center w-full text-white">
              <div className="w-full text-center">
                <h1 className="text-xl md:text-3xl [text-shadow:_0_0_7px_black] font-bold px-3 mb-10 max-h-[112px] md:mb-0">
                  {anime.title}
                </h1>
                <div className="flex flex-row justify-between">
                  <div className="hidden lg:flex flex-col px-8 my-10 gap-2">
                    <div className="flex flex-row gap-4">
                      <p>{anime.year}</p>
                      <p>{anime.score}</p>
                    </div>
                    <ul className="flex flex-row gap-4">
                      {anime.genres.map((gender) => {
                        return <li key={gender.mal_id}>{gender.name}</li>
                      })}
                    </ul>
                  </div>
                  <div className="flex flex-col justify-center items-center m-auto w-9/12 lg:mr-10 lg:m-0 lg:w-auto">
                    <form
                      className="flex flex-col gap-4"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <select
                        className="w-full bg-white p-2 rounded-md font-semibold text-pink-600 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-600 scrolling"
                        defaultValue={'0'}
                        {...register('episode')}
                      >
                        <option value={'0'} disabled className="hidden">
                          Selecione o ultimo episódio visto
                        </option>
                        {episodeOptions.map((episode) => (
                          <option
                            className="options"
                            key={episode}
                            value={episode.toString()}
                          >
                            {episode}
                          </option>
                        ))}
                      </select>
                      <Button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                      >
                        Enviar
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="hidden md:block mt-3 w-full h-32 overflow-y-auto scrolling lg:h-44">
                {paragraphs.map((paragraph, index) => (
                  <p className="text-lg px-8" key={index}>
                    {paragraph}
                    <br />
                  </p>
                ))}
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }
}
