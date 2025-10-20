import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    envDir: "..",
    server: {
        port: 3000,
        proxy: (() => {
            const API_URL = process.env.VITE_API_URL || "http://localhost:5000";
            return {
                "/api": {
                    target: API_URL,
                    changeOrigin: true,
                },
                "/uploads": {
                    target: API_URL,
                    changeOrigin: true,
                },
            };
        })(),
    },
});