export const API_URL: string = import.meta.env.VITE_API_URL
export const TENANT: string = import.meta.env.VITE_TENANT
const j = (r: Response) => { if (!r.ok) throw new Error(String(r.status)); return r.json() }
const auth = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` })

export type Project = { id: number; title: string; description: string; category: string; images: { id: number; url: string }[] }
export type Quote = { id: number; name: string; email: string; phone: string; message: string; createdAt: string }
export type Tenant = { name: string; tagline: string; phone: string; address: string }

export const getTenant = (): Promise<Tenant> => fetch(`${API_URL}/api/c/${TENANT}`).then(j)
export const getProjects = (category = ''): Promise<Project[]> => fetch(`${API_URL}/api/c/${TENANT}/projects?category=${category}`).then(j)
export const getProject = (id: string): Promise<Project> => fetch(`${API_URL}/api/projects/${id}`).then(j)
export const sendQuote = (body: object) => fetch(`${API_URL}/api/c/${TENANT}/quotes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(r => { if (!r.ok) throw new Error() })
export const login = (email: string, password: string): Promise<{ token: string }> =>
  fetch(`${API_URL}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) }).then(j)
export const addProject = (form: FormData) => fetch(`${API_URL}/api/projects`, { method: 'POST', body: form, headers: auth() }).then(j)
export const deleteProject = (id: number) => fetch(`${API_URL}/api/projects/${id}`, { method: 'DELETE', headers: auth() })
export const getQuotes = (): Promise<Quote[]> => fetch(`${API_URL}/api/quotes`, { headers: auth() }).then(j)
