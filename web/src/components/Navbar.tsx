import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="nav"><div className="wrap">
      <Link to="/" className="brand"><img src="/logo.svg" alt="" /><span>BEDROCK SURFACES</span></Link>
      <nav>
        <Link to="/gallery">Projects</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/quote" className="btn">Get a quote</Link>
      </nav>
    </div></header>
  )
}
