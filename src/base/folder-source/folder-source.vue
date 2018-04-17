<template>
   <div class="con-container">
      <div class="Column">
          <h3 class="column-title">文件夹</h3>
          <div class="column-content">
              <dl class="cc-item" v-for="(item,index) in sources" >
                  <dt class="cc-item-previewbox">
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
              </dl>
          </div>
      </div>
    </div>
</template>

<!--
<div class="con-container">
  <div class="Column">
      <h3 class="column-title">文件夹</h3>
      <div class="column-content">
          <dl class="cc-item">
              <dt class="cc-item-previewbox">
                  <span class="cip-icon"></span>
                  <span class="cip-name">文件夹</span>
              </dt>
              <dd class="cc-item-textbox">
                  <ul class="citms">
                      <li class="cit cit1">重命名</li>
                      <li class="cit cit2">移动文件</li>
                      <li class="cit cit3">删除</li>
                  </ul>
              </dd>
          </dl>
      </div>
  </div>
</div>
-->


<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                
            }
        },
        props: {
          sources: {
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
            width:100%;box-sizing:border-box;background:#fff;padding-bottom:30px;
    .Column
        width:100%;height:auto;initp();
        
        .column-title
            font-size:20px;color:#666;hh(70px);text-indent:28px;position:relative;
            &:before
                content:'';@extend .block;wh(9px,24px);bgColor(#ED1C24);position:absolute;left:0px;top:23px;
        
        .column-content
            wh(100%,auto); display:-webkit-flex;display:flex;-webkit-justify-content:space-between;justify-content:space-between;-webkit-flex-wrap: wrap;flex-wrap: wrap;
            
            .cc-item
                wh(238px,184px);box-sizing:border-box;border:1px solid #DEDEDE;border-radius:6px 6px 0 0;margin-top:30px;
                
                .cc-item-previewbox
                    wh(236px,135px);position:relative;background:#F4F4F4;box-sizing:border-box;border-bottom:1px solid #DEDEDE;
                    .cip-icon
                        wh(32px,28px);bgImg('~common/images/source/folder_copy.png');abcenterX(50%,59px,-16px);
                    .cip-name
                        wh(100%,16px);hh(16px);color:#333;font-size:16px;abcenterX(0,103px,0);text-align:center;    

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