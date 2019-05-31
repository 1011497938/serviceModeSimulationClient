import React from 'react';
import * as go from 'gojs';
import dataStore,{view2data} from '../../dataManager/dataStore';
import Draggable from 'react-draggable'; // The default
import $ from 'jquery'
import { widget2attr, getKeys,wa } from '../../dataManager/attribute';
import { Menu, Segment, Dropdown, Input } from 'semantic-ui-react';
export default class ComponentEditor extends React.Component{
    state = {

    }
    // constructor(props){
    //     super(props)

    // }
    getAttrList(){
        const {component} = this.props
        const {data} = component
        const {category} = data 
        const attr_list = widget2attr[category]
        return attr_list
    }
    refresh(){
        const attr_list = this.getAttrList()
        this.setState({activeItem: getKeys(attr_list)[0]})
    }
    componentWillMount(){
        this.refresh()
    }
    componentWillReceiveProps(){
        this.refresh()
    }

    renderEnum(column){
        const {component} = this.props
        const {data} = component
        const {category, key} = data 

        let {name,content, multiple} = column

        // 现在的问题就是刷新要不要写个监视器
        multiple = multiple?true:false
        content =  typeof(content)==='function'? content(): content
        return (
        <span key={name + key + category}>
            {name}:
            <Dropdown 
            options={content.map(elm=>{
            return { key: elm, text: elm, value: elm}
            })}
            fluid multiple={multiple} selection inline
            />
        </span>
        )
    }

    renderValue(column){
        const {component} = this.props
        const {data} = component
        const {category, key} = data 

        let {name,multiple} = column

        // 现在的问题就是刷新要不要写个监视器
        multiple = multiple?true:false
        return (
        <span key={name + key + category}>
            {name}:
            <Input fluid/>
        </span>
        )
    }

    renderText(column){
        const {component} = this.props
        const {data} = component
        const {category, key} = data 

        let {name, multiple} = column

        // 现在的问题就是刷新要不要写个监视器
        multiple = multiple?true:false
        return (
        <span key={name + key + category}>
            {name}:
            <Input fluid/>
        </span>
        )
    }
    render(){
        const {activeItem} = this.state 
        const {component} = this.props
        const {data} = component
        const {category} = data 
        const attr_list = widget2attr[category]

        return (
            <div style={{zIndex:30, position:'absolute',  minWidth: 300,height: 500, //background: 'white', 
                right: '20%', top: '20%',
            }}>
                <Menu  pointing secondary fluid>
                    {getKeys(attr_list).map(elm=>
                        <Menu.Item
                        key={elm}
                        name={elm}
                        active={activeItem === elm}
                        onClick={()=> this.setState({activeItem: elm})}
                        />        
                    )}
                </Menu>
                <Segment>
                    {
                        attr_list[activeItem].map(elm=>{
                            const {type} = elm
                            let Component = undefined
                            switch (type) {
                                case wa.enum:
                                    Component = this.renderEnum(elm)
                                    break;
                                case wa.text:
                                    Component = this.renderText(elm)
                                    break;
                                case wa.value:
                                    Component = this.renderValue(elm)
                                    break
                                default:
                                    break;
                            }
                            return Component
                        })
                    }
                </Segment>
            </div>
        )
    }
}