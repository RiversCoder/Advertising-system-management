<template>
    <div class="help">
        <div class="logoBox">
            <img src="~common/images/logo@250x250.png" />
            <h3>SKYLANDER</h3>
            <a class="logoSite" href="http://www.skylandertech.com" target="_blank">www.skylandertech.com</a>
        </div>

        <div class="areaBox">
            <h4 class="ab-website">lora@skylandertech.com</h4>
            <p class="ab-area">深圳市龙岗区五和大道星河WORLD-A 1303A</p>
        </div>
    </div>
</template>

<script>
    export default{

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    
    @import "~common/stylus/variable" 
    @import "~common/stylus/mixin"
    
    .help
        widh:100%;height:100%;position:relative;

    .logoBox
        text-align:center;padding-top:112px;
        .logoImg
            wh(250px,250px);border-radius:10px;
            
        .logoTitle
            hh(23px);padding-top:38px;font-size:23px;color:#333;
        .logoSite
            text-decoration:none;hh(17px);padding-top:13px;font-size:17px;color:#3F80E1;
            &:hover
                text-decoration:underline;
        
    .areaBox
        width:100%;height:72px;text-align:center;position:absolute;bottom:80px;    
    
        .ab-website
            hh(17px);font-size:17px;color:#333;
        .ab-area
            hh(17px);font-size:17px;color:#999;padding-top:37px;    
</style>