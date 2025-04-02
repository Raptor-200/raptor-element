import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from "path";
//为什么不引入jsx？ 我们的jsx只在测试里用到，我们所有的组件开发都是用的vue的SFC，所以没必要引入。

export default defineConfig({
  plugins: [vue()],//因为我们每个测试用例都是用的tsx的文件后缀名去写，需要一个插件去读
  build: {
    outDir: 'dist/umd', // 输出目录
    lib: {
      entry: resolve(__dirname, './index.ts'), // 打包入口
      name: 'RaptorElement', // 全局变量名称
      fileName: 'index', // 输出文件名
      formats: ['umd'], // 输出格式
    },
    rollupOptions: {
      external: ['vue'], // 外部依赖
      output: {
        exports: 'named', // 导出方式
        globals: {
          vue: 'Vue', // 全局变量名称
        },
        assetFileNames: (assetInfo) => { // 输出静态资源的名称
          if (assetInfo.name === 'style.css') { // 如果是css文件
            return 'index.css'; // 输出为index.css
          }
          return assetInfo.name as string; // 否则输出原名称
        }

      },
    }
  }
});