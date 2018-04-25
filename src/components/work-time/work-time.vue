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
        <router-view></router-view>
        
        
        <h3 class="column-title column-title-2">节目总预览</h3>    
        
        <div class="previewBox" >
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
                    <histogram :onOff="showLines"></histogram>
                </div>
                
                <!-- 收藏、上线按钮 -->
                <div class="collectionBtn">
                    <el-button plain class="rbtn resetBtn" @click="reset">重置</el-button>
                    <el-button plain class="rbtn colectBtn" @click="goup">收藏</el-button>
                    <el-button plain class="rbtn uploadFile" @click="entry">上线</el-button>
                </div>    
                
            </div>
            <div class="pbox gamebox" style="display:none;">
                <div class="gamebox-header">
                    <span class="gh-title">游戏开关</span>
                    <el-switch
                      v-model="gameOnoff"
                      active-color="#F8D76B"
                      inactive-color="#ff4949"
                      class="switchbox">
                    </el-switch>
                </div>
                <textarea class="inputGameBox" v-model="gamearea"></textarea>
                
                <!-- 主题选择 -->
                <div class="theme-select-wrap">
                    <div class="theme-show-box">
                        <h4>主题选择</h4>
                        <span v-model="selectValue" class="selctValue">春天</span>
                    </div>
                    <div class="theme-select-box">
                        <span class="select-box"></span>
                    </div>
                </div>

            </div>
        </div>
    
    </div>
</div>
</template>




<script scoped >
    import Histogram from '@/base/histogram/histogram'
    import On from '@/base/on/on'
    import tool from 'common/js/tool'
    import {mapGetters, mapMutations, mapActions} from 'vuex';

    export default{
        data(){
            return {
                gameOnoff: false,
                new_program_url: this.$baseUrl+'/api/createShow',
                entry_program_url: this.$baseUrl+'/api/pushShow',
                get_user: this.$baseUrl+'/api/user',
                showLines: true,
                gamearea: 'https://riverscoder.github.io/the-hamster-game/bin/index.html',
                game_url: this.$baseUrl+'/api/gameUpdate',
                selectValue: '春天'
            }
        },
        methods:{
            addFileBtn(){
                this.$router.push({'path':'/select'})
            },
            tabClick(){

            },
            //点击收藏
            goup(){

                var config = {
                    showName: tool.randomString(),
                    deviceName: 'dbs01',
                    isPush: 0
                };

                var url =  this.new_program_url;     
                this.requestProgram(url,config);
            },
            //点击上线节目
            entry(){

                //1. 检测是否满足上线的条件
                //2. 上线
                //3. 上线后清除当前重置所有本地数据

                var url =  this.entry_program_url;
                this.requestProgram(url);
            },
            //点击重置节目
            reset(){
               
                //1. 隐藏图表数据
                localStorage.setItem('showLines',false);
                this.showLines = false;

                //2. 清除当前所有时间list和文件list
                
                tool.lset('file_list_on',[]);
                tool.lset('time_list_on',[]);
                tool.lset('file_list_off',[]);
                tool.lset('time_list_off',[]);
                tool.lset('file_list_full',[]);
                tool.lset('time_list_full',[]);

                //3. 刷新页面 重新渲染数据
                location.reload(); 
            },
            requestProgram(url,config){
                
                //1.获取当前的用户名
                var username = '';
                var jsons = {};
                var baseConfig = {};
                
                this.$axios.post(this.get_user).then((res)=>{
                    username = res.data.data.name;

                    //2. 组装数据列表
                    jsons = tool.packageData(username);
                    
                    if(!jsons){
                        this.$message({
                          showClose: true,
                          message: '请编辑节目后再上线！',
                          type: 'warning'
                        });

                        return;
                    }

                    //组装请求数据
                    baseConfig = {
                        directorie: JSON.stringify(jsons)
                    };

                    if(config){
                       Object.assign(baseConfig,config); 
                    }

                    //3. 节目请求
                    this.$axios.post(url,baseConfig).then((res)=>{
                        
                        if(!config){
                            this.showLines = true
                        }

                        this.$message({
                          showClose: true,
                          message: res.data.message,
                          type: 'success'
                        });
                    })
                })  
            },
            //请求开始游戏
            requestGame(onoff){
                var value = this.gamearea;
                var sw = onoff ? 1 : 0;

                this.$axios.post(this.game_url,{
                    url: value,
                    switch: sw
                }).then((res)=>{
                    this.$message({
                      showClose: true,
                      message: res.data.message,
                      type: 'success'
                    });
                })

            },
            ...mapMutations({
                setPublish:'publish'
            })
        },
        watch:{
            gameOnoff:{
                handler(nv,ov){
                    this.requestGame(nv);
                },
                deep: true
            }
        },
        created(){
           //this.showLines = eval(localStorage.getItem('showLines'));
           // /console.log(this.showLines)
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
            ab(890px,120px);
        .resetBtn
            position:absolute;top:-55px;left:10px;        
        .rbtn
            width:128px;hh(40px);@extend .block;font-size:18px;color:#333;padding:0;border-radius:10px;
        .uploadFile
            bgColor(#ED1C24);color:#fff;margin-top:15px;position:relative;left:0px;
        .gamebox
            width:24%;height:280px;position:relative;
            .theme-select-wrap
                wh(100%,70px);position:absolute;bottom:0;left:0;border-top:1px solid #DEDEDE;
                .theme-show-box
                    wh(80%,70px);border-right:1px solid #DEDEDE;box-sizing:border-box;line-height:70px;font-size:18px;text-indent:20px;color:#333;font-weight:bold;position:relative;float:left;
                    .selctValue
                        position:absolute;right:0;top:0;box-sizing:border-box;padding-right:18px;color:#999;
                .theme-select-box
                    wh(19%,70px);position:relative;float:left;
                .select-box
                    display:block;wh(30px,16px);bgImg('~common/images/source/select@2x.png');ab(23px,29px);cursor:pointer;    
                    
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
