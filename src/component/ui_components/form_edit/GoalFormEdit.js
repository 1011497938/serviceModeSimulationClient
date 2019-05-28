import React, { Component } from 'react'
import { Tab} from 'semantic-ui-react'
import GoalBasicInfo from './GoalBasicInfo'
import GoalComputeInfo from './GoalComputeInfo'
import GoalConstraintInfo from './GoalConstraintInfo'
import CustomizeInfo from './CustomizeInfo'

const panes = [
    { menuItem: '描述', render: () => <Tab.Pane ><GoalBasicInfo/></Tab.Pane> },
    { menuItem: '计算', render: () => <Tab.Pane><GoalComputeInfo/></Tab.Pane> },
    { menuItem: '约束', render: () => <Tab.Pane><GoalConstraintInfo/></Tab.Pane> },
    { menuItem: '自定义', render: () => <Tab.Pane><CustomizeInfo/></Tab.Pane> }
]

const GoalFormEdit = () =>( <Tab panes={panes} />)

export default GoalFormEdit



















// import React, { Component } from 'react'
// import { Input, Menu, Table, Label, Icon,Form} from 'semantic-ui-react'
// import stateManger from '../../../dataManager/stateManager';
// import { autorun } from 'mobx';
//
// export default class StrategicGoalFormEdit extends Component{
//     constructor(props){
//         super(props)
//          this.state={
//                     select_component: stateManger.selet_component_ingo.get()
//                 }
//     }
//     render(){
//         return(
//             <div>
//                  <div>
//                     {this.state.select_component}
//                  </div>
//                  <form class='ui form'>
//                      <div>
//                         <h3 class="ui dividing header">战略目标属性编辑</h3>
//                      </div>
//
//                      <div class="field">
//                         <h4> 战略目标基础信息</h4>
//                      </div>
//
//                       <div class="two  fields">
//                             <div class="field">
//                                <label>战略目标名称</label>
//                                <input type="text"  placeholder="StrategicGoalName" />
//                             </div>
//
//                              <div class="field">
//                                <label>战略目标ID</label>
//                                <input type="text"  placeholder="StrategicGoalID" />
//                             </div>
//                       </div>
//
//                       <div class="inline fields">
//                           <label>完成主体</label>
//                           <div class="field">
//                             <div class="ui radio checkbox">
//                               <input type="radio" name="frequency"  />
//                               <label>主体1</label>
//                             </div>
//                           </div>
//                           <div class="field">
//                             <div class="ui radio checkbox">
//                               <input type="radio" name="frequency" />
//                               <label>主体2</label>
//                             </div>
//                           </div>
//                           <div class="field">
//                             <div class="ui radio checkbox">
//                               <input type="radio" name="frequency" />
//                               <label>主体3</label>
//                             </div>
//                           </div>
//                           <div class="field">
//                             <div class="ui radio checkbox">
//                               <input type="radio" name="frequency" />
//                               <label>主体4</label>
//                             </div>
//                           </div>
//                       </div>
//
//                        <div class="field">
//                           <label>简要介绍</label>
//                           <input type="text"  placeholder="Description" />
//                        </div>
//
//                         <div class="field">
//                              <label>预期完成时间</label>
//                              <input type="text"  placeholder="Description" />
//                        </div>
//
//
//                     <div class="ui button" tabindex="0">提交</div>
//                  </form>
//             </div>
//
//         )
//     }
//     }
//
//
