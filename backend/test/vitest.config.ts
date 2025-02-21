import swc from 'unplugin-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { type ViteUserConfig, defineConfig } from 'vitest/config'

export const userConfig: ViteUserConfig = {
  plugins: [
    tsconfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
  test: {
    globals: true,
    include: ['**/*.spec.ts'],
    root: './',
  },
}

export default defineConfig(userConfig)
