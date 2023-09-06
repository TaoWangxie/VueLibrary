// 组件集合
export const COMLIST = [
  {
    name: '常用组件',
    comList: [
      {
        id: "1-3",
        key: "Filter",
        name: "搜索框",
        info: '搜索组件',
        w: 12,
        h: 8,
        config: {
          code: `<Filter
                      v-model:data="Filter*.data"
                      :columns="Filter*.columns"
                      :list-type-info="Filter*.listTypeInfo"
                      @handleSearch="methods['handleSearch']"
                      @handleReset="methods['handleReset']"
                    >
                    #slot
                    </Filter>`,
          funcList: [],
          data: {
            data: {},
            columns: [],
            listTypeInfo: {},
          },
          fieldList: [
            { label: "搜索列配置", prop: "columns", type: "list", list: 'columnsList' },
          ],
          listTypeInfo: {
            columnsList: {
              columns: [
                {
                  label: "列名称",
                  prop: "label",
                  colType: "input",
                  col: {
                    clearable: true
                  },
                },
                {
                  label: "列字段",
                  prop: "prop",
                  colType: "input",
                  col: {
                    clearable: true
                  },
                },
                {
                  label: "类型",
                  prop: "colType",
                  colType: "select",
                  list: 'typeList',
                  option: {
                    label: 'label',
                    value: 'value'
                  },
                  col: {
                    clearable: true
                  },
                },
                {
                  label: "操作",
                  prop: "operate",
                  colType: "slot",
                  width: 60,
                  fixed: 'right'
                },
              ],
              listTypeInfo: {
                typeList: [
                  {
                    label: 'input',
                    value: 'input'
                  },
                  {
                    label: 'select',
                    value: 'select'
                  },
                  {
                    label: 'date',
                    value: 'date'
                  },
                  {
                    label: '插槽',
                    value: 'slot'
                  },
                  {
                    label: 'cascader',
                    value: 'cascader'
                  },
                ],
              },
              hideConfig: ['checkbox', 'serial']
            },
          }
        }
      },
      {
        id: "1-2",
        key: "BtnBox",
        name: "按钮盒子",
        info: '操作按钮',
        w: 12,
        h: 5,
        config: {
          code: `<BtnBox
                    :list="BtnBox*.columns"
                    :algin="BtnBox*.algin"
                    @handleClick="methods['weekupDialog']"
                  ></BtnBox>`,
          funcList: [],
          data: {
            columns: [],
            algin: 'left',
          },
          fieldList: [
            { label: "按钮配置", prop: "columns", type: "list", list: 'columnsList' },
            { label: "对齐方式", prop: "algin", type: "select", list: 'alginList' },
          ],
          listTypeInfo: {
            columnsList: {
              columns: [
                {
                  label: "按钮名称",
                  prop: "name",
                  colType: "input",
                  col: {
                    clearable: true
                  },
                },
                {
                  label: "按钮code",
                  prop: "code",
                  colType: "input",
                  col: {
                    clearable: true
                  },
                },
                {
                  label: "类型",
                  prop: "type",
                  colType: "select",
                  list: 'typeList',
                  option: {
                    label: 'label',
                    value: 'value'
                  },
                  col: {
                    clearable: true
                  },
                },
                {
                  label: "操作",
                  prop: "operate",
                  colType: "slot",
                  width: 60,
                  fixed: 'right'
                },
              ],
              listTypeInfo: {
                typeList: [
                  {
                    label: 'primary',
                    value: 'primary'
                  },
                  {
                    label: 'success',
                    value: 'success'
                  },
                  {
                    label: 'info',
                    value: 'info'
                  },
                  {
                    label: 'warning',
                    value: 'warning'
                  },
                  {
                    label: 'danger',
                    value: 'danger'
                  },
                  {
                    label: '无',
                    value: ''
                  }
                ]
              },
              hideConfig: ['checkbox', 'serial']
            },
            alginList: [
              {
                label: '左对齐',
                value: 'left'
              },
              {
                label: '右对齐',
                value: 'right'
              },
            ]
          }
        }
      },
      {
        id: "1-0",
        key: "Table",
        name: "展示表格",
        info: '基础数据表格，支持单多选、分页等功能',
        w: 12,
        h: 18,
        config: {
          code: `<Table
                    :data="Table*.data"
                    :columns="Table*.columns"
                    :hideConfig="Table*.hideConfig"
                    :pagination="Table*.page"
                    :choose-type="Table*.chooseType"
                    :rowKey="Table*.rowKey"
                    @handlePageChange="methods['getTableList']"
                    @handleSizeChange="methods['getTableList']"
                  >
                  #slot
                  </Table>`,
          funcList: [],
          data: {
            data: [],
            columns: [],
            chooseType: '',
            hideConfig: [],
            rowKey: 'id',
            page: {
              total: 0,
              pageNum: 1,
              pageSize: 10,
            },
          },
          fieldList: [
            { label: "列配置", prop: "columns", type: "list", list: 'columnsList' },
            { label: "单多选", prop: "chooseType", type: "select", list: 'chooseTypeList' },
            { label: "隐藏项", prop: "hideConfig", type: "checkbox", list: 'hideConfigList' },
            { label: "唯一标识", prop: "rowKey", type: "input" },
          ],
          listTypeInfo: {
            columnsList: {
              columns: [
                {
                  label: "列名称",
                  prop: "label",
                  colType: "input",
                  col: {
                    clearable: true
                  },
                },
                {
                  label: "列字段",
                  prop: "prop",
                  colType: "input",
                  col: {
                    clearable: true
                  },
                },
                {
                  label: "列类型",
                  prop: "colType",
                  colType: "select",
                  list: 'typeList',
                  option: {
                    label: 'label',
                    value: 'value'
                  },
                  col: {
                    clearable: true
                  },
                },
                {
                  label: "操作",
                  prop: "operate",
                  colType: "slot",
                  width: 60,
                  fixed: 'right'
                },
              ],
              listTypeInfo: {
                typeList: [
                  {
                    label: '默认',
                    value: ''
                  },
                  {
                    label: '操作',
                    value: 'operate'
                  },
                  {
                    label: '可点击',
                    value: 'clickCol'
                  },
                  {
                    label: '插槽',
                    value: 'slot'
                  },
                ]
              },
              hideConfig: ['checkbox', 'serial']
            },
            chooseTypeList: [
              {
                label: '无',
                value: ''
              },
              {
                label: '单选',
                value: 'radio'
              },
              {
                label: '多选',
                value: 'selection'
              }
            ],
            hideConfigList: [
              {
                label: '分页',
                value: 'pagination'
              },
              {
                label: '序号',
                value: 'serial'
              },
              {
                label: '反选',
                value: 'invert'
              }
            ],
          }
        }
      },
      {
        id: "1-1",
        key: "Form",
        name: "表单",
        info: '提交表单',
        w: 12,
        h: 20,
        config: {
          code: `<Form
                    :data="Form*.data"
                    :columns="Form*.columns"
                    :rules="Form*.rules"
                    :labelPosition="Form*.labelPosition"
                    :list-type-info="Form*.listTypeInfo"
                    :labelWidth="Form*.labelWidth"
                    :whetherDisabled="Form*.whetherDisabled"
                    :count="Form*.count"
                  >
                  #slot
                  </Form>`,
          funcList: [],
          data: {
            data: {},
            columns: [],
            rules: {},
            listTypeInfo: {},
            labelPosition: 'top',
            count: 2,
            whetherDisabled: false
          },
          fieldList: [
            { label: "表单配置", prop: "columns", type: "list", list: 'columnsList' },
            { label: "对齐方式", prop: "labelPosition", type: "select", list: 'alginList' },
            { label: "列个数", prop: "count", type: "inputNumber" },
            { label: "label宽度", prop: "labelWidth", type: "inputNumber" },
            { label: "可否编辑", prop: "whetherDisabled", type: "select", list: 'disabledList' },
          ],
          listTypeInfo: {
            columnsList: {
              columns: [
                {
                  label: "列名称",
                  prop: "label",
                  colType: "input",
                  col: {
                    clearable: true
                  },
                },
                {
                  label: "列字段",
                  prop: "prop",
                  colType: "input",
                  col: {
                    clearable: true
                  },
                },
                {
                  label: "类型",
                  prop: "fieldType",
                  colType: "select",
                  list: 'typeList',
                  option: {
                    label: 'label',
                    value: 'value'
                  },
                  col: {
                    clearable: true
                  },
                },
                {
                  label: "是否必填",
                  prop: "required",
                  colType: "select",
                  list: 'allLineList',
                  option: {
                    label: 'label',
                    value: 'value'
                  },
                },
                {
                  label: "行宽度(%)",
                  prop: "customWidth",
                  colType: "inputNumber",
                  width: 130,
                  col: {
                    clearable: true
                  },
                },
                {
                  label: "是否整行",
                  prop: "allLine",
                  colType: "select",
                  list: 'allLineList',
                  option: {
                    label: 'label',
                    value: 'value'
                  },
                },
                {
                  label: "操作",
                  prop: "operate",
                  colType: "slot",
                  width: 100,
                  align: 'center',
                  fixed: 'right'
                },
              ],
              listTypeInfo: {
                typeList: [
                  {
                    label: 'input',
                    value: 'input'
                  },
                  {
                    label: 'select',
                    value: 'select'
                  },
                  {
                    label: 'inputNumber',
                    value: 'inputNumber'
                  },
                  {
                    label: '插槽',
                    value: 'slot'
                  },
                  {
                    label: 'checkbox',
                    value: 'checkbox'
                  },
                  {
                    label: 'radio',
                    value: 'radio'
                  },
                  {
                    label: 'date',
                    value: 'date'
                  },
                  {
                    label: 'password',
                    value: 'password'
                  },
                  {
                    label: 'textarea',
                    value: 'textarea'
                  },
                  {
                    label: 'switch',
                    value: 'switch'
                  },
                  {
                    label: '上传文件',
                    value: 'upload'
                  }
                ],
                allLineList: [
                  {
                    label: '是',
                    value: true
                  },
                  {
                    label: '否',
                    value: false
                  },
                ]
              },
              hideConfig: ['checkbox', 'serial']
            },
            alginList: [
              {
                label: '上对齐',
                value: 'top'
              },
              {
                label: '左对齐',
                value: 'left'
              },
              {
                label: '右对齐',
                value: 'right'
              },
            ],
            disabledList: [
              {
                label: '可编辑',
                value: false
              },
              {
                label: '不可编辑',
                value: true
              },
            ],
          }
        }
      },
    ]
  },
  {
    name: '基础组件',
    comList: [
      {
        id: "0-0",
        key: "BaseGrid",
        name: "空盒子",
        info: '基础容器',
        w: 6,
        h: 10,
        config: {
          code: `<div></div>`
        }
      },
      {
        id: "0-1",
        key: "Placeholder",
        name: "占位符",
        info: '用于填充布局，辅助作用，不计入布局',
        w: 6,
        h: 10,
        config: {}
      },
    ]
  }
]

export const IMGLIST = {
  Filter: 'https://cloudvideo.ziroom.com/183b5dd7-c7eb-0b91-9be0-c5b30eedb2c8.png',
  BtnBox: 'https://cloudvideo.ziroom.com/8d168f90-261a-1dae-6ae0-9cde65be09c8.png',
  Table: 'https://cloudvideo.ziroom.com/86e71c20-06c8-2d2f-62da-3935090bcc86.png',
  Form: 'https://cloudvideo.ziroom.com/15528607-eaae-1672-204f-3faec9b69bd2.png',
  BaseGrid: ' https://cloudvideo.ziroom.com/0e7565ca-58a9-d7b5-426c-c6f5509a123b.png',
  Placeholder: 'https://cloudvideo.ziroom.com/4caac938-c47f-aa7c-d4bf-d9aae51e0f72.png'
}