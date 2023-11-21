import { defineConfig } from 'vite'
import viteImagemin from 'vite-plugin-imagemin'
import babel from '@rollup/plugin-babel'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
	base: '',
  root: './src',
	server: {
    port: 3000,
    hot: true,
    open: true,
  },
	build: {
    outDir: '../dist',
    rollupOptions: {
      plugins: [
        babel({
          babelHelpers: 'bundled',
          presets: ['@babel/preset-env'],
        }),
      ],
    },
  },
	plugins: [
		createHtmlPlugin({
      minify: true,
      template: 'index.html',
      inject: {
        data: {
          title: 'index',
          injectScript: `<script src="./inject.js"></script>`,
        },
      },
    }),
		viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
	]
})