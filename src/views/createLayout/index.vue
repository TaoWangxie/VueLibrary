<template>
  <div :class="['createLayout']" id="createLayout">
    <Header></Header>
    <div class="container flex">
      <div class="side">
        <Left></Left>
      </div>
      <div class="content">
        <PageTab></PageTab>
        <ActionBar></ActionBar>
        <Main></Main>
      </div>
      <dargBox :initLength="380" dragPos="right">
        <Right></Right>
      </dargBox>
    </div>
  </div>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { ref, onMounted, getCurrentInstance, nextTick, watch } from 'vue'
import Left from "./components/Left/index.vue";
import Right from "./components/Right/index.vue";
import Header from "./components/Header/index.vue";
import ActionBar from "./components/ActionBar/index.vue";
import PageTab from "./components/PageTab/index.vue";
import Main from "./components/Main/index.vue";
import dargBox from '@/views/dragDrawer/dargBox/index.vue'
import { useSchemaStore } from '@/store/schema'
const useSchema = useSchemaStore()


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