import React, { Component } from 'react'
import { Input, Menu, Table, Label, Icon,Form} from 'semantic-ui-react'
import stateManger from '../../dataManager/stateManager';
import { autorun } from 'mobx';

export default class CarrierFormEdit extends Component{
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
                        <h3 class="ui dividing header">载体属性编辑</h3>
                     </div>

                     <div class="field">
                        <h4> 载体基础信息</h4>
                     </div>

                      <div class="two  fields">

                            <div class="field">
                               <label>载体名称</label>
                               <input type="text"  placeholder="CarrierName" />
                            </div>

                             <div class="field">
                               <label>载体ID</label>
                               <input type="text"  placeholder="CarrierID" />
                            </div>
                      </div>

                      <div class='three fields'>
                       <div class="field">
                          <label>持有主体</label>
                          < div class="field">
                              <select class="ui fluid search dropdown" name="card[expire-month]">
                                <option value="1">主体1</option>
                                <option value="2">主体2</option>
                                <option value="3">主体3</option>
                              </select>
                          </div>
                       </div>

                      <div class="field">
                          <label>运维主体</label>
                          <div class="field">
                                 <select class="ui fluid search dropdown" name="card[expire-month]">
                                   <option value="1">主体1</option>
                                   <option value="2">主体2</option>
                                   <option value="3">主体3</option>
                                 </select>
                          </div>
                      </div>
                      <div class="field">
                        <label>载体性质</label>
                        < div class="field">
                            <select class="ui fluid search dropdown" name="card[expire-month]">
                              <option value="1">原子载体</option>
                              <option value="2">组合载体</option>
                            </select>
                        </div>
                      </div>
                     </div>

                      <div class="two  fields">
                          <div class="field">
                              <label>载体状态</label>
                               <div class="field">
                                        <select class="ui fluid search dropdown" name="card[expire-month]">
                                          <option value="1">良好</option>
                                          <option value="2">异常</option>
                                        </select>
                               </div>
                           </div>

                          <div class="field">

                               <label>载体访问/使用权限</label>
                                <div class="field">
                                     <select class="ui fluid search dropdown" name="card[expire-month]">
                                       <option value="1">仅持有主体</option>
                                       <option value="2">仅提供主体</option>
                                       <option value="3">所有主体</option>
                                     </select>
                                </div>
                           </div>
                      </div>
                       <div class="field">
                            <label>载体功能介绍</label>
                            <input type="text"  placeholder="FunctionIntroduction" />
                       </div>
                    <div class="ui button" tabindex="0">提交</div>
                 </form>
            </div>
        )
    }
    }


