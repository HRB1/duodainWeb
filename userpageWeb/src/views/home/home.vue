<template>
  <div class="container">
    <template v-if="locatVal">
      <myHeader></myHeader>
      <div class="location" @click="golocal">
        <span class="placetitle">
          <i class="iconfont icon-dingwei1"></i>
          配送至:{{locatVal}}
        </span>
        <span class="iconfont icon-fangdajing" @click.stop="goSerach"></span>
      </div>
      <main class="hmain" ref="mainboxs">
        <div class="hmain_con">
          <!-- 轮播图 -->
          <myBanner/>
          <!-- 分类 -->
          <listType/>
          <div class="mryx">
            <p>
              <img src="../../static/images/mb.png">
              <span>大家都在买</span>
            </p>
            <div class="mryx_item">
              <a href="#" v-for="(item,ind) in m_list" :key="ind">
                <img :src="require('../../static/images/'+item.url)">
              </a>
            </div>
          </div>
          <div class="type_nav">
            <span
              v-for="(item,ind) in type_nav"
              :key="ind"
              :class="inds==ind&&'active'"
            >{{item.title}}</span>
          </div>
          <div class="shopbox">
            <myShop
              v-for="(item,key) in shoplist"
              :category_id="item.category_id"
              :name="item.name"
              :cover="item.cover"
              :price="item.price"
              :stock="item.stock"
              :volume="item.volume"
              :type_id="item.type_id"
              :detail="item.detail"
              :key="key"
              :inds="key"
              :id="item.id"
              :items="item"
            ></myShop>
            <div
              v-show="flag"
              style="height:30px;background:#eee;text-align:center;line-height:30px"
            >正在加载...</div>
          </div>
        </div>
      </main>
      <div id="iCenter"></div>
      <myFooter></myFooter>
    </template>
    <template v-else>
      <img src="../../static/images/place-load.png" width="100%" height="100%">
    </template>
  </div>
</template>
<script>
import { allshop } from "@/api/index";
import myBanner from "./component/banner";
import scrollLoad from "@/mixin/scrollLoad";
import listType from "./component/listType";
export default {
  name: "home",
  props: {},
  components: {
    myBanner,
    listType
  },
  data() {
    return {
      flag: true,
      inds: 0,
      locatVal: window.sessionStorage.getItem("place"),
      //每日
      m_list: [
        {
          url: "m1.png"
        },
        {
          url: "m2.png"
        },
        {
          url: "m3.png"
        }
      ],
      type_nav: [
        {
          title: "薪金宝款",
          id: 0
        },
        {
          title: "每日必强",
          id: 1
        },
        {
          title: "水果",
          id: 2
        },
        {
          title: "蔬菜",
          id: 3
        },
        {
          title: "肉蛋",
          id: 4
        },
        {
          title: "零食",
          id: 5
        }
      ],
      pageid: 0, //页数
      limit: 10, //条数
      shoplist: [], //商品数组
      maxpage: 2
    };
  },
  computed: {},
  //混合合并逻辑合并，mixin/scrollLoad.js合并逻辑
  mixins: [scrollLoad],
  methods: {
    //跳转到地址
    golocal() {
      this.$router.push({ path: "/locat" });
    },
    //获取所有商品
    getall() {
      allshop({
        pageid: this.pageid,
        limit: this.limit
      }).then(res => {
        this.shoplist = res.data;
      });
    },
    goSerach() {
      this.$router.push("/serach");
    },
    //上拉加载
    getScroll() {
      if (this.pageid <= this.maxpage) {
        this.pageid++;
        allshop({
          pageid: this.pageid,
          limit: this.limit
        }).then(res => {
          this.flag = false;
          this.shoplist = this.shoplist.concat(res.data);
        });
      }
    }
  },
  created() {
    //获取所有商品
    this.getall();
  },
  //到首页后还是以前的滚动条位置keep-alive
  activated() {
    if (this.$refs.mainboxs) {
      this.$refs.mainboxs.scrollTop = this.Top;
    }
    this.locatVal = window.sessionStorage.getItem("place");
  },
  mounted() {
    this.scrollFn(this.$refs.mainboxs);
    let mapObj = new AMap.Map("iCenter");
    mapObj.plugin("AMap.Geolocation", () => {
      let geolocation = new AMap.Geolocation();
      geolocation.isSupported(false);
      //获取用户详细地址(定位)
      if (!window.sessionStorage.getItem("place")) {
        geolocation.getCurrentPosition((status, result) => {
          if (
            status === "complete" &&
            result.formattedAddress !== "undefined"
          ) {
            this.locatVal = result.formattedAddress;
            window.sessionStorage.setItem("place", result.formattedAddress);
            window.sessionStorage.setItem("placeAll", JSON.stringify(result));
          }
        });
      }
    });
  }
};
</script>
<style scoped lang="scss">
@import "@/static/styles/home.scss";
</style>