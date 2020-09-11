//解决路由导航到统一路径重复报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


import Vue from "vue";
import VueRouter from "vue-router";
// import DynamicRouters from "./DynamicRouters";

Vue.use(VueRouter);

const routes = [
  {//登录路由配置
    path: "/login",
    name: "login",
    //懒加载的方式
    component: () =>import(/* webpackChunkName: "login" */ "../pages/Login")
  }
]


// console.log(routes);

const router = new VueRouter({
  routes
});

export default router;
