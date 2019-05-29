import React, { Component } from 'react'
import { Dropdown,input, label,Form,Button} from 'semantic-ui-react'

const options1 = [
    {key: 1, text: '描述属性', value: 1} ,
    {key: 2, text: '计算属性', value: 2} ,
    {key: 3, text: '约束属性', value: 3} ,
]


const CustomizeInfo = () => (
    <Form>
        <Form.Field >
            <label>属性名称</label>
            <input placeholder='名称'/>
        </Form.Field>
        <Form.Field >
            <label>属性类别</label>
            <Dropdown clearable options={options1} selection />
        </Form.Field>
        <Form.Field >
            <label>属性值</label>
            <input placeholder='值'/>
        </Form.Field>
        <Button icon='plus' />

    </Form>
)

export default  CustomizeInfo





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
