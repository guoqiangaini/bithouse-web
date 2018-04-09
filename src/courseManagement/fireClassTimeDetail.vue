<template>
  <el-row>
    <ul>
      <el-button size="mini"  type="info" class="btn" @click="back">返回</el-button>
      <!--<el-button size="mini"  type="info" class="btn" @click="exportCh('考级活动','xlsx')">导出</el-button>-->
    </ul>
    <el-table
      ref="multipleTable"
      :data="timeDataList"
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
        prop="serial_number"
        label="序号"
       width="60"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="employee_name"
        label="教练"
        width="180"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="xjdate"
        label="星期"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="time"
        label="课程时间"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="true_count"
        label="消课记录"
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
            field:'employee_name',
            width:'90',
            title:"教练",
          },
          {
            field:'xjdate',
            width:'80',
            title:"星期",
          },
          {
            field:'time',
            width:'80',
            title:"课程时间",
          },
          {
            field:'true_count',
            width:'120',
            title:"消课记录",
          }
        ],
        timeDataList: [],

      };
    },
    methods: {
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

      //打开详情
      openDetails(row, event, column){
        var that= this
        var fireData=row.jdate
        var groupNo=row.group_serial
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var fireClassStudentData={
          regserial:userData.company_serial,
          jdate:fireData,
          group_serial:groupNo
        }
        var fireClassStudentParams = {
          methodUrl:'courseManagement/fireClassInformationThree',
          jsonParam:qs.stringify(fireClassStudentData)
        }
        this.$axios.postRequest(fireClassStudentParams).then(function(res) {
          //成功之后处理逻辑
          that.fireClassStudentDetail=res.data.list
          that.$router.push({name: 'fireClassStudentList', params: {fireData:fireData,groupNo:groupNo,studentListData:that.fireClassStudentDetail}})
        }, function(res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })

      },
      //导出
      exportCh(fileName, docType) {
        fileName
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var postData = {
          regserial: userData.company_serial,
          permissions_id:userData.permissions_id,
          life: this.year,
          id: this.testname,
          count: true,
          pageindex: 1,
          pagesize: 100000,
        }
        docType = docType || "pdf";//默认导出pdf
        var gridCols = this.tableObject

        var params = {
          methodUrl: 'courseManagement/getLevelExaminationInfo',
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
       Browser() {
      var browser = {
        msie: false,
        msie7: false,
        msie8: false,
        msie9: false,
        msie10: false,
        msie11: false,
        chrome: false,
        firefox: false
      };
      var ver = null,
        u = window.navigator.userAgent.toLocaleLowerCase();
      if (/(msie) ([\d.]+)/.test(u)) {
        ver = parseInt(/(msie) ([\d.]+)/.exec(u)[2]);
        browser.msie = true;
        if (ver < 8) browser.msie7 = true;
        else if (ver == 8) browser.msie8 = true;
        else if (ver == 9) browser.msie9 = true;
        else if (ver == 10) browser.msie10 = true;
      } else if (/(chrome)\/([\d.]+)/.test(u)) browser.chrome = true;
      else if (/(trident)\/([\d.]+)/.test(u)) {
        browser.msie11 = true;
        browser.msie = true;
      } else if (/(firefox)\/([\d.]+)/) browser.firefox = true;
      else if (/(safari)\/([\d.]+)/.test(u)) browser.safari = true;
      else if (/(opera)\/([\d.]+)/) browser.opera = true;

      return browser;
    },
      selectTestDetail() {
        var that = this
        var userData = qs.parse(sessionStorage.getItem("userData"));
        //加载考级记录表
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
        var userData = qs.parse(sessionStorage.getItem("userData"));
        console.log(`每页 ${val} 条`);
        this.pageSize = val
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
        var userData = qs.parse(sessionStorage.getItem("userData"));
        console.log(`当前页: ${val}`);
        this.currentPage = val
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
        this.$router.push('/24')
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
      if (this.$route.params.timeData != null) {
        var timeTables = this.$route.params.timeData
        for(var i=0;i<timeTables.length;i++){
          timeTables[i].time =  timeTables[i].jStart +'~'+timeTables[i].jEnd
        }
        sessionStorage.setItem("timeDataList", JSON.stringify(timeTables));
        this.timeDataList = timeTables
      } else {
        this.timeDataList = JSON.parse(sessionStorage.getItem("timeDataList"))
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
