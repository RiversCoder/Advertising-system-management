<template>
    <div class="program-control">
        <header class="pc-header">
            <ul class="control-menu">
                <router-link to="/program-production/work-time">
                    <li class="item worktime">工作时间</li>
                </router-link>
                <router-link to="/program-production/nowork-time">
                    <li class="item notworktime">非工作时间</li>
                </router-link>
                <router-link to="/program-production/full-screen">
                    <li class="item fullscreen">全屏</li>
                </router-link>
            </ul>
        </header>
        
        <div class="con-container" ref="content" >
            <div>
                <router-view></router-view>
            </div>
        </div>
        
    </div>
</template>


<script>

    import BScroll from 'better-scroll';
    export default {
        methods:{
            initContainer(){
                let con = this.$refs.content;
                var bh = document.body.offsetHeight;
                var hh = 108;
                con.style.height = ( bh - hh ) + 'px';
            },
            _initScroll() {
              this.menuScroll = new BScroll(this.$refs.content, {
                click: true
              })
            },
        },
        created(){
            /*this.$nextTick(() => {
              this._initScroll()
            });*/
        },
        mounted(){
            this.initContainer();
        }
    }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
    
    @import "~common/stylus/variable" 
    @import "~common/stylus/mixin"
    
    .program-control
        wh(100%,108px);border-bottom:2px solid #DEDEDE;
    
    .control-menu
        wh(610px,108px);margin:0 auto;
        .item
            list-stype:none;float:left;width:171px;hh(110px);color:#333;font-size:18px;text-align:center;cursor:pointer;
        .menuActive
            .worktime
                bgColor(#5E8CEE);color:#fff;
            .notworktime
                bgColor(#5ED07F);color:#fff;
            .fullscreen
                bgColor(#F58E1F);color:#fff; 
        

    .con-container
        overflow:hidden;width:100%;background:#f4f4f4;clear:both;       

</style>