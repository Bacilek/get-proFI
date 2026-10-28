import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { courses } from './content'
import { startAutosync } from './core/autosync'
import { db } from './core/db'
import { seedInitialResults } from './core/seed'

startAutosync(db)
  .then(() => seedInitialResults(db, courses))
  .catch(console.error)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(console.error)
}
