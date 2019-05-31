import React, { Component } from 'react'
import { List,Checkbox,input, label,Form,TextArea,Dropdown} from 'semantic-ui-react'

const option1=[
    {key:1,text:'前置任务必须完成',value:1},
    {key:2,text:'前置任务可不完成',value:2}
]
const TaskConstraintInfo = () => (
    <Form>
        <Form.Field >
            <label>任务优先级</label>
            <input placeholder='优先级'/>
        </Form.Field>
        <Form.Field >
            <label>前置任务依赖</label>
            <Dropdown clearable options={option1} selection />
        </Form.Field>
        <Form.Field >
            <label>任务参与主体</label>
            <List>
                <List.Item><Checkbox label='主体1' /></List.Item>
                <List.Item><Checkbox label='主体2' /></List.Item>
                <List.Item><Checkbox label='主体3' /></List.Item>
                <List.Item><Checkbox label='主体4' /></List.Item>
            </List>
        </Form.Field>

        <Form.Field >
            <label>任务所需载体</label>
            <List>
                <List.Item><Checkbox label='载体1' /></List.Item>
                <List.Item><Checkbox label='载体2' /></List.Item>
                <List.Item><Checkbox label='载体3' /></List.Item>
                <List.Item><Checkbox label='载体4' /></List.Item>
            </List>
        </Form.Field>

    </Form>
)

export default  TaskConstraintInfo




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
