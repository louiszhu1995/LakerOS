<template>
  <div class="home">
    <el-container>
      <!--侧边菜单栏  -->
      <el-aside width="200">
        <!-- logo位置 -->
        <h1 class="logo" style="height:60px;">logo</h1>
        <el-menu  class="el-menu-vertical-demo"  
                  :collapse="isCollapse"
                  :default-active="$route.path"
                  text-color="#4e5bf8"
                  ref="sideMenu"
                  active-text-color="#E47833">
            <subMenu :sideMenu="$store.state.sideMenu"></subMenu>
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
                <div class="signer"><span @click="$router.push('/Mine')">{{$store.state.userInfo.nickname}}</span></div>
                <div class="quit"><span @click="quit">退出</span></div>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <!-- 主体部分 -->
        <el-main>
          <!-- 面包屑 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item,index) in crumb" 
                                :key="index"  
                                :to="{ path: item.path || '/Welcome'}">
                  {{item.meta.name ||"首页" }}
            </el-breadcrumb-item>
          </el-breadcrumb>
          <!--主页的路由页面  -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container> 
  </div>
</template>
<script>
import subMenu from "../../components/subMenu";
import { mapState } from "vuex"
export default {
      data(){
          return {
              isCollapse:false
          }
      },
      computed:{
        // 映射
        ...mapState(["sideMenu","crumb"])
      },
      components: {
        subMenu
      },
      methods: {
        quit(){
          localStorage.removeItem("lol-token");
          // 退出时刷新页面
          window.location.reload()
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
  .signer{
    font-weight: bolder;
    color:tomato;
    cursor: pointer;
    text-decoration: underline;
  }
  .el-menu .el-menu-item{padding:0;}
  .el-menu-vertical-demo li{text-align: left;}
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
    background-color:white;
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

