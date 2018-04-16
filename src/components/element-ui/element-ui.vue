<template>
    <div class="containers">
        <div class="admin-b">
            <admin-menu></admin-menu>
            <admin-content></admin-content>
        </div>
    </div>
</template>

<script>
    
   import AdminHeader from 'components/admin-header/admin-header'
   import AdminMenu from 'components/admin-menu/admin-menu'
   import AdminContent from 'components/admin-content/admin-content' 

   export default{
    data(){
        return {
            fullscreenLoading:false
        }
    },
    props:{

    },
    methods:{
        openFullScreen(){
            this.fullscreenLoading = true;

            setTimeout(()=>{
                this.fullscreenLoading = false;
            },1000);
        },
        openFullScreen2(){
            const loading = this.$loading({
                lock: true,
                text: 'Please wait for a minute …',
                spainner: 'el-icon-loading',
                background: 'rgba(0,0,0,0.5)'
            })

            setTimeout(()=>{
                loading.close();
            },1000)
        }
    },
    mounted(){

    },
    components:{
        AdminHeader,
        AdminMenu,
        AdminContent
    }
   } 
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/basic"
    
    .containers
        width:100%;height:100%;position:relative;
    
    

</style>