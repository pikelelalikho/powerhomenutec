import { useEffect, useState } from 'react'
import { getTenant, Tenant } from '../api'

export default function Footer() {
  const [t, setT] = useState<Tenant | null>(null)
  useEffect(() => { getTenant().then(setT).catch(() => {}) }, [])
  return (
    <footer><div className="wrap">
      <div><h3>BEDROCK SURFACES</h3>{t?.tagline}</div>
      <div>{t?.address}<br />{t?.phone}</div>
      <div>&copy; {new Date().getFullYear()} Bedrock Surfaces</div>
    </div></footer>
  )
}
