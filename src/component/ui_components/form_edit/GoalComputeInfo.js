import React, { Component } from 'react'
import { List,Checkbox,input, label,Form,TextArea} from 'semantic-ui-react'

const GoalComputeInfo = () => (
    <Form>
        <Form.Field >
            <label>目标变量</label>
            <input placeholder='变量名'/>
        </Form.Field>
        <Form.Field >
            <label>目标变量初始值</label>
            <input placeholder='初始值'/>
        </Form.Field>
        <Form.Field >
            <label>目标变量预期值</label>
            <input placeholder='预期值'/>
        </Form.Field>
    </Form>
)

export default  GoalComputeInfo




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
