import React from 'react';
import './App.css';
import Test from './component/Test'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'
import Nav from './component/Nav'
import TopMenu from './component/TopMenu'
import Operate from './component/ui_components/Operate.js'
import {
  autorun
} from 'mobx';
import stateManger from './dataManager/stateManager';
import dataStore from './dataManager/dataStore';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show_view_name: dataStore.view_names[0]
    }
  }
  onViewChange = autorun(() => {
    const show_view_name = stateManger.show_view_name.get()
      // 这里有个bug
    this.setState({
      show_view_name: show_view_name
    })
  })


  render() {
    const top_height = 80
    const {
      show_view_name
    } = this.state
      // 解析结构：数组以序列号一一对应，这是一个有序的对应关系。
      // 而对象根据属性名一一对应，这是一个无序的对应关系。
    const needShow = name => {
      return name === show_view_name ? 'block' : 'none'
    }
    return (
      <div style={{position: 'relative', width:'100%', height:'100%'}}>
            <div style={{position: 'absolute', width:'100%', top: 0, left: 0}}>
              <TopMenu/>
            </div>


            <div style={{position: 'absolute', height:'100%',top:19, left:'2%'}}>
              <Nav/>
            </div>

              <div style={{position: 'absolute', top: top_height, width:'100%',left:270}}>
                <Operate/>
              </div>  
              <div style={{display: needShow('全局视图')}} className='itemframe'>
                <Test/>
              </div>

            <div style={{display: needShow('协同生态视图')}} className='itemframe'>
              <h1>协同生态视图</h1>
            </div>
      
      </div>
    )
  }
}

export default App;