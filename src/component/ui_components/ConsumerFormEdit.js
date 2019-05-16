import React, { Component } from 'react'
import { Input, Menu, Table, Label, Icon,Form} from 'semantic-ui-react'
import stateManger from '../../dataManager/stateManager';
import { autorun } from 'mobx';

export default class ConsumerFormEdit extends Component{
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
                        <h3 class="ui dividing header">消费主体属性编辑</h3>
                     </div>

                     <div class="field">
                        <h4> 消费主体基础信息</h4>
                     </div>

                      <div class="three  fields">

                            <div class="field">
                               <label>消费主体ID</label>
                               <input type="text"  placeholder="ConsumerID" />
                            </div>

                            <div class="field">
                                <label>消费主体类别</label>
                               < div class="field">
                                    <select class="ui fluid search dropdown" name="card[expire-month]">
                                      <option value="1">部门/组织</option>
                                      <option value="2">企业</option>
                                      <option value="3">个人</option>
                                    </select>
                                </div>
                             </div>

                           <div class="field">
                               <label>消费主体等级</label>
                               <div class="field">
                                    <select class="ui fluid search dropdown" name="card[expire-month]">
                                      <option value="1">非会员</option>
                                      <option value="2">普通会员</option>
                                      <option value="3">高级会员</option>
                                    </select>
                               </div>
                           </div>
                      </div>

                      <div class="two  fields">
                          <div class="field">
                              <label>主体作用域</label>
                               <div class="field">
                                        <select class="ui fluid search dropdown" name="card[expire-month]">
                                          <option value="1">农业</option>
                                          <option value="2">工业</option>
                                          <option value="3">交通运输</option>
                                          <option value="4">金融</option>
                                          <option value="5">其他</option>
                                        </select>
                               </div>
                           </div>

                          <div class="field">
                               <label>消费主体性质</label>
                               <div class="field">
                                        <select class="ui fluid search dropdown" name="card[expire-month]">
                                          <option value="1">潜在消费主体</option>
                                          <option value="2">目标消费主体</option>
                                        </select>
                               </div>
                            </div>

                      </div>


                       <div class="field">
                            <label>联系方式</label>
                            <input type="text"  placeholder="ContactInformation" />
                       </div>

                       <div class="field">
                           <label>简要介绍</label>
                           <input type="text"  placeholder="Description" />
                       </div>


                    <div class="ui button" tabindex="0">提交</div>

                 </form>

            </div>

        )
    }
    }


