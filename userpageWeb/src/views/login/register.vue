<template>
    <div class="container">
        注册
        <myYzm :max="6" :getValFn="fun.bind(this)"></myYzm>
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

        }
    },
    computed:{

    },
    methods:{
        fun(val){
            console.log(val)
        }
    },
    created(){

    },
    mounted(){

    }
}
</script>
<style scoped lang="">

</style>