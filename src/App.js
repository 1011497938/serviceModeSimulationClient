import React from 'react';
import './App.css';
// import Test from './component/function_components/Test'
import { Icon, Dropdown, Input, Search, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { view2controller } from './component/function_components/goController/GraphController.ts'

import Nav from './component/ui_components/Nav'
import MyPalatte from './component/function_components/MyPalatte'
import { autorun } from 'mobx';
import stateManger from './manager/stateManager';
import dataStore from './manager/dataStore';

import GlobalOverview from './component/function_components/GlobalOverview';
import CommonView from './component/function_components/CommonView'

import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-dark-theme.css';
import GoldenLayout from 'golden-layout';
import { updateAllGraph } from './component/function_components/goController/GraphController.ts';
import Center from './component/function_components/Center.js'

function wrapComponent(Component, store) {
  class Wrapped extends React.Component {
    render() {
      return (
        <Component {...this.props}/>
      );
    }
  }
  return Wrapped;
};

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show_view_name:dataStore.default_view_name,
      show: false
    }
  }

  initGoldenLayout() {
    const wrapConfig = view_name =>{
      return {
        type: 'react-component',
        component: view_name,
        title: view_name,
        isClosable: false,
        props: { view_name: view_name }
      }
    }
    var config1 = {
      content:[
        {
          type: 'row',
          content: [
            wrapConfig('服务过程视图'),
            {
              type: 'column',
              content: [
                {
                  type: 'row',
                  content: [
                    wrapConfig('协同生态视图'),
                    wrapConfig('服务目标视图')
                  ]
                },
                {
                  type: 'row',
                  content: [
                    wrapConfig('服务价值视图'),
                    wrapConfig('载体及资源视图')
                  ]
                },
                // wrapConfig('全局视图'),
              ]
            }
          ]
        }]
    }
    var config2 = {
      content: [
        {
          type: 'row',
          content: [
            {
              type: 'stack',
              content: [
                wrapConfig('服务过程视图'),
                wrapConfig('协同生态视图'),
                wrapConfig('服务目标视图'),
                wrapConfig('服务价值视图'),
                wrapConfig('载体及资源视图'),
              ]
            },
            // wrapConfig('全局视图')
          ]
        }
      ]
    }
    var layout = new GoldenLayout(config1, this.layout);

    dataStore.view_names.forEach((view_name, index) => {
      layout.registerComponent(view_name, CommonView);
    })
    layout.registerComponent('全局视图', GlobalOverview);

    layout.init();

    window.addEventListener('resize', () => {
      layout.updateSize();
    });
    layout.on('stateChanged', (event) => {
      // console.log(event)
      updateAllGraph()
    })
    this.layout = layout
  }
  componentDidMount() {
    this.initGoldenLayout()
  }

  render(){
    return (
      <div style={{ height: '100%', width: '100%', position: 'relative' }}>
        <div style={{ position: 'relative', height: '8%' }}>
          <Nav/>
        </div>
        <div style={{ height: '92%', width: '100%', position: "relative" }}>
          <MyPalatte/>
          <div ref={input => this.layout = input} style={{ height: '100%', width: '94%', position: 'relative', float: 'right' }}/>
        </div>
      </div>
    )
  }
}




export default App;