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
                    <el-button plain class="rbtn uploadFile" @click.native="backLast" v-show="backBtnShow">返回上一级</el-button>
                </div>
            </el-col>
        </el-row>
      </el-header>

      <el-main>
            <div class="cwrap" ref="cwrap">
                <div>
                  <list-view @freshPage="freshData" :folderExist="true" :folderSources="folderData"></list-view> 
                  <list-view :rs="$route.query.direct"  :videoExist="true" :videoSources="videoData"></list-view>
                  <list-view :rs="$route.query.direct"  :imageExist="true" :imageSources="imageData"></list-view>
               </div>
            </div>
      </el-main>
   </div>
</template>




<script type="text/ecmascript-6">
    
    import ListView from '@/base/list-view/list-view';
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    /*import datas from 'common/js/data';*/
    import tool from 'common/js/tool';
    import BScroll from 'better-scroll';

    export default{
        data(){
            return{
              searchValue: '',
              folderData: [],
              videoData: [],
              imageData: [],
              selectVideoId: [],
              selectImageId: [],
              backBtnShow: false,
              fileId: [],
              url_get_sources_by_dir: this.$baseUrl + '/api/getFile',
              get_all_files: this.$baseUrl+'/api/getAllFileInfo', 
              url_get_search_sources: this.$baseUrl + '/api/searchFile',
              dir: '/',
              existData: [],
              render_success: false
            }
        },
        methods:{
            //初始化绑定 better-scroll 
            _initScroll() {
              var options = {}; 
              options.scrollbar = true  //wheel: false
              options.click = true
              this.menuScroll = new BScroll(this.$refs.cwrap,options)
            },
            //向数据库请求 初始化资源管理的所有数据
            initSources(pdir){
                
                this.$axios.post(this.url_get_sources_by_dir,{
                  dir: pdir ? pdir : this.dir
                }).then((res)=>{
                    
                    if(res.data.status == 'success'){
                        
                        //获取当前目录下的数据
                        this.setSource(res.data.data);

                        //检测是否在根目录 显示隐藏返回上一级按钮
                        this.checkDir();

                        //分配数据
                        this.init();

                        //初始化被选择的数据
                        this.initSelectData();

                        this.render_success = Math.random();

                    }else{
                        this.$message({
                          type: 'danger',
                          message: '获取资源失败!'
                        });
                    }
                });
            },
            //点击搜索
            searchClick(){

            },
            init(){
              var arr = this.source;
              
              //清空数据
              this.folderData = [];
              this.imageData = [];
              this.videoData = [];
              
              arr.forEach((item)=>{
                  //console.log(item);
                  switch(item.fileType){
                      case 2 :
                          this.folderData.push(item);
                      break;
                      case 0 :
                          this.imageData.push(item);
                      break;
                      case 1 :
                          this.videoData.push(item);
                      break;    
                  }
              });
            },
            //上一步
            lastBtn(){

              //当前页面直接后退

              this.$router.back(-1);
            },
            //下一步
            nextBtn(){
              //跳转到拖拽面板页面
              this.$router.push({path:'order',query:{direct:this.$route.query.direct}})    
            },
            ...mapMutations({
              setSource: 'source',
              setSelect: 'select',
              setSdir: 'sdir'
            }),
            countHeight(){
              var box = this.$refs.cwrap;
              var h = document.body.offsetHeight - 108;
              box.style.height = h + 'px';
            },
            //返回上一级
            backLast(){

                //重新当前目录是否有数据更新
                //tool.checkIsUpdate('cc-item','cactive',this.source,this.$route.query.direct)

                //跳转目录
                var diss = this.dir;
                var arr = diss.split('/');
                var newArr = arr.splice(0,arr.length-2);
                var newDir = newArr.join('/')+'/';
                this.dir = newDir;
                this.initSources(newDir);
            },
            //重新加载数据
            freshData(pdir){
              //保存当前的
              
              this.initSources(pdir);
              this.dir = pdir;
            },
            //检测是否在根目录
            checkDir(){
              if(this.dir != '/'){
                this.backBtnShow = true;
              }else{
                this.backBtnShow = false;
              }
            },
            //初始化已经被选中的数据
            initSelectData(){
                var boxs = null;
                var timer = null;

                if(this.render_success){
                    timer = setTimeout(()=>{
                      this.existData = tool.lget('file_list_'+this.$route.query.direct);
                      boxs = document.getElementsByClassName('cc-item');
                      //清除所有
                      for(var m=0;m<boxs.length;m++){
                        boxs[m].classList.remove('cactive');
                      }
                      if(!this.existData){
                        return;
                      }
                      //添加当前
                      for(var i=0;i<this.existData.length;i++){
                        for(var j=0;j<boxs.length;j++){
                          if(this.existData[i]['id'] == boxs[j].dataset.id){
                            boxs[j].classList.add('cactive');
                          }
                        }
                      }
                      clearTimeout(timer);
                    },800);
                }
            }
        },
        watch:{
          render_success:function(nw,ow){
            this.initSelectData();
          }
        },
        computed:{
          ...mapGetters(['source'])
        },
        created(){
          //默认加载根目录的数据
          this.initSources();
          //加载滚动盒子
          this.$nextTick(() => {
            this._initScroll()
          });
        },
        mounted(){
          
          //配合滚动计算高度
          this.countHeight();

          //判断是否已经有数据被选择
          //console.log(tool.lget('file_list_'+this.$route.query.direct));
          
          if(tool.lget('file_list_'+this.$route.query.direct)){
            this.existData = tool.lget('file_list_'+this.$route.query.direct);
              
            //初始化已经选中状态的数据
            this.initSelectData();
          
          }

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
        width:100%;height:auto;overflow:hidden; 
    .el-main
      padding:0;padding-left:20px;box-sizing:border-box;                          
</style>