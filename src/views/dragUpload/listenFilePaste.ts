//监听 ctrl+v 事件获取粘贴板数据
class ListenFilePaste {
  id: string;
  callBack: Function;
  content: any;
  constructor(id, callBack) {
    this.id = id
    this.callBack = callBack
    this.content = document.querySelector(id);
    this.content && this.content.addEventListener('paste', this.listenFilePaste)
  }
  //这里箭头函数this是当前定义的实例，不是箭头函数的话addEventListener绑定会把this改成 this.content 这个实例
  listenFilePaste = (e) => {
    let clipboardData = e.clipboardData || e.originEvent.clipboardData;
    let items = clipboardData.items;
    if (items.length > 0 && items[0].kind == 'file') {
      let file = items[0].getAsFile();
      let that = this
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e: any) {
        that.callBack(file)
      }
    } else {
      console.log('暂无数据可粘贴...');
    }
  }
}

let listenrFilePasteClass: any
let dragAreaIsToggle: any = true //判断监听实例是否会存在显隐 来判断是否使用单例
export const listenFilePaste = (params: any) => {
  let { id, callBack } = params
  if (dragAreaIsToggle) {
    listenrFilePasteClass = new ListenFilePaste(id, callBack)
  } else {
    !listenrFilePasteClass && (listenrFilePasteClass = new ListenFilePaste(id, callBack))
  }

}