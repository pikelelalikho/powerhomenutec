import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProjects, Project } from '../api'
import ProjectCard from '../components/ProjectCard'

const pillars = [['Exceptional value', 'Quality finishes at fair, upfront prices.'], ['Quality workmanship', 'Durable floors and carpentry built to last.'], ['Expert advice', 'Clear guidance from first visit to final coat.']]
const steps = ['Request a quote', 'Choose your finish', 'We prepare and install', 'Enjoy your space']

export default function Landing() {
  const [projects, setProjects] = useState<Project[]>([])
  useEffect(() => { getProjects().then(setProjects).catch(() => {}) }, [])
  return (<>
    <section className="hero"><div className="wrap">
      <h1>BUILT ON SOLID GROUND</h1>
      <p>Home and industrial flooring, pool decks and carpentry, done properly.</p>
      <Link to="/quote" className="btn">Get a free quote</Link>{' '}
      <Link to="/gallery" className="btn ghost">See our work</Link>
    </div></section>

    <section className="block"><div className="wrap">
      <h2 className="center">Our promise to you</h2>
      <div className="grid">{pillars.map(([t, d]) => <div className="card pad" key={t}><h3>{t}</h3>{d}</div>)}</div>
    </div></section>

    <section className="block dark"><div className="wrap">
      <h2 className="center">Making it easy</h2>
      <div className="grid">{steps.map((s, i) => <div className="step" key={s}><b>0{i + 1}</b><h3>{s}</h3></div>)}</div>
    </div></section>

    <section className="block"><div className="wrap">
      <h2 className="center">Recent projects</h2>
      {projects.length === 0 && <p className="center">Projects you post from the admin page will appear here.</p>}
      <div className="grid">{projects.slice(0, 8).map(p => <ProjectCard key={p.id} p={p} />)}</div>
      <p className="center" style={{ marginTop: 28 }}><Link to="/gallery" className="btn alt">View all projects</Link></p>
    </div></section>

    <section className="block" style={{ background: 'var(--stone)' }}><div className="wrap center">
      <h2>Ready to start?</h2><p>Tell us about your space and we will get back to you.</p>
      <Link to="/quote" className="btn">Request a quote</Link>
    </div></section>
  </>)
}
