import solid from 'solid-start/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [solid()],
  server: {
    port: 8080,
    watch: {
      usePolling: true,
    },
  },
  ssr: {
    external: ['@prisma/client'],
  },
  build: {
    minify: true,
    target: 'es2018',
    brotliSize: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            const packageName = id.toString().split('node_modules/')[1].split('/')[0].toString();
            return packageName;
          }
        },
      },
      cache: true,
    },
  },
  optimizeDeps: {
    include: ['solid-js', '@prisma/client'],
  },
  memfs: true,
});
