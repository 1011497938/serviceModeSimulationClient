import * as go from 'gojs';
import config from './component_config';

// 用来表示任务的
export default class TaskObject extends go.Node{
    constructor(){
        super(go.Panel.Auto)

        var shape = new go.Shape();
        shape.figure = "RoundedRectangle";
        shape.fill = '#f7f7f7';
        shape.width = config.task_width
        shape.height = config.task_height
        this.add(shape);
        this.shape = shape

        var textblock = new go.TextBlock();
        textblock.text = "Task";
        textblock.editable = true
        textblock.isMultiline = true
        textblock.margin = 5;
        this.add(textblock);
        this.textblock = textblock
    }
}