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

test('lesson page renders markdown with math and practice records stars', async () => {
  window.location.hash = '#/c/mb142/l/differential'
  render(<App />)
  expect(await screen.findByRole('heading', { name: 'Intuice' })).toBeInTheDocument()
  expect(document.querySelector('.katex')).not.toBeNull()
  // first question is numeric: 2,926 (decimal comma) is accepted
  fireEvent.change(await screen.findByLabelText('Answer'), { target: { value: '2,926' } })
  fireEvent.click(screen.getByRole('button', { name: 'Check' }))
  expect(await screen.findByText('Correct')).toBeInTheDocument()
})

test('milestones are named "Vnitro N: topic (date)" with details in a tooltip', async () => {
  window.location.hash = '#/c/mb142'
  render(<App />)
  expect(await screen.findByText(/Vnitro 1: diferenciální počet/)).toHaveTextContent(/\(20\. 10\.\)/)
  expect(screen.getAllByRole('tooltip').some((t) => /120 min/.test(t.textContent ?? ''))).toBe(true)
})
