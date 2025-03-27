// vitest.config.ts
/// <reference types="vitest" />
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],//因为我们每个测试用例都是用的tsx的文件后缀名去写，需要一个插件去读
  test: {
    globals: true,//我们写一个按钮的测试用例但是不可能把所有按钮的子组件都引进去,这里就是需要给他做一个全局的配置
    environment: "jsdom"
  }
})

