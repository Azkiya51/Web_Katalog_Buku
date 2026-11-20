// Semua pemanggilan API dipusatkan di sini (separation of concerns)
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_KEY // opsional

export const PAGE_SIZE = 12
const MAX_PAGES = 10

function stripHtml(html = '') {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .trim()
}

function normalizeBook(item) {
  const v = item.volumeInfo || {}
  return {
    id: item.id,
    title: v.title || 'Tanpa judul',
    subtitle: v.subtitle || '',
    authors: v.authors || [],
    publisher: v.publisher || '-',
    publishedDate: v.publishedDate || '-',
    description: stripHtml(v.description) || 'Deskripsi tidak tersedia.',
    categories: v.categories || [],
    pageCount: v.pageCount || 0,
    rating: v.averageRating || 0,
    language: v.language || '-',
    thumbnail: (v.imageLinks?.thumbnail || '').replace('http://', 'https://'),
    previewLink: v.previewLink || '',
  }
}

async function request(url, signal) {
  const finalUrl = API_KEY ? `${url}${url.includes('?') ? '&' : '?'}key=${API_KEY}` : url
  const res = await fetch(finalUrl, { signal })
  if (!res.ok) {
    throw new Error(`Gagal mengambil data dari server (kode ${res.status}). Coba lagi nanti.`)
  }
  return res.json()
}

export async function fetchBooks({ query = '', category = '', orderBy = 'relevance', page = 1, signal }) {
  const parts = []
  if (query) parts.push(query)
  if (category) parts.push(`subject:${category}`)
  const q = parts.length ? parts.join('+') : 'subject:fiction'

  const params = new URLSearchParams({
    q,
    startIndex: String((page - 1) * PAGE_SIZE),
    maxResults: String(PAGE_SIZE),
    printType: 'books',
    orderBy: orderBy === 'newest' ? 'newest' : 'relevance',
  })

  const data = await request(`${BASE_URL}?${params.toString().replace(/%2B/g, '+')}`, signal)
  const total = data.totalItems || 0
  return {
    books: (data.items || []).map(normalizeBook),
    total,
    totalPages: Math.min(Math.ceil(total / PAGE_SIZE), MAX_PAGES),
  }
}

export async function fetchBookById(id, signal) {
  const data = await request(`${BASE_URL}/${id}`, signal)
  return normalizeBook(data)
}
