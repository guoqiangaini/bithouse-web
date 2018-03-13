<template>
  <el-row>
   <el-header class="wai" style="height: 90px;border-bottom: 1px solid black">
    <el-col :span="3" class="user"> <img src="https://pro.modao.cc/uploads3/images/1751/17519267/raw_1520225943.png" ></el-col>
    <el-col :span="7" class="title">多维国际跆拳道综合管理系统</el-col>
    <el-col :span="7" ><el-button size="mini" style="margin: 25px 0 0 0">切换</el-button></el-col>
    <el-col :span="3" class="font">今天是：2018年1月30号</el-col>
    <el-col :span="1" ><img src="https://pro.modao.cc/uploads3/images/1761/17614382/raw_1520413953.png" style="width: 32px;height: 32px;margin: 20px 0 0 0"> </el-col>
    <el-col :span="3" ><img src="https://pro.modao.cc/uploads3/images/1761/17614380/raw_1520413951.png" style="width: 32px;height: 32px;margin: 20px 0 0 0"> </el-col>
  </el-header>
  </el-row>
</template>
<style scoped>
  .top{
    margin: 20px 0 0 30px;
  }
  .back{

  }
  .user{
   width: 8%;
    background-color: #1b96a9;
  }
  .user img {
    width: 61px;
    height: 61px;


    padding: 10px 0 10px 0;
    vertical-align: middle;
    margin-left: 20%;

  }
  .title{
    color: #101010;
    font-size: 28.0px;
    font-weight: 600;
    margin: 20px 0 0 40px;

  }
  .font{
    color: #1b96a9;
    font-size: 14px;
    margin: 30px 0 0 0;
  }
</style>
