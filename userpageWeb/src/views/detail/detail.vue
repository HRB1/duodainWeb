<template>
  <div class="container">
    <myHeader></myHeader>
    <main class="hmain">
      <div class="banner">
        <swiper :options="swiperOption" class="swipers" v-if="curItem.pictures">
          <swiper-slide v-for="(item,ind) in JSON.parse(curItem.pictures)" :key="ind">
            <a>
              <img :src="item">
            </a>
          </swiper-slide>
        </swiper>
      </div>
      <div class="detail_con">
        <div class="detail_price">
          <p class="detail_price_con">
            ￥
            <b>{{curItem.price}}</b>
            <span>￥319.45</span>
          </p>
          <p class="detail_counts">累计销售{{curItem.volume}}份</p>
        </div>
        <div class="detail_title">
          <p class="detail_title_text">{{curItem.name}}</p>
          <p class="share">
            <span class="imgs">
              <img :src="require('../../static/images/fx.png')">
            </span>
            <span class="text">分享好友</span>
          </p>
        </div>
        <p class="surplus">
          <span>剩余{{curItem.volume}}份</span>
        </p>
      </div>
    </main>
    <div class="getShopDetail">
      <div @click="goHome">
        <span class="iconfont icon-shouye"></span>
        <span>首页</span>
      </div>
      <div @click="goCar">
        <span class="iconfont icon-gouwuche"></span>
        <span class="countCar">
          购物车
          <i>{{this.curCar?this.curCar.count:0}}</i>
        </span>
      </div>
      <div class="addCar" @click="addCar">加入购物车</div>
      <div class="byshop">直接购买</div>
    </div>
  </div>
</template>
<script>
import { getAllShops, addShopC, getCarShop } from "@/api/index";
import { swiper, swiperSlide } from "vue-awesome-swiper";//vue插件swiper
export default {
  props: {},
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      curItem: {}, //当前商品
      curCar: {}, //当前商品的购物车信息
      swiperOption: {
        autoplay: {
          delay: 3000, //自动切换的时间间隔,单位ms
          disableOnInteraction: false
        },
        speed: 1000
      }
    };
  },
  computed: {},
  methods: {
    //去首页
    goHome() {
      this.$router.push("/");
    },
    //去购物车
    goCar() {
      this.$router.push("/shopcar");
    },
    //获取当前数据
    getaCurShop() {
      getAllShops().then(res => {
        this.curItem = res.data.find(
          item => item.id == Number(this.$route.query.id)
        );
      });
    },
    //获取用户信息
    getuser() {
      let userInof = window.sessionStorage.getItem("userInfo");
      return userInof ? JSON.parse(userInof).userid : "";
    },
    //获取购物车信息
    async getCarCount() {
      if (this.getuser()) {
        let { data: allShoplist } = await getCarShop({
          user_id: this.getuser() + ""
        });
        this.curCar = allShoplist.find(
          item => this.$route.query.id == item.shopid
        );
      } else {
        return "身份已过期";
      }
    },
    //添加购物车
    async addCar() {
      if (this.getuser()) {
        let res = await addShopC({
          user_id: this.getuser(),
          shop_id: this.curItem.id
        });
        if (res.code) {
          alert("添加成功");
          //获取购物车信息
          await this.getCarCount();
        }
      } else {
        alert("用户未登录");
      }
    }
  },
  async created() {
    //获取当前数据
    this.getaCurShop();
    //获取购物车信息
    await this.getCarCount();
  }
};
</script>
<style scoped lang="scss">
@import "@/static/styles/detail.scss";
</style>