import React, { Component } from 'react'
import { List,Checkbox,Input,Icon, label,Form,TextArea,Dropdown,Table,Menu} from 'semantic-ui-react'

const option1=[
    {key:1,text:'前置任务必须完成',value:1},
    {key:2,text:'前置任务可不完成',value:2}
]
const StartConstraintInfo = () => (
    <Form>
        {/*<Form.Field >*/}
            {/*<label>流程依赖</label>*/}
            {/*<Dropdown clearable options={option1} selection />*/}
        {/*</Form.Field>*/}
        <Form.Field >
            <label>流程依赖</label>
            <List inline>
                <List.Item><Checkbox label='完成流程1' /></List.Item>
                <List.Item><Checkbox label='完成流程2' /></List.Item>
                <List.Item><Checkbox label='完成流程3' /></List.Item>
                <List.Item><Checkbox label='完成流程4' /></List.Item>
            </List>
        </Form.Field>
        <Form.Field >
            <label>流程优先级</label>
            <input placeholder='优先级'/>
        </Form.Field>
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>可调度资源/载体ID</Table.HeaderCell>
                    <Table.HeaderCell>对应数量/状态</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell><Input tiny/></Table.Cell>
                    <Table.Cell><Input tiny/></Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell><Input tiny/></Table.Cell>
                    <Table.Cell><Input tiny/></Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell><Input tiny/></Table.Cell>
                    <Table.Cell><Input tiny/></Table.Cell>
                </Table.Row>
            </Table.Body>

            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='2'>
                        <Menu floated='right' pagination>
                            <Menu.Item as='a' icon>
                                <Icon name='chevron left' />
                            </Menu.Item>
                            <Menu.Item as='a'>1</Menu.Item>
                            <Menu.Item as='a'>2</Menu.Item>
                            <Menu.Item as='a'>3</Menu.Item>
                            <Menu.Item as='a'>4</Menu.Item>
                            <Menu.Item as='a' icon>
                                <Icon name='chevron right' />
                            </Menu.Item>
                        </Menu>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>

    </Form>
)

export default  StartConstraintInfo




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
