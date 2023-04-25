import solid from "solid-start/vite";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [solid()],
  devServer: {
    port: 8080
  },
  ssr: {
    external: ["@prisma/client"],
  },
});
