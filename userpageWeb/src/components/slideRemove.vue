<template>
  <div class="shop_car_item" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
    <div class="shopitem_con" :style="{
        transform:` translateX(${-60-movex}px)`
    }">
      <slot></slot>
    </div>
    <span class="remove_btn" :style="{
        right:`${movex}px`
    }" @click="delshop">删除</span>
  </div>
</template>
<script>
export default {
  props: {
  },
  components: {},
  data() {
    return {
      startx: 0,
      starty: 0,
      movex: -60,
      movey: 0,
      curx: 0,
      cury: 0
    };
  },
  computed: {},
  methods: {
    touchstart(e) {
      let { clientX, clientY } = e.touches[0];
      this.startx = clientX;
      this.starty = clientY;
    },
    touchmove(e) {
      let { clientX, clientY } = e.touches[0];
      this.curx = clientX ;
      this.cury = clientY;
    },
    touchend() {
       if(this.cury-this.starty>10){
          return;
       }
       if(this.cury-this.starty<-10){
          return;
       }
       if(this.curx-this.startx>10){
           this.movex=-60;
       }
       if(this.curx-this.startx<-10){
           this.movex=0;
       }
    },
    delshop(){
        this.$emit("delshopItem")
        this.movex=-60;;
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="scss">
.shop_car_item {
  width: 100%;
  height: 120px;
  position: relative;
 overflow: hidden;

}
.shopitem_con {
  width: 100%;
  height: 100%;
  transition: transform 0.2s;

}
.remove_btn {
  width: 60px;
  color: #fff;
  height:150px;
  background: red;
  text-align: center;
  line-height: 120px;
  display: inline-block;
  position: absolute;
  right: -60px;
  top: 0;
  transition: right 0.2s;
}
</style>