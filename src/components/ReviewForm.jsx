import { useState } from 'react'

const initialValues = { name: '', rating: '5', comment: '' }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Nama wajib diisi.'
  else if (values.name.trim().length < 3) errors.name = 'Nama minimal 3 karakter.'

  if (!values.comment.trim()) errors.comment = 'Ulasan wajib diisi.'
  else if (values.comment.trim().length < 10) errors.comment = 'Ulasan minimal 10 karakter.'
  else if (values.comment.length > 300) errors.comment = 'Ulasan maksimal 300 karakter.'

  return errors
}

export default function ReviewForm({ onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [success, setSuccess] = useState(false)

  const errors = validate(values)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    setSuccess(false)
  }

  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched({ name: true, comment: true })
    if (Object.keys(errors).length > 0) return

    onSubmit({
      name: values.name.trim(),
      rating: Number(values.rating),
      comment: values.comment.trim(),
    })
    setValues(initialValues)
    setTouched({})
    setSuccess(true)
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h3>Tulis Ulasan</h3>

      <div className="field">
        <label htmlFor="name">Nama</label>
        <input id="name" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder="Nama kamu" />
        {touched.name && errors.name && <small className="error-text">{errors.name}</small>}
      </div>

      <div className="field">
        <label htmlFor="rating">Rating</label>
        <select id="rating" name="rating" value={values.rating} onChange={handleChange}>
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>{'★'.repeat(n)} ({n})</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="comment">Ulasan</label>
        <textarea id="comment" name="comment" rows="4" value={values.comment} onChange={handleChange} onBlur={handleBlur} placeholder="Ceritakan pendapatmu tentang buku ini..." />
        <div className="field-foot">
          {touched.comment && errors.comment ? <small className="error-text">{errors.comment}</small> : <span />}
          <small className="muted">{values.comment.length}/300</small>
        </div>
      </div>

      <button type="submit" className="btn">Kirim Ulasan</button>
      {success && <p className="success-text">✅ Ulasan berhasil disimpan!</p>}
    </form>
  )
}
