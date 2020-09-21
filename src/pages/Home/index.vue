<template>
  <div class="home">
    <el-container>
      <!--侧边菜单栏  -->
      <el-aside width="200">
        <!-- logo位置 -->
        <div class="logo"></div>
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
          <el-row type="flex" class="row-bg" justify="space-between">
            <!-- 左侧部分 -->
            <el-col :span="6">
              <div class="grid-content shouqi">
                <i :class="['iconfont',isCollapse?'icon-zhankai':'icon-shouqi']" 
                    @click="isCollapse=!isCollapse"><span></span></i>
              </div>
            </el-col>
            <!-- 中间部分 -->
            <el-col :span="6"><div class="grid-content title">Show Time</div></el-col>
            <!-- 右侧部分 -->
            <el-col :span="6">
              <div class="grid-content right">
                <div class="header">
                  <el-avatar :size="40" fit="fill" src="../../assets/images/erwei.png"></el-avatar>
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
        ...mapState(["sideMenu","crumb","userInfo"])
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
    .shouqi {
    padding-left: 10px;
    text-align: left;
    height: 30px;
  }
  .shouqi i {
    display: block;
    width: 30px;
    height: 20px;
    border-top:2px groove rgb(86, 11, 206);
    border-bottom:2px groove rgb(221, 200, 12);
    margin-top: 20px;
  }
  .shouqi i span{
    display: block;
    width: 30px;
    height: 5px;
    margin-top: 8px;
    background-color: seagreen;
  }
  .icon-shouqi,
  .icon-zhankai {
    font-size: 30px;
    cursor: pointer;
    color: #fff;
  }

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
  .title{
    font-weight: bolder;
    font: 26px/60px "";
    color:rgb(192, 35, 171);
    margin-right:110px!important;
  }
 .logo {
    height: 60px;
    background: linear-gradient(135deg, #4c67ff, #5635df);
    background: url("../../assets/images/laker.jpg") no-repeat 100%/100%,center  ;
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
  .el-menu{  background: linear-gradient(135deg,#804cff61,#dfa335e0) !important;}
  .el-menu-vertical-demo li{text-align: left;}
  /* 大体布局 */
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height: 60px;
    background: linear-gradient(135deg,#804cff61,#dfa335e0) !important;
  }
  .el-aside {
    color: #333;
    text-align: center;
    background: linear-gradient(135deg,#804cff61,#dfa335e0) !important;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    background-color:white;
    background: linear-gradient(135deg,#804cff61,#dfa335e0) !important;
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

