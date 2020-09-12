import Home from "../pages/Home";

// 动态路由
const DynamicRouters =[
    {
        path: "/",
        name: "Home",
        redirect: "/Welcome",
        component: Home,
        children:[]
      },
      {
          path:"*",
          name:"page404",
          component:()=>import(/* webpackChunkName:"page404" */ "../pages/Page404")
      }
]
  export default DynamicRouters