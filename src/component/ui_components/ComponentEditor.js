import React from 'react';
import * as go from 'gojs';
import dataStore,{view2data} from '../../dataManager/dataStore';
import Draggable from 'react-draggable'; // The default
import $ from 'jquery'
export default class ComponentEditor extends React.Component{

    componentDidMount = () => {
      
    }
    
    render(){
        const {component, diagram} = this.props
        
        return (
            // <Draggable
            // // defaultPosition={{x: document., y: init_position.y}}
            // onDrag={(e,p)=>{console.log(e,p)}}
            // >
            <div style={{zIndex:30, position:'absolute', width: 200, height: 500, background: 'gray', 
                right: '20%', top: '20%',
                // left: init_position.x + window_width/2, top: init_position.y + window_height/2,
            }}>

            </div>
            // </Draggable>
        )
    }
}