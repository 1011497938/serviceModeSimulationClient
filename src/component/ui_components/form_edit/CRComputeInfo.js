import React, { Component } from 'react'
import { input, label,Form,TextArea} from 'semantic-ui-react'

const CRComputeInfo = () => (
    <Form>
        <Form.Field inline>
            <label>数量</label>
            <input placeholder='数量'/>
        </Form.Field>
        <Form.Field inline>
            <label>价值</label>
            <input placeholder='价值'/>
        </Form.Field>
    </Form>
)

export default  CRComputeInfo




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
