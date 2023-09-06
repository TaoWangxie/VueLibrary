<template>
  <div class="outBox">
    <div class="innerBox" ref="innerBoxRef">
      <div class="box1"></div>
      <div ref="fixedRef" class="box2"></div>
      <div :class="['box3']" ref="outBoxRef">
        <div :class="['box31']"></div>
      </div>
      <div class="box4"></div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import './puppeteer'
import { ref, getCurrentInstance, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'




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
      height: 100px;
      background-color: #ff44aa;
      // position: sticky;
      top: 0;
      left: 0;
    }
    .box3 {
      height: 300px;
      overflow-y: auto;
      background-color: #33ffdd;
    }
    .box31 {
      width: 50%;
      height: 400px;
      background: linear-gradient(to bottom, #fff 0%, #000 100%);
    }
    .oveh {
      overflow-y: hidden !important;
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
.box5 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background-color: #ff8800;
  z-index: 999;
}
.swiper_container {
  position: relative;
  width: 100%;
  height: 100%;
}
.swiper_box {
  position: relative;
  width: 100%;
  // height: 100%;
}
//=======================
.swiper {
  width: 100%;
}
.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
<style>
.swiper_free_linear > .swiper-free-mode > .swiper-wrapper {
  -webkit-transition-timing-function: linear; /*之前是ease-out*/
  -moz-transition-timing-function: linear;
  -ms-transition-timing-function: linear;
  -o-transition-timing-function: linear;
  transition-timing-function: linear;
  margin: 0 auto;
}
</style>