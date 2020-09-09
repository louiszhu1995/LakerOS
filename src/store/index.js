import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo:JSON.parse( localStorage.getItem("userInfo") )
  },
  mutations: {
    // 设置userInfo对象
    SET_USERINFO(state,payload){
      state.userInfo = payload
    }
  },
  actions: {},
  modules: {}
});
