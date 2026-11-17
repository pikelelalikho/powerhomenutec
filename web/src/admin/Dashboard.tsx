import { FormEvent, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addProject, deleteProject, getProjects, getQuotes, Project, Quote } from '../api'

export default function Dashboard() {
  const nav = useNavigate()
  const [projects, setProjects] = useState<Project[]>([])
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [busy, setBusy] = useState(false)

  const load = useCallback(() => {
    getProjects().then(setProjects).catch(() => {})
    getQuotes().then(setQuotes).catch(() => { localStorage.removeItem('token'); nav('/login') })
  }, [nav])
  useEffect(() => { if (!localStorage.getItem('token')) nav('/login'); else load() }, [load, nav])

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setBusy(true)
    const f = e.currentTarget
    try { await addProject(new FormData(f)); f.reset(); load() } finally { setBusy(false) }
  }
  const remove = async (id: number) => { if (confirm('Delete this project?')) { await deleteProject(id); load() } }

  return (
    <section className="block"><div className="wrap">
      <h2>Add a project</h2>
      <form className="stack" onSubmit={submit} style={{ margin: '0 0 40px' }}>
        <input name="title" placeholder="Project title" required />
        <textarea name="description" rows={3} placeholder="What did you do?" />
        <select name="category"><option>Flooring</option><option>Carpentry</option><option>Decks</option></select>
        <input name="photos" type="file" accept="image/*" multiple />
        <button className="btn" disabled={busy}>{busy ? 'Posting...' : 'Post project'}</button>
      </form>

      <h2>Your projects</h2>
      <div className="grid" style={{ marginBottom: 40 }}>
        {projects.map(p => <div className="card pad" key={p.id}><b>{p.title}</b><div className="tag">{p.category}</div><button className="chip" onClick={() => remove(p.id)} style={{ marginTop: 10 }}>Delete</button></div>)}
      </div>

      <h2>Quote requests</h2>
      <div className="grid">
        {quotes.map(q => <div className="card pad" key={q.id}><b>{q.name}</b><br />{q.email} {q.phone}<p>{q.message}</p><small>{new Date(q.createdAt).toLocaleString()}</small></div>)}
        {quotes.length === 0 && <p>No quote requests yet.</p>}
      </div>
      <p><button className="chip" onClick={() => { localStorage.removeItem('token'); nav('/login') }}>Log out</button></p>
    </div></section>
  )
}
