<template>
    <footer>
         <div class="footer_con" v-for="(item,ind) in list" :key="ind">
            <router-link :to="item.link"><i :class="'iconfont '+item.icon"></i>
             <span >{{item.title}}</span></router-link> 
         </div>
    </footer>
</template>
<script>
export default {
    props:{

    },
    components:{

    },
    data(){
        return {
            inds:0,
            list:[
                {
                    title:"首页",
                    link:"/",
                    icon:"icon-iconhuidaoshouye"
                },
                {
                    title:"分类",
                    link:"/type",
                    icon:"icon-gongzuo"
                },{
                    title:"够物车",
                    link:"/shopcar",
                    icon:"icon-gouwuche"
                },{
                    title:"我的",
                    link:"/myself",
                    icon:"icon-wode"
                }
            ]
        }
    },
    computed:{

    },
    methods:{
    },
    created(){
       
    },
    mounted(){

    }
}
</script>
<style scoped lang="scss">
footer{
    width: 100%;
    height: 50px;;
    border-top:1px solid #ccc;
    display: flex;
    overflow: hidden;
    .footer_con{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        a{
            color: #666;
        }
       i{
           display: block;
           width: 30px;
           height: 30px;;
           text-align: center;
           font-size: 20px;
           line-height: 30px;
           margin: 0 auto;
       }
       .router-link-exact-active{
           color: red;
       }
    }
}
</style>