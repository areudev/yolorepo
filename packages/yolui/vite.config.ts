import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'
import dts from 'vite-plugin-dts'
import {libInjectCss} from 'vite-plugin-lib-inject-css'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		libInjectCss(),
		dts({
			include: ['src/components'],
		}),
	],
	build: {
		copyPublicDir: false,
		lib: {
			entry: resolve(__dirname, 'src/components/index.ts'),
			name: 'yolo-ui',
			fileName: 'yolui',
		},
		rollupOptions: {
			external: ['react', 'react-dom', 'react/jsx-runtime'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
					'react/jsx-runtime': 'jsxRuntime',
				},
			},
		},
	},
})
