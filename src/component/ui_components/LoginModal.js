import React from 'react'
import {
  Button,
  Form,
  Image,
  Modal,
  Checkbox
} from 'semantic-ui-react'



import {
  Link,
  Route
} from 'react-router-dom';

class LoginModal extends React.Component {
  state = {
    modalOpen: false,
    username:'登录/注册'
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
          trigger={<span onClick={this.handleOpen} style={{paddingTop:20,marginRight:20,cursor:'pointer', color:'white'}}><i className="user icon"></i>{this.state.username}</span>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          basic
          size='small' 
          style={{background:'#ededed',padding:'40px 0'}}
        >
        <div style={{textAlign:'center',marginLeft:"25%"}}>
          <h1 style={{width:'60%',color:"#666"}}>登&nbsp;&nbsp;录</h1>
          <Form style={{width:'60%'}}>
              <Form.Field>
                <input placeholder='账号' />
              </Form.Field>
              <Form.Field>
                <input placeholder='密码' />
              </Form.Field>
              <div style={{display:'flex',justifyContent:'space-between',color:"#666",padding:5}}>
                   <span style={{cursor:'pointer'}}>忘记密码？</span>
                   <span style={{cursor:'pointer'}}>注册</span>
              </div>
              <Modal.Actions>
                <div>
                  <Button style={{marginBottom:10,marginTop:30}}  fluid inverted color='blue' onClick={()=>{window.location.href="http://localhost:3000/center"}}>提&nbsp;交</Button>
                  {/*<Button inverted fluid >注册</Button>*/} 

                </div>
              </Modal.Actions>              
            </Form>
          </div>      
    </Modal>
    )
  }
}

export default LoginModal