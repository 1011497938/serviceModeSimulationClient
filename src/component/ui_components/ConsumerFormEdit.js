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

                      <div class="two  fields">

                            <div class="field">
                               <label>消费主体ID</label>
                               <input type="text"  placeholder="ConsumerID" />
                            </div>

                             <div class="field">
                               <label>消费主体名称</label>
                               <input type="text"  placeholder="ConsumerName" />
                            </div>
                      </div>

                      <div class='two fields'>
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


