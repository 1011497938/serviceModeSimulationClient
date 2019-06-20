// 越靠后越重要,可以用Object.assign代替
const propCombine = pro_array => {
    const props = {}
    pro_array.forEach(pro => {
        for(let key in pro){
            props[key] = pro[key]
        }
    });
    return props
}

export {
    propCombine
}