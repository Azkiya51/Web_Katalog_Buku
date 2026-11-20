import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import BooksLayout from './pages/BooksLayout'
import BooksPage from './pages/BooksPage'
import BookDetailPage from './pages/BookDetailPage'
import FavoritesPage from './pages/FavoritesPage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      {/* Layout utama (nested route) */}
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />

        {/* Nested route: /buku dan /buku/:id */}
        <Route path="buku" element={<BooksLayout />}>
          <Route index element={<BooksPage />} />
          <Route path=":id" element={<BookDetailPage />} />
        </Route>

        <Route path="favorit" element={<FavoritesPage />} />
        <Route path="tentang" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
