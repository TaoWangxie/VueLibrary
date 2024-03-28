<template>
  <div class="demo">
    <canvas
      style="width: 300px; height: 600px"
      ref="canvas"
      id="canvas"
    ></canvas>
    <img src="@/assets/imgdemo.jpg" alt="" />
    <el-button @click="downloadFn">保存</el-button>
  </div>
</template>
<script setup lang='ts'>
import _ from "lodash";
import { ref, getCurrentInstance, onMounted } from "vue";
import html2canvas from "html2canvas";
import { resolve } from "dns";
onMounted(async () => {
  let imgs = [
    {
      src: require("@/assets/imgdemo.jpg"),
      pos: {
        x: 0,
        y: 0,
        w: 300,
        h: 600,
      },
    },
    {
      src: require("@/assets/logo.png"),
      pos: {
        x: 0,
        y: 0,
        w: 150,
        h: 150,
      },
    },
    {
      src: require("@/assets/logo.png"),
      pos: {
        x: 150,
        y: 0,
        w: 150,
        h: 150,
      },
    },
  ];
  let ctx: CanvasRenderingContext2D = await drawCanvas(imgs);
  // 设置背景色
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  // 设置边框宽度
  ctx.lineWidth = 8;
  ctx.fillStyle = "rgba(0,0,0,0.5)"; // 例如，设置为白色
  // 开始绘制路径
  ctx.beginPath();
  // 定义矩形路径
  ctx.rect(100, 150, 100, 100); // 绘制一个黑色的矩形
  // 先绘制边框
  ctx.stroke();
  // 再填充内部
  ctx.fill();
  // 结束绘制
  ctx.restore();
});

const drawCanvas = (imgs: ImgsInterface[]) => {
  return new Promise<CanvasRenderingContext2D>(async (resolve) => {
    const canvas: any = document.getElementById("canvas");
    const ctx: CanvasRenderingContext2D | any = canvas.getContext("2d");
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    let ratio: number = getPixelRatio(ctx);
    canvas.width = +canvas.style.width.replace("px", "") * ratio;
    canvas.height = +canvas.style.height.replace("px", "") * ratio;
    for (let img of imgs) {
      await draw(ctx, img.src, img.pos, ratio);
    }
    ctx.scale(ratio, ratio);
    resolve(ctx);
  });
};

interface PosInterface {
  x: number;
  y: number;
  h: number;
  w: number;
}
interface ImgsInterface {
  src: string;
  pos: PosInterface;
}
const draw = (
  ctx: CanvasRenderingContext2D | any,
  src: string,
  pos: PosInterface,
  ratio: number
) => {
  return new Promise<void>((resolve, reject) => {
    let image: any = new Image();
    image.src = src;
    image.onload = () => {
      ctx.drawImage(
        image,
        pos.x * ratio,
        pos.y * ratio,
        pos.w * ratio,
        pos.h * ratio
      );
      resolve();
    };
  });
};
const getPixelRatio = (context: CanvasRenderingContext2D | any): number => {
  let backingStore: number =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;
  return (window.devicePixelRatio || 1) / backingStore;
};

const downloadFn = () => {
  let copyDom: any = document.getElementById("canvas");
  let width = copyDom.offsetWidth; //dom宽
  let height = copyDom.offsetHeight; //dom高
  let scale = 2; //放大倍数
  html2canvas(copyDom, {
    dpi: window.devicePixelRatio * 2,
    scale: scale,
    width: width,
    heigth: height,
  } as any).then((canvas) => {
    const context: any = canvas.getContext("2d");
    // 【重要】关闭抗锯齿
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
    let url = canvas.toDataURL();
    let link: any = document.createElement("a");
    link.href = url;
    link.download = "详情.png";
    // 将<a>元素添加到<body>元素的末尾
    document.body.appendChild(link);
    // 触发点击事件以开始下载
    link.click();
    // 如果需要，可以移除<a>元素
    link.remove();
  });
};
</script>

<style lang="scss" scoped>
.demo {
  display: flex;
  img {
    display: inline-block;
    width: 300px;
    height: 600px;
    margin-left: 10px;
  }
}
</style>