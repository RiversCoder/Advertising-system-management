<template>
      
      <!--文件夹区域-->
        <div id="item-drag-box-wrap">
          <div class="item-drag-box" v-for="(item,index) in sources" >
             <dl class="cc-item">
                 <dt class="cc-item-previewbox">
                       <span class="vcip-img">
                           <img :src="item.img" />
                       </span>
                       <span :class="item.fileType == '1' ? 'vcip-icon' : 'vcip-icon icip-icon' "></span>
                       <span class="vcip-name">{{item.name}}</span>
                 </dt>
                 <span class="maskImg"></span>
             </dl>
           </div>
       </div>
      

       <!-- <div v-if="imageExist">
         <h3 class="column-title">图片</h3>
         <div class="column-content" >
             <dl class="cc-item" v-for="(item,index) in imageSources" >
                 <dt class="cc-item-previewbox">
                       <span class="vcip-img">
                           <img :src="item.src" />
                       </span>
                       <span class="vcip-icon icip-icon"></span>
                       <span class="vcip-name">{{item.name}}</span>
                 </dt>
                 <span class="maskImg" @click="selectFn2($event,item.id)"></span>
             </dl>
         </div>
       </div> -->

</template>




<script type="text/ecmascript-6">
    
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import tool from 'common/js/tool'


    export default{
        data(){
            return{
               isExist: true,
               sourcess:[]
            }
        },
        props: {
          sources:{
            type:Array,
            default:function(){
              return [];
            }
          }
        },
        methods:{
          ...mapMutations({
            setSelect:'select'
          })
        },
        computed:{
          ...mapGetters(['results'])
        },
        mounted(){

        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

    @import "~common/stylus/variable" 
    @import "~common/stylus/mixin"
    
        
        .item-drag-box
            wh(238px,135px);position:absolute;left:0;top:0;transition:1s ease;overflow:hidden;  
        .cc-item
            wh(238px,135px);position:relative;box-sizing:border-box;border:1px solid #DEDEDE;border-radius:10px;cursor:pointer;
            
            .cc-item-previewbox
                wh(236px,135px);position:relative;box-sizing:border-box;
                
                /* 已经存在的文件夹 */
                .cip-icon
                    wh(32px,28px);bgImg('~common/images/source/folder_copy.png');abcenterX(50%,59px,-16px);
                .cip-name
                    wh(100%,16px);hh(16px);font-weight:bold;color:#fff;font-size:16px;abcenterX(0,59px,0);text-align:center;
                .cip-img
                    wh(236px,135px);border-radius:10px;
                
                /* 视频 */
                .vcip-icon
                    wh(20px,19px);bgImg('~common/images/source/video@2x.png');ab(14px,105px);
                .vcip-name
                    wh(100%,16px);hh(16px);ab(40px,106px);text-align:left;font-size:16px;color:#fff;
                .vcip-img
                    wh(100%,100%);ab(0,0);
                    img
                      wh(100%,100%);border-radius:10px;             
                
                /* 图片 */
                  
                .icip-icon
                    wh(19px,19px);bgImg('~common/images/source/img@2x.png');
          .maskImg
            display:block;wh(238px,135px);box-sizing:border-box;border-radius:10px;border:4px solid #5E8CEE;bgColor(#fff);opacity:0;ab(0,0);
        .cactive
            .maskImg
              opacity:0.7;
            .cc-item-previewbox
              .cip-name
                color:#333;
                    
                    
</style>