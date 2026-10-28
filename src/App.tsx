import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import { courseSlug, courses } from './content'
import CourseView from './pages/CourseView'
import Dashboard from './pages/Dashboard'
import LessonPage from './pages/LessonPage'
import Settings from './pages/Settings'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <nav className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-6 py-3 text-sm">
            <Link to="/" className="text-base font-semibold">
              get-proFI
            </Link>
            {courses.map((c) => (
              <Link key={c.code} to={`/c/${courseSlug(c)}`} className="text-slate-600 hover:text-slate-900">
                {c.code}
              </Link>
            ))}
            <Link to="/settings" className="ml-auto text-slate-600 hover:text-slate-900">
              Settings
            </Link>
          </div>
        </nav>
        <main className="mx-auto max-w-5xl p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/c/:slug" element={<CourseView />} />
            <Route path="/c/:slug/l/:lessonId" element={<LessonPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<p>Not found.</p>} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}
