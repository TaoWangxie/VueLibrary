<template>
  <div class="dragResizeBox">
    <canvas id="canvasbgc" width="2500" height="1800"></canvas>
    <div class="wrapperPannel">
      <div class="wrapper">
        <img id="image" :src="src" alt="" />
      </div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { ref, onMounted, nextTick, watch } from 'vue'
import { dragResize } from "./dragResizeJs";
import { drawGrid } from "@/utils/canvasBgc";

interface Props {
  src: string,
  isSelf: any
}
const props = withDefaults(defineProps<Props>(), {
  src: 'https://phpimg.ziroom.com/c6eded76-6745-48d1-b0db-7d4a6e42ba94.jpg',
  isSelf: true
})

const DragResize: any = ref(null)

nextTick(() => {
  const wrapperPannel: any = document.querySelector('.wrapperPannel');
  const wrapper: any = document.querySelector('.wrapper');
  const image: any = document.getElementById('image');
  drawGrid('canvasbgc', { c1: '#303133', c2: '#333333' })
  DragResize.value = new dragResize({
    wrapperPannel: wrapperPannel,
    wrapper: wrapper,
    image: image,
    isSelf: props.isSelf
  })

})



</script>

<style lang="scss" scoped>
.dragResizeBox {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#canvasbgc {
  position: relative;
  top: 0;
  left: 0;
}

.wrapperPannel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.wrapper > img {
  width: 100%;
  display: block;
  height: auto;
}
</style>