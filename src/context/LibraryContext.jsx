import { createContext, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

// Global State: daftar favorit & ulasan (disimpan di localStorage)
const LibraryContext = createContext(null)

export function LibraryProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('kb-favorites', [])
  const [reviews, setReviews] = useLocalStorage('kb-reviews', {})

  const value = useMemo(() => {
    const isFavorite = (id) => favorites.some((b) => b.id === id)

    const toggleFavorite = (book) => {
      setFavorites((prev) =>
        prev.some((b) => b.id === book.id) ? prev.filter((b) => b.id !== book.id) : [...prev, book]
      )
    }

    const addReview = (bookId, review) => {
      setReviews((prev) => ({
        ...prev,
        [bookId]: [{ id: Date.now(), date: new Date().toISOString(), ...review }, ...(prev[bookId] || [])],
      }))
    }

    const removeReview = (bookId, reviewId) => {
      setReviews((prev) => ({
        ...prev,
        [bookId]: (prev[bookId] || []).filter((r) => r.id !== reviewId),
      }))
    }

    const getReviews = (bookId) => reviews[bookId] || []

    return { favorites, isFavorite, toggleFavorite, addReview, removeReview, getReviews }
  }, [favorites, reviews, setFavorites, setReviews])

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
}

export function useLibrary() {
  const ctx = useContext(LibraryContext)
  if (!ctx) throw new Error('useLibrary harus dipakai di dalam LibraryProvider')
  return ctx
}
