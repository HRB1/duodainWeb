<template>

  <div class="container">
    <myHeader></myHeader>
    <div class="type_serach">
      <p>
        <i class="iconfont icon-fangdajing serach"></i>
        <input type="text" placeholder="请输入商品名称">
      </p>
    </div>
    <main class="Tmain" v-if="alltype.length">
      <ul class="shop_con_nav">
        <li
          v-for="(item,key) in alltype"
          :key="key"
          @click="changeType(key,item.id)"
          :class="Pind==key?'nav_active':''"
        >{{item.title}}</li>
      </ul>
      <div class="shop_con_box">
        <div class="shop_con_box_nav">
          <div class="shop_con_box_nav_con">
            <span :class="Cind==-1?'shop_nav_active':''" @click="changeCid(-1,'all')">全部</span>
            <span
              v-for="(item,key) in alltype[Pind].children"
              :key="key"
              @click="changeCid(key,item.id)"
              :class="Cind==key?'shop_nav_active':''"
            >{{item.name}}</span>
          </div>
        </div>
        <div class="shop_con_box_con">
          <template v-if="filterShop.length">
            <myShop
                v-for="(item,key) in filterShop"
                  :key="key"
                 :items="item"
            ></myShop>
          </template>
          <p class="terror" v-else>暂无商品</p>   
        </div>
      </div>
    </main>
    <myFooter></myFooter>
  </div>
</template>
<script>
import { getAllTypes, getFilterShops } from "@/api/index";
export default {
  name:"type",
  props: {},
  components: {},
  data() {
    return {
      Pind: 0,
      flag: false,
      Cind: -1,
      Pid: "", //父类id
      Cid: "all", //子类id
      alltype: [], //所有分类包含子类
      shopList: [], //商品数据,
      filterShop:[],
    };
  },
  computed: {},
  methods: {
    changeType(key, pid) {
      this.Pind = key;
      this.Pid = pid;
      this.getFilterShop(this.Pid);
    },
    //子类改变过滤
    changeCid(key, cid) {
      this.Cind = key;
      this.Cid = cid;
      if(this.Cid=='all'){
          this.filterShop=this.shopList;
      }else{
          this.filterShop= this.shopList.filter(item=>item.category_id == this.Cid)
      }
    },
    //筛选商品
    getFilterShop(type_id, category_id = "all") {
      let obj = {};
      if (category_id == "all") {
        obj.type_id = type_id;
      } else {
        obj.type_id = type_id;
        obj.category_id = category_id;
      }
      getFilterShops(obj).then(res => {
         this.shopList = res.data;
         this.filterShop=this.shopList
      });
    },
    //获取所有分类
    getAllType() {
      getAllTypes().then(res => {
        this.alltype = res.data;
        this.getFilterShop(this.alltype[0].id);
        this.Pid = this.alltype[0].id;
      });
    }
  },
  mounted() {
    this.getAllType();
  }
};
</script>
<style scoped lang="scss">
@import "@/static/styles/type.scss";
</style>