import React from 'react';
import Nav from '../ui_components/Nav'
import { Button,Form,Checkbox} from 'semantic-ui-react'
import {
    Router, Route,Link
} from 'react-router-dom'

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state={
			
		}
	}
	render(){
		return(
			<div className='wrappers'>
				<div  className="navbar">
		            <h2>服务模式</h2>
		            <div><span  onClick={()=>{window.location.href="http://localhost:3000/home"}} style={{color:'#fff',cursor:'pointer'}}>首页</span><span style={{color:'#128fec'}}>登录</span></div>
		        </div>
				<div className='contents'>
 					<div className='loginBox'>
 						   <h1 style={{margin:'20px auto',textAlign:'center',width:'60%',color:"#fff"}}>登&nbsp;&nbsp;录</h1>
 						   <Form style={{width:'60%',margin:'0 auto'}}>
				              <Form.Field>
				                <input placeholder='账号' />
				              </Form.Field>
				              <Form.Field>
				                <input type='password' placeholder='密码' />
				              </Form.Field>
				              <div style={{display:'flex',justifyContent:'space-between',color:"#666",padding:5}}>
				                   <span style={{cursor:'pointer'}}>忘记密码？</span>
				                   <span style={{cursor:'pointer'}}>注册</span>
				              </div>
				                <div>
				                  <Button style={{marginBottom:10,marginTop:30}}  fluid primary color='blue' onClick={()=>{window.location.href="http://localhost:3000/center"}}>提&nbsp;交</Button>
				                  {/*<Button inverted fluid >注册</Button>*/} 

				                </div>
				            </Form>
 					</div>
				</div>
			
			</div>

		)
	}
}
export default Login;





















