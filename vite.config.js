import solid from "solid-start/vite";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [solid()],
  devServer: {
    port: 8080,

  },
  server: {
    port: 8080,
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      }
    }
  },
  ssr: {
    external: ["@prisma/client"],
  },
  build: {
    minify: true,
    target: "es2018",
    brotliSize: true, // enable brotli compression size display.
    chunkSizeWarningLimit: 1000, // chunk size warning limit.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        }
      },
      cache: true, // caching for faster builds.
    },
  },
  optimizeDeps: {
    include: ["solidjs", "@prisma/client"],
  },
  memfs: true
});
