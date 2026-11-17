import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Gallery from './pages/Gallery'
import ProjectDetail from './pages/ProjectDetail'
import Quote from './pages/Quote'
import Login from './pages/Login'
import Dashboard from './admin/Dashboard'

export default function App() {
  return (<>
    <Navbar />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="/quote" element={<Quote />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Dashboard />} />
    </Routes>
    <Footer />
  </>)
}
