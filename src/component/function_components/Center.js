import React from 'react';
import { Button} from 'semantic-ui-react'
import { Pagination } from 'antd';
import Nav from '../ui_components/Nav'

class Center extends React.Component{
	constructor(props){
		super(props);
		this.state={
			areas:['个人文件','最近修改','我的收藏'],
			show:false,
			index:0
		}
	}
	render(){		
	
		return (	
		      <div style={{ height: '100%', width: '100%', position: 'relative' }}>
		        {/*顶部导航栏*/}
		        <div style={{ position: 'relative', height: '7%',paddingBottom:'10px'}}>
		          <Nav />
		        </div>		
				<div className='wrapper'>
					<div className='leftbox'>
						<h2>个人文件</h2>
						<Button primary>新建文件</Button>
						<ul>
							{this.state.areas.map((item,index)=>{
								return(
		                            <li onClick={this.handleClickareas.bind(this,index)} className={this.state.index==index?"selected":""}>
										<i className={index==0?"home icon":(index==1?"time icon":"star icon")}></i>
										<span>{item}</span>
									</li>
							    )
							})}
						</ul>
					</div>
					<div className='rightbox'>
					 <p style={{fontSize:'16px'}}>{this.state.areas[this.state.index]}</p>
						<table>
						  <thead>
						    <tr>						    
						      <th>文件名</th>
						      <th>拥有者</th>
						      <th>最后修改时间</th>
						    </tr>
						  </thead>
						  <tbody >
						    <tr>
						      <td>John Lilki</td>
						      <td>Sae</td>
						      <td>2019.6.24</td>
						    </tr>
						  </tbody>
						  <tbody >
						    <tr>
						      <td>John Lilki</td>
						      <td>Sae</td>
						      <td>2019.6.24</td>
						    </tr>
						  </tbody>
						</table>	
						<Pagination className="page" size="small" total={50} />				
					</div>
				</div>
			 </div>
			)

	}
       handleClickareas(index){
		  this.setState({index:index})			
		}
}
export default Center;