<template>
    <div class="welcome">
        <template>
            <el-table :data="WelcomeData" border style="width: 100%;line-height:0;">
                <el-table-column prop="username" align="center" label="登入账户" width="100"></el-table-column>
                <el-table-column prop="lastLogin.ip" align="center" label="上次登录ip" width="100"> </el-table-column>
                <el-table-column prop="lastLogin.loginTime" align="center" label="上次登录时间"> </el-table-column>
                <el-table-column prop="nowLogin.ip" align="center" label="本次登录ip"> </el-table-column>
                <el-table-column prop="nowLogin.loginTime" align="center" label="本次登陆时间"> </el-table-column>
            </el-table>
        </template>
    </div>
</template>
<script>
import {getLoginLog} from "@/api";
  export default {
    data() {
      return {
        WelcomeData: []
      }
    },
    created(){
        getLoginLog()
        .then(res=>{
            if(res.data && res.data.state){
                this.WelcomeData =res.data.data
            }
        })
    }
  }
</script>
<style scoped>
    .welcome{
        margin-top: 20px;
        width: 100%;
        height: 100%;
        /* background-image: ; */
        /* background-size: 100%; */
        /* background-repeat: no-repeat; */
    }
    main.el-main{
        line-height:0px;
    }
</style>