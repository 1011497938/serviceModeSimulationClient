import React, {
  Component
} from 'react'
import {
  Input,
  Menu
} from 'semantic-ui-react'
import LoginModal from './ui_components/LoginModal';

export default class TopMenu extends Component {
  state = {
    activeItem: 'home'
  }

  handleItemClick = (e, {
    name
  }) => this.setState({
    activeItem: name
  })

  //   static get defaultProps() {
  //     return {
  //       width: 800,
  //       height: 100,
  //     };
  //   }

  render() {
    const {
      activeItem
    } = this.state
      // const { width, height} = this.props
    return (
      <Menu  className='#fff fixed' style={{background:'#000',height:'60px',marginBottom:'3rem'}}>
        <Menu.Item
          name='服务模式'
          active={true} 
          style={{background:'#1F4963',color:'#fff',marginLeft:'3rem'}}
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='搜索' />
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