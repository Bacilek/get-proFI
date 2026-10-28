import { useState } from 'react'
import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import { courseSlug, courses } from './content'
import Achievements from './pages/Achievements'
import CourseView from './pages/CourseView'
import Dashboard from './pages/Dashboard'
import LessonPage from './pages/LessonPage'
import Review from './pages/Review'
import Settings from './pages/Settings'

function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"))
  return (
    <button
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="rounded-md border border-line px-2 py-1 text-muted hover:text-fg"
      onClick={() => {
        const next = !dark
        document.documentElement.classList.toggle("dark", next)
        try {
          localStorage.setItem("theme", next ? "dark" : "light")
        } catch {
          /* storage unavailable: theme just won't persist */
        }
        setDark(next)
      }}
    >
      {dark ? "☾" : "☀"}
    </button>
  )
}

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-bg text-fg">
        <nav className="border-b border-line bg-surface">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-6 py-3 text-sm">
            <Link to="/" className="text-base font-semibold">
              get-proFI
            </Link>
            {courses.map((c) => (
              <Link key={c.code} to={`/c/${courseSlug(c)}`} className="text-muted hover:text-fg">
                {c.code}
              </Link>
            ))}
            <span className="ml-auto flex items-center gap-3">
              <Link to="/review" className="text-muted hover:text-fg">
                Review
              </Link>
              <Link to="/achievements" className="text-muted hover:text-fg">
                Achievements
              </Link>
              <Link to="/settings" className="text-muted hover:text-fg">
                Settings
              </Link>
              <ThemeToggle />
            </span>
          </div>
        </nav>
        <main className="mx-auto max-w-5xl p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/c/:slug" element={<CourseView />} />
            <Route path="/c/:slug/l/:lessonId" element={<LessonPage />} />
            <Route path="/review" element={<Review />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/settings"element={<Settings />} />
            <Route path="*" element={<p>Not found.</p>} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}
