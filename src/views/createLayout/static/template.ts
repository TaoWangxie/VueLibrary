export const tem_html = (code: any) => {
  return `<template>
${code}
</template>`
}

export const tem_js = (code: any) => {
  return `<script setup lang='ts'>
import _ from 'lodash';
import { ref, getCurrentInstance, shallowReactive, onMounted, nextTick, watch } from 'vue';
${code}

</script>`
}

export const tem_css = (code: any) => {
  return `<style lang="scss" scoped>
${code}
</style>`
}

export const tem_dialog_html = (code: any) => {
  return `<template>
<DialogTem @updateVisible="updateVisible" @handleConfirm="handleConfirm">
${code}
</DialogTem>
</template>`
}

export const tem_dialog_js = (code: any) => {
  return `<script setup lang='ts'>
import _ from 'lodash';
import { ref, getCurrentInstance, shallowReactive, nextTick, watch } from 'vue';
${code}

const updateVisible = (visible:any) => {};
const handleConfirm = () => {};

</script>`
}