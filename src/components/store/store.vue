<template>
   <div class="con-container" ref="menuScroll">
    <div>
        <div class="Column">
            <h3 class="column-title">账号存储空间</h3>
            
            <div class="chartPieBox">
                <div class="chartBoxContent">
                    <h3>DBS总部</h3>
                    <h4>地址：深圳市福田区福强路下沙kkone四楼</h4>
                    <p>
                      <span class="stime">起始时间：2018.03.25</span>
                      <span class="etime">结束时间：2018.03.25</span>
                    </p>
                </div>
                <div class="cbp_wrap">
                  <div id="chartBoxPie" class="chartBoxPie"></div>
                </div>
                
            </div>

            <h3 class="column-title">账号管理</h3>
            
            <div class="user-manage">

              <div class="inputBoxs">
                <div class="ib-item">
                  <span class="btn-intro">创建子账户</span>
                  <el-input class="input-intro" v-model="input" placeholder="E-mail" type="email"></el-input>
                  <span class="btn-intro">@DBS.COM</span>
                   <el-input class="input-intro" v-model="passwords" placeholder="Password" type="password"></el-input>
                </div>
                <div class="ib-item">
                 
                </div>
             </div>

             <div class="inputBoxs">
               <div class="ib-item">
                   <span class="btn-intro">设置权限</span>
                   <div class="radioSelects">
                        <el-radio v-model="radio" label="3">发布游戏</el-radio>
                        <el-radio v-model="radio" label="4">发布利率</el-radio>
                   </div>
                </div>
                <div class="ib-item">
                  <el-button type="danger" @click="clickAddUser" class="addcBtns">确认创建</el-button>
                </div>
             </div>


              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="id" width="220"></el-table-column>
                <el-table-column prop="name" width="220"></el-table-column>
                <el-table-column prop="nickname" width="220"></el-table-column>
                <el-table-column prop="updated_at" width="220"></el-table-column>
                <el-table-column prop="address" width="220">
                      <template slot-scope="scope" >
                          <el-button size="medium" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                      </template>
                </el-table-column>
              </el-table>
            </div>  
        </div>
      </div>
    </div>
</template>


<style scoped lang="stylus" rel="stylesheet/stylus">

    @import "~common/stylus/variable" 
    @import "~common/stylus/mixin"
    
    
    .con-container
            width:100%;box-sizing:border-box;background:#fff;padding:32px 46px 10px 32px;
            .inputBoxs
              width:100%;hh(42px);padding-top:26px;
              .ib-item
                padding-right:40px;float:left;
                .addcBtns 
                  transform:translateY(-5px);
                .radioSelects
                  hh(40px);float:left;margin-left:40px;transform:translateY(-5px);
                .btn-intro
                  padding-left:40px;
                  &:nth-of-type(1)
                    padding-left:0;
              
    .Column
        width:100%;height:auto;initp();
        
        .column-title
            font-size:20px;color:#666;hh(70px);text-indent:28px;position:relative;
            &:before
                content:'';@extend .block;wh(9px,24px);bgColor(#ED1C24);position:absolute;left:0px;top:23px;
        
        .chartPieBox
            width:100%;min-height:430px;border-radius:6px;box-sizing:border-box;border:1px solid #DEDEDE;margin-bottom:0px;
            .chartBoxContent
                wh(50%,430px);letter-spacing:2px;padding-left:138px;box-sizing:border-box;color:#333;float:left;
                h3
                    font-size:45px;hh(63px);padding-top:99px;
                h4
                    font-size:23px;hh(43px);
                p 
                   font-size:16px;hh(58px);letter-spacing:1px;
                   .etime
                       position:relative;left:116px;                   
            .chartBoxPie
                wh(50%,430px);float:left;
        .user-manage
            width:100%;min-height:351px;box-sizing:border-box;border-radius:6px;border:1px solid #DEDEDE;padding-left:54px;padding-top:26px;       
            .el-button--danger
                background-color: #ed1c24;border-color: #ed1c24;
                &:hover
                    opacity:0.8;
            .el-table td,.el-table th.is-leaf
                border:0 !important;
            .el-table
                &:before
                    display:none;  
            .btn-intro
                display:block;font-size:16px;color:#333;float:left;line-height:40px;
            .input-intro
                width:206px;float:left;margin-left:40px;
                input
                    background:#F4F4F4;color:#999;border-radius:10px;          
</style>



<script type="text/ecmascript-6">
    
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入柱状图组件
    require('echarts/lib/chart/pie')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    import BScroll from 'better-scroll';

    export default{
        data(){
            return{
                title: '',
                input: '',
                passwords: '',
                tableData: [],
                url: this.$baseUrl+'/api/addSubAccount',
                get_url: this.$baseUrl+'/api/subAccount',
                delete_url: this.$baseUrl+'/api/delSubAccount',
                attr:{},
                radio:'3'
            }
        },
        props: {
        },
        methods:{
          //初始化绑定 better-scroll 
          _initScroll() {
            // fade 默认为 true，滚动条淡入淡出
            var options = {}; 
            options.scrollbar = true  //wheel: false
            options.click = true
            this.menuScroll = new BScroll(this.$refs.menuScroll,options)
          },
          //初始化滚动包裹盒子的高度
            initScrollHeight(){
                
                let wrap = this.$refs.menuScroll;
                wrap.style.overflow = 'hidden';
                let winHeight = document.body.offsetHeight;
                let headHeight = 0;

                wrap.style.height = (winHeight - headHeight) + "px";
                
          },
          //初始化获取存储账户的子账户
          init(){

            //验证数据
            this.$axios.post(this.get_url).then((res)=>{
              
              if(res.data.status == 'success'){
                 this.tableData = res.data.data;
              }

            }).catch((error)=>{
              console.log(error)
            })


          },
          //点及添加子账户
          clickAddUser(){
            if(!this.input || !this.passwords){
              this.$message.error('邮箱或密码不能为空!');

            }else{

              if(!/^\w+$/.test(this.input)){
                this.$message.error('邮箱或格式错误!');
                return;
              }

              this.attr['name'] = this.input+'@dbs.com';
              this.attr['password'] = this.passwords;
              this.attr['role'] = this.radio;

              this.$axios.post(this.url,this.attr).then((res)=>{

                if(res.data.status == 'success'){
                  this.init();
                  this.$message({
                    message: '恭喜你，成功添加子账户！',
                    type: 'success'
                  });
                }
              
              }).catch((error)=>{
                console.log(error)
              })

            }
          },
          selectFn(index){
            var items = document.querySelectorAll('.cc-item');
            items[index].classList.toggle('cactive');
          },
          drawPie(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('chartBoxPie'))
                // 绘制图表
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:['空闲 (GB)','VIDEO (GB)','图片 (GB)']
                    },
                    series: [
                        {
                            name:'存储空间',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'left'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:400, name:'空闲 (GB)',itemStyle: {color: '#CCCCCC'}},
                                {value:300, name:'VIDEO (GB)',itemStyle: {color: '#5ED07F'}},
                                {value:300, name:'图片 (GB)',itemStyle: {color: '#F6CF5F'}}
                            ]
                        }
                    ]
                };
                myChart.setOption(option);
            },
            //点击删除子账户
            handleDelete(data){ 
                //handleDelete
                this.$axios.post(this.delete_url,{'sub_id':data.id}).then((res)=>{
                    if(res.data.status == 'success'){
                      this.init();
                      this.$message({
                        message: '成功删除该子账户！',
                        type: 'success'
                      });
                    }else{
                      this.$message.error(res.data.message);
                    }
                })
            }
        },
        created(){
          this.init();
          //初始化better-scroll
          this.$nextTick(() => {
            this._initScroll()
          });
        },
        mounted(){
            this.drawPie();
            this.initScrollHeight();
        }
    }
</script>




<style scoped type="text/css">
    @media screen and (max-width:1680px){
      .Column .chartPieBox{
        height:830px;
      }
      .Column .chartPieBox .chartBoxContent{
        width:100%;clear:both;padding-left:0;text-align: center;height:320px;
      }
      .Column .chartPieBox .chartBoxContent p .stime{
        position:relative;left:-20px;
      }
      .Column .chartPieBox .chartBoxContent p .etime{
        left:10px;
      }
      .Column .chartPieBox .chartBoxPie{
        width:677px;clear:both;position: relative;left:50%;transform: translateX(-50%);
      }
      .Column .cbp_wrap{
        width:100%;height:430px;
      }
    }
</style>