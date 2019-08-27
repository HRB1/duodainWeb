<template>
  <div class="container">
    <myHeader></myHeader>
    <main class="hmain">
      <template v-if="userInfo">
        <div class="shop_con" v-if="shoplist.length">
          <!-- 购物车商品 -->
          <slideRemove v-for="(item,key) in shoplist" :key="key" @delshopItem="deleteshop(item)">
            <shopCarItem
              :items="item"
              @delCounts="delCountt"
              :ind="key"
              @addCounts="addCount"
              @checkBox="checkBox"
            ></shopCarItem>
          </slideRemove>
        </div>
         <div class="shopErr" v-else>
            您的购物车是空的<br/>请加入商品
         </div>
      </template>
      <template v-else>
        <div class="shopErr">
          您还没有登录无法查看购物车
          <p>
            <router-link to="/login">请登录></router-link>
          </p>
        </div>
      </template>
    </main>
    <div class="allPrice">
      <p>
        <span class="radio" :class="{'radioAll':allchecked}" @click="allcheck">√</span>
        <b>全选</b>
      </p>
      <span class="price">
        合计￥
        <b>{{allPrice}}</b>
      </span>
      <span class="gobuy">
        去结算
        <b>({{allcount}})</b>
      </span>
    </div>
    <myFooter></myFooter>
  </div>
</template>
<script>
import { delShopC, addShopC, deleteshops } from "@/api/index";
import slideRemove from "@/components/slideRemove";
import shopCarItem from "./component/shopCarItem";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
export default {
  name: "shop",
  props: {},
  components: {
    slideRemove,
    shopCarItem
  },
  data() {
    return {
      userInfo: window.sessionStorage.getItem("userInfo"),
      open: true
    };
  },
  computed: {
    ...mapState("shopcar", ["shoplist", "allPrice", "allcount", "allchecked"])
  },
  methods: {
    //获取购物车商品
    ...mapActions("shopcar", ["getAllshop"]),
    ...mapMutations("shopcar", ["allP", "allC", "allcheckfn"]),
    //减数量
    async delCountt(shop_id, user_id, ind) {
      if (open) {
        this.open = false;
        if (this.shoplist[ind].count > 1) {
          await delShopC({ shop_id, user_id });
          this.open = true;
          await this.getallfn();
        }
      }
    },
    async getallfn() {
      await this.getAllshop();
      await this.allP();
      await this.allC();
    },
    //加数量
    async addCount(shop_id, user_id, ind) {
      if (open) {
        this.open = false;
        await addShopC({ shop_id, user_id });
        this.open = true;
        await this.getallfn();
      }
    },
    //修改状态
    async checkBox(ind) {
      this.shoplist[ind].checked = !this.shoplist[ind].checked;
      await this.getallfn();
    },
    //删除商品
    async deleteshop(item) {
      let { shopid, userid } = item;
      await deleteshops({ shop_id: shopid,user_id: userid});
      await this.getallfn();
    },
    //点击全选
    async allcheck() {
      await this.allcheckfn();
      await this.getallfn();
    }
  },
  async created() {
    //获取购物车商品
    await this.getallfn();
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
@import "@/static/styles/shopcar.scss";
</style>