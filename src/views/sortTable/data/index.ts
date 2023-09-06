let tableInfo = {
    data:[],
    columns:[
        {
            label: "id",
            prop: "id",
        },
        {
            label: "姓名",
            prop: "name",
        },
        {
            label: "年龄",
            prop: "age",
        },
    ],
    hideConfig:['serial','invert','pagination'],
    chooseType:'',
    rowKey:'id',
    page:{
        total: 0,
        pageNum: 1,
        pageSize: 10,
    }
}
let etableInfo = {
    data: [],
    columns: [
        {
            label: "id",
            prop: "id",
        },
        {
            label: "姓名",
            prop: "name",
            colType: 'input'
        },
        {
            label: "年龄",
            prop: "age",
            colType: 'input'
        },
    ],
    rules: {
        name: [
            {
                required: true,
                message: "请输入人工日",
                trigger: ["blur", "change"],
            },
        ],
    },
    rowKey:'id',
    listTypeInfo: {},
    hideConfig: ['serial','checkbox'],
}
export {
    tableInfo,
    etableInfo
}