<template>
<div class="product">
    <!-- 搜索框 -->
    <div class="search">
      <template>
        <el-select filterable clearable remote reserve-keyword placeholder="请输入姓名,如果不更新,点击右侧搜索按钮">
            <el-option>
            </el-option>
        </el-select>
      </template>
      <!-- 搜索按钮 -->
      <el-button type="primary" icon="el-icon-search"  plain></el-button>
      <!-- 添加按钮 -->
      <el-button type="primary">添加项目</el-button>
    </div>
    <!-- 班级选择 -->
    <div class="select-class">
      <!-- 框框 -->
      <el-form>
        <el-form-item label="选择班级:">
            <el-select filterable placeholder="请选择">
                    <el-option label="全部" value="全部"></el-option>
                    <el-option></el-option>
            </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- dialog弹出框 -->
    <!-- <el-dialog title="项目添加" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="头像">
                <el-upload class="uploadAvatar"
                   ref="uploadAvatar"
                   action="http://chst.vip/students/uploadStuAvatar"
                   list-type="picture-card"
                   :limit="1"
                   name="headimgurl"
                   :multiple="false">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="stuForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目地址" prop="productUrl">
                <el-input v-model="stuForm.productUrl" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="班级" prop="class">
                <el-input v-model="stuForm.class" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input v-model="stuForm.age" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="城市" prop="city">
                <el-input v-model="stuForm.city" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="学历" prop="degree">
                <el-input v-model="stuForm.degree" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input v-model="stuForm.description" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
    </el-dialog> -->
    <!-- table表格 -->
    <div class="stu-table">
        <el-table :data="stuData" border style="width: 100%">
            <el-table-column
                prop="avatarUrl" label="头像" width="180" align="center">
            </el-table-column>
            <el-table-column
                prop="name" label="姓名" width="180" align="center">
            </el-table-column>
            <el-table-column
                prop="classes" label="班级" width="180" align="center">
            </el-table-column>
            <el-table-column
                prop="productUrl" label="项目" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <el-button type="primary" class="btn" icon="el-icon-view">查看</el-button>
                <el-button type="primary" class="btn" icon="el-icon-edit">编辑</el-button>
                <el-button type="primary" class="btn" icon="el-icon-delete">删除</el-button>
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
import {getStuList} from "@/api";
  export default {
      components: {
          "lol-dialog":dialog
      },
    data() {
      return {
        dialogFormVisible: false,
        formLabelWidth: '120px',
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
        form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
        },
         stuData: [],//表格数据
        loading:false,
        options:[{
            value: "选项1",
            label: "黄金糕"
        },{
            value:"选项2",
            label:"双皮奶"
        }]
      }
    },
    methods: {
        // 更新表格数据
        updateStuTable(){
            getStuList()
            .then(res=>{
                if(res.data && res.data.state){
                    this.stuData = res.data.data
                }else{
                    this.$message.warning("数据获取失败")
                }
            })
            .catch(err=>{
                console.log(err.message);
                this.$message.error("数据获取错误或网络错误")
            })
        }
    },
    mounted(){
        // 页面加载 获取表格数据
            this.updateStuTable()
    }
  }
</script>
<style scoped>
    .el-main{
        line-height: 0px;
        text-align:left;
    }
    .input-text{ width: 300px;}
    .btn-add{ width: 100px; }
    .input-but{margin-left: 10px;}
    .input-text{
        width: 300px;
        height: 34px;
        border: 1px solid #333;
        border-radius:4px;
    }
    .el-button-primary{
        width: 0;
    }
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