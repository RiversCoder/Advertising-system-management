<template>
    
    <div>
        <h4 class="column-title column-title-top">模块控制</h4>
        <div class="timebox">
            <div class="tbox tbox1">
                <div class="add-file-box" >
                    <div class="add-source-btn" @click="addFileBtn"></div>
                </div>
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
                       
                    </ul>
                    <span class="add-bitem-btn"></span>
                </div>
            </div>
        </div>
        
        
    </div>
</template>

<script>
    
    export default{
        data(){
            return {
                value: true
            }
        },
        methods:{
            addFileBtn(){
                this.$router.push({'path':'/program-production/select'})
            }
        },
        created(){
        },
        components:{
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    
    @import "~common/stylus/variable" 
    @import "~common/stylus/mixin"    
    
    .btnStyle{
        bgColor(#F4F4F4);color:#333;font-size:18px;initp();border-radius:10px;
     }
    .column-title-top
        text-align:left;margin:0;-webkit-margin-before: 0em;-webkit-margin-after: 0em;-webkit-margin-start: 0px;-webkit-margin-end: 0px;position:absolute;               
    .column-title
        font-size:20px;width:100%;color:#666;hh(70px);text-indent:28px;position:relative;
        &:before
            content:'';@extend .block;wh(9px,24px);bgColor(#F58E1F);position:absolute;left:0px;top:23px;
    .column-title-2
         &:before
            bgColor(#ED1C24);        
    .timebox
        wh(100%,398px);position:relative;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-between;
        .tbox
            width:50%;box-sizing:border-box;position:relative;
        .tbox1
            border:4px dashed #DEDEDE;overflow:hidden;
        .tbox2
            border:1px solid #DEDEDE;border-left:0;height:398px;overflow:hidden;
        .add-source-btn
            wh(253px,152px);position:absolute;bottom:0;left:0;bgImg('~common/images/worktime/addBtn3.png');cursor:pointer;      
    .add-file-box
        wh(510px,200px);bgImg('~common/images/worktime/worktime.jpg');margin: 0 auto;position:relative;top:94px;
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
        @extend .block;wh(100%,65px);bgColor(#F4F4F4);bgImg('~common/images/worktime/add3.png');background-size:30px 30px;background-position:center center;cursor:pointer;border-bottom:1px solid #DEDEDE;                                             
</style>

