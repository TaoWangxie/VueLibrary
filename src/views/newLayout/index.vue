<template>
  <div :class="['createLayout']" id="createLayout">
    <Header></Header>
    <div class="container flex">
      <div class="side">
        <Left></Left>
      </div>
      <div class="content"></div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { ref, getCurrentInstance, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import Left from "@/views/createLayout/components/Left/index.vue";



</script>

<style lang="scss" scoped>
.createLayout {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  .container {
    width: 100%;
    height: calc(100% - 40px);
  }
  .side {
    width: 240px;
    flex-shrink: 0;
  }
  .content {
    flex: 1;
  }
}
.flex {
  display: flex;
}
</style>