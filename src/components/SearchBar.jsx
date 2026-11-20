export default function SearchBar({ value, onChange, placeholder = 'Cari judul, penulis, atau kata kunci...' }) {
  return (
    <div className="searchbar">
      <span aria-hidden="true">🔍</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Cari buku"
      />
    </div>
  )
}
