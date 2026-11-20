import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import BookCard from '../components/BookCard'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import useFetch from '../hooks/useFetch'
import { fetchBooks } from '../services/bookService'
import { CATEGORIES } from '../utils/constants'

export default function HomePage() {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const { data, loading, error, refetch } = useFetch(
  (signal) => fetchBooks({ query: 'bestseller', category: 'Fiction', orderBy: 'relevance', page: 1, signal }),
  []
)

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(keyword.trim() ? `/buku?q=${encodeURIComponent(keyword.trim())}` : '/buku')
  }

  const featured = data?.books.slice(0, 4) || []

  return (
    <>
      <section className="hero">
        <h1>Temukan Buku Favoritmu 📖</h1>
        <p>Jelajahi jutaan buku dari berbagai kategori, simpan favorit, dan tulis ulasanmu.</p>
        <form onSubmit={handleSubmit} className="hero-form">
          <SearchBar value={keyword} onChange={setKeyword} />
          <button type="submit" className="btn btn-white">Cari</button>
        </form>
      </section>

      <section className="section">
        <h2>Kategori Populer</h2>
        <div className="chips">
          {CATEGORIES.map((c) => (
            <Link key={c} to={`/buku?kategori=${c}`} className="chip">{c}</Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Buku Terbaru</h2>
          <Link to="/buku" className="link">Lihat semua →</Link>
        </div>
        {loading && <Loader />}
        {error && <ErrorMessage message={error} onRetry={refetch} />}
        {!loading && !error && featured.length === 0 && <EmptyState message="Belum ada buku untuk ditampilkan." />}
        {!loading && !error && featured.length > 0 && (
          <div className="grid">
            {featured.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        )}
      </section>
    </>
  )
}
