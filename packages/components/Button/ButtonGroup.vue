<script setup lang="ts">
import type { ButtonGroupProps } from './types';
import { provide, reactive, toRef } from "vue";
import { BUTTON_GROUP_CTX_KEY } from "./contants";

defineOptions({
  name: 'RaButtonGroup',
})
const props = defineProps<ButtonGroupProps>();

provide(
  BUTTON_GROUP_CTX_KEY,
  reactive({
    size: toRef(props, "size"),
    type: toRef(props, "type"),
    disabled: toRef(props, "disabled"),
  })
);
</script>

<template>
  <div class="ra-button-group">
    <slot></slot>
  </div>
</template>

<style scoped>
@import './style.css';
</style>