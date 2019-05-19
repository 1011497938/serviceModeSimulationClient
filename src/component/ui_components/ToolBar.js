
import React from 'react';
import * as go from 'gojs';

import { Icon, Menu} from 'semantic-ui-react'

export default class ToolBar extends React.Component{
    constructor(props){
        super(props)
        this.state =  {

        }
    }
    render(){
        return (
            <Menu fluid style={{background:'rgb(133,158,158)', height:60}}>
            <Menu.Item style={{color:'#fff'}}>
                新建&nbsp;<span className="iconfont">&#xe600;</span>
            </Menu.Item> 
             <Menu.Item style={{color:'#fff'}}>
                保存&nbsp;<span className="iconfont">&#xe794;</span>
            </Menu.Item> 
            <Menu.Item onClick={this.handleDelete} style={{color:'#fff'}}>
              删除&nbsp;<span className="iconfont">&#xe661;</span>
            </Menu.Item>
            <Menu.Item onClick={this.handleCut} style={{color:'#fff'}}>
              剪切&nbsp;<i className="cut icon"></i>
            </Menu.Item>
            <Menu.Item onClick={this.scrollTop} style={{color:'#fff'}}>
              自适应
            </Menu.Item>                
            <Menu.Item onClick={this.handleCopy} style={{color:'#fff'}}>
              复制&nbsp;<i className="copy icon"></i>
            </Menu.Item> 
            <Menu.Item onClick={this.handlePaste} style={{color:'#fff'}}>
              粘贴&nbsp;<span className="iconfont">&#xe62b;</span>
            </Menu.Item>                               
            <Menu.Item onClick={this.handleSelectAll} style={{color:'#fff'}}>
                全选&nbsp;<span className="iconfont">&#xe729;</span>
            </Menu.Item>      

            <Menu.Item onClick={this.handleback} style={{color:'#fff'}}>
              后退&nbsp;<span className="iconfont">&#xe730;</span>
            </Menu.Item>                             
            <Menu.Item onClick={this.handleForward} style={{color:'#fff'}}>
              前进&nbsp;<span className="iconfont">&#xe731;</span>
            </Menu.Item>
          </Menu>
        )
    }
}