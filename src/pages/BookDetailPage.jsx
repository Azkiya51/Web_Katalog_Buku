import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import ReviewForm from '../components/ReviewForm'
import useFetch from '../hooks/useFetch'
import { fetchBookById } from '../services/bookService'
import { useLibrary } from '../context/LibraryContext'

export default function BookDetailPage() {
  const { id } = useParams() 
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite, addReview, removeReview, getReviews } = useLibrary()

  const { data: book, loading, error, refetch } = useFetch((signal) => fetchBookById(id, signal), [id])

  if (loading) return <Loader text="Memuat detail buku..." />
  if (error) return <ErrorMessage message={error} onRetry={refetch} />
  if (!book) return null

  const reviews = getReviews(book.id)
  const fav = isFavorite(book.id)

  return (
    <>
      <button className="btn btn-outline back" onClick={() => navigate(-1)}>← Kembali</button>

      <div className="detail">
        <div className="detail-cover">
          {book.thumbnail ? <img src={book.thumbnail} alt={`Sampul ${book.title}`} /> : <span className="cover-placeholder">📘</span>}
        </div>

        <div className="detail-info">
          <h1>{book.title}</h1>
          {book.subtitle && <p className="muted">{book.subtitle}</p>}
          <p className="card-author">{book.authors.join(', ') || 'Penulis tidak diketahui'}</p>

          <dl className="meta">
            <div><dt>Penerbit</dt><dd>{book.publisher}</dd></div>
            <div><dt>Terbit</dt><dd>{book.publishedDate}</dd></div>
            <div><dt>Halaman</dt><dd>{book.pageCount || '-'}</dd></div>
            <div><dt>Bahasa</dt><dd>{book.language.toUpperCase()}</dd></div>
            <div><dt>Rating</dt><dd>{book.rating ? `⭐ ${book.rating}` : '-'}</dd></div>
          </dl>

          <div className="chips">
            {book.categories.map((c) => <span key={c} className="chip static">{c}</span>)}
          </div>

          <div className="actions">
            <button className={fav ? 'btn btn-outline' : 'btn'} onClick={() => toggleFavorite(book)}>
              {fav ? '★ Hapus dari Favorit' : '☆ Tambah ke Favorit'}
            </button>
            {book.previewLink && (
              <a className="btn btn-outline" href={book.previewLink} target="_blank" rel="noreferrer">Pratinjau Buku</a>
            )}
          </div>

          <h3>Deskripsi</h3>
          <p className="description">{book.description}</p>
        </div>
      </div>

      <section className="reviews">
        <ReviewForm onSubmit={(review) => addReview(book.id, review)} />

        <div>
          <h3>Ulasan ({reviews.length})</h3>
          {reviews.length === 0 && <p className="muted">Belum ada ulasan. Jadilah yang pertama!</p>}
          {reviews.map((r) => (
            <div key={r.id} className="review">
              <div className="review-head">
                <strong>{r.name}</strong>
                <span className="stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
              </div>
              <p>{r.comment}</p>
              <div className="review-foot">
                <small className="muted">{new Date(r.date).toLocaleDateString('id-ID')}</small>
                <button className="link-btn" onClick={() => removeReview(book.id, r.id)}>Hapus</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
