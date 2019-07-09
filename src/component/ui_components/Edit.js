import React, { Component } from 'react'
import { Modal,Menu, Dropdown, Icon,Input } from 'antd';

const { confirm } = Modal;
export default class Edit extends Component{
	constructor(props){
		super(props)
	
	
	}
  state = { modal1Visible: false }
	componentDidMount(){
		
	}

  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }

	render(){
			const menu =(
			  <Menu>
			    <Menu.Item key="0">
			      <span onClick={() => this.setModal1Visible(true)}><i className='pencil alternate icon'></i>重命名</span>
			       <div><Modal
			          title="重命名"
			          style={{ top: 40 }}
			          visible={this.state.modal1Visible}
			          onOk={() => this.setModal1Visible(false)}
			          onCancel={() => this.setModal1Visible(false)}
                okText="确定"
                cancelText="取消"
			        >
			          <Input type='text' placeholder="请输入模块名称"/>
			        </Modal>
            </div>
			    </Menu.Item>
			    <Menu.Item key="1">
			     <i className='close icon'></i>删除
			    </Menu.Item>
			    <Menu.Divider />
			    <Menu.Item key="3"><i className="share alternate icon"></i>分享</Menu.Item>
			 </Menu>
			)
		return (

			<div style={{visibility:this.props.isShow?'visible':'hidden',display:'inline-block',marginRight:'20px'}}>
				  <Dropdown overlay={menu} trigger={['hover']}>
				    <a className="ant-dropdown-link" href="#">
				      <i className="edit icon"></i>
				    </a>
				  </Dropdown>			
			</div>
			)
	}
   
}
