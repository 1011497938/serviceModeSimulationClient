import React, { Component } from 'react'
import { Tab} from 'semantic-ui-react'
import StartBasicInfo from './StartBasicInfo'
import TaskComputeInfo from './TaskComputeInfo'
import StartConstraintInfo from './StartConstraintInfo'
import CustomizeInfo from './CustomizeInfo'
const panes = [
    { menuItem: '描述', render: () => <Tab.Pane ><StartBasicInfo/></Tab.Pane> },
    { menuItem: '约束', render: () => <Tab.Pane><StartConstraintInfo/></Tab.Pane> },
    { menuItem: '自定义', render: () => <Tab.Pane><CustomizeInfo/></Tab.Pane> }
]

const TaskFormEdit = () =>( <Tab panes={panes} />)


export default TaskFormEdit