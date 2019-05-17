import React, { Component } from 'react'
import { Input, Menu, Table, Label, Icon,Form} from 'semantic-ui-react'
import stateManger from '../../dataManager/stateManager';
import { autorun } from 'mobx';

export default class FinancialResourceFormEdit extends Component{
    constructor(props){
        super(props)
         this.state={
                    select_component: stateManger.selet_component_ingo.get()
                }
    }

    render(){
        return(
            <div>
                 <div>
                    {this.state.select_component}
                 </div>
                 <form class='ui form'>
                     <div>
                        <h3 class="ui dividing header">金融类资源属性编辑</h3>
                     </div>

                     <div class="field">
                        <h4> 金融类资源基础信息</h4>
                     </div>

                      <div class="two  fields">
                            <div class="field">
                               <label>资源名称</label>
                               <input type="text"  placeholder="ResourceName" />
                            </div>

                             <div class="field">
                               <label>资源ID</label>
                               <input type="text"  placeholder="ResourceID" />
                            </div>
                      </div>

                      <div class="two  fields">
                         <div class="field">
                            <label>资源持有主体</label>
                             <div class="field">
                                      <select class="ui fluid search dropdown" name="card[expire-month]">
                                        <option value="1">主体1</option>
                                        <option value="2">主体2</option>
                                        <option value="3">主体3</option>
                                      </select>
                             </div>
                         </div>

                         <div class="field">

                             <label>资源访问/使用权限</label>
                              <div class="field">
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

                         </div>

                      </div>

                      <div class="inline fields">
                          <label>完成主体</label>
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
                          <label>简要介绍</label>
                          <input type="text"  placeholder="Description" />
                       </div>

                        <div class="two fields">
                             <div class="field">
                                  <label>预期完成时间</label>
                                  <input type="text"  placeholder="FinishTime" />
                             </div>
                             <div class="field">
                                   <label>目标优先级</label>
                                   <input type="text"  placeholder="priority" />
                              </div>
                        </div>


                     
                    <div class="ui button" tabindex="0">提交</div>
                 </form>
            </div>

        )
    }
    }


