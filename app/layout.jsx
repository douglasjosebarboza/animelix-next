import AuthProvider from '@/components/authProvider'
import { SearchProvider } from "@/context/SearchContext"
import './globals.css'
import localFont from 'next/font/local'

const nunito = localFont({
  src: [
    {
      path: '../public/fonts/Nunito/Nunito-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Nunito/Nunito-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/Nunito/Nunito-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Nunito/Nunito-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
})

export const metadata = {
  title: 'AnimeLix',
  description: 'Seu histórico de animes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={nunito.className} >
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
