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
}

var stateManger = new StateManager()
export default stateManger