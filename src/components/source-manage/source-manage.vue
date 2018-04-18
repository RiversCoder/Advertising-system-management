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
                          <folder-source :sources="data"></folder-source>
                          <video-source :videos="videoDatas"></video-source>
                          <image-source :images="videoDatas"></image-source>
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

    export default{
        data(){
            return {
                input: '',
                data: [
                    {name: 'java',status: true},
                    {name:'javaScript',status: false},
                    {name:'曹操',status: true},
                    {name:'孙权',status: false},
                    {name:'刘备',status: true},
                    {name:'孙尚香',status: true},
                    {name:'李白',status: true}
                ],
                videoDatas: [
                    {name: 'java',status: true,src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523966862138&di=5b67169c66a3e51b5d9fa7eac4190c39&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fa1%2F78%2Fd%2F151.jpg'},
                    {name:'javaScript',status: false,src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523966862136&di=4abcaae736a05a2572e4db3a61d461c8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fa1%2F95%2Fd%2F148.jpg'},
                    {name:'曹操',status: true,src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523966862134&di=d1299b430488adda7b9766fb11c95199&imgtype=0&src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F63%2F9d%2F2c%2F639d2c2aa8f71fe6979897b93d37519d.jpg'},
                    {name:'孙权',status: false,src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523966862133&di=0b39b978456b00b4d511e49e46321ce4&imgtype=0&src=http%3A%2F%2Fimg.tupianzj.com%2Fuploads%2Fallimg%2F160317%2F9-16031H11K7.jpg'},
                    {name:'刘备',status: true,src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523966862131&di=de18ab2031afc9a3843bdb9329aa5151&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fa1%2F95%2Fd%2F149.jpg'},
                    {name:'孙尚香',status: true,src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523966862130&di=3de9ff7912d845ace7db0d5cd4482dbe&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fa1%2F98%2Fd%2F206.jpg'},
                    {name:'李白',status: true,src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523966862129&di=fb51ee2432e4f48af76693a2a42a8787&imgtype=0&src=http%3A%2F%2Fwww.wmpic.me%2Fwp-content%2Fuploads%2F2013%2F11%2F2013112717214942.jpg'}
                ]
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
            }
        },
        mounted(){
            this.initScrollHeight();
        },
        created(){
            this.$nextTick(() => {
              this._initScroll()
            });
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