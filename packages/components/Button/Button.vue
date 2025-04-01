<script setup lang="ts">
/*
组件目录结构：以这个button为例
*Button.vue       一个SFC就是所有的组件逻辑
*Button.test.tsx  测试用例
*type.ts          类型声明
*style.css        样式
*constants.ts     常量
*/ 
  import { ref, computed, inject}from "vue";
  import type {ButtonProps, ButtonEmits,ButtonInstance} from './types';
  import {throttle} from 'lodash-es';
  import { BUTTON_GROUP_CTX_KEY } from "./contants";
  import  RaIcon from "../Icon/Icon.vue";
  
  defineOptions({
    name: 'RaButton', 
  });

  const props = withDefaults(defineProps<ButtonProps>(), {
   tag: 'button',
   nativeType: 'button', 
   useThrottle: true,
   throttleDuration:500
  })
  const emits = defineEmits<ButtonEmits>();
  const slots = defineSlots();
  const ctx = inject(BUTTON_GROUP_CTX_KEY, void 0);
  const _ref = ref<HTMLButtonElement>();
  const size= computed(() => ctx?.size ?? props?.size ?? "");
  const type= computed(() => ctx?.type ?? props?.type ?? "");
  const disabled= computed(() => ctx?.disabled|| props?.disabled|| false);
  const iconStyle = computed(() => ({marginRight: slots.default ? "6px" : "0px",}));
  const handleBtnClick = (e: MouseEvent) => emits('click', e);
  const handleBtnClickThrottle = throttle(handleBtnClick, props.throttleDuration,{trailing: false});
  
  defineExpose<ButtonInstance>({
    ref:_ref,
  })
</script>
<template>
 
  <component
    ref="_ref" 
    class="ra-button"  

    :is="tag" 
    :autofocus="autofocus"
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
    @click="
      (e: MouseEvent) => 
        useThrottle ? handleBtnClickThrottle(e) : handleBtnClick(e)
    "
  >

    <template v-if="loading">
        <slot name="loading">
          <ra-icon
            class="loading-icon"
            :icon="loadingIcon ?? 'spinner'"
            :style="iconStyle"
            size="1x"
            spin
          />
        </slot>
    </template>

    <ra-icon
      v-if="icon && !loading"
      :icon="icon"
      :style="iconStyle"
      size="1x"
    />

    <slot></slot>
  </component>  
</template>

<style scoped>
@import './style.css';
</style>

