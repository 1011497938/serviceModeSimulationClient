    
import { view2controller } from "../component/function_components/goController/GraphController.ts";
import initData from './init_data.json'
import deepcopy from 'deepcopy'
import itemManager from './ItemManager'
class DataStore {
    view_names = ['协同生态视图', '载体及资源视图', '服务价值视图', '服务过程视图', '服务目标视图']  //'全局视图', 

    default_view_name = '服务过程视图'
    default_view_names = ['协同生态视图', '载体及资源视图', '服务价值视图', '服务过程视图', '服务目标视图']
}

const view2postion = {
    '服务价值视图': [0, -750.4396082433907],
    '服务目标视图': [0, -115.18147737403928],
    '服务过程视图': [0, 649.9092667808559],
    '载体及资源视图': [0, 1284.9638497993387],

    // 这两个要分一下
    '协同生态视图': [-1072.2156124987555, 175.5014884513875],
    '提供主体及网络': [-1072.2156124987555, 175.5014884513875],
    '消费主体': [1072.2156124987555, 175.5014884513875],
}

// 记录了每个视图中的信息
const view2palatte = {
    '全局视图': {
        node: [
        ],
        link: [
        ],
    },
    '协同生态视图': {
        node: [
            { category: 'producer', },
            { category: 'consumer', },
        ],
        link: [
        ],
    },
    '载体及资源视图': {
        node: [
            { category: 'carrier', },
            { category: 'resource', },
        ],

        link: [
        ],
    },
    '服务价值视图': {
        node: [
        ],
        link: [
        ],
    },
    '服务过程视图': {
        node: [
            { category: 'task', },
            { category: 'start', },
            { category: 'end', },
            { category: 'time', },
            { category: 'message', },
            { category: 'exclusive', },
            { category: 'parallel', },

            { key: 1, text: "Pool", isGroup: true, category: "Pool", },
            { key: 2, text: "Lane", isGroup: true, category: "Lane", group: 1 },
            { key: 3, text: "Lane", isGroup: true, category: "Lane", group: 1 },
        ],
        link: [
        ],
    },
    '服务目标视图': {
        node: [
            { category: 'strategic' },
            { category: 'emotion', },
            { category: 'physics', },
            { category: 'amount', },
            { category: 'business', },
        ],
        link: [
        ],
    }
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

const copy_initData = deepcopy(initData)

var dataStore = new DataStore()
export default dataStore
export {
    // view2data,
    view2palatte,
    copy_initData as view2data,
    view2postion,
    download
}