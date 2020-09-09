<template>
  <div class="home">
    <el-container>
      <!--侧边菜单栏  -->
      <el-aside width="200">
        <!-- logo位置 -->
        <h1 class="logo" style="height:60px;">logo</h1>
        <el-menu  class="el-menu-vertical-demo"  :collapse="false" :router="true">
          <el-menu-item index="/Welcome">
            <i class="el-icon-menu"></i>
            <span slot="title">管理首页</span>
          </el-menu-item>
          <el-submenu index="/StudentManger">
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span slot="title">学员管理</span>
            </template>
              <el-menu-item index="/StudentItem">
                <i class="el-icon-folder-opened"></i>
                <span slot="title">学员项目</span>
              </el-menu-item>
              <el-menu-item index="/StudentItem">
                <i class="el-icon-notebook-2"></i>
                <span slot="title">学员资料</span>
              </el-menu-item>
              <el-menu-item index="/StudentItem">
                <i class="el-icon-office-building"></i>
                <span slot="title">学员宿舍</span>
              </el-menu-item>
          </el-submenu>
          <el-menu-item index="/Attendance">
            <i class="el-icon-notebook-1"></i>
            <span slot="title">考勤管理</span>
          </el-menu-item>
          <el-menu-item index="/Statistics">
            <i class="el-icon-s-data"></i>
            <span slot="title">数据统计</span>
          </el-menu-item>
          <el-menu-item index="/Mine">
            <i class="el-icon-s-custom"></i>
            <span slot="title">我的中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部部分 -->
        <el-header>
          <!-- 左侧部分 -->
          <!-- 中间部分 -->
          <!-- 右侧部分 -->
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6"><div class="grid-content">左</div></el-col>
            <el-col :span="6"><div class="grid-content">英雄管理系统</div></el-col>
            <el-col :span="6">
              <div class="grid-content right">
                <div class="header">
                  <el-avatar :size="40" fit="fit" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2818263918,1469537934&fm=26&gp=0.jpg"></el-avatar>
                </div>
                <div class="welcome"><span>欢迎您:</span></div>
                <div class="signer"><span>{{$store.state.userInfo.nickname}}</span></div>
                <div class="quit"><span @click="quit">退出</span></div>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <!-- 主体部分 -->
        <el-main>
          <!--主页的路由页面  -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container> 
  </div>
</template>
<script>
// import subMenu from "../../components/subMenu"
import {getLoginLog} from "@/api";
export default {
    // data(){
    //   return {
    //     userInfo:
    //   }
    // },
      mounted(){
        getLoginLog()
        .then(res=>{
          console.log(res);
        })
      },
      methods: {
        quit(){
          console.log(111);
          localStorage.removeItem("lol-token");
          this.$router.push("/login")
        }
      }
};
</script>
<style>
  /* 侧边栏样式 */
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  /* 头部样式 */
  .el-col {
    border-radius: 4px;
    line-height: 60px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .grid-content {
    border-radius: 4px;
  }
  /* 头部右边 */
  .right{
    display: flex;
    justify-content:center;
  }
  .right span{
    margin-left: 10px;
  }
  .right span:first-child{
    margin-top: 10px;
  }
  .quit{
    text-decoration: underline;
    cursor: pointer;
    color:cyan;
  }
  .signer{font-weight: bolder;color:tomato;}
  .el-menu .el-menu-item{padding:0;}
  .el-menu-vertical-demo li{text-align: left;}
  /* .el-submenu{padding: 0;} */
  /* 大体布局 */
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

