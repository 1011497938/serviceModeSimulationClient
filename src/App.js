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
      show_view_name: dataStore.default_view_name,
      show: false
    }
  }

  initGoldenLayout(){
        // Build basic golden-layout config

    const wrapConfig = view_name =>{
      return           {
        type: 'react-component',
        component: view_name,
        title: view_name,
        isClosable: false,
        props: { view_name: view_name }
      }
    }
    // ['协同生态视图', '载体及资源视图', '服务价值视图', '服务过程视图', '服务目标视图']
    var config1 = {
      content: [
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
                  wrapConfig('载体及资源视图'),
                ]
              },
            ]
          }
        ]
      }]
    }
    var config2 = {
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
      }]
    }
    var layout = new GoldenLayout( config1, this.layout);
    
    dataStore.view_names.forEach((view_name,index)=>{
      layout.registerComponent( view_name, CommonView);
    })
    layout.init();
    dataStore.view_names.forEach((view_name,index)=>{
      const component = layout.getComponent(view_name)
      // console.log(component)
      // component.on('itemDestroyed', ()=>{
      //   console.log(view_name)
      // })
    })

    window.addEventListener('resize', () => {
        layout.updateSize();
    });
    layout.on('stateChanged', (event)=>{
      // console.log(event)
      updateAllGraph()
    })
    // layout.on('itemDestroyed', (event)=>{
    //   let config = layout.toConfig()
    //   let show_view_names = []
    //   let walks = [config]
    //   while(walks.length!==0){
    //     const elm = walks.pop()
    //     const {content} = elm
    //     if(content){
    //       content.forEach(sub_elm=>{
    //         const {type, title} = sub_elm
    //         if(type==='component' || type==='react-component'){
    //           show_view_names.push(title)
    //         }else{
    //           walks.push(sub_elm)
    //         }
    //       })          
    //     }
    //   }
    //   console.log(config,show_view_names)
    // })
    this.layout = layout
  }
  componentDidMount() {
    this.onViewChange = autorun(() => {
      const show_view_name = stateManger.show_view_name.get()
      // 这里有个bug
      this.setState({
        show_view_name: show_view_name,
      })
    })
    this.initGoldenLayout()
  }

  render() {
    const { show_view_name } = this.state
    const view2Component = {
      '全局视图': GlobalOverview,
    }
    return (
      <div style={{ height: '100%', width: '100%', position: 'relative' }}>
        {/*顶部导航栏*/}
        <div style={{ position: 'relative', height: '7%',paddingBottom:'10px'}}>
          <Nav />
        </div>
        {/* <Segment attached='bottom' fluid> */}

        <div style={{height: '95%', width: '100%', position: "relative" }}>
         <Center/>
          {/*<MyPalatte />
          <div ref={input => this.layout = input} style={{height: '100%', width: '94%', position: 'relative', float: 'right' }}/>*/}
        </div>
        {/* </Segment> */}
      </div>
    )
  }
}




export default App;