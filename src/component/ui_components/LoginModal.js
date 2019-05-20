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
          trigger={<Button onClick={this.handleOpen} className='mini ui black button'><i className="user icon"></i>登录/注册</Button>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          basic
          size='small'
        >
        <div style={{textAlign:'center'}}>
          <h1 style={{width:'60%',margin:'2rem auto'}}>登录</h1>
          <Form style={{width:'60%',margin:'1rem auto'}}>
              <Form.Field>
                <input placeholder='账号' />
              </Form.Field>
              <Form.Field>
                <input placeholder='密码' />
              </Form.Field>
     
                <Modal.Actions>
                  <Button className='fluid ui button' style={{marginLeft:0}} onClick={this.handleClose} >提交</Button>
                </Modal.Actions>
              
            </Form>
          </div>      
    </Modal>
    )
  }
}

export default LoginModal