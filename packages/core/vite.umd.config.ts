import { defineConfig } from 'vite';
import { readFileSync } from "fs";
import { resolve } from "path";
import { delay } from "lodash-es";
import { compression } from "vite-plugin-compression2";
//为什么不引入jsx？ 我们的jsx只在测试里用到，我们所有的组件开发都是用的vue的SFC，所以没必要引入。
import shell from "shelljs";
import vue from '@vitejs/plugin-vue';
import hooks from "./hooksPlugin";
import terser from '@rollup/plugin-terser';

const TRY_MOVE_STYLES_DELAY = 800 as const;

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

function moveStyles() {
  try {
    readFileSync("./dist/umd/index.css.gz");
    shell.cp("./dist/umd/index.css", "./dist/index.css");
  } catch (_) {
    delay(moveStyles, TRY_MOVE_STYLES_DELAY);
  }
}


export default defineConfig({
  plugins: [vue(), compression({
    include: /.(cjs|css)$/i,
  }),
  terser({
    compress: {
      drop_console: ["log"],
      drop_debugger: true,
      passes: 3,
      global_defs: {
        "@DEV": JSON.stringify(isDev),
        "@PROD": JSON.stringify(isProd),
        "@TEST": JSON.stringify(isTest),
      },
    },
  }),
  hooks({
    rmFiles: ["./dist/umd", "./dist/index.css"],
    afterBuild: moveStyles,
  })
  ],//因为我们每个测试用例都是用的tsx的文件后缀名去写，需要一个插件去读
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