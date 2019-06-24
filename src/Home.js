import React from 'react';
import './App.css';
// import Test from './component/function_components/Test'
import { Icon, Dropdown, Input, Search, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import Nav from './component/ui_components/Nav'
import { autorun } from 'mobx';

import stateManger from './manager/stateManager';
import dataStore from './manager/dataStore';
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-dark-theme.css';
import GoldenLayout from 'golden-layout';

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div style={{ height: '100%', width: '100%', position: 'relative' }}>
        {/*顶部导航栏*/}
        <div style={{ position: 'relative', height: '5%'}}>
          <Nav />
        </div>
        <div style={{height: '95%', width: '100%', position: "relative" }}>

        </div>
      </div>
    )
  }
}
