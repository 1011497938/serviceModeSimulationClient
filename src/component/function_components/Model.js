import React from 'react';
import { Button} from 'semantic-ui-react'
import { Pagination } from 'antd';
import Nav from '../ui_components/Nav'
import DataVisualize from '../ui_components/DataVisualize'
import {
    Router, Route,Link,table
} from 'react-router-dom'

class Model extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
		      <div style={{ height: '100%', width: '100%', position: 'relative',background:'#333439'}}>
		        <div style={{ position: 'relative', height: '8%'}}>
		          <Nav/>
		        </div>
		        <div style={{margin:'0 auto',height:'780px',background:'#fff',width:'85%'}}>
		            <DataVisualize/>
		            <div style={{borderTop:'5px solid #333439',width:'100%',marginTop:'-250px',height:'250px', overflow:'auto',boxSizing:'border-box'}}>
		                <table class="ui selectable celled table" style={{textAlign:'center'}} >
							  <thead>
							    <tr>
							      <th>任务名</th>
							      <th>执行情况</th>
							      <th>时间</th>
							      <th>备注</th>
							    </tr>
							  </thead>
							  <tbody>
							    <tr>
							      <td>任务1</td>
							      <td>No Action</td>
							      <td>None</td>
							      <td>None</td>
							    </tr>
							    <tr>
							      <td>任务2</td>
							      <td>No Action</td>
							      <td>None</td>
							      <td>None</td>
							    </tr>
							    <tr>
							      <td>任务3</td>
							      <td>No Action</td>
							      <td>None</td>
							      <td>None</td>
							    </tr>
							    <tr>
							      <td>任务4</td>
							      <td>No Action</td>
							      <td>None</td>
							      <td>None</td>
							    </tr>
							    <tr>
							      <td>任务5</td>
							      <td>No Action</td>
							      <td>None</td>
							      <td>None</td>
							    </tr>
							    <tr>
							      <td>任务6</td>
							      <td>No Action</td>
							      <td>None</td>
							      <td>None</td>
							    </tr>
							  </tbody>
							</table>
		            </div>
		        </div>	
		      </div>
			)
	}
}
export default Model