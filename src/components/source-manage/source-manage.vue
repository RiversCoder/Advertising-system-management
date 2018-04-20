<template>
    <div class="source-container">
        <div class="sc-wrap" >
            <el-container >
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
                            <el-button plain class="rbtn uploadFile" @click.native="uploadFileBtn">上传文件</el-button>
                            <el-button plain class="rbtn newFolder" @click.native="newFolder">新建文件夹</el-button>
                        </div>
                    </el-col>
                </el-row>
              </el-header>
              <el-main>
                  <div class="scrollWrap" ref="menuScroll">
                      <div class="cwrap">
                          <folder-source :sources="folderData" :allsources="datas"></folder-source>
                          <video-source :videos="videoData"></video-source>
                          <image-source :images="imageData"></image-source>
                      </div>
                  </div>
              </el-main>
            </el-container>
        </div>
    </div>
</template>


<script>
    
    import BScroll from 'better-scroll';
    import FolderSource from '@/base/folder-source/folder-source';
    import VideoSource from '@/base/video-source/video-source';
    import ImageSource from '@/base/image-source/image-source';
    import datas from './data.js';
    import dataSearch from './data-search.js';
    import {mapGetters, mapMutations, mapActions} from 'vuex';


    export default{
        data(){
            return {
                input: '',
                searchValue : '',
                imageData: [],
                folderData: [],
                videoData: [],
                datas: datas,
                webDatas: []
            }
        },
        methods:{
            //初始化绑定 better-scroll 
            _initScroll() {
              this.menuScroll = new BScroll(this.$refs.menuScroll, {
                click: true
              })
            },
            //搜索数据
            searchClick(){
                let svalue = this.searchValue.replace(/(^\s*)|(\s*$)/g, "");;

                if(svalue == ''){
                    this.setSource(datas);
                }else{
                    this.setSource(dataSearch);
                }
            },
            //新建文件夹
            newFolder(){
                this.$prompt('请输入文件夹名称', 'DBS温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(({ value }) => {

                var objs = {
                    'name' : value,
                    'type' : 'folder',
                    'content' : false,
                    'dir' : '/',
                    'src' : ''
                };

                this.source.push(objs);

                this.$message({
                  type: 'success',
                  message: '新建文件夹成功!'
                });

              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '取消输入'
                });       
              });
            },
            //初始化滚动包裹盒子的高度
            initScrollHeight(){
                
                let wrap = this.$refs.menuScroll;
                let winHeight = document.body.offsetHeight;
                let headHeight = 108;

                wrap.style.height = (winHeight - headHeight) + "px";
            },
            //上传文件按钮
            uploadFileBtn(){
                var fileInput = document.querySelector('#fileUpload1');
                fileInput.click();
            },
            //文件上传
            changeUploadFile(ev){
                let file = ev.srcElement.files[0];
                let form = new FormData();
                form.append('file',file);

                let url = '';
                let attr = {
                    'file': ''
                } 
               
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };  //添加请求头
                
            },
            //集中分发处理
            handleSource(){
                
                //清空数据
                this.folderData = [];
                this.imageData = [];
                this.videoData = [];

                if(this.source.length == 0){
                    this.setSource(datas);
                }
                    
                this.source.forEach((item)=>{
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
            ...mapMutations({
                setSource: 'source'
            })
            
        },
        watch: {
          source: {
            deep: true,
            handler (v) {
              this.handleSource();
            }
          }
        },
        computed: {
            ...mapGetters(['source'])
        },
        mounted(){
            this.initScrollHeight();
        },
        created(){
            this.$nextTick(() => {
              this._initScroll()
            });
            this.handleSource();
        },
        components:{
            FolderSource,
            VideoSource,
            ImageSource
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    
    @import "~common/stylus/variable" 
    @import "~common/stylus/mixin"
    
     .btnStyle{
        bgColor(#F4F4F4);color:#333;font-size:18px;initp();border-radius:10px;
     }
    

    .source-container
        width:100%;height:100%;min-height:800px;
        
        .header-file
            height:108px;width:100%;border-bottom:2px solid #DEDEDE;
            .searchbox
                width:60%;float:left;
                input
                  @extend .btnStyle;text-indent:44px;bgImg('~common/images/source/search@2x.png');background-position:10px 7px;background-size:24px 23px;  
            .searchbtn
                width:20%;float:left;@extend .btnStyle;width:128px;hh(40px);mg(20px,34px);
            .rbtn
                float:right;margin-right:20px;margin-top:34px;width:128px;hh(40px);@extend .btnStyle;
            .uploadFile
                bgColor(#ED1C24);color:#fff;
                        
    
    .el-main
        background-color:none;color: #333;text-align: left;line-height: none;padding:0;
    .scrollWrap
        width:100%;overflow:hidden;background:#fff;
        .cwrap
            width:100%;height:1600px;box-sizing:border-box;height:auto;background:#fff;padding:0 30px;
    .el-header
        background-color: none;
        color: none;
        text-align: center;
        line-height: 108px;  
     
</style>