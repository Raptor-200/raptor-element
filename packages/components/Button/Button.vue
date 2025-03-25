<script setup lang="ts">
/*
组件目录结构：以这个button为例
*Button.vue       一个SFC就是所有的组件逻辑
*Button.test.tsx  测试用例
*type.ts          类型声明
*style.css        样式
*constants.ts     常量
*/ 

  defineOptions({
   name: 'RaButton', 
  })
</script>

<template>
  <button style="background-color: aqua; color: brown">this is a button</button>
</template>

