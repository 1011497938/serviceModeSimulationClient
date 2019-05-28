import React, { Component } from 'react'
import { Button,input, label,Form,TextArea} from 'semantic-ui-react'

const GoalBasicInfo = () => (
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
            <label>简介</label>
            <TextArea placeholder='简要介绍' />
        </Form.Field>
        <Button content='提交' />
    </Form>
)

export default  GoalBasicInfo




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
