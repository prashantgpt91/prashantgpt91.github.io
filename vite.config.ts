import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/' : '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Industry standard chunk splitting strategy
        manualChunks: {
          // Vendor chunk - all node_modules dependencies
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // UI library chunk - separate heavy UI libraries
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tooltip', 'lucide-react'],
          // Content processing chunk - markdown and related libraries
          content: ['gray-matter', 'marked', 'prismjs'],
          // Utils chunk - smaller utilities
          utils: ['clsx', 'tailwind-merge', 'date-fns']
        }
      }
    },
    // Increase chunk size warning limit (current default is 500kb)
    chunkSizeWarningLimit: 1000
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    nodePolyfills({
      // To exclude specific polyfills, add them to this list
      exclude: [
        'fs', // Excludes the polyfill for `fs` and `node:fs`
      ],
      // Whether to polyfill specific globals
      globals: {
        Buffer: true, // can also be 'build', 'dev', or false
        global: true,
        process: true,
      },
      // Whether to polyfill Node.js built-in modules
      protocolImports: true,
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.md'],
}));
