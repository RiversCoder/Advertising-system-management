<template>
    <div class="admin-menu-home">
        <div class="company-info">
            
        </div>
    </div>
</template>


<script>
    
    //import store from '../../store/index'
    import {mapGetters, mapMutations, mapActions} from 'vuex';

    //console.log(store.state.token);
    //console.log(store.state.token)
    export default{
        computed:{
            ...mapGetters([
                'token'
            ])
        },
        created(){
            console.log(this.token)
        }
    }
</script>


<style scoped lang='stylus' rel='stylesheet/stylus'>
    
    @import "~common/stylus/variable" 
    @import "~common/stylus/mixin"
    
    .admin-menu-home
        width:100%;height:100%;
    .company-info
        width:100%;height:100%;background-repeat:no-repeat;background-position:center center;background-size:50%;bg-image('~common/images/DBS.jpg');
</style>