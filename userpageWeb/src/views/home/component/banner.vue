<template>
<div class="banner">
  <swiper :options="swiperOption" class="swipers">
    <swiper-slide v-for="(item,ind) in bannerlist" :key="ind">
      <a :href="item.url">
        <img :src="item.image">
      </a>
    </swiper-slide>
  </swiper>
</div>
</template>
<script>
import { banners} from "@/api/index";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components:{
    swiper,
    swiperSlide,
  },
  data() {
    return {
      bannerlist:[],
      curTime: new Date() * 1, //当前时间
      swiperOption: {
        autoplay: {
          delay: 3000, //自动切换的时间间隔,单位ms
          disableOnInteraction: false
        },
        speed: 1000
      }
    };
  },
  created() {
    //轮播图
    banners().then(res => {
      if (res.code) {
        this.bannerlist = res.data.filter(
          item => new Date(item.end_time) * 1 > this.curTime
        );
      }
    });
  },
};
</script>
<style scoped lang="scss">
@import "@/static/styles/home.scss";
</style>