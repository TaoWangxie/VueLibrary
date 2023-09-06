<template>
  <div class="echarts_container">
    <div class="line">
      <div class="box1">
        <vcharts
          ref="vchartsRef"
          :chartOption="option"
          @chart-click="handerFn"
        ></vcharts>
      </div>
      <div class="box1">
        <vcharts
          ref="vchartsRef"
          :chartOption="option2"
          @chart-click="handerFn"
        ></vcharts>
      </div>
      <div class="box1">
        <vcharts
          ref="vchartsRef"
          :chartOption="option3"
          @chart-click="handerFn"
        ></vcharts>
      </div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { ref, getCurrentInstance, onMounted, nextTick, watch } from 'vue'
import vcharts from './components/vcharts/index.vue'
import { getCityOption, getCityOption2, getCityOption3 } from './data/index'


let vchartsRef: any = ref(null)


onMounted(() => {
  getOption1()
  getOption2()
  getOption3()
})


let option = ref({})
const getOption1 = () => {
  let data1 = [
    120, 60, 150, 80, 70, 110, 130, 100, 140, 150
  ]
  let data2 = [
    190, 160, 180, 120, 160, 200, 170, 180, 140, 180
  ]
  let citys = ['广州', '苏州', '天津', '杭州', '南京', '成都', '武汉', '深圳', '上海', '北京']
  option.value = getCityOption(data1, data2, citys)
}

let option2: any = ref({})
const getOption2 = () => {
  option2.value = getCityOption2()
}

let option3: any = ref({})
const getOption3 = () => {
  let data1 = [10, 20, 40, 70, 60, 80, 70, 90]
  let data2 = [80, 90, 120, 110, 140, 150, 180, 190]
  let names = ['用户组(前端)', 'CRM组(前端)', '用户组(后端)', 'CRM组(后端)', '用户组(移动端)', '用户组(测试)', 'CRM组(测试)', '通用组(后端)']
  option3.value = getCityOption3(data1, data2, names)
}


const handerFn = () => {
  console.log('8888888');
}

</script>

<style scoped>
.echarts_container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  padding: 15px;
  box-sizing: border-box;
  background-color: #0e0633;
}
.line {
  width: 100%;
  display: flex;
}
.box1 {
  flex: 1;
  height: 400px;
}
</style>