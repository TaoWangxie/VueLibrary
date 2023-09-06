<template>
  <div class="header" @click="changeTheme">
    <div class="logo">🚀 设计器</div>
    <div class="icon">
      🤢 🥶 😡 😈 🤡 🤯 🫥 🦄 🐶 🦩 🦖 🐿 🌈 💊 ⚽ 🥎 ⛱ 🚢 🚒 🚜 🏎 🛵 🦽 🛺 🚁 🛩
      🗽 🗼 🏔 🌏 🍭 🍼 🍔 🌭 🍕 🌮 🍿 🍋 🍌 🍇 🐝 🐸 🦥 🦒 🐒 💥 💔 👾 😎 🫡 😭
      🤩 🫠 😶‍🌫️ 😋
    </div>
  </div>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { Sunny, MoonNight } from '@element-plus/icons-vue'
import { ref, getCurrentInstance, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'


let theme = ref(true)
const changeTheme = () => {
  theme.value = !theme.value
  document.documentElement.style
    .setProperty('--bgc-one', theme.value ? '#ffffff' : 'rgb(40, 40, 40)');
  document.documentElement.style
    .setProperty('--color-one', theme.value ? '#303133' : '#ffffff');
  document.documentElement.style
    .setProperty('--color-two', theme.value ? '#909399' : '#A8ABB2');
}


</script>

<style lang="scss" scoped>
@import "@/assets/css/theme.scss";
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 30px;
  border-bottom: 1px solid $border-one;
  background-color: $bgc-one;
  box-sizing: border-box;
  .logo {
    width: 120px;
    display: flex;
    align-items: center;
    color: $color-one;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 2px;
    cursor: pointer;
    user-select: none;
    flex-shrink: 0;
  }
  .icon {
    flex: 1;
    display: flex;
    align-items: center;
    color: $color-one;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 0.6px;
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>