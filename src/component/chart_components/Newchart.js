import React from 'react'
import {
  Button,
  Form,
  Modal,
  Checkbox,
  Divider, Grid, Header, Icon, Search, Segment,
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
      trigger={<Button primary>新建图表</Button>
      }
    >
    <div style={{textAlign:'center',paddingTop:30}}>
      <h3 >新建图表</h3>
      <Form style={{height:400}}>
    <Form.Group widths='equal'>
      <Form.Field label='选择视图数据' control='select' inline>
        <option value='valueData'>价值视图</option>
        <option value='goalData'>目标视图</option>
      </Form.Field>
      <Form.Field label='选择图表类型' control='select' inline>
        <option value='pie'>饼图</option>
        <option value='line'>折线图</option>
        <option value='radar'>雷达图</option>
        <option value='bar'>条形图</option>
        <option value='chord'>力导向图</option>
      </Form.Field>
      <Form.Field label='选择数据维度' control='select' inline>
        <option value='time'>时间</option>
        <option value='mainbody'>主体</option>
        <option value='goal1'>目标1</option>
        <option value='goal2'>目标2</option>
      </Form.Field>
      <Form.Field >
        <Button primary>预览</Button>
      </Form.Field>
    </Form.Group>
    <Form.Group>
      <Form.Field>
      <Grid relaxed columns={1}>
       <Grid.Column style={{paddingLeft:370}}>
        <Placeholder style={{ height: 250, width: 250}}>
              <Placeholder.Image />
              </Placeholder>
        </Grid.Column>
  </Grid>
  </Form.Field>
    </Form.Group>
     <Form.Field >
        <Button primary>确认添加</Button>
      </Form.Field>
  </Form>
      </div>      
</Modal>
    )
  }
}

export default Newchart;