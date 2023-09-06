<template>
  <div class="pdfpptx_box">
    <el-button size="small" @click="handleClick()"> 下载 </el-button>
  </div>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { ref, getCurrentInstance, onMounted, nextTick, watch } from 'vue'
// import pptxgenjs from '@/pptxgenjs'


const handleClick = () => {
  // const ppt = new pptxgenjs()
  // console.log(ppt);
  // let slide = pres.addSlide();
  // slide.addText("Hello World from PptxGenJS...", {
  //   x: 1.5,
  //   y: 1.5,
  //   color: "363636",
  //   fill: { color: "F1F1F1" },
  //   align: pres.AlignH.center,
  // });
  // pres.writeFile({ fileName: "Sample Presentation.pptx" });
}



</script>
<style lang="scss" scoped>
.pdfpptx_box {
}
</style>