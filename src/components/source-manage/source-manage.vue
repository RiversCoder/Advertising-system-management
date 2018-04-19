<template>
    <div class="source-container">
        <div class="sc-wrap" >
            <el-container >
              <el-header class="header-file" style="height:108px">
                  <el-row>
                    <el-col :span="12">
                        <div class="grid-content">
                           <el-input v-model="input" placeholder="Search" class="searchbox"></el-input>
                           <el-button plain class="searchbtn">搜索</el-button>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-button plain class="rbtn uploadFile" >上传文件</el-button>
                            <el-button plain class="rbtn newFolder" >新建文件夹</el-button>
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
    
    import Scroll from '@/base/scroll/scroll';
    import BScroll from 'better-scroll';
    import FolderSource from '@/base/folder-source/folder-source';
    import VideoSource from '@/base/video-source/video-source';
    import ImageSource from '@/base/image-source/image-source';
    import datas from './data.js'
    import {mapGetters, mapMutations, mapActions} from 'vuex';


    export default{
        data(){
            return {
                input: '',
                imageData: [],
                folderData: [],
                videoData: [],
                datas: datas
            }
        },
        methods:{
            _initScroll() {
              this.menuScroll = new BScroll(this.$refs.menuScroll, {
                click: true
              })
            },
            initScrollHeight(){
                
                let wrap = this.$refs.menuScroll;
                let winHeight = document.body.offsetHeight;
                let headHeight = 108;

                wrap.style.height = (winHeight - headHeight) + "px";
            },
            handleSource(){
                // /let sous = null;
                
                this.setSource = datas;

                console.log(this.source);

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
        computed: {
            ...mapGetters(['source'])
        },
        mounted(){
            this.initScrollHeight();
            setTimeout(()=>{
                console.log(this.source);
            },200);
        },
        created(){
            this.$nextTick(() => {
              this._initScroll()
            });
            console.log(this.source);
            this.handleSource();
        },
        components:{
            Scroll,
            FolderSource,
            VideoSource,
            ImageSource
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    
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