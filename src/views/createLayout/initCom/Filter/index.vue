<template>
  <div class="Filter_box">
    <Filter
      v-model:data="configInfo.data"
      :columns="configInfo.columns"
      :list-type-info="configInfo.listTypeInfo"
    ></Filter>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref, getCurrentInstance, watch, computed } from "vue";
const { proxy } = getCurrentInstance() as any

interface Props {
  config?: any,
}
const props = withDefaults(defineProps<Props>(), {
  config: () => { },
})

let configInfo: any = ref({})

//watch
watch(() => props.config, (val) => {
  configInfo.value = val?.data;
}, { deep: true, immediate: true })


</script>

<style lang="scss" scoped>
.Filter_box {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: auto;
}
</style>