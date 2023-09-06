<template>
  <DialogTem
    ref="dialogTemRef"
    @updateVisible="updateVisible"
    @handleConfirm="handleConfirm"
  >
    <div class="aceEditor_box">
      <AceEditor :key="visible" @getJSON="getJSON"></AceEditor>
    </div>
  </DialogTem>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { ref, getCurrentInstance, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { Folder, Tickets, Document } from '@element-plus/icons-vue'
import { useSchemaStore } from '@/store/schema'
const useSchema = useSchemaStore()
const { proxy } = getCurrentInstance() as any;

let code = ref('')
const getJSON = (val) => {
  code.value = val
}


//ife
const dialogTemRef: any = ref(null)
const handleConfirm = () => {
  emits("handleConfirm", code.value);
  dialogTemRef.value.handleClose()
}

let visible = ref(false)
const updateVisible = (val) => {
  visible.value = val
}
const emits = defineEmits(['handleConfirm']);
</script>

<style lang="scss" scoped>
.aceEditor_box {
  height: 60vh;
}
</style>