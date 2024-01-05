import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const data = await request.json()
  const { userEmail, animeId, episode } = data
  let anime = null

  let user = await db.user.findUnique({
    where: {
      email: userEmail,
    },
  })

  const idFetch = user.id + animeId

  const userWatchAnime = await db.user.findMany({
    where: {
      animeId: {
        has: idFetch,
      },
    },
  })

  if (userWatchAnime.length > 0) {
    anime = await db.anime.update({
      where: {
        idFetch,
      },
      data: {
        episodes: episode,
        userId: {
          push: user.id,
        },
      },
    })
  } else {
    anime = await db.anime.create({
      data: {
        idFetch,
        malId: animeId.toString(),
        episodes: episode,
        userId: [user.id],
      },
    })

    user = await db.user.update({
      where: {
        email: userEmail,
      },
      data: {
        animeId: {
          push: idFetch,
        },
      },
    })
  }

  return NextResponse.json(anime)
}
