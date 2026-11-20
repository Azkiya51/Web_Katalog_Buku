# Katalog Buku

Aplikasi katalog buku (React + Vite + React Router) dengan data dari Google Books API.

## Menjalankan
```bash
npm install
npm run dev
```

## Struktur Folder
```
src/
├── components/   Navbar, Layout, BookCard, SearchBar, FilterBar, Pagination, Loader, ErrorMessage, EmptyState, ReviewForm
├── pages/        HomePage, BooksLayout, BooksPage, BookDetailPage, FavoritesPage, AboutPage, NotFoundPage
├── hooks/        useFetch, useDebounce, useLocalStorage
├── services/     bookService.js (akses API)
├── context/      LibraryContext.jsx (favorit & ulasan)
└── utils/        constants.js
```
