import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Removed the exclude option that was causing module loading issues
  build: {
    // Improve chunk loading strategy
    rollupOptions: {
      output: {
        manualChunks: {
          'lucide-react': ['lucide-react'],
          'react-vendor': ['react', 'react-dom']
        }
      }
    }
  }
});
