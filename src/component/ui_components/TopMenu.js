import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import LoginModal from './LoginModal';
import { autorun } from 'mobx';
import stateManger from '../../dataManager/stateManager';

export default class TopMenu extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  static get defaultProps() {
    return {
      width: 800,
      height: 100,
    };
  }

  render() {
    const { activeItem } = this.state
    const { width, height} = this.props
    return (
      <Menu fluid style={{background:'#e9e0d9'}}>
        <Menu.Item
          name='服务模式'
          active={true}
        style={{fontWeight:800}}/>
        <Menu.Menu position='right'  >
          <Menu.Item style={{border:"1px solid #e5dcd3"}}>
            <Input icon='search' placeholder='搜索'/>
          </Menu.Item>
          {/* <Menu.Item
            name='登录'
            // active={activeItem==='登录'}
            onClick={this.handleItemClick}
          /> */}
          <LoginModal/>
        </Menu.Menu>
      </Menu>
    )
  }
}
