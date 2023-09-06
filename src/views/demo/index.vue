<template>
  <div class="demo">
    <!-- &start(aa) -->
    <Form
      ref="formRef"
      :data="configInfo.data"
      :columns="configInfo.columns"
      :rules="configInfo.rules"
      :listTypeInfo="configInfo.listTypeInfo"
      :hideFields="configInfo.hideFields"
      @handleEvent="handleEvent"
    />
    <!-- &end(aa) -->
    <!-- &start(bb) -->
    <el-button @click="submit">提交</el-button>
    <!-- &end(bb) -->
    <div class="table_box">
      <div class="table_item">
        <Table
          ref="table1"
          :data="tableInfo.data"
          :columns="tableInfo.columns"
          :hideConfig="tableInfo.hideConfig"
          :row-class-name="tableRowClassName"
          tableClassName="tableLeftClassName"
          :scrollValue="scrollTableVal"
          @handleScroll="
            (val) => {
              scrollTableVal = val
            }
          "
        >
          <template #bbb="{ scope }">
            <span :style="{ color: scope.row.bbb === 0 ? 'red' : '' }">{{
              scope.row.bbb
            }}</span>
          </template>
        </Table>
      </div>
      <div class="table_item">
        <Table
          ref="table2"
          :data="tableInfo2.data"
          :columns="tableInfo2.columns"
          :hideConfig="tableInfo2.hideConfig"
          :row-class-name="tableRowClassName"
          tableClassName="tableRightClassName"
          :scrollValue="scrollTableVal"
          @handleScroll="
            (val) => {
              scrollTableVal = val
            }
          "
        >
          <template #bbb="{ scope }">
            <span :style="{ color: scope.row.bbb === 0 ? 'red' : '' }">{{
              scope.row.bbb
            }}</span>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { ref, onMounted, nextTick, watch } from 'vue'

const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: any
  rowIndex: number
}) => {
  if (rowIndex === 1) {
    return 'warning-row'
  }
  return ''
}

const tableInfo: any = ref({
  data: [],
  columns: [
    {
      label: 'aaa',
      prop: 'aaa',
    }, {
      label: 'vv',
      prop: 'vv',
      width: 300
    }, {
      label: 'ee',
      prop: 'ee',
    }, {
      label: 'bbb',
      prop: 'bbb',
      colType: 'slot'
    }],
  hideConfig: []
})
const tableInfo2: any = ref({
  data: [],
  columns: [
    {
      label: 'aaa',
      prop: 'aaa',
    }, {
      label: 'vv',
      prop: 'vv',
      width: 300
    }, {
      label: 'ee',
      prop: 'ee',
    }, {
      label: 'bbb',
      prop: 'bbb',
      colType: 'slot'
    }],
  hideConfig: []
})


onMounted(() => {
  let arr = [
    {
      aaa: '1111',
      bbb: 0
    },
    {
      aaa: '2222',
      bbb: 1
    },
    {
      aaa: '333',
      bbb: 1
    },
    {
      aaa: '444',
      bbb: 1
    },
    {
      aaa: '555',
      bbb: 1
    },
    {
      aaa: '6666',
      bbb: 1
    },
    {
      aaa: '777',
      bbb: 1
    },
    {
      aaa: '888',
      bbb: 1
    }
  ]
  tableInfo.value.data = arr
  tableInfo2.value.data = arr

})

const scrollTableVal = ref<number>()


// &start(aa)
const configInfo: any = ref({
  data: {
    aaa: null,
    bbb: null,
    ccc: null,
    ddd: null
  },
  columns: [{
    label: 'aaa',
    prop: 'aaa',
    fieldType: 'input'
  }, {
    label: 'bbb',
    prop: 'bbb',
    fieldType: 'select',
    list: 'bbbList'
  }, {
    label: 'ccc',
    prop: 'ccc',
    fieldType: 'input'
  }, {
    label: 'ddd',
    prop: 'ddd',
    fieldType: 'input'
  }],
  rules: {},
  listTypeInfo: {
    bbbList: [{
      label: '1',
      value: '1'
    }, {
      label: '2',
      value: '2'
    }]
  },
  hideFields: []
})
// &end(aa)

// &start(cc)
const formRef: any = ref(null)
const handleEvent = (val: any) => {
  console.log(val);
  switch (val.label) {
    case 'bbb':
      if (val.value === '1') {
        formRef.value.setFormHide(['ccc'], ['ccc', 'ddd'])
      } else {
        formRef.value.setFormHide(['ddd'], ['ccc', 'ddd'])
      }
      break;
    default:
      break;
  }
}
// &end(cc)


const submit = async () => {
  let { data } = await formRef.value.confirmRule()
  console.log(data);
  console.log(configInfo.value.data);
}





</script>
<style>
.el-table .warning-row {
  --el-table-tr-bg-color: red;
}
</style>
<style lang="scss" scoped>
.demo {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
}
.table_box {
  display: flex;
  .table_item {
    width: 50%;
    height: 300px;
    flex-shrink: 0;
  }
}
</style>