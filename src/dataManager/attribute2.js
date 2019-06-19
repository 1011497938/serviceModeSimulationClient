import stateManger from "./stateManager";
import { textChangeRangeIsUnchanged } from "typescript";

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

    input: 'input',
    output: 'output',

    tag_miaoshu: '描述',
    tag_yueshu: '约束',
    tag_compute: '计算' 
}

// const {all_links, all_nodes} = stateManger
class Company{
    constructor(){
        this.entity = new Set()
        this.relations = new Set()

        this.graph2component = {}
        this.component2graph = {}
    }
    create(component){ //传进一个控件
        const {data} = component
        const {category} = data
        console.log(category)
        
    }
    bind(graph_component, component){

    }
    toJson(){

    }
    readJson(){

    }
}

class Item{
    constructor(props){
        const {key, 简介} = props
        this.name = key
        this.key = key
        this.简介 = 简介

        this.constrain = {
            name: {type: wa.text, tag: wa.tag_miaoshu},
            key : {type: wa.text, unique: true, tag: wa.tag_miaoshu},
            描述 : {type: wa.text, tag: wa.tag_miaoshu}
        }
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
    }
}


class Role extends Item{
    constructor(props){
        super(props)
        this.relations = new Set() //角色之间的关系,computed属性
        this.type = props.category
        // this.
    }
}

class Procuder extends Role{

}
class Consumer extends Role{

}

class Task extends Item{

}

class Resource extends Item{
    
}

const compCompany = new Company()

const getKeys = obj => Object.keys(obj)
export {
    compCompany,
    Item
}