import stateManager from "./stateManager";
import { wa } from "./attribute";


// 存放实例化的数据
class ItemManager{
    constructor(){
        this.entity = new Set()
        this.relations = new Set()

        this.graph2component = {}
        this.component2graph = {}

        this.id2graph_item = {}
        this.id2item = {}
    }
    create(component){ //传进一个控件
        const {data} = component
        const {category} = data
        console.log(category)
        
    }
    getItem(id){
        return this.id2item[id]
    }
    getGraphItem(id){
        return this.id2graph_item[id]
    }
    bind(graph_component, component){

    }
    toJson(){

    }
    loadJson(){

    }
}

class Item{
    constructor(props){
        const {key, 简介, category} = props
        this.constrain = {
            name : {type: wa.text, tag: wa.tag_miaoshu},
            key : {type: wa.text, unique: true, tag: wa.tag_miaoshu},
            简介 : {type: wa.text, tag: wa.tag_miaoshu},
        }
    }
    translateGraphAttr2DataAttr(attr_name, value){
        let constrain = this.constrain[attr_name]
        if(!constrain)
            return undefined
        
    }
    // 测试value值是否符合
    checkAttrWithValue(attr_name, value){

    }
    setAttrWithValue(attr_name, value){

    }
    setAttrConstrain(attr_name, constrain){
        this.constrain[attr_name] = constrain
    }
}

class Relation{
    constructor(props){
        this.key = props.key
        this.from = props.from
        this.to = props.to
        this.category = props.category

    }
    get from_graph_items(){

    }
    // ...
}

class Role extends Item{
    constructor(props){
        super(props)
        this.relations = new Set() //角色之间的关系,computed属性
        this.category = props.category
        // this.
    }
}

class Procuder extends Role{
    constructor(props){
        super(props)

        this.constrain.主体等级 = {
            type: wa.enum, 
            content: ['直接提供主体', '间接提供主体'],
            tag: wa.tag_

        }
        this.constrain.目标市场类型 =         {
            type: wa.enum,
            content: ['大众市场','利基市场','区隔化市场','多元化市场','多边市场'],
            multiple: true,
        }

    }
}
class Consumer extends Role{
    constructor(props){
        super(props)

        this.constrain.主体等级 = {
            type: wa.enum, 
            content:  ['非会员','普通会员','高级会员'],
            tag: wa.描述

        }
        this.constrain.目标市场类型 = {
            type: wa.enum,
            content: ['大众市场','利基市场','区隔化市场','多元化市场','多边市场'],
            multiple: true,
            tag: wa.描述
        }
    }
}

class Carrier extends Item {
    constructor(props){
        super(props)

        this.consist_of = props.belong_to  //组成平台的角色，计算属性
        this.resources = props.resources  //包含的资源

        const constrain = this
        constrain.consist_of = {type: wa.enum_relation, content: itemManager.all_roles}
    }
}

class Resource extends Item{
    constructor(props){
        super(props)

        this.类型 = props.类型
        const constrain = this

        constrain.持有主体 = {type: wa.enum_relation, content: itemManager.all_carriers, multiple: true}
        switch(this.类型){
            case '金融资产': 
                break; 
            case '人力资产': 
                break; 
            case '实体资产': 
                break; 
            case '知识资产': 
                break; 
            default :
                break;
        }
    }
}

class Task extends Item{
    constructor(props){

    }
}



const itemManager = new ItemManager()

export default itemManager
