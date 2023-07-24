import HomePage from "@/pagesDin/home/homePage"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function Home() {
  const user = await getCurrentUser()
  if(!user)
    redirect("/login")
	return (
    <HomePage />
	)
}
