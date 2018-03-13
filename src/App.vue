<template>
  <el-row>
  <el-container id="app" direction="vertical">
    <headly/>
    <router-view/>
  </el-container>
  </el-row>
</template>

<script>
  import headly from './head/Header.vue'
  export default {
    name: 'App',

    components:{
      headly,
    }
  }
</script>

<style>
  div{margin: 0;padding:0}
  ul{
    margin: 0;padding: 0;
  }
  li {list-style-type:none;}
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: #2c3e50;

  }
</style>
