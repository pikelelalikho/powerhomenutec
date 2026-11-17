import { FormEvent, useState } from 'react'
import { sendQuote } from '../api'

export default function Quote() {
  const [state, setState] = useState<'idle' | 'ok' | 'err'>('idle')
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = e.currentTarget
    try { await sendQuote(Object.fromEntries(new FormData(f))); setState('ok'); f.reset() } catch { setState('err') }
  }
  return (
    <section className="block"><div className="wrap">
      <h2 className="center">Get a quote</h2>
      <form className="stack" onSubmit={submit}>
        <input name="name" placeholder="Your name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="phone" placeholder="Phone" />
        <textarea name="message" rows={5} placeholder="Tell us about the job (area, type of floor or carpentry)" required />
        <button className="btn">Send request</button>
        {state === 'ok' && <div className="msg">Thank you! We will be in touch shortly.</div>}
        {state === 'err' && <div className="msg">Something went wrong. Please try again.</div>}
      </form>
    </div></section>
  )
}
