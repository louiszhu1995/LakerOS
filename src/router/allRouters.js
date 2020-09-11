// 引入所有组件页面(因为想使用懒加载方式，所以就不用引过来了，全注销掉了)
// import Attendance from "../pages/Home/Attendance";
// import Mine from "../pages/Home/Mine";
// import Statistics from "../pages/Home/Statistics";
// import Users from "../pages/Home/Users";
// import Welcome from "../pages/Home/Welcome";
// import StudentManager from "../pages/Home/StudentManager";
// import StudentDormitory from "../pages/Home/StudentManager/StudentDormitory";
// import StudentInformation from "../pages/Home/StudentManager/StudentInformation";
// import StudentItem from "../pages/Home/StudentManager/StudentItem";


// 我全部使用了懒加载的方式
const allRouters =[
    {
        path:"Welcome",
        name:"Welcome",
        meta:{name:"管理首页",icon:"iconfont icon-shouyex",fullPath:"/Welcome"},
        component:()=>import(/* webpackChunkName:"welcome" */ "../pages/Home/Welcome")
    },
    {
        path:"StudentManager",
        name:"StudentManager",
        // redirect:"/StudentManager/StudentItem",
        meta:{name:"学员管理",icon:"iconfont icon-wode"},
        component:()=>import(/* webpackChunkName:"studentManager" */ "../pages/Home/StudentManager"),
        children:[
            {
                path:"StudentItem",
                name:"StudentItem",
                meta:{name:"学员项目管理",icon:"iconfont icon-xiangmu",fullPath:"/StudentManager/StudentItem"},
                component:()=>import(/* webpackChunkName:"studentItem" */ "../pages/Home/StudentManager/StudentItem")
            },
            {
                path:"StudentInformation",
                name:"StudentInformation",
                meta:{name:"学员资料",icon:"iconfont icon-xueyuandangan-01",fullPath:"/StudentManager/StudentInformation"},
                component:()=>import(/* webpackChunkName:"studentInformation" */ "../pages/Home/StudentManager/StudentInformation")
            },
            {
                path:"StudentDormitory",
                name:"StudentDormitory",
                meta:{name:"学员宿舍",icon:"iconfont icon-xuexiao-",fullPath:"/StudentManager/StudentInformation"},
                component:()=>import(/* webpackChunkName:"studentDormitory" */ "../pages/Home/StudentManager/StudentDormitory")
            },
        ]
    },
    {
        path:"Attendance",
        name:"Attendance",
        meta:{name:"考勤管理",icon:"iconfont icon-kaoqin",fullPath:"/Attendance"},
        component:()=>import(/* webpackChunkName:"attendance" */ "../pages/Home/Attendance")
    },
    {
        path:"Mine",
        name:"Mine",
        meta:{name:"我的中心",icon:"iconfont icon-gerenzhongxin",fullPath:"/Mine"},
        component:()=>import(/* webpackChunkName:"mine" */ "../pages/Home/Mine")
    },
    {
        path:"Statistics",
        name:"Statistics",
        meta:{name:"数据统计",icon:"iconfont icon-shuju",fullPath:"/Statistics"},
        component:()=>import(/* webpackChunkName:"statistics" */ "../pages/Home/Statistics")
    },
    {
        path:"Users",
        name:"Users",
        meta:{name:"用户中心",icon:"iconfont icon-yonghuzhongxin",fullPath:"/Users"},
        component:()=>import(/* webpackChunkName:"users" */ "../pages/Home/Users")
    }
]

export default allRouters