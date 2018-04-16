<template>

  <div class="menu-container" ref="mcontent" >

     <!--  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <span @mousedown="menuSpread"><el-radio-button :label="false" >展开</el-radio-button></span>
        <span @mousedown="menuCollect"><el-radio-button :label="true">收起</el-radio-button></span>
     </el-radio-group>   -->

      <div class="tac-menu-list" v-show="show">
          <el-row class="tac tac-menu">
            <el-col :span="24">
              <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
                background-color="#364150"
                text-color="#fff"
                :router = true
                active-text-color="#ffd04b">
  
                <el-menu-item index="home">
                    <i class="el-icon-menu"></i>
                    <span slot="title">我的首页</span>
                </el-menu-item>
                
                <!-- 不带下拉菜单的写法 -->  
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
                
                <!--带下拉菜单的写法 el-submenu -->
                <!-- 素材管理 -->    
                <!-- <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-picture"></i>
                        <span>素材管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="3-1">视频</el-menu-item>
                        <el-menu-item index="3-2">图片</el-menu-item>
                        <el-menu-item index="3-3">音频</el-menu-item>
                        <el-menu-item index="3-4">文本</el-menu-item>
                        <el-menu-item index="3-5">视频流</el-menu-item>
                        <el-menu-item index="3-6">媒体列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu> -->
                
               
  
              </el-menu>
            </el-col>
          </el-row>           
      </div>
    
    
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
    
    .menu-container
        width:241px;height:100%;background:$menu-color;transition:.2s ease-in;
        .el-menu-item-group__title
            padding:0
        .el-menu-vertical-demo
            &:not(.el-menu--collapse) 
                width: $menu-width;
                min-height: 400px;
        .el-menu
            border-right:1px solid rgba(0,0,0,0) 
</style>