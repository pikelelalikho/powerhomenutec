import { useEffect, useState } from 'react'
import { getProjects, Project } from '../api'
import ProjectCard from '../components/ProjectCard'

const cats = ['', 'Flooring', 'Carpentry', 'Decks']

export default function Gallery() {
  const [cat, setCat] = useState('')
  const [items, setItems] = useState<Project[]>([])
  useEffect(() => { getProjects(cat).then(setItems).catch(() => setItems([])) }, [cat])
  return (
    <section className="block"><div className="wrap">
      <h2 className="center">Our projects</h2>
      <div className="chips">{cats.map(c => <button key={c} className={'chip' + (c === cat ? ' on' : '')} onClick={() => setCat(c)}>{c || 'All'}</button>)}</div>
      <div className="grid">{items.map(p => <ProjectCard key={p.id} p={p} />)}</div>
      {items.length === 0 && <p className="center">No projects yet.</p>}
    </div></section>
  )
}
