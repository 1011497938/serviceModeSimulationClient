import React from 'react';
import * as go from 'gojs';
import dataStore,{view2data} from '../../dataManager/dataStore';
import Draggable from 'react-draggable'; // The default
import $ from 'jquery'
import { widget2attr, getKeys,wa } from '../../dataManager/attribute';
import { Menu, Segment, Dropdown, Input, Icon, Button} from 'semantic-ui-react';
import { isArray } from 'util';
import deepcopy from 'deepcopy'
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
        const {component} = this.props
        const {data} = component

        this.setState({data: deepcopy(data)})

        const attr_list = this.getAttrList()
        this.setState({activeItem: getKeys(attr_list)[0]})
    }
    componentWillMount(){
        this.refresh()
    }
    componentWillReceiveProps(){
        this.refresh()
    }

    renderComponent(elm){
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
            case wa.gateway:
                Component = this.renderGateWay(elm)
                break
            default:
                break;
        }
        return Component
    }
    renderGateWay(column){
        const {content, based_on} = column
        const {component} = this.props
        const {data} = this.state
        const {category, key} = data 
        const gateValue = data[based_on]

        // console.log(content, gateValue)
        return content[gateValue] && content[gateValue].map(elm => this.renderComponent(elm))
    }
    renderEnum(column){
        const {component, diagram} = this.props
        const {data} = this.state
        const {category, key} = data 

        let {name,content, multiple, onChange} = column

        // 现在的问题就是刷新要不要写个监视器
        multiple = multiple?true:false
        content =  typeof(content)==='function'? content(): content
        return (
        <span key={name + key + category}>
            {name}:
            <Dropdown 
            value={data[name] || (multiple?[]:'')}  //这里会报错，因为undefined的问题
            options={content.map(elm=>{
            return { key: elm, text: elm, value: elm}
            })}
            fluid multiple={multiple} selection inline 
            // search
            onChange = {(e,{value})=>{
                // diagram.model.startTransaction("change" + name);
                // diagram.model.setDataProperty(data, name, value);
                // diagram.model.commitTransaction("change" + name);
                data[name] = value
                this.setState({data: data})
                e.preventDefault()
            }}
            />
            <br />
        </span>
        )
    }

    renderValue(column){
        const {component, diagram} = this.props
        const {data} = this.state
        const {category, key} = data 

        let {name, multiple, unqiue, unique_scope} = column

        // console.log(column)
        // 现在的问题就是刷新要不要写个监视器
        multiple = multiple?true:false
        return (
        <span key={name + key + category}>
            {name}:
            <Input 
            fluid
            value={data[name] || ''}
            // label={name}
            onChange = {(e,{value})=>{
                // diagram.model.startTransaction("change" + name);
                // diagram.model.setDataProperty(data, name, value);
                // diagram.model.commitTransaction("change" + name);
                data[name] = value
                this.setState({data: data})
                e.preventDefault()
            }}
            />
            <br />
        </span>
        )
    }

    renderText(column){
        // console.log(column)
        const {component, diagram} = this.props
        const {data} = this.state
        const {category, key} = data 

        let {name, multiple} = column

        // 现在的问题就是刷新要不要写个监视器
        multiple = multiple?true:false
        return (
        <span key={name + key + category}>
            {name}:
            <Input 
            key={name + key + category + 'i'}
            fluid
            value={data[name] || ''}
            // label={name}
            onChange = {(e,{value})=>{
                // console.log(value, data, name)
                // diagram.model.startTransaction("change" + name);
                // diagram.model.setDataProperty(data, name, value);
                // diagram.model.commitTransaction("change" + name);
                data[name] = value
                this.setState({data: data})
                e.preventDefault()
            }}
            />
            <br />
        </span>
        )
    }

    handleSave(){
        console.log('保存！')
        const {component, diagram} = this.props
        const {data} = component
        const {data:new_data} = this.state
        const {data: old_data} = component
        const {category, key} = data 
        const attr_list = widget2attr[category]
        let attrs = []
        for(let item in attr_list)
            attrs = [...attrs, ...attr_list[item]]
        let is_valid = true
        for(let name in new_data){
            const value = new_data[name]
            const constrain = attrs.find(elm=> elm.name===name)
            if(constrain){
                // 在这里添加约束
                const {unqiue, unique_scope, range} = constrain
                // can_refresh = false
            }
        }
        
        if(is_valid){
            diagram.model.startTransaction("change" + key);
            for(let name in new_data){
                const value = new_data[name]
                // diagram.model.
                diagram.model.setDataProperty(old_data, name, value);
            }
            diagram.model.commitTransaction("change" + key);
        }
    }
    render(){
        const {activeItem} = this.state 
        const {component} = this.props
        const {data} = component
        const {category} = data 
        const attr_list = widget2attr[category]

        return (
            <div style={{zIndex:30, position:'absolute',  width: 300,height: 500, //background: 'white', 
                right: '5%', top: '10%',
            }}>
                <Menu  pointing secondary fluid style={{background: 'white', borderTop: '1px solid gray'}}>
                    {getKeys(attr_list).map(elm=>
                        <Menu.Item
                        key={elm}
                        name={elm}
                        active={activeItem === elm}
                        onClick={()=> this.setState({activeItem: elm})}
                        />        
                    )}
                    <Menu.Menu position='right'>
                        <Menu.Item
                        onClick={()=> {}}
                        >  
                            <Icon name='delete' onClick={()=>{ this.props.parent.setState({selected_component: undefined})}}/>
                        </Menu.Item>  
                    </Menu.Menu>
                </Menu>
                <Segment style={{marginTop:"-20px"}}>
                    {
                        attr_list[activeItem] &&
                        attr_list[activeItem].map(elm=>{
                            return this.renderComponent(elm)
                        })
                    }
                    <Button color='blue' 
                    onClick={this.handleSave.bind(this)}
                    >保存</Button>
                </Segment>
            </div>

        )
    }
}