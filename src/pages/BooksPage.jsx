import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import BookCard from '../components/BookCard'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import useFetch from '../hooks/useFetch'
import useDebounce from '../hooks/useDebounce'
import { fetchBooks } from '../services/bookService'

export default function BooksPage() {
  // URL State: q, kategori, urut, hal
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') || ''
  const category = searchParams.get('kategori') || ''
  const sort = searchParams.get('urut') || 'relevance'
  const page = Number(searchParams.get('hal')) || 1

  const updateParams = (changes) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(changes).forEach(([key, val]) => {
      if (val === '' || val === null || val === undefined) next.delete(key)
      else next.set(key, String(val))
    })
    setSearchParams(next)
  }

  // Local State untuk input pencarian + debounce agar tidak memanggil API tiap ketikan
  const [text, setText] = useState(q)
  const debouncedText = useDebounce(text, 500)

  useEffect(() => setText(q), [q])
  useEffect(() => {
    if (debouncedText !== q) updateParams({ q: debouncedText, hal: 1 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedText])

  // Server State
  const apiOrder = sort === 'newest' ? 'newest' : 'relevance'
  const { data, loading, error, refetch } = useFetch(
    (signal) => fetchBooks({ query: q, category, orderBy: apiOrder, page, signal }),
    [q, category, apiOrder, page]
  )

  // Sorting judul dilakukan di sisi klien pada data halaman aktif
  const books = useMemo(() => {
    const list = [...(data?.books || [])]
    if (sort === 'title-asc') list.sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'title-desc') list.sort((a, b) => b.title.localeCompare(a.title))
    return list
  }, [data, sort])

  const goToPage = (p) => {
    updateParams({ hal: p })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const reset = () => {
    setText('')
    setSearchParams({})
  }

  return (
    <>
      <h1 className="page-title">Katalog Buku</h1>

      <div className="toolbar">
        <SearchBar value={text} onChange={setText} />
        <FilterBar
          category={category}
          sort={sort}
          onCategoryChange={(v) => updateParams({ kategori: v, hal: 1 })}
          onSortChange={(v) => updateParams({ urut: v === 'relevance' ? '' : v, hal: 1 })}
          onReset={reset}
        />
      </div>

      {loading && <Loader text="Mengambil data buku..." />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}

      {!loading && !error && books.length === 0 && (
        <EmptyState message="Coba gunakan kata kunci atau kategori lain.">
          <button className="btn" onClick={reset}>Reset pencarian</button>
        </EmptyState>
      )}

      {!loading && !error && books.length > 0 && (
        <>
          <p className="muted result-info">
            Menampilkan {books.length} buku · halaman {page}
            {data.totalPages > 0 && ` dari ${data.totalPages}`}
          </p>
          <div className="grid">
            {books.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
          <Pagination page={page} totalPages={data.totalPages} onChange={goToPage} />
        </>
      )}
    </>
  )
}
