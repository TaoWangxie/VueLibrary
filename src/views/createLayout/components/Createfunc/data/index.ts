
const dialog_info = {
  data: [],
  columns: [
    {
      label: "事件码",
      prop: "code",
      colType: "input",
      col: {
        clearable: true
      },
    },
    {
      label: "备注",
      prop: "remark",
      colType: "input",
      col: {
        clearable: true
      },
    },
    {
      label: "关联",
      prop: "connected",
      colType: "select",
      list: 'connectedList',
      option: {
        label: 'name',
        value: 'key'
      },
      col: {
        clearable: true
      },
    },
    {
      label: "操作",
      prop: "operate",
      colType: "slot",
      width: 100,
      fixed: 'right'
    },
  ],
  listTypeInfo: {
    typeList: [],
    connectedList: []
  },
  hideConfig: ['checkbox', 'serial']
}

const form_info = {
  data: [],
  columns: [
    {
      label: "表单字段",
      prop: "code",
      colType: "input",
      col: {
        clearable: true
      },
    },
    {
      label: "备注",
      prop: "remark",
      colType: "input",
      col: {
        clearable: true
      },
    },
    {
      label: "隐藏字段",
      prop: "hide",
      colType: "select",
      list: 'hideList',
      option: {
        label: 'label',
        value: 'prop'
      },
      col: {
        clearable: true,
        multiple: true
      },
    },
    {
      label: "回显字段",
      prop: "show",
      colType: "select",
      list: 'showList',
      option: {
        label: 'label',
        value: 'prop'
      },
      col: {
        clearable: true,
        multiple: true
      },
    },
    {
      label: "操作",
      prop: "operate",
      colType: "slot",
      width: 100,
      fixed: 'right'
    },
  ],
  listTypeInfo: {
    hideList: [],
    showList: []
  },
  hideConfig: ['checkbox', 'serial']
}

export const tableInfo = (type: string) => {
  switch (type) {
    case 'BtnBox':
      return dialog_info
    case 'Form':
      return form_info
    default:
      break;
  }
}
