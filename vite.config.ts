/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { userdata } from './vite.userdata.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), userdata()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    globals: true,
  },
})
