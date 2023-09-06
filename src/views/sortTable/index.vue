<template>
  <div>
    <div class="box">
      <div class="tableBox">
        <Table
          ref="leftTable"
          :data="tableData.data"
          :columns="tableData.columns"
          :hideConfig="tableData.hideConfig"
          :choose-type="tableData.chooseType"
          :rowKey="tableData.rowKey"
          @selfDarg="selfDarg"
          @otherDarg="otherDarg"
        >
        </Table>
      </div>
      <div class="tableBox">
        <Table
          ref="rightTable"
          :data="tableData2.data"
          :columns="tableData2.columns"
          :hideConfig="tableData2.hideConfig"
          :choose-type="tableData2.chooseType"
          :rowKey="tableData2.rowKey"
          @selfDarg="otherDarg"
          @otherDarg="selfDarg"
        >
        </Table>
      </div>
    </div>

    <div class="box">
      <div class="tableBox">
        <Etable
          :data="tableData3.data"
          :columns="tableData3.columns"
          :rules="tableData3.rules"
          :list-type-info="tableData3.listTypeInfo"
          :hideConfig="tableData3.hideConfig"
          :isSortable="true"
          @selfDarg="selfDarg2"
          @otherDarg="otherDarg2"
        >
        </Etable>
      </div>
      <div class="tableBox">
        <Etable
          :data="tableData4.data"
          :columns="tableData4.columns"
          :rules="tableData4.rules"
          :list-type-info="tableData4.listTypeInfo"
          :hideConfig="tableData4.hideConfig"
          :isSortable="true"
          @selfDarg="otherDarg2"
          @otherDarg="selfDarg2"
        >
        </Etable>
      </div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import Sortable from 'sortablejs'
import { ref, getCurrentInstance, watch, computed, onMounted, nextTick } from 'vue'
import { tableInfo, etableInfo } from './data/index';


let tableData: any = ref(_.cloneDeep(tableInfo));
let tableData2: any = ref(_.cloneDeep(tableInfo));

let tableData3: any = ref(_.cloneDeep(etableInfo));
let tableData4: any = ref(_.cloneDeep(etableInfo));

onMounted(() => {
  tableData.value.data = [
    { name: '张三', age: 18, id: 1 },
    { name: '李四', age: 19, id: 2 },
    { name: '王五', age: 20, id: 3 },
    { name: '赵四', age: 21, id: 4 }
  ]
  tableData3.value.data = [
    { name: '张三', age: 18, id: 1 },
    { name: '李四', age: 19, id: 2 },
    { name: '王五', age: 20, id: 3 },
    { name: '赵四', age: 21, id: 4 }
  ]
})

const selfDarg = (newIndex: any, currRow: any) => {
  tableData.value.data.splice(newIndex, 0, currRow)
}
const otherDarg = (newIndex: any, currRow: any) => {
  tableData2.value.data.splice(newIndex, 0, currRow)
}

const selfDarg2 = (newIndex: any, currRow: any) => {
  tableData3.value.data.splice(newIndex, 0, currRow)
  console.log(tableData3.value.data);
}
const otherDarg2 = (newIndex: any, currRow: any) => {
  tableData4.value.data.splice(newIndex, 0, currRow)
  console.log(tableData4.value.data);
}

</script>
<style lang="scss" scoped>
.headBox {
  margin-top: 30px;
  font-size: 40px;
  color: red;
}
.box {
  margin: 100px;
  display: flex;
  justify-content: space-around;
}
.tableBox {
  width: 400px;
  height: 400px;
  margin-right: 10px;
}
.etable {
  width: 100%;
  height: 100%;
}
</style>