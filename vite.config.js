import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"
import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
    allowedHosts: ['860d0ceff30b.ngrok-free.app'],
    },
})