import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_URL, getProject, Project } from '../api'

export default function ProjectDetail() {
  const { id } = useParams()
  const [p, setP] = useState<Project | null>(null)
  useEffect(() => { getProject(id!).then(setP).catch(() => {}) }, [id])
  if (!p) return <section className="block"><div className="wrap center">Loading...</div></section>
  return (
    <section className="block"><div className="wrap">
      <div className="tag">{p.category}</div><h2>{p.title}</h2><p>{p.description}</p>
      <div className="grid">{p.images.map(i => <div className="card" key={i.id}><img src={API_URL + i.url} alt={p.title} /></div>)}</div>
      <p style={{ marginTop: 28 }}><Link to="/quote" className="btn">Get a quote like this</Link></p>
    </div></section>
  )
}
