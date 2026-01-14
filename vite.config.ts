import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	define: {
		'import.meta.env.VITE_DEBUG': JSON.stringify(true),
	},
	build: {
		rollupOptions: {
			output: {
				// node_modules의 라이브러리들을 각각 별도의 파일로 쪼개는 설정
				manualChunks(id) {
					if (id.includes('node_modules')) {
						// 라이브러리 이름을 추출하여 chunk 이름으로 사용
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
					}
				},
			},
		},
	},
});
