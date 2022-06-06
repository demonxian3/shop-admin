import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
        },
    },
    plugins: [
        vue(),
        WindiCSS(),
        // AutoImport({
        //     resolvers: [ElementPlusResolver()],
        // }),
        // Components({
        //     resolvers: [ElementPlusResolver()],
        // }),
    ],
    server: {
        proxy: {
            '/dishait': {
                target: 'http://ceshi13.dishait.cn',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/dishait/, ''),
            },
        },
    },
})
