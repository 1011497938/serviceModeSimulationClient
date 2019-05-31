import React, { Component } from 'react'
import { Input, Menu, Table, Label, Icon,Form} from 'semantic-ui-react'
import stateManger from '../../../dataManager/stateManager';
import { autorun } from 'mobx';

export default class StartFormEdit extends Component{
     constructor(props){
         super(props);

     }

    render(){
           return(
           <div>
                  <div>
                   </div>

                   {/*表单主体 */}
                   <form class="ui form">
                     <h3 class="ui dividing header">开始事件属性编辑</h3>

                      <div class="field">
                        <h4> 流程基础信息</h4>
                      </div>

                     <div class="three  fields">
                         <div class="field">
                            <label>流程名称</label>
                            <input type="text"  placeholder="TaskName" />
                         </div>
                         <div class="field">
                             <label>流程ID</label>
                             <input type="text"  placeholder="TaskID" />
                         </div>
                         <div class="field">
                               <label>开始事件类型</label>
                               <div class="field">
                                    <select class="ui fluid search dropdown" name="card[expire-month]">
                                      <option value="1">定时开始</option>
                                      <option value="2">条件触发</option>
                                      <option value="3">消息触发</option>
                                    </select>
                               </div>
                         </div>
                     </div>

                      <div class="field">
                         <label>流程描述</label>
                         <input type="text"  placeholder="Description" />
                       </div>


                     <div class="inline fields">
                         <label>参与主体</label>
                         <div class="field">
                           <div class="ui radio checkbox">
                             <input type="radio" name="frequency"  />
                             <label>主体1</label>
                           </div>
                         </div>
                         <div class="field">
                           <div class="ui radio checkbox">
                             <input type="radio" name="frequency" />
                             <label>主体2</label>
                           </div>
                         </div>
                         <div class="field">
                           <div class="ui radio checkbox">
                             <input type="radio" name="frequency" />
                             <label>主体3</label>
                           </div>
                         </div>
                         <div class="field">
                           <div class="ui radio checkbox">
                             <input type="radio" name="frequency" />
                             <label>主体4</label>
                           </div>
                         </div>
                     </div>

                     <div class="field">
                       <h4> 流程前置条件</h4>
                     </div>

                     <div class="field">
                        <label> 其他流程约束</label>
                        <div class="inline fields">
                             <label>服务过程1</label>
                             <div class="field">
                               <div class="ui radio checkbox">
                                 <input type="radio" name="frequency"  />
                                 <label>已完成</label>
                               </div>
                             </div>
                             <div class="field">
                               <div class="ui radio checkbox">
                                 <input type="radio" name="frequency" />
                                 <label>未开始</label>
                               </div>
                             </div>
                             <div class="field">
                               <div class="ui radio checkbox">
                                 <input type="radio" name="frequency" />
                                 <label>并行</label>
                               </div>
                             </div>
                         </div>

                         <div class="inline fields">
                              <label>服务过程2</label>
                              <div class="field">
                                <div class="ui radio checkbox">
                                  <input type="radio" name="frequency"  />
                                  <label>已完成</label>
                                </div>
                              </div>
                              <div class="field">
                                <div class="ui radio checkbox">
                                  <input type="radio" name="frequency" />
                                  <label>未开始</label>
                                </div>
                              </div>
                              <div class="field">
                                <div class="ui radio checkbox">
                                  <input type="radio" name="frequency" />
                                  <label>并行</label>
                                </div>
                              </div>
                          </div>

                      </div>

                     <div class="field">
                       <label> 资源及载体前置条件</label>
                     </div>
                     <div class="field">
                            <table class="ui celled table">
                               <thead>
                                 <tr><th>资源/载体ID</th>
                                 <th>资源/载体数量（状态）</th>
                                 <th>访问/使用权限</th>
                               </tr></thead>
                               <tbody>
                                 <tr>
                                   <td data-label="ID"><input type="text" placeholder="ID"></input></td>
                                   <td data-label="state/numbers"><input type="text" placeholder="state/numbers"></input></td>
                                   <td data-label="Permission"><input type="text" placeholder="Permission"></input></td>
                                 </tr>
                                 <tr>
                                   <td data-label="ID"><input type="text" placeholder="ID"></input></td>
                                   <td data-label="state/numbers"><input type="text" placeholder="state/numbers"></input></td>
                                   <td data-label="Permission"><input type="text" placeholder="Permission"></input></td>
                                 </tr>
                                 <tr>
                                   <td data-label="ID"><input type="text" placeholder="ID"></input></td>
                                   <td data-label="state/numbers"><input type="text" placeholder="state/numbers"></input></td>
                                   <td data-label="Permission"><input type="text" placeholder="Permission"></input></td>
                                 </tr>
                               </tbody>
                             </table>
                     </div>

                     <div class="ui button" tabindex="0">提交</div>

                   </form>
           </div>
           )
         }
}
