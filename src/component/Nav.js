import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import stateManger from '../dataManager/stateManager';

export default class MenuExampleTabularOnLeft extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected_view: '全局视图'
        }
        this.view_names = ['全局视图', '协同生态视图', '载体及资源视图', '服务价值视图', '服务过程视图', '服务目标视图', '登录/注册']
    }


    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { selected_view } = this.state

        return (
            <Menu pointing vertical>
            {
                this.view_names.map(text=>{
                    const handleClick = ()=>{
                        console.log('click',text)
                        stateManger.show_view_name.set(text)
                        this.setState({selected_view: text})
                    }
                    return (
                    <Menu.Item
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