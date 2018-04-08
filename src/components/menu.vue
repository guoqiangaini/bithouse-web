<template>

  <el-row>
    <headly></headly>
    <el-container>
      <el-aside width="155px">
        <el-menu
          :default-active="activeMenu"
          :default-openeds="openSubMenuList"
          @open="handleOpen"
          @close="handleClose"
          background-color="#f2f2f2"
          text-color="black"
          active-text-color="#1b96a9"
          class="menu"
          :unique-opened="true"
          :router="true" style="text-align: center">
          <template v-for="(item,index) in menu">
            <el-menu-item style="padding: 0;" :index="''+item.menu_url"  v-if="item.child_menus && item.child_menus.length===0">
              <span slot="title">{{item.menu_name}}</span>
            </el-menu-item>
            <el-submenu  :index="''+item.menu_url"   v-else="item.child_menus && item.child_menus.length>0" >
              <span slot="title">{{item.menu_name}}</span>
              <el-menu-item unique-opened :index="''+items.menu_url" v-for="(items,index) in item.child_menus" :key="items.menu_id" style="width:100px">{{items.menu_name}}</el-menu-item>
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
  import headly from '../loginAndRegister/Header.vue'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import {mapState} from 'vuex'
  import ElAside from "element-ui/packages/aside/src/main";
  export default {
    data(){
      return{

        activeMenu:'',
        openSubMenuList:[]

      }
    },
    components: {
      ElAside,
      ElCol,
      ElRow,
      headly},
    mounted(){
      // this.handleOpen(0,0)
      //进入界面时，重新计算菜单展开的子选项，如果子菜单展开时，重新设置菜单展开，防止子菜单关闭
      var subMenuIndex = localStorage.getItem('subMenuIndex')
      if(subMenuIndex!=null&&subMenuIndex.length>0){
        this.openSubMenuList.push(0,subMenuIndex+'')
      }
      this.$store.dispatch("sMenu")
      this.doSomeThing()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'doSomeThing'
    },
    methods:{
      doSomeThing() {
        this.activeMenu = this.$route.path.replace("/", "")
      },
      handleOpen(index,path){
        this.openSubMenuList.push(0,index+'')
        localStorage.setItem('subMenuIndex',index)
      },
      handleClose(index,path){
        this.openSubMenuList=[]
        localStorage.setItem('subMenuIndex','')
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
      this.activeMenu=this.$route.path.replace("/","")

    }
  }
</script>
<style scoped>


  div,p,ul,li,o,tbody,tfoot,thead,fieldset,legend{
    margin: 0;
    padding: 0;
  }
  .menu{
    width: 150px;
    text-align: left;
    font-size: 40px;
    font-weight: 600;
    height:1812px;
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
  /*.el-menu-item{*/
  /*font-size:18px;*/
  /*}*/
  /*.el-submenu{*/
  /*font-size:18px;*/
  /*}*/

</style>
