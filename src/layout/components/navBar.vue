<template>
  <div class="nav-bar">
    <div class="logo" @click="back">LIBRARY</div>
  </div>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { ref, getCurrentInstance, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'

const back = () => {

}


</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  height: 50px;
  padding: 0 30px;
  border-bottom: 1px solid #dcdfe6;
  box-sizing: border-box;
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: pointer;
  }
}
</style>