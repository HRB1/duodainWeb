import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta:{
         title:"多点超市"
      },
      component: ()=>import("../views/home/home.vue")
    },
    
    {
      path: '/login',
      name: 'login',
      meta:{
        title:"多点超市"
     },
      component: ()=>import("../views/login/login.vue")
    },
    {
      path: '/register',
      name: 'register',
      meta:{
        title:"多点超市"
      },
      component: () => import("../views/login/register.vue")
    },
    {
      path: '/type',
      name: 'type',
      meta:{
        title:"分类"
      },
      component: () => import("../views/types/type.vue")
    },{
      path: '/shopcar',
      name: 'shopcar',
      meta:{
        title:"购物车"
      },
      component: () => import("../views/shopcar/shopcar.vue")
    },{
      path: '/myself',
      name: 'myself',
      meta:{
        title:"多点超市"
      },
      component: () => import("../views/myself/myself.vue")
    },{
      path: '/locat',
      name: 'locat',
      meta:{
        title:"多点超市"
      },
      component: () => import("../views/location/location.vue")
    },{
      path: '/serach',
      name: 'serach',
      meta:{
        title:"多点超市"
      },
      component: () => import("../views/serach/serach.vue")
    },{
      path: '/addPlace',
      name: 'addPlace',
      meta:{
        title:"多点超市"
      },
      component: () => import("../views/addPlace/addPlace.vue")
    },{
      path: '/detail',
      name: 'detail',
      meta:{
        title:"商品详情"
      },
      component: () => import("../views/detail/detail.vue")
    }
  ]
})
