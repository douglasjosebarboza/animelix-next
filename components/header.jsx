'use client'

import { useContext } from 'react'
import { SearchContext } from '@/context/SearchContext'
import { Input } from './ui/input'
import Link from 'next/link'

export default function Header({ inputCondition }) {
  const { handleKeyPress } = useContext(SearchContext)
  return (
    <header className="fixed z-50 flex h-16 w-full items-center justify-evenly bg-blue-500 shadow-lg">
      <Link
        className="select-none text-4xl font-bold text-white transition duration-500 ease-in-out [text-shadow:_0_0_7px_black] hover:scale-105"
        href={'/'}
        onClick={handleKeyPress}
      >
        <span className="text-pink-500">A</span>nime
        <span className="text-fuchsia-600">L</span>ix
      </Link>
      {inputCondition && (
        <Input
          className="block w-1/4 rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm transition duration-500 ease-in-out placeholder:text-gray-400 hover:scale-105 focus:scale-105 focus-visible:outline-pink-500 focus-visible:ring-0 sm:text-sm sm:leading-6"
          type="text"
          name="search"
          placeholder="Digite o nome de um anime para pesquisar"
          onKeyPress={handleKeyPress}
        />
      )}

      <Link
        className="rounded-full bg-pink-500 p-2 px-4 font-bold text-white transition duration-500 ease-in-out hover:scale-105 hover:bg-fuchsia-600"
        href={`/user`}
      >
        Meu perfil
      </Link>
    </header>
  )
}
