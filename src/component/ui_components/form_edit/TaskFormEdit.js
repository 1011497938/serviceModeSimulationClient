import React, { Component } from 'react'
import { Tab} from 'semantic-ui-react'
import TaskBasicInfo from './TaskBasicInfo'
import TaskComputeInfo from './TaskComputeInfo'
import TaskConstraintInfo from './TaskConstraintInfo'
import CustomizeInfo from './CustomizeInfo'


const panes = [
    { menuItem: '描述', render: () => <Tab.Pane ><TaskBasicInfo/></Tab.Pane> },
    { menuItem: '计算', render: () => <Tab.Pane><TaskComputeInfo/></Tab.Pane> },
    { menuItem: '约束', render: () => <Tab.Pane><TaskConstraintInfo/></Tab.Pane> },
    { menuItem: '自定义', render: () => <Tab.Pane><CustomizeInfo/></Tab.Pane> }
]

const TaskFormEdit = () =>( <Tab panes={panes} />)

export default TaskFormEdit