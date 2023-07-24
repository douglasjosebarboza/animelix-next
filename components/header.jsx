"use client"

import { useContext } from "react"
import { SearchContext } from "@/context/SearchContext"
import { Input } from "./ui/input"
import Link from "next/link"

export default function Header( { inputCondition }) {
  const { handleKeyPress } = useContext(SearchContext)
  return (
    <header className="bg-blue-500 w-full h-16 flex justify-evenly items-center fixed shadow-lg z-50">
      <Link className="text-4xl font-bold [text-shadow:_0_0_7px_black] text-white transition duration-500 ease-in-out hover:scale-105 select-none" href={'/'} onClick={handleKeyPress}>
        <span className="text-pink-500">A</span>nime<span className="text-fuchsia-600">L</span>ix
      </Link>
      { inputCondition && 
        <Input 
          className="transition duration-500 ease-in-out hover:scale-105 focus:scale-105 block w-1/4 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-pink-500 focus-visible:ring-0 sm:text-sm sm:leading-6" 
          type="text" 
          name="search" 
          placeholder="Digite o nome de um anime para pesquisar" 
          onKeyPress={handleKeyPress}
        />
      }

      <Link className="bg-pink-500 text-white font-bold rounded-full p-2 px-4 transition duration-500 ease-in-out hover:scale-105 hover:bg-fuchsia-600" href={`/user`}>
        Meu perfil
      </Link>
      
    </header>
  )
}