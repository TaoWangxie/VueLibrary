<template>
  <div class="side-bar">
    <el-menu
      :default-openeds="openMenuIndexList"
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
    >
      <el-sub-menu
        v-for="(menu, index) in menuList"
        :key="index"
        :index="menu.name"
      >
        <template #title>
          <span>{{ menu.name }}</span>
        </template>
        <el-menu-item
          v-for="menuChild in menu.children"
          :key="menuChild.path"
          :index="menuChild.path"
          @click="menuItemClick(menuChild)"
        >
          {{ menuChild.name }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { ref, getCurrentInstance, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { routes } from '@/router'
import { menuMap } from '@/config/menuMap'
const router = useRouter()
const route = useRoute()

const menuList: any = ref([])
const handleRoutes = (list: any[], arr: any) => {
  list.map((item: any) => {
    let menuItem = {
      name: menuMap[item.name],
      path: item.path,
      children: []
    }
    if (item.children && item.children.length) {
      handleRoutes(item.children, menuItem['children'])
    }
    arr.push(menuItem)
  })
}
handleRoutes(routes, menuList.value)

const openMenuIndexList = menuList.value.map(i => i.name)

let activeIndex = ''
const getActiveIndex = () => {
  activeIndex = route.path
  // 遍历第二层菜单menu， 如果路由包含 path, activeIndex就是该path的
  menuList.value.forEach(menu => {
    menu.children.forEach(subMenu => {
      if (route.path.includes(subMenu.path)) {
        activeIndex = subMenu.path
      }
    })
  })
}
getActiveIndex()

const menuItemClick = item => {
  router.push(item.path)
}




</script>

<style lang="scss" scoped>
.side-bar {
  width: 200px;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  border-right: 1px solid #dcdfe6;
  background-color: #fafafa;
  user-select: none;
  flex-shrink: 0;
}
::v-deep .el-menu {
  border: 0;
}
::v-deep .el-sub-menu__title {
  // border-bottom: 1px solid #dcdfe6;
}
</style>