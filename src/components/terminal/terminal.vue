<template>
   <div class="con-container">
      <div class="Column">
          <h3 class="column-title">利率填写</h3>
          
          <div class="lilv-content">

              <div class="forWrap">
                <div class="formBox formBox1">
                    <el-row>
                       <el-col :span="24"><div class="grid-content">
                           <h3 class="fb-title">星展兴盛理财新客户尊享</h3>
                       </div></el-col>
                    </el-row>
                    <el-row>
                       <el-col :span="24"><div class="grid-content">
                           <el-input class="input-lilv" v-model="input1_1" placeholder="星展兴盛理财新客户尊享"></el-input>
                       </div></el-col>
                    </el-row>
                    <el-row>
                       <el-col :span="9"><div class="grid-content">
                           <el-input class="input-lilv input-lilvTwo" v-model="input1_2" placeholder="港元"></el-input>
                       </div></el-col>
                       <el-col :span="4"><div class="grid-content">&nbsp;</div></el-col>
                       <el-col :span="9"><div class="grid-content">
                           <el-input class="input-lilv input-lilvTwo" v-model="input1_3" placeholder="总回报"></el-input>
                       </div></el-col> 
                    </el-row>
                    <el-row>
                       <el-col :span="24"><div class="grid-content">
                           <el-input class="input-lilv" v-model="input1_4" placeholder="请输入百分比"></el-input>
                       </div></el-col>
                    </el-row>

                    <el-row>
                       <el-col :span="24"><div class="grid-content">
                           <el-button class="resetBtn" @click="resetClick(1)">重置</el-button>
                       </div></el-col>
                    </el-row>

                </div><!--//end formBox1-->
            </div>

              <div class="forWrap">
                <div class="formBox formBox2">
                    <el-row>
                       <el-col :span="24"><div class="grid-content">
                           <h3 class="fb-title">定期存款客户尊享</h3>
                       </div></el-col>
                    </el-row>
                    <el-row>
                       <el-col :span="24"><div class="grid-content">
                           <el-input class="input-lilv" v-model="input2_1" placeholder="定期存款客户尊享"></el-input>
                       </div></el-col>
                    </el-row>
                    <el-row>
                       <el-col :span="9"><div class="grid-content">
                           <el-input class="input-lilv input-lilvTwo" v-model="input2_2" placeholder="纽元"></el-input>
                       </div></el-col>
                       <el-col :span="4"><div class="grid-content">&nbsp;</div></el-col>
                       <el-col :span="9"><div class="grid-content">
                           <el-input class="input-lilv input-lilvTwo" v-model="input2_3" placeholder="总回报"></el-input>
                       </div></el-col>
                    </el-row>
                    
                    <el-row>
                       <el-col :span="24"><div class="grid-content">
                           <el-input class="input-lilv" v-model="input2_4" placeholder="请输入百分比"></el-input>
                       </div></el-col>
                    </el-row>

                    <el-row>
                       <el-col :span="24" class="input-lilv"><div class="grid-content">
                           <el-button class="resetBtn" @click="resetClick(2)">重置</el-button>
                       </div></el-col>
                    </el-row>

                    
                    <el-row>
                       <el-col :span="10"><div class="grid-content">
                          <el-button class="downBtn">下载模板</el-button>
                       </div></el-col>
                        <el-col :span="4"><div class="grid-content">
                          &nbsp;
                       </div></el-col>
                       <el-col :span="10"><div class="grid-content">
                          <input type="file" name="file" style="display:none;" ref="tableFile" @change="loadExcel" />
                          <el-button class="downBtn" @click="uploadTable">上传表格</el-button>
                       </div></el-col>
                    </el-row>

                </div> <!--//end formBox2-->
              </div>
            
            <div class="submitBtnBox">
              <el-button class="tiJiaoBtn" @click="submit">提交</el-button>
            </div>  
              

          </div><!-- //end  lilv-content-->


      </div>
    </div>
</template>




<script type="text/ecmascript-6">
    
    import xlsx from 'xlsx';

    //console.log(xlsx);

    export default{
        data(){
            return{
                title: '',
                url: this.$baseUrl+'/api/interestRate',
                input1_1: '',
                input1_2: '',
                input1_3: '',
                input1_4: '',
                input2_1: '',
                input2_2: '',
                input2_3: '',
                input2_4: '',
                templateInfo: []
            }
        },
        props: {

        },
        methods:{
            submit(){
              
               //1. 获取参数
              
               var attr = {
                'title_left': this.input1_1,
                'currency_left': this.input1_2,
                'item_left': this.input1_3,
                'data_left' : this.input1_4,
                'title_right': this.input2_1,
                'currency_right': this.input2_2,
                'item_right': this.input2_3,
                'data_right' : this.input2_4,
               };

               //2.验证规则
               var re = /(^\s*)|(\s*$)/g;
               var item = '';

              for(var key in attr){
                 item = attr[key].replace(/(^\s*)|(\s*$)/g, "");
                 console.log(item)
                 if(item!==0 && !item){
                    this.$message.error('亲，表单内容不能为空，请仔细检查！');
                    return;
                  }else{
                    attr[key] = item;
                  }
              }


                //3. 向服务器发送数据
               this.$axios.post(this.url,attr).then((res)=>{
                    console.log(res);
                    //success
                    if(res.data.status == 'success'){
                        this.$message({
                          message: '恭喜你，利率信息提交成功！',
                          type: 'success'
                        });
                    }else{
                        this.$message.error('提交数据失败!');
                    }
                }); 

            },
            //上传表格
            uploadTable(){
              //1. 打开选择文件窗口
              this.$refs.tableFile.click();

              //2. 监听表单事件
            },
            writeForms(){
              var datas = this.templateInfo;
              console.log(datas);
              var num = 0;
              for(var i=0;i<datas.length;i++){
                num = 0;
                for(var item in datas[i]){
                  num++;
                  this['input'+(i+1)+'_'+num] = datas[i][item]; 
                }
              } 
            },
            //重置表单数据
            resetClick(num){
              for(var i=1;i<5;i++){
                this['input'+num+'_'+i] = '';
              }
            },
            //加载excel表格
            loadExcel(){
              var file = this.$refs.tableFile.files[0];
              var reader = new FileReader();
              var This = this;
              var rABS = false; //是否将文件读取为二进制字符串
              var wb = null; //读取文件结果

              if(rABS) {
                  reader.readAsArrayBuffer(file);
              } else {
                  reader.readAsBinaryString(file);
              }

              reader.onload = function(e){
                var data = e.target.result;
                
                if(rABS)
                {
                    wb = xlsx.read(btoa(This.fixdata(data)), {type: 'base64'});
                } 
                else 
                {
                    wb = xlsx.read(data, {type: 'binary'});
                }

                //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
                //wb.Sheets[Sheet名]获取第一个Sheet的数据 [wb.SheetNames[0]]

               
                for(var item in wb.Sheets){
                  This.templateInfo.push(xlsx.utils.sheet_to_json(wb.Sheets[item])[0])
                }

               //填入表单中                
               This.writeForms();
              }
            },
            fixdata(data) { //文件流转BinaryString
                var o = "",
                    l = 0,
                    w = 10240;
                for(; l < data.byteLength / w; ++l)o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
                o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
                return o;
            }
        },
        created(){

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
        width:100%;min-height:575px;border-radius:10px;border:1px solid #DEDEDE;position:relative
        .formBox
            width:320px;min-height:300px;float:left;
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
        .formBox1
            margin-left:330px;
        .formBox2
            margin-left:170px;         
            .downBtn
              width:100%;
        .resetBtn
            width:100%
        .submitBtnBox
          wh(100%,50px);clear:both;padding-top:50px; padding-bottom:50px;      
          .tiJiaoBtn
              wh(280px,50px);display:block;color:#fff;font-size:20px;bgColor(#ED1C24);margin:0 auto;
              &:hover
                  opacity:0.8; 
    

                                          
</style>

<style scoped type="text/css">
      @media screen and (max-width:1650px){
        .forWrap{
              width: 100%;min-height: 330px;position: relative;
        }
        .forWrap:nth-of-type(2){
              min-height: 410px;
        }
        .forWrap .formBox{
          margin:0 auto;position: absolute;left:50%;-webkit-transform: translateX(-50%);
          -moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);transform: translateX(-50%);
        }
      } 
</style>