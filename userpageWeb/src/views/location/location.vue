<template>
  <div class="container">
    <myHeader></myHeader>
    <div class="serachbox">
      <span class="serach_title">
        {{place}}
      </span>
       <b>></b>
      <p>
        <i class="iconfont icon-fangdajing"></i>
        <input type="text" placeholder="输入地址" v-model="val" @input="getdata">
      </p>
    </div>
    <div class="location_nav">
      <div class="curplace">
        <span>定位到当前位置</span>
      </div>
      <div class="serachRes" v-if="serachList.length">
        <dl v-for="(item,key) in serachList" :key="key" @click="goHome(item.district,item.name)">
          <dt>{{item.name}}</dt>
          <dd>{{item.district}}</dd>
        </dl>
      </div>
      <div v-else>
        <div class="error" v-if="!flag">
          <img src="../../static/images/err.png">
        </div>
        <div class="okBox" v-else>
          用户登录状态
          历史记录
        </div>
      </div>
    </div>
    <div class="add_place">
      <p @click="goAdd">新增地址</p>
    </div>
    <div id="container"></div>
  </div>
</template>
<script>
import { getAutoPlugin } from "@/utils/amap.js";
import debounce from "@/utils/debounce";
export default {
  props: {},
  components: {},
  data() {
    return {
      place: "",
      flag: false,
      val: "",
      serach: null,
      serachList: [] //搜索后的结果
    };
  },
  computed: {},
  methods: {
    //跳转添加地址
    goAdd() {
      this.$router.push("/addPlace");
    },
    //回到首页,将修改的地址改变
    goHome(district,placename){
      this.$router.push("/");
      window.sessionStorage.setItem("place",district+placename)
    },
    //根据输入的值查找地址
    getdata() {
      //实现地址搜索功能
      if (this.val !== "") {
        this.serach.search(this.val, (status, result) => {
          switch (status) {
            case "error":
              this.serachList = [];
              break;
            case "complete":
              this.serachList = result.tips;
              break;
          }
        });
      }else{
        this.serachList.length=0;
      }
    }
  },
  created() {
    this.place=window.sessionStorage.getItem('placeAll')?JSON.parse(window.sessionStorage.getItem('placeAll')).addressComponent.province:'';
  },
  async mounted() {
    if (window.sessionStorage.getItem("userInfo")) {
      this.flag = true;
    } else {
      this.flag = false;
    }
    //获取定位信息
    this.serach = await getAutoPlugin("AMap.Autocomplete", {
      city: this.place
    });
  }
};
</script>
<style scoped lang="scss">
@import "@/static/styles/locat.scss";
</style>