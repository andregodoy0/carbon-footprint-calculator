import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'testSetup.ts',
    clearMocks: true,
  },
  resolve: {
    alias: [{ find: '~', replacement: resolve(__dirname, './src') }],
  },
})
