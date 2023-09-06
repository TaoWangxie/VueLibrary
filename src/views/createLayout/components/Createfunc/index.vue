<template>
  <el-dialog
    :model-value="visible"
    :title="'配置动作'"
    append-to-body
    destroy-on-close
    draggable
    :close-on-click-modal="false"
    width="70%"
    @close="handleClose"
    top="12vh"
  >
    <div class="CreateFunc">
      <div class="btn_box">
        <el-button type="primary" size="small" @click="addTable()"
          >添加</el-button
        >
      </div>
      <div class="table_box">
        <Etable
          ref="etable"
          :data="tableData.data"
          :columns="tableData.columns"
          :listTypeInfo="tableData.listTypeInfo"
          :hideConfig="tableData.hideConfig"
          :pagination="tableData.page"
          :choose-type="tableData.chooseType"
          :rowKey="tableData.rowKey"
          :columnTooltip="false"
        >
          <template #operate="{ scope }">
            <div class="operate_box">
              <el-button
                type="danger"
                link
                size="small"
                @click="handlerDelete(scope.$index)"
                >删除</el-button
              >
            </div>
          </template>
        </Etable>
      </div>
    </div>
    <template #footer>
      <div class="submit_box">
        <el-button type="primary" @click="handlerSubmit">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import _ from 'lodash'
import { ref, getCurrentInstance, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { tableInfo } from './data/index'
import { useSchemaStore } from '@/store/schema'
const useSchema = useSchemaStore()

//props
interface Props {
  visible: any;
  type: string;
  data: any;
  field: any;
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  type: 'BtnBox',
  data: () => [],
  field: () => { }
})

let tableData: any = ref(tableInfo(props.type))
//关闭弹窗================
const emits = defineEmits(["update:visible", "refreshList"]);
watch(() => props.visible, (val: boolean) => {
  if (val) {
    console.log(props.data);
    console.log(props.field);
    tableData.value = tableInfo(props.type)
    tableData.value.data = _.cloneDeep(useSchema.curGrid.config.funcList)
    tableData.value.listTypeInfo.connectedList = useSchema.funcList

    init()
  }
})
const handleClose = () => {
  emits("update:visible", false);
};


const init = () => {
  if (props.type === 'Form') {
    let arr = tableData.value.data.map((item) => item.code)
    console.log(arr);
    if (!arr.includes(props.field.prop)) {
      tableData.value.data.push({
        code: props.field.prop,
        remark: '',
        hide: [],
        show: []
      })
    }
    let arr2 = _.cloneDeep(props.data).filter((item: any) => item.prop !== props.field.prop)
    tableData.value.listTypeInfo.hideList = arr2
    tableData.value.listTypeInfo.showList = arr2
  }
}

const addTable = () => {
  switch (props.type) {
    case 'BtnBox':
      tableData.value.data.push({
        code: '',
        remark: '',
        connected: ''
      })
      break;
    case 'Form':
      tableData.value.data.push({
        code: '',
        remark: '',
        hide: [],
        show: []
      })
      break;
    default:
      break;
  }

}
//删除
const handlerDelete = (index: any) => {
  tableData.value.data.splice(index, 1)
}
//提交
const btnLoading = ref(false)
const handlerSubmit = async () => {
  useSchema.setData('curGrid', tableData.value.data, 'config.funcList')
  console.log(useSchema.sourceData);
  handleClose()
}


</script>
<style lang="scss" scoped>
.CreateFunc {
  padding: 0 20px;
  .btn_box {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 6px;
    .el-button + .el-button {
      margin-left: 0;
    }
  }
  .table_box {
    height: 280px;
  }
}
</style>