<template>
  <el-row>
    <ul>
      <el-button size="mini" type="info" @click="previousPage">返回</el-button>
    </ul>
  <!--发起砍价人员列表-->
  <el-table
    ref="multipleTable"
    :data="personInfo"
    border
    tooltip-effect="dark"
    size="mini"
    style="width: 100% ;"
    :headerCellStyle="headerSetStyle"
    :cellStyle="cellSetStyle"
    class="elTableBorder">
    <el-table-column
      align="center"
      prop="origin_price"
      width="80"
      label="原始价格"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="add_price"
      width="80"
      label="砍价总数"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="sub_price"
      width="100"
      label="已砍至价格"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="target_price"
      width="80"
      label="目标价格"

    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="join_sum"
      label="参与人数"
      width="80"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="create_date"
      label="发起时间"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="is_done"
      label="是否完成"
      :formatter="formatValue"
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
    <el-table-column
      align="center"
      prop="address"
      width="260"
      label="收货地址"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="property_type"
      label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="text"
          @click="openDetails(scope.$index, scope.row)">查看帮砍人员</el-button>
      </template>
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
  import axios from "axios";
  import qs from "qs";
  import { mapState } from "vuex";
  import ElCol from "element-ui/packages/col/src/col";
  import ElRow from "element-ui/packages/row/src/row";
    export default {

        data(){
          return{
            lastTotal:0,
            id:'',
            bargainId:'',
            allPersonInfo:[],
            personInfo:[],
            //分页字段
            total:0,
            currentPage:1,
            pageSize:20,
          }
        },
      methods:{
          //返回上一页
        previousPage(){
          this.$router.push('/20')
        },
        formatValue(row, column, cellValue){
          switch(row.is_done) {
            case '0':
              return '未完成';
              break;
            case '1':
              return '完成';
              break;
          }
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
        //分页
        handleSizeChange(val) {
          this.pageSize = val
          this.queryInitiatingInfo()
        },
        handleCurrentChange(val) {
          this.currentPage = val
          this.queryInitiatingInfo()
        },
        //查看所有帮砍价人员信息
        openDetails(index,row){
          var that=this
         that.id=row.id
          var allPersonData={
            create_id:this.id,
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
            that.lastTotal=res.data.totalcount
            that.$router.push({name: 'participants',params:{allPersonInfo:that.allPersonInfo,createId:that.id,lastTotal:that.lastTotal}})
          }, function (res) {
            //失败之后处理逻辑
            console.log("error:" + res)
          })
        },
        // 分页查询发起砍价人员信息
        queryInitiatingInfo(){
          var that = this
          var initiatingInfoData = {
            bargain_id:this.bargainId,
            is_done:'',
            count: true,
            orderby:'',
            pageindex:this.currentPage,
            pagesize:this.pageSize
          }
          var initiatingInfoParams = {
            methodUrl: 'bitHouse/bitHouseGetBargainById',
            jsonParam: qs.stringify(initiatingInfoData)
          }
          this.$axios.postRequest(initiatingInfoParams).then(function (res) {
            //成功之后处理逻辑
            that.personInfo = res.data.list
          }, function (res) {
            //失败之后处理逻辑
            console.log("error:" + res)
          })
        }
      },
      mounted() {
          var that=this
        //获取上一页传递的参数，并保存到本地
        if (this.$route.params.personInfo!= null) {
          var personTables = this.$route.params.personInfo
          var bargainIds=this.$route.params.bargainId
          var twoPageTotals=this.$route.params.twoPageTotal
          sessionStorage.setItem("personTables", JSON.stringify(personTables));
          sessionStorage.setItem("bargainIds", JSON.stringify(bargainIds));
          sessionStorage.setItem("twoPageTotals", JSON.stringify(twoPageTotals));
          that.personInfo = personTables
          that.bargainId=bargainIds
          that.total=twoPageTotals
        } else {
          this.personInfo = JSON.parse(sessionStorage.getItem("personDataList"))
          this.bargainId=JSON.parse(sessionStorage.getItem("bargainIds"))
          this.total=JSON.parse(sessionStorage.getItem("twoPageTotals"))
        }
        that.queryInitiatingInfo()
      }
    }
</script>

<style scoped>
  ul {
    float: left;
    margin: 0 0 10px 0;
  }
</style>
