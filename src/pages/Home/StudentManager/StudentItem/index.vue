<template>
<div class="product">
    <!-- 搜索框 -->
    <div class="search">
      <template>
        <el-select  v-model="searchValue"
                    filterable 
                    clearable 
                    remote
                    reserve-keyword 
                    @change="searchTextChange"
                    @blur="searchBlur"
                    :remote-method="remoteMethod"
                    placeholder="请输入姓名,如果不更新,点击右侧搜索按钮">
            <el-option v-for="(item) in searchList"
                     :key="item.sId"
                     :label="item.name"
                     :value="item.name">
            </el-option>
        </el-select>
      </template>
      <!-- 搜索按钮 -->
      <el-button type="primary" @click="searchButton" icon="el-icon-search"  plain></el-button>
      <!-- 添加按钮 -->
      <el-button type="primary" @click="addStu">添加项目</el-button>
    </div>
    <!-- 班级选择 -->
    <div class="select-class">
      <!-- 框框 -->
      <el-form>
        <el-form-item label="选择班级:">
            <el-select  v-model="classes" 
                        @change="classChange" 
                        @visible-change="classVisible"
                        filterable 
                        placeholder="请选择">
                    <el-option label="全部" value="all"></el-option>
                    <el-option v-for="(item,index) in classOptions"
                       :key="index"
                       :label="item"
                       :value="item"></el-option>
            </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- table表格 -->
    <div class="stu-table">
        <el-table :data="stuData" border style="width:100%;line-height:0" v-loading="loading">
            <el-table-column
                prop="headimgurl" label="头像" width="80" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.headimgurl" width="70" alt="">
                </template>
            </el-table-column>
            <el-table-column
                prop="name" label="姓名" width="180" align="center">
            </el-table-column>
            <el-table-column
                prop="class" label="班级" width="180" align="center">
            </el-table-column>
            <el-table-column
                prop="productUrl" label="项目" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template scope="{row}">
                    <el-button type="primary" @click="$router.push({path:'/StudentManager/StudentInformation'})" class="btn" icon="el-icon-view">查看</el-button>
                    <el-button type="primary" @click="editStu(row)" class="btn" icon="el-icon-edit">编辑</el-button>
                    <el-button type="primary" @click="deleteStu(row)" class="btn" icon="el-icon-delete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <!-- 分页器 -->
    <div class="pagination">
        <el-pagination background layout="prev,pager,next" :total="30" > </el-pagination>
    </div>
    <!-- dialog弹出框 -->
    <lol-dialog></lol-dialog>
</div>
</template>
<script>
import dialog from "../../../../components/dialog";
import { getStuList,delStu,searchStu,getClasses } from "@/api";
  export default {
      components: {
          "lol-dialog":dialog
      },
    data() {
      return {
        params:{
            class:""
        },
        dialogFormVisible: false,
        formLabelWidth: '120px',
        classes:"",
        classOptions:[],
        stuForm: {
            name: '',
            productUrl: '',
            headimgurl: '',
            class: '',
            age: '',
            city: '',
            degree: '',
            description: ''
        },
        classOptions:"",
        searchList:"",
        searchValue:"",
        blurSearchValue:"",
        stuData: [],//表格数据
        loading:true,//表格加载动画控制
        // options:[]
      }
    },
    methods: {
// 增加学员
        addStu(){
        // 弹出dialog
        this.$bus.$emit("showDialog")
        },
// 删除学员
        deleteStu(row){
            if(row && row.sId){
                // 删除
                // 让用户确认是否删除
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'
                })
                .then(() => {
                // 确认删除后在调用删除
                // 打开加载动画
                // const loading = this.$loading({
                //     lock: true,
                //     text: 'Loading',
                //     spinner: 'el-icon-loading',
                //     background: 'rgba(0, 0, 0, 0.7)'
                // });
                    delStu(row.sId)
                    .then(res=>{
                        if(res.data && res.data.state){                      
                            this.$message.success("删除成功")
                            // window.location.reload()//遇到问题：刷新页面，才会熊页面上删掉
                            // loading.close()//关闭动画
                        }else{
                            this.$message.warning("删除失败")
                        }
                    })
                    .catch(err=>{ this.$message.error("删除出错")} )
                    })
                .catch(() => {//用户取消删除调用
                    this.$message('已取消删除');          
                });
            }else{
                this.$message.error("没有传入row对象")
                return
            }
        },
// 编辑学员
        editStu(row){
            this.$bus.$emit("editStuEvent",row)
        },
// 更新表格数据
        updateStuTable(params){
            this.loading = true;
            getStuList(params)
            .then(res=>{
                if(res.data && res.data.state){
                    this.stuData = res.data.data;
                    this.loading = false
                }else{
                    this.$message.warning("数据获取失败");
                    this.loading = false;
                }
            })
            .catch(err=>{
                this.$message.error("数据获取错误或网络错误");
                this.loading = false;
            })
        },
// 搜索框选中值发生变化的时间
        searchTextChange(searchText){
            this.loading = true;//加载动画
            this.searchText = searchText;
            //再次调用搜索接口
            let key = searchText
            searchStu(key)
            .then(res=>{
                if(res.data && res.data.state){
                    this.searchList = res.data.data
                    // 更改表格数据对象
                    this.stuData = res.data.data;
                    this.loading = false;//关闭动画
                }else{
                     this.$message.warning("搜索失败了")
                }
            })
             .catch(err=>{
                this.$message.error("搜索出错啦")
            })
        },
        remoteMethod(query){
            // 键盘弹起的时候获取输入值，赋值第三方变量进行输入框内容存储
            this.blurSearchValue = query
            let key = query;
            searchStu(key)
            .then(res=>{
                if(res.data && res.data.state){
                    this.searchList = res.data.data
                }else{
                    this.$message.warning("搜索失败了")
                }
            })
            .catch(err=>{
                this.$message.error("搜索出错啦")
            })
        },
// 失去焦点时，保持输入框的内容
        searchBlur(){
            // 将存储好的输入框值，设置给select组件
            this.searchValue=this.blurSearchValue
        },
// 搜索按钮搜索逻辑
        searchButton(){
            let key = this.searchValue;
            searchStu(key)
            .then(res=>{
                if(res.data && res.data.state){
                    this.searchList = res.data.data
                    // 更改表格数据对象
                    this.stuData = res.data.data;
                    this.loading = false;//关闭动画
                }else{
                    this.$message.warning("搜索失败了")
                }
            })
            .catch(err=>{
                this.$message.error("搜索出错啦")
            })
        },
// 班级选择框展开出发的逻辑
        classVisible(isVisible){
            if(!isVisible){ return }
            // 发送获取班级请求
            getClasses()
            .then(res=>{
                if( res.data && res.data.state ){
                    this.classOptions = res.data.data
                }
            })
        },
// 选择班级操作:
        classChange(query){
            this.params = query === "all"? {}:{class:query}
            this.updateStuTable(this.params)
        }
    },
    mounted(){
// 页面加载 获取表格数据
        this.updateStuTable()
        this.$bus.$on("updateStuTable",()=>{
            this.updateStuTable()
        })
    }
  }
</script>
<style scoped>
    .search {
        line-height: 60px;
        text-align: left;
        margin: 20px 0;
    }
    .select-class {
        line-height: 40px;
        text-align: left;
        margin-bottom: 20px;
    }
    .stu-table .btn {
        width: 60px;
        height: 25px;
        padding: 0;
    }
    .pagination {
        margin-top: 20px;
    }
</style>