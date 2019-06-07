import React, { Component } from 'react'
import { Grid, Menu, Segment, Dropdown } from 'semantic-ui-react'
import stateManger from '../../dataManager/stateManager';
import dataStore from '../../dataManager/dataStore';
import { autorun } from 'mobx';

export default class MenuExampleTabularOnLeft extends Component {
    constructor(props){
        super(props)
        this.state = {
            show_view_name: dataStore.default_view_name,
        }
    }

    componentDidMount(){
        this.onViewChange = autorun(()=>{
            const show_view_name = stateManger.show_view_name.get()
            this.setState({
              show_view_name: show_view_name
            })
        })
    }

    render() {
        const { show_view_name } = this.state

        return (
        <Dropdown 
            text={show_view_name}
            fluid
            closeOnChange
            defaultValue={dataStore.default_view_name}
            className='select_view_drowdown'
            
        >
            <Dropdown.Menu style={{marginTop:20}}>
                {
                dataStore.view_names.map(text=>{
                    return (
                        <Dropdown.Item key={text} text={text}
                            onClick={()=>{
                                stateManger.changeView(text)
                            }}
                        />
                    )
                })
                }
            </Dropdown.Menu>
        </Dropdown>
        )
    }
}