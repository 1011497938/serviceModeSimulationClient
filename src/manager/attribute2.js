import stateManger from "./stateManager";

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

        this.category2component = {
            Procuder: Procuder,
            Consumer: Consumer,

            AmountGoal: AmountGoal,
            BusinessGoal: BusinessGoal,

            Carrier: Carrier,
            FinaResource: FinaResource,
            HumanResource: HumanResource,
            EntityResource: EntityResource,
            KnowlResource: KnowlResource,

            ExclusiveGateWay: ExclusiveGateWay,
            ParallelGateWay: ParallelGateWay,

            Task: Task,
        }
    }
    create(component, controller){ //传进一个控件
        const {data} = component
        const {category, key} = data
        // console.log(category)
    }
    createRelation(from, to, relation_name){

    }
    bind(graph_component, controller, component){

    }
    toJson(){

    }
    readJson(){

    }
}

class Item{
    constructor(props){
        this.constrain = {
            name : {type: wa.text, tag: wa.tag_miaoshu},
            key : {type: wa.text, unique: true, tag: wa.tag_miaoshu, readonly: false},
            描述 : {type: wa.text, tag: wa.tag_miaoshu},
            category: {type: wa.text, readonly: true, invisible: true},
        }
    }
    init(props){
        const {constrain} = this
        for(let prop_name in constrain){
            const prop_constrain = constrain[prop_name]
            const value = props[prop_name]
            // if(!this[prop_name] && value && this.checkValueMatchConstrain(value, prop_constrain))
            this[prop_name] = value
        }
    }
    checkValueMatchConstrain(value, constrain){
        return true
    }
    // 测试value值是否符合
    checkAttrWithValue(attr_name, value){

    }
    setAttrWithValue(attr_name, value){

    }
    setAttrConstrain(attr_name, constrain){
        this.constrain[attr_name] = constrain
    }
    addAttrConstrain(attr_name, constrain){

    }
}

class Relation extends Item{
    constructor(props){
        super(props)

        this.constrain = {
            ...this.constrain,
            from: { type: wa.item, },
            to: {type: wa.item},
        }

        this.init()
    }
}

class Role extends Item{
    constructor(props){
        super(props)

        this.constrain = {
            ...this.constrain,
            relations: { type: wa.relation, multiple: true},
        } 

        this.init()
    }
}

class Procuder extends Role{
    constructor(props){
        super(props)
        this.init()
    }
}
class Consumer extends Role{
    constructor(props){
        super(props)
        this.init()
    }
}

class Task extends Item{
    constructor(props){
        super(props)
        this.constrain = {
            ...this.constrain,
            上一步: {type: wa.relation, to: [Task, GateWay], },
            下一步: {type: wa.relation, to: [Task, GateWay], },
            所需资源: {type: wa.relation,  to: [Resource], },
            目标: {type: wa.relation, to: [Goal], },
            涉及载体: {type: wa.relation, to: [Role], }
        }
        this.init()
    }
}

class GateWay extends Item{
    constructor(props){
        super(props)
        this.constrain = {
            ...this.constrain,
            上一步: {type: wa.relation, to: [Event, Task], },
            下一步: {type: wa.relation, to: [Event, Task], multiple: true, },
        }
        this.init()
    }
}
class ParallelGateWay extends GateWay{

}
class ExclusiveGateWay extends GateWay{
    constructor(props){
        super(props)
        this.constrain = {
            ...this.constrain,
            condition: {type: wa.text, },
        }
        this.init()
    }
}
class Resource extends Item{
    constructor(props){
        super(props)
        this.constrain = {
            ...this.constrain,
            运维关系: {type: wa.relation, from: [Carrier],},
            从属关系: {type: wa.relation, from: [Carrier],},
            直接转换: {type: wa.relation, to: [Resource],},
        }
        this.init()
    }
}
class FinaResource extends Resource{

}
class HumanResource extends Resource{
    
}
class EntityResource extends Resource{
    
}
class KnowlResource extends Resource{
    
}

class Event extends Item{

}

class Carrier extends Item{
    constructor(props){
        super(props)
        this.constrain = {
            ...this.constrain,
            运维主体: {type: wa.relation, to: [Role]},
            持有主体: {type: wa.relation, to: [Role]},
        }
        this.init()
    }
}

class Goal extends Item{
    constructor(props){
        super(props)
        this.constrain = {
            ...this.constrain,
            涉及活动: {type: wa.relation, to: [Task], },
            协同关系: {type: wa.relation, to: [Goal], },
            排他关系: {type: wa.relation, to: [Goal], },
            从属关系: {type: wa.relation, to: [Goal], },
        }
        this.init()
    }
}
class StrategyGoal extends Goal{

}
class EmotionGoal extends Goal{
    
}
class PhysicsGoal extends Goal{
    
}
class AmountGoal extends Goal{
    
}
class BusinessGoal extends Goal{
    
}
const compCompany = new Company()

const getKeys = obj => Object.keys(obj)
export {
    compCompany
}