// 在这里存了每个控件的属性之类的东西

const wa = {
    enum: 'enum',
    value: 'value',
    text: 'text',
    composite: 'composite',   //由多个属性组成的属性

    total_scope: 'total_scope',  //唯一属性的作用域
    widget_scope: 'widget_scope',

    name: 'name',
    id: 'id',
    multiple: 'multiple',
}

// 控件都有的属性
const common_attr = [
    {
        name: 'name',
        type: wa.text,
    },
    {
        name: 'id',
        type: wa.value,
        unique: true,
        unique_scope: wa.total_scope,
    },
    {
        name: 'abstract',
        type: wa.text,
    }
]

// 似乎还有有个editable
// unit: 单位
const enum_attr = ['name','content', 'multiple', 'onchange']
const text_attr = ['name', 'multiple', 'onchange']
const value = ['name', 'value', 'range', 'unit', 'multiple', 'onchange']

// 先不弄吧
const customization =  {
    name: '自定义属性',
    type: wa.composite,
    multiple: true,
    content: [
        {
            name: '属性名称',
            type: wa.text,
        },
        {
            name: '属性类型'
        }
    ]
}

const same_in_carrier = [
    ...common_attr,
    {
        name: 'type',
        type: wa.enum,
        content: ['农业','工业','第三产业','其他'],
        multiple: true,
    },
    {
        name: 'contact',
        type: wa.text,
    },
]

const consumer = {
    describe: [
        ...same_in_carrier,
    ],
    constrain: [
        {
            name: '主体等级',
            type: wa.enum,
            content: ['非会员','普通会员','高级会员'],
        },
        {
            name: '所属市场类型',
            type: wa.enum,
            content: ['大众市场','利基市场','区隔化市场','多元化市场','多边市场'],
        },
    ],
}

const producer = {
    describe: [
        ...same_in_carrier,
    ],
    constrain: [
        {
            name: '主体等级',
            type: wa.enum,
            content: ['直接提供主体', '间接提供主体'],
        },
        {
            name: '目标市场类型',
            type: wa.enum,
            content: ['大众市场','利基市场','区隔化市场','多元化市场','多边市场'],
            multiple: true,
        },
    ]
}

const defaultEnumFunction = ()=>[]
const same_in_xietong1 = [
    ...common_attr, 
    {
        name: '持有主体',
        type: wa.enum,
        content: defaultEnumFunction,
        multiple: true
    },
    {
        name: '运维主体',
        type: wa.enum,
        content: defaultEnumFunction,
        multiple: true
    }
]
const carrier = {
    describe: [
        ...same_in_xietong1,
    ]
}

const widget2attr = {
    consumer: consumer,
    producer: producer,
    carrier: carrier,
}
const getKeys = obj => Object.keys(obj)
export {
    widget2attr,
    wa,
    getKeys,
}