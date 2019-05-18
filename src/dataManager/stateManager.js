import { observable, action } from "mobx";
import dataStore from "./dataStore";

class StateManager{
    show_view_name = observable.box(dataStore.default_view_name)
    // @action setShowViewName = ()=>{}
    //  action(name=> this.show_view_name = name)
    selet_component_ingo = observable.box('1')
}

var stateManger = new StateManager()
export default stateManger