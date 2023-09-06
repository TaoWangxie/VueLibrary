<template>
  <div class="outBox" ref="outBoxRef">
    <div class="innerBox" ref="innerBoxRef">
      <div class="box1"></div>
      <div class="box2 pointKey"></div>
      <div class="box3">
        <div :class="['swiper_container']">
          <swiper
            ref="mySwiper"
            v-bind="configInfo"
            :modules="modules"
            class="swiper_box"
            @swiper="setControlledSwiper"
          >
            <swiper-slide v-for="(item, index) in slide" :key="index">
              <img :src="item.src" alt="" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div class="box4"></div>
    </div>
    <div class="box5" v-if="isShow"></div>
  </div>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { ref, getCurrentInstance, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";

import { Autoplay, FreeMode, EffectCube, EffectCards } from "swiper";
const modules = ref([Autoplay, FreeMode, EffectCube, EffectCards])

let configInfo = {
  slidesPerView: 1,
  loop: false,
  freeMode: false
}
let slide = [
  {
    src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    link: '11'
  },
  {
    src: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    link: '22'
  },
]

let controlledSwiper: any = ref(null)
let mySwiper: any = ref(null)
const setControlledSwiper = (swiper) => {
  controlledSwiper.value = swiper
}

let isShow = ref(false)

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
      if (Object.keys(timeSigns.value).includes(key)) {
        console.log('隐藏');
        isShow.value = false
      }
    } else {
      if (Object.keys(timeSigns.value).includes(key)) {
        console.log('显示');
        isShow.value = true
        delete timeSigns.value[key]
      }
    }
  }
}

//========================================
// let fixed: any = ref(0)
// let offsetTop = ref(0)
// let fixedRef: any = ref(null)
// let outBoxRef: any = ref(null)

// onMounted(() => {
//   nextTick(() => {
//     // 吸顶元素到top的距离
//     offsetTop.value = fixedRef.value.offsetTop;
//     console.log(offsetTop.value);
//     // 监听滚动条
//     outBoxRef.value.addEventListener("scroll", (e) => handleScroll(e));
//   })
// })
// onBeforeUnmount(() => {
//   outBoxRef.value.removeEventListener('scroll', handleScroll);
// })
// const handleScroll = (e?: any) => {
//   let scrollTop = e.target.scrollTop;
//   fixed.value = scrollTop > offsetTop.value;
// }

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