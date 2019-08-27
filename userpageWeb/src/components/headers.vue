<template>
    <header class="header">
         <span>{{this.$route.meta.title}}</span>
    </header> 
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

    },
    created(){

    },
    mounted(){
        
    }
}
</script>
<style scoped lang="scss">
.header{
    width: 100%;
    height: 50px;;
    padding-top:10px;
    @include display_flex(center,center);
    span{
        font-size: 18px;
    }
}
</style>