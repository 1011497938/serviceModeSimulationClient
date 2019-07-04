import React from 'react'
import {
  Button,
  Form,
  Image,
  Modal,
  Checkbox
} from 'semantic-ui-react'

import { Alert } from 'antd';

import {
  Link,
  Route
} from 'react-router-dom';
class Rigister extends React.Component {
  state = {
    modalOpen: false,
    username:'登录/注册',
    flag:true
  }

    componentWillMount () {
 
    }
    componentDidMount () {
        
    }
  render() {  
    return (
      
        <div className='wrappers'>
            <div  className="navbar">
                <h2>服务模式</h2>
                <div><span onClick={()=>{window.location.href="http://localhost:3000/home"}} style={{color:'#fff',cursor:'pointer'}}>首页</span><span style={{color:'#128fec'}}>注册</span></div>
            </div>
          <div className='contents'>
            <div className='loginBox'>
               <h1 style={{margin:'20px auto',textAlign:'center',width:'60%',color:"#fff"}}>注&nbsp;&nbsp;册</h1>;
               <Form style={{width:'60%',margin:'0 auto'}}>
                      <Form.Field>
                        <input placeholder='用户名' />
                      </Form.Field>
                      <Form.Field>
                        <input placeholder='密码' />
                      </Form.Field>
                      <Form.Field>
                        <input placeholder='确认密码' />
                      </Form.Field>
                      <div style={{display:'flex',justifyContent:'space-between',color:"#666",padding:5}}>
                           <span style={{cursor:'pointer'}}>忘记密码？</span>
                           <span style={{cursor:'pointer'}} onClick={()=>{window.location.href="http://localhost:3000/login"}}>登录</span>
                      </div>
                      <div>
                        <Button style={{marginBottom:10,marginTop:30}}  fluid  color='grey' onClick={()=>{window.location.href="http://localhost:3000"}}>提&nbsp;交</Button>
                        {/*<Button inverted fluid >注册</Button>*/} 

                      </div>
                </Form>
          </div>
          </div>
      
      </div>
    )
  }
    handleSubmit(){
    

  
    }
}

export default Rigister