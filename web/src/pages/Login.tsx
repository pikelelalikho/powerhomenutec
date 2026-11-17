import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api'

export default function Login() {
  const nav = useNavigate()
  const [err, setErr] = useState('')
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    try { const r = await login(String(f.get('email')), String(f.get('password'))); localStorage.setItem('token', r.token); nav('/admin') }
    catch { setErr('Invalid email or password') }
  }
  return (
    <section className="block"><div className="wrap">
      <h2 className="center">Admin login</h2>
      <form className="stack" onSubmit={submit}>
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button className="btn">Log in</button>
        {err && <div className="msg">{err}</div>}
      </form>
    </div></section>
  )
}
