import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Raise the warning threshold so CI doesn't fail on known-large 3D vendor bundles
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        /**
         * Manual chunk splitting:
         * - Separates vendor libs so browsers cache them independently.
         * - A returning visitor only re-downloads the app chunk if YOUR code changed,
         *   not Three.js (which rarely updates).
         */
        manualChunks: {
          'vendor-react':  ['react', 'react-dom'],
          'vendor-three':  ['three'],
          'vendor-fiber':  ['@react-three/fiber', '@react-three/drei'],
          'vendor-framer': ['framer-motion', 'framer-motion-3d'],
          'vendor-misc':   ['jotai', 'gsap'],
        },
      },
    },
  },
})
