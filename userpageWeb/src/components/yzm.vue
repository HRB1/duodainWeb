<template>
  <div class="yzmBox">
    <div class="item" v-for="(item,ind) in max" :key="ind">{{vallist[ind]||text}}</div>
    <input type="text" class="yzmval" :maxlength="max" v-model="yzmval" @keyup="change($event)">
  </div>
</template>
<script>
export default {
  props: {
    max: {
      type: Number,
      default: 6
    },
    getValFn: {
      type: Function,
      default: () => {}
    }
  },
  components: {},
  data() {
    return {
      yzmval: "",//验证码值
      vallist: [],
      text: "-"
    };
  },
  computed: {},
  methods: {
    change(e) {
      if (e.keyCode <= 57 && e.keyCode >= 48) {
        if (this.vallist.length >= 6) {
          return;
        } else {
          this.vallist.push(e.key);
        }
      }
      if (e.keyCode == 8 && this.vallist.length >= 0) {
        this.vallist.pop();
      }
      if (this.vallist.length == this.max) {
        this.getValFn(this.yzmval);
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="scss">
.yzmBox {
  height: 40px;
  margin-top: 35px;
  position: relative;
  display: flex;
  .item {
    width: 40px;
    border: 1px solid #ccc;
    height: 40px;
    flex: 1;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 3px;
    font-size: 18px;
  }
  input {
    opacity: 0;
    height: 40px;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>