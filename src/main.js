import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import bus from "./utils/bus";
Vue.prototype.$bus = bus;
// 引入element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 引入全局样式
import "./assets/styles/common.css"; //公共样式
import "./assets/styles/el-reset.css"; //用于重设element-ui样式
import "./assets/iconfont/iconfont.css"; //引入iconfont
Vue.use(ElementUI);

// 引入鉴权方法
import has from "./utils/has";
Vue.prototype.$has = has;//将鉴权方法绑定到vue原型上，方便其他鉴权功能
// Vue.config.productionTip = false;

// 定义全局自定义指令,判断是否具有
Vue.directive("haspermission",{
  bind(el,binding,VNode){
    let buttons = localStorage.getItem("permission-buttons")
   if(!has(buttons,binding.value) ){
    //  禁用按钮
    let className = el.className;
    el.className = className+ " " + "is-disabled"
    el.disabled = true;
   }
  }
})

// 拦截器,进入页面前都会被先挡住
// 判断token有没有：有token就放行，没有就跳转到登录页

// beforeEach全局前置钩子处理(路由守卫)
router.beforeEach((to, from, next) => {
  // 如果访问登录页，则放行
  if (to.path === "/login") {
    next();
  } else {
    //访问其他页面则判断是否是
    let token = localStorage.getItem("lol-token");
    if (token) {
      // 用户需要进入页面
      // 哦按段vuex中的sideMenu是否有值
      if (!store.state.sideMenu.length) {
        store.dispatch("FETCH_MENULIST").then(() => {
          next({ path: to.path });
        });
      }
      next();
    } else {
      //跳转到登陆页
      next({ path: "/login" });
    }
  }
});
// afterEach全局后置钩子(路由守卫)
router.afterEach( (to,from)=>{
  console.log(to);
  // console.log(from);
  store.commit("SET_CRUMB",to.matched)
} )
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
