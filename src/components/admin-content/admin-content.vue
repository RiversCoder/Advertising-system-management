<template>
     <div class="admin-content-container">
         <router-view></router-view>
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
    
    .admin-content-container
       height:100%;position:absolute;right:0;top:0;left:241px;bottom:0;background:#fff;
       font-size:30px;box-sizing:border-box;
</style>