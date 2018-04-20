<template>
   <div class="con-container">
      <div class="Column">
          <h3 class="column-title">利率填写</h3>
          
          <div class="lilv-content">
              <div class="formBox formBox1">
                  <el-row>
                     <el-col :span="24"><div class="grid-content">
                         <h3 class="fb-title">星展兴盛理财新客户尊享</h3>
                     </div></el-col>
                  </el-row>
                  <el-row>
                     <el-col :span="24"><div class="grid-content">
                         <el-input class="input-lilv" v-model="input" placeholder="星展兴盛理财新客户尊享"></el-input>
                     </div></el-col>
                  </el-row>
                  <el-row>
                     <el-col :span="9"><div class="grid-content">
                         <el-input class="input-lilv input-lilvTwo" v-model="input" placeholder="请输入内容"></el-input>
                     </div></el-col>
                     <el-col :span="4"><div class="grid-content">&nbsp;</div></el-col>
                     <el-col :span="9"><div class="grid-content">
                         <el-input class="input-lilv input-lilvTwo" v-model="input" placeholder="请输入内容"></el-input>
                     </div></el-col> 
                  </el-row>
                  <el-row>
                     <el-col :span="24"><div class="grid-content">
                         <el-input class="input-lilv" v-model="input" placeholder="请输入内容"></el-input>
                     </div></el-col>
                  </el-row>
              </div><!--//end formBox1-->
              <div class="formBox formBox2">
                  <el-row>
                     <el-col :span="24"><div class="grid-content">
                         <h3 class="fb-title">定期存款客户尊享</h3>
                     </div></el-col>
                  </el-row>
                  <el-row>
                     <el-col :span="24"><div class="grid-content">
                         <el-input class="input-lilv" v-model="input" placeholder="定期存款客户尊享"></el-input>
                     </div></el-col>
                  </el-row>
                  <el-row>
                     <el-col :span="9"><div class="grid-content">
                         <el-input class="input-lilv input-lilvTwo" v-model="input" placeholder="请输入内容"></el-input>
                     </div></el-col>
                     <el-col :span="4"><div class="grid-content">&nbsp;</div></el-col>
                     <el-col :span="9"><div class="grid-content">
                         <el-input class="input-lilv input-lilvTwo" v-model="input" placeholder="请输入内容"></el-input>
                     </div></el-col> 
                  </el-row>
                  <el-row>
                     <el-col :span="24"><div class="grid-content">
                         <el-input class="input-lilv" v-model="input" placeholder="请输入内容"></el-input>
                     </div></el-col>
                  </el-row>
              </div> <!--//end formBox2-->

              <el-button class="tiJiaoBtn">提交</el-button>

          </div><!-- //end  lilv-content-->


      </div>
    </div>
</template>




<script type="text/ecmascript-6">
    
    export default{
        data(){
            return{
                title: '',
                input: ''
            }
        },
        props: {

        },
        methods:{
         
        },
        mounted(){
           
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

    @import "~common/stylus/variable" 
    @import "~common/stylus/mixin"
    
    inputStyle(){
        height:40px;line-height:40px;color:#999;bgColor(#F4F4F4);border-radius:10px;border:0;
    }

    .con-container
            width:100%;box-sizing:border-box;background:#fff;padding:32px 46px 10px 32px;
    .Column
        width:100%;height:auto;initp();
        
        .column-title
            font-size:20px;color:#666;hh(70px);text-indent:28px;position:relative;
            &:before
                content:'';@extend .block;wh(9px,24px);bgColor(#ED1C24);position:absolute;left:0px;top:23px;
        
    .lilv-content
        wh(100%,575px);border-radius:10px;border:1px solid #DEDEDE;position:relative
        .formBox
            wh(320px,280px);position:relative;left:334px;
            .fb-title
                font-size:16px;color:#333;font-weight:bold;text-align:center;hh(108px);
            .input-lilv
                width:319px;margin-bottom:22px;
                input
                    inputStyle();
                    &:focus
                      border:1px solid #999;   
            .input-lilvTwo
                width:140px;
        .formBox2
            left:828px;top:-300px;              
    
        .tiJiaoBtn
            wh(280px,50px);color:#fff;font-size:20px;bgColor(#ED1C24);ab(622px,422px);
            &:hover
                opacity:0.8;                                 
</style>