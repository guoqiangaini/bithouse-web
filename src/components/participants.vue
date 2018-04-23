<template>
  <!--帮砍人员列表-->
  <el-row>
    <ul>
      <el-button size="mini" type="info" @click="previousPage">返回</el-button>
    </ul>
  <el-table
    ref="multipleTable"
    :data="allPersonInfo"
    border
    tooltip-effect="dark"
    size="mini"
    style="width: 100% ;"
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
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 40, 60]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total" class="page" style="text-align: right;margin-top: 20px">
    </el-pagination>
  </el-row>
</template>
<script>
  import qs from 'qs'
  export default {

    data(){
      return{
        createId:'',
        allPersonInfo:[],
        //分页字段
        total:0,
        currentPage:1,
        pageSize:20,
      }
    },
    methods:{
      previousPage(){
        this.$router.push({name: 'initiatingPersonnel'})
      },
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
      //分页查询
      handleSizeChange(val) {
        this.pageSize = val
        this.queryParticipants()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.queryParticipants()
      },
      //查询帮砍人员
      queryParticipants(){
        var that=this
        var allPersonData={
          create_id:this.createId,
          count:true,
          orderby:"",
          pageindex:this.currentPage,
          pagesize:this.pageSize,
        }
        var allPersonParams={
          methodUrl: 'bitHouse/bitHouseGetBargainByCreateId',
          jsonParam: qs.stringify(allPersonData)
        }
        this.$axios.postRequest(allPersonParams).then(function (res) {
          //成功之后处理逻辑
          that.allPersonInfo = res.data.list
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      }
    },
    mounted() {
      //获取上一页传递的参数，并保存到本地
      var that=this
      if (this.$route.params.allPersonInfo!= null) {
        var allPersonTables = this.$route.params.allPersonInfo
        var createIds = this.$route.params.createId
        var lastTotals=this.$route.params.lastTotal
        sessionStorage.setItem("allPersonDataList", JSON.stringify(allPersonTables));
        sessionStorage.setItem("createIds", JSON.stringify(createIds));
        sessionStorage.setItem("lastTotals", JSON.stringify(lastTotals));
        that.allPersonInfo = allPersonTables
        that.createId = createIds
        that.total=lastTotals
      } else {
        this.allPersonInfo = JSON.parse(sessionStorage.getItem("allPersonDataList"))
        this.createId = JSON.parse(sessionStorage.getItem("createIds"))
        this.total = JSON.parse(sessionStorage.getItem("lastTotals"))
      }
      that.queryParticipants()
    }
  }
</script>

<style scoped>
  ul {
    float: left;
    margin: 0 0 10px 0;
  }
</style>
