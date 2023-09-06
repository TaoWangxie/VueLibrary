<template>
  <div class="demo">
    <div class="content pointKey"></div>
    <div class="box2"></div>
    <div class="box3 pointKey"></div>
    <div class="box4 pointKey"></div>
  </div>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { ref, getCurrentInstance, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { numAdd, numSub, numMulti } from '@/utils/index'



onMounted(() => {
  let doms = document.getElementsByClassName('pointKey')
  setBuryingPointObserver(doms)
})

let timeSigns: any = ref({})
let io: any = ref(null)
const setBuryingPointObserver = (doms: any) => {
  io.value = new IntersectionObserver(callback, {
    threshold: [1]
  });
  Array.from(doms).map((dom: any, index) => {
    // 开始观察
    dom.setAttribute('pointKey', `dom${index}`);
    io.value.observe(dom);
  })
  function callback(entries) {
    let key = entries[0].target.getAttribute('pointKey')
    if (entries[0].isIntersecting) {
      timeSigns.value[key] = Date.now()
      setTimeout(() => {
        if (Object.keys(timeSigns.value).includes(key)) {
          console.log('埋点：', key);
        } else {
          console.log('无：', key);
        }
      }, 2000)
    } else {
      if (Object.keys(timeSigns.value).includes(key)) {
        delete timeSigns.value[key]
      }
    }
  }
}





onBeforeUnmount(() => {
  io.value && io.value.disconnect();
})



</script>

<style scoped>
.demo {
  width: 100%;
  height: 100%;
}
.content {
  width: 100%;
  height: 800px;
  background-color: #eee;
}
.box2 {
  width: 100%;
  height: 300px;
  background-color: red;
}
.box3 {
  width: 100%;
  height: 400px;
  background-color: blue;
}
.box4 {
  width: 100%;
  height: 400px;
  background-color: #ccc;
}
</style>