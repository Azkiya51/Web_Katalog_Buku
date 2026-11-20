import { Outlet, Link, useMatch } from 'react-router-dom'

// Layout nested untuk /buku dan /buku/:id
export default function BooksLayout() {
  const isDetail = useMatch('/buku/:id')

  return (
    <section>
      <div className="breadcrumb">
        <Link to="/">Beranda</Link> / <Link to="/buku">Katalog</Link>
        {isDetail && ' / Detail'}
      </div>
      <Outlet />
    </section>
  )
}
