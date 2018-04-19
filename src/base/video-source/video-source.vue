<template>
   <div class="con-container">
      <div class="Column">
          <h3 class="column-title">视频</h3>
          <div class="column-content">
                
                <dl class="cc-item" v-for="(item,index) in videos" >
                      
                      <dt class="cc-item-previewbox">
                          <span class="cip-img">
                              <img :src="item.src" />
                          </span>
                          <span class="cip-icon"></span>
                          <span class="cip-name">{{item.name}}</span>
                      </dt>
                      
                      <dd class="cc-item-textbox">
                          <ul class="citms">
                              <li class="cit cit1">重命名</li>
                              <li class="cit cit2">移动文件</li>
                              <li class="cit cit3">删除</li>
                          </ul>
                      </dd>

                      <!-- 遮罩 -->
                      <div class="cc-con-box" v-show="false"></div>
                </dl>
             
          </div>
      </div>
    </div>
</template>


<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                
            }
        },
        props: {
          videos: {
            type: Array,
            default: function(){
                return []
            }
          }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

    @import "~common/stylus/variable" 
    @import "~common/stylus/mixin"
    
    .con-container
            width:100%;box-sizing:border-box;height:auto;background:#fff;padding-bottom:30px;
            
    .Column
        width:100%;height:auto;initp();
        
        .column-title
            font-size:20px;color:#666;hh(70px);text-indent:28px;position:relative;
            &:before
                content:'';@extend .block;wh(9px,24px);bgColor(#ED1C24);position:absolute;left:0px;top:23px;
        
        .column-content
            wh(100%,auto); display:-webkit-flex;display:flex;-webkit-justify-content:flex-start;justify-content:flex-start;-webkit-flex-wrap: wrap;flex-wrap: wrap;
            
            .cc-con-box
               wh(236px,182px);border-radius:6px 6px 0 0;background:red;ab(0,0);bgColor(rgba(237,28,36,0.2));
               
            .cc-item
                wh(238px,184px);box-sizing:border-box;border:1px solid #DEDEDE;border-radius:6px 6px 0 0;margin-top:30px;position:relative;z-index:100;margin-left:8px;
                
                .cc-item-previewbox
                    wh(236px,135px);position:relative;background:#F4F4F4;box-sizing:border-box;border-bottom:1px solid #DEDEDE;
                    
                    .cip-icon
                        wh(20px,19px);bgImg('~common/images/source/video@2x.png');ab(14px,105px);
                    
                    .cip-name
                        wh(100%,16px);hh(16px);ab(40px,106px);text-align:left;font-size:16px;color:#fff;
                    .cip-img
                        wh(100%,100%);ab(0,0);
                        img
                          wh(100%,100%);border-radius:6px 6px 0 0;       

                .cc-item-textbox
                    wh(236px,47px);bgColor(#fff);box-sizing:border-box;
                    .cit
                        float:left;width:33.3%;font-size:14px;color:#333;text-align:center;cursor:pointer;line-height:47px;text-indent:20px;position:relative;
                        &:before
                            content:'';display:block;wh(14px,15px);ab(8px,14px);
                    .cit1
                        &:before    
                            bgImg('~common/images/source/edit@2x.png');ab(8px,16px);
                    .cit2
                        &:before    
                            bgImg('~common/images/source/move@2x.png');ab(3px,16px);    
                    
                    .cit3
                        &:before    
                            bgImg('~common/images/source/delete@2x.png');ab(14px,16px);
</style>