<template>
  <!--户型列表-->
  <el-table
    ref="multipleTable"
    :data="personInfo"
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
      prop="origin_price"
      label="原始价格"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="add_price"
      label="砍价总数"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="sub_price"
      label="已砍至价格"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="target_price"
      label="目标价格"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="join_sum"
      label="参与人数"
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
      prop="create_date"
      label="是否完成"
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
      label="收货地址"
    >
    </el-table-column>
  </el-table>
</template>

<script>
    export default {

        data(){
          return{
            allPersonInfo:[],
            personInfo:[],
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
        //查看所有砍价人员信息
        rowClick(row){
          var that=this
          var id=row.id
          var allPersonData={
            create_id:id,
            count:true,
            orderby:"",
            pageindex: 1 ,
            pagesize:20,
          }
          var allPersonParams={
            methodUrl: 'bitHouse/bitHouseGetBargainByCreateId',
            jsonParam: qs.stringify(allPersonData)
          }
          this.$axios.postRequest(allPersonParams).then(function (res) {
            //成功之后处理逻辑
            that.allPersonInfo = res.data.list
            that.$router.push({name: 'participants',params:{allPersonInfo:that.allPersonInfo}})
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
          sessionStorage.setItem("personDataList", JSON.stringify(personTables));
          that.personInfo = personTables
        } else {
          this.personInfo = JSON.parse(sessionStorage.getItem("personDataList"))
        }
      }
    }
</script>

<style scoped>

</style>
