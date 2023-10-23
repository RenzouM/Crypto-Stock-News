import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: "src/main.jsx", // Asegúrate de que esta ruta coincida con la ubicación de tu archivo "main.jsx"
    },
  },
});
