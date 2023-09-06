<!-- <template>
  <div class="outBox" ref="outBoxRef">
    <div class="innerBox" ref="innerBoxRef">
      <div class="box1"></div>
      <div ref="fixedRef" class="box2" :class="fixed ? 'issFixed' : ''"></div>
      <div class="box3"></div>
      <div class="box4"></div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { ref, getCurrentInstance, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'


let fixed: any = ref(0)
let offsetTop = ref(0)
let fixedRef: any = ref(null)
let outBoxRef: any = ref(null)

onMounted(() => {
  nextTick(() => {
    // 吸顶元素到top的距离
    offsetTop.value = fixedRef.value.offsetTop;
    console.log(offsetTop.value);
    // 监听滚动条
    outBoxRef.value.addEventListener("scroll", (e) => handleScroll(e));
  })
})
onBeforeUnmount(() => {
  outBoxRef.value.removeEventListener('scroll', handleScroll);
})


const handleScroll = (e?: any) => {
  let scrollTop = e.target.scrollTop;
  fixed.value = scrollTop > offsetTop.value;
}

</script>

<style lang="scss" scoped>
.outBox {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  .innerBox {
    .box1 {
      height: 300px;
      background-color: #aaaaaa;
    }
    .box2 {
      height: 200px;
      background-color: #ff44aa;
    }
    .box3 {
      height: 500px;
      background-color: #33ffdd;
    }
    .box4 {
      height: 500px;
      background-color: #5599ff;
    }
  }
}
.issFixed {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 4;
}
</style> -->
<template>
  <div class="demo">
    <div></div>
    <canvas ref="canvas" width="300" height="300"></canvas>
  </div>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { ref, getCurrentInstance, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'

let canvas: any = ref(null)
const x0 = 150; // 圆心坐标
const y0 = 150;// 圆心坐标
const r1 = 150; // 外圆半径
const startAng = 315; // 起始角度

console.log((Math.PI / 180) * 45);

let base = 0.8 / (Math.PI / 180)

console.log(base);

console.log(Math.sin(base));
console.log(Math.cos(base));

let y = Math.sin(base * (Math.PI / 180)) * 10
let x = Math.cos(base * (Math.PI / 180)) * 10

console.log(x, y);
// let jiao = 


onMounted(() => {
  deaw()
})
const deaw = () => {

  // 获取到屏幕倒是是几倍屏。
  // 开始画点
  let ctx = canvas.value.getContext("2d");
  // 默认背景圆
  ctx.beginPath();
  var blueAng = startAng + 10; // 这里的value是可以根据信用分控制的
  ctx.beginPath();
  ctx.arc(x0, y0, r1, (Math.PI / 180) * startAng, (Math.PI / 180) * blueAng, false);
  var linearGradient = ctx.createLinearGradient(150, 150, 150 + x, 150 + y);
  linearGradient.addColorStop(0, '#00000086');
  linearGradient.addColorStop(1, '#00000000');
  ctx.strokeStyle = linearGradient;
  ctx.lineWidth = 10;
  // ctx.lineCap = 'round'; // 线的末端设置
  ctx.stroke();

}

const handleclick = () => {
  deaw()
}





</script>

<style lang="scss" scoped>
.demo {
  position: relative;
  color: yellow;
  position: relative;
  width: 300px;
  height: 300px;
  div {
    width: 150px;
    height: 150px;
    position: absolute;
    top: 0;
    left: 150px;
    border-bottom: 1px solid red;
    border-left: 1px solid red;
  }
}
canvas {
  background-color: #ccc;
}
</style>