import { Event } from "@/utils/event";
let event = new Event() // 创建event实例
//监听 获取鼠标按压拖拽的数据
class ListenFileDrag {
  id: any;
  callBack: any;
  content: any;
  eventFn: any;
  constructor(params) {
    let { id, callBack, getStatus } = params
    this.id = id
    this.callBack = callBack
    this.content = document.querySelector(id);
    this.eventFn = getStatus
    this.eventFn && event.addEventListener('getStatus', getStatus)
    this.listenFileDrag()
  }
  listenFileDrag() {
    let that = this
    let ev: any = null
    //先获取要存放图片的div
    //阻止div的默认元素使其可以存放拖拽过来的图片
    this.content.ondragenter = (e: any) => {
      this.eventFn && event.dispatchEvent('getStatus', { code: 'enter', msg: '进入拖拽区域' })
    }
    //这时候要用到拖拽事件中的ondragover
    this.content.ondragover = function (e: any) {
      ev = window.event || e
      ev.preventDefault()
    }
    //使用ondrop事件源对象拖动着在目标对象上方释放/松手是触发
    this.content.ondrop = function (e) {
      this.eventFn && event.dispatchEvent('getStatus', { code: 'drop', msg: '在拖拽区域内释放/松手' })
      ev = window.event || e
      //这里也要阻止默认事件因为图片拖拽到浏览器默认会打开个新窗口显示图片
      ev.preventDefault()
      //读取拖拽的图片
      let file = ev.dataTransfer.files[0]
      console.log(that);
      that.callBack(file)

      // let objectURL = URL.createObjectURL(file);
      // //添加图片路径
      // src.value = objectURL
    }
    this.content.ondragleave = (e: any) => {
      this.eventFn && event.dispatchEvent('getStatus', { code: 'leave', msg: '离开拖拽区域' })
    }
  }
}

let listenrFileDragClass: any
let dragAreaIsToggle: any = true //判断监听实例是否会存在显隐 来判断是否使用单例
export const listenFileDrag = (params: any) => {
  if (dragAreaIsToggle) {
    listenrFileDragClass = new ListenFileDrag(params)
  } else {
    !listenrFileDragClass && (listenrFileDragClass = new ListenFileDrag(params))
  }
}