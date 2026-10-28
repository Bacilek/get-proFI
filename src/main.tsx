import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { courses } from './content'
import { db } from './core/db'
import { seedInitialResults } from './core/seed'

seedInitialResults(db, courses).catch(console.error)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
