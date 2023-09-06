<template>
  <el-drawer
    :model-value="visible"
    :with-header="false"
    :closeOnClickModal="true"
    size="70%"
    append-to-body
    :destroy-on-close="true"
    @close="handleClose"
    custom-class="drawer_box"
  >
    <div
      class="uploadBox"
      id="uploadBox"
      v-loading="loading"
      element-loading-text="正在上传..."
      element-loading-background="rgba(122, 122, 122, 0.8)"
    >
      <template v-if="src">
        <div class="close_btn" @click="clear">
          <el-icon><Close /></el-icon>
        </div>
        <dragResizeBox :src="src" :key="src" :isSelf="true"></dragResizeBox>
        <div v-if="src" class="updateBtn" @click="save">
          <el-tooltip effect="light" content="上传图片" placement="top">
            <el-icon :size="56" color="#f6478f"><UploadFilled /></el-icon>
          </el-tooltip>
        </div>
      </template>
      <div v-show="!src">
        <canvas
          id="canvasId"
          class="canvasCla"
          :width="w"
          height="1800"
        ></canvas>
        <div
          :class="['animation_box', isDropStart ? 'animation_active' : '']"
        ></div>
        <div id="uploadArea" :class="['uploadArea']">
          <div
            v-if="!isDropStart"
            @mouseenter="isHover = true"
            @mouseleave="isHover = false"
            :class="['clickBox', isHover ? 'clickBox_active' : '']"
            @click.stop="uploadClick"
          >
            拖拽 or <span>Ctrl+v</span> 粘贴
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { ref, onMounted, nextTick, watch } from 'vue'
import { Close, UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { drawGrid } from "@/utils/canvasBgc";
import { hasFileUpload, uploadjsFn, validate } from '../../uploadJs'
import { listenFilePaste } from '../../listenFilePaste'
import { listenFileDrag } from '../../listenFileDrag'
import dragResizeBox from '@/views/dragResizeBox2/index.vue'

interface Props {
  visible: boolean,
  w: any
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  w: 2500
})

//URL
let URL: any = ref(null)
// 加载
const loading = ref(false)
//btn是否悬浮
let isHover = ref(false)
//拖拽进入区域
let isDropStart = ref(false)
//图片地址
let src: any = ref('')
//文件
let fileVal: any = ref('')

// ctrl+v 粘贴监听参数 
let pasteParams = {
  id: '#uploadBox',
  callBack: (file) => {
    //validate()...... 不是图片不能赋值src
    let params = {
      message: ElMessage,
      acceptExtensions: ['png', 'jpg', 'jpeg', 'webp'],
    }
    validate(file, params).then(() => {
      src.value = URL.value.createObjectURL(file);
      fileVal.value = file
    }).catch((e) => {
      console.error(e);
    })
  }
}
// 鼠标拖拽监听参数
let dragParams = {
  id: '#uploadArea',
  callBack: (file) => {
    //validate()...... 不是图片不能赋值src
    let params = {
      message: ElMessage,
      acceptExtensions: ['png', 'jpg', 'jpeg', 'webp'],
    }
    validate(file, params).then(() => {
      src.value = URL.value.createObjectURL(file);
      fileVal.value = file
    }).catch((e) => {
      console.error(e);
      isDropStart.value = false
    })
  },
  getStatus: (status) => {
    let { code, msg } = status
    if (code === 'enter') {
      !isDropStart.value && (isDropStart.value = true)
    } else {
      isDropStart.value && (isDropStart.value = false)
    }
  }
}
// 点击上传参数
let clickParams = {
  message: ElMessage,
  acceptExtensions: ['png', 'jpg', 'jpeg', 'webp'],
  callBack: (data: any) => { //上传成功回调
    let { file } = data
    src.value = URL.value.createObjectURL(file);
    fileVal.value = file
  }
}
// 上传七牛云参数
let uploadParams = {
  message: ElMessage,
  acceptExtensions: ['png', 'jpg', 'jpeg', 'webp'],
  callBack: (data: any) => { //上传成功回调
    src.value = data.path
    emits('updateData', src.value)
  },
  getStatus: (status) => { //获取上传状态
    let { code, msg } = status
    if (code === 0) {
      loading.value = true
    } else {
      loading.value = false
    }
    isDropStart.value = false
  }
}

// function====================================

//点击上传
const uploadClick = () => {
  console.log(7777);
  isHover.value = false
  uploadjsFn(clickParams, true)
}
//上传七牛云
const save = () => {
  hasFileUpload({ file: fileVal.value, ...uploadParams })
}
//清除图片
const clear = () => {
  src.value = ''
  fileVal.value = ''
  isDropStart.value = false
}
//watch
watch(() => src.value, (val: boolean) => {
  !val && clear()
})

//关闭弹窗================
const emits = defineEmits(["update:visible", 'updateData'])
watch(() => props.visible, async (val: boolean) => {
  if (val) {
    clear()
    URL.value = window.URL || window.webkitURL;
    nextTick(() => {
      drawGrid('canvasId', { c1: '#303133', c2: '#333333' })
      listenFilePaste(pasteParams)
      listenFileDrag(dragParams)
    })
  }
})
const handleClose = () => {
  emits("update:visible", false);
};

</script>
<style lang="scss" scoped>
.uploadBox {
  position: relative;
  overflow: hidden;
  height: 100%;
  box-sizing: border-box;
}
.updateBtn {
  position: absolute;
  right: 40px;
  bottom: 20px;
  &:hover {
    cursor: pointer;
  }
}

.uploadArea {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  .clickBox {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px;
    font-size: 15px;
    border: 2px dashed #f6478f;
    border-radius: 6px;
    transition: all 0.2s;
    color: #fff;
    user-select: none;
    &:hover {
      cursor: pointer;
    }
    span {
      color: #f6478f;
      font-weight: bold;
      padding: 0 10px;
    }
  }
  .clickBox_active {
    padding: 80px !important;
  }
}
.animation_box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.85);
  width: 100%;
  height: 100%;
  border: 2px dashed #f6478f;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 10px;
  opacity: 0;
  transition: all 0.2s;
}
.animation_active {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.96) !important;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 1;
}

#canvasbgc {
  position: relative;
  top: 0;
  left: 0;
}
.close_btn {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 32px;
  color: #fff;
  z-index: 1;
  &:hover {
    cursor: pointer;
    color: #f6478f;
  }
}
</style>
<style lang="scss">
.drawer_box > .el-drawer__body {
  padding: 0 !important;
}
</style>