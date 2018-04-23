<template>
   <div class="con-container">
      <div class="Column">
         
         <!--文件夹区域-->
         <div v-if="folderExist">
            <h3 class="column-title" v-show="showFolderTitle">文件夹</h3>
            <div class="column-content" >
                <dl class="cc-item" v-for="(item,index) in folderSources" :data-id="item.id">
                    <dt class="cc-item-previewbox cc-item-folder-previewbox">
                        <span class="cip-name">{{item.name}}</span>
                    </dt>
                    <span class="maskImg" ></span>
                </dl>
            </div>
          </div>
         
        
        <!--视频区域-->
         <div v-if="videoExist">
           <h3 class="column-title">视频</h3>
           <div class="column-content" >
               <dl class="cc-item" v-for="(item,index) in videoSources" :data-id="item.id">
                   <dt class="cc-item-previewbox">
                         <span class="vcip-img">
                             <img :src="item.img" />
                         </span>
                         <span class="vcip-icon"></span>
                         <span class="vcip-name">{{item.name}}</span>
                   </dt>
                   <span class="maskImg" @click="selectFn1($event,item.id)"></span>
               </dl>
           </div>
         </div>
         

         <!--图片区域-->
         <div v-if="imageExist">
           <h3 class="column-title">图片</h3>
           <div class="column-content" >
               <dl class="cc-item" v-for="(item,index) in imageSources" :data-id="item.id">
                   <dt class="cc-item-previewbox">
                         <span class="vcip-img">
                             <img :src="item.img" />
                         </span>
                         <span class="vcip-icon icip-icon"></span>
                         <span class="vcip-name">{{item.name}}</span>
                   </dt>
                   <span class="maskImg" @click="selectFn2($event,item.id)"></span>
               </dl>
           </div>
         </div>

      </div>
    </div>
</template>




<script type="text/ecmascript-6">
    
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import tool from 'common/js/tool'

    export default{
        data(){
            return{
                titles: '图片',
                listType: 'image',
                videoDatas: [],
                recordVideoId: [],
                recordImageId: [],
                showMask: true
            }
        },
        props: {
          showFolderTitle:{
            type: Boolean,
            default: false
          },
          imageExist:{
            type: Boolean,
            default: false
          },
          folderExist:{
            type: Boolean,
            default: false
          },
          videoExist:{
            type: Boolean,
            default: false
          },
          imageSources: {
            type: Array,
            default: function(){
                return []
            }
          },
          folderSources: {
            type: Array,
            default: function(){
                return []
            }
          },
          videoSources: {
            type: Array,
            default: function(){
                return []
            }
          }
        },
        initSelects(){
          //初始化已经被选中的资源数据
          //this.recordVideoId = tool.getSelect(item,'cactive',id,this.recordVideoId);
         // this.recordImageId = tool.getSelect(item,'cactive',id,this.recordImageId);
        },
        methods:{
          selectFn1(ev,id){
            var item = ev.srcElement;
            this.recordVideoId = tool.getSelect(item,'cactive',id,this.recordVideoId);
            this.$emit('select1',this.recordVideoId);
          },
          selectFn2(ev,id){
            var item = ev.srcElement;
            this.recordImageId = tool.getSelect(item,'cactive',id,this.recordImageId);
            this.$emit('select2',this.recordImageId);
          },
          ...mapMutations({
            setSelect:'select'
          })
        },
        computed:{
          ...mapGetters(['results'])
        },
        mounted(){
          //console.log(this.imageSources)
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

    @import "~common/stylus/variable" 
    @import "~common/stylus/mixin"
    
    .con-container
            width:100%;box-sizing:border-box;background:#fff;padding-bottom:30px;
    .Column
        width:100%;height:auto;initp();
        
        .column-title
            font-size:20px;color:#666;hh(70px);text-indent:28px;position:relative;
            &:before
                content:'';@extend .block;wh(9px,24px);bgColor(#ED1C24);position:absolute;left:0px;top:23px;
        
        .column-content
            wh(100%,auto); display:-webkit-flex;display:flex;-webkit-justify-content:flex-start;justify-content:flex-start;-webkit-flex-wrap: wrap;flex-wrap: wrap;
            
            .cc-item
                wh(238px,135px);position:relative;box-sizing:border-box;border:1px solid #DEDEDE;border-radius:10px;margin-top:30px;margin-left:8px;cursor:pointer;
                
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
                .cc-item-folder-previewbox
                    bgColor(#dedede);border-radius:10px;     
                          
              .maskImg
                display:block;wh(238px,135px);box-sizing:border-box;border-radius:10px;border:4px solid #5E8CEE;bgColor(#fff);opacity:0;ab(0,0);
            .cactive
                .maskImg
                  opacity:0.7;
                .cc-item-previewbox
                  .cip-name
                    color:#333;
                    
                    
</style>