'use client'

import { createContext, useState } from 'react'

export const SearchContext = createContext()

export function SearchProvider({ children }) {
  const [searching, setSearching] = useState('')

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setSearching(event.target.value)
      event.target.value = ''
    }
    if (event.type === 'click') setSearching(event.target.value)
  }

  return (
    <SearchContext.Provider value={{ searching, handleKeyPress }}>
      {children}
    </SearchContext.Provider>
  )
}
