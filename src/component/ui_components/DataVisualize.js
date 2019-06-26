import React from 'react';
import { Button} from 'semantic-ui-react';
import Nav from '../ui_components/Nav';
import {
    Router, Route,Link
} from 'react-router-dom';



import Bar from '../chart_components/Bar';
import Pie from '../chart_components/Pie';
import Radar from '../chart_components/Radar';
import Sunburst from '../chart_components/Sunburst';
import Line from '../chart_components/Line';
import Newchart from '../chart_components/Newchart';

class DataVisualize extends React.Component{
	constructor(props){
		super(props);
		this.state={
			areas:['目标数据图表','价值数据图表'],
			show:false,
			index:0,
			index2:-1,
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
	    
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
						<h2>图表分析</h2>
						{/* <Button primary onClick={this.handClick}>新建图表</Button> */}
						<div>
							<Newchart/>
						</div>
						<ul>
							{this.state.areas.map((item,index)=>{
								return(
		                            <li onClick={this.handleClickareas.bind(this,index)} className={this.state.index==index?"selected":""}>
										<span>{item}</span>
									</li>
							    )
							})}
						</ul>
					</div>
					<div className='rightbox' >
						<div style={{height:'40%',width:'80%'}}>
			 				<div style={{height:'80%',float:'left',width:'30%'}}>
								<Pie/>
							</div>		
							<div style={{height:'80%',width:'30%',float:'left'}}>
								<Radar/>
							</div>
							<div style={{height:'80%',width:'30%',float:'left'}}>
								<Sunburst/>
							</div>
						</div>
			   			<div style={{height:'40%',width:'80%'}}>
							<div style={{height:'80%',width:'50%',float:'left'}}>
							  <Bar/>
							</div>
						    <div style={{height:'80%',width:'50%',float:'left'}}>
							  <Line/>
							</div>
						</div>       
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
        }
}     

  
//   AppRegistry.registerComponent('ReactNativeProject', () => ReactNativeProject);

export default DataVisualize;