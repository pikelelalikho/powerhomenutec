import { Link } from 'react-router-dom'
import { API_URL, Project } from '../api'

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Link className="card" to={`/project/${p.id}`}>
      {p.images[0] ? <img src={API_URL + p.images[0].url} alt={p.title} /> : <img alt="" />}
      <div className="pad"><div className="tag">{p.category}</div><h3>{p.title}</h3></div>
    </Link>
  )
}
