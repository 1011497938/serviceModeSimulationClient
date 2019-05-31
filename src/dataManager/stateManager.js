import { observable, action, computed } from "mobx";
import dataStore from "./dataStore";
import { view2controller } from "../component/function_components/goController/GraphController.ts";

class StateManager{
    show_view_name = observable.box(dataStore.default_view_name)
    changeView = view =>{
        this.show_view_name.set(view)
    }

    // 这里不知道为啥会跑好多次
    get show_view_controller(){
        const show_view_name = this.show_view_name.get()
        // console.log(show_view_name)
        return view2controller[show_view_name]
    }

    select_component_ingo = undefined
    

    overview_need_refesh = observable.box(true)
    overviewRefesh(){
        // console.log('refresh overview')
        const value = this.overview_need_refesh.get()
        this.overview_need_refesh.set(!value)
    }

    selected_graph_object = undefined
    selected_graph_object_needrefesh = observable.box(false)
    selectGraphObject(object){
        if(this.selected_graph_object!==object){
            const signal = !this.selected_graph_object_needrefesh.get()
            this.selected_graph_object = object
            this.selected_graph_object_needrefesh.set(signal)
            // console.log(object, signal)
        }
    }

    getCenterController(){
        return view2controller[this.show_view_name.get()]
    }

    get all_nodes(){
        let node_array = []
        for(let view in view2controller){
            const nodes = view2controller[view].diagram.model.nodeDataArray
            node_array = [...node_array, nodes]
        }
        return node_array
    }
    get all_resources(){
        const node_array = view2controller['载体及资源视图'].diagram.model.nodeDataArray
        // console.log(node_array)
        return node_array.filter(elm=> elm.category==='resource')
    }
    get all_carriers(){
        const node_array = view2controller['载体及资源视图'].diagram.model.nodeDataArray
        // console.log(node_array)
        return node_array.filter(elm=> elm.category==='carrier')
    }

    get all_consumers(){
        const node_array = view2controller['协同生态视图'].diagram.model.nodeDataArray
        // console.log(node_array)
        return node_array.filter(elm=> elm.category==='consumer')
    }

    get all_producers(){
        const node_array = view2controller['协同生态视图'].diagram.model.nodeDataArray
        // console.log(node_array)
        return node_array.filter(elm=> elm.category==='producer')
    }

    get all_tasks(){
        const node_array = view2controller['服务过程视图'].diagram.model.nodeDataArray
        // console.log(node_array)
        return node_array.filter(elm=> elm.category==='task')
    }

    get all_goals(){
        const node_array = view2controller['服务目标视图'].diagram.model.nodeDataArray
        // console.log(node_array)
        return node_array
    }
}


var stateManger = new StateManager()

export default stateManger
