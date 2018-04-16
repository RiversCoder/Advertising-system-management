<template>
    <div class="loginContainer">
       <el-container>
          <el-header class="header" height="70px">
              <img src="~common/images/logo@2x.png" class="logo" />
          </el-header>
          <el-main class="content">
              <div class="formBox">
                  <form method="get" action="">
                    
                    <h3 class="loginTitle"> 登陆 </h3>
                    
                    <el-input v-model="email" placeholder="Email" type="email" class="inputs" name="user"></el-input>  
                    <el-input v-model="password" placeholder="Password" type="password" class="inputs" name="pw"></el-input> 
                    <el-input  value="Login" type="submit" class="inputs submit" ></el-input>  

<!--                      <input type="text" name="user" placeholder="Email" />
<input type="password" name="password" placeholder="Password" />
<input type="submit" name="submit" value="Login" /> -->

                     <a class="forgetInfo" href="javascript:;">忘记密码?</a>

                  </form>
              </div>
          </el-main>
        </el-container>
    </div>
</template>

<script type="text/javascript">
    export default {
      data() {
        return {
          email: '',
          password: '',
        }
      }
    }
</script>


<style lang="stylus" rel="stylesheet/stylus">
    
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
    

    .loginContainer
        whp(100%,100%);bgColor(#fff);rp();
        
        .header
            whn(100%,70px);border-bottom:12px solid #ED1C24;bgColor(#000);padding:0;box-sizing: content-box;
            .logo
                @extend .block;whn(137px,40px);ab(26%,17px);
        .content
            whp(100%,100%);ab(0,82px);bottom:0;right:0;mpInit();@extend .block; 
            .loginTitle
                height:217px;line-height:280px;text-align:center;font-size:25px;font-weight:bold;color:#333;
            .inputs
                @extend .block; width:356px;margin:0 auto;
                &:nth-of-type(2)
                    margin-top:25px;
                input
                    margin-top:0;height:48px;line-height:48px;border-radius:10px;bgColor(rgba(244,244,244,1));color:#999;border:1px solid #DEDEDE;out-line:none;
            .submit
                height:53px;margin-top:54px;
                    
                .el-input__inner
                        hh(53px);bgColor(#ED1C24);color:#fff;font-size:21px;cursor:pointer;
            .forgetInfo
                @extend .block; width:356px;margin:0 auto;font-size:16px;color:#999;margin-top:19px;text-align:left;text-indent:20px;
                &:hover
                    text-decoration:underline;
    
                                           
</style>

<style type="text/css">
    @media screen and (max-width: 800px){
        .loginContainer .header .logo{
            left:50%;
            margin-left:-66px;
        }
    }
</style>