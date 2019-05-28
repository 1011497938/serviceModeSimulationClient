import React, { Component } from 'react'
import { List,Button,input, label,Form,TextArea,Dropdown,Checkbox} from 'semantic-ui-react'

const options1 = [
        {key: 1, text: '主体1', value: 1} ,
        {key: 2, text: '主体2', value: 2} ,
        {key: 3, text: '主体3', value: 3} ,
        { key: 4, text: '主体4', value: 4},
]

const CRBasicInfo = () => (
    <Form>
        <Form.Field >
            <label>名称</label>
            <input placeholder='名称'/>
        </Form.Field>
        <Form.Field >
            <label>ID</label>
            <input placeholder='自动显示生成的ID'/>
        </Form.Field>
        <Form.Field >
            <label>持有主体</label>
            <Dropdown clearable options={options1} selection />
        </Form.Field>
        <Form.Field >
            <label>运维主体</label>
            <List>
                <List.Item><Checkbox label='主体1' /></List.Item>
                <List.Item><Checkbox label='主体2' /></List.Item>
                <List.Item><Checkbox label='主体3' /></List.Item>
                <List.Item> <Checkbox label='主体4' /></List.Item>
            </List>
        </Form.Field>
        <Form.Field >
            <label>简介</label>
            <TextArea placeholder='简要介绍' />
        </Form.Field>
        <Button content='提交' />
    </Form>
)

export default  CRBasicInfo




// export default class BasicInfo extends Component{
//     constructor(props){
//         super(props)
//          this.state={
//                     select_component: stateManger.selet_component_ingo.get()
//                 }
//     }
//
//     render(){
//         return(
//             <div>
//                  <form class='ui form'>
//                      <div>
//                         <h3 class="ui dividing header">控件属性编辑</h3>
//                      </div>
//
//                      <div class="field">
//                         <h4> 基础信息</h4>
//                      </div>
//
//                       <div class="two  fields">
//
//                             <div class="field">
//                                <label>载体名称</label>
//                                <input type="text"  placeholder="CarrierName" />
//                             </div>
//
//                              <div class="field">
//                                <label>载体ID</label>
//                                <input type="text"  placeholder="CarrierID" />
//                             </div>
//                       </div>
//
//
//                  </form>
//             </div>
//         )
//     }
//     }
//
//
