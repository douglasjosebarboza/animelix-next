import AnimePage from "@/pages/anime/animePage"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function Anime({ params }) {
  const user = await getCurrentUser()
  if(!user)
    redirect("/login")

  return (
    <AnimePage 
      id={params.id}
    />
  )
}