import { defineConfig } from 'vitest/config'
import { userConfig } from './vitest.config'

export default defineConfig({
  ...userConfig,
  test: {
    ...userConfig.test,
    include: ['**/*.test.ts'],
    root: process.env.ROOT,
    setupFiles: ['./test/setup.e2e.ts'],
  },
})
