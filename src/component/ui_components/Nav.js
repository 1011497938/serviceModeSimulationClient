import React, { Component } from 'react'
import { Grid, Menu, Segment, Dropdown, Input } from 'semantic-ui-react'
import stateManger from '../../dataManager/stateManager';
import dataStore from '../../dataManager/dataStore';
import { autorun } from 'mobx';
import LoginModal from './LoginModal';

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
        const { show_view_name, } = this.state
        return (
        <Menu style={{height: 50}} inverted>
            <Menu.Item name='服务模式'/>
            {
                dataStore.view_names.filter(elm=> elm!=='全局视图').map(elm=>{
                    return (
                        <Menu.Item
                        name={elm}
                        active={show_view_name === elm}
                        onClick={()=>  stateManger.changeView(elm)}
                      />
                    )
                })
            }
            <Menu.Menu position='right'>
            {/* <Menu.Item>
                
            </Menu.Item> */}
            <Input       
                placeholder='搜索'
                color='#fff'
                style={{margin: 10, top: 2}}
            />
            <LoginModal/>
            </Menu.Menu>
        </Menu>
        )
    }
}