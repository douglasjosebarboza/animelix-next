import { db } from "@/lib/db"
import { NextResponse } from "next/server";

export async function POST(request){
  const data = await request.json()
  const { userEmail } = data

  const user = await db.user.findUnique({
    where: {
      email: userEmail
    }
  })

  const animes = await db.anime.findMany({
    where: {
      userId: {
        has: user.id
      }
    }
  })

  console.log(animes)

  return NextResponse.json(animes)
}