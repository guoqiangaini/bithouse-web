<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import headly from './loginAndRegister/Header.vue'
  import qs from 'qs'
  export  default{
    name: 'App',
    components:{
      headly,
    },
  }
</script>

<style lang="scss">
  ul{
    margin: 0;padding: 0;
  }

  li {list-style-type:none;}
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: #2c3e50;
    width: 100%;
    height: 100%;

  }
  .dialogCancelButton{
    margin-right: 80px !important;
  }

  #app>div{
    height: 100%;
  }
  .elTableBorder{
    border: 1px solid #c1c3c9 !important;

  }
  /*#app>div>div:nth-child(2){*/
   /*height:100%;*/
  /*}*/
  /*以下为覆盖vue原来样式*/
  .el-form-item__label {
    text-align: left !important;
    vertical-align: middle !important;
    float: left !important;
    font-size: 12px !important;
    color: #303133 !important;
    line-height: 40px !important;
    padding: 0 12px 0 0 !important;
    -webkit-box-sizing: border-box !important;
    box-sizing: border-box !important;
  }
  .el-input__inner{
    border: 1px solid #c1c3c9 !important;
  }
  .el-form-item.is-success .el-input__inner{
border-color: #67c23a !important;
}
.el-form-item.is-error .el-input__inner{
border-color: #f56c6c !important;
}
  .el-header{
    padding: 0 !important;
  }
  .el-submenu .el-menu-item{
    min-width: 150px !important;
    padding-right: 0 !important;

  }
  .el-form-item{
    margin: 0 !important;
  }
  .el-tabs__header{
    margin:0 !important;
  }
  .el-dialog__title{
    font-size: 14px !important;
    font-weight: 600 !important;
  }
  .el-dialog--center .el-dialog__body{
    padding: 0 20px 30px 20px !important;
  }
  .el-dialog__body{
    padding: 0 20px 30px 20px !important;
  }
  .el-upload-dragger{
    width: 240px!important;
    height: 180px!important;
  }
</style>
