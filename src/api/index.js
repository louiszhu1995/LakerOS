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
    export  const getStuList =(params={})=>axios({
        url:"/students/getstulist",
        params
    })
    

// 增加学员信息
    export const addStuDetail =(stuDetail)=> axios({
        method:"post",
        url:"/students/addstu",
        data:stuDetail
    })

// 删除学员信息
    export const delStu= (sId) =>axios.get(`/students/delstu?sId=${sId}`);
// 编辑学员信息
    export const updateStu =(updated={})=> axios({
        method:"post",
        url:"/students/updatestu",
        data:updated
    })

// 搜索学员
    export  const searchStu =(key)=>axios.get(`/students/searchstu?key=${key}`)

// 获取班级
    export  const getClasses =()=>axios.get(`/students/getclasses`)








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
    
    