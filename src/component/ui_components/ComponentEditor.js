import React from 'react';
import * as go from 'gojs';
import dataStore,{view2data} from '../../dataManager/dataStore';
import Draggable from 'react-draggable'; // The default
import $ from 'jquery'
import TaskFormEdit from './form_edit/TaskFormEdit'
import CarrierFormEdit from './form_edit/CarrierFormEdit'
import ResourceFormEdit from './form_edit/ResourceFormEdit'
import ConsumerFormEdit from './form_edit/ConsumerFormEdit'
import ProviderFormEdit from './form_edit/ProviderFormEdit'
import GoalFormEdit from './form_edit/GoalFormEdit'
import StartFormEdit from './form_edit/StartFormEdit'
import StrategicGoalFormEdit from './form_edit/StrategicGoalFormEdit'


export default class ComponentEditor extends React.Component{   
    componentDidMount = () => {   

    }
    
    render(){
        const {component, diagram} = this.props
        console.log("传值"+this.props.component);
        return (
            // <Draggable
            // // defaultPosition={{x: document., y: init_position.y}}
            // onDrag={(e,p)=>{console.log(e,p)}}
            // >
            <div style={{zIndex:30, position:'absolute', width:300, height: 500, background: 'gray', 
                right: '20%', top:'20%'}}>
                 {this.props.component=='pruduce'?<ProviderFormEdit/>:""}
                {this.props.component=='consumer'?<ConsumerFormEdit/>:""}

               { this.props.component=='carry'?<CarrierFormEdit/>:""}
               {this.props.component=='source'?<ResourceFormEdit/>:""}
                {this.props.component=='subgoal'?<GoalFormEdit/>:""}
                {this.props.component=='start'?<StartFormEdit/>:""}
                {this.props.component=='task'?<TaskFormEdit/>:""}
                {this.props.component=='stragegic'?<StrategicGoalFormEdit/>:""}
            </div>
            // </Draggable>
        )
    }
}