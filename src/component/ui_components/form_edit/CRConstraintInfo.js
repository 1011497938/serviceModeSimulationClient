import React, { Component } from 'react'
import { Dropdown,input, label,Form,TextArea} from 'semantic-ui-react'

const options1=[
    {key:1,text:'正常',value:1},
    {key:2,text:'异常',value:2}
]
const options2 = [
    {key: 1, text: '仅持有主体', value: 1} ,
    {key: 2, text: '部分提供主体', value: 2} ,
    {key: 3, text: '所有提供主体', value: 3} ,
    { key: 4, text: '提供主体与消费主体', value: 4},
]


const CRConstraintInfo = () => (
    <Form>
        <Form.Field >
            <label>可调配数量</label>
            <input placeholder='数量'/>
        </Form.Field>
        <Form.Field >
            <label>状态</label>
            <Dropdown clearable options={options1} selection />
        </Form.Field>
        <Form.Field >
            <label>访问/使用权限</label>
            <Dropdown clearable options={options2} selection />
        </Form.Field>
        <Form.Field >
            <label>访问/使用优先级</label>
            <input placeholder='优先级'/>
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
