import React, { Component } from 'react'
import { Grid, Menu, Segment, Dropdown, Input } from 'semantic-ui-react'
import stateManger from '../../manager/stateManager';
import dataStore from '../../manager/dataStore';
import { autorun } from 'mobx';
import LoginModal from './LoginModal';

export default class MenuExampleTabularOnLeft extends Component {
    constructor(props){
        super(props)
        this.state = {
            show_view_name: dataStore.default_view_name,
            show_view_names: dataStore.default_view_names,
        }
    }

    componentDidMount(){
        this.onViewChange = autorun(()=>{
            const show_view_name = stateManger.show_view_name.get()
            const show_view_names = stateManger.show_view_names.slice()
            this.setState({
              show_view_name: show_view_name,
              show_view_names: show_view_names,
              
            })
        })
    }

    render(){
        const { show_view_name, show_view_names} = this.state
        return (

        <Menu fluid style={{background: '#2B2C30', borderBottom:'1px solid #666',height:'100%',borderRadius:'0px'}}>

            <Menu.Item  onClick={()=>{window.location.href="http://localhost:3000/home"}} style={{fontSize: 20, color: 'white',cursor:'pointer',marginTop:-5}} name='服务模式'/>
            {/* {
                dataStore.view_names.map(elm=>{
                    return (
                    <Menu.Item
                    key={elm}
                    name={elm}
                    active={show_view_names.includes(elm)}
                    onClick={()=> stateManger.changeView(elm)}
                    />
                    )
                })
            } */}
            <Menu.Menu  style={{width:'90%'}}>
         
                    <Menu.Item style={{ color:'white'}} >
                    新建&nbsp;<span className="iconfont">&#xe600;</span>
                    </Menu.Item>
                    <Menu.Item style={{ color:'white'}} onClick={()=>{}} >
                    保存&nbsp;<span className="iconfont">&#xe794;</span>
                    </Menu.Item>
            
               <div style={{marginLeft:'65%'}}>
                    <Input       
                        placeholder='搜索'
                        color='#fff'
                        style={{margin:10, top: 2,marginRight:30,height:30}}
                    />
                    <span onClick={()=>{window.location.href="http://localhost:3000/center"}} style={{paddingTop:20,marginRight:20,cursor:'pointer', color:'white'}}><i className="user icon"></i>个人中心</span>
                </div>
            </Menu.Menu>
        </Menu>
        )
    }
}