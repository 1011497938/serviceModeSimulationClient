import React from 'react';
import { Button} from 'semantic-ui-react'
import { Pagination } from 'antd';
import Nav from '../ui_components/Nav'
import Edit from '../ui_components/Edit'
import {
    Router, Route,Link
} from 'react-router-dom'

class Center extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isShow:false,
			areas:['个人文件','最近修改','我的收藏'],
			show:false,
			index:0,
			index2:-1,
			fileNames:['村淘1', '村淘2','村淘3','村淘4', '村淘5','村淘6'],
			lateWrite:['最近修改1','最近修改2','最近修改3','最近修改4','最近修改5','最近修改6'],
			collect:['收藏1','收藏2','收藏3','收藏4','收藏5','收藏6']
		}
	}
	render(){			
		return (	
		      <div style={{ height: '100%', width: '100%', position: 'relative' }}>
		        {/*顶部导航栏*/}
		        <div style={{ position: 'relative', height: '8%'}}>
		          <Nav/>
		        </div>		
				<div className='wrapper'>
					<div className='leftbox'>
						<h2>个人文件</h2>
						<Button primary>新建文件</Button>
						<ul>
							{this.state.areas.map((item,index)=>{
								return(
		                            <li onClick={this.handleClickareas.bind(this,index)} className={this.state.index==index?"selected":""}>
										<i className={index==0?"home icon":(index==1?"time icon":'star icon')}></i>
										<span>{item}</span>
									</li>
							    )
							})}
						</ul>
					</div>
					<div className='rightbox'>
					 <p style={{fontSize:'16px'}}>{this.state.areas[this.state.index]}</p>
						<table>
						  <thead className={this.state.index==3?'disShow':''}>
						    <tr>						    
						      <th>模式名</th>
						      <th>拥有者</th>
						      <th>最后修改时间</th>
						      <th>可视化</th>
						    </tr>
						  </thead>
                          <tbody className={this.state.index===0?'':'disShow'}>
						  	{this.state.fileNames.map((item,index)=>{
								return(					 
			                            <tr  onMouseOver={this.handleClickfiles.bind(this,index)} className={this.state.index2==index?"onfocusfile":""}>
											<td style={{cursor:'pointer'}} onClick={()=>{window.location.href="http://localhost:3000/"}}>{this.state.fileNames[index]}</td>
						              		<td>Sae</td>
						      				<td><Edit isShow={this.state.index2==index?this.state.isShow:null}/>2019-7-4</td>
						      				<td style={{cursor:'pointer'}} onClick={()=>{window.location.href="http://localhost:3000/center/model"}}>模拟运行</td>
						      				<td ></td>
										</tr>
							           )
							 })}
						  	</tbody>
						 <tbody   className={this.state.index===1?'':'disShow'}>
						  	{this.state.lateWrite.map((item,index)=>{
								return(					 							
			                            <tr onMouseOver={this.handleClickfiles.bind(this,index)} className={this.state.index2==index?"onfocusfile":""}>
											<td style={{cursor:'pointer'}} onClick={()=>{window.location.href="http://localhost:3000/"}}>{this.state.lateWrite[index]}</td>
						              		<td>Sae</td>
						      				<td>2019-6-24</td>
						      				<td style={{cursor:'pointer'}}>模拟运行</td>
						      				<td><i className="edit icon"></i></td>
										</tr>
																			
							           )
							 })}
						  	</tbody>
					      <tbody   className={this.state.index===2?'':'disShow'}>
						  	{this.state.collect.map((item,index)=>{
								return(					 		
			                            <tr  onMouseOver={this.handleClickfiles.bind(this,index)}  className={this.state.index2==index?"onfocusfile":""}>
											<td style={{cursor:'pointer'}}>{this.state.collect[index]}</td>
						              		<td>Sae</td>
						      				<td>2019-6-24</td>
						      				<td style={{cursor:'pointer'}}>模拟运行</td>
						      				<td><i className="edit icon"></i></td>
										</tr>
																			
							           )
							 })}
						  	</tbody>

						  	{/*<tbody   className={this.state.index===3?'':'disShow'}>
						  	    <h1>可视化</h1>

						  	</tbody>*/}
						</table>	
						<Pagination className={this.state.index==3?'disShow':'page'}  size="small" hideOnSinglePage={true} total={50} />				
					</div>
				</div>
			 </div>
			)
	}
       handleClickareas(index){
		   this.setState({index:index})	
		 		
		}
		handleClickfiles(index){
	       this.setState({index2:index})
	         this.setState({isShow:true})	

        }
}      
export default Center;