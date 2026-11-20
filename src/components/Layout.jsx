import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="app">
      <Navbar />
      <main className="container main">
        <Outlet />
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Katalog Buku · Data dari Google Books API</p>
      </footer>
    </div>
  )
}
