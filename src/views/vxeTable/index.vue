<template>
  <vxe-button
    status="primary"
    content="临时新增"
    @click="insertEvent()"
  ></vxe-button>
  <vxe-button status="primary" content="保存" @click="save"></vxe-button>
  <vxe-table
    show-overflow
    keep-source
    ref="xTable"
    :row-config="{ keyField: 'curId' }"
    :column-config="{ resizable: true }"
    :print-config="{}"
    :export-config="{}"
    :tree-config="demo1.treeConfig"
    :edit-config="{ trigger: 'click', mode: 'row' }"
    :data="demo1.tableData"
  >
    >
    <vxe-column field="name" title="Name" :edit-render="{}" tree-node>
      <template #edit="{ row }">
        <vxe-input v-model="row.name" type="text"></vxe-input>
      </template>
    </vxe-column>
    <vxe-column title="操作" width="240">
      <template #default="{ row }">
        <vxe-button
          status="warning"
          content="删除"
          @click="removeRowEvent(row)"
        ></vxe-button>
        <vxe-button
          status="warning"
          content="新增"
          @click="insertRow(row, 'bottom')"
        ></vxe-button>
      </template>
    </vxe-column>
  </vxe-table>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { ref, getCurrentInstance, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'

let demo1 = ref(
  {
    validRules: {
      name: [
        { required: true, message: '名称必须填写' }
      ]
    },
    tableData: [],
    treeConfig: {
      transform: true,
      rowField: 'curId',
      parentField: 'parentId'
    }
  }
)
let tableData: any = ref([])

const xTable: any = ref(null)

const insertEvent = async () => {
  const $table = xTable.value
  const date = new Date()
  const record = {
    name: '新数据',
    curId: Date.now(),
    parentId: null,
  }
  const { row: newRow } = await $table.insert(record)
  await $table.setEditRow(newRow)
}

const insertRow = async (currRow: any, locat: string) => {
  const $table = xTable.value
  const date = new Date()
  // 如果 null 则插入到目标节点顶部
  // 如果 -1 则插入到目标节点底部
  // 如果 row 则有插入到效的目标节点该行的位置
  if (locat === 'bottom') {
    const record = {
      name: '新数据',
      curId: Date.now(),
      parentId: currRow.curId,
    }
    const { row: newRow } = await $table.insertAt(record, -1)
    await $table.setTreeExpand(currRow, true) // 将父节点展开
    await $table.setEditRow(newRow) // 插入子节点
  }
}


const removeRowEvent = async (row: any) => {
  const $table = xTable.value
  await $table.remove(row)
}

const save = () => {
  const $table = xTable.value
  const insertRecords = $table.getInsertRecords()
  console.log(insertRecords);
  let arr = insertRecords.filter((item) => {
    return !item.parentId
  })
  console.log(arr);
}

</script>

<style lang="scss" scoped>
.btn_box {
}
</style>