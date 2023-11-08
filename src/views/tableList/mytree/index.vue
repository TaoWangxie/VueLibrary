<template>
  <div class="tree" v-for="(item, index) in list" :key="index">
    <div
      class="tree_line"
      :ref="'Line' + item.id"
      @click.stop="handelClick(item)"
    >
      <div
        v-if="item[options] && item[options].length"
        :class="['icon_box']"
        @mousedown.stop="(e) => onMouseDown(e, item, index)"
        @mouseup.stop="(e) => onMouseUp(e, item)"
        @click.stop=""
      >
        <Icon
          type="ios-arrow-forward"
          size="18"
          :class="[item.checked ? 'isexpand' : '']"
        />
      </div>
      <div v-else :class="['icon_box']" @click.stop="">
        <span class="icon_box_span"></span>
      </div>
      <div class="tree_line_box">
        <div
          class="tree_bgc"
          :style="{
            width: `${width(item)}%`,
            left: `${left(item)}%`,
            borderColor: color(item),
            background: color(item),
          }"
        ></div>
        <div
          class="tree_title"
          :style="{ width: `${100 - left(item)}%`, left: `${left(item)}%` }"
        >
          <Tooltip placement="left-end" max-width="200">
            <template #content>
              <span style="margin-right: 5px">{{
                item.nodeType == 1
                  ? item.applicationName
                  : item.applicationTypeDesc
              }}</span>
              <span style="margin-right: 5px">{{ item.responseTime }}ms</span>
              <span style="margin-right: 5px; color: #ff9900">{{
                item.uri
              }}</span>
            </template>
            <Icon
              v-if="item.parentNodeList"
              type="ios-return-right"
              size="16"
              style="margin-right: 6px"
            />
            <span>{{
              item.nodeType == 1
                ? item.applicationName
                : item.applicationTypeDesc
            }}</span>
            <span>{{ item.responseTime }}ms</span>
            <span>
              <strong>{{ item.uri }}</strong></span
            >
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      v-if="item[options] && item[options].length"
      class="tree_content"
      :style="{ height: item.checked ? item.height : '0' }"
    >
      <div ref="contentRef">
        <treace
          :list="item[options]"
          :allLen="allLen"
          :options="options"
          :isexpand="isexpand"
          @lineClick="handelClick"
        ></treace>
      </div>
    </div>
  </div>
</template>

<script setup>
import _ from "lodash"
import { ref, getCurrentInstance, watch, computed, nextTick, toRefs } from "vue"
const { proxy } = getCurrentInstance()

const props = defineProps({
  list: Array,
  allLen: Object,
  options: String,
  isexpand: Boolean,
})
const { list, allLen, options, isexpand } = toRefs(props)

let left = computed(() => {
  return (val) => {
    return (val?.timeLeft / props.allLen) * 100
  }
})
let width = computed(() => {
  return (val) => {
    return (val?.timeLen / props.allLen) * 100
  }
})
let color = computed(() => {
  return (row) => {
    if (row.error) {
      return "#F56C6C"
    } else if (!row.parentNodeList) {
      return "#19be6b"
    } else if (row.nodeType == 1) {
      return "#6092c0"
    } else {
      return "#9170b8"
    }
  }
})
//点击
const handelClick = (row) => {
  proxy.$emit("lineClick", row)
}
//tree
//数据处理
const handleList = (list) => {
  list.map((item) => {
    item["checked"] =
      !props.isexpand && props.isexpand !== false ? true : props.isexpand
    item["height"] = "auto"
    if (item[props.options]?.length > 0) {
      handleList(item[props.options])
    }
  })
}
watch(
  () => props.list,
  (val) => {
    handleList(val)
  },
  { immediate: true }
)
watch(
  () => props.isexpand,
  (val) => {
    handleList(props.list)
  },
  { immediate: true }
)
//临时高度
let contentRef = ref(null)
const onMouseDown = (e, data, index) => {
  nextTick(() => {
    if (!data[props.options] || data[props.options].length == 0) return
    if (contentRef.value) {
      if (timer.value) clearTimeout(timer.value)
      data.height = contentRef.value[index]?.clientHeight + "px"
    }
  })
}
let timer = ref(null)
const onMouseUp = (e, data) => {
  if (!data[props.options] || data[props.options].length == 0) {
    return
  }
  data.checked = !data.checked
  timer.value = setTimeout(() => {
    data.height = "auto"
  }, 300)
}
</script>
<style lang="less" scoped>
.tree {
  .tree_line {
    position: relative;
    user-select: none;
    height: 38px;
    padding-top: 2px;
    padding-left: 40px;
    padding-right: 5px;
    border-bottom: 1px solid #ebeef5;
    &:hover {
      .tree_bgc {
        border: 2px solid #2d8cf0 !important;
        box-shadow: 0 0 10px #2d8cf0 !important;
      }
      .icon_box_span {
        background-color: #000 !important;
      }
    }
    .icon_box {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 100%;
      transition: all 0.3s;
      z-index: 99;
      &:hover {
        background-color: #f2f6fc;
      }
      i {
        transition: all 0.3s;
      }
      .icon_box_span {
        display: inline-block;
        width: 4px;
        height: 4px;
        background-color: #cdd0d6;
        border-radius: 50%;
      }
    }
    .isexpand {
      transform: rotate(90deg);
    }
    .tree_line_box {
      position: relative;
      height: 12px;
      .tree_bgc {
        position: absolute;
        top: 0;
        height: 100%;
        background-color: #19be6b;
        border: 2px solid #19be6b;
        transition: all 0.2s;
      }
      .tree_title {
        position: absolute;
        top: 12px;
        display: flex;
        align-items: center;
        width: 100%;
        height: 22px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        span {
          margin-right: 10px;
          white-space: nowrap;
        }
      }
    }
  }
  .tree_content {
    overflow: hidden;
    transition: all 0.3s;
  }
}
</style>
