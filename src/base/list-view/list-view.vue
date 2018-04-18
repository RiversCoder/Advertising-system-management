<template>
   <div class="con-container">
      <div class="Column">
          <h3 class="column-title">{{title}}</h3>
          <div class="column-content"  v-if=" ctype === 'draft' " >
              <dl class="cc-item" v-for="(item,index) in sources" @click="selectFn(index)">
                  <dt class="cc-item-previewbox">
                      <img :src="item.src" class="cip-img"/>
                      <span class="cip-name">{{item.name}}</span>
                  </dt>
                  <span class="maskImg"></span>
              </dl>
          </div>
          <div class="column-content"  v-if=" ctype === 'video' " >
              <dl class="cc-item" v-for="(item,index) in sources" @click="selectFn(index)">
                  <dt class="cc-item-previewbox">
                        <span class="vcip-img">
                            <img :src="item.src" />
                        </span>
                        <span class="vcip-icon"></span>
                        <span class="vcip-name">{{item.name}}</span>
                  </dt>
                  <span class="maskImg"></span>
              </dl>
          </div>
          <div class="column-content"  v-if=" ctype === 'image' " >
              <dl class="cc-item" v-for="(item,index) in sources" @click="selectFn(index)">
                  <dt class="cc-item-previewbox">
                        <span class="vcip-img">
                            <img :src="item.src" />
                        </span>
                        <span class="vcip-icon icip-icon"></span>
                        <span class="vcip-name">{{item.name}}</span>
                  </dt>
                  <span class="maskImg"></span>
              </dl>
          </div>
      </div>
    </div>
</template>




<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                titles: '图片',
                listType: 'image',
                videoDatas: [
                    {name: 'java',status: true,src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523966862138&di=5b67169c66a3e51b5d9fa7eac4190c39&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fa1%2F78%2Fd%2F151.jpg'},
                    {name:'javaScript',status: false,src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523966862136&di=4abcaae736a05a2572e4db3a61d461c8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fa1%2F95%2Fd%2F148.jpg'},
                    {name:'曹操',status: true,src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523966862134&di=d1299b430488adda7b9766fb11c95199&imgtype=0&src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F63%2F9d%2F2c%2F639d2c2aa8f71fe6979897b93d37519d.jpg'},
                    {name:'孙权',status: false,src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523966862133&di=0b39b978456b00b4d511e49e46321ce4&imgtype=0&src=http%3A%2F%2Fimg.tupianzj.com%2Fuploads%2Fallimg%2F160317%2F9-16031H11K7.jpg'},
                    {name:'刘备',status: true,src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523966862131&di=de18ab2031afc9a3843bdb9329aa5151&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fa1%2F95%2Fd%2F149.jpg'},
                    {name:'孙尚香',status: true,src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523966862130&di=3de9ff7912d845ace7db0d5cd4482dbe&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fa1%2F98%2Fd%2F206.jpg'},
                    {name:'李白',status: true,src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523966862129&di=fb51ee2432e4f48af76693a2a42a8787&imgtype=0&src=http%3A%2F%2Fwww.wmpic.me%2Fwp-content%2Fuploads%2F2013%2F11%2F2013112717214942.jpg'}
                ],
                showMask: true
            }
        },
        props: {
          sources: {
            type: Array,
            default: function(){
                return []
            }
          },
          title:{
            type: String,
            default: ''
          },
          ctype:{
            type: String,
            default: ''
          }
        },
        methods:{
          selectFn(index){
            var items = document.querySelectorAll('.cc-item');
            items[index].classList.toggle('cactive');
          }
        },
        mounted(){

        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

    @import "~common/stylus/variable" 
    @import "~common/stylus/mixin"
    
    .con-container
            width:100%;box-sizing:border-box;background:#fff;padding-bottom:30px;
    .Column
        width:100%;height:auto;initp();
        
        .column-title
            font-size:20px;color:#666;hh(70px);text-indent:28px;position:relative;
            &:before
                content:'';@extend .block;wh(9px,24px);bgColor(#ED1C24);position:absolute;left:0px;top:23px;
        
        .column-content
            wh(100%,auto); display:-webkit-flex;display:flex;-webkit-justify-content:space-between;justify-content:space-between;-webkit-flex-wrap: wrap;flex-wrap: wrap;
            
            .cc-item
                wh(238px,135px);position:relative;box-sizing:border-box;border:1px solid #DEDEDE;border-radius:10px;margin-top:30px;cursor:pointer;
                
                .cc-item-previewbox
                    wh(236px,135px);position:relative;box-sizing:border-box;
                    
                    /* 已经存在的文件夹 */
                    .cip-icon
                        wh(32px,28px);bgImg('~common/images/source/folder_copy.png');abcenterX(50%,59px,-16px);
                    .cip-name
                        wh(100%,16px);hh(16px);font-weight:bold;color:#fff;font-size:16px;abcenterX(0,59px,0);text-align:center;
                    .cip-img
                        wh(236px,135px);border-radius:10px;
                    
                    /* 视频 */
                    .vcip-icon
                        wh(20px,19px);bgImg('~common/images/source/video@2x.png');ab(14px,105px);
                    .vcip-name
                        wh(100%,16px);hh(16px);ab(40px,106px);text-align:left;font-size:16px;color:#fff;
                    .vcip-img
                        wh(100%,100%);ab(0,0);
                        img
                          wh(100%,100%);border-radius:10px;             
                    
                    /* 图片 */
                      
                    .icip-icon
                        wh(19px,19px);bgImg('~common/images/source/img@2x.png');
              .maskImg
                display:block;wh(238px,135px);box-sizing:border-box;border-radius:10px;border:4px solid #5E8CEE;bgColor(#fff);opacity:0;ab(0,0);
            .cactive
                .maskImg
                  opacity:0.7;
                .cc-item-previewbox
                  .cip-name
                    color:#333;
                    
                    
</style>