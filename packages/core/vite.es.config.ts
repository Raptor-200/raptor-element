import { defineConfig } from 'vite';
import { resolve } from "path";
import { delay, filter, map } from 'lodash-es';
import { readdirSync } from 'fs';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import shell from "shelljs";
import hooks from "./hooksPlugin";
import terser from "@rollup/plugin-terser";
//为什么不引入jsx？ 我们的jsx只在测试里用到，我们所有的组件开发都是用的vue的SFC，所以没必要引入。

const TRY_MOVE_STYLES_DELAY = 800 as const;

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";
// const COMP_NAMES = [
//   "Alert",
//   "Button",
//   "Collapse",
//   "Dropdown",
//   "Form",
//   "Icon",
//   "Input",
//   "Loading",
//   "Message",
//   "MessageBox",
//   "Notification",
//   "Overlay",
//   "Popconfirm",
//   "Select",
//   "Switch",
//   "Tooltip",
//   "Upload",
// ] as const;
function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}

function moveStyles() {
  try {
    readdirSync("./dist/es/theme");
    shell.mv("./dist/es/theme", "./dist");
  } catch (_) {
    delay(moveStyles, TRY_MOVE_STYLES_DELAY);
  }
}

export default defineConfig({
  plugins: [vue(), dts({
    tsconfigPath: "../../tsconfig.build.json",
    outDir: "dist/types",
  }),
  hooks({
    rmFiles: ["./dist/es", "./dist/theme", "./dist/types"],
    afterBuild: moveStyles,
  }),
  terser({
    compress: {
      sequences: isProd,
      arguments: isProd,
      drop_console: isProd && ["log"],
      drop_debugger: isProd,
      passes: isProd ? 4 : 1,
      global_defs: {
        "@DEV": JSON.stringify(isDev),
        "@PROD": JSON.stringify(isProd),
        "@TEST": JSON.stringify(isTest),
      },
    },
    format: {
      semicolons: false,
      shorthand: isProd,
      braces: !isProd,
      beautify: !isProd,
      comments: !isProd,
    },
    mangle: {
      toplevel: isProd,
      eval: isProd,
      keep_classnames: isDev,
      keep_fnames: isDev,
    },
  })
  ],//因为我们每个测试用例都是用的tsx的文件后缀名去写，需要一个插件去读
  build: {
    outDir: 'dist/es', // 输出目录
    minify: false, //把默认的混淆关了用我们自己的terser插件去写
    cssCodeSplit: true, // 启用 CSS 代码拆分
    lib: {
      entry: resolve(__dirname, './index.ts'), // 打包入口
      name: 'RaptorElement', // 全局变量名称
      fileName: 'index', // 输出文件名
      formats: ['es'], // 输出格式
    },

    rollupOptions: {
      external: [
        'vue',
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator",
      ], // 外部依赖

      output: {

        assetFileNames: (assetInfo) => { // 输出静态资源的名称
          if (assetInfo.name === 'style.css') { // 如果是css文件
            return 'index.css'; // 输出为index.css
          };
          if (
            assetInfo.type === "asset" &&
            /\.(css)$/i.test(assetInfo.name as string)
          ) {
            return "theme/[name].[ext]";
          }
          return assetInfo.name as string; // 否则输出原名称
        },
        manualChunks(id) { // 把modules、hooks、utils分包，再把所有组件都分包，这里把组件定义进数组遍历
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/packages/hooks")) {
            return "hooks";
          }
          if (
            id.includes("/packages/utils") ||
            id.includes("plugin-vue:export-helper")
          ) {
            return "utils";
          }

          for (const dirName of getDirectoriesSync("../components")) { // 遍历组件数组
            if (id.includes(`/packages/components/${dirName}`)) { // 如果id包含组件名称
              return dirName; // 返回组件
            }
          }
        }

      },
    }
  }
});