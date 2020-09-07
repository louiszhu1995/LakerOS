import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children:[
      {
        path:"Welcome",
        name:"Welcome",
        //懒加载方式：
        component:()=>import(/* webpackChunkName:"welcome" */ "../pages/Home/Welcome")
      },
      // {
      //   path:"StudentManager",
      //   name:"/StudentItem",
      //   //懒加载方式：
      //   component:()=>import(/* webpackChunkName:"studentManager/studentItem" */ "../pages/Home/StudentManager/StudentItem")
      // },
      {
        path:"Attendance",
        name:"Attendance",
        //懒加载方式：
        component:()=>import(/* webpackChunkName:"attendance" */ "../pages/Home/Attendance")
      },
      {
        path:"Users",
        name:"Users",
        //懒加载方式：
        component:()=>import(/* webpackChunkName:"users" */ "../pages/Home/Users")
      },
      {
        path:"Mine",
        name:"Mine",
        //懒加载方式：
        component:()=>import(/* webpackChunkName:"mine" */ "../pages/Home/Mine")
      },
      {
        path:"Statistics",
        name:"Statistics",
        //懒加载方式：
        component:()=>import(/* webpackChunkName:"statistics" */ "../pages/Home/Statistics")
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    //懒加载的方式
    component: () =>
      import(/* webpackChunkName: "login" */ "../pages/Login")
  }
];

const router = new VueRouter({
  routes
});

export default router;
