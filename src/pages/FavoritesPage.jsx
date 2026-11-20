import { Link } from 'react-router-dom'
import BookCard from '../components/BookCard'
import EmptyState from '../components/EmptyState'
import { useLibrary } from '../context/LibraryContext'

export default function FavoritesPage() {
  const { favorites } = useLibrary()

  return (
    <>
      <h1 className="page-title">Buku Favorit</h1>
      {favorites.length === 0 ? (
        <EmptyState title="Belum ada favorit" message="Klik ikon bintang pada buku untuk menyimpannya di sini.">
          <Link to="/buku" className="btn">Jelajahi Katalog</Link>
        </EmptyState>
      ) : (
        <div className="grid">
          {favorites.map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      )}
    </>
  )
}
