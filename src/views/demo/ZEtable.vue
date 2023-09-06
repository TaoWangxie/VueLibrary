<template>
  <div class="Etable">
    <el-form
      ref="formTableRef"
      style="width: 100%; margin: 0 !important"
      :model="tableFrom"
      :rules="tableFrom.rules"
    >
      <el-table
        v-bind="bindTable"
        :row-key="rowKey"
        :data="tableFrom.data"
        :key="dictTableKey"
      >
        <!-- 多选 -->
        <template v-if="chooseType === 'selection'">
          <el-table-column
            :type="isType"
            width="55"
            fixed="left"
            :align="'center'"
          />
        </template>
        <!-- 单选 -->
        <template v-else-if="chooseType === 'radio'">
          <el-table-column
            type="index"
            :align="'center'"
            width="55"
            fixed="left"
            label="序号"
          >
          </el-table-column>
        </template>
        <el-table-column
          v-for="(colItem, index) in columns"
          :key="colItem.label + index"
          :prop="colItem.prop"
          v-bind="colItem"
          min-width="100px"
          show-overflow-tooltip
          style="display: flex; align-items: center"
        >
          <template #default="scope">
            <template v-if="colItem.colType === 'slot'">
              <el-form-item
                :prop="'data.' + scope.$index + `.${colItem.prop}`"
                :rules="tableFrom.rules ? tableFrom.rules[colItem.prop] : []"
              >
                <slot :name="colItem.prop" :scope="scope" />
              </el-form-item>
            </template>
            <template v-else-if="colItem.colType === 'select'">
              <el-form-item
                :prop="'data.' + scope.$index + `.${colItem.prop}`"
                :rules="tableFrom.rules ? tableFrom.rules[colItem.prop] : []"
              >
                <el-select
                  v-if="!isView"
                  v-model="scope.row[colItem.prop]"
                  placeholder="请选择"
                  style="width: 100%"
                  filterable
                  :allow-create="colItem.col.allowCreate || false"
                  :value-key="colItem.col.option.valueKey"
                  :disabled="
                    scope.row?.isDisabled?.includes(colItem.prop) ||
                    colItem.disabled ||
                    onlyShow
                  "
                  @focus="selectFocus($event, colItem, scope.$index)"
                  @change="dataChange($event, colItem, scope)"
                >
                  <el-option
                    v-for="it in listTypeInfo[colItem.col.list]"
                    :key="it.value"
                    :label="
                      it[
                        colItem.col.option.label
                          ? colItem.col.option.label
                          : 'name'
                      ]
                    "
                    :value="
                      colItem.col.option.valueKey
                        ? it
                        : it[
                            colItem.col.option.value
                              ? colItem.col.option.value
                              : 'id'
                          ]
                    "
                  />
                </el-select>
                <template v-else>
                  {{ scope.row[colItem.prop] ? getLabel(colItem, scope) : "-" }}
                </template>
              </el-form-item>
            </template>
            <template v-else-if="colItem.colType === 'relationSelect'">
              <el-form-item
                :prop="'data.' + scope.$index + `.${colItem.prop}`"
                :rules="tableFrom.rules ? tableFrom.rules[colItem.prop] : []"
              >
                <el-select
                  v-if="!isView"
                  v-model="scope.row[colItem.prop]"
                  placeholder="请选择"
                  style="width: 100%"
                  filterable
                  :allow-create="colItem.col.allowCreate || false"
                  :value-key="colItem.col.option.valueKey"
                  :disabled="scope.row?.isDisabled?.includes(colItem.prop)"
                  @change="dataChange($event, colItem, scope)"
                >
                  <el-option
                    v-for="it in scope.row.listTypeInfo[colItem.col.list]"
                    :key="it.value"
                    :label="
                      it[
                        colItem.col.option.label
                          ? colItem.col.option.label
                          : 'name'
                      ]
                    "
                    :value="
                      colItem.col.option.valueKey
                        ? it
                        : it[
                            colItem.col.option.value
                              ? colItem.col.option.value
                              : 'id'
                          ]
                    "
                  />
                </el-select>
                <template v-else>
                  {{
                    scope.row[colItem.prop]
                      ? getRelationLabel(colItem, scope)
                      : "-"
                  }}
                </template>
              </el-form-item>
            </template>
            <template v-else-if="colItem.colType === 'cascader'">
              <el-form-item
                :prop="'data.' + scope.$index + `.${colItem.prop}`"
                :rules="tableFrom.rules ? tableFrom.rules[colItem.prop] : []"
              >
                <el-cascader
                  v-if="!isView"
                  v-model="scope.row[colItem.prop]"
                  style="width: 100%"
                  v-bind="colItem.col"
                  :options="listTypeInfo[colItem.col.list]"
                  @change="dataChange($event, colItem, scope.$index)"
                />
                <template v-else>
                  {{ scope.row[colItem.prop] || "-" }}
                </template>
              </el-form-item>
            </template>
            <template v-else-if="colItem.colType === 'number'">
              <el-form-item
                :prop="'data.' + scope.$index + `.${colItem.prop}`"
                :rules="tableFrom.rules ? tableFrom.rules[colItem.prop] : []"
              >
                <el-input-number
                  v-if="!isView"
                  v-model="scope.row[colItem.prop]"
                  style="width: 100%"
                  v-bind="colItem.col"
                  @change="dataChange($event, colItem, scope.$index)"
                />
                <template v-else>
                  {{ scope.row[colItem.prop] || "-" }}
                </template>
              </el-form-item>
            </template>
            <template v-else-if="colItem.colType === 'input'">
              <el-form-item
                :prop="'data.' + scope.$index + `.${colItem.prop}`"
                :rules="tableFrom.rules ? tableFrom.rules[colItem.prop] : []"
              >
                <el-input
                  v-if="!isView"
                  v-model="scope.row[colItem.prop]"
                  placeholder="请输入"
                  style="width: 100%"
                  v-bind="colItem.col"
                  :disabled="colItem.disabled"
                  @focus="inputFocus($event, colItem, scope.$index)"
                  @input="dataChange($event, colItem, scope.$index)"
                />
                <template v-else>
                  {{ scope.row[colItem.prop] || "-" }}
                </template>
              </el-form-item>
            </template>
            <template v-else-if="colItem.colType === 'tagBox'">
              <el-form-item
                :prop="'data.' + scope.$index + `.${colItem.prop}`"
                :rules="tableFrom.rules ? tableFrom.rules[colItem.prop] : []"
              >
                <div
                  class="tag-box"
                  :style="{ height: `${colItem.col.height}px` }"
                >
                  <div
                    class="tag-option"
                    @click="addTag(colItem, scope.$index)"
                  >
                    <i class="el-icon-plus" />
                  </div>
                  <div class="tagBox">
                    <el-tag
                      v-for="(tag, index) in scope.row[colItem.col.tagList]"
                      :key="index"
                      class="tagItem"
                      v-bind="colItem.col"
                      @close="deleteTag(tag, scope.row[colItem.col.tagList])"
                    >
                      {{
                        tag[
                          colItem.col.tagListVal
                            ? colItem.col.tagListVal
                            : "name"
                        ]
                      }}
                    </el-tag>
                  </div>
                </div>
              </el-form-item>
            </template>
            <template v-else-if="colItem.colType === 'date'">
              <!-- 日期选择框 -->
              <el-form-item
                :prop="'data.' + scope.$index + `.${colItem.prop}`"
                :rules="tableFrom.rules ? tableFrom.rules[colItem.prop] : []"
              >
                <el-date-picker
                  v-if="!isView"
                  v-model="scope.row[colItem.prop]"
                  style="width: 100%"
                  placeholder="请选择"
                  :disabled="
                    scope.row?.isDisabled?.includes(colItem.prop) ||
                    colItem.disabled ||
                    onlyShow
                  "
                  v-bind="colItem.col"
                  @change="dataChange($event, colItem, scope.$index)"
                />
                <template v-else>
                  {{ scope.row[colItem.prop] || "-" }}
                </template>
              </el-form-item>
            </template>
            <!-- 操作列 -->
            <template v-else-if="colItem.colType === 'operate'">
              <slot name="operate" :scope="scope" />
            </template>
            <!-- 普通列 -->
            <template v-else>
              {{ scope.row[colItem.prop] ? scope.row[colItem.prop] : "-" }}
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>
<script setup lang='ts'>
import _ from 'lodash';
import Sortable from 'sortablejs';
import { ref, getCurrentInstance, watch, onMounted, nextTick, computed } from 'vue';
const { proxy } = getCurrentInstance() as any;


//props
interface Props {
  rowKey?: string; //对于列表中唯一的字段rowKey默认为id
  data: any; //列表的数据
  columns: any[]; //传过来的表头信息
  loading?: boolean; // 表格加载动画开关
  isType?: string; //单多选
  listTypeInfo?: any; //选择项值列表
  rules?: any; //校验
  isView?: boolean; //查看模式
  hideConfig?: string[]; // 隐藏配置项，用于隐藏部分功能 可用值['checkbox', 'serial'] 默认隐藏序号列
  showSummary?: boolean; // 是否展示合计行
  onlyShow?: boolean; // 是否只读
  isSortable?: boolean // 是否开启拖拽排序
  rowSelectKeyFn: Function,
  defaultSelectList: any,
  chooseType: string
}
const props = withDefaults(defineProps<Props>(), {
  rowKey: 'id',
  data: () => [],
  columns: () => [],
  loading: false,
  isType: 'selection',
  listTypeInfo: () => { },
  rules: () => { },
  hideConfig: () => [],
  isView: false,
  onlyShow: false,
  showSummary: false,
  isSortable: false,
  rowSelectKeyFn: () => true,
  defaultSelectList: [],
  chooseType: ''
});

//form实例
let formTableRef: any = ref(null);

//data
let tableData: any = ref([]);

//computed
const bindTable = computed(() => {
  return {
    ref: 'etableRef',
    'highlight-current-row': true,
    stripe: false,
    border: true,
    'max-height': 3000,
    ...proxy.$attrs,
  };
});
const tableFrom = computed(() => {
  return {
    data: tableData.value,
    rules: props.rules,
  };
});

//watch
watch(
  () => props.data,
  (val) => {
    tableData.value = val;
  },
  { deep: true, immediate: true }
);
onMounted(() => {
  props.isSortable && sotrInit()
})

const checkSelectable = (row: any, index: any) => {
  return props.rowSelectKeyFn(row)
}

//默认选中
const toggleSelectionFn = (rows?: any[]) => {
  nextTick(() => {
    if (rows) {
      if (props.chooseType == 'radio') { //单选
        radio.value = rows[0];
      }
      selectList.value = _.cloneDeep(rows)
      rows.forEach((row) => {
        etableRef.value!.toggleRowSelection(row, undefined)
      })
    } else {
      radio.value = '';
      etableRef.value!.clearSelection()
    }
  })
}
//watch
watch(
  () => props.defaultSelectList,
  (val) => {
    toggleSelectionFn(val)
  },
  { immediate: true }
);

const clearSelection = () => {
  nextTick(() => {
    radio.value = '';
    etableRef.value!.clearSelection()
  })
}
//===================Sortable=======================
let dictTableKey = ref(0)
let etableRef: any = ref(null)
let tabletbody: any = ref(null)
const sotrInit = () => {
  nextTick(() => {
    tabletbody.value = etableRef.value?.$el.querySelector('tbody')
    rowDrop(tabletbody.value)
  })
}
const rowDrop = (dom: any, target?: any) => {
  return Sortable.create(dom, {
    sort: true,
    animation: 150,
    group: { name: 'tableGroup', pull: true, put: true },
    onEnd(obj: any) {
      const { from, to, newIndex, oldIndex } = obj
      if (from === to) {
        // console.log('自己内部拖动', newIndex, oldIndex)
        const currRow = tableData.value.splice(oldIndex, 1)[0]
        // tableData.value.data.splice(newIndex, 0, currRow)
        proxy.$emit("selfDarg", newIndex, currRow);
        dictTableKey.value++
      } else if (from !== to) {
        // console.log('从自身拖到其他table', newIndex, oldIndex)
        const currRow: any = tableData.value.splice(oldIndex, 1)[0]
        // tableData2.value.data.splice(newIndex, 0, currRow)
        proxy.$emit("otherDarg", newIndex, currRow);
        dictTableKey.value++
      }
    },
    onAdd(obj: any) {
      dictTableKey.value++
    }
  })
}
watch(() => dictTableKey.value,
  () => {
    nextTick(() => {
      sotrInit()
    });
  }
);
//===================Sortable=======================
//单选
let radio = ref('')
//单选
const handleRadio = (row: any) => {
  radio.value = row;
  selectList.value = [_.cloneDeep(row)];
  proxy.$emit("handleSelect", selectList.value ? selectList.value : []);
}
//多选
let selectList: any = ref([])
const handleSelect = (val: any) => {
  selectList.value = _.cloneDeep(val)
  proxy.$emit("handleSelect", selectList.value ? selectList.value : []);
}
const handleSelectAll = (val: any) => {
  selectList.value = _.cloneDeep(val)
  proxy.$emit("handleSelect", selectList.value ? selectList.value : []);
}
//select
const getLabel = (val: any, scope: any) => {
  // 支持手动输入的直接取字段
  if (val.col.allowCreate) {
    return scope.row[val.prop] || '-';
  }
  if (val.col.option.valueKey) {
    // 如果传入的是 valueKey 说明 select绑定的是对象，用valueKey与list中的valueKey进行对比
    let data = props.listTypeInfo[val.col.list].filter((item: any) => {
      return item[val.col.option.valueKey] == scope.row[val.prop][val.col.option.valueKey];
    });
    let res = data.length ? data[0][val.col.option.label] : '-';
    return res;
  } else {
    // 如果传入的不是 valueKey 走之前的逻辑
    let data = props.listTypeInfo[val.col.list].filter((item: any) => {
      return item[val.col.option.value] == scope.row[val.prop];
    });
    let res = data.length ? data[0][val.col.option.label] : '-';
    return res;
  }
};
const getRelationLabel = (val: any, scope: any) => {
  if (scope.row.listTypeInfo) {
    if (val.col.option.valueKey) {
      // 如果传入的是 valueKey 说明 select绑定的是对象，用valueKey与list中的valueKey进行对比
      let data = scope.row.listTypeInfo[val.col.list].filter((item: any) => {
        return item[val.col.option.valueKey] == scope.row[val.prop][val.col.option.valueKey];
      });
      let res = data.length ? data[0][val.col.option.label] : '-';
      return res;
    } else {
      // 如果传入的不是 valueKey 走之前的逻辑
      let data = scope.row.listTypeInfo[val.col.list].filter((item: any) => {
        return item[val.col.option.value] == scope.row[val.prop];
      });
      let res = data.length ? data[0][val.col.option.label] : '-';
      return res;
    }
  } else {
    return '-';
  }
};
const getVal = (val: any, scope: any) => {
  if (val.col.option.valueKey) {
    // 如果传入的是 valueKey 说明 select绑定的是对象，用valueKey与list中的valueKey进行对比
    let data = props.listTypeInfo[val.col.list].filter((item: any) => {
      return item[val.col.option.valueKey] == scope.row[val.prop][val.col.option.valueKey];
    });
    let res = data.length ? data[0] : [];
    return res;
  } else {
    // 如果传入的不是 valueKey 走之前的逻辑
    let data = props.listTypeInfo[val.col.list].filter((item: any) => {
      return item[val.col.option.value] == scope.row[val.prop];
    });
    let res = data.length ? data[0] : [];
    return res;
  }
};

const mergeMultiDate = (periodList: any) => {
  let result = '';
  if (periodList?.length > 0) {
    periodList.forEach((multiDate: any) => {
      if (multiDate?.length > 0) {
        if (result.length > 0) {
          result += ' | ';
        }
        result += multiDate[0] + ' ~ ' + multiDate[1];
      }
    });
  }
  return result;
};

//methods
//校验
/**
 * mustData 表格数据不为空校验是否开启
 * noValid 是否校验
 */
const confirmRule = async (mustData: boolean = false, noValid: boolean = false) => {
  if (mustData && !tableData.value.length) return false;
  if ((!mustData && !tableData.value.length) || noValid) return Promise.resolve(tableData.value);
  const valid = await new Promise((resolve) => formTableRef.value.validate(resolve));
  console.log(valid);
  if (!valid) return false;

  return Promise.resolve(tableData.value);
};

const confirmRuleNew = async (params = { mustData: false, noValid: false }) => {
  let { mustData, noValid } = params
  if (mustData && !tableData.value.length) return false;
  if ((!mustData && !tableData.value.length) || noValid) return Promise.resolve(tableData.value);
  const { valid, fields } = await new Promise(async (resolve) => {
    await formTableRef.value.validate((valid: any, fields: any) => {
      resolve({
        valid: valid,
        fields: fields
      })
    })
  })
  if (!valid) {
    let errorInfos: any = []
    Object.values(fields).map((item: any) => {
      errorInfos.push({
        rowIndex: Number(item[0].field.split('.')[1]),
        prop: item[0].field.split('.')[2],
        message: item[0].message
      })
    })
    return {
      valid: false,
      fields: errorInfos
    };
  } else {
    return Promise.resolve(tableData.value);
  }
};


//数据变化触发
const dataChange = (val: any, columns: any, scope: any) => {
  let currentVal = val;
  nextTick(() => {
    if (columns.type == 'cascader' && columns.col.ref) {
      let data = proxy.refs[columns.col.ref].getCheckedNodes();
      currentVal = data[0]?.data;
    }
    let res;
    if (columns.type == 'select') {
      res = getVal(columns, scope);
    }
    proxy.$emit('dataChangefn', { columns, data: res, index: scope.$index });
  });
};
//聚焦
const inputFocus = (val: any, columns: any, index: any) => {
  proxy.$emit('inputFocus', columns, index);
};
//聚焦
const selectFocus = (val: any, columns: any, index: any) => {
  proxy.$emit('selectFocus', { columns, index: index });
};
//添加tag
const addTag = (columns: any, index: any) => {
  proxy.$emit('addTag', columns, index);
};
//删除tag
const deleteTag = (tag: any, list: any) => {
  list.splice(list.indexOf(tag), 1);
  proxy.$emit('deleteTag', tag, list);
};

//暴露方法给父组件
defineExpose({ confirmRule, confirmRuleNew, clearSelection });
</script>
<style lang="scss" scoped>
//element-plus
.Etable ::v-deep .el-checkbox {
  margin: 0 auto !important;
}
.Etable ::v-deep .el-radio {
  margin-top: 5px;
}
.Etable ::v-deep .el-radio .el-radio__label {
  display: none;
}
.Etable ::v-deep .el-form .el-form-item {
  padding: 0 !important;
  margin: 0 !important;
}
.Etable ::v-deep .el-table,
.Etable ::v-deep .el-form,
.Etable ::v-deep .el-table__inner-wrapper {
  height: 100%;
}
.Etable ::v-deep .el-table .el-table-hisColumn .el-table__header-wrapper {
  height: auto !important;
}
.Etable ::v-deep .el-table .el-table__header-wrapper {
  height: auto !important;
}
.Etable ::v-deep .el-table__body-wrapper {
  overflow: auto;
  height: calc(100% - 32px) !important;
}
::v-deep .el-table--border .el-table__cell:first-child .cell {
  display: flex;
  align-items: center;
  justify-content: center;
}
::v-deep .el-table {
  .el-table__header-wrapper,
  .el-table__fixed,
  .el-table__fixed-right {
    .el-table__header {
      th {
        font-weight: bold !important;
        color: #222;
        padding: 0 !important;
        height: 32px;
        line-height: 32px;
        font-size: 13px;
        letter-spacing: 1px;
        text-align: center;
        background: #f8f8f9;
        border-right: none;
      }

      .el-table--border th {
        border-right: none;
      }
    }
  }
}

// 滚动条的宽度
::v-deep ::-webkit-scrollbar {
  width: 6px; // 横向滚动条
  height: 6px; // 纵向滚动条 必写
}
// 滚动条的滑块
::v-deep ::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 3px;
}

//
.Etable {
  flex: 1;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  overflow: hidden;
  // todo
  padding: 0;
}
</style>
