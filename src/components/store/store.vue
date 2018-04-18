<template>
   <div class="con-container">
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
              <div class="chartBoxPie" id="chartBoxPie"></div>
          </div>

          <h3 class="column-title">账号管理</h3>
          
          <div class="user-manage">

            <el-row :gutter="20">
              <el-col :span="7"><div class="grid-content bg-purple"><span class="btn-intro">创建子账户</span><el-input class="input-intro" v-model="input" placeholder="E-mail"></el-input></div></el-col>
              <el-col :span="7"><div class="grid-content bg-purple"><span class="btn-intro">@DBS.COM</span><el-input class="input-intro" v-model="input" placeholder="代号"></el-input></div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple"><el-button type="danger">确认添加</el-button></div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            </el-row>

            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="title" width="220"></el-table-column>
              <el-table-column prop="email" width="220"></el-table-column>
              <el-table-column prop="alias" width="220"></el-table-column>
              <el-table-column prop="time" width="220"></el-table-column>
              <el-table-column prop="address" width="220">
                    <template slot-scope="scope">
                        <el-button size="medium" type="danger" @click="handleDelete()">删除</el-button>
                    </template>
              </el-table-column>
            </el-table>
          </div>  
      </div>
    </div>
</template>




<script type="text/ecmascript-6">
    
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入柱状图组件
    require('echarts/lib/chart/pie')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')


    export default{
        data(){
            return{
                title: '',
                input: '',
                tableData: [{
                    title: '已有子账户',
                    email: '123.tang@163.com',
                    alias: 'longTang',
                    time: '2018.04.11 13:14:23',
                    address: '上海市普陀区金沙江路 1518 弄'
                  }, {
                    title: '已有子账户',
                    email: '123.tang@163.com',
                    alias: 'xiaohua',
                    time: '2018.03.11 13:14:23',
                    address: '上海市普陀区金沙江路 1517 弄'
                  }]
            }
        },
        props: {
        },
        methods:{
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
            handleDelete(){
                
            }
        },
        mounted(){
            this.drawPie();
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

    @import "~common/stylus/variable" 
    @import "~common/stylus/mixin"
    
    .con-container
            width:100%;box-sizing:border-box;background:#fff;padding:32px 46px 10px 32px;
    .Column
        width:100%;height:auto;initp();
        
        .column-title
            font-size:20px;color:#666;hh(70px);text-indent:28px;position:relative;
            &:before
                content:'';@extend .block;wh(9px,24px);bgColor(#ED1C24);position:absolute;left:0px;top:23px;
        
        .chartPieBox
            wh(100%,430px);flex();border-radius:6px;box-sizing:border-box;border:1px solid #DEDEDE;margin-bottom:0px;
            .chartBoxContent
                wh(50%,430px);letter-spacing:2px;padding-left:138px;box-sizing:border-box;color:#333;
                h3
                    font-size:45px;hh(63px);padding-top:99px;
                h4
                    font-size:23px;hh(43px);
                p 
                   font-size:16px;hh(58px);letter-spacing:1px;
                   .etime
                       position:relative;left:116px;                   
            .chartBoxPie
                wh(50%,430px);
        .user-manage
            wh(100%,351px);box-sizing:border-box;border-radius:6px;border:1px solid #DEDEDE;padding-left:54px;padding-top:26px;       
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