import React from 'react';
import './App.css';
// import Test from './component/function_components/Test'
import { Icon, Dropdown, Input, Search, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { view2controller } from './component/function_components/goController/GraphController.ts'

import Nav from './component/ui_components/Nav'
import MyPalatte from './component/function_components/MyPalatte'
import { autorun } from 'mobx';
import stateManger from './dataManager/stateManager';
import dataStore, { download } from './dataManager/dataStore';

import GlobalOverview from './component/function_components/GlobalOverview';
import CommonView from './component/function_components/CommonView'
import LoginModal from './component/ui_components/LoginModal';
import SelectLine from './component/ui_components/SelectLine';

import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-dark-theme.css';
import GoldenLayout from 'golden-layout';

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

    // ['协同生态视图', '载体及资源视图', '服务价值视图', '服务过程视图', '服务目标视图']
    var config = {
      content: [
        {
        type: 'row',
        content: [
          {
          type: 'react-component',
          component: '服务过程视图',
          title: '服务过程视图',
          props: { view_name: '服务过程视图' }
          },
          {
            type: 'column',
            content: [
              {
                type: 'row',
                content: [
                  {
                    type: 'react-component',
                    component: '协同生态视图',
                    title: '协同生态视图',
                    props: { view_name: '协同生态视图' }
                  }, 
                  {
                    type: 'react-component',
                    component: '服务目标视图',
                    title: '服务目标视图',
                    props: { view_name: '服务目标视图'}
                  }
                ]
              },
              {
                type: 'row',
                content: [
                  {
                    type: 'react-component',
                    component: '服务价值视图',
                    title: '服务价值视图',
                    props: { view_name: '服务价值视图'}
                  }, 
                  {
                    type: 'react-component',
                    component: '载体及资源视图',
                    title: '载体及资源视图',
                    props: { view_name: '载体及资源视图'}
                  }
                ]
              },
            ]
          }
        ]
      }]
    }
        
    var myLayout = new GoldenLayout( config, this.layout);
    
    for (let index = 0; index <= 5; index++) {
      
    }
    dataStore.view_names.forEach((view_name,index)=>{
      index++
      myLayout.registerComponent( view_name, CommonView);
    })
    myLayout.init();

    window.addEventListener('resize', () => {
        myLayout.updateSize();
    });
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
        <div style={{ position: 'relative', height: '5%'}}>
          <Nav />
        </div>
        {/* <Segment attached='bottom' fluid> */}
        <div style={{height: '95%', width: '100%', position: "relative" }}>
          <div ref={input => this.layout = input} style={{height: '100%', width: '100%', position: 'relative' }}/>
        </div>

        {/* </Segment> */}
      </div>
    )
  }
}




export default App;