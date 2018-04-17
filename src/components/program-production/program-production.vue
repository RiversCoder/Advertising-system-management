<template>
    <div class="program-control">
        <header class="pc-header">
            <ul class="control-menu">
                <li class="item worktime">工作时间</li>
                <li class="item notworktime">非工作时间</li>
                <li class="item fullscreen">全屏</li>
            </ul>
        </header>
    </div>
</template>


<script>
    export default {

    }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
    
    @import "~common/stylus/variable" 
    @import "~common/stylus/mixin"
    
    .program-control
        wh(100%,108px);border-bottom:2px solid #DEDEDE;
    .control-menu
        wh(690px,108px);background:red;margin:0 auto;
</style>