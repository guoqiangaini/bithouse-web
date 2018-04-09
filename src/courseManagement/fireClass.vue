<!--suppress ALL -->
<template>
  <div>
    <!--下拉选+按钮区开始-->
    <div class="wai">
      <!--道馆下拉选-->
      <ul>
        <span class="size">道馆</span>
        <el-select v-model="room" clearable placeholder="全部" size="mini" style="width: 90px;" @change="changes">
          <el-option
            v-for="item in rooms"
            :key="item.department_serial"
            :label="item.department_name"
            :value="item.department_serial">
          </el-option>
        </el-select>
      </ul>
      <!--班级下拉选-->
      <ul>
        <span class="size">班级</span>
        <el-select v-model="clazz" clearable placeholder="全部" size="mini" style="width: 90px" @change="changess">
          <el-option
            v-for="item in classes"
            :key="item.department_serial"
            :label="item.department_name"
            :value="item.department_serial">
          </el-option>
        </el-select>
      </ul>
      <!--时间段下拉选-->
      <ul>
        <span class="size">时间段</span>
        <el-date-picker
          v-model="timeScope"
          :editable="false"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          :default-time="['12:00:00']">
        </el-date-picker>
      </ul>
      <!--查询+导出 按钮-->
      <ul>
        <el-button size="mini" type="info" @click="queryList">查询</el-button>
        <el-button size="mini" type="info" @click="exportCh('消课记录','xlsx')">导出</el-button>
      </ul>
    </div>
    <!--下拉选+按钮区结束-->

    <!--表格内容区+分页-->
    <div style="margin: 0">
      <!--消课记录表-->
      <el-table
        size="mini"
        ref="multipleTable"
        :data="fireClass"
        border
        tooltip-effect="dark"
        style="width: 100% ;"
        :default-sort="{prop: 'date', order: 'descending'}"
        @selection-change="handleSelectionChange"
        @row-click="openDetails"
        @sort-change='queryList'
        :headerCellStyle="headerSetStyle"
        :cellStyle="cellSetStyle"
        class="elTableBorder">
        <el-table-column
          type="selection"

          align="center">
        </el-table-column>
        <el-table-column
          align="center"
          label="序号"

          prop="serial_number"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="dep_parent_name"

          label="道馆"
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

          prop="employee_name"
          label="教练"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="jdate"

          label="消课时间"
        >
        </el-table-column>
        <el-table-column
          prop="jcnt"
          align="center"

          label="消课记录"
        >
        </el-table-column>
      </el-table>
      <!--消课记录表结束-->
      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 40, 60]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total" style="text-align: right;margin-top: 20px">
      </el-pagination>
      <!--分页结束-->
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import qs from 'qs'
  import {mapState} from 'vuex'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {ElButton},
    data() {
      return {
        tableObject: [
          {
            field: 'student_name',
            width: '90',
            title: "姓名",
          },
          {
            field: 'jsex',
            width: '80',
            title: "性别",
          },
          {
            field: 'dep_parent_name',
            width: '80',
            title: "道馆",
          },
          {
            field: 'department_name',
            width: '120',
            title: "班级",
          },
          {
            field: 'employee_name',
            width: '90',
            title: "教练分配",
          },
          {
            field: 'teacher_name',
            width: '60',
            title: "老师",
          },
          {
            field: 'jLevel',
            width: '110',
            title: "级别",
          },
          {
            field: 'jdate',
            width: '140',
            title: "消课日期",
          },
          {
            field: 'fireClass',
            width: '140',
            title: "消课记录"
          },
          {
            field: 'jstatus',
            width: '170',
            title: "状态"
          }
        ],
        //时间段
        timeScope: '',
        //数据条数
        total: 0,
        //默认一页条数
        pageSize: 20,
        //默认页码
        currentPage: 1,
        room: '',
        rooms: [],
        clazz: '',
        classes: [],
        coach: '',
        coachs: [],
        states: '',
        statuses: [],
        value5: '',
        studentName: '',
        value: '',
        fireClass: [],
        multipleSelection: [],
        orderByName: ''
      };
    },
    methods: {
      //表头样式
      headerSetStyle(){
        return {
          "background-color": "rgb(229, 229, 229)",
          "color": "#303133",
          "border-color": "#c1c3c9",
//          "border-left":"2px soild #c1c3c9"
        }
      },

      //表格样式
      cellSetStyle(){
        return {
          "color": "#303133",
          "border-color": "#c1c3c9",
          //"border": "1px soild #c1c3c9"
        }
      },
      //打开详情
      openDetails(row, event, column){
        var that = this
        var coachId = row.employee_serial
        var fireClassTime = row.jdate
        fireClassTime = fireClassTime.replace(/\./g, '-')
        var fireClassTimeData = {
          employee_serial: coachId,
          jdate: fireClassTime,
          count: true,
        }
        var fireClassTimeParams = {
          methodUrl: 'courseManagement/fireClassInformationTwo',
          jsonParam: qs.stringify(fireClassTimeData)
        }
        this.$axios.postRequest(fireClassTimeParams).then(function (res) {
          //成功之后处理逻辑
          that.fireClassTimeDetail = res.data.list
          that.$router.push({name: 'fireClassTimeDetail', params: {timeData: that.fireClassTimeDetail}})
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })

      },

      //导出
      exportCh(fileName, docType){

        var userData = qs.parse(sessionStorage.getItem("userData"));
        var postData = {
          regserial: userData.company_serial,
          permissions_id: userData.permissions_id,
          start_date: this.timeScope[0],
          end_date: this.timeScope[1],
          studentDepartment_serial: this.room,
          department_serial: this.clazz,
          jstatusID: this.states,
          dep_parent_serial: this.coach,
          student_name: this.studentName,
          count: true,
          pageindex: 1,
          pagesize: 100000,
        }
        docType = docType || "pdf";//默认导出pdf
        var gridCols = this.tableObject

        var params = {
          methodUrl: 'courseManagement/fireClassInformation',
          jsonParam: JSON.stringify(postData),
          exportStr: JSON.stringify(gridCols),
          exportType: docType,
          exportTitle: fileName
        }
        var that = this
        
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
      //道馆关联方法
      changes(){
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var that = this
        var departments = this.room
        //加载班级信息
        var classData = {
          regserial: userData.company_serial,
          permissions_id: userData.permissions_id,
          dep_lx: '2',
          department_serial: departments,
        }
        var classParams = {
          methodUrl: 'courseManagement/memberClass',
          jsonParam: qs.stringify(classData)
        }
        this.$axios.postRequest(classParams).then(function (res) {
          //成功之后处理逻辑
          that.classes = res.data
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })

        //加载教练信息
        var coachData = {
          regserial: userData.company_serial,
          role_id: '102',
          department_serial: departments,

        }
        var coachParams = {
          methodUrl: 'courseManagement/memberTeacher',
          jsonParam: qs.stringify(coachData)
        }
        this.$axios.postRequest(coachParams).then(function (res) {
          //成功之后处理逻辑
          that.coachs = res.data
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })

        //加载老师信息
        var teacherData = {
          regserial: userData.company_serial,
          role_id: '103',
          department_serial: departments,

        }
        var teacherParams = {
          methodUrl: 'courseManagement/memberTeacher',
          jsonParam: qs.stringify(teacherData)
        }
        this.$axios.postRequest(teacherParams).then(function (res) {
          //成功之后处理逻辑
          that.teachers = res.data
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
        //加载状态信息
        var statusData = {
          regserial: userData.company_serial,

        }
        var statusParams = {
          methodUrl: 'courseManagement/memberState',
          jsonParam: qs.stringify(statusData)
        }
        this.$axios.postRequest(statusParams).then(function (res) {
          //成功之后处理逻辑
          that.statuses = res.data
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      },
      //班级关联的方法
      changess(){
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var that = this
        var departmentss = this.value4
        //加载教练信息
        var coachData = {
          regserial: userData.company_serial,
          role_id: '102',
          department_serial: departmentss,

        }
        var coachParams = {
          methodUrl: 'courseManagement/memberTeacher',
          jsonParam: qs.stringify(coachData)
        }
        this.$axios.postRequest(coachParams).then(function (res) {
          //成功之后处理逻辑
          that.coachs = res.data
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })

        //加载老师信息
        var teacherData = {
          regserial: userData.company_serial,
          role_id: '103',
          department_serial: departmentss,
        }
        var teacherParams = {
          methodUrl: 'courseManagement/memberTeacher',
          jsonParam: qs.stringify(teacherData)
        }
        this.$axios.postRequest(teacherParams).then(function (res) {
          //成功之后处理逻辑
          that.teachers = res.data
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      },
      //分页
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val
        var userData = qs.parse(sessionStorage.getItem("userData"));
        that.queryList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val
        var userData = qs.parse(sessionStorage.getItem("userData"));
        that.queryList()
      },
      //条件查询
      queryList(column){
        var that = this
        var userData = qs.parse(sessionStorage.getItem("userData"));

        if (column && column.order) {

          var index = (column.order).indexOf("ending")
          if (column.prop == 'teacher_name') {
            this.orderByName = "r.employee_name " + (column.order).substring(0, index)
          } else if (column.prop == 'employee_name') {
            this.orderByName = "w.employee_name " + (column.order).substring(0, index)
          } else {
            this.orderByName = column.prop + " " + (column.order).substring(0, index)
          }

        }
        //加载消课记录表
        var fireData = {
          regserial: userData.company_serial,
          permissions_id: userData.permissions_id,
          start_date: this.timeScope[0],
          end_date: this.timeScope[1],
          studentDepartment_serial: this.room,
          department_serial: this.clazz,
          jstatusID: this.states,
          dep_parent_serial: this.coach,
          student_name: this.studentName,
          count: true,
          pageindex: 1,
          pagesize: 20,
          orderby: this.orderByName,
        }
        var fireParams = {
          methodUrl: 'courseManagement/fireClassInformation',
          jsonParam: qs.stringify(fireData)
        }
        this.$axios.postRequest(fireParams).then(function (res) {
          //成功之后处理逻辑
          that.fireClass = res.data.list
          that.total = res.data.totalcount
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })

      },
    },
    mounted(){
      var userData = qs.parse(sessionStorage.getItem("userData"));
      var department = "";
      if (this.room !== '' && this.clazz === '') {
        department = this.room
      } else if (this.clazz !== '') {
        department = this.clazz
      }
      var that = this
      //加载消课记录表
      that.queryList()
      //加载道馆信息
      var roomData = {
        regserial: userData.company_serial,
        permissions_id: userData.permissions_id,
        dep_lx: '1',
      }
      var roomParams = {
        methodUrl: 'memberManagement/memberClass',
        jsonParam: qs.stringify(roomData)
      }
      this.$axios.postRequest(roomParams).then(function (res) {
        //成功之后处理逻辑
        that.rooms = res.data
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })
      //加载班级信息
      var classData = {
        regserial: userData.company_serial,
        permissions_id: userData.permissions_id,
        dep_lx: '2',
        department_serial: this.value3,

      }
      var classParams = {
        methodUrl: 'memberManagement/memberClass',
        jsonParam: qs.stringify(classData)
      }
      this.$axios.postRequest(classParams).then(function (res) {
        //成功之后处理逻辑
        that.classes = res.data
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })
      //加载状态信息
      var statusData = {
        regserial: userData.company_serial,
      }
      var statusParams = {
        methodUrl: 'memberManagement/memberState',
        jsonParam: qs.stringify(statusData)
      }
      this.$axios.postRequest(statusParams).then(function (res) {
        //成功之后处理逻辑
        that.statuses = res.data
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })
      //加载教练信息
      var coachData = {
        regserial: userData.company_serial,
        department_serial: department,
        role_id: '102',
      }
      var coachParams = {
        methodUrl: 'memberManagement/memberTeacher',
        jsonParam: qs.stringify(coachData)
      }
      this.$axios.postRequest(coachParams).then(function (res) {
        //成功之后处理逻辑
        that.coachs = res.data
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })

    },
  };
</script>
<style scoped>

  .wai ul {
    float: left;
    margin: 0 10px 10px 0;

  }

  .wai ul > div {
    margin-right: 5px;
  }

  .select {
    width: 100px;
    height: 50px;
  }

  .input {
    height: 30px;
    width: 100px;
  }

  .size {
    font-size: 12px;
    color: #101010;
    margin: 0 5px 0 0;
  }

</style>
