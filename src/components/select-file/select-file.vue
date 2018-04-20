<template>
   <div class="con-container">
      <el-header class="header-file" style="height:108px">
          <el-row>
            <el-col :span="12">
                <div class="grid-content">
                   <el-input v-model="searchValue" placeholder="Search" class="searchbox"></el-input>
                   <el-button plain class="searchbtn" @click.native="searchClick">搜索</el-button>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content">
                    <p style="display:none"><input name="file" type="file" value="选择" size="20" id="fileUpload1" accept="image/png,image/gif,image/jpeg,video/mp4,application/ogg, audio/ogg,video/3gpp" @change ="changeUploadFile($event)" /></p>  
                    <el-button plain class="rbtn newFolder" @click.native="nextBtn">下一步</el-button>
                    <el-button plain class="rbtn newFolder" @click.native="lastBtn">上一步</el-button>
                </div>
            </el-col>
        </el-row>
      </el-header>

      <el-main>
            <div class="cwrap">
                <list-view :folderExist="true" :folderSources="folderData"></list-view>
                <list-view @select1="selectData1" :videoExist="true" :videoSources="videoData"></list-view>
                <list-view @select2="selectData2" :imageExist="true" :imageSources="imageData"></list-view>
            </div>
      </el-main>
   </div>
</template>

<script type="text/ecmascript-6">
    
    import ListView from '@/base/list-view/list-view';
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import datas from 'common/js//data';
    import tool from 'common/js/tool';

    export default{
        data(){
            return{
              searchValue: '',
              folderData: [],
              videoData: [],
              imageData: [],
              selectVideoId: [],
              selectImageId: [],
              fileId: []
            }
        },
        methods:{
            init(){
              var arr = this.source;
              //清空数据
              this.folderData = [];
              this.imageData = [];
              this.videoData = [];
              
              datas.forEach((item)=>{
                  switch(item.type){
                      case 'folder' :
                          this.folderData.push(item);
                      break;
                      case 'image' :
                          this.imageData.push(item);
                      break;
                      case 'video' :
                          this.videoData.push(item);
                      break;    
                  }
              });
            },
            selectData1(v){
              this.selectVideoId = v;
            },
            selectData2(v){
              this.selectImageId = v;
            },
            //上一步
            lastBtn(){
              this.$router.back(-1);
            },
            //下一步
            nextBtn(){
              //获取当前的数据
              this.fileId = tool.concatArray(this.selectVideoId,this.selectImageId);
              this.setSelect(this.fileId);

              //跳转到拖拽面板页面
              this.$router.push({path:'order'})    
            },
            ...mapMutations({
              setSelect: 'select'
            })
        },
        computed:{
          ...mapGetters(['source'])
        },
        created(){
          this.init();
        },
        mounted(){
          
        },
        components:{
          ListView
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

    @import "~common/stylus/variable" 
    @import "~common/stylus/mixin"                    
    
    .btnStyle{
        bgColor(#F4F4F4);color:#333;font-size:18px;initp();border-radius:10px;
     }
    .header-file
        height:108px;width:100%;border-bottom:2px solid #DEDEDE;
        .searchbox
            width:60%;float:left;margin-top:34px;
            input
              @extend .btnStyle;text-indent:44px;bgImg('~common/images/source/search@2x.png');background-position:10px 7px;background-size:24px 23px;  
        .searchbtn
            width:20%;float:left;@extend .btnStyle;width:128px;hh(40px);mg(20px,34px);
        .rbtn
            float:right;margin-right:20px;margin-top:34px;width:128px;hh(40px);@extend .btnStyle;
        .uploadFile
            bgColor(#ED1C24);color:#fff;
      .cwrap
        width:100%;height:auto;                       
</style>