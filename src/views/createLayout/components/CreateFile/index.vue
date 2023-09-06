<template>
  <DialogTem
    ref="dialogTemRef"
    @updateVisible="updateVisible"
    @handleConfirm="handleConfirm"
  >
    <div>
      <el-tree
        ref="treeRef"
        default-expand-all
        :data="fileList"
        node-key="id"
        :props="defaultProps"
        highlight-current
      >
        <template #default="{ node, data }">
          <span class="tree-node" :title="node.label">
            <el-icon
              v-if="data.type === 'file'"
              :size="18"
              class="tree-node-icon"
            >
              <Folder />
            </el-icon>
            <el-icon v-else :size="18" class="tree-node-icon" color="#1aa064">
              <Document />
            </el-icon>
            <span
              >{{ node.label }}
              <span style="color: #0c8e54">{{
                data.type === "page" ? ".vue" : ""
              }}</span></span
            >
          </span>
        </template>
      </el-tree>
    </div>
  </DialogTem>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { ref, getCurrentInstance, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useSchemaStore } from '@/store/schema'
import { Folder, Tickets, Document } from '@element-plus/icons-vue'
import { getCode } from "../../utils/generator";
import { generateID } from "@/utils/generateID";
const useSchema = useSchemaStore()
const { proxy } = getCurrentInstance() as any;


let defaultProps = ref({
  children: 'children',
  label: 'name',
})
let fileList: any = ref([])
const init = () => {
  console.log(useSchema.pageList);
  let files: any = {
    id: generateID(),
    type: 'file',
    name: 'defaultNmae',
    children: []
  }
  let components: any = {
    id: generateID(),
    type: 'file',
    name: 'components',
    children: []
  }
  files.children.push(components)
  useSchema.pageList.map((item: any) => {
    let { state, data } = getCode(item)
    if (state !== 'ok') {
      proxy.$message({
        message: `"${item.name}" 布局有缺失空间，请补齐`,
        type: 'warning'
      });
      data = {}
    }
    let code = {
      page: [data.html, data.js, data.css].join('\n'),
      datajs: data.datajs
    }
    if (item.config.type === 'index') {
      files.name = item.config.data.temFileName
      let page = {
        id: generateID(),
        type: 'page',
        name: 'index',
        config: item.config.data,
        codes: code
      }
      files.children.push(page)
    } else if (item.config.type === 'dialog') {
      let dialog = {
        id: generateID(),
        type: 'file',
        name: item.config.data.temFileName,
        children: [
          {
            id: generateID(),
            type: 'page',
            name: 'index',
            config: item.config.data,
            codes: code
          }
        ]
      }
      components.children.push(dialog)
    }
  })
  console.log(files);
  fileList.value = [files]
}

let dialogTemRef: any = ref(null)

//ife
const handleConfirm = () => {
  // window.parent.postMessage(
  //   {
  //     cmd: "writeFile",
  //     data: fileList.value,
  //   },
  //   "*"
  // );
  //生成文件
  window.parent.postMessage(
    {
      cmd: "writeFile",
      data: _.cloneDeep(fileList.value),
    },
    "*"
  );
  dialogTemRef.value.handleClose()
}

const updateVisible = (val) => {
  if (val) {
    init()
  }
}

</script>

<style lang="scss" scoped>
.tree-node {
  display: flex;
  align-items: center;
  .tree-node-icon {
    margin-top: 2px;
    margin-right: 6px;
  }
}
</style>