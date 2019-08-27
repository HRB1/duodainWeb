<template>
  <div class="container">
    <myHeader></myHeader>
    <main class="Mmain">
      <div class="user_box">
        <div class="user_box_con" v-if="userInfo">
          <div class="user_xx">
              <p class="username">{{userInfo.nickname}}</p>
              <p class="des">描述</p>
          </div>
          <img :src="'http://127.0.0.1:7002'+userInfo.avatar">
        </div>
        <div class='user_box_con' v-else>
            <router-link to="/login">未登录，点击登录</router-link>
        </div>
      </div>
      <div class="my_order">
         <p>
           <span>我的订单</span>
           <router-link to="/allOder">查看全部></router-link>
         </p>
      </div>
      <div class="my_list"></div>
    </main>
    <myFooter></myFooter>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      userInfo:null
    };
  },
  computed: {},
  methods: {},
  created() {
    this.userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

}
.Mmain {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #f8f8f8;
  flex: 1;
  .user_box{
      width: 100%;
      height: 100px;
      background: red;
      color: #fff;
     .user_box_con{
         display: flex;
         justify-content:space-between;
         padding: 0 20px;
         .username{
             font-size: 20px;
             margin: 10px 0;
         }
         .des{
             width: 200px;
             text-overflow: ellipsis;
             white-space: nowrap;
             overflow: hidden;
         }
         img{
             width: 40px;
             height: 40px;
             margin-top: 25px;
         }
         a{
             text-decoration: none;
             margin-top: 20px;
             color: #fff;
         }
     }
  }
  .my_order{
     width: 335px;
     height: 150px;
     border-radius: 10px;
     background: #fff;
     position: absolute;
     box-shadow: 0px 3px 10px 2px #ccc;
     top:20%;
     left: 50%;;
     margin-left: -167.5px;     
  }
}
footer {
  width: 100%;
  height: 50px;
  border-top: 1px solid #ccc;
  display: flex;
  .footer_con {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    i {
      display: block;
      width: 30px;
      height: 30px;
      background: red;
    }
  }
}
</style>