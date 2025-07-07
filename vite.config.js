import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  base: '/portfolio/',
  plugins: [
    react(),
    visualizer({
      open: false,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chakra-vendor': ['@chakra-ui/react', '@emotion/react', '@emotion/styled'],
          'utils': ['framer-motion', 'react-icons', 'react-intersection-observer'],
        },
      },
    },
    // Increase chunk size warning limit slightly
    chunkSizeWarningLimit: 600,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Enable source maps for production debugging
    sourcemap: false,
    // Enable CSS code splitting
    cssCodeSplit: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', '@chakra-ui/react', '@emotion/react', '@emotion/styled'],
  },
  // Server configuration
  server: {
    port: 3000,
    open: true,
    // CRITICAL: Add ngrok domains to allowed hosts
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.ngrok-free.app',  // This allows all ngrok-free.app subdomains
      '.ngrok.io',        // This allows all ngrok.io subdomains
      '.ngrok.app',       // This allows all ngrok.app subdomains
    ],
    // Disable HMR for ngrok - use full page reload instead
    hmr: {
      overlay: true,  // Show errors in browser
    },
    watch: {
      usePolling: true,  // Use polling for file changes
    },
  },
  // Preview configuration
  preview: {
    port: 3001,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.ngrok-free.app',
      '.ngrok.io',
      '.ngrok.app',
    ],
  },
})