import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      exclude: ['node_modules', '**/src/components/ui/**'],
      setupFiles: "__tests__/setup.ts"
    }
  })
)