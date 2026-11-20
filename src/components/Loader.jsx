export default function Loader({ text = 'Memuat data...' }) {
  return (
    <div className="state-box" role="status">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  )
}
