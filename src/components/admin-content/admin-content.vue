<template>
     <div class="admin-content-container">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
     </div>
</template>


<script>
    
    import AdminMenu from 'components/admin-menu/admin-menu'

    export default{
        components:{
            
        }
    }

</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
    
    @import '~common/stylus/variable'
    @import "~common/stylus/mixin"
    
    .admin-content-container
       height:100%;position:absolute;right:0;top:0;left:$menuwidth;bottom:0;background:#fff;
       font-size:30px;box-sizing:border-box;
</style>