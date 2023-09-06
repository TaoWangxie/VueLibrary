<template>
  <el-input
    v-if="field.type === 'input'"
    v-model.trim="data[field.prop]"
    style="flex: 1"
    clearable
    class="w-50 m-2"
    size="small"
    v-bind="field"
    @change="handleEvent($event, field.prop, 'change')"
  />
  <!-- 文本输入框 -->
  <el-input
    v-if="field.type === 'textarea'"
    v-model.trim="data[field.prop]"
    style="flex: 1"
    clearable
    class="w-50 m-2"
    size="small"
    v-bind="field"
    :autosize="field.autosize || { minRows: 2, maxRows: 10 }"
    @change="handleEvent($event, field.prop, 'change')"
  />
  <!-- 计数器 -->
  <el-input-number
    v-if="field.type === 'inputNumber'"
    v-model="data[field.prop]"
    style="width: 100%"
    clearable
    class="w-50 m-2"
    size="small"
    v-bind="field"
    @change="handleEvent($event, field.prop, 'change')"
  />
  <!-- 选择框 -->
  <el-select
    v-if="field.type === 'select'"
    v-model="data[field.prop]"
    style="flex: 1; width: 100%"
    :value-key="field?.valueKey"
    filterable
    clearable
    class="w-50 m-2"
    size="small"
    v-bind="field"
    @change="handleEvent($event, field.prop, 'change')"
  >
    <el-option
      v-for="(childfield, childIndex) in configInfo.listTypeInfo[field.list]"
      :key="childIndex"
      :label="setOptionLabelvalue(childfield, field)"
      :value="
        field.valueKey
          ? childfield
          : setOptionLabelvalue(childfield, field, 'value')
      "
      :disabled="childfield.disabled"
    />
  </el-select>
  <!-- 单选框 -->
  <el-radio-group
    v-if="field.type === 'radio'"
    style="flex: 1"
    v-model="data[field.prop]"
    class="w-50 m-2"
    size="small"
    v-bind="field"
    @change="handleEvent($event, field.prop, 'change')"
  >
    <el-radio
      v-for="childfield in configInfo.listTypeInfo[field.list]"
      :key="childfield.value"
      :label="childfield.value"
      >{{ childfield.label }}</el-radio
    >
  </el-radio-group>
  <!-- 多选框 -->
  <el-checkbox-group
    v-if="field.type === 'checkbox'"
    v-model="data[field.prop]"
    class="w-50 m-2"
    size="small"
    v-bind="field"
    @change="handleEvent($event, field.prop, 'change')"
  >
    <el-checkbox
      v-for="(childfield, childIndex) in configInfo.listTypeInfo[field.list]"
      :key="childIndex"
      :disabled="field.disabled"
      :label="childfield.value"
    >
      {{ childfield.label }}
    </el-checkbox>
  </el-checkbox-group>
  <el-color-picker v-if="field.type === 'color'" v-model="data[field.prop]" />
  <div v-if="field.type === 'list'" style="width: 100%">
    <div class="btn_box">
      <el-button
        v-if="['Table', 'BtnBox'].includes(useSchema.curGrid.comKey)"
        type=""
        size="small"
        text
        @click="handlerAddFunc(field)"
        >动作</el-button
      >
      <el-button type="" size="small" text @click="createData"
        >造数据</el-button
      >
      <el-button type="primary" size="small" text @click="importJson(field)"
        >JSON导入</el-button
      >
      <el-button type="primary" size="small" text @click="addTable(field)"
        >添加</el-button
      >
    </div>
    <div :class="['tableBox']">
      <Etable
        ref="etable"
        :data="data[field.prop]"
        :columns="configInfo.listTypeInfo[field.list].columns"
        :rules="configInfo.listTypeInfo[field.list].rules"
        v-bind="$attrs"
        :list-type-info="configInfo.listTypeInfo[field.list].listTypeInfo"
        :hideConfig="configInfo.listTypeInfo[field.list].hideConfig"
        :maxH="300"
        :isSortable="true"
        @selfDarg="selfDarg"
        @dataChange="dataChange"
      >
        <template #operate="{ scope }">
          <div class="operate_box">
            <el-button
              v-if="['Form'].includes(useSchema.curGrid.comKey)"
              type=""
              link
              size="small"
              @click="handlerFunction(field, scope.$index)"
              >事件</el-button
            >
            <el-button
              type="danger"
              link
              size="small"
              @click="handlerDelete(field, scope.$index)"
              >删除</el-button
            >
          </div>
        </template>
      </Etable>
    </div>
  </div>
  <Createfunc
    v-if="useSchema.curGrid"
    v-model:visible="funcVisible"
    :type="useSchema.curGrid.comKey"
    :data="data[field.prop]"
    :field="line"
  ></Createfunc>
  <ImportJson
    v-model:visible="importJsonVisible"
    title="JSON导入"
    :width="600"
    @handleConfirm="handleConfirm"
  ></ImportJson>
</template>

<script setup lang='ts'>
import _ from 'lodash'
import { Plus } from '@element-plus/icons-vue'
import { ref, getCurrentInstance, watch } from "vue";
import Createfunc from '@/views/createLayout/components/Createfunc/index.vue'
import ImportJson from '@/views/createLayout/components/ImportJson/index.vue'
import { useSchemaStore } from '@/store/schema'
const useSchema = useSchemaStore()
const { proxy } = getCurrentInstance() as any

interface Props {
  field: any,
  configInfo: any,
  data: any
}
const props = withDefaults(defineProps<Props>(), {
  field: () => { },
  configInfo: () => { },
  data: () => { }
})
const selfDarg = (newIndex: any, currRow: any) => {
  props.data[props.field.prop].splice(newIndex, 0, currRow)
}
//新增
const addTable = (val: any) => {
  let obj: any = {}
  props.configInfo.listTypeInfo[val.list].columns.map((item) => {
    if (item.prop && item.prop != 'operate') {
      obj[item.prop] = null
    }
  })
  props.data[val.prop].push(obj)
}
const dataChange = (columns: any, res: any, index: any) => {
  console.log(useSchema.curGrid);
  if (useSchema.curGrid.comKey === 'Form') {
    let obj: any = {}
    if (columns.prop === 'prop') {
      props.data.columns.map((item: any) => {
        obj[item.prop] = null
      })
      props.data.data = _.cloneDeep(obj)
    }
  }
}
//删除
const handlerDelete = (val: any, index: any) => {
  props.data[val.prop].splice(index, 1)
}

let line = ref(null)
const handlerFunction = (val: any, index: any) => {
  console.log(val);
  line.value = props.data[val.prop][index]
  funcVisible.value = true
}



let funcVisible: any = ref(false)
const handlerAddFunc = (field: any) => {
  funcVisible.value = true
}
//造数据
const createData = () => {
  if (!props.data?.data || useSchema.curGrid.comKey === 'Form') return
  console.log(props.data.columns);
  let obj = {}
  props.data.columns.map((item: any, index: any) => {
    obj[item.prop] = '数据' + index
  })
  props.data.data = [obj]
}


let importJsonVisible = ref(false)
const importJson = (val: any) => {
  importJsonVisible.value = true
  console.log(val);
}
const handleConfirm = (data: any) => {
  console.log(eval('(' + data + ')'));
  let arr = eval('(' + data + ')')
  props.data[props.field.prop] = arr
}



// select选择处理label  value  name id
const setOptionLabelvalue = (cItem: any, item: any, type = "label") => {
  // 此方法为了保证向后兼容
  let label = "";
  let value = "";
  // 存在 listProps 时
  let listProps = item?.listProps;
  if (listProps) {
    label = cItem[listProps?.label];
    value = cItem[listProps?.value];
  } else {
    label = cItem["name"] || cItem["label"];
    value = cItem?.id ?? cItem?.value;
  }
  if (type === "label") {
    return label;
  } else {
    return value;
  }
}
/**
 * @method 绑定相关事件
 * @param {Event} event
 * @param {String | Number} val
 * @param {String} change
 * @desc 📝事件处理, 当前form项失去焦点时, 获取 value 值和 字段名称
 * @desc 📝change 事件特殊处理: change 只能拿到选中值. 此时的 event 为选中值的 value
 */
const handleEvent = (event: any, val: any, change?: any) => {
  let obj = {
    value: change === "change" ? event : event.target.value,
    label: val,
  };
  proxy.$emit("handleEvent", obj);
}



</script>
<style lang="scss" scoped>
.upload_box {
  display: flex;
  align-items: center;
  width: 100%;
  .upload {
    display: flex;
    width: 30px;
    height: 100%;
    margin-right: 10px;
    &:hover {
      cursor: pointer;
      color: #409eff;
    }
  }
  .img_box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: 1px dashed #d4d7de;
    font-size: 13px;
    color: #909399;
    img {
      display: block;
      max-width: 100%;
      max-height: 100%;
    }
  }
}
.btn_box {
  padding: 6px 5px;
  display: flex;
  justify-content: flex-end;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-bottom: 0;
  .el-button + .el-button {
    margin-left: 0;
  }
}
.tableBox {
  width: 100%;
  max-height: 400px;
  .operate_box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
<style  lang="scss">
.comAttr {
  .el-input-number {
    width: auto;
    flex: 1;
  }
  .el-input-number.is-controls-right .el-input__wrapper {
    padding-left: 4px !important;
    padding-right: 25px !important;
  }
  .el-input-number.is-controls-right .el-input-number__decrease {
    width: 20px;
  }
  .el-input-number.is-controls-right .el-input-number__increase {
    width: 20px;
  }
}
</style>
