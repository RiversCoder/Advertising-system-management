<template>
    <div class="source-container">
        <el-container>
          <el-header class="header-file">Header</el-header>
          <el-main>
              <div class="con-container">
                  
              </div>
          </el-main>
        </el-container>
    </div>
</template>


<script>
    
    import Scroll from '@/base/scroll/scroll';

    export default{
        data(){
            return {

            }
        },
        components:{
            Scroll
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    
    @import "~common/stylus/variable" 
    @import "~common/stylus/mixin"
    
    .source-container
        width:100%;height:100%;
        .header-file
            height:108px;width:100%;
    .con-container
         overflow-y:auto;width:100%;height:auto;background:red;           
    .el-main
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    .el-header
        background-color: none;
        color: none;
        text-align: center;
        line-height: 108px;  
     
</style>