import 'fake-indexeddb/auto'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from './App'

test('dashboard lists the course with a missing-info badge and exam status', async () => {
  render(<App />)
  expect(await screen.findByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /MB142 Aplikovaná/ })).toBeInTheDocument()
  expect(screen.getByTitle('Missing info')).toHaveTextContent('!')
  expect(screen.getByText(/Exam: need/)).toBeInTheDocument()
})

test('course page shows roadmap and marking a lesson updates its mastery', async () => {
  window.location.hash = '#/c/mb142'
  render(<App />)
  fireEvent.click(await screen.findByRole('button', { name: /Limita funkce/ }))
  fireEvent.click(await screen.findByRole('button', { name: '★★★' }))
  await waitFor(() => expect(screen.getByRole('button', { name: /Limita funkce.*★★★/ })).toBeInTheDocument(), { timeout: 3000 })
})
