<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>
<style lang="scss">
html,
body {
  position: relative;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
  height: 100%;
  overflow: hidden;
}

// 滚动条的宽度
*::-webkit-scrollbar {
  display: block;
  width: 8px; // 横向滚动条
  height: 8px; // 纵向滚动条 必写
}

// 滚动条的滑块
*::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 4px;
}
</style>
