import { Link } from 'react-router-dom'
import { useLibrary } from '../context/LibraryContext'

export default function BookCard({ book }) {
  const { isFavorite, toggleFavorite } = useLibrary()
  const fav = isFavorite(book.id)

  return (
    <article className="card">
      <button
        className={fav ? 'fav-btn active' : 'fav-btn'}
        onClick={() => toggleFavorite(book)}
        aria-label={fav ? 'Hapus dari favorit' : 'Tambah ke favorit'}
        title={fav ? 'Hapus dari favorit' : 'Tambah ke favorit'}
      >
        {fav ? '★' : '☆'}
      </button>

      <Link to={`/buku/${book.id}`} className="card-link">
        <div className="cover">
          {book.thumbnail ? (
            <img src={book.thumbnail} alt={`Sampul ${book.title}`} loading="lazy" />
          ) : (
            <span className="cover-placeholder">📘</span>
          )}
        </div>
        <div className="card-body">
          <h3 className="card-title">{book.title}</h3>
          <p className="card-author">{book.authors.join(', ') || 'Penulis tidak diketahui'}</p>
          <p className="card-meta">
            {book.publishedDate !== '-' ? book.publishedDate.slice(0, 4) : '-'}
            {book.rating > 0 && ` · ⭐ ${book.rating}`}
          </p>
        </div>
      </Link>
    </article>
  )
}
