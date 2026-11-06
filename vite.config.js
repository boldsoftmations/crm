import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  envPrefix: 'REACT_APP_',
  plugins: [react()],
  esbuild: {
    include: /\/src\/.*\.[jt]sx?$/,
    exclude: [],
    loader: 'jsx',
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
});
