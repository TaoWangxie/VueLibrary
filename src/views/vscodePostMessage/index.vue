<template>
  <div class="demo">
    <el-button type="primary" @click="handleClick">vscode通讯测试</el-button>
  </div>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { ref, getCurrentInstance, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'


//ife
const handleClick = () => {
  window.parent.postMessage(
    {
      cmd: "test",
      data: 'vscode通讯测试',
    },
    "*"
  );
}



</script>

<style lang="scss" scoped>
.demo {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
}
</style>