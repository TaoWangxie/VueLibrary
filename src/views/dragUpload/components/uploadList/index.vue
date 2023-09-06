<template>
  <div class="update_box">
    <div class="gridTag_box">
      <div
        v-for="(item, index) in imgList"
        class="gridTag_Item"
        :style="{ width: `${100 / gridNum}%` }"
        :key="index"
        @mouseenter="mouseenter(index)"
        @mouseleave="mouseleave"
      >
        <div class="innerbox">
          <el-image
            class="imgBox"
            :src="item"
            :zoom-rate="1.2"
            :preview-src-list="imgList"
            :initial-index="imgIndex"
            fit="contain"
            @close="imgIndex = null"
          >
            <template #error>
              <div class="image-slot">
                <el-icon><icon-picture /></el-icon>
              </div>
            </template>
          </el-image>
          <div v-if="index == imgIndex" class="btn_box">
            <div class="btn delete" @click.stop="deleteFile(index)">
              <el-icon :size="16">
                <Close />
              </el-icon>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="!isHide"
        class="gridTag_Item"
        :style="{ width: `${100 / gridNum}%` }"
        @click="updateFile"
      >
        <div class="innerbox">
          <div class="updateBtn">
            <el-icon :size="34">
              <UploadFilled />
            </el-icon>
          </div>
        </div>
      </div>
      <div v-if="isHide && !imgList.length" class="noData">暂无数据</div>
    </div>
  </div>
  <uploadBox v-model:visible="visible" @updateData="getSrc" :w="w"></uploadBox>
</template>
 
<script setup lang='ts'>
import _ from 'lodash'
import { ref, nextTick, watch } from 'vue'
import { Close, UploadFilled } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import uploadBox from '../uploadBox/index.vue'

//props
interface Props {
  list: any, //图片列表
  isHide: any,
  gridNum: number,
  w: any
}
const props = withDefaults(defineProps<Props>(), {
  list: [],
  isHide: false,
  gridNum: 3,
  w: 2500
})

let imgList: any = props.list ? ref(_.cloneDeep(props.list)) : ref([])
let imgUrl: any = ref('')

//watch
watch(() => imgList.value,
  (val) => {
    console.log(val);
    emits('updateData', val)
  },
  { deep: true }
);

//上传
let visible = ref(false)
let isUpdate: any = ref(false)
const updateFile = () => {
  isUpdate.value = true
  visible.value = true
}
//删除
const deleteFile = (index: any) => {
  imgList.value.splice(index, 1)
}


const getSrc = (val: any) => {
  visible.value = false
  imgList.value.push(val)
}

//下标
let imgIndex: any = ref(null)
const mouseenter = (index: any) => {
  imgIndex.value = index
}
const mouseleave = () => {
  imgIndex.value = null
}




const emits = defineEmits(['updateData']);
defineExpose({
})
 </script>
 

 <style lang="scss" scoped>
.update_box {
  width: 100%;
}
.gridTag_box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: auto;
  padding-top: 10px;
  padding-left: 10px;
  background-color: #f2f6fc;
  .gridTag_Item {
    background-color: #f2f6fc;
    border-radius: 4px;
    padding-right: 10px;
    padding-bottom: 10px;
    box-sizing: border-box;
    .innerbox {
      position: relative;
      display: flex;
      height: 130px;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      .imgBox {
        display: flex;
        align-items: center;
        justify-content: center;
        max-height: 100%;
        max-width: 100%;
      }
    }
  }
  .updateBtn {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    border: 2px dashed #f2f6fc;
    &:hover {
      cursor: pointer;
      color: #f6478f;
      border: 2px dashed #f6478f;
    }
  }
  .btn_box {
    position: absolute;
    // width: 100%;
    top: 0;
    right: 0;
    padding: 5px;
    display: flex;
    justify-content: flex-end;
  }
  .btn {
    width: 24px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    color: #fff;
    // &:hover {
    //   color: #f6478f;
    // }
  }
}
.noData {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  justify-content: center;
  font-size: 13px;
  color: #909399;
}
</style>
 <style>
.update_box .fade-enter-active,
.fade-leave-active {
  transition: all 3s;
}
</style>