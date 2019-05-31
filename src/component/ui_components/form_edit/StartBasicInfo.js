import React, { Component } from 'react'
import { Button,Input, Label,Form,TextArea,Dropdown} from 'semantic-ui-react'

const option1=[
    {key:1,text:'定时触发',value:1},
    {key:2,text:'条件触发',value:2},
    {key:3,text:'消息触发',value:3}
]
const StartBasicInfo = () => (
    <Form>
        <Form.Field >
            <label>流程名称</label>
            <input placeholder='名称'/>
        </Form.Field>
        <Form.Field >
            <label>流程ID</label>
            <Input placeholder='自动显示生成的ID'/>
        </Form.Field>
        <Form.Field >
            <label>流程简介</label>
            <TextArea placeholder='简要介绍' />
        </Form.Field>
        <Form.Field>
            <label>开始事件类型</label>
            <Dropdown clearable options={option1} selection />
        </Form.Field>
        <Button content='提交' />
    </Form>
)

export default  StartBasicInfo




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
