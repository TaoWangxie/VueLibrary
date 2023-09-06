<template>
  <div class="dragUpload">
    <div class="title">文件上传</div>
    <div class="uploadBtn" @click="update1">上传</div>
    <div class="title mt30">图片上传</div>
    <div class="uploadBtn" @click="update2">上传</div>
    <uploadBox v-model:visible="visible"></uploadBox>
    <div class="title mt30">图片上传列表</div>
    <uploadList :gridNum="6" :w="3000"></uploadList>
  </div>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { ref, getCurrentInstance, onMounted, nextTick, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { uploadjsFn } from './uploadJs'
import uploadBox from './components/uploadBox/index.vue'
import uploadList from './components/uploadList/index.vue'

const update1 = () => {
  let params = {
    message: ElMessage,
    acceptExtensions: ['xlsx'],
    callBack: (data: any) => {
      console.log(data);
    }
  }
  uploadjsFn(params)
}

let visible: any = ref(false)
const update2 = () => {
  visible.value = true
}

</script>
<style lang="scss" scoped>
.dragUpload {
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
}
.title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  padding: 10px 0;
}
.mt30 {
  margin-top: 30px;
}
.uploadBtn {
  width: 100px;
  height: 100px;
  border: 2px dashed #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    border-color: #409eff;
  }
}
</style>