export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const start = Math.max(1, Math.min(page - 2, totalPages - 4))
  const end = Math.min(totalPages, start + 4)
  const pages = []
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <nav className="pagination" aria-label="Navigasi halaman">
      <button className="page-btn" disabled={page === 1} onClick={() => onChange(page - 1)}>
        ‹ Sebelumnya
      </button>
      {pages.map((p) => (
        <button
          key={p}
          className={p === page ? 'page-btn active' : 'page-btn'}
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}
      <button className="page-btn" disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        Berikutnya ›
      </button>
    </nav>
  )
}
