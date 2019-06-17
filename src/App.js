import React from 'react';
import './App.css';
// import Test from './component/function_components/Test'
import { Icon, Dropdown, Input,Search}from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import {view2controller} from './component/function_components/goController/GraphController.ts'

// 各种表单
// import  TaskFormEdit from './component/ui_components/form_edit/TaskFormEdit'
// import  ProviderFormEdit from './component/ui_components/form_edit/ProviderFormEdit'
// import  StartFormEdit from './component/ui_components/form_edit/StartFormEdit'
// import  ResourceFormEdit from './component/ui_components/form_edit/ResourceFormEdit'
// import  CarrierFormEdit from './component/ui_components/form_edit/CarrierFormEdit'

import Nav from './component/ui_components/Nav'
import MyPalatte from './component/function_components/MyPalatte'
import { autorun } from 'mobx';
import stateManger from './dataManager/stateManager';
import dataStore, { download } from './dataManager/dataStore';

import GlobalOverview from './component/function_components/GlobalOverview';
import CommonView from './component/function_components/CommonView'
import LoginModal from './component/ui_components/LoginModal';
import SelectLine from './component/ui_components/SelectLine';


class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      show_view_name: dataStore.default_view_name,
      show:false
    }
  }

  componentDidMount(){
    this.onViewChange = autorun(()=>{
      const show_view_name = stateManger.show_view_name.get()
        // 这里有个bug
      this.setState({
        show_view_name: show_view_name,

      })
    })
  }

  render(){
    const {show_view_name} = this.state
    const needShow = name=>{
      // 设一个第一次限制渲染
      return name=== show_view_name?29:0
    }
    const view2Component = {
      '全局视图': GlobalOverview,
    //  '协同生态视图':,
    //  '载体及资源视图':,
    //  '服务价值视图':,
    //  '服务过程视图':,
    //  '服务目标视图':
    }

    return (
      <div>
        {/*顶部导航栏*/}
        <div style={{height:40,position:'relative',zIndex: show_view_name==='全局视图'?0:31}}>
          <Nav/>
        </div>
        {/* <div style={{ position:'absolute',left:50,color:"#fff",zIndex:31,marginTop:15,fontSize: 20,fontWeight: 'blod'}}>服务模式</div>
          <Nav/>
          <div style={{ position:'absolute',color:"#fff",bottom:5,right:40,height: 50,zIndex:31, float:'right'}}>
            <Input        
                placeholder='搜索'
                color='#fff'
                style={{margin: 10, top: 2}}
              />
            <LoginModal/>
          </div> */}

     {/* action={<Dropdown button basic floating 
                options={[
                  {key:'本图', value:'本图', text:'本图'},
                  {key:'全部', value:'全部', text:'全部'},
                ]} 
                defaultValue='本图' />}
                icon='search'
                iconPosition='left'*/}

          {/* 各个go的面板 */}
          <div style={{position: 'absolute',width:'100%', height:'100%', top:0, left:0}}>
            {dataStore.view_names.map(elm=>{
              const ViewComponent = view2Component[elm] || CommonView
              return (
              <div key={elm} style={{zIndex: needShow(elm)}} className={'main-view '  + elm}>
                {<ViewComponent view_name={elm}/>}
              </div>
              )
            })}
          </div>
        <div className='控件栏' style={{position: 'absolute', top:'17%', left:40, 
          zIndex: show_view_name==='全局视图'?0:31}}
        >
          <MyPalatte/>
        </div>


{/*右边控制栏框框*/}
       <div style={{background:'#f5f5f5',position:'absolute',right:0,top:'50px',display:'fixed',borderLeft:"1px solid #999",borderBottom:"1px solid #999",borderBottomLeftRadius:'5px',borderTop:"15px solid #5a5a5a",width:50,height:370,zIndex:show_view_name==='全局视图'?0:31,paddingTop:15,boxSizing:'borderBox'}}>

                  {/* 后退 */}
                  <div className='tool-icon' style={{top:15}}>
                    <Icon className='isButtom' circular inverted name='angle left' size='small' 
                    onClick={()=>{
                      stateManger.show_view_controller.diagram.undoManager.undo()
                    }}/>
                  </div>
                  {/* 前进 */}
                  <div className='tool-icon' style={{top: 65}}>
                    <Icon className='isButtom' circular name='angle right' size='small'
                    onClick={()=>{
                      stateManger.show_view_controller.diagram.undoManager.redo()
                    }}/>
                  </div>
                  {/* <div style={{left: 55, top:5, position: 'absolute'}}>
                    <span>历史记录</span>
                  </div> */}



                
                {/* 下半部分工具栏， 有放大缩小之类的*/}
                  
                  <div className='tool-icon' style={{top: 115}}>
                    <Icon className='isButtom' name='expand' size='large' 
                      onClick={()=>{
                        stateManger.show_view_controller.diagram.zoomToFit()
                      }}
                    />
                  </div>
                  <div className='tool-icon' style={{top: 165}}>
                    <Icon className='isButtom' name='copy' size='large'/>
                  </div>
                  <div className='tool-icon' style={{top:215}}>
                    <Icon className='isButtom' name='paste' size='large'/>
                  </div>
                  <div className='tool-icon' style={{top: 265}}>
                    <Icon className='isButtom' name='delete'  size='large'
                    onClick={()=>{
                      const select_component_ingo = stateManger.select_component_ingo
                      // console.log(select_component_ingo)
                      if(select_component_ingo)
                        stateManger.show_view_controller.diagram.remove(select_component_ingo)
                    }}
                    />
                  </div>

                  <div className='tool-icon' style={{top:315}} onClick={this.chooseLine.bind(this)}>
                    <Icon className='isButtom' name='home' size='large'/>
                  </div>
        </div>
        
        {/* 选择连线 */}
        <div style={{position:'absolute', top: '23%', right:50,height:60,width:200,zIndex:40,border:"1px solid #a6a6a6",borderRight:'none',display:this.state.show?"block":'none'}}>
          <div style={{width:'100%',height:30,background:"#a6a6a6",display:'flex',justifyContent:'spaceBetween'}}>
              <p style={{fontSize:16,fontWeight:400,marginLeft:10,marginTop:5,marginRight:"48%"}}>选择关系</p>
              <div style={{float:'right',marginTop:5,cursor:'pointer'}} onClick={this.handleShow.bind(this)}>
                <Icon name='angle double right' />
              </div>
          </div>
          <SelectLine/>
        </div>

        {/* 提交保存新建按钮 */}
        <div style={{position: 'absolute', right:'7%', width: 400,height: 50, bottom: 0, zIndex: 31}}>
          {greenButton('保存', ()=>{
            const view2json = {}
            for(let view in view2controller){
              const model = view2controller[view].diagram.model
              const obj = JSON.parse(model.toJson())

              view2json[view] = {
                node: obj.nodeDataArray,
                link: obj.linkDataArray,
              }
            }
            const now_time = new Date();
            // console.log(view2json)
            download('数据保存'+now_time.toString()+'.json', JSON.stringify(view2json))
          }, {})}
          {greenButton('仿真', ()=>{}, {})}
          {show_view_name==='全局视图'&&greenButton('新建', ()=>{}, {})}
        </div>
      </div>
    )
  }
  handleShow(){
    this.setState({
      show:false
    })
  }
  chooseLine(){
    this.setState({
      show:true
    })
  }
}
const greenButton = (text, handleClick, style)=>{
  return (
    <div 
      className='isButtom' 
      style={Object.assign({
        width: 100, height: 50, bottom: 0, position: 'relative',
        textAlign: 'center', fontSize: 15, lineHeight: '50px',
        background: '#00b5ad',
        float: 'right', marginRight: 20,
        color: 'white',
      }, 
      style)}
      onClick={handleClick}
    >
      {text}
    </div>
  )
}




export default App;