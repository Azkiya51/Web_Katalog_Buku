export default function EmptyState({ title = 'Data tidak ditemukan', message, children }) {
  return (
    <div className="state-box">
      <p className="state-icon">📭</p>
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {children}
    </div>
  )
}
