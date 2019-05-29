import React, { Component } from 'react'
import { Input, Label,Form,TextArea,Table,Icon,Menu} from 'semantic-ui-react'

const TaskComputeInfo = () => (
    <Form>
        <Form.Field >
            <label>预期所需时间</label>
            <input placeholder='所需时间'/>
        </Form.Field>
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>资源ID</Table.HeaderCell>
                    <Table.HeaderCell>所需数量</Table.HeaderCell>
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

export default  TaskComputeInfo




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
