import UserPage from '@/pagesDin/user/userPage'
import Header from '@/components/header'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  return (
    <>
      <Header inputCondition={false} />
      <UserPage />
    </>
  )
}
