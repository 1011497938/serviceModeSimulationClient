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



                    <div class="field">
                        <h4> 消费主体交互信息</h4>
                    </div>

                    <div class="field">
                           <label>反馈</label>
                           <table class="ui celled padded table">
                             <thead>
                               <tr><th class="single line">评价提交时间</th>
                               <th>评价对象</th>
                               <th>评价等级</th>
                               <th>评价内容</th>
                             </tr></thead>

                             <tbody>
                               <tr>
                                 <td>
                                   <p>2019.05.16</p>
                                 </td>
                                 <td class="single line">
                                   服务过程1
                                 </td>
                                 <td class="single line">
                                      A <br/>
                                 </td>
                                 <td class="single line">
                                   good<br/>
                                 </td>
                               </tr>

                               <tr>
                                <td>
                                  <p>2019.05.16</p>
                                </td>
                                <td class="single line">
                                  服务过程1
                                </td>
                                <td class="single line">
                                     A <br/>
                                </td>
                                <td class="single line">
                                  good<br/>
                                </td>
                              </tr>

                             </tbody>
                             <tfoot>
                               <tr><th colspan="5">
                                 <div class="ui right floated pagination menu">
                                   <a class="icon item">
                                     <i class="left chevron icon"></i>
                                   </a>
                                   <a class="item">1</a>
                                   <a class="item">2</a>
                                   <a class="item">3</a>
                                   <a class="item">4</a>
                                   <a class="icon item">
                                     <i class="right chevron icon"></i>
                                   </a>
                                 </div>
                               </th>
                             </tr></tfoot>
                           </table>
                    </div>
                    <div class="ui button" tabindex="0">提交</div>
                 </form>
            </div>

        )
    }
    }


