<template>
    <div class="subMenu">
        <div v-for="(item,i) in sideMenu" :key="i">
        <!-- 具有子菜单的选项-->
            <el-submenu :index="item.path" v-if="item.children&&item.children.length>0">
                <template slot="title">
                    <i :class="item.meta.icon" style="margin-right:10px;font-size:20px"></i>
                    <span slot="title">{{item.meta.name}}</span>
                </template>
                <el-menu-item-group>
                    <!-- 递归 -->
                    <sub-menu :sideMenu="item.children"></sub-menu>
                </el-menu-item-group>
            </el-submenu>
            <!-- 常规菜单，如果存在拥有二级菜单的一级菜单，则下面不显示-->
            <el-menu-item :index="item.meta.fullPath" v-else  @click="jump(item.name)">
                <i :class="item.meta.icon" style="margin-right:10px;font-size:20px"></i>
                <span slot="title">{{item.meta.name}}</span>
            </el-menu-item>
        </div>
    </div>
</template>

<script>
    export default {
        name:'sub-menu',
        props:{
            sideMenu:{
                type:Array,
                default:()=>[]
            }
        },
        mounted(){
            console.log(this.sideMenu);
        },
        methods: {
            jump(name){
                this.$router.push({name})
            }
        }
    }
</script>
<style>
  i.iconfont {
    color: #4e5bf8;
  }
</style>