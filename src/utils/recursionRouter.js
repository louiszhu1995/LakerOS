// 通过数组对比的方法，得到用户需要的菜单

/**
 * 
 * @param {ARRAY} allRouters //玩真的个路由配置数组
 * @param {ARRAY} menuList  //从服务器获取用户拥有的菜单数组
 */

const recursionRouter =( allRouters=[],menuList=[] )=>{
    let userRouters =[];//用于存放对比得到的值
    allRouters.forEach(item=>{
        menuList.forEach(v=>{
            if(item.meta.name === v.name){
                if(v.children && v.children.length>0){
                    item.children = recursionRouter(item.children,v.children)
                }
                userRouters.push(item)
            }
        })
    })
    return userRouters
}


export default recursionRouter