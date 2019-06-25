import React from 'react'
import {
  Button,
  Form,
  Image,
  Modal,
  Checkbox
} from 'semantic-ui-react'



class LoginModal extends React.Component {
  state = {
    modalOpen: false
  }
  handleOpen = () => this.setState({
    modalOpen: true
  })
  handleClose = () => this.setState({
    modalOpen: false
  })
  render() {
    return (
      <Modal
          trigger={<span onClick={this.handleOpen} style={{paddingTop:20,marginRight:20,pointer:'cursor', color:'white'}}><i className="user icon"></i>登录/注册</span>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          basic
          size='small' 
        >
        <div style={{textAlign:'center',marginLeft:"25%"}}>
          <h1 style={{width:'60%'}}>登录</h1>
          <Form style={{width:'60%'}}>
              <Form.Field>
                <input placeholder='账号' />
              </Form.Field>
              <Form.Field>
                <input placeholder='密码' />
              </Form.Field>
     
              <Modal.Actions>
                <div>
                  <Button primary fluid>登录</Button>
                  <Button secondary fluid>注册</Button>
                </div>
              </Modal.Actions>              
            </Form>
          </div>      
    </Modal>
    )
  }
}

export default LoginModal