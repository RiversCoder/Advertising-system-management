<template>
    
<div>
     <header class="pc-header">
            <ul class="control-menu">
                <router-link to="/program-production/work-time/on">
                     <li class="item worktime">工作时间</li>
                </router-link>
                <router-link to="/program-production/work-time/off">
                     <li class="item notworktime">非工作时间</li>
                </router-link>
                <router-link to="/program-production/work-time/full">
                     <li class="item fullscreen">全屏</li>
                </router-link>
            </ul>
        </header>

    <div class="content ">

        
       

        
        <!-- 加载工作添加计划 -->
        <router-view ></router-view>
        
        
        <h3 class="column-title column-title-2">节目总预览</h3>    
        
        <div class="previewBox">
            <div class="pbox tubiaobox">
                
                <!-- 说明 -->
                <ul class="introLists" v-show='true'>
                    <li class="introItem introItem1">工作</li>
                    <li class="introItem introItem2">非工作时间</li>
                    <li class="introItem introItem3">非工作时间</li>
                    <li class="introItem introItem4">无视频展示</li>
                </ul>
                
                <!-- 柱状图展示 -->
                <div class="chartViewBox">
                    <histogram></histogram>
                </div>
                
                <!-- 收藏、上线按钮 -->
                <div class="collectionBtn">
                    <el-button plain class="rbtn ">收藏</el-button>
                    <el-button plain class="rbtn uploadFile">上线</el-button>
                </div>    
                
            </div>
            <div class="pbox gamebox">
                <div class="gamebox-header">
                    <span class="gh-title">游戏开关</span>
                    <el-switch
                      v-model="value"
                      active-color="#F8D76B"
                      inactive-color="#ff4949"
                      class="switchbox">
                    </el-switch>
                </div>
                <textarea class="inputGameBox"></textarea>
            </div>
        </div>
    
    </div>
</div>
</template>

<script>
    import Histogram from '@/base/histogram/histogram'
    import On from '@/base/on/on'

    export default{
        data(){
            return {
                value: true
            }
        },
        methods:{
            addFileBtn(){
                this.$router.push({'path':'/select'})
            },
            tabClick(){

            },
            checkSetStorage(){
                var obj = {
                    name : '王大花',
                    code : '4009012312xxx',
                    age : 12,
                    class : '七年级五班'
                };

                localStorage.setItem('item',obj);

                console.log(localStorage.getItem('item'));
            }
        },
        created(){
            
        },
        components:{
            Histogram,
            On
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    
    @import "~common/stylus/variable" 
    @import "~common/stylus/mixin"    
    
    .btnStyle{
        bgColor(#F4F4F4);color:#333;font-size:18px;initp();border-radius:10px;
     }
    
    .pc-header
        border-bottom:2px solid #DEDEDE;

    .control-menu
        wh(610px,108px);margin:0 auto;
        .item
            list-stype:none;float:left;width:171px;hh(110px);color:#333;font-size:18px;text-align:center;cursor:pointer;
        .menuActive
            .worktime
                bgColor(#5E8CEE);color:#fff;
            .notworktime
                bgColor(#5ED07F);color:#fff;
            .fullscreen
                bgColor(#F58E1F);color:#fff; 

    .content
        width:100%;height:1600px;background:#fff;box-sizing:border-box;padding:0 30px;
                   
    .column-title
        font-size:20px;width:100%;color:#666;hh(70px);text-indent:28px;
        &:before
            content:'';@extend .block;wh(9px,24px);bgColor(#5E8CEE);position:absolute;left:0px;top:23px;
    .column-title-2
         position:relative;
         &:before
            bgColor(#ED1C24);        
 

    
    .previewBox
        wh(100%,280px);border:1px solid #DEDEDE;
        .pbox
            float:left;box-sizing:border-box;
        .tubiaobox
            wh(76%,280px);border-right:1px solid #DEDEDE;position:relative;
    
            .introLists
                wh(190px,auto);list-style:none;ab(115px,70px);
                .introItem
                    wh(100%,36px);font-size:16px;color:#333;text-align:left;text-indent:30px;position:relative;
                    &:before
                        content:'';display:block;wh(18px,18px);border-radius:50%;ab(0,0);
                .introItem1
                    &:before        
                        bgColor(#5E8CEE);
                .introItem2
                    &:before        
                        bgColor(#5ED07F);
                .introItem3
                    &:before        
                        bgColor(#F58E1F);
                .introItem4
                    &:before        
                        bgColor(#DEDEDE);
        .chartViewBox
            ab(302px,70px);
        
        .collectionBtn
            ab(890px,80px);    
        .rbtn
            width:128px;hh(40px);@extend .block;font-size:18px;color:#333;padding:0;border-radius:10px;
        .uploadFile
            bgColor(#ED1C24);color:#fff;margin-top:27px;position:relative;left:-10px;
        .gamebox
            width:24%;    
        .gamebox-header
            wh(100%,69px);line-height:69px;font-size:18px;color:#333;text-indent:20px;border-bottom:1px solid #DEDEDE;position:relative;
            .switchbox
                width:51px;position:absolute;right:10px;top:18px;
                .el-switch__core
                    wh(51px,29px);width:51px !important;border-radius:25px;
                    .el-switch__button
                        wh(25px,25px);
        .inputGameBox
            display:block;wh(304px,86px);padding:3px 5px;bgColor(#F4F4F4);border-radius:10px;font-size:12px;line-height:14px;color:#999;margin:0 auto;margin-top:10px;                                               
</style>

