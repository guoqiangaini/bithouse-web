<template>
  <el-row>
  <el-container>
    <el-aside width="155px">
        <el-menu
          default-active="1"
          @open="handleOpen"
          @close="handleClose"
          background-color="white"
          text-color="black"
          active-text-color="#ffd04b" v-for="(item,index) in menu"
          :key="item.menu_id"
          class="menu"
          router>
          <el-submenu index="1" v-if="item.child_menus && item.child_menus.length>0" >
            <template slot="title">
              <span>{{item.menu_name}}</span>
            </template>
            <el-menu-item-group v-for="(items,index) in item.child_menus" class="group"  >
              <el-menu-item :index="items.menu_id" style="width: 100px">{{items.menu_name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="16" v-else>
            <template slot="title">
              <span>{{item.menu_name}}</span>
            </template>
            <el-menu-item-group v-for="(items,index) in item.child_menus" class="group"  >
              <el-menu-item :index="items.menu_name" style="width: 100px">{{items.menu_name}}</el-menu-item>
            </el-menu-item-group>
          </el-menu-item>
        </el-menu>
    </el-aside>
    <el-main style="padding-top:0">
        <router-view></router-view>
    </el-main>
  </el-container>
  </el-row>
</template>
<script>
  import headly from '../head/Header.vue'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import {mapState} from 'vuex'
  import ElAside from "element-ui/packages/aside/src/main";
  export default {

    components: {
      ElAside,
      ElCol,
      ElRow,
      headly},
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    computed: {
      //获取请求的会员信息展示在页面
      menu() {
        return this.$store.state.menu;
      }
    },
    created(){
       this.$store.dispatch("sMenu")
    }
  }
</script>
<style scoped>
  .menu{
    width: 150px;
    text-align: left;
  }
  .personal{
    width: 15%;
    background-color: red;
  }
  .list{

  }
  .group>ul>li{
    min-width: 150px;
  }

  .user{
    background-color: #1b96a9;
  }
  .user img {
    width: 61px;
    height: 61px;
margin: 0;
    padding: 10px 0 10px 0;
    vertical-align: middle;
    text-align: center;
  }
  .sizer{
    color: #101010;
  }
</style>
