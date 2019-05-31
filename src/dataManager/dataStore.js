import { view2controller } from "../component/function_components/goController/GraphController.ts";

class DataStore{
    view_names = ['全局视图', '协同生态视图', '载体及资源视图', '服务价值视图', '服务过程视图', '服务目标视图']

    default_view_name = '全局视图'
}

const view2postion = {
    '服务价值视图': [0 ,-750.4396082433907],
    '服务目标视图': [0 ,-115.18147737403928],
    '服务过程视图': [0, 649.9092667808559],
    '载体及资源视图': [0, 1284.9638497993387],
    

    // 这两个要分一下
    '协同生态视图': [-1072.2156124987555, 175.5014884513875],
    '提供主体及网络': [-1072.2156124987555, 175.5014884513875],
    '消费主体': [1072.2156124987555, 175.5014884513875],
}
const overview_node = Object.keys(view2postion).filter(elm=> elm!=='协同生态视图').map(elm=>{
    const position = view2postion[elm]
    return {
        key: elm, 
        isGroup:true,  
        loc: position[0] + ' ' + position[1], 
        category: 'view'
    }
})
// 记录了每个视图中的信息
const view2data = {
    '全局视图':{
        node: overview_node,
        // [
        //     {key:"提供主体及网络", isGroup:true,  loc:"-89.23198649763111 150.2319864976311", category: 'view'},
        //     {key:"消费主体", isGroup:true,  loc:"444.76801350236894 153.2319864976311", category: 'view'},
        //     {key:"载体及资源视图", isGroup:true,  loc:"180.76801350236894 466.2319864976311", category: 'view'},
        //     {key:"服务价值视图", isGroup:true,  loc:"185.76801350236894 -171.7680135023689", category: 'view'},
        //     {key:"服务过程视图", isGroup:true,  loc:"182.76801350236894 258.2319864976311", category: 'view'},
        //     {key:"服务目标视图", isGroup:true,  loc:"183.7680135023689 64.23198649763111", category: 'view'}
        // ],
        link: [
            {from:"载体及资源视图", to:"服务过程视图", text:"支持", category:"arrow", points:[150,1284.9638497993387,150,1274.9638497993387,150,994.1728864150973,150,994.1728864150973,150,713.3819230308559,150,703.3819230308559]},
            {from:"服务过程视图", to:"消费主体", text:"协作", category:"arrow", points:[300,676.6455949058559,310,676.6455949058559,686.1078062493777,676.6455949058559,686.1078062493777,202.2378165763875,1062.2156124987555,202.2378165763875,1072.2156124987555,202.2378165763875]},
            {from:"服务过程视图", to:"提供主体及网络", text:"协作", category:"arrow", points:[0,676.6455949058559,-10,676.6455949058559,-386.10780624937775,676.6455949058559,-386.10780624937775,202.2378165763875,-762.2156124987555,202.2378165763875,-772.2156124987555,202.2378165763875]},
            {from:"服务过程视图", to:"服务目标视图", text:"实现", category:"arrow", points:[150,649.9092667808559,150,639.9092667808559,150,294.1002228284083,150,294.1002228284083,150,-51.708821124039275,150,-61.708821124039275]},
            {from:"服务目标视图", to:"服务价值视图", text:"实现", category:"arrow", points:[150,-115.18147737403928,150,-125.18147737403928,150,-406.074214683715,150,-406.074214683715,150,-686.9669519933907,150,-696.9669519933907]},
            {from:"服务价值视图", to:"提供主体及网络", text:"传递", category:"arrow", points:[0,-723.7032801183907,-10,-723.7032801183907,-777.1941693398264,-723.7032801183907,-777.1941693398264,202.2378165763875,-762.2156124987555,202.2378165763875,-772.2156124987555,202.2378165763875]},
            {from:"服务价值视图", to:"消费主体", text:"传递", category:"arrow", points:[300,-723.7032801183907,310,-723.7032801183907,1073.1605535942379,-723.7032801183907,1073.1605535942379,202.2378165763875,1062.2156124987555,202.2378165763875,1072.2156124987555,202.2378165763875]},
            {from:"提供主体及网络", to:"服务目标视图", text:"协作", category:"arrow", points:[-772.2156124987555,202.2378165763875,-762.2156124987555,202.2378165763875,-386.10780624937775,202.2378165763875,-386.10780624937775,-88.44514924903928,-10,-88.44514924903928,0,-88.44514924903928]},
            {from:"消费主体", to:"服务目标视图", text:"协作", category:"arrow", points:[1072.2156124987555,202.2378165763875,1062.2156124987555,202.2378165763875,686.1078062493777,202.2378165763875,686.1078062493777,-88.44514924903928,310,-88.44514924903928,300,-88.44514924903928]},
            {from:"载体及资源视图", to:"消费主体", text:"交互", category:"bieArrow", points:[150,1284.9638497993387,150,1274.9638497993387,150,1290.051949689073,1222.2156124987555,1290.051949689073,1222.2156124987555,238.9741447013875,1222.2156124987555,228.9741447013875]},
            {from:"载体及资源视图", to:"提供主体及网络", text:"交互", category:"bieArrow", points:[150,1284.9638497993387,150,1274.9638497993387,150,1285.533378937097,-922.2156124987555,1285.533378937097,-922.2156124987555,238.9741447013875,-922.2156124987555,228.9741447013875]}
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
         { category: 'produce',id:1},
         { category: 'consumer',id:2},
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
                          category: 'carrier',id:3
                        },
                    {
                      columnDefinitions: [
                        { attr: "name", text: "Name", column: 0 },
                        { attr: "value", text: " Value ", column: 1 },
                      ],
                      people: [
                        { columns: [{ attr: "name", text: "attr1" }, { attr: "value", text: "value1" }] },
                      ],
                      category: 'source',id:4
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

            { category:'task',id:5},
            { category:'start',id:6},
           { category:'end',id:7},
            { category:'time',id:8},
            { category:'message',id:9},
            { category: 'exclusive',id:10},
             { category: 'parallel',id:11},

            { key: 1, text: "Pool", isGroup: true, category: "Pool",id:12 },
            { key: 2, text: "Lane", isGroup: true, category: "Lane", group: 1},
            { key: 3, text: "Lane", isGroup: true, category: "Lane", group: 1},
        ],
        link: [
        ],
    }, 
    '服务目标视图':{
        node: [
            { category: 'strategic',id:13 },           
            { category: 'emotion',id:14 },
            { category: 'physical',id:15},
            { category: 'amount' ,id:16},
            { category: 'subgoal',id:17},
        ],
        link: [
        ],
    }
}

var dataStore = new DataStore()
export default dataStore
export {
    view2data,
    view2palatte,
    view2postion,
}