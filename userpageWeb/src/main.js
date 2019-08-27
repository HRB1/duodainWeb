import "./fonts/iconfont.css";
import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store'
import puglins from "./plugins/index"
import "./static/styles/zero.scss"
import "./static/styles/_mixin.scss"
import "swiper/dist/css/swiper.css"

import AMap  from 'vue-amap';
Vue.use(AMap);
Vue.config.productionTip = false
Vue.use(puglins)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')//$mount将虚拟dom转换为真实dom节点
