import 'fake-indexeddb/auto'
import { render, screen } from '@testing-library/react'
import App from './App'

test('dashboard lists the course with a missing-info badge and exam status', async () => {
  render(<App />)
  expect(await screen.findByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /MB142 Aplikovaná/ })).toBeInTheDocument()
  expect(screen.getByTitle('Missing info')).toHaveTextContent('!')
  expect(screen.getByText(/Exam: need/)).toBeInTheDocument()
})
