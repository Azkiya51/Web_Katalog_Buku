import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'

export default function NotFoundPage() {
  return (
    <EmptyState title="404 – Halaman tidak ditemukan" message="Alamat yang kamu tuju tidak tersedia.">
      <Link to="/" className="btn">Kembali ke Beranda</Link>
    </EmptyState>
  )
}
