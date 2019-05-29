import React from 'react';
import * as go from 'gojs';
import dataStore,{view2data} from '../../dataManager/dataStore';
import Draggable from 'react-draggable'; // The default

export default class ComponentEditor extends React.Component{

    componentDidMount = () => {
      
    }
    
    render(){
        const {component, diagram} = this.props
        // const init_position = diagram.transformViewToDoc(component.location)
        // console.log(component.getDocumentPoint(go.Spot.Center), component.location,component.position, init_position.x, init_position.y)
        // console.log(component, diagram, diagram.transformViewToDoc,component.position)
        // console.log()
        return (
            // <Draggable
            // // defaultPosition={{x: document., y: init_position.y}}
            // onDrag={(e,p)=>{console.log(e,p)}}
            // >
            <div style={{zIndex:30, position:'absolute', width: 200, height: 500, background: 'gray', right: '20%', top: 150}}>

            </div>
            // </Draggable>
        )
    }
}