<template>
    <div class="content">
        <h3 class="column-title">模块控制</h3>

        <div class="timebox">
            <div class="tbox tbox1">
                <div class="add-file-box"></div>
            </div>
            <div class="tbox tbox2" ref="timeListBox">
                <div class="tlistwrap" >
                    <ul class="tlists">
                        <li class="bitem bitem1">
                            <span class="bitem-item bitem-time">AM08:15-PM6:00</span>
                            <span class="bitem-item bitem-day">
                                <i>Mon</i>
                                <i>Tue</i>
                                <i>Thi</i>
                                <i>Fri</i>
                            </span>
                        </li>
                        <li class="bitem bitem1">
                            <span class="bitem-item bitem-time">AM08:15-PM6:00</span>
                            <span class="bitem-item bitem-day">
                                <i>Working day</i>
                            </span>
                        </li>
                        <li class="bitem bitem1">
                            <span class="bitem-item bitem-time">AM08:15-PM6:00</span>
                            <span class="bitem-item bitem-day">
                                <i>Working day</i>
                            </span>
                        </li>
                        <li class="bitem bitem1">
                            <span class="bitem-item bitem-time">AM08:15-PM6:00</span>
                            <span class="bitem-item bitem-day">
                                <i>Working day</i>
                            </span>
                        </li>
                        <li class="bitem bitem1">
                            <span class="bitem-item bitem-time">AM08:15-PM6:00</span>
                            <span class="bitem-item bitem-day">
                                <i>Working day</i>
                            </span>
                        </li>
                        <li class="bitem bitem1">
                            <span class="bitem-item bitem-time">AM08:15-PM6:00</span>
                            <span class="bitem-item bitem-day">
                                <i>Working day</i>
                            </span>
                        </li>
                    </ul>
                    <span class="add-bitem-btn"></span>
                </div>
            </div>
        </div>
        
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
</template>

<script>
    import BScroll from 'better-scroll';
    import Histogram from '@/base/histogram/histogram'
    export default{
        data(){
            return {
                value: true
            }
        },
        methods:{
            _initScroll() {
              this.menuScroll = new BScroll(this.$refs.timeListBox, {
                click: true
              })
            },
        },
        created(){
            this.$nextTick(() => {
              this._initScroll();
            });
        },
        components:{
            Histogram
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    
    @import "~common/stylus/variable" 
    @import "~common/stylus/mixin"    

    .content
        width:100%;height:1600px;background:#fff;box-sizing:border-box;padding:0 30px;
    .column-title
        font-size:20px;color:#666;hh(70px);text-indent:28px;position:relative;
        &:before
            content:'';@extend .block;wh(9px,24px);bgColor(#5E8CEE);position:absolute;left:0px;top:23px;
    .column-title-2
         &:before
            bgColor(#ED1C24);        
    .timebox
        wh(100%,398px);display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-between;
        .tbox
            width:50%;box-sizing:border-box;position:relative;
        .tbox1
            border:4px dashed #DEDEDE;overflow:hidden;
        .tbox2
            border:1px solid #DEDEDE;border-left:0;height:398px;overflow:hidden;
    .add-file-box
        wh(510px,200px);bgImg('~common/images/worktime/noworktime.jpg');cursor:pointer;margin: 0 auto;position:relative;top:94px;
    .tlists
        wh(100%,auto);list-style:none;
        .bitem
            wh(100%,74px);border-bottom:1px solid #DEDEDE;display:flex;
            .bitem-item
                @extend .block;width:50%;hh(74px);font-size:18px;text-align:left;text-indent:23px;letter-spacing:2px;color:#333;box-sizing:border-box;
            .bitem-day
                text-align:right;padding-right:23px;
                i 
                    font-style:normal;
    .add-bitem-btn
        @extend .block;wh(100%,65px);bgColor(#F4F4F4);bgImg('~common/images/worktime/add2.png');background-size:30px 30px;background-position:center center;cursor:pointer;border-bottom:1px solid #DEDEDE;
    
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