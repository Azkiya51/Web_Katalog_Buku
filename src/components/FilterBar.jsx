import { CATEGORIES, SORT_OPTIONS } from '../utils/constants'

export default function FilterBar({ category, sort, onCategoryChange, onSortChange, onReset }) {
  return (
    <div className="filterbar">
      <label>
        Kategori
        <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="">Semua kategori</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>

      <label>
        Urutkan
        <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </label>

      <button className="btn btn-outline" onClick={onReset}>Reset</button>
    </div>
  )
}
