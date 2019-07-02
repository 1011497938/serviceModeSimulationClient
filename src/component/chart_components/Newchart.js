import React from 'react'
import {
  Button,
  Form,
  Modal,
  Checkbox,
  Divider, Grid, Header, Icon, Search, Segment,Input,Radio,TextArea,Dropdown,
  Card, Placeholder,Image
} from 'semantic-ui-react'

import Pie from '../chart_components/Pie'

import {
  Link,
  Route
} from 'react-router-dom';



class Newchart extends React.Component {
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
      trigger={<Button >新建图表</Button>
      }
    >
    <div style={{textAlign:'center',paddingTop:30}}>
      <h3 >新建图表</h3>
      <Form style={{height:400}}>

      <Form.Group widths='equal'>
      <Form.Field label='选择图表类型' control='select' inline >
        <option value='pie'>饼图</option>
        <option value='line'>折线图</option>
        <option value='radar'>雷达图</option>
        <option value='bar'>条形图</option>
        <option value='chord'>力导向图</option>
      </Form.Field>  
      <Form.Field label='选择X维度数据' control='select' inline >
        <option value='time'>时间</option>
        <option value='goal1'>目标1</option>
        <option value='goal2'>目标2</option>
        <option value='value1'>价值1</option>
        <option value='value2'>价值1</option>
        <option value='goal1'>资金</option>
        <option value='orders'>订单数</option>

      </Form.Field>
      <Form.Field label='选择Y维度数据' control='select' inline >
        <option value='time'>时间</option>
        <option value='goal1'>目标1</option>
        <option value='goal2'>目标2</option>
        <option value='value1'>价值1</option>
        <option value='value2'>价值1</option>
        <option value='goal1'>资金</option>
        <option value='orders'>订单数</option>
      </Form.Field>
    </Form.Group>
    
    <Form.Group>
      <Form.Field>
      <Grid relaxed columns={2}>
       <Grid.Column style={{paddingLeft:150}}>
        <Placeholder style={{ height: 250, width: 350}}>
              <Placeholder.Image />
              </Placeholder>
        </Grid.Column>
        <Grid.Column style={{paddingLeft:100}}>
        <Form>
        <Form.Group widths='equal'>
          <Form.Field control={Input} label='图表名称' placeholder='' />
      
        </Form.Group>
        <Form.Field control={TextArea} label='图表说明' placeholder='' />
       
        <Form.Field control={Button} style={{marginTop:30}}>确认添加</Form.Field>
      </Form>
        </Grid.Column>
  </Grid>
  </Form.Field>
    </Form.Group>
     
  </Form>
      </div>      
</Modal>
    )
  }
}

export default Newchart;