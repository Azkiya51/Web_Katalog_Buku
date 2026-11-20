export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="state-box error" role="alert">
      <p className="state-icon">⚠️</p>
      <p>{message}</p>
      {onRetry && <button className="btn" onClick={onRetry}>Coba lagi</button>}
    </div>
  )
}
