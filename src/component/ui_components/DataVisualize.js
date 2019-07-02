import React from 'react';
import { Button} from 'semantic-ui-react';
import Nav from '../ui_components/Nav';
import {
    Router, Route,Link
} from 'react-router-dom';



import Bar from '../chart_components/Bar';
import Pie from '../chart_components/Pie';
import Radar from '../chart_components/Radar';
import Chord from '../chart_components/Chord';
import Line from '../chart_components/Line';
import Newchart from '../chart_components/Newchart';

class DataVisualize extends React.Component{
	render(){		
		return (	
		      <div style={{height: '100%', width: '100%', position: 'relative' }}>
						<div style={{height:'45%',width:'85%',display:'flex',justifyContent:'space-around'}}>
			 				<div style={{height:'80%',width:'37%'}}>
								<Pie/>
							</div>		
							<div style={{height:'80%',width:'33%'}}>
								<Radar/>
							</div>
							<div style={{height:'80%',width:'33%'}}>
								<Chord/>
							</div>
						</div>
			   			<div style={{height:'40%',width:'80%',marginTop:'-80px'}}>
							<div style={{height:'80%',width:'50%',float:'left'}}>
							  <Bar/>
							</div>
						    <div style={{height:'80%',width:'40%',float:'left'}}>
							  <Line/>
							</div>				
						</div> 	
						<div style={{position:'absolute',right:'50px',top:'480px',width:'100px',width:'150px'}}><Newchart/></div>   
			 </div>
			
			)

	}

}     


export default DataVisualize;