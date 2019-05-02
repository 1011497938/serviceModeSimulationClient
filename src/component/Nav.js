import React from 'react';
import stateManger from '../dataManager/stateManager';

export default class Nav extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selected_view: '全局视图'
        }
        this.view_names = ['全局视图', '协同生态视图', '载体及资源视图', '服务价值视图', '服务过程视图', '服务目标视图', '登录/注册']
    }

    render(){
        const {selected_view} = this.state
        const {view_names} = this

        const renderViewBar = (text) => {
            const handleClick = ()=>{
                console.log('click',text)
                stateManger.show_view_name.set(text)
            }
            return (
            <li className={"nav-item " + (selected_view===text?"active":"")}>
                <a className="nav-link" href="#" onClick={handleClick}>
                    {text}
                <span className="sr-only">(current)</span></a>
            </li>                
            )
        }

        return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span class="navbar-brand mb-0 h1">服务模式</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {
                        view_names.map(text=> renderViewBar(text))
                    }
                </ul>
            </div>
        </nav>
        )
    }
}