import React, { Component } from 'react'
import {Dropdown, input, label,Form,TextArea} from 'semantic-ui-react'

const options1 = [
    {key: 1, text: '非会员', value: 1} ,
    {key: 2, text: '普通会员', value: 2} ,
    {key: 3, text: '高级会员', value: 3} ,
]

const options2=[
    {key:1,text:'大众市场',value:1},
    {key:2,text:'利基市场',value:2},
    {key:3,text:'区隔化市场',value:3},
    {key:4,text:'多元化市场',value:4},
    {key:5,text:'多边市场',value:5}
]

const CollaborationConstraintInfo = () => (
    <Form>
        <Form.Field inline>
            <label>主体等级</label>
            <Dropdown clearable options={options1} selection />
        </Form.Field>
        <Form.Field inline>
            <label>市场类型</label>
            <Dropdown clearable options={options2} selection />
        </Form.Field>
    </Form>
)

export default  CollaborationConstraintInfo




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
