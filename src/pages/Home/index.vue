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
              <el-menu-item index="/StudentManger/StudentItem">学员项目管理</el-menu-item>
             <el-menu-item index="/StudentManger/StudentInformation">学员资料</el-menu-item>
             <el-menu-item index="/StudentManger/StudentDormitory">学员宿舍</el-menu-item>
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
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6"><div class="grid-content">左</div></el-col>
            <el-col :span="6"><div class="grid-content">英雄管理系统</div></el-col>
            <el-col :span="6"><div class="grid-content"></div>右</el-col>
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
export default {
 
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
    line-height: 20px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .grid-content {
    border-radius: 4px;
  }
  .row-bg {
    padding: 10px 0;
    margin-top: 10px;
  }
  /* 大体布局 */
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
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

