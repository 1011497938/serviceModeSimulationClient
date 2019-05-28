import { observable, action } from "mobx";
import dataStore from "./dataStore";
import { view2controller } from "../component/function_components/goController/GraphController.ts";

class StateManager{
    show_view_name = observable.box(dataStore.default_view_name)
    // @action setShowViewName = ()=>{}
    //  action(name=> this.show_view_name = name)
    selet_component_ingo = observable.box('1')

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