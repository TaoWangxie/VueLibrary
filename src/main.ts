import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import Draggable from 'vuedraggable'
import element from "element-plus";
import mitt from 'mitt'
import 'element-plus/dist/index.css'
import vue3ResizeDrag from 'vue3-resize-drag'
import { setupInitGlobalCom } from '@/views/createLayout/initCom/index'
import { setupGlobalCom } from '@/components/index'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import "@/assets/css/theme.scss";
import _ from 'lodash'
import VueGridLayout from '../v3-grid-layout.es'
import '../style.css'

let app: any;

function useTable(app: any) {
  app.use(VXETable)

  // 给 vue 实例挂载内部对象，例如：
  // app.config.globalProperties.$XModal = VXETable.modal
  // app.config.globalProperties.$XPrint = VXETable.print
  // app.config.globalProperties.$XSaveFile = VXETable.saveFile
  // app.config.globalProperties.$XReadFile = VXETable.readFile
}

function mount() {
  app = createApp(App)
  app.use(router)
  app.use(store)
  app.use(element)
  app.use(VueGridLayout)
  app.use(vue3ResizeDrag)
  useTable(app)
  setupGlobalCom(app)
  setupInitGlobalCom(app)
  app.component('draggable', Draggable)
  //事件总线
  app.config.globalProperties.mittBus = mitt()
  app.config.globalProperties.$vm = app;
  app.mount('#nuwa')
}



// 将卸载操作放入 unmount 函数
function unmount() {
  app?.unmount()
  // 卸载所有数据监听函数
  app = null
}

if ((window as any).__MICRO_APP_BASE_APPLICATION__) {
  // @ts-ignore
  window['micro-app-nuwa'] = { mount, unmount }
} else {
  // 非微前端环境直接渲染
  mount()
}

export default app