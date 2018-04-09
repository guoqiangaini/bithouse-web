<template>
  <el-row>
    <ul>
      <el-button size="mini"  type="info" class="btn" @click="back">返回</el-button>
      <el-button size="mini"  type="info" class="btn" @click="exportCh('考级活动','xlsx')">导出</el-button>
    </ul>

    <el-table
      ref="multipleTable"
      :data="studentDataList"
      border
      tooltip-effect="dark"
      size="mini"
      style="width: 100% ;"
      :default-sort = "{prop: 'date', order: 'descending'}"
      @selection-change="handleSelectionChange"
      @row-click="openDetails"
      :headerCellStyle="headerSetStyle"
      :cellStyle="cellSetStyle"
      class="elTableBorder">
      <el-table-column
        type="selection"
        align="center"
      >
      </el-table-column>

      <el-table-column
        align="center"
        width="60"
        prop="serial_number"
        label="序号"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="user_lname"
        label="会员姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="dep_name"
        label="班级名称"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="jRecordTime"
        label="刷卡时间"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="jLesson"
        label="上课节次"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="状态名称"
      >
      </el-table-column>
    </el-table>
  </el-row>

</template>
<script>
  import {mapState} from 'vuex'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import axios from 'axios'
  import qs from 'qs'
  export default {
    components: {
      ElCol,
      ElRow,
      ElButton
    },
    data() {
      return {
        tableObject:[
          {
            field:'user_lname',
            width:'90',
            title:"会员姓名",
          },
          {
            field:'dep_name',
            width:'80',
            title:"班级名称",
          },
          {
            field:'jRecordTime',
            width:'80',
            title:"刷卡时间",
          },
          {
            field:'jLesson',
            width:'120',
            title:"上课节次",
          },
          {
            field:'name',
            width:'120',
            title:"状态名称",
          }
        ],
        studentDataList: [],
        fireData:'',
        groupNo:'',

      };
    },
    methods: {
      //表头样式
      headerSetStyle(){
        return{
          "background-color": "#e5e5e5",
          "color": "#303133",
          "border-color": "#c1c3c9",
          "font-size": "#c1c3c9"

        }
      },
      //表格样式
      cellSetStyle(){
        return{
          "color": "#303133",
          "border-color": "#c1c3c9",
          "font-size":"12px"
        }
      },
      //打开详情
      openDetails(row, event, column){
        var that= this
        var coachId=row.employee_serial
        var fireClassTime=row.jdate
        var fireClassTimeData={
          employee_serial:coachId,
          jdate:fireClassTime
        }
        var fireClassTimeParams = {
          methodUrl:'courseManagement/fireClassInformationThree',
          jsonParam:qs.stringify(fireClassTimeData)
        }
        this.$axios.postRequest(fireClassTimeParams).then(function(res) {
          //成功之后处理逻辑
          that.fireClassTimeDetail=res.data
          that.$router.push({name: 'fireClassStudentList', params: {timeData:that.fireClassTimeDetail }})
        }, function(res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })

      },
      //导出
      exportCh(fileName, docType) {
        var userData = qs.parse(sessionStorage.getItem("userData"));
        fileName
        var postData = {
          regserial: userData.company_serial,
          jdate:this.fireData,
          group_serial:this.groupNo,
          count: true,
          pageindex: 1,
          pagesize: 100000,
        }
        docType = docType || "pdf";//默认导出pdf
        var gridCols = this.tableObject

        var params = {
          methodUrl: 'courseManagement/fireClassInformationThree',
          jsonParam: JSON.stringify(postData),
          exportStr: JSON.stringify(gridCols),
          exportType: docType
        }
        var that = this
        axios.defaults.baseURL = ''
        //jindu
        axios.post("sys/export.do", params
          , {
            'headers': {
              'Content-Type': 'application/json;charset=utf-8'
            }
          }
        ).then((response) => {
//guanbi

          var fileParam = {
            'fileKey': encodeURI(response.data.info),
            'fileName': encodeURI(fileName),
            'browseType': this.Browser.firefox ? "firefox" : '',
            'docType': docType
          };
          //另存为文档
          window.open("exportFile.do?" + qs.stringify(fileParam));

        }, (err) => {
          console.log(err)
        })
      },
 
      //加载表格
      selectTestDetail() {
        var that = this
        //加载考级记录表
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var testsData = {
          regserial: userData.company_serial,
          permissions_id:userData.permissions_id,
          life: this.year,
          id: this.testname,
          count: true,
          pageindex: 1,
          pagesize: 20,
        }
        var testsParams = {
          methodUrl: 'courseManagement/getLevelExaminationInfo',
          jsonParam: qs.stringify(testsData)
        }
        this.$axios.postRequest(testsParams).then(function (res) {
          //成功之后处理逻辑
          that.testLevel = res.data.list
          that.total = res.data.totalcount
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      },

      addTest() {
        var userData = qs.parse(sessionStorage.getItem("userData"));

        var activityData = {
          name: this.form.name,
          dep_serial_str: this.form.region,
          startDate: this.form.startTime,
          endDate: this.form.expiryDate,
          examDate: this.form.testDate,
          examAddress: this.form.testAddress,
          operatorID: userData.role_id,
          operatorIP: ''
        }
        var activityParams = {
          methodUrl: 'courseManagement/submitLevelExaminationInfo',
          jsonParam: qs.stringify(activityData)
        }
        this.$axios.postRequest(activityParams).then(function (res) {
          this.selectTestDetail()
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var postData = {
          regserial: userData.company_serial,
          permissions_id:userData.permissions_id,
          count: true,
          pageindex: this.currentPage,
          pagesize: val
        }
        var params = {
          methodUrl: 'courseManagement/getLevelExaminationInfo',
          jsonParam: qs.stringify(postData)
        }
        var that = this
        this.$axios.postRequest(params).then(function (res) {
          //成功之后处理逻辑
          that.testLevel = res.data.list
          that.total = res.data.totalcount
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var postData = {
          regserial: userData.company_serial,
          permissions_id:userData.permissions_id,
          count: true,
          pageindex: val,
          pagesize: this.pageSize
        }
        var params = {
          methodUrl: 'courseManagement/getLevelExaminationInfo',
          jsonParam: qs.stringify(postData)
        }
        var that = this
        this.$axios.postRequest(params).then(function (res) {
          //成功之后处理逻辑
          that.testLevel = res.data.list
          that.total = res.data.totalcount
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      },
      back(){
        this.$router.push('/fireClassTimeDetail')
      }
      // handleEdit(index,row){
      //
      //   var that=this
      //   var id = row.examActivity_id
      //   var roomId=row.dep_parent_serial
      //   var activeMemberListData={
      //     examActivity_id:id,
      //     dep_parent_serial:roomId,
      //     regserial:this.$store.state.regserial,
      //   }
      //   var activeMemberListParams={
      //     methodUrl:'courseManagement/getLevelExaminationStudentInfo',
      //     jsonParam:qs.stringify(activeMemberListData)
      //   }
      //   this.$axios.postRequest(activeMemberListParams).then(function(res) {
      //     //成功之后处理逻辑
      //     that.activeMemberList=res.data.list
      //     that.$router.push({path:
      //         '/activeMemberList',
      //       query: {MemberList:
      //         that.activeMemberList}})
      //   }, function(res) {
      //     //失败之后处理逻辑
      //     console.log("error:" + res)
      //   })
      //
      // }

    },
    mounted() {
      if (this.$route.params.studentListData != null) {

        sessionStorage.setItem("studentListData", JSON.stringify(this.$route.params.studentListData));
        this.studentDataList = this.$route.params.studentListData
        this. fireData=this.$route.params.fireData
        this.groupNo=this.$route.params.gronpNo
      } else {
        this.timeDataList = JSON.parse(sessionStorage.getItem("studentListData"))
      }
    }
  }
</script>
<style scoped>
  ul{
    float: left;
    margin: 0 0 10px 0;

  }
</style>
