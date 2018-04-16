<template>

  <div class="menu-container" ref="mcontent" >

     <!--  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <span @mousedown="menuSpread"><el-radio-button :label="false" >展开</el-radio-button></span>
        <span @mousedown="menuCollect"><el-radio-button :label="true">收起</el-radio-button></span>
     </el-radio-group>   -->
      
      <div class="logobox">
          <img src="~common/images/DBS-logo@2x.png" class="logoImg" />
      </div>  
        

      <div class="menuList">
          <ul class="Lists">
              <li class="mitem mitem1">
                  <router-link to="home">
                      <span class="micon"></span>
                      <span class="mtext">About DBS</span>
                  </router-link>
              </li>
              <li class="mitem mitem2">
                  <router-link to="source-manage">
                      <span class="micon"></span>
                      <span class="mtext">资源管理</span>
                  </router-link>
              </li>
              <li class="mitem mitem3">
                  <router-link to="program-production">
                        <span class="micon"></span>
                        <span class="mtext">节目控制</span>
                  </router-link>
              </li>
              <li class="mitem mitem4">
                  <router-link to="draft-box">
                      <span class="micon"></span>
                      <span class="mtext">草稿箱</span>
                  </router-link>
              </li>
              <li class="mitem mitem5">
                  <router-link to="store">
                      <span class="micon"></span>
                      <span class="mtext">存储与账号</span>
                  </router-link>
              </li>
              <li class="mitem mitem6">
                  <router-link to="terminal">
                      <span class="micon"></span>
                      <span class="mtext">利率填写</span>
                  </router-link>
              </li>
              <li class="mitem mitem7">
                  <router-link to="help">
                      <span class="micon"></span>
                      <span class="mtext">帮助</span>
                  </router-link>
              </li>
          </ul>
      </div>


      <div class="outLoginbox">
          <span class="outloginimg"></span>
          <span class="outlogintext">退出登录</span>
      </div>

      <!-- <div class="tac-menu-list" v-show="show">
          <el-row class="tac tac-menu">
            <el-col :span="24">
              <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
                background-color="#F4F4F4"
                text-color="#333"
                :router = true
                active-text-color="#fff">
        
                <el-menu-item index="home">
                    <i class="el-icon-menu-custom"></i>
                    <span slot="title">About DBS</span>
                </el-menu-item>
                
                不带下拉菜单的写法  
                <el-menu-item index="source-manage">
                    <i class="el-icon-time"></i>
                    <span slot="title">资源管理</span>
                </el-menu-item>
      
                <el-menu-item index="program-production">
                    <i class="el-icon-document"></i>
                    <span slot="title">节目制作</span>
                </el-menu-item>
      
                <el-menu-item index="terminal">
                    <i class="el-icon-mobile-phone"></i>
                    <span slot="title">我的终端</span>
                </el-menu-item>
      
                <el-menu-item index="draft-box">
                    <i class="el-icon-delete"></i>
                    <span slot="title">草稿箱</span>
                </el-menu-item>
      
                <el-menu-item index="" @click="exitFunc">
                    <i class="el-icon-close"></i>
                    <span slot="title">退出后台</span>
                </el-menu-item>                
        
              </el-menu>
            </el-col>
          </el-row>           
      </div> -->
    
    
    <!-- 弹出信息组件 -->
    <alert-info :content="alertInfo" @cancelBox="closeInfoBox" :dialogVisible="dialogVisible"></alert-info>

    </div>

</template>

<script>
    
    import AlertInfo from '@/components/alert-info/alert-info'

    export default{
        data(){
            return {
                show : true,
                isRender : true,
                isCollapse: false,
                dialogVisible: false,
                alertInfo : '确认退出后台?'
            }
        },
        created(){
          /*this.dialogVisible= false
          this.alertInfo = '确认退出后台？'*/
        },
        methods: {
          menuSpread(){
            let elem = this.$refs.mcontent
            elem.style.width = '240px'
          },
          menuCollect(){
            let elem = this.$refs.mcontent
            elem.style.width = '64px'
          },
          exitFunc(){
            this.dialogVisible = true;
          },
          closeInfoBox(){
            this.dialogVisible = false;
          }
        },
        computed: {
          
        },
        components:{
          AlertInfo
        }
    }
</script>



<style scoped lang="stylus" rel="stylesheet/stylus">
    

    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
    
    

    .menu-container
        width:$menuwidth;height:100%;background:$menu-color;transition:.2s ease-in;position:absolute;top:0;bottom:0;bgColor(#F4F4F4);
        
        .outLoginbox
            margin-top:100px;wh(100%,50px);hh(50px);text-align:center;cursor:pointer;position:relative;
            .outloginimg
              @extends .block;wh(40px,40px);bgImg('~common/images/exit@2x.png');ab(78px,5px);
            .outlogintext
              font-size:18px;color:#333;

        .logobox
            wh(100%,141px);position:relative;
            .logoImg
                @extends .block;whn(242px,72px);ab(60px,32px);
        .menuList 
            wh(100%,auto);
                
            .mitem
                list-style:none;width:100%;hh(90px);text-align:center;font-size:18px;color:#333;cursor:pointer;position:relative;
                //默认active样式
                .menuActive 
                    bgColor(#ED1C24);color:#fff;     
                a
                    @extends .block;ab(0,0);wh(100%,100%);transition:.5s;color:#333;
                    
                    .micon
                        @extends .block;content:'';wh(38px,38px);ab(70px,24px);     
                &:hover
                    a
                        bgColor(#ED1C24);color:#fff;    
            
            .mitem1
                .menuActive
                    .micon
                        bgImg('~common/images/dbs_copy@2x.png');
                .micon
                    bgImg('~common/images/dbs@2x.png');
                
            .mitem2
                .menuActive
                    .micon
                        bgImg('~common/images/source_copy@2x.png');
                .micon
                    bgImg('~common/images/source@2x.png');
            
            
            .mitem3
                .menuActive
                    .micon
                        bgImg('~common/images/caogao_copy@2x.png');
                .micon
                    bgImg('~common/images/caogao@2x.png');
                        

            .mitem4
                .menuActive
                    .micon
                        bgImg('~common/images/store_copy@2x.png');
                .micon
                    bgImg('~common/images/store@2x.png');
                        

            .mitem5
                .menuActive
                    .micon
                        bgImg('~common/images/source_manage_copy@2x.png');
                .micon
                    bgImg('~common/images/source_manage@2x.png');

            .mitem6
                .menuActive
                    .micon
                        bgImg('~common/images/lilv_copy@2x.png');
                .micon
                    bgImg('~common/images/lilv@2x.png');
                                                                
            .mitem7
                .menuActive
                    .micon
                        bgImg('~common/images/help_copy@2x.png');
                .micon
                    bgImg('~common/images/help@2x.png');

            

        /*.el-menu-item-group__title
            padding:0
        .el-menu-vertical-demo
            &:not(.el-menu--collapse) 
                width: $menuwidth;
                min-height: 400px;
        .el-menu
            border-right:1px solid rgba(0,0,0,0)
            .el-icon-menu-custom
               @extends .block;wh(38px,38px);bgImg('~common/images/dbs_copy@2x.png'); ab(10px,10px);
        .el-menu-item, .el-submenu__title
            height:90px;line-height:90px;text-align:center;font-size:18px;*/     
</style>