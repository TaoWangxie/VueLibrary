
<template>
  <div ref="el" class="chart" />
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { ref, onBeforeUnmount, onMounted, watch, markRaw, useAttrs, PropType, toRefs } from 'vue'
import * as echarts from 'echarts';

const props = defineProps({
  autoResize: {
    type: Boolean,
    default: true
  },
  chartOption: {
    type: Object as PropType<echarts.EChartsCoreOption>,
    default: () => ({})
  }
});
const { autoResize, chartOption } = toRefs(props);


let el: any = ref(null)
let chart: any = ref(null)

watch(
  chartOption,
  () => {
    setOptions(chartOption.value);
  }, { deep: true }
);

onMounted(() => {
  initData()
})
onBeforeUnmount(() => {
  if (!chart.value) {
    return
  }
  autoResize.value && window.removeEventListener('resize', resizeHandler)
  chart.value.dispose()
  chart.value = null
})

/**
 * vue3中使用proxy的方式监听响应式，chart会被在vue内部转换成响应式对象，从而在resize 的时候获取不到 
 * markRow：作用:标记一个对象,使其永远不会再成为响应式对象
 */
const initData = () => {
  chart.value = markRaw(echarts.init(el.value));
  setOptions(chartOption.value);
  autoResize.value && window.addEventListener("resize", resizeHandler);
  initEvent()// 添加事件支持
}
//设置参数
const setOptions = (option: echarts.EChartsCoreOption) => {
  // clearChart()
  // resizeHandler()
  if (chart.value) {
    chart.value.setOption(option)
  }
}
//刷新
const refresh = () => {
  setOptions(chartOption.value)
}
//清空画布
const clearChart = () => {
  chart.value && chart.value.clear()
}
//尺寸响应式
let timer: any = ref(null)
const resizeHandler = () => {
  clearTimeout(timer.value);
  timer.value = setTimeout(() => {
    chart.value.resize();
  }, 200);
}

/**
 * 初始化事件,按需绑定事件
 */
const attrs = useAttrs();
const initEvent = () => {
  Object.keys(attrs).forEach(attrKey => {
    if (/^on/.test(attrKey)) {
      const cb = attrs[attrKey];
      attrKey = attrKey.replace(/^on(Chart)?/, "");
      attrKey = `${attrKey[0]}${attrKey.substring(1)}`;
      console.log(attrKey)
      typeof cb === "function" && chart.value?.on(attrKey, cb as () => void);
    }
  });
};

defineExpose({
  $chart: chart,
  refresh
});


</script>
<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>