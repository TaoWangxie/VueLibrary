<template>
  <div class="AceEditor">
    <v-ace-editor
      v-model:value="code"
      style="height: 100%"
      :lang="aceConfig.lang"
      :theme="aceConfig.theme"
      :options="aceConfig.options"
      :readonly="aceConfig.readOnly"
      @change="change"
    />
  </div>
</template>
  
<script setup lang='ts'>
import _ from 'lodash'
import { ref, getCurrentInstance, watch, toRefs } from 'vue'
import { VAceEditor } from "vue3-ace-editor";
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-chrome';
import ace from 'ace-builds';
const { proxy } = getCurrentInstance()

//AceEditor
ace.config.set('basePath', 'https://ks3-cn-beijing.ksyun.com/vform2021/ace-mini');
const aceConfig = ref({
  lang: 'json', //解析json
  theme: 'chrome', //主题
  readOnly: false, //是否只读
  options: {
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    tabSize: 2,
    showPrintMargin: false,
    fontSize: 16
  }
});

const props = defineProps({
  data: String,
})
const { data } = toRefs(props)

let code: any = ref('')
watch(() => props.data, (val) => {
  code.value = val
}, { immediate: true })

const change = () => {
  proxy.$emit('getJSON', code.value)
}

</script>
<style lang="scss" scoped>
.AceEditor {
  width: 100%;
  height: 100%;
}
</style>
  