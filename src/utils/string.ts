  /**
 * @func 标注文字
 * @param className 类名
 * @param text 标注文字
 * @param bgc 背景色
 * @param color 字体颜色
 */
// <p class="ppp">
//    11111111111111工厂2222222222222222222工厂333333333工厂
// </p>
// this.fontMark("ppp", "工厂", "#F56C6C", "#fff");
const fontMark = (className, text, bgc, color) => {
  let domArr:any = document.getElementsByClassName(className);
  for (var j = 0; j < domArr.length; j++) {
    var arr = domArr[j].innerText.split(text);
    let str = "";
    for (var i = 0; i < arr.length; i++) {
      if (i == 0) {
        str += arr[i];
      } else {
        str +=
          `<span style="background:${bgc};color:${color}">工厂</span>` +
          arr[i];
      }
    }
    domArr[j].innerHTML = str;
  }
}
 
// '1111#2222#3333'
const fontMark2 = (className: string, targetText: string)=> {
  let domArr: any = document.getElementsByClassName(className);
  Array.from(domArr)?.forEach((dom: any) => {
    let arr = dom.innerText.split(targetText);
    let str = '';
    if (arr.length > 2) {
      arr.forEach((item: any, index: number) => {
        if (index % 2 == 0) {
          str += item;
        } else {
          str += `<span style="font-weight: bold">${item}</span>`;
        }
      });
    } else {
      str = dom.innerText;
    }
    dom.innerHTML = str;
  });
}