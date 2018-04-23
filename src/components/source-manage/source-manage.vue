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
                            <el-button plain class="rbtn uploadFile" @click.native="uploadFileBtn" >上传文件</el-button>
                            <el-button plain class="rbtn newFolder" @click.native="newFolder" >新建文件夹</el-button>
                            <el-button plain class="rbtn newFolder" @click.native="backLast" v-show="backBtnShow">返回上一级</el-button>
                        </div>
                    </el-col>
                </el-row>
              </el-header>
              <el-main>
                  <div class="scrollWrap" ref="menuScroll">
                      <div class="cwrap">
                          <folder-source @movefile="moveFileFn" :sources="folderData" :allsources="datas"></folder-source>
                          <video-source @movefile="moveFileFn" :videos="videoData"></video-source>
                          <image-source @movefile="moveFileFn" :images="imageData"></image-source>
                      </div>
                  </div>
              </el-main>
            </el-container>
        </div>
        
     <el-dialog  :visible.sync="dialogTableVisible" width="30%">
         <el-table :data="folderSelctsData" width="500">
          <el-table-column property="name" label="文件夹名称" align="center"></el-table-column>
          <el-table-column property="name" label="点击选择" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="handleDelete(scope.row)">选择</el-button>
              </template>
          </el-table-column>
        </el-table>
      </el-dialog>        

    </div>
</template>


<script>
    
    import BScroll from 'better-scroll';
    import FolderSource from '@/base/folder-source/folder-source';
    import VideoSource from '@/base/video-source/video-source';
    import ImageSource from '@/base/image-source/image-source';
    import datas from 'common/js/data.js';
    import tool from 'common/js/tool.js';
    import dataSearch from './data-search.js';
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import qs from 'qs';

    export default{
        data(){
            return {
                input: '',
                searchValue : '',
                imageData: [],
                folderData: [],
                folderSelctsData: [],
                videoData: [],
                datas: datas,
                webDatas: [],
                url_1: this.$baseUrl + '/api/webget',
                url_2: this.$baseUrl + '/api/callbackUpload',
                url_cnew_folder: this.$baseUrl + '/api/createFolder',
                url_get_sources_by_dir: this.$baseUrl + '/api/getFile',
                url_get_search_sources: this.$baseUrl + '/api/searchFile',
                move_url: this.$baseUrl+'/api/move',
                move_folder_url: this.$baseUrl+'/api/moveFolder',
                //ossData : null,
                progress: 0,
                onoff: true,
                cdir: '/',
                dialogTableVisible: false,
                gridData: [],
                moveFoder: {},
                backBtnShow: false
            }
        },
        methods:{
            //初始化绑定 better-scroll 
            _initScroll() {
              this.menuScroll = new BScroll(this.$refs.menuScroll, {
                click: true
              })
            },
            //向数据库请求 初始化资源管理的所有数据
            initSources(pdir){
                this.$axios.post(this.url_get_sources_by_dir,{
                    dir: pdir ? pdir : this.dir
                }).then((res)=>{
                    //console.log(pdir,this.dir);
                    //success
                    if(res.data.status == 'success'){
                        //console.log(res.data)
                        this.setSource(res.data.data);

                        //检测是否在根目录
                        this.checkDir();

                    }else{
                        this.$message({
                          type: 'danger',
                          message: '获取资源失败!'
                        });
                    }
                });
            },
            //搜索请求数据
            searchClick(){
                let svalue = this.searchValue.replace(/(^\s*)|(\s*$)/g, "");
               
                //验证是否为空
                if(svalue == ''){
                    this.initSources();
                }else{
                    this.$axios.post(this.url_get_search_sources,{
                    fileName: svalue
                    }).then((res)=>{
                        
                        if(res.data.status == 'success'){
                            this.setSource(res.data.data);

                        }else{
                            this.$message.error(res.data.message);
                        }
                    });
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
                
                //添加假数据
                this.source.push(objs);

                //向服务器发送新建文件夹请求
                var attr = {'name':value,'dir':this.dir};
                this.newFolderRequest(attr);

              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '取消输入'
                });       
              });
            },
            //新建文件夹请求
            newFolderRequest(attr){
                this.$axios.post(this.url_cnew_folder,attr).then((res)=>{
                    
                    //success
                    if(res.data.status == 'success'){
                        this.$message({
                          type: 'success',
                          message: '新建文件夹成功!'
                        });
                        //再次重新加载数据
                        this.initSources();
                    }

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
            //获取钥匙
            getKey(ev){

                let file = ev.srcElement.files[0];

                //获取正常post的参数
                tool.getUploadAttr(file,this.dir,(attr)=>{
                    //console.log(attr);
                    //请求钥匙数据
                    this.$axios.post(this.url_1,qs.stringify(attr),{
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'
                          }
                    }).then((res)=>{
                        this.ossData = res.data;

                        //开始上传文件
                        this.uploadsRequest(res.data,file);

                    }).catch((err)=>{
                        console.log(err);
                    })

                });
            },
            //点击按钮 文件执行上传
            changeUploadFile(ev){

                //获取钥匙 上传文件
                this.getKey(ev);
   
            },
            //向数据库发送文件数据
            uploadsRequest(data,file){

                let form = new FormData();   
                var fname = tool.randomString(12) + tool.getBackname(file);

                var attr = {
                    'OSSAccessKeyId': data.accessid, 
                    'callback' : data.callback,
                    'key' : data.dir+fname,
                    'policy': data.policy,
                    'signature': data.signature,                  
                    'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
                    'file': file,   
                };

                for(var key in attr){
                    form.append(key,attr[key]);
                }

                var config = {
                    onUploadProgress: progressEvent => {
                        var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
                        this.progress = complete
                        
                        if(this.onoff){
                           /* this.$message({
                              message: '正在上传请稍等……',
                              duration: 500
                            });*/
                            this.onoff = false;
                        }
                        

                        if(this.progress == '100%'){
                            this.onoff = true;
                            this.$notify({
                              title: '成功',
                              message: '恭喜你，上传文件成功！',
                              type: 'success',
                              duration: 1500
                            });
                            //重新加载数据
                            this.initSources();
                        }

                    },
                    headers: {
                        'Content-Type':'multipart/form-data'
                    }
                }

                this.$axios.post(data.host,form,config).then((res)=>{
                    console.log(res);
                    //重新刷新当前页面数据
                    this.initSources();
                }).catch((err)=>{
                    console.log(err);
                });
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

                //console.log('line271'+this.source)
                    
                this.source.forEach((item)=>{
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
            //移动文件到文件夹
            moveFileFn(attr){
                this.dialogTableVisible = true;
                this.folderSelctsData = [];

                console.log(attr)
                //设置数据
                if(attr.fileType != 2){
                    for(var i=0;i<this.folderData.length;i++){
                        this.folderSelctsData[i] = this.folderData[i];
                    }
                    console.log(this.folderSelctsData);
                }else{
                    var data = [];
                    for(i=0;i<this.folderData.length;i++){
                        data[i] = this.folderData[i];
                    }
                    for(i=0;i<data.length;i++){
                        if(data[i]['id'] == attr.fileId){
                            data.splice(i,1);
                        }
                    }
                    this.folderSelctsData = data;
                    this.moveFoder['fileName'] = attr.fileName;
                    this.moveFoder['dir'] = attr.dir;
                }

                this.moveFoder['fileType'] = attr.fileType;
                this.moveFoder['fileId'] = attr.fileId;
            },
            //点击选择按钮 选择文件夹
            handleDelete(attr){
                //1. 关闭dialog
                this.dialogTableVisible = false;
                //2. 拼凑dir
                var cdir = this.dir+attr.name+'/';

                //3. 移动图片,视频request请求
                this.requestCdir(cdir);
            },
            //获取当前dir文件夹信息 向服务器发送移动文件和文件夹请求
            requestCdir(cdir){

                var config = {};
                var url = '';

                if(this.moveFoder.fileType != 2){
                    //配置请求host和参数
                    config = {
                        'fileId': this.moveFoder.fileId,
                        'dir': cdir
                    };
                    url = this.move_url;
                }else{
                    config = {
                        'newDir': cdir,
                        'foldName': this.moveFoder.fileName,
                        'dir': this.moveFoder.dir
                    };
                    url = this.move_folder_url;
                }

                this.$axios.post(url,config).then((res)=>{
                   if(res.data.status == 'success'){
                      console.log(res.data)
                      this.$message({message: res.data.message,type: 'success'});
                       this.initSources();
                   }
                }).catch((err)=>{
                    this.$message({message: res.data.message,type: 'error'});
                });
            },
            //返回上一级
            backLast(){
                var diss = this.dir;
                var arr = diss.split('/');
                var newArr = arr.splice(0,arr.length-2);
                var newDir = newArr.join('/')+'/';
                this.setDir(newDir);
                this.initSources(newDir);
            },
            //检测是否在根目录
            checkDir(){
              if(this.dir != '/'){
                this.backBtnShow = true;
              }else{
                this.backBtnShow = false;
              }
            },
            ...mapMutations({
                setSource: 'source',
                setDir: 'dir'
            })
        },
        watch: {
          source: {
            deep: true,
            handler (v) {
              this.handleSource();
            }
          },
          dir:{
            deep: true,
            handler (v) {
              if(v != '/'){
                this.backBtnShow = true;
              }else{
                this.backBtnShow = false;
              }
            }
          }
        },
        computed: {
            ...mapGetters(['source','dir'])
        },
        mounted(){
            this.initScrollHeight();
        },
        created(){

            //向数据库拿数据
            this.initSources();
            //初始化better-scroll
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