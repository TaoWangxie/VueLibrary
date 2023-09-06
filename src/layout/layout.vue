<template>
  <div class="layout">
    <!--顶部导航-->
    <navBar></navBar>
    <div class="container">
      <!--左侧导航-->
      <sideBar></sideBar>
      <div class="main">
        <!--主主体-->
        <div class="content">
          <router-view v-slot="{ Component }">
            <transition name="el-fade-in" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { ref, getCurrentInstance, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import navBar from './components/navBar.vue'
import sideBar from './components/sideBar.vue'




</script>


<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  .container {
    display: flex;
    height: calc(100vh - 50px);
    overflow: hidden;
    .main {
      flex: 1;
      width: 0;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background-color: #ebedf0;
      .content {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: auto;
        border-radius: 4px;
      }
    }
  }
}
</style>
