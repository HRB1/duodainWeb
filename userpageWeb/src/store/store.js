import Vue from 'vue'
import Vuex from 'vuex'
import user from "./module/user/user";
import shopcar from "./module/shopcar/shopcar";
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    // comstates,//公共状态
    user,
    shopcar
  },
  
})
