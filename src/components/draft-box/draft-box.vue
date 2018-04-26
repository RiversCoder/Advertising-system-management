<template>
    <div class="source-container">
        <div class="sc-wrap" >
            <el-container >
              <el-header class="header-file" style="height:108px">
                  <el-row>
                    <el-col :span="24">
                        <div class="grid-content">
                            <el-button plain class="rbtn uploadFile" @click="goupRequest">上线</el-button>
                            <el-button plain class="rbtn newFolder" @click="deleteRequest">删除</el-button>
                        </div>
                    </el-col>
                </el-row>
              </el-header>
              <el-main>
                  <div class="scrollWrap" ref="menuScroll">
                      <div v-show="folderDatas.length==0" style="font-size:16px;color:#333;height:60px;line-height:60px;text-indent:30px;">暂无节目资源，请前往节目控制发布并收藏节目！</div>
                      <div class="cwrap">
                          <list-view :folderSources="folderDatas" :folderExist="true"></list-view>
                      </div>
                  </div>
              </el-main>
            </el-container>
        </div>
    </div>
</template>


<script scoped >
    
    import Scroll from '@/base/scroll/scroll';
    import BScroll from 'better-scroll';
    import ListView from '@/base/list-view/list-view';
    import {mapGetters, mapMutations, mapActions} from 'vuex';

    export default{
        data(){
            return {
                input: '',
                title: '草稿箱',
                listType: 'draft',
                get_drap_box_url: this.$baseUrl + '/api/getShow',
                delete_drap_box_url: this.$baseUrl + '/api/deleteShow',
                go_up_url: this.$baseUrl + '/api/pushShow',
                folderDatas: [],
                items: []
            }
        },
        methods:{
            _initScroll() {
              var options = {}; 
              options.scrollbar = true  //wheel: false
              options.click = true
              this.menuScroll = new BScroll(this.$refs.menuScroll,options)
            },
            //初始化草稿箱数据
            initProgramData(){
                this.folderDatas = [];
                this.$axios.post(this.get_drap_box_url).then((res)=>{
                    if(res.data.status == "success"){
                        for(var i=0;i<res.data.data.length;i++){
                            this.folderDatas.push({
                                'id': res.data.data[i]['id'],
                                'name': res.data.data[i]['created_at'],
                                'showContent': res.data.data[i]['showContent']
                            });

                        }
                        
                        setTimeout(()=>{
                            //绑定删除事件
                            this.deletePrograms();
                        },300)
                    }
                })
            },
            //删除节目
            deletePrograms(){
                var items = document.getElementsByClassName('cc-item');
                var This = this;
                
                for(var i=0;i<items.length;i++){

                    items[i].onclick = function(ev){

                        for(var j=0;j<items.length;j++){
                            items[j].classList.remove('cactive');
                        }

                        this.classList.toggle('cactive');
                    }
                }
            },
            //上线节目请求
            goupRequest(){
                //遍历要选择的
                var items = document.getElementsByClassName('cc-item');

                //获取要删除的文件
                var idArr = [];
                var shows = '';
                for(var i=0;i<items.length;i++){
                    if(items[i].classList.contains('cactive')){
                        idArr.push(items[i].dataset.id);
                        shows = this.folderDatas[i].showContent;
                    }
                }

                if(idArr.length > 1){
                    this.$message({
                      message: '不能同时上线多个节目,请指定一个节目上线!',
                      type: 'warning',
                      showClose: true
                    });
                    return;
                }

                //发出请求
                this.$axios.post(this.go_up_url,{
                    directorie: shows
                }).then((res)=>{
                    if(res.data.status == "success"){
                       this.$message({
                          message: res.data.message,
                          type: 'success',
                          showClose: true
                        });
                    }
                })
            },
            //发出删除节目请求
            deleteRequest(){

                //遍历要选择的
                var items = document.getElementsByClassName('cc-item');

                //获取要删除的文件
                var idArr = [];
                for(var i=0;i<items.length;i++){
                    if(items[i].classList.contains('cactive')){
                        
                        this.$axios.post(this.delete_drap_box_url,{
                            'showId': items[i].dataset.id
                        }).then((res)=>{
                            if(res.data.status == "success"){
                               this.$message({
                                  message: res.data.message,
                                  type: 'success',
                                  showClose: true
                                });

                               //重新加载数据！
                               this.initProgramData();
                            }
                        })
                        break;
                    }
                }

                
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
            setTimeout(()=>{
                this.deletePrograms();
            },300)
        },
        created(){
            this.$nextTick(() => {
              this._initScroll()
            });
            this.initProgramData();
        },
        components:{
            Scroll,
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