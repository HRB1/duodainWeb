<template>
  <dl class='shop_items' @click="goDetail">
    <dt>
      <img :src="items.cover">
    </dt>
    <dd>
      <div class="shop_item_xx">
        <p class="title">{{items.name}}</p>
        <p class="desc">描述</p>
        <p class="bq">
          <span>自营</span>
          <span>自营</span>
        </p>
        <p class="price">
          <b>￥{{items.price}}</b>
          <span>￥99.5</span>
        </p>
      </div> 
      <p class="gshopbtn" @click.stop="addCar">
        <span class="iconfont icon-gouwuche"></span>
      </p>
    </dd>
  </dl>
</template>
<script>
import {addShopC} from "@/api/index";
export default {
  props:{
    items:{
      type:Object
    }
  },
  components: {},
  data() {
    return {
        ind:-1,
        userids:""
    };
  },
  computed: {},
  methods: {
    //添加购物车
      addCar(){
          let userids=window.sessionStorage.getItem("userInfo")
          let userId=userids?JSON.parse(userids).userid:"";
          if(userId){
             addShopC({
               user_id:userId,
               shop_id:this.items.id
             }).then(res=>{
                // console.log(res);
             })
          }else{
             alert("用户未登录")
          }
      },
      //跳转详情
      goDetail(){
        this.$router.push({path:"/detail",query:{id:this.items.id}})
      }
  },
};
</script>
<style scoped lang="scss">
@import "@/static/styles/shopItem.scss";
</style>