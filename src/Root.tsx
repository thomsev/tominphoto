import { Suspense, lazy } from 'react'

const App = lazy(() => import('./App.tsx'))
const Contact = lazy(() => import('./Contact.tsx'))
const path = window.location.pathname.replace(/\/+$/, '')
const contact = path === '/kontakt' || path === '/takk'
if (contact) document.title = path === '/takk' ? 'Takk for forespørselen — Tomin Photo' : 'Book fotograf — Tomin Photo'

export default function Root() {
  return <Suspense fallback={<div role="status" style={{ padding: '15vh 6vw', minHeight: '100svh' }}>Tomin Photo · Laster …</div>}>
    {contact ? <Contact thanks={path === '/takk'} /> : <App />}
  </Suspense>
}
