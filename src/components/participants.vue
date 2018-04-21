<template>
  <!--人员列表-->
  <el-table
    ref="multipleTable"
    :data="allPersonInfo"
    border
    tooltip-effect="dark"
    size="mini"
    style="width: 100% ;"
    :row-click="rowClick"
    :headerCellStyle="headerSetStyle"
    :cellStyle="cellSetStyle"
    class="elTableBorder">
    <el-table-column
      align="center"
      prop="price_sub"
      label="砍价"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="join_date"
      label="参加日期"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="nick_name"
      label="昵称"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="phone_number"
      label="电话"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="user_name"
      label="姓名"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="wechat_no"
      label="微信号"
    >
    </el-table-column>
  </el-table>
</template>

<script>
  export default {

    data(){
      return{
        allPersonInfo:[],
        //分页字段
        total:0,
        currentPage:1,
        pageSize:20,
      }
    },
    methods:{
      //表头样式
      headerSetStyle(){
        return {
          "background-color": "#e5e5e5",
          "color": "#303133",
          "border-color": "#c1c3c9",
          "font-size":"12px"
        }
      },
      //表格样式
      cellSetStyle(){
        return {
          "color": "#303133",
          "border-color": "#c1c3c9",
          "font-size":"12px"
        }
      },
      //分页
      handleSizeChange(val) {
        this.pageSize = val
        this.queryRooms()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.queryRooms()
      },
    },
    mounted() {
      //获取上一页传递的参数，并保存到本地
      if (this.$route.params.allPrsonInfo!= null) {
        var allPersonTables = this.$route.params.allPersonInfo
        sessionStorage.setItem("allPersonDataList", JSON.stringify(allPersonTables));
        that.allPersonInfo = personTables
      } else {
        this.allPersonInfo = JSON.parse(sessionStorage.getItem("allPersonDataList"))
      }
    }
  }
</script>

<style scoped>

</style>
