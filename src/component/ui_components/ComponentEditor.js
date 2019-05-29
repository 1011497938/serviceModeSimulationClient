import React from 'react';
import * as go from 'gojs';
import dataStore,{view2data} from '../../dataManager/dataStore';
import Draggable from 'react-draggable'; // The default

export default class ComponentEditor extends React.Component{

    render(){
        return (
            <Draggable>
                <div style={{zIndex:30, position:'relative', width: 100, height: 100, background: 'gray'}}>

                </div>
            </Draggable>
        )
    }
}