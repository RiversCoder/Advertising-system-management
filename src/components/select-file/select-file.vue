<template>
   <div class="con-container">
       
   </div>
</template>




<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                titles: '图片',
                listType: 'image',
                videoDatas: [],
                showMask: true
            }
        },
        props: {
          sources: {
            type: Array,
            default: function(){
                return []
            }
          },
          title:{
            type: String,
            default: ''
          },
          ctype:{
            type: String,
            default: ''
          }
        },
        methods:{
          selectFn(index){
            var items = document.querySelectorAll('.cc-item');
            items[index].classList.toggle('cactive');
          }
        },
        mounted(){

        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

    @import "~common/stylus/variable" 
    @import "~common/stylus/mixin"                    
                    
</style>