<template>
  <div class="dragResizeBox">
    <canvas id="canvasbgc" width="2500" height="1800"></canvas>
    <div ref="wrapperPannel" class="wrapperPannel">
      <div ref="wrapper" class="wrapper">
        <img
          id="image"
          src="https://phpimg.ziroom.com/c6eded76-6745-48d1-b0db-7d4a6e42ba94.jpg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import _ from 'lodash'
import { ref, getCurrentInstance, onMounted, nextTick, watch } from 'vue'
import { dragResize } from "./dragResize";
import { drawGrid } from "@/utils/canvasBgc";

let wrapperPannel: any = ref(null)
let wrapper: any = ref(null)

const DragResize: any = ref(null)

nextTick(() => {
  const image: any = document.getElementById('image');
  drawGrid('canvasbgc', { c1: '#303133', c2: '#333333' })
  image.addEventListener('load', function () {
    let imgSize: any = getImgSize(image.naturalWidth, image.naturalHeight, window.innerWidth, window.innerHeight);
    DragResize.value = new dragResize({
      wrapperPannel: wrapperPannel.value,
      wrapper: wrapper.value,
      isSelf: true,
    })
  });

})


/**
    * 获取图片缩放尺寸
    * @param {number} naturalWidth 
    * @param {number} naturalHeight 
    * @param {number} maxWidth 
    * @param {number} maxHeight 
    * @returns 
    */
const getImgSize = (naturalWidth, naturalHeight, maxWidth, maxHeight) => {
  const imgRatio = naturalWidth / naturalHeight;
  const maxRatio = maxWidth / maxHeight;
  let width, height;
  // 如果图片实际宽高比例 >= 显示宽高比例
  if (imgRatio >= maxRatio) {
    if (naturalWidth > maxWidth) {
      width = maxWidth;
      height = maxWidth / naturalWidth * naturalHeight;
    } else {
      width = naturalWidth;
      height = naturalHeight;
    }
  } else {
    if (naturalHeight > maxHeight) {
      width = maxHeight / naturalHeight * naturalWidth;
      height = maxHeight;
    } else {
      width = naturalWidth;
      height = naturalHeight;
    }
  }
  return { width: width, height: height }
}


</script>
<style lang="scss" scoped>
.dragResizeBox {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.wrapperPannel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrapper {
  width: 40%;
  user-select: none;
}
.wrapper > img {
  width: 100%;
  display: block;
  height: auto;
}

#canvasbgc {
  position: relative;
  top: 0;
  left: 0;
}
</style>