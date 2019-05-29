import React, { Component } from 'react'
import { Input, Menu, Table, Label, Icon,Form} from 'semantic-ui-react'
import stateManger from '../../../dataManager/stateManager';
import { autorun } from 'mobx';

export default class TaskFormEdit extends Component{
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
                <form className="ui form">
                  <h3 className="ui dividing header">任务属性编辑</h3>

                  <div className="field">
                      <h4> 任务基础信息</h4>
                  </div>

                  <div className="three  fields">
                   <div className="field">
                       <label>任务名称</label>
                       <input type="text"  placeholder="TaskName" />
                    </div>
                    <div className="field">
                        <label>任务ID</label>
                        <input type="text"  placeholder="TaskID" />
                    </div>
                    <div className="field">
                    <label>任务类型</label>
                     <div className="field">
                               <select className="ui fluid search dropdown" name="card[expire-month]">
                                 <option value="1">用户任务</option>
                                 <option value="2">系统任务</option>
                                 <option value="3">提供主体任务</option>
                               </select>
                             </div>
                    </div>
                  </div>

                   <div className="field">
                      <label>任务描述</label>
                      <input type="text"  placeholder="Description" />
                   </div>

                  <div className="inline fields">
                        <label>参与主体</label>
                        <div className="field">
                          <div className="ui radio checkbox">
                            <input type="radio" name="frequency"  />
                            <label>主体1</label>
                          </div>
                        </div>
                        <div className="field">
                          <div className="ui radio checkbox">
                            <input type="radio" name="frequency" />
                            <label>主体2</label>
                          </div>
                        </div>
                        <div className="field">
                          <div className="ui radio checkbox">
                            <input type="radio" name="frequency" />
                            <label>主体3</label>
                          </div>
                        </div>
                        <div className="field">
                          <div className="ui radio checkbox">
                            <input type="radio" name="frequency" />
                            <label>主体4</label>
                          </div>
                        </div>
                    </div>

                  <div className="field">
                     <h4> 任务约束信息</h4>
                  </div>
                  <div className="field">
                  <label> 载体及资源前置条件</label>
                  </div>
                  <div className="field">
                       <table className="ui celled table">
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

                  <div className="field">
                                    <label> 任务执行所需资源</label>
                                    </div>
                                    <div className="field">
                                         <table className="ui celled table">
                                                            <thead>
                                                              <tr><th>所需资源ID</th>
                                                              <th>所需载体ID</th>
                                                              <th>资源消耗数量</th>
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

                  <div className="two fields">
                     <div className="field">
                       <label>完成所需时长</label>
                       <input type="text" name="time" />
                     </div>
                  </div>

                  <div className="ui button" tabIndex="0">提交</div>
                </form>

            </div>

        )
    }

}