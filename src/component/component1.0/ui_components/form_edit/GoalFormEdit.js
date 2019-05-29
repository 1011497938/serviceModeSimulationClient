import React, { Component } from 'react'
import { Input, Menu, Table, Label, Icon,Form} from 'semantic-ui-react'
import stateManger from '../../../dataManager/stateManager';
import { autorun } from 'mobx';

export default class GoalFormEdit extends Component{
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
                        <h3 class="ui dividing header">目标属性编辑</h3>
                     </div>

                     <div class="field">
                        <h4> 目标基础信息</h4>
                     </div>

                      <div class="two  fields">
                            <div class="field">
                               <label>目标名称</label>
                               <input type="text"  placeholder="GoalName" />
                            </div>

                             <div class="field">
                               <label>目标ID</label>
                               <input type="text"  placeholder="StrategicGoalID" />
                            </div>
                      </div>


                          <label>完成主体</label>
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


