export default function AboutPage() {
  return (
    <section className="about">
      <h1 className="page-title">Tentang Aplikasi</h1>
      <p>
        Katalog Buku adalah aplikasi web yang dibuat untuk tugas mata kuliah Pengembangan Aplikasi Web.
        Data buku diambil dari Google Books API.
      </p>
      <ul>
        <li>React + Vite</li>
        <li>React Router (nested &amp; dynamic route)</li>
        <li>Context API, custom hooks, dan URL state</li>
      </ul>
      <p className="muted">Dibuat oleh: Azkiya Fauzan Sri Hidayat — 1247050102 </p>
    </section>
  )
}
