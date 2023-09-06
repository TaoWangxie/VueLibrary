<template>
  <div class="Left">
    <el-scrollbar class="scrollbar">
      <GridBox :list="COMLIST" :imglist="IMGLIST"> </GridBox>
    </el-scrollbar>
  </div>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import GridBox from "./components/GridBox/index.vue";
import { COMLIST, IMGLIST } from "../../static/comConfigs";



</script>

<style lang="scss" scoped>
.Left {
  display: flex;
  position: relative;
  height: 100%;
  background-color: #fff;
  border-right: 1px solid #e4e7ed;
  .scrollbar {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>