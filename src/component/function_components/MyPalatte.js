import React from 'react';
import * as go from 'gojs';

import {view2controller} from './goController/GraphController.ts'
import { Icon, Menu} from 'semantic-ui-react'
import dataStore,{view2palatte} from '../../dataManager/dataStore';
import { autorun } from 'mobx';
import stateManger from '../../dataManager/stateManager';
import {paletteTemplate, panelTemplate, palNodeTemplateMap, palGroupTemplateMap, palLinkTemplateMap} from './goController/Template.ts'

const $ = go.GraphObject.make;
// 5月28日，创建一个可以切换的调色板
export default class MyPalatte extends React.Component{
    
    init_graph(){
      this.palNodeTemplateMap = palNodeTemplateMap
      this.palLinkTemplateMap = palLinkTemplateMap
      this.palGroupTemplateMap = palGroupTemplateMap
      this.palette = $(go.Palette, this.refs.myPaletteDiv,  // must name or refer to the DIV HTML element{ // share the templates with the main Diagram
        {
          nodeTemplateMap: this.palNodeTemplateMap,
          linkTemplateMap: this.palLinkTemplateMap,
          groupTemplateMap: this.palGroupTemplateMap,
          layout: $(go.GridLayout,{})
        }
      )
      
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
        <div style={{float:'left', position: 'relative'}}>
            <div ref='myPaletteDiv'  style={{position: 'absolute', width: 130, height: 500, borderTop: '1px solid black'}}/>
        </div>
      )
    }
  }