<template>
    <div class="histogram">
        <ul class="hisLists">
            <li class="hitem hitem1" v-for="name in weeks">
                <div class="child-lists-wrap">
                    <span class="cwb"></span>
                </div>
                <ul class="child-lists">
                    <li class="citem" v-for="item in array"></li>
                </ul>
                <span class="ctitle">{{name}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    
    import tool from 'common/js/tool'
    import {mapGetters, mapMutations, mapActions} from 'vuex';

    export default{
        data(){
            return {
                weeks: ['Sun','Mon','Tue','Web','Thu','Fri','Sat'],
                array:[0,0,0,0,0,0,0,0,0,0,0,0]
            }
        },
        props:{
            onOff:{
                type:Boolean,
                default: false
            }
        },
        methods:{
           draw(){

                //检测本地是否有值
                //tool.checkTimelists();
                console.log('重绘制')
                if(true){
                    
                    //1. 绘制工作日时间
                    this.drawWorkDay('#446FCB','time_list_on');
                    
                    //2. 绘制非工作日时间
                    this.drawWorkDay('#49B869','time_list_off');

                    //3. 绘制全屏
                    this.drawWorkDay('#F58E1F','time_list_full');
                }
           },
           drawWorkDay(color,storageName){
                
                //1. 获取数据
                if(!tool.lget(storageName)){

                    //清除当前颜色色块
                    return;
                }

                var data = tool.lget(storageName);
                var arr = tool.handleTime(data);
                
                //2. 换算比例
                var harr = tool.countPercent(144,arr);
                
                //3. 生成色块
                tool.createColorblock('child-lists-wrap','cwb',harr,color,storageName);
           }/*,
           ...mapMutations({
            setPublish:'publish'
           })*/
        },
        computed:{
            ...mapGetters(['publish'])
        },  
        watch:{
            publish: function(newv,oldv){
                console.log(newv);
                if(newv){
                    this.draw();
                }
            }
        },
        created(){
           
        },
        mounted(){
            this.draw();
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    
    @import "~common/stylus/variable" 
    @import "~common/stylus/mixin"    

    .hisLists
        wh(550px,180px);
        .hitem
            wh(55px,180px);margin-right:23px;float:left;position:relative;
        .hitem7
            margin-right:0;
        .child-lists-wrap
            wh(55px,143px);bgColor(#DEDEDE);position:absolute;
            .cwb
                display:block;width:100%;position:absolute;left:0;
        .child-lists
            list-style:none;wh(55px,143px);position:absolute;
            .citem
                width:100%;height:12px;box0szing:border-box;border-bottom:1px solid #fff;
        .ctitle
            display:block;width:100%;font-size:18px;color:#333;text-align:center;margin-top:8px;position:absolute;bottom:0;                             
</style>