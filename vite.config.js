import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

export default defineConfig({
  plugins: [
    react(),
    viteCommonjs(),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
  },
  define: {
    global: {},
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
