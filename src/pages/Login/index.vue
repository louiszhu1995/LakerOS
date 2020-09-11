<template>
<div id="app">
  <div class="bg">
    <div class="left"></div>
    <div class="about">
      <div class="h3">英雄管理系统</div>
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
          <el-form-item label="用户名" prop="username" >
            <el-input type="text" class="input-name" v-model="loginForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" class="input-name" v-model="loginForm.password" @keydown.enter.native="submitForm('loginForm')" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
          </el-form-item>
        </el-form>
    </div>
    <video src="../../assets/images/bg_video.d2d602a9.mp4" muted="muted" autoplay="autoplay"
    loop="loop" preload="auto" class="video"></video>
  </div>
  </div>
  
</template>
<script>
  import { login } from "@/api";

  export default {
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { validator: this.validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: this.validatePassword, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      // 校验用户名的函数
      validateUsername(rule, value, callback){
          if(value !== ""){
            callback()
          }else{
            callback(new Error("请输入用户名"))
          }
      },
      //校验密码的函数 
      validatePassword (rule, value, callback){
         if(value !== ""){
            callback()
          }else{
            callback(new Error("请输入用密码"))
          }
        // 8-18位密码必须由字母、数字组成，区分大小写 
        // let partrn = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/
        // if(partrn.test(value)){
        //     callback()
        //   }else{
        //     callback(new Error("8-18位字母、数字，区分大小写"))
        //   }
      },
      //提交按钮触发的事件函数
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          // 本地校验通过，valid为true,反之为false
          if (valid) {
            // 打开加载动画
             const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            // 本地校验通过，发送登录进页面请求
            let {username,password} = this.loginForm
            login({username,password})
            .then(res=>{
              // console.log(res);
              if(res.data.state){//请求成功了
                let {token} = res.data
                // 将token存到localstorage里
                localStorage.setItem("lol-token",token)
                // 将用户信息存到vuex中
                this.$store.commit("SET_USERINFO",res.data.userInfo)
                localStorage.setItem("userInfo",JSON.stringify(res.data.userInfo))
                 this.$message({
                  showClose: true,
                  message: '登陆成功，正在跳转',
                  type: 'success',
                  center:true,
                  duration:1000
                });
                // 跳转到主页
                this.$router.push("/")
                loading.close()// 关闭动画
              }else{
                 this.$message.error('用户名或密码错误');
                loading.close()//关闭动画
              }
            })
            // 请求失败的操作
          } else {
              console.log('登陆失败!!');
              return false;
        }
      });
      }
    }
  }
</script>
<style>
.bg{
  width: 100%;
  height: 100%;
  background-image:url("../../assets/images/bg.824f963d.jpg");
  overflow: hidden;
  position: relative;
}
.left{
  width: 50%;
  height: 100%;
  background-image: url("../../assets/images/bg2.fc58c850.png");
  background-repeat: no-repeat;
  background-size: 50%;
  opacity: .7;
  background-position: 60% 65%;
  position: absolute;
}
.vodeo{
  position: absolute;
}
.about{
  position: absolute;
  left: 60%;
  top: 15%;
  width: 400px;
  height: 500px;
  background: rgba(0,0,0,.3);
  border-radius: 10px;
  z-index: 9;
}
  .h3{
    text-align: center;
    color:white;
    font:32px/100px "";
    font-weight: bold;
    padding-top: 80px;
    padding-bottom: 20px
  }
  .input-name{
    width: 250px;
  }
  .el-form-item__label{
    color: white;
  }
  .el-button--primary{
    width: 250px;
    background: linear-gradient(90deg,#1596fb,#002dff)
  }
  .el-input__inner{
      background: transparent;
      color: white;
  }
</style>