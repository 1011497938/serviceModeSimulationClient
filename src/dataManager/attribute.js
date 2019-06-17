import stateManger from "./stateManager";


const getAllResourceId = ()=>{
    return stateManger.all_resources.map(elm=> elm['控件名称'])
}
const getAllCarrierId = ()=>{
    return stateManger.all_carriers.map(elm=> elm['控件名称'])
}
const getAllConsumerId = ()=>{
    return stateManger.all_consumers.map(elm=> elm['控件名称'])
}
const getAllProducerId = ()=>{
    return stateManger.all_producers.map(elm=> elm['控件名称'])
}

const getAllGoalId = () => stateManger.all_goals.map(elm=> elm['控件名称'])

const getAllTaskId = () => stateManger.all_tasks.map(elm=> elm['控件名称'])

const getAllMainstayId = ()=>{
    return [...getAllConsumerId(), ...getAllProducerId()]
}

const getAllResourceAndCarrierId = () => [...getAllCarrierId(), ...getAllResourceId()]




// 在这里存了每个控件的属性之类的东西
const wa = {
    enum: 'enum',
    value: 'value',
    text: 'text',
    composite: 'composite',   //由多个属性组成的属性
    gateway: 'gatway', //根据之前的选项会变化


    total_scope: 'total_scope',  //唯一属性的作用域
    widget_scope: 'widget_scope',

    name: 'name',
    id: 'id',
    multiple: 'multiple',
    
}

// 控件都有的属性
const common_attr = [
    {
        name: '控件名称',
        type: wa.text,
    },
    {
        name: 'key',
        type: wa.text,
        unique: true,
        unique_scope: wa.total_scope,
    },
    {
        name: '简介',
        type: wa.text,
    }
]

// 似乎还有有个editable
// unit: 单位,
// output: 输出不可编辑
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
        name: '类型',
        type: wa.enum,
        content: ['农业','工业','第三产业','其他'],
        multiple: true,
    },
    {
        name: '关系',
        type: wa.text,
    },
]

const consumer = {
    "描述": [
        ...same_in_carrier,
    ],
    "约束": [
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
    "描述": [
        ...same_in_carrier,
    ],
    "约束": [
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

const same_in_carrier_resource = [
    {name: '访问/使用权限', type: wa.enum, content: ['持有主体','提供主体'], multiple: true},
    {name: '访问/使用优先级', type: wa.enum, content: [1,2,3,4,5]},
]
const carrier = {
    "描述": [
        ...common_attr, 
        {
            name: '持有主体',
            type: wa.enum,
            content: getAllMainstayId,
            multiple: true
        },
        {
            name: '运维主体',
            type: wa.enum,
            content: getAllMainstayId,
            multiple: true
        }
    ],
    "约束":[
        {name: '可调配数量', type: wa.value},
        {name: '状态', type: wa.enum, content: ['正常', '异常']},
        ...same_in_carrier_resource
    ]
}

const resource = {
    "描述": [
        ...common_attr, 
        {   //这里修改后基于的数据应该要清空
            name: '类型',
            type: wa.enum,
            content: ['金融资产', '人力资产', '实体资产', '知识资产']
        },
        {
            type: wa.gateway,
            based_on:  '类型',
            content: {
                '金融资产': [   //以后可能要改成map之类的
                    {
                        name: '持有主体',
                        type: wa.enum,
                        content: getAllMainstayId,
                        multiple: true
                    },
                    {
                        name: '运维主体',
                        type: wa.enum,
                        content: getAllMainstayId,
                        multiple: true
                    }
                ], 
                '人力资产':[
                    {
                        name: '雇佣主体',
                        type: wa.enum,
                        content: getAllMainstayId,
                        multiple: true
                    },
                ], 
                '实体资产':[
                    {
                        name: '持有主体',
                        type: wa.enum,
                        content: getAllMainstayId,
                        multiple: true
                    },
                    {
                        name: '运维主体',
                        type: wa.enum,
                        content: getAllMainstayId,
                        multiple: true
                    }
                ], 
                '知识资产':[
                    {
                        name: '持有主体',
                        type: wa.enum,
                        content: getAllMainstayId,
                        multiple: true
                    },
                ],
            }
        }
    ],
    "约束": [
        {
            type: wa.gateway,
            based_on:  '类型',
            content: {
                '金融资产': [   //以后可能要改成map之类的
                    {name: '可调配数量', type: wa.value},
                    {name: '状态', type: wa.enum, content: ['正常', '冻结']},
                    ...same_in_carrier_resource
                ], 
                '知识资产':[
                    {name: '可调配数量', type: wa.value},
                    {name: '状态', type: wa.enum, content: ['有效', '无效']},
                    ...same_in_carrier_resource
                ],
                '人力资产':[
                    {name: '可调配数量', type: wa.value},
                    {name: '状态', type: wa.enum, content: ['忙碌', '空闲']},
                    ...same_in_carrier_resource
                ], 
                '实体资产':[
                    {name: '可调配数量', type: wa.value},
                    {name: '预期寿命', type: wa.value, unit: '小时'},
                    ...same_in_carrier_resource
                ], 
            }
        }
    ],
    "计算属性": [
        {name: '数量', type: wa.value},
        {name: '单位价值', type: wa.value},
        {name: '总价值', type: wa.value},
    ]
}

const same_in_goal = [
    {name:'预期所需时间', type: wa.value, unit: '小时'},
    {name: '参与主体', type: wa.enum, content: getAllMainstayId, multiple:true},
]
const perioty_in_goal = {name: '目标优先级', type: wa.enum, content: [1,2,3,4,5]}

const strategic = {
    "描述": [
        ...common_attr,
    ],
    "约束":[
        ...same_in_goal,
    ],
    "计算属性": [
        {name:'子目标完成度', type: wa.value, unit: '%'}
    ]
}

const business = {
    "描述": [
        ...common_attr,
    ],
    "约束":[
        ...same_in_goal,
        perioty_in_goal,
    ],
    "计算属性": [
        {name:'子目标完成度', type: wa.value, unit: '%'}
    ]
}

const amount = {
    "描述": [
        ...common_attr,
    ],
    "约束":[
        ...same_in_goal,
        perioty_in_goal
    ],
    "计算属性": [
        {name:'子目标完成度', type: wa.value, unit: '%'},
        {name:'目标变量名', type: wa.text},
        {name:'目标变量初始值', type: wa.value, },
        {name:'目标变量预期值', type: wa.text, },
    ]
}

const physics = {
    "描述": [
        ...common_attr,
    ],
    "约束":[
        ...same_in_goal,
        perioty_in_goal
    ],
    "计算属性": [
        {name:'子目标完成度', type: wa.value, unit: '%'},
        {name:'目标变量名', type: wa.text},
        {name:'目标变量初始值', type: wa.value, },
        {name:'目标变量预期值', type: wa.text, },
    ]
}

const emotion = {
    "描述": [
        ...common_attr,
    ],
    "约束":[
        ...same_in_goal,
        perioty_in_goal
    ],
    "计算属性": [
        {name:'子目标完成度', type: wa.value, unit: '%'}
    ]
}

// 流程
const start = {
    "描述": [
        ...common_attr,
        {name: '开始事件类型', type: wa.enum, content: ['条件触发','消息触发','定时触发']},
    ],
    "约束": [
        {name: '流程依赖', type: wa.enum, content: ['条件触发','消息触发','定时触发'], multiple: true},
        {name: '流程优先级', type: wa.enum, content: [1,2,3,4,5]},

        // 资源和权限这里还要改
        {name: '所需资源/载体', type: wa.enum, content: getAllResourceAndCarrierId, multiple: true},

        {name: '参与主体', type: wa.enum, content: getAllMainstayId, multiple: true},
        {name: '拟完成目标', type: wa.enum, content: getAllGoalId, multiple: true},
    ],
    "计算属性": [
        
    ]
}

const task = {
    "描述": [
        ...common_attr,
    ],
    "约束": [
        {name: '所需载体', type: wa.enum, content: getAllCarrierId, multiple: true},
        {name: '所需载体状态', type: wa.enum, content: ['正常', '异常']},   

        {name: '流程优先级', type: wa.enum, content: [1,2,3,4,5]},
        {name: '任务依赖', type: wa.enum, content: getAllTaskId, multiple: true},
        {name: '任务参与主体', type: wa.enum, content: getAllMainstayId, multiple: true},
    ],
    "计算属性": [
        {name: '预期所需时间', type: wa.value, unit: '小时'},
        {name: '所需资源', type: wa.enum, content: getAllResourceId, multiple: true},
        {name: '所需资源数量', type: wa.value, },
        {name: '状态', type: wa.text, ouput: true}
    ]
}

const end = {
    "描述": [
        {name: '流程完成状态', type: wa.enum, content: ['正常完成', '异常结束']}, 
        {name: '流程结果', type: wa.text, output: true},
    ],
    // "约束": [

    // ],
    // "计算属性": [
        
    // ]
}
const time = {
    "描述": [
        ...common_attr,
    ],
    // "约束": [

    // ],
    // "计算属性": [
        
    // ]
}
const message = {
    "描述": [
        ...common_attr,
    ],
    // "约束": [

    // ],
    // "计算属性": [
        
    // ]
}
const exclusive = {
    "描述": [
        ...common_attr,
    ],
    // "约束": [

    // ],
    // "计算属性": [
        
    // ]
}
const parallel = {
    "描述": [
        ...common_attr,
    ],
    // "约束": [

    // ],
    // "计算属性": [
        
    // ]
}


const widget2attr = {
    consumer: consumer,
    producer: producer,

    carrier: carrier,
    resource: resource,

    strategic: strategic,
    emotion: emotion,
    physics: physics,
    amount: amount,
    business: business,

    task: task,
    start: start,
    end: end,
    time: time,
    message: message,
    exclusive: exclusive,
    parallel: parallel,
}

const getKeys = obj => Object.keys(obj)
export {
    widget2attr,
    wa,
    getKeys,
}