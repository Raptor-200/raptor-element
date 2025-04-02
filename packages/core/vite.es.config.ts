import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from "path";
import dts from 'vite-plugin-dts';
//为什么不引入jsx？ 我们的jsx只在测试里用到，我们所有的组件开发都是用的vue的SFC，所以没必要引入。


const COMP_NAMES = [
  "Alert",
  "Button",
  "Collapse",
  "Dropdown",
  "Form",
  "Icon",
  "Input",
  "Loading",
  "Message",
  "MessageBox",
  "Notification",
  "Overlay",
  "Popconfirm",
  "Select",
  "Switch",
  "Tooltip",
  "Upload",
] as const;




export default defineConfig({
  plugins: [vue(), dts({
    tsconfigPath: "../../tsconfig.build.json",
    outDir: "dist/types",
  })],//因为我们每个测试用例都是用的tsx的文件后缀名去写，需要一个插件去读
  build: {
    outDir: 'dist/es', // 输出目录
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
            id.includes("/packages/utils")
          ) {
            return "utils";
          }

          for (const item of COMP_NAMES) { // 遍历组件数组
            if (id.includes(`/packages/components/${item}`)) { // 如果id包含组件名称
              return item; // 返回组件
            }
          }
        }

      },
    }
  }
});