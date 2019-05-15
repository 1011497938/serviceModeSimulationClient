import React, {
    Component
} from 'react'
import {
    Grid,
    Menu,
    Segment
} from 'semantic-ui-react'
import stateManger from '../dataManager/stateManager';
import dataStore from '../dataManager/dataStore';

export default class MenuExampleTabularOnLeft extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected_view: dataStore.view_names[0]
        }
    }
    handleItemClick = (e, {
        name
    }) => this.setState({
        activeItem: name
    })
    render() {
        const {
            selected_view
        } = this.state

        return (
            <Menu pointing vertical style={{marginTop:'60px',left:'2%',height:'100%'}}>
            {
                 dataStore.view_names.map(text=>{
                    const handleClick = ()=>{
                        stateManger.show_view_name.set(text)
                        this.setState({selected_view: text})
                    }
                    return (
                    <Menu.Item
                        key={text}
                        name={text}
                        active={selected_view === text}
                        onClick={handleClick}

                    />
                    )
                })
            }
            </Menu>
        )
    }
}