import { observable, action } from "mobx";

class StateManager{
    show_view_name = observable.box('全局视图')
    // @action setShowViewName = ()=>{}
    //  action(name=> this.show_view_name = name)
}

var stateManger = new StateManager()
export default stateManger