class DataStore{
    view_names = ['全局视图', '协同生态视图', '载体及资源视图', '服务价值视图', '服务过程视图', '服务目标视图']

    default_view_name = '服务过程视图'
}

// 记录了每个视图中的信息
const view2data = {
    '全局视图':{
        node: [
            {key:"提供主体及网络", isGroup:true,  loc:"-89.23198649763111 150.2319864976311", category: 'view'},
            {key:"消费主体", isGroup:true,  loc:"444.76801350236894 153.2319864976311", category: 'view'},
            {key:"载体及资源视图", isGroup:true,  loc:"180.76801350236894 466.2319864976311", category: 'view'},
            {key:"服务价值视图", isGroup:true,  loc:"185.76801350236894 -171.7680135023689", category: 'view'},
            {key:"服务过程视图", isGroup:true,  loc:"182.76801350236894 258.2319864976311", category: 'view'},
            {key:"服务目标视图", isGroup:true,  loc:"183.7680135023689 64.23198649763111", category: 'view'}
        ],
        link: [
            {from:"载体及资源视图", to:"服务过程视图", text:"支持", category:"arrow", points:[199.00000000000006,460.5374552476311,199.00000000000006,450.5374552476311,199.00000000000006,367.2319864976311,201.00000000000006,367.2319864976311,201.00000000000006,283.9265177476311,201.00000000000006,273.9265177476311]},
            {from:"服务过程视图", to:"消费主体", text:"协作", category:"arrow", points:[249.00000000000006,263.2319864976311,259.00000000000006,263.2319864976311,434.3228270176737,263.2319864976311,434.3228270176737,158.2319864976311,421,158.2319864976311,431,158.2319864976311]},
            {from:"服务过程视图", to:"提供主体及网络", text:"协作", category:"arrow", points:[153.00000000000006,263.2319864976311,143.00000000000006,263.2319864976311,-11.67717298232634,263.2319864976311,-11.67717298232634,155.2319864976311,-5,155.2319864976311,-15,155.2319864976311]},
            {from:"服务过程视图", to:"服务目标视图", text:"实现", category:"arrow", points:[201.00000000000006,252.5374552476311,201.00000000000006,242.5374552476311,201.00000000000006,166.2319864976311,202,166.2319864976311,202,89.92651774763111,202,79.92651774763111]},
            {from:"服务目标视图", to:"服务价值视图", text:"实现", category:"arrow", points:[202,58.53745524763111,202,48.53745524763111,202,-48.76801350236889,204.00000000000006,-48.76801350236889,204.00000000000006,-146.07348225236888,204.00000000000006,-156.07348225236888]},
            {from:"服务价值视图", to:"提供主体及网络", text:"传递", category:"arrow", points:[204.00000000000006,-156.07348225236888,204.00000000000006,-146.07348225236888,204.00000000000006,-152.9999998826247,-71,-152.9999998826247,-71,134.5374552476311,-71,144.5374552476311]},
            {from:"服务价值视图", to:"消费主体", text:"传递", category:"arrow", points:[204.00000000000006,-156.07348225236888,204.00000000000006,-146.07348225236888,204.00000000000006,-153.9999998826247,463,-153.9999998826247,463,137.5374552476311,463,147.5374552476311]},
            {from:"提供主体及网络", to:"服务目标视图", text:"协作", category:"arrow", points:[-15,155.2319864976311,-5,155.2319864976311,-12.67717298232634,155.2319864976311,-12.67717298232634,69.23198649763111,144,69.23198649763111,154,69.23198649763111]},
            {from:"消费主体", to:"服务目标视图", text:"协作", category:"arrow", points:[431,158.2319864976311,421,158.2319864976311,432.3228270176737,158.2319864976311,432.3228270176737,69.23198649763111,260,69.23198649763111,250,69.23198649763111]},
            {from:"载体及资源视图", to:"消费主体", text:"交互", category:"bieArrow", points:[199.00000000000006,460.5374552476311,199.00000000000006,450.5374552476311,199.00000000000006,463.0000001173753,463,463.0000001173753,463,178.92651774763112,463,168.92651774763112]},
            {from:"载体及资源视图", to:"提供主体及网络", text:"交互", category:"bieArrow", points:[199.00000000000006,460.5374552476311,199.00000000000006,450.5374552476311,199.00000000000006,461.0000001173753,-71,461.0000001173753,-71,175.92651774763112,-71,165.92651774763112]}
        ],
    },
    '协同生态视图':{
        node: [
        ],
        link: [

        ],
    }, 
    '载体及资源视图':{
        node: [

        ],
        link: [
        ],
    }, 
    '服务价值视图':{
        node: [
        ],
        link: [
        ],
    }, 
    '服务过程视图':{
        node: [
        ],
        link: [
        ],
    }, 
    '服务目标视图':{
        node: [
        ],
        link: [
        ],
    }
}

const view2palatte = {
    '全局视图':{
        node: [
        ],
        link: [
        ],
    },
    '协同生态视图':{
        node: [
         { category: 'produce',key:"producer"},
         { category: 'consumer',key:"consumer"},
        ],
        link: [
        ],
    }, 
    '载体及资源视图':{
        node: [
                    {
                    columnDefinitions: [
                            { attr: "name", text: "Name", column: 0 },
                            { attr: "value", text: "Value", column: 1 },
                          ],
                          people: [
                            { columns: [{ attr: "name", text: "attr1" }, { attr: "value", text: "value1" }] },
                          ],
                          category: 'carry',
                        },
                    {
                      columnDefinitions: [
                        { attr: "name", text: "Name", column: 0 },
                        { attr: "value", text: " Value ", column: 1 },
                      ],
                      people: [
                        { columns: [{ attr: "name", text: "attr1" }, { attr: "value", text: "value1" }] },
                      ],
                      category: 'source',
                    },
        ],
        link: [
        ],
    }, 
    '服务价值视图':{
        node: [
        ],
        link: [
        ],
    }, 
    '服务过程视图':{
        node: [

            { category:'task',key:"task"},
            { category:'start',key:"start"},
           { category:'end'},
            { category:'time'},
            { category:'message'},
            { category: 'exclusive' },
             { category: 'parallel' },

            { key: 1, text: "Pool", isGroup: true, category: "Pool" },
            { key: 2, text: "Lane", isGroup: true, category: "Lane", group: 1},
            { key: 3, text: "Lane", isGroup: true, category: "Lane", group: 1},
        ],
        link: [
        ],
    }, 
    '服务目标视图':{
        node: [
            { category: 'aim' },           
            { category: 'feel' },
            { category: 'physical' },
            { category: 'num' },
            { category: 'son' },
        ],
        link: [
        ],
    }
}

var dataStore = new DataStore()
export default dataStore
export {
    view2data,
    view2palatte
}