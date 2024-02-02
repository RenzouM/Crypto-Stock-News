import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ReactRefresh from "@vitejs/plugin-react";

export default {
  plugins: [ReactRefresh()],
  server: {
    fs: {
      strict: false, // Permite que las rutas no resueltas se carguen en index.html
    },
  },
};
