import React, { Component } from 'react'
import { List,Button,input, label,Form,TextArea,Dropdown,Checkbox} from 'semantic-ui-react'

const options1 = [
        {key: 1, text: '政府', value: 1} ,
        {key: 2, text: '企业', value: 2} ,
        {key: 3, text: '部门/组织', value: 3} ,
        { key: 4, text: '个人', value: 4},
]
const CollaborationBasicInfo = () => (
    <Form>
        <Form.Field inline>
            <label>名称</label>
            <input placeholder='名称'/>
        </Form.Field>
        <Form.Field inline>
            <label>ID</label>
            <input placeholder='自动显示生成的ID'/>
        </Form.Field>
        <Form.Field inline>
            <label>类型</label>
            <Dropdown clearable options={options1} selection />
        </Form.Field>
        <Form.Field inline>
            <label>作用域</label>
            <List>
                <List.Item><Checkbox label='农业' /></List.Item>
                <List.Item><Checkbox label='工业' /></List.Item>
                <List.Item><Checkbox label='第三产业' /></List.Item>
                <List.Item> <Checkbox label='其他' /></List.Item>
            </List>
        </Form.Field>
        <Form.Field inline>
            <label>联系方式</label>
            <input placeholder='邮箱/电话'/>
        </Form.Field>
        <Form.Field inline>
            <label>简介</label>
            <TextArea placeholder='简要介绍' />
        </Form.Field>
        <Button content='提交' />
    </Form>
)

export default  CollaborationBasicInfo




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
