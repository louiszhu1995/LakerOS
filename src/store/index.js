import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { getMenuList } from "@/api";
import recursionRouter from "../utils/recursionRouter";
import allRouters from "../router/allRouters";
import DynamicRouters from "../router/DynamicRouters.js";
import router from "../router"


export default new Vuex.Store({
  state: {
    userInfo:JSON.parse( localStorage.getItem("userInfo") ),
    sideMenu:[],
    // dialogVisible:false,//控制dialog弹出框显示或者隐藏
    // dialog数据源
  },
  mutations: {
    // 设置userInfo对象
    SET_USERINFO(state,payload){
      state.userInfo = payload
    },
    // 设置侧边菜单栏数据
    SET_SIDEMENU(state,payload){
      // console.log(payload);
      state.sideMenu = payload
      // 找出DynamicRouters中路径是 "/"的对象 将用户路由添加给当前children
      let target =DynamicRouters.find(item=> item.path === "/")
      target.children = [...payload];
      // console.log(target);
      // 将路由配置 通过动态的方式加入到routers中，用addRoutes()
      // console.log(DynamicRouters);
      // console.log(router.addRoutes);
      router.addRoutes([...DynamicRouters])
    },
    CHANGE_DIALOG_VISIBLE(state){
      state.dialogVisible = !state.dialogVisible
    },
    SET_STUFORM(state,payload){
      state.stuForm = payload
    }
  },
  actions: {
    // 请求侧边菜单数据
    async FETCH_MENULIST({ commit }){
      let res = await getMenuList()
      console.log(res);
      if(res && res.data){//防止出现空指针
        // 进行计算得出用户菜单
        let menuList =res.data.menuList
        let userMenu = recursionRouter(allRouters,menuList)//得出用户拥有那些路由
        console.log(userMenu);
        commit("SET_SIDEMENU",userMenu)
      }
    }
  },
  modules: {}
});
