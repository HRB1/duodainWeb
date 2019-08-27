<template>
      <div class="list_type">
          <dl class="list_type_Item" v-for="(item,ind) in list_type" :key="ind">
            <dt>{{item.imgtit}}</dt>
            <dd>{{item.title}}</dd>
          </dl>
        </div>
</template>
<script>
export default {
    props:{

    },
    components:{

    },
    data(){
        return {
             //分类
      list_type: [
        {
          title: "蔬菜每日先",
          imgtit: "狂",
          type_id: 0
        },
        {
          title: "肉单禽",
          imgtit: "欢",
          type_id: 1
        },
        {
          title: "母婴天地",
          imgtit: "倒",
          type_id: 2
        },
        {
          title: "进店必买",
          imgtit: "计",
          type_id: 3
        },
        {
          title: "美卡通",
          imgtit: "时",
          type_id: 4
        },
        {
          title: "早完事",
          imgtit: "超",
          type_id: 5
        },
        {
          title: "品牌会",
          imgtit: "值",
          type_id: 6
        },
        {
          title: "领卷中心",
          imgtit: "不",
          type_id: 7
        },
        {
          title: "支付优惠",
          imgtit: "停",
          type_id: 8
        },
        {
          title: "直采品牌",
          imgtit: "歇",
          type_id: 9
        }
      ],
        }
    },
    computed:{

    },
    methods:{

    },
    created(){

    },
    mounted(){

    }
}
</script>
<style scoped lang="scss">
@import "@/static/styles/home.scss";
</style>