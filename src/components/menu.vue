<template>

  <el-row>
    <headly></headly>
    <el-container style="height:90%">
      <el-aside width="155px" style="background-color:rgb(242, 242, 242)">
        <el-menu
          :default-active="activeMenu"
          background-color="#f2f2f2"
          text-color="black"
          active-text-color="#1b96a9"
          class="menu"
          :unique-opened="false"
          :router="true" style="text-align: center">
          <template v-for="(item,index) in menu">
            <el-menu-item style="padding: 0;" :index="''+item.menu_url"  v-if="item.child_menus && item.child_menus.length===0">
              <span slot="title">{{item.menu_name}}</span>
            </el-menu-item>
            <el-submenu :index="''+item.menu_url" v-else="item.child_menus && item.child_menus.length>0" >
              <span slot="title">{{item.menu_name}}</span>
              <el-menu-item unique-opened :index="''+items.menu_url" v-for="(items,index) in item.child_menus" :key="items.menu_url" style="width:100px">{{items.menu_name}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-main style="padding-top:10px">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-row>
</template>
<script>
  import headly from "../loginAndRegister/Header.vue";
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import { mapState } from "vuex";
  import ElAside from "element-ui/packages/aside/src/main";
  export default {
    data() {
      return {
        activeMenu: ""
      };
    },
    components: {
      ElAside,
      ElCol,
      ElRow,
      headly
    },
    mounted() {
      this.initMenu()
    },
    methods: {
      initMenu(){
        this.activeMenu = this.$route.path.replace("/", "");
      }
    },

    computed: {
      //获取菜单
      menu() {
        return this.$store.state.menu;
      }
    },
    created() {
      //初始化菜单
      this.$store.dispatch("sMenu");

    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'initMenu'
    },
  };
</script>
<style scoped>
  div,
  p,
  ul,
  li,
  o,
  tbody,
  tfoot,
  thead,
  fieldset,
  legend {
    margin: 0;
    padding: 0;
  }
  .menu{
    width: 154px;
    text-align: left;
    font-size: 40px;
    font-weight: 600;
    /* height: 100%; */
  }
  .personal {
    width: 15%;
    background-color: red;
  }
  
  .group>ul>li{
    min-width: 150px;
  }

  .user {
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
  .sizer {
    color: #101010;
  }
  /*.el-menu-item{*/
  /*font-size:18px;*/
  /*}*/
  /*.el-submenu{*/
  /*font-size:18px;*/
  /*}*/
</style>
