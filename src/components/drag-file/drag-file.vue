<template>
   <div class="con-container">
      <el-header class="header-file" style="height:108px">
          <el-row>
            <el-col :span="12">
                <div class="grid-content">
                   <h3 class="drag-cc-title">素材拖拽排序</h3>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content">
                    <p style="display:none"><input name="file" type="file" value="选择" size="20" id="fileUpload1" accept="image/png,image/gif,image/jpeg,video/mp4,application/ogg, audio/ogg,video/3gpp" @change ="changeUploadFile($event)" /></p>  
                    <el-button plain class="rbtn uploadFile" @click.native="nextBtn">提交</el-button>
                    <el-button plain class="rbtn newFolder" @click.native="lastBtn">上一步</el-button>
                </div>
            </el-col>
        </el-row>
      </el-header>

      <el-main>
            <div class="cwrap" id="cwrap" ref="cwrap">
                <div>
                   <item-view :sources="selectData"></item-view>
                </div>
            </div>
      </el-main>
   </div>
</template>

<script type="text/ecmascript-6">
    
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import ItemView from '@/base/item-view/item-view';
    import datas from 'common/js/data';
    import tool from 'common/js/tool';
    import tools from 'common/js/lgc_tools';
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
              fileId: [],
              selectData: [],
              source: datas
            }
        },
        methods:{
            //初始化绑定 better-scroll 
            _initScroll() {
              this.menuScroll = new BScroll(this.$refs.cwrap, {
                click: true
              })
            },
            //初始化数据
            init(){
               //console.log(this.source);
              //console.log(this.selectid);
              this.selectData = [];
              for(var i=0;i<this.selectid.length;i++){
                for(var j=0;j<this.source.length;j++){
                  if(this.selectid[i] == this.source[j].id){
                    this.source[j]['order'] = i;
                    this.selectData.push(this.source[j]);
                  }
                }
              }

              for(var i=0;i<this.selectData.length;i++){
                this.selectData[i]['order'] = i;
              }

              this.setResults(this.selectData);
            },
            ...mapMutations({
              setSelect: 'select',
              setResults: 'results'
            }),
            arrangeSource(){

            },
            initPos(cindex,dindex){
              
              console.log(cindex,dindex);
              //重新计算位置
              this.countPos(cindex,dindex);

              //替换DOM位置
              var parent = document.getElementById('item-drag-box-wrap');
              var childs = parent.getElementsByClassName('item-drag-box');
              //console.log(cindex,dindex)
              parent.insertBefore(childs[cindex],childs[dindex]);
              
              //重新排列位置
              this.arrangePos(parent,'item-drag-box');
              //重新绑定
              this.bindDrag();  
            },
            countPos(ci,di){
              
              var data = [];
              for(var i=0;i<this.selectData.length;i++){
                data[i] = this.selectData[i];
              }
              
              var newData = [];
              var i = 0,j = 0;

              newData = data;
              if(ci > di){
                newData.splice(di,0,data[ci]);
                newData.splice(ci+1,1);
              }else{
                newData.splice(di,0,data[ci]);
                newData.splice(ci,1);
              }
              for(var i=0;i<newData.length;i++){
                this.selectData[i] = newData[i];
              }
              this.setResults(this.selectData);
            },
            arrangePos(parent,clsn,initBoolean){
              var childs = parent.getElementsByClassName(clsn);
              var bh = document.body.offsetHeight;
              var hh = 108;
              var row = 0;
              parent.style.height = bh-hh + 'px';
              row = Math.floor(parent.offsetWidth/(childs[0].offsetWidth+10));

              if(!childs[0]){
                return;
              }

              for(var i=0;i<childs.length;i++){
                childs[i].style.left = (i%row) * (childs[i].offsetWidth +10)  + 'px';
                childs[i].style.top = Math.floor(i/row) * ( childs[i].offsetHeight + 10 ) + 'px';
              }
            },
            bindDrag(){

              let box = this.$refs.cwrap;
              var childs = box.getElementsByClassName('item-drag-box');
              
              if(!childs[0]){
                return;
              }

              for(var i=0;i<childs.length;i++){
                //设置拖拽
                childs[i].index = i;
                tools.drag(childs[i],childs,'desktopIcons',(cindex,index)=>{
                    this.initPos(cindex,index);
                });
              }

            },
            //上一步
            lastBtn(){
              this.$router.back(-1);
            },
            //提交
            nextBtn(){

              //首先把数据保存然后提交到数据库

              //跳转到拖拽面板页面
              this.$router.push({
                path: '/program-production/work-time/'+this.$route.query.direct,
                query:{
                  results: this.selectData
                }
              });
            }
        },
        watch:{
          
        },
        computed:{
          ...mapGetters(['selectid'])
        },
        created(){
          this.init();
          this.$nextTick(() => {
            this._initScroll()
          });
        },
        mounted(){
          this.arrangePos(this.$refs.cwrap,'item-drag-box');
          this.bindDrag();
        },
        components:{
          ItemView
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
        .drag-cc-title
          hh(108px);color:#333;font-size:20px;position:relative;text-indent:30px;
          &:before
            content: '';width: 9px;height: 24px;background-color: #ed1c24;position: absolute;left: 0px;top: 41px;
        .searchbox
            width:60%;float:left;margin-top:34px;
            input
              @extend .btnStyle;text-indent:44px;bgImg('~common/images/source/search@2x.png');background-position:10px 7px;background-size:24px 23px;  
        .searchbtn
            width:20%;float:left;@extend .btnStyle;width:128px;hh(40px);mg(20px,34px);
        .rbtn
            float:right;margin-right:20px;margin-top:34px;width:128px;hh(40px);@extend .btnStyle;
            &:hover
              opacity:0.8;
        .uploadFile
            bgColor(#ED1C24);color:#fff;
      .cwrap
        width:100%;position:relative;                       
</style>