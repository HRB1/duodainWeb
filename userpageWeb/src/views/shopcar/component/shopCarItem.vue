<template>
  <dl @click="goDetail">
    <span class='radio ' :class="{'radioAll':items.checked}" @click.stop="changeCheck">√</span>
    <dt>
      <img :src="items.shopdata.cover">
    </dt>
    <dd>
      <p class="title">{{items.shopdata.name}}</p>
      <p
        class="gg"
      >{{JSON.parse(items.shopdata.specs)[0].key+JSON.parse(items.shopdata.specs)[0].value}}</p>
      <div class="price">
        <p class="price_con">￥{{items.shopdata.price}}</p>
        <p class="count_con">
          <b @click.stop="delCount(items.shopid,items.userid,ind)">-</b>
          <span>{{items.count}}</span>
          <b @click.stop="addCount(items.shopid,items.userid,ind)">+</b>
        </p>
      </div>
    </dd>
  </dl>
</template>
<script>
export default {
  props: {
      items:{
          type:Object,
          default:{}
      },
      ind:{
        type:Number,
        default:0
      }
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
      delCount(shop_id,user_id,ind){
         this.$emit("delCounts",shop_id,user_id,ind)
      },
      addCount(shop_id,user_id,ind){
         this.$emit("addCounts",shop_id,user_id,ind)
      },
      //单选按钮
      changeCheck(){
          this.$emit("checkBox",this.ind);   
      },
      //去详情
      goDetail(){
           this.$router.push({path:"/detail",query:{id:this.items.shopdata.id}}) 
      }
  },
  created() {
  },
  mounted() {},

};
</script>
<style scoped lang="scss">
@import "@/static/styles/shopcar.scss";
</style>