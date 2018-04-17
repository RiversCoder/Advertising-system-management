<template>
    <div class="histogram">
        <ul class="hisLists">
            <li class="hitem hitem1">
                <ul class="child-lists">
                    <li class="citem" v-for="(index,item) in array"></li>
                </ul>
                <span class="ctitle">Sun</span>
            </li>
            <li class="hitem hitem2">
                 <ul class="child-lists">
                    <li class="citem" v-for="(index,item) in array"></li>
                </ul>
                <span class="ctitle">Mon</span>
            </li>
            <li class="hitem hitem3">
                 <ul class="child-lists">
                    <li class="citem" v-for="(index,item) in array"></li>
                </ul>
                <span class="ctitle">Tue</span>
            </li>
            <li class="hitem hitem4">
                 <ul class="child-lists">
                    <li class="citem" v-for="(index,item) in array"></li>
                </ul>
                <span class="ctitle">Wen</span>
            </li>
            <li class="hitem hitem5">
                 <ul class="child-lists">
                    <li class="citem" v-for="(index,item) in array"></li>
                </ul>
                <span class="ctitle">Thr</span>
            </li>
            <li class="hitem hitem6">
                 <ul class="child-lists">
                    <li class="citem" v-for="(index,item) in array"></li>
                </ul>
                <span class="ctitle">Fri</span>
            </li>
            <li class="hitem hitem7">
                 <ul class="child-lists">
                    <li class="citem" v-for="(index,item) in array"></li>
                </ul>
                <span class="ctitle">Sat</span>
            </li> 
        </ul>
    </div>
</template>

<script>

    export default{
        data(){
            return {
                array:[0,0,0,0,0,0,0,0,0,0,0,0]
            }
        },
        methods:{
           
        },
        created(){
           
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    
    @import "~common/stylus/variable" 
    @import "~common/stylus/mixin"    

    .hisLists
        wh(541px,180px);
        .hitem
            wh(55px,180px);margin-right:26px;float:left;
        .hitem7
            margin-right:0;
        .child-lists
            list-style:none;wh(55px,150px);
            .citem
                width:100%;height:11px;margin-top:1px;bgColor(#DEDEDE);
        .ctitle
            display:block;width:100%;font-size:18px;color:#333;text-align:center;margin-top:8px;                             
</style>