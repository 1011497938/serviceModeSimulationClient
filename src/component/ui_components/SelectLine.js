import React from 'react';
import { Icon, Dropdown, Checkbox} from 'semantic-ui-react'

import dataStore from '../../manager/dataStore';
import { autorun } from 'mobx';
import stateManger from '../../manager/stateManager';

const view2lineType = {
    '全局视图': [
        '协作',
        '传递',
        '交互',
        '支持',
        '实现',
    ],

    '协同生态视图': [
        '联盟关系',
        '合作关系',
        '合资关系',
        '从属关系',
        '购买方',
        '自定义',
    ],

    '载体及资源视图': [
        '从属关系',
        '直接转换',
        '相互依赖',
        '合作关系',
    ],

    '服务目标视图': [
        '从属关系',
        '协同关系',
        '排他关系',
        '自定义',
    ],

    '服务过程视图': [
        '下一步',
    ]
}
export default class SelectLine extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            line_options: [],
            default_line: undefined
        }
    }

    componentDidMount(){
        this.onViewChange = autorun(()=>{
            const show_view_name = stateManger.show_view_name.get()
            const line_options = view2lineType[show_view_name] || []
            this.setState({
                line_options: line_options,
            })
            this.setDeafultLineType(line_options[0])
        })
    }

    setDeafultLineType(line_type){
        // console.log(stateManger.show_view_controller.setDeafultLineType)
        stateManger.show_view_controller.setDeafultLineType(line_type)
        this.setState({default_line: line_type})
    }
    render(){
        return (
        <div style={{position:'relative',marginTop:'10px',borderBottom:'1px solid #5a5a5a', width:"100%",margin:"0 auto", height: 30, background: 'white'}}>

            <div style={{position: 'absolute',top: 3, right:"20%", width: 100}}>
                <Dropdown 
                text={this.state.default_line}
                fluid
                closeOnChange
                className='select_line' 
                >
                    <Dropdown.Menu>
                        {this.state.line_options.map(text=>{
                            return (
                                <Dropdown.Item icon='long arrow alternate right' key={text} text={text}
                                    onClick={()=>{
                                        this.setDeafultLineType(text)
                                    }}
                                />
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
        )
    }
}