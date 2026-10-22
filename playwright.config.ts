import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/parity',
  timeout: 30_000,
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  use: {
    baseURL: 'http://127.0.0.1:4174',
  },
  webServer: {
    command: 'vite --config tests/fixtures/vite.config.ts --host 127.0.0.1 --port 4174 --strictPort',
    url: 'http://127.0.0.1:4174',
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
