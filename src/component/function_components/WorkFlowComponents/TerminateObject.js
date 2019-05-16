import * as go from 'gojs';
import solid_circle from '../../../static/images/圆-实心.svg'
import config from './component_config';
// 用来表示事件的
export default class TerminateObject extends go.Part{
    constructor(){
        super(go.Panel.Auto)
        const inner_r = 45, r = 80
        var shape = new go.Shape();
        shape.figure = "Circle";
        shape.fill = "lightblue";
        shape.stroke = config.border_color
        shape.width = config.r
        shape.height = config.r
        this.add(shape);
        this.shape = shape

        var icon = new go.Picture();
        icon.source = solid_circle
        icon.width = config.inner_r
        icon.height = config.inner_r
        this.add(icon)
        this.icon = icon
    }
}