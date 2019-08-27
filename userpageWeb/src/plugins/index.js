export default {
    install(Vue){
        Vue.component("myHeader",()=>import("../components/headers.vue"))
        Vue.component("myFooter",()=>import("../components/footers.vue"))
        Vue.component("myYzm",()=>import("../components/yzm.vue"))
        Vue.component("myShop",()=>import("../components/shopItem.vue"))
    }
}