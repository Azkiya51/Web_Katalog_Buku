import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useLibrary } from '../context/LibraryContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { favorites } = useLibrary()

  const linkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')
  const close = () => setOpen(false)

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand" onClick={close}>
          📚 Katalog<span>Buku</span>
        </Link>

        <button
          className="menu-toggle"
          aria-label="Buka menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? '✕' : '☰'}
        </button>

        <nav className={open ? 'nav open' : 'nav'}>
          <NavLink to="/" end className={linkClass} onClick={close}>Beranda</NavLink>
          <NavLink to="/buku" className={linkClass} onClick={close}>Katalog</NavLink>
          <NavLink to="/favorit" className={linkClass} onClick={close}>
            Favorit {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
          </NavLink>
          <NavLink to="/tentang" className={linkClass} onClick={close}>Tentang</NavLink>
        </nav>
      </div>
    </header>
  )
}
