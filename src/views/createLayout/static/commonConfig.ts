// 按钮集合
export const DIALOG_CONFIG = (data: any) => ({
  type: 'dialog',
  data: {
    temType: 'dialog',
    temFileName: data.fileName,
    temName: data.name,
    temWidth: 500
  },
  fieldList: [
    { label: "模板类型", prop: "temType", type: "select", list: 'typeList' },
    { label: "文件名称", prop: "temFileName", type: "input" },
    { label: "弹窗名称", prop: "temName", type: "input" },
    { label: "弹窗宽度", prop: "temWidth", type: "inputNumber" }
  ],
  listTypeInfo: {
    typeList: [
      {
        label: '页面',
        value: 'page'
      },
      {
        label: '弹窗',
        value: 'dialog'
      },
    ]
  }
})
export const PAGE_CONFIG = (data: any) => ({
  type: 'page',
  data: {
    temType: 'page',
    temFileName: data.fileName,
  },
  fieldList: [
    { label: "模板类型", prop: "temType", type: "select", list: 'typeList' },
    { label: "文件名称", prop: "temFileName", type: "input" },
  ],
  listTypeInfo: {
    typeList: [
      {
        label: '页面',
        value: 'page'
      },
      {
        label: '弹窗',
        value: 'dialog'
      },
    ]
  }
})
export const INDEX_CONFIG = {
  type: 'index',
  data: {
    temType: 'index',
    temFileName: 'defaultNmae',
  },
  fieldList: [
    { label: "模板类型", prop: "temType", type: "select", list: 'typeList', disabled: true },
    { label: "文件名称", prop: "temFileName", type: "input" },
  ],
  listTypeInfo: {
    typeList: [
      {
        label: '主页',
        value: 'index'
      },
    ]
  }
}