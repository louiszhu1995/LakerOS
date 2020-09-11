import axios from "./config";

// 封装登录请求,并导出
    export const login =(data)=> axios({
        method:"post",
        url:"/users/login",
        data
    })

// 封装登录日志的方法
    export const getLoginLog= () =>axios.get("/getloginlog");

// 封装获取权限菜单的方法
    export const getMenuList =()=>axios.get("/permission/getMenuList")

    // 获取学员信息
    export  const getStuList =()=>axios.get("/students/getstulist")














    // const post = (url,data)=>axios({
    //         method:"post",
    //         url:url,
    //         data:data
    //     })

    // const get = (url,params)=>axios({
    //     method:"get",
    //     url:url,
    //     params,params
    // })
    
    