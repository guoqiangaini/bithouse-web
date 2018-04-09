<template>

  <el-row>
    <!--返回+导出按钮-->
    <ul>
      <el-button size="mini"  type="info" class="btn" @click="back">返回</el-button>
      <el-button size="mini"  type="info" class="btn" @click="exportCh('考级活动','xlsx')">导出</el-button>
    </ul>
    <!--表格加载开始-->
    <el-table
      ref="multipleTable"
      :data="memberList"
      border
      tooltip-effect="dark"
      size="small"
      style="width: 100% ;"
      :default-sort = "{prop: 'date', order: 'descending'}"
      @selection-change="handleSelectionChange"
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
        prop="student_name"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="department_name"
        label="班级"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="teach_name"
        label="教练"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="jName"
        label="考试级别"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="jcost"
        label="费用"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="payment_status"
        label="缴费"
      >
      </el-table-column>

      <el-table-column
        align="center"
        prop="score"
        label="考试成绩"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="test_site"
        label="是否通过"
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
            field:'student_name',
            width:'90',
            title:"姓名",
          },
          {
            field:'department_name',
            width:'80',
            title:"班级",
          },
          {
            field:'teach_name',
            width:'80',
            title:"教练",
          },
          {
            field:'jName',
            width:'120',
            title:"考试级别",
          },
          {
            field:'jcost',
            width:'120',
            title:"费用",
          },
          {
            field:'payment_status',
            width:'120',
            title:"缴费",
          },
          {
            field:'score',
            width:'120',
            title:"考试成绩",
          },
          {
            field:'test_site',
            width:'120',
            title:"是否通过",
          },

        ],
        memberList: [],
        id:'',
        roomId:''

      };
    },
    methods: {
      //表头样式
      headerSetStyle(){
        return{
          "background-color":"#e5e5e5",
          "color":"#303133",
          "border-color":"#c1c3c9"
        }
      },
      //表格样式
      cellSetStyle(){
        return{
          "color":"#606266",
          "border-color":"#c1c3c9"
        }
      },
      //导出
      exportCh(fileName, docType) {
        fileName
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var postData = {
          examActivity_id:id,
          dep_parent_serial:roomId,
          regserial:userData.company_serial,
          count: true,
          pageindex: 1,
          pagesize: 100000,
        }
        docType = docType || "pdf";//默认导出pdf
        var gridCols = this.tableObject
        var params = {
          methodUrl: 'courseManagement/getLevelExaminationStudentInfo',
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
      //加载表格信息
      selectTestDetail() {
        var that = this
        //加载考级记录表
        var testsData = {
          regserial: this.$store.state.regserial,
          permissions_id: this.$store.state.permissions_id,
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
        this.dialogFormVisible = false
        var activityData = {
          name: this.form.name,
          dep_serial_str: this.form.region,
          startDate: this.form.startTime,
          endDate: this.form.expiryDate,
          examDate: this.form.testDate,
          examAddress: this.form.testAddress,
          operatorID: '',
          ip: ''
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
        var postData = {
          regserial: this.$store.state.regserial,
          permissions_id: this.$store.state.permissions_id,
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
        var postData = {
          regserial: this.$store.state.regserial,
          permissions_id: this.$store.state.permissions_id,
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
        this.$router.push('/25')
      }
    },
    mounted() {
      if (this.$route.params.code != null) {
        sessionStorage.setItem("memberList", JSON.stringify(this.$route.params.code));
        this.memberList = this.$route.params.code
        this.id=this.$route.params.id
        this.roomId=this.$route.params.roomId
      } else {
        this.memberList = JSON.parse(sessionStorage.getItem("memberList"))
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
