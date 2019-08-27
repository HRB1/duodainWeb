<template>
  <div class="container">
    <myHeader></myHeader>
    <main class="main">
      <h2 class="phoen_title">手机号登录</h2>
      <div class="phone">
        <span>手机号</span>
        <input type="text" v-model="phone_val">
      </div>
      <button :class="['getCode', open?'griy':'']" @click="openFn()">获取验证码</button>
      <div class="loginmask" v-show="open">
        <div class="loginmask_con">
          <h2>请输入验证码</h2>
          <p class="tips">
            <span>
              <b>6</b>位短信验证码已发送至
              <b class="phonen_val">{{phone_val}}</b>
            </span>
          </p>
          <myYzm :max="max" :getValFn="changeFn.bind(this)"/>
          <p class="countDown">
            <span>{{times}}秒后可重新发送</span>
          </p>
          <button class="getCodess" @click="loginFn()">{{title}}</button>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import { login, getCheckcode } from "@/api/index.js";
export default {
  props: {},
  components: {},
  data() {
    return {
      phone_val: "",
      times: 60,
      open: false,
      timer: null,
      max: 6,
      yzmval: "",
      title: "登录"
    };
  },
  computed: {},
  methods: {
    //输入验证码
    openFn() {
      if (this.phone_val !== "") {
        console.log(this.phone_val)
        getCheckcode({
          phone: this.phone_val
        }).then(res => {
            if (res.code == 1) {
              this.open = true;
              this.timeout();
            }
          }).catch((err)=> {
            alert("出现错误啦，请注册");
          });
      }
    },
    //获取yzm
    changeFn(val) {
      this.yzmval = val;
    },
    timeout() {
      window.clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.times--;
        if (this.times == 0) {
          this.title = "重新获取验证码";
          window.clearInterval(this.timer);
          this.times = 60;
        }
      }, 1000);
    },
    //调用登录接口
    loginApi() {
        login({
            phone:this.phone_val,
            checkcode:this.yzmval
        }).then(res=>{
            if(res.code){
                window.sessionStorage.setItem("userInfo",JSON.stringify(res.data));
                this.$router.push("/")
            }
        }).catch(()=>{
          alert("验证码失败")
        })
    },
    //点击登录
    loginFn() {
      if (this.title == "登录") {
         this.loginApi();//登录
      } else {
        this.openFn(); //验证码
        this.timeout();//定时器
        this.title = "登录";
      }
    }
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="scss">
@import "@/static/styles/login.scss";
</style>