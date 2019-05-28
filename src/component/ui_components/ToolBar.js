import React from 'react';
import * as go from 'gojs';

import { Icon, Menu, Dropdown} from 'semantic-ui-react'
// import {ArrowLinkTemplate, BidirctArrowLinkTemplate, commonLinkTemplate,} from '../function_components/goController/GraphController.ts'

const common_link_map = {}
export default class ToolBar extends React.Component{
    constructor(props){
        super(props)
        this.state =  {
        }
    }

    // setDefaultLink(value){
    //   let {controller, link_map} = this.props
    //   // console.warn(controller)
    //   link_map = link_map || common_link_map
    //   if (controller) {
    //     console.log(value,  link_map[value])
    //     controller.linkTemplateMap.add('', link_map[value])
    //   }else{
    //     console.error(controller,'为空')
    //   }
    // }
    render(){
      let {controller, link_map} = this.props
      // console.log(controller, link_map )
      link_map = link_map || common_link_map
      // console.log(Object.keys(link_map)[0])rgb(133,158,158)
      return (
          <Menu fluid style={{background:'rgb(133,158,158)', height:35}}>
            <Menu.Item style={{color:'#fff'}}>
              保存&nbsp;<span className="iconfont">&#xe794;</span>
          </Menu.Item> 
          <Menu.Item onClick={this.handleDelete} style={{color:'#fff'}}>
            删除&nbsp;<span className="iconfont">&#xe661;</span>
          </Menu.Item>
          <Dropdown
            placeholder='选择连线'
            // fluid
            selection
            options={Object.keys(link_map).map(elm=>{
              return {key: elm, text: elm, value: elm, }
            })}
            defaultValue={Object.keys(link_map)[0]}
            onChange={(event, {value})=>{
              controller.setDeafultLineType(value)
              // this.setDefaultLink(value)
            }}
          />
        </Menu>
      )
    }
}