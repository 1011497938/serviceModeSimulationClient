import React from 'react';
import * as go from 'gojs';

import {view2controller} from './goController/GraphController.ts'
import { Icon, Menu} from 'semantic-ui-react'
import dataStore,{view2palatte} from '../../manager/dataStore';
import { autorun } from 'mobx';
import stateManger from '../../manager/stateManager';
import {paletteTemplate, panelTemplate, palNodeTemplateMap, palGroupTemplateMap, palLinkTemplateMap} from './goController/Template.ts'

const $ = go.GraphObject.make;
// 5月28日，创建一个可以切换的调色板
export default class MyPalatte extends React.Component{
    
    init_graph(){
      this.palNodeTemplateMap = palNodeTemplateMap
      this.palLinkTemplateMap = palLinkTemplateMap
      this.palGroupTemplateMap = palGroupTemplateMap
      this.palette = $(go.Palette, this.refs.palette_div,  // must name or refer to the DIV HTML element{ // share the templates with the main Diagram
        {
          nodeTemplateMap: this.palNodeTemplateMap,
          linkTemplateMap: this.palLinkTemplateMap,
          groupTemplateMap: this.palGroupTemplateMap,
          layout: $(go.GridLayout,{})
        }
      )
      let nodes = []
      for(let view in view2palatte){
        nodes = [...nodes, ...view2palatte[view].node]
      }

      this.palette.model = new go.GraphLinksModel(nodes);
    }

    componentDidMount(){
      this.init_graph()
      this.onViewChange = autorun(()=>{
        const show_view_name = stateManger.show_view_name.get()
        this.palette.model = new go.GraphLinksModel(view2palatte[show_view_name].node);
      })
    }

    render(){
      // , background: 'black'
      return (
        <div style={{height: '100%', width: '5%', position: 'relative', float: "left", borderRadius: 4 , }}>
            <div ref='palette_div'  style={{background: '#000',position: 'absolute', width: '100%', height: '100%', borderTop: '1px solid black'}}/>
        </div>
      )
    }
  }