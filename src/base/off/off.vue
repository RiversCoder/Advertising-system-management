<template>
    
    <div>
        <h4 class="column-title column-title-top">模块控制</h4>
        <div class="timebox">
            <div class="tbox tbox1">
                
                <!-- 新增加的 -->

                <div class="add-file-box">
                    <div class="add-source-wrap">
                        <ul class="imgWrap" ref="imgWrap">
                            <li v-for="(item,index) in cresults" :width="liw+'px'">
                                <img :src="item.img" alt="" :width="liw+'px'">
                            </li>
                        </ul>
                    </div>
                    <div class="add-source-btn" ref="addSourceBox" @click="addFileBtn">
                    </div>


                </div>
            </div>
            <div class="tbox tbox2" ref="timeListBox">
                <div class="tlistwrap" >
                    <ul class="tlists">
                        <li class="bitem bitem1" v-for="(item,index) in setTimes">
                            <span class="bitem-item bitem-time">{{item.time}}</span>
                            <span class="bitem-item bitem-day">
                                {{item.date}}
                            </span>
                            <el-button @click="deleteTime(index)" class="deleteTimeItem" type="primary" icon="el-icon-delete"></el-button>
                        </li>
                    </ul>
                    <span class="add-bitem-btn" @click="dialogFormVisible = true;"></span>
                </div>
            </div>
        </div>
        
        <el-dialog title="选择播放时段" :visible.sync="dialogFormVisible">
          <el-time-select v-model="value1" :picker-options="{ start: '00:00', step: '00:15', end: '24:00' }" placeholder="请选择时间"></el-time-select>
          <el-time-select v-model="value2" :picker-options="{ start: '00:00', step: '00:15', end: '24:00' }" placeholder="请选择时间"></el-time-select>
          <div class="checkboxs">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="Sun"></el-checkbox>
                <el-checkbox label="Mon"></el-checkbox>
                <el-checkbox label="Tue"></el-checkbox>
                <el-checkbox label="Web"></el-checkbox>
                <el-checkbox label="Thu"></el-checkbox>
                <el-checkbox label="Fri"></el-checkbox>
                <el-checkbox label="Sat"></el-checkbox>
              </el-checkbox-group>
          </div>    
        
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="closeSure">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
    
    import tool from 'common/js/tool';
    import BScroll from 'better-scroll';
    import {mapGetters, mapMutations, mapActions} from 'vuex';


    export default{
        data(){
            return {
                value: true,
                value1: '',
                value2:'',
                checkList: [],
                dialogFormVisible: false,
                worktimes: [],
                cresults: [],
                liw:0,
                week: '000000',
                start: 0,
                duration: 0,
                setTimes: []
            }
        },
        methods:{
            //初始化绑定 better-scroll 
            _initScroll() {
              this.menuScroll = new BScroll(this.$refs.timeListBox, {
                click: true
              })
            },
            //初始化已经选择的素材和时间
            init(){
                var box = this.$refs.imgWrap;
                this.liw = Math.ceil(box.clientWidth/this.cresults.length);
            },
            //初始化已经选择的文件
            initSelectFiles(){
                if(tool.lget('file_list_off')){
                    this.cresults = tool.lget('file_list_off');
                }
            },
            //初始化已经set的时间线
            initSetTimes(){
                //设置存储空间
                if(!tool.lget('time_list_off')){
                    tool.lset('time_list_off',this.setTimes);
                }else{
                    //初始化数据
                    this.setTimes = tool.lget('time_list_off');
                }
                
            },
            addFileBtn(){
                this.$router.push({'path':'/program-production/select',query:{direct:'off'}});
            },
            //添加时间和星期
            closeSure(){
                
                this.dialogFormVisible = false;

                //验证
                if(this.checkList.length==0 || !this.value1 || !this.value2){
                    this.$message.error('时间或星期不能为空!');
                    return;
                }
                //验证时间大小
                if(tool.changeTimetoSecond(this.value1) >= tool.changeTimetoSecond(this.value2)){
                    this.$message.error('亲，时间先后顺序设置错误！');
                    return;
                }

                //计算时间冲突
                if(tool.checkTime(this.setTimes,tool.countTimes(this.value1,this.value2,this.checkList))){
                    this.$message({
                      message: '时间设置冲突,请重新设置!',
                      type: 'warning'
                    });
                    return;
                }

                //计算并且存储数据
                this.setTimes.push(tool.countTimes(this.value1,this.value2,this.checkList));

                tool.lset('time_list_off',this.setTimes);

                this.setPublish(Math.random())
            },
            //删除时间项
            deleteTime(index){
                this.setTimes.splice(index,1);
                tool.lset('time_list_off',this.setTimes);
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                });
                this.setPublish(Math.random())
            },
            ...mapMutations({
                setPublish:'publish'
            })
        },
        compouted:{
            ...mapGetters(['results','model_type_1'])
        },
        watch:{
            cresults:{
               handler(newValue, oldValue) {
　　　　　　　　  for (let i = 0; i < newValue.length; i++) {
　　　　　　　　    if (oldValue[i] != newValue[i]) {
　　　　　　　　　　    
                      break;
　　　　　　　　    }
                }
        　　　　},
        　　　　deep: true
            }
        },
        mounted(){
            this.initSelectFiles();
            this.initSetTimes();
            this.init();
        },
        created(){
            this.$nextTick(() => {
              this._initScroll()
            });
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
    .deleteTimeItem
        transition:.8;border-radius:0;bgColor(#5e8cee);border-color:#5e8cee;opacity:0.2;
        &:hover
            opacity:1; 
    .checkboxs
        width:100%;height:80px;padding-top:20px; 
    .column-title-top
        text-align:left;margin:0;-webkit-margin-before: 0em;-webkit-margin-after: 0em;-webkit-margin-start: 0px;-webkit-margin-end: 0px;position:absolute;               
    .column-title
        font-size:20px;width:100%;color:#666;hh(70px);text-indent:28px;position:relative;
        &:before
            content:'';@extend .block;wh(9px,24px);bgColor(#5E8CEE);position:absolute;left:0px;top:23px;
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
        .add-source-wrap
            wh(253px,152px);position:absolute;bottom:0;left:0;overflow:hidden; 
            .imgWrap
                wh(100%,100%);list-style:none;
                li
                    display:block;float:left;
                    img
                       display:block;       
        .add-source-btn
            wh(253px,152px);position:absolute;bottom:0;left:0;bgImg('~common/images/worktime/addBtn2.png');cursor:pointer;
               
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
        @extend .block;wh(100%,65px);bgColor(#F4F4F4);bgImg('~common/images/worktime/add2.png');background-size:30px 30px;background-position:center center;cursor:pointer;border-bottom:1px solid #DEDEDE;                                             
</style>

