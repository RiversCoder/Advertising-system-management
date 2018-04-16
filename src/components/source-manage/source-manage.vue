<template>
    <div class="source-container">
        <el-container>
          <el-header class="header-file">Header</el-header>
          <el-main>Main</el-main>
        </el-container>
    </div>
</template>


<script>
    export default{

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable" 
    @import "~common/stylus/mixin"
    
    .source-container
        width:100%;height:100%;
        .header-file
            height:176px;width:100%;    
    .el-main
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    .el-header
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;  
     
</style>