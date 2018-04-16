<template>
    <header class="header-panel">
        <span class="h-logo">
            <img src="./logo.png" class="h-logo-img" />
        </span>
        <span class="h-user">
            
        </span>
    </header>
</template>

<script>
    export default{
        
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    
    @import "~common/stylus/variable"

    .header-panel
        width:100%;height:50px;background-color:$common-color;position:relative;
        .h-logo
            position:absolute;left:30;top:5;
            .h-logo-img
                height:40px;transform:translate3d(20px,5px,0);
</style>