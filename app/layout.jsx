import AuthProvider from '@/components/authProvider'
import { SearchProvider } from "@/context/SearchContext"
import './globals.css'
import { Nunito } from 'next/font/google'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'AnimeLix',
  description: 'Seu histórico de animes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={nunito.className}>
      <body className="bg-fixed bg-gradient-to-b from-fuchsia-900 to-fuchsia-950">
        <AuthProvider>
          <SearchProvider>
            {children}
          </SearchProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
