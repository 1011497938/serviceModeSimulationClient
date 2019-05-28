import React, { Component } from 'react'
import { List,Checkbox,input, label,Form,TextArea} from 'semantic-ui-react'

const CRConstraintInfo = () => (
    <Form>
        <Form.Field >
            <label>目标优先级</label>
            <input placeholder='优先级'/>
        </Form.Field>
        <Form.Field >
            <label>预期所需时间</label>
            <input placeholder='所需时间'/>
        </Form.Field>
        <Form.Field >
            <label>参与主体</label>
            <List>
                <List.Item><Checkbox label='主体1' /></List.Item>
                <List.Item><Checkbox label='主体2' /></List.Item>
                <List.Item><Checkbox label='主体3' /></List.Item>
                <List.Item><Checkbox label='主体4' /></List.Item>
            </List>
        </Form.Field>
    </Form>
)

export default  CRConstraintInfo




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
