import React from 'react';
import { autorun } from 'mobx';
import stateManger from './manager/stateManager';
import dataStore from './manager/dataStore';


export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    window.location.href= 'http://localhost:3001/homepage/index.html'
  }

  componentDidMount() {

  }

  render() {
    return (
      <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      </div>
    )
  }
}
