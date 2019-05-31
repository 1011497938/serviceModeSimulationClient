import React, { Component } from 'react'

import { Tab,Button} from 'semantic-ui-react'
import CollabrationBasicInfo from './CollaborationBasicInfo'
import CollaborationConstraintInfo from './CollaborationConstraintInfo'

const panes = [
    { menuItem: '描述属性', render: () => <Tab.Pane ><CollabrationBasicInfo/></Tab.Pane> },

]

const ProviderFormEdit = () => (<Tab panes={panes} /> )

export default ProviderFormEdit



// export default class ProviderFormEdit extends Component{
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
//                  <div>
//                     {this.state.select_component}
//                  </div>
//                  <form class='ui form'>
//                      <div>
//                         <h3 class="ui dividing header">提供主体属性编辑</h3>
//                      </div>
//                      <div class="field">
//                         <h4> 提供主体基础信息</h4>
//                      </div>
//
//                       <div class="three  fields">
//                         <div class="field">
//                             <label>提供主体名称</label>
//                             <input type="text"  placeholder="TaskName" />
//                          </div>
//                          <div class="field">
//                              <label>提供主体ID</label>
//                              <input type="text"  placeholder="TaskID" />
//                          </div>
//                          <div class="field">
//                          <label>提供主体类型</label>
//                           <div class="field">
//                                     <select class="ui fluid search dropdown" name="card[expire-month]">
//                                       <option value="1">企业</option>
//                                       <option value="2">部门/组织</option>
//                                       <option value="3">个人</option>
//                                     </select>
//                                   </div>
//                         </div>
//                       </div>
//
//                       <div class="three  fields">
//
//                           <div class="field">
//                               <label>提供主体作用域</label>
//                                <div class="field">
//                                         <select class="ui fluid search dropdown" name="card[expire-month]">
//                                           <option value="1">农业</option>
//                                           <option value="2">工业</option>
//                                           <option value="3">交通运输</option>
//                                           <option value="4">金融</option>
//                                           <option value="5">其他</option>
//                                         </select>
//                                </div>
//                            </div>
//
//                            <div class="field">
//                              <label>提供主体产品</label>
//                              <div class="field">
//                                   <select class="ui fluid search dropdown" name="card[expire-month]">
//                                     <option value="1">服务</option>
//                                     <option value="2">商品</option>
//                                   </select>
//                              </div>
//                            </div>
//
//                           <div class="field">
//                                <label>提供主体性质</label>
//                                <div class="field">
//                                         <select class="ui fluid search dropdown" name="card[expire-month]">
//                                           <option value="1">直接提供主体</option>
//                                           <option value="2">间接提供主体</option>
//                                         </select>
//                                       </div>
//                             </div>
//                       </div>
//
//
//                        <div class="field">
//                             <label>联系方式</label>
//                             <input type="text"  placeholder="ContactInformation" />
//                        </div>
//
//                        <div class="field">
//                            <label>简要介绍</label>
//                            <input type="text"  placeholder="Description" />
//                        </div>
//
//
//                     <div class="ui button" tabindex="0">提交</div>
//
//                </form>
//
//             </div>
//         )
//     }
//     }



