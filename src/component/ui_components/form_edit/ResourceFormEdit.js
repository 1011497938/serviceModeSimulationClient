import React, { Component } from 'react'
import { Input, Menu, Table, Label, Icon,Form} from 'semantic-ui-react'
import stateManger from '../../../dataManager/stateManager';
import { autorun } from 'mobx';

export default class ResourceFormEdit extends Component{
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
                        <h3 class="ui dividing header">资源属性编辑</h3>
                     </div>

                     <div class="field">
                        <h4> 资源基础信息</h4>
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
                       
                         <div>
                             <label>资源可调配数量：</label>
                             <div class="field">
                                 <input type="text"></input>
                             </div>
                         </div>

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
                         <label>资源类别</label>
                         <div class="field">
                             <select class="ui fluid search dropdown" name="card[expire-month]">
                                 <option value="1">金融资产</option>
                                 <option value="2">实体资产</option>
                                 <option value="3">知识资产</option>
                                 <option value="4">人力资源</option>
                             </select>
                         </div>
                     </div>

                         <div class=" field">
                             <label>资源访问/使用权限</label>
                         </div>
                         <div class="inline fields">
                                   <div class="field">
                                   <div class="ui radio checkbox">
                                     <input type="radio" name="frequency"  />
                                     <label>主体1</label>
                                   </div>
                                 </div>
                                 <div class=" field">
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
                         </div>


                      <div class=" field">
                          <label>完成主体</label>
                      </div>
                      <div class="inline fields">
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
                      </div>

                       <div class="field">
                          <label>简要介绍</label>
                          <input type="text"  placeholder="Description" />
                       </div>

                        <div class="two fields">
                             <div class="field">
                                  <label>预期持有时长</label>
                                  <input type="text"  placeholder="Time" />
                             </div>
                             <div class="field">
                                   <label>使用优先级</label>
                                   <input type="text"  placeholder="priority" />
                              </div>
                        </div>
                    <div class="ui button" tabindex="0">提交</div>
                 </form>
            </div>

        )
    }
    }


