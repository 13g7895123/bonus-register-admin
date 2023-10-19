import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    host: true,
    port: 8000,
    proxy: {
      '/api': {
        // target: 'http://pokemon.mercylife.cc/api/admin',
        target: 'http://api.mercylife.cc/api/bonus-register/admin',
        // target: 'http://170.187.229.132:9091/api/bonus-register/admin',
        // target: 'localhost/api/bonus-register/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
