
import React from 'react';
import * as go from 'gojs';

import { Icon, Menu, Dropdown} from 'semantic-ui-react'
import {ArrowLinkTemplate, BidirctArrowLinkTemplate, commonLinkTemplate,} from '../function_components/goController/GraphController.ts'
export default class ToolBar extends React.Component{
    constructor(props){
        super(props)
        this.state =  {

        }
    }
    render(){
      const {controller} = this.props
        return (
            <Menu fluid style={{background:'rgb(133,158,158)', height:60}}>
             <Menu.Item style={{color:'#fff'}}>
                保存&nbsp;<span className="iconfont">&#xe794;</span>
            </Menu.Item> 
            <Menu.Item onClick={this.handleDelete} style={{color:'#fff'}}>
              删除&nbsp;<span className="iconfont">&#xe661;</span>
            </Menu.Item>
            <Dropdown
              placeholder='选择连线'
              style={{background:'rgb(133,158,158)',color:"#fff",paddingTop:'20px',textAlign:'center'}}
              selection
              options={[
                {key: '直线', text: '直线', value: '直线', },
                {key: '箭头', text: '箭头', value: '箭头', },
                {key: '双向箭头', text: '双向箭头', value: '双向箭头', },
              ]}
              onChange={(event, {value})=>{
                const map = {
                  '双向箭头': BidirctArrowLinkTemplate,
                  '直线':  commonLinkTemplate,
                  '箭头': ArrowLinkTemplate,
                }
                controller.linkTemplateMap.add('', map[value])
              }}
            />
          </Menu>
        )
    }
}