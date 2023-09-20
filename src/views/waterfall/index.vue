<template>
  <div ref="waterfallRef" id="waterfall">
    <div
      ref="waterfallGridRef"
      class="waterfall_grid"
      v-for="(item, index) in waterInfo"
      :data-key="item.key"
      :key="index"
    >
      <div class="inner_box" :style="{ height: item.h + 'px' }">
        {{ item.key }}
      </div>
      <span
        v-if="item.key.includes('add')"
        class="close_icon"
        @mousedown.stop="downRemove($event, item, index)"
      >
        <el-icon :size="20">
          <CircleClose />
        </el-icon>
      </span>
    </div>
    <div class="add_box" :style="{ height: addEle.h + 4 + 'px' }"></div>
    <div
      id="addWaterfallGrid"
      ref="addDom"
      data-key="addKey"
      :key="domkey"
      :class="['addDom', 'waterfall_grid']"
    >
      <div class="inner_box" :style="{ height: addEle.h + 'px' }">
        {{ addEle.key }}
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import _ from 'lodash'
import { CircleClose } from '@element-plus/icons-vue'
import { ref,getCurrentInstance,watch,onMounted,nextTick } from 'vue'
// 利用闭包为每个元素创建一个独一无二的 ID
const generateID=(i=0) => {
  let id=i
  return function(type: any) {
    if(type==='init') return id=0
    return id++
  }
}


let getID: any
getID=generateID()

//瀑布流数据
let waterInfo: any=ref([
  {
    h: 220,
    key: '1'
  },
  {
    h: 230,
    key: '2'
  },
  {
    h: 200,
    key: '3'
  },
  {
    h: 250,
    key: '4'
  },
  // {
  // 	h:200,
  // 	key:'5'
  // },
  // {
  // 	h:210,
  // 	key:'6'
  // },
  // {
  // 	h:220,
  // 	key:'7'
  // },
  // {
  // 	h:230,
  // 	key:'8'
  // },
  // {
  // 	h:220,
  // 	key:'9'
  // },
  // {
  // 	h:230,
  // 	key:'10'
  // },
])
//瀑布流dom数据
let waterfallGridRef: any=ref(null)
let waterfallRef: any=ref(null)
//备用瀑布流数据
let spareWaterInfo: any=ref([])
//控制动画
let start: any=ref(false)


//临时数组
let curArr: any=ref([])
//临时对象
let curObj: any=ref({})
//鼠标进入dom的key
let tarKey: any=ref('')
//临时元素dom
let spareDom: any=ref(null)
//保存点击时元素对象
let initEle: any=ref(null)
//滚动条滚动距离
let scrollH: any=ref(0)

//=============================================
//当前元素
let curEle: any=ref(null) //当前元素
let curDom: any=ref(null) //当前元素dom
let curH=ref(0) //当前元素高
let curKey: any=ref('') //当前dom的key

//=================================
//添加对象
let addDom: any=ref(null)
let domkey: any=ref(false)
let addEle: any=ref({
  h: 200,
  key: 'addKey'
})


//watch
watch(() => tarKey.value,(val) => {
  if(val&&curEle.value&&val!=curKey.value) {
    let curIndex=curArr.value.findIndex(item => item.key==curKey.value)
    let tarIndex=curArr.value.findIndex(item => item.key==tarKey.value)
    if(curIndex>=0&&tarIndex>=0) {
      changeIndex(curArr.value,curIndex,tarIndex)
    } else if(curIndex<0&&tarIndex>=0) {
      let addobj={
        key: curEle.value.key,
        width: addDom.value.offsetWidth,
        height: addDom.value.offsetHeight,
        top: 0,
        left: 0,
      }
      curArr.value.splice(tarIndex,0,addobj)
      let obj={
        h: addEle.value.h,
        key: 'add'+getID()
      }
      spareWaterInfo.value.splice(tarIndex,0,obj)
    }
    newGetWaterfall()
    updatestyle()
  }
})
watch(() => start.value,(val) => {
  if(val) {
    waterfallRef.value.classList.add('Ani')
  } else {
    waterfallRef.value.classList.remove('Ani')
  }
})

onMounted(() => {
  spareWaterInfo.value=_.cloneDeep(waterInfo.value)
  getWaterfall()
})


nextTick(() => {
  let box: any=document.getElementById("waterfall");
  box.addEventListener("mousedown",down,false);
  //页面滚动
  box.onscroll=function(e) {
    scrollH.value=e.target.scrollTop
  };
})



//点击
const down=(e: any) => {
  let waterfallGridNode: any=e.target!=e.currentTarget? getParents(e.target,'waterfall_grid'):null;
  if(start.value||!waterfallGridNode) return
  start.value=true
  onselectFn(false)
  curKey.value=waterfallGridNode.getAttribute('data-key')
  if(curKey.value=='addKey') {
    curEle.value=addEle.value
    curDom.value=addDom.value
    addDom.value.classList.add('noAni')
  } else {
    for(let i=0;i<curArr.value.length;i++) {
      if(curArr.value[i].key===curKey.value) {
        curEle.value=curArr.value[i]
        curDom.value=waterfallGridRef.value[i]
        break
      }
    }
  }
  curH.value=curDom.value.offsetHeight
  initEle.value=curArr.value.find(item => item.key==curKey.value)
  let x=e.clientX
  let y=e.clientY
  let elex=curDom.value.offsetLeft
  let eley=curDom.value.offsetTop
  let X=x-elex;
  let Y=y-eley;
  let addval: any
  //移动鼠标
  document.onmousemove=function(e) {
    if(!start.value) return
    addval=curArr.value.find(item => item.key==addEle.value.key)
    if(curEle.value) {
      let body: any=document.querySelector("body")
      body.style.cursor="pointer"
      curDom.value.classList.add('cur')
      tarKey.value=getRange(e)
      if(!spareDom.value&&tarKey.value) {
        spareDom.value=document.createElement('div')
        spareDom.value.style.width=initEle.value? initEle.value.width+'px':curDom.value.offsetWidth+'px'
        spareDom.value.style.height=initEle.value? initEle.value.height+'px':curDom.value.offsetHeight+'px'
        spareDom.value.style.top=initEle.value? initEle.value.top+'px':addval?.top+'px'
        spareDom.value.style.left=initEle.value? initEle.value.left+'px':addval?.left+'px'
        spareDom.value.classList.add('spare_box')
        waterfallRef.value.appendChild(spareDom.value)
      }
      curDom.value.style.left=e.clientX-X+'px'
      curDom.value.style.top=e.clientY-Y+'px'
    }
  }
  //抬起鼠标
  document.onmouseup=function(e) {
    if(!tarKey.value&&!spareDom.value) {
      domkey.value=!domkey.value
      start.value=false
    }
    let body: any=document.querySelector("body")
    body.style.cursor="default"
    let left=curKey.value=='addKey'? addval?.left:curObj.value[curKey.value]?.left
    let top=curKey.value=='addKey'? addval?.top-scrollH.value:curObj.value[curKey.value]?.top
    if(curDom.value) {
      curDom.value.style.left=left+'px'
      curDom.value.style.top=top+'px'
    }
    curDom.value?.classList.remove('cur')
    addDom.value?.classList.remove('noAni')
    curKey.value=''
    curEle.value=null
    curDom.value=null
    tarKey.value=''
    initEle.value=''
    setTimeout(() => {
      if(spareDom.value) {
        spareDom.value.remove()
        spareDom.value=null
      }
      start.value=false
      waterInfo.value=_.cloneDeep(spareWaterInfo.value)
      nextTick(() => {
        domkey.value=!domkey.value
        getWaterfall()
        onselectFn(true)
      })
    },500)
  }
}

//更新瀑布流定位
const updatestyle=() => {
  let doms: any=waterfallGridRef.value
  doms.map((item) => {
    let key=item.getAttribute('data-key')
    if(key!=curKey.value) {
      item.style.top=curObj.value[key].top+'px'
      item.style.left=curObj.value[key].left+'px'
    } else {
      spareDom.value.style.top=curObj.value[key].top+'px'
      spareDom.value.style.left=curObj.value[key].left+'px'
    }
  })
  if(addEle.value) {
    spareDom.value.style.top=curObj.value[curKey.value].top+'px'
    spareDom.value.style.left=curObj.value[curKey.value].left+'px'
  }
}
//针对原始数据算法
const getWaterfall=() => {
  let columns=2;    //定义布局的列数为2
  let doms: any=waterfallGridRef.value     //获取每个子元素的DOM
  let array: any=[]      //定义空数组存储元素高度
  curArr.value=[]
  for(let i=0;i<doms.length;i++) {     //遍历整个子元素的DOM集合
    if(i<columns) {      //小于columns的子元素作为第一行
      doms[i].style.top=0+'px';
      doms[i].style.left=(doms[0].offsetWidth)*i+'px'
      array.push(doms[i].offsetHeight)    //遍历结束时，数组array保存的是第一行子元素的元素高度
    } else {        //大于等于columns的子元素将作其他行
      let minHeight=array[0]    //假设数组array的第一项为最小高度
      let index=0
      for(let j=0;j<array.length;j++) {    //遍历数组array每一项，目的获得array的最小值和其索引值
        if(minHeight>array[j]) {
          minHeight=array[j]
          index=j
        }
      }
      //设置当前子元素项的位置
      doms[i].style.top=array[index]+'px';
      doms[i].style.left=doms[index].offsetLeft+'px';
      //重新定义数组最小项的高度
      array[index]=array[index]+doms[i].offsetHeight;
    }
    curArr.value.push({
      key: doms[i].getAttribute('data-key'),
      width: doms[i].offsetWidth,
      height: doms[i].offsetHeight,
      top: doms[i].offsetTop,
      left: doms[i].offsetLeft,
    })
  }
  curObj.value={}
  curArr.value.map((item) => {
    curObj.value[item.key]={
      top: item.top,
      left: item.left
    }
  })
}
//临时数据算法
const newGetWaterfall=() => {
  let arr=_.cloneDeep(curArr.value)
  let columns=2;    //定义布局的列数为2
  let array: any=[]      //定义空数组存储元素高度
  curArr.value=[]
  for(let i=0;i<arr.length;i++) {     //遍历整个子元素的DOM集合
    if(i<columns) {      //小于columns的子元素作为第一行
      arr[i].top=0
      arr[i].left=arr[0].width*i
      array.push(arr[i].height)    //遍历结束时，数组array保存的是第一行子元素的元素高度
    } else {        //大于等于columns的子元素将作其他行
      let minHeight=array[0]    //假设数组array的第一项为最小高度
      let index=0
      for(let j=0;j<array.length;j++) {    //遍历数组array每一项，目的获得array的最小值和其索引值
        if(minHeight>array[j]) {
          minHeight=array[j]
          index=j
        }
      }
      //设置当前子元素项的位置
      arr[i].top=array[index];
      arr[i].left=arr[index].left;

      //重新定义数组最小项的高度
      array[index]=array[index]+arr[i].height;
    }
    //临时数组
    curArr.value.push({
      key: arr[i].key,
      width: arr[i].width,
      height: arr[i].height,
      top: arr[i].top,
      left: arr[i].left,
    })
    //临时定位对象
    curObj.value[arr[i].key]={
      top: arr[i].top,
      left: arr[i].left
    }

  }
}
//移除
const remove=(ele: any,index: any) => {
  spareWaterInfo.value.splice(index,1)
  waterInfo.value=_.cloneDeep(spareWaterInfo.value)
  nextTick(() => {
    domkey.value=!domkey.value
    getWaterfall()
    onselectFn(true)
    console.log(curObj.value)
  })
}
const downRemove=(e: any,ele: any,index: any) => {
  document.onmouseup=function(e) {
    remove(ele,index)
  }
}
//=====================================utils=========================================
//获取鼠标进入的矩形对象
const getRange=(ele) => {
  for(let i=0;i<curArr.value.length;i++) {
    let x1=curArr.value[i].left
    let y1=curArr.value[i].top
    let x2=curArr.value[i].left+curArr.value[i].width
    let y2=curArr.value[i].top+curArr.value[i].height
    let isRange=isInside(ele.clientX,ele.clientY+scrollH.value,x1,y1,x2,y2)
    if(isRange) {
      return curArr.value[i].key
    }
  }
}
//判断某个坐标在不在矩形范围内
const isInside=(x: any,y: any,z1: any,z2: any,z3: any,z4: any) => {
  let x1: any=Math.min(z1,z3);
  let x2: any=Math.max(z1,z3);
  let y1: any=Math.min(z2,z4);
  let y2: any=Math.max(z2,z4);
  if((x1<=x&&x<=x2)&&(y1<=y&&y<=y2)) {
    return true
  } else {
    return false
  }
}
//交换数组中两个元素位置
const changeIndex=(arr: any,curIndex: number,tarIndex: number) => {
  arr[curIndex]=arr.splice(tarIndex,1,arr[curIndex])[0]
  spareWaterInfo.value[curIndex]=spareWaterInfo.value.splice(tarIndex,1,spareWaterInfo.value[curIndex])[0]
}
//控制选中文字
const onselectFn=(val: boolean) => {
  document.onselectstart=function() { return val; }
}
//获取指定class的父节点
const getParents=(element: any,className: any) => {
  let returnParentElement=null;
  function getpNode(element,className) {
    //创建父级节点的类数组
    if(typeof element.parentNode==='object'&&element.parentNode!==null&&'getAttribute' in element.parentNode) {
      let pClassList=element.parentNode.getAttribute('class');
      let pNode=element.parentNode;
      if(!pClassList) {
        //如果未找到类名数组，就是父类无类名，则再次递归
        getpNode(pNode,className);
      } else if(pClassList&&pClassList.indexOf(className)<0) {
        //如果父类的类名中没有预期类名，则再次递归
        getpNode(pNode,className);
      } else if(pClassList&&pClassList.indexOf(className)>-1) {
        returnParentElement=pNode;
      }
    }
  }
  getpNode(element,className);
  return returnParentElement;
}





</script>
<style lang="scss">
.spare_box {
  position: absolute;
  background-color: rgba(#f58888, 0.4);
  border-radius: 10px;
  transition: all 0.5s;
}
</style>
<style lang="scss" scoped>
.btn {
  position: fixed;
  bottom: 100px;
  right: 100px;
  width: 100px;
  height: 100px;
  background-color: #fff;
}
#waterfall {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  background-color: #dcdfe6;
  box-sizing: border-box;
}

.waterfall_grid {
  position: relative;
  height: auto;
  font-size: 14px;
  position: absolute;
  box-sizing: border-box;
  background-color: #fff;
  word-break: break-word;
  border: 2px solid #dcdfe6;
  border-radius: 10px;
  user-select: none;
  z-index: 1;
  .close_icon {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    &:hover {
      cursor: pointer;
      color: #409eff;
    }
  }
}
.cur {
  transition: all 0s !important;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
  z-index: 1000 !important;
}
.inner_box {
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
}
.Ani {
  .waterfall_grid {
    transition: all 0.5s;
  }
}
.noAni {
  transition: all 0s !important;
}
.add_box {
  position: fixed;
  top: 47px;
  right: 47px;
  width: 200px;
  border: 3px dashed #fff;
}
.addDom {
  position: fixed;
  top: 50px;
  right: 50px;
  width: 200px;
  color: #fff;
  background-color: #67c23a;
  &:hover {
    cursor: pointer;
  }
}
</style>
