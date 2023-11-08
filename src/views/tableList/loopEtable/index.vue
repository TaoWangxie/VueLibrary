<template>
  <div class="loopTable" v-if="tableList.length">
    <div class="part" v-for="(table, index) in tableList" :key="index">
      <ZiEtable
        :ref="
          (el) => {
            table.ref = el
          }
        "
        :data="table[tableListName]"
        :rules="config.rules"
        :isView="readOnly"
        :columns="config.columns"
        :chooseType="config.chooseType"
        :hideConfig="config.hideConfig"
        :list-type-info="config.listTypeInfo"
        @dataChangefn="dataChangefn($event, table)"
      >
      </ZiEtable>
    </div>
  </div>
</template>
<script setup lang="ts">
import _ from "lodash"
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue"

const tableList = ref<any[]>([])

// 校验数据必填
const validFn = async () => {
  for (let i = 0; i < tableList.value.length; i++) {
    let curItem: any = tableList.value[i]
    let valid = await curItem.ref.confirmRuleNew()
    if (valid?.valid == false) {
      ElMessage.warning(`请将 ${curItem.prop} 内容填写完整`)
      return false
    }
  }
  return true
}
// 获取参数数据 去保存
const getList = async () => {
  let valid = await validFn()
  console.log(valid)
  if (valid) {
    return tableList.value
  }
}
</script>

<style lang="scss" scoped></style>
