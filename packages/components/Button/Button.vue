<script setup lang="ts">
/*
组件目录结构：以这个button为例
*Button.vue       一个SFC就是所有的组件逻辑
*Button.test.tsx  测试用例
*type.ts          类型声明
*style.css        样式
*constants.ts     常量
*/ 
  import { ref }from "vue";
  import type {ButtonProps} from './types';
  defineOptions({
    name: 'RaButton', 
  });
  const props = withDefaults(defineProps<ButtonProps>(), {
   tag: 'button',
   nativeType: 'button', 
  })
  const slots = defineSlots();
  const _ref = ref<HTMLButtonElement>();
</script>
<template>
 
  <component
    :is="props.tag" 
    ref="_ref" 
    class="ra-button"  
    :type="tag==='button' ? nativeType : void 0" 
    :disabled="disabled ||loading ? true : void 0"
    :class="{
      [`ra-button--${type}`]: type,
      [`ra-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
  >
    <slot></slot>
  </component>  
</template>

