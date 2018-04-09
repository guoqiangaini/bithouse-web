<template>
  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">


    <el-tab-pane label="日考勤" name="first">
      <div class="wai">
        <ul>
          <div class="block">
            <span class="demonstration" style="font-size: 12px">日期</span>
            <el-date-picker
              size="mini"
              value-format="yyyy-MM-dd"
              v-model="value1"
              type="date"
              placeholder="选择日期" style="width: 150px">
            </el-date-picker>
          </div>
        </ul><!--日期-->
        <ul>
          <span style="font-size: 12px">道馆</span>
          <el-select clearable v-model="value2" placeholder="请选择" class="select" size="mini">
            <el-option
              v-for="item in roadMuseum"
              :key="item.department_serial"
              :label="item.department_name"
              :value="item.department_serial">
            </el-option>
          </el-select>
        </ul><!--道馆-->
        <ul>
          <span style="font-size: 12px">岗位</span>
          <el-select clearable v-model="value3" placeholder="请选择" class="select" size="mini">
            <el-option
              v-for="item in post"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </ul><!--岗位-->
        <ul>
          <span style="font-size: 12px">姓名</span>
          <el-input clearable v-model="input1" size="mini" placeholder="请输入内容" style="width: 100px;" class="input"></el-input>
        </ul><!--姓名-->
        <ul>
          <span style="font-size: 12px">考勤状态</span>
          <el-select clearable v-model="value4" placeholder="请选择" class="select" size="mini">
            <el-option
              v-for="item in AttendanceStatus"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </ul><!--考勤状态-->
        <ul>
          <el-button size="mini" type="info" @click="find">查询</el-button>
          <el-button size="mini" type="info" @click="dialogVisible = true">审批</el-button>

          <el-button size="mini" type="info" @click="exportCh('日考勤记录','xlsx')">导出日报</el-button>

        </ul><!--按钮-->


      </div>
      <el-table
        :headerCellStyle="headerSetStyle"
        :cellStyle="cellSetStyle"
        size="mini"
        ref="multipleTable"
        border
        :data="dayAttendance"
        header-align="center"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        class="elTableBorder">
        <el-table-column
          type="selection"
          :selectable="selectable"
          align="center"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="serial_number"
          label="序号"
          width="60">

        </el-table-column>
        <el-table-column
          align="center"
          prop="student_dep_name"
          label="道馆"
          width="100">

        </el-table-column>
        <el-table-column
          align="center"
          prop="userPosition"
          label="岗位"
          width="100">

        </el-table-column>
        <el-table-column
          align="center"
          prop="userName"
          label="姓名"
          width="100">

        </el-table-column>
        <el-table-column
          align="center"
          prop="user_no"
          label="工号"
          width="100">

        </el-table-column>
        <el-table-column
          align="center"
          prop="earliestTime"
          label="早打卡"
          width="100">

        </el-table-column>
        <el-table-column
          align="center"
          prop="latestTime"
          label="晚打卡"
          width="100">

        </el-table-column>
        <el-table-column
          align="center"
          prop="attAddress"
          label="打卡范围"
          width="140">

        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="状态"
          width="120">

        </el-table-column>
        <el-table-column
          align="center"
          prop="jdate"
          label="日期"
        >

        </el-table-column>

      </el-table>

      <el-dialog
        title="提示"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :visible.sync="dialogVisible"
        width="60%"

      >
        <el-table
          header-row-style
          ref="multipleTables"
          :data="multipleSelection"
          border
          header-align="center"
          tooltip-effect="dark"
          style="width: 100%"
          headerCellStyle="background-color:#e5e5e5;color:#303133"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            disable="false"
            align="center"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="serial_number"
            label="序号"
            width="60">

          </el-table-column>
          <el-table-column
            align="center"
            prop="student_dep_name"
            label="道馆"
            width="100">

          </el-table-column>
          <el-table-column
            align="center"
            prop="userPosition"
            label="岗位"
            width="100">

          </el-table-column>
          <el-table-column
            align="center"
            prop="userName"
            label="姓名"
            width="100">

          </el-table-column>
          <el-table-column
            align="center"
            prop="user_no"
            label="工号"
            width="100">

          </el-table-column>
          <el-table-column
            align="center"
            prop="earliestTime"
            label="早打卡"
            width="100">

          </el-table-column>
          <el-table-column
            align="center"
            prop="latestTime"
            label="晚打卡"
            width="100">

          </el-table-column>
          <el-table-column
            align="center"
            prop="attAddress"
            label="打卡范围"
            width="100">

          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="状态"
            width="120"
          >

          </el-table-column>
          <el-table-column
            align="center"
            prop="jdate"
            label="日期"
            width="120">

          </el-table-column>

        </el-table>
        <div slot="footer" class="dialog-footer" style="text-align: center">
    <el-button type="danger" size="mini" @click="submitRefuse " class="dialogCancelButton">驳 回</el-button>
    <el-button type="success" size="mini" @click="submitUpdate">通 过</el-button>
  </div>
      </el-dialog>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 40, 60]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      style="text-align: right;margin-top: 20px">
      </el-pagination>
    </el-tab-pane>
    <el-tab-pane label="月考勤" name="second">
      <div class="wai">
        <ul>
          <div class="block">
            <span class="demonstration" style="font-size: 12px">月份</span>
            <el-date-picker clearable
              size="mini"
              v-model="value5"
              type="month"
              placeholder="选择月">
            </el-date-picker>
          </div>
        </ul><!--月份-->
        <ul>
          <span style="font-size: 12px">道馆</span>
          <el-select clearable v-model="value6" placeholder="请选择" class="select" size="mini">
            <el-option
              v-for="item in roadMuseum"
              :key="item.department_serial"
              :label="item.department_name"
              :value="item.department_serial">
            </el-option>
          </el-select>
        </ul><!--道馆-->
        <ul>
          <span style="font-size: 12px">岗位</span>
          <el-select clearable v-model="value7" placeholder="请选择" class="select" size="mini">
            <el-option
              v-for="item in post"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </ul><!--岗位-->
        <ul>
          <span style="font-size: 12px">姓名</span>
          <el-input clearable v-model="input2" size="mini" placeholder="请输入内容" style="width: 100px"></el-input>
        </ul><!--姓名-->
        <ul>
          <el-button size="mini" type="info" @click="finds">查询</el-button>

          <el-button size="mini" type="info" @click="exportChu('月考勤记录','xlsx')">导出月报</el-button>

        </ul><!--按钮-->
      </div>
      <el-table
        size="mini"
        border
        ref="multipleTable"

        :data="monthAttendance"
        :headerCellStyle="headerSetStyle"
        :cellStyle="cellSetStyle"
        header-align="center"
        tooltip-effect="dark"
        style="width: 100%;position:inherit"
        class="elTableBorder"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          align="center"
         >
        </el-table-column>
        <el-table-column
          align="center"
          prop="serial_number"
          label="序号"
          width="60">

        </el-table-column>
        <el-table-column
          align="center"
          prop="student_dep_name"
          label="道馆"
          width="100">

        </el-table-column>
        <el-table-column
          align="center"
          prop="userPosition"
          label="岗位"
          width="100">

        </el-table-column>
        <el-table-column
          align="center"
          prop="userName"
          label="姓名"
          width="100">

        </el-table-column>
        <el-table-column
          align="center"
          prop="user_no"
          label="工号"
          width="100">

        </el-table-column>
        <el-table-column
          align="center"
          prop="shouldAtt"
          label="应出勤"
          width="100">

        </el-table-column>
        <el-table-column
          align="center"
          prop="leave"
          label="事假"
          width="100">

        </el-table-column>
        <el-table-column
          align="center"
          prop="sickLeave"
          label="病假"
          width="100">

        </el-table-column>
        <el-table-column
          align="center"
          prop="annualLeave"
          label="年假"
          width="120">

        </el-table-column>
        <el-table-column
          align="center"
          prop="actualAtt"
          label="实出勤"
          width="120">

        </el-table-column>
        <el-table-column
          align="center"
          prop="abnormalDays"
          label="异常天数"
          width="120">

        </el-table-column>
        <el-table-column
          align="center"
          prop="late"
          label="迟到累计"
          width="120">

        </el-table-column>
        <el-table-column
          align="center"
          prop="leaveEarly"
          label="早退累计"
          width="120">

        </el-table-column>
        <el-table-column
          align="center"
          prop="patchCard"
          label="补卡"
          width="120">

        </el-table-column>
        <el-table-column
          align="center"
          prop="jmonth"
          label=" 月份"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChanges"
        @current-change="handleCurrentChanges"
        :current-page="currentPages"
        :page-sizes="[20, 40, 60]"
        :page-size="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-tab-pane>

  </el-tabs>
</template>
<script>
  import axios from 'axios'
  import qs from 'qs'
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        pageSize: 20,
        currentPage: 1,
        pageSizes: 20,
        currentPages: 1,
        total: 0,
        multipleTables: [],
        dialogVisible: false,
        Day: [
          {
            field: 'student_dep_name',
            width: '100',
            title: "道馆",
          },
          {
            field: 'userPosition',
            width: '100',
            title: "岗位",
          },
          {
            field: 'userName',
            width: '100',
            title: "姓名",
          },
          {
            field: 'user_no',
            width: '100',
            title: "工号",
          },
          {
            field: 'earliestTime',
            width: '100',
            title: "早打卡",
          },
          {
            field: 'latestTime',
            width: '100',
            title: "晚打卡",
          },
          {
            field: 'attAddress',
            width: '100',
            title: "打卡范围",
          },
          {
            field: 'name',
            width: '120',
            title: "状态",
          },
          {
            field: 'jdate',
            width: '120',
            title: "日期",
          },
        ],
        Month: [
          {
            field: 'student_dep_name',
            width: '100',
            title: "道馆",
          },
          {
            field: 'userPosition',
            width: '100',
            title: "岗位",
          },
          {
            field: 'userName',
            width: '100',
            title: "姓名",
          },
          {
            field: 'user_no',
            width: '100',
            title: "工号",
          },
          {
            field: 'shouldAtt',
            width: '100',
            title: "应出勤",
          },
          {
            field: 'leave',
            width: '100',
            title: "事假",
          },
          {
            field: 'sickLeave',
            width: '100',
            title: "病假",
          },
          {
            field: 'annualLeave',
            width: '120',
            title: "年假",
          },
          {
            field: 'actualAtt',
            width: '120',
            title: "实出勤",
          },
          {
            field: 'abnormalDays',
            width: '120',
            title: "异常天数",
          },
          {
            field: 'late',
            width: '120',
            title: "迟到累计",
          },
          {
            field: 'leaveEarly',
            width: '120',
            title: "早退累计",
          },
          {
            field: 'patchCard',
            width: '120',
            title: "补卡",
          },
          {
            field: '月份',
            width: '120',
            title: "jmonth",
          },
        ],
        activeName2: 'first',
        roadMuseum: [],//道馆
        post: [],//岗位
        AttendanceStatus: [],//考勤状态
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        value7: '',
        input1: '',
        input2: '',
        dayAttendance: [],//日出勤表
        multipleSelection: [],
        monthAttendance: [],//月出勤表
      };
    },
    computed: {

      regserial(){
        return this.$store.state.regserial
      },
      permissions_id(){
        return this.$store.state.permissions_id
      },
      company_serial(){
        return this.$store.state.company_serial
      },
      studentDepartment_serial(){
        return this.$store.state.studentDepartment_serial
      },
      //获取性别信息
      gender(){
        return this.$store.state.genders
      },

    },
    methods: {

      headerSetStyle(){
        return {
          "background-color": "#e5e5e5",
          "color": "#303133",
          "border-color": "#c1c3c9",

                  }
      },
      cellSetStyle(){
        return {
          "color": "#606266",
          "border-color": "#c1c3c9",

        }
      },

      handleClick(tab, event) {
        console.log(tab, event);
      },
      find(){
        var department = "";
        if (this.value3 !== '' && this.value4 === '') {
          department = this.value3
        } else if (this.value4 !== '') {
          department = this.value4
        }
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var dayData = {
          count: true,
          pageindex: 1,
          regserial: userData.company_serial,
          permissions_id:userData.permissions_id,
          department_serial: department,
          jdate: this.value1,
          student_dep_serial: this.value2,
          position_id: this.value3,
          attStatus: this.value4,
          userName: this.input1,


        }
        var Dayparams = {
          methodUrl: 'personnelManagement/getDayAttendance',
          jsonParam: qs.stringify(dayData)
        }
        var that = this
        this.$axios.postRequest(Dayparams).then(function (res) {
          //成功之后处理逻辑
          that.dayAttendance = res.data.list
          that.total = res.data.totalcount
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })

      },
      handleSizeChange(val) {
        var userData = qs.parse(sessionStorage.getItem("userData"));
        console.log(`每页 ${val} 条`);
        this.pageSize = val
        var dayData = {
          regserial: userData.company_serial,
          permissions_id:userData.permissions_id,
          count: true,
          pageindex: this.currentPage,
          pagesize: this.pagesize
        }
        var Dayparams = {
          methodUrl: 'personnelManagement/getDayAttendance',
          jsonParam: qs.stringify(dayData)
        }
        var that = this
        this.$axios.postRequest(Dayparams).then(function (res) {
          //成功之后处理逻辑
          that.dayAttendance = res.data.list
          that.total = res.data.totalcount
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        var userData = qs.parse(sessionStorage.getItem("userData"));
        this.currentPage = val
        var dayData = {
          regserial: userData.company_serial,
          permissions_id:userData.permissions_id,
          count: true,
          pageindex: val,
          pagesize: this.pageSize
        }
        var Dayparams = {
          methodUrl: 'personnelManagement/getDayAttendance',
          jsonParam: qs.stringify(dayData)
        }
        var that = this
        this.$axios.postRequest(Dayparams).then(function (res) {
          //成功之后处理逻辑
          that.dayAttendance = res.data.list
          that.total = res.data.totalcount
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      },
      finds(){
        var department = "";
        if (this.value3 !== '' && this.value4 === '') {
          department = this.value3
        } else if (this.value4 !== '') {
          department = this.value4
        }
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var monthData = {
          count: true,
          pageindex: 1,
          regserial: userData.company_serial,
          permissions_id:userData.permissions_id,
          department_serial: department,
          jmonth: this.value5,
          student_dep_serial: this.value6,
          userName: this.input2,
          position_id: this.value7,


        }
        var Monthparams = {
          methodUrl: 'personnelManagement/getMonthAttendance',
          jsonParam: qs.stringify(monthData)
        }
        var that = this
        this.$axios.postRequest(Monthparams).then(function (res) {
          //成功之后处理逻辑
          that.monthAttendance = res.data.list
          that.total = res.data.totalcount
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })

      },
      handleSizeChanges(vals) {
        var userData = qs.parse(sessionStorage.getItem("userData"));
        console.log(`每页 ${vals} 条`);
        this.pageSize = vals
        var monthData = {
          regserial: userData.company_serial,
          permissions_id:userData.permissions_id,
          count: true,
          pageindex: this.currentPages,
          pagesize: this.pagesizes
        }
        var Monthparams = {
          methodUrl: 'personnelManagement/getMonthAttendance',
          jsonParam: qs.stringify(monthData)
        }
        var that = this
        this.$axios.postRequest(Monthparams).then(function (res) {
          //成功之后处理逻辑
          that.monthAttendance = res.data.list
          that.total = res.data.totalcount
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      },
      handleCurrentChanges(vals) {
        console.log(`当前页: ${vals}`);
        var userData = qs.parse(sessionStorage.getItem("userData"));
        this.currentPage = vals
        var monthData = {
          regserial: userData.company_serial,
          permissions_id:userData.permissions_id,
          count: true,
          pageindex: vals,
          pagesize: this.pageSize
        }
        var monthparams = {
          methodUrl: 'personnelManagement/getMonthAttendance',
          jsonParam: qs.stringify(monthData)
        }
        var that = this
        this.$axios.postRequest(monthparams).then(function (res) {
          //成功之后处理逻辑
          that.monthAttendance = res.data.list
          that.total = res.data.totalcount
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      },
      //导出日考勤
      exportCh(fileName, docType){

        var department = "";
        if (this.value3 !== '' && this.value4 === '') {
          department = this.value3
        } else if (this.value4 !== '') {
          department = this.value4
        }
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var dayData = {
          count: true,
          pageindex: 1,
          pagesize: 100000,
          regserial: userData.company_serial,
          permissions_id:userData.permissions_id,
          department_serial: department,
          jdate: this.value1,
          student_dep_serial: this.value2,
          position_id: this.value3,
          attStatus: this.value4,
          userName: this.input1,
        }
        docType = docType || "pdf";//默认导出pdf
        var gridCols = this.Day

        var Dayparams = {
          methodUrl: 'personnelManagement/getDayAttendance',
          jsonParam: JSON.stringify(dayData),
          exportStr: JSON.stringify(gridCols),
          exportType: docType,
          exportTitle:fileName
        }
        var that = this
        //jindu
        axios.post("sys/export.do", Dayparams
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
      Browser(){
        var browser = {
          msie: false, msie7: false, msie8: false, msie9: false,
          msie10: false, msie11: false, chrome: false, firefox: false
        }
        var ver = null, u = window.navigator.userAgent.toLocaleLowerCase();
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

        return browser
      },
      //导出月考勤
      exportChu(fileName, docType){
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var department = "";
        if (this.value3 !== '' && this.value4 === '') {
          department = this.value3
        } else if (this.value4 !== '') {
          department = this.value4
        }
        var monthData = {
          count: true,
          pageindex: 1,
          pagesize: 100000,
          regserial: userData.company_serial,
          permissions_id:userData.permissions_id,
          department_serial: department,
          jmonth: this.value5,
          student_dep_serial: this.value6,
          userName: this.input2,
          position_id: this.value7,
        }
        docType = docType || "pdf";//默认导出pdf
        var gridCols = this.Month

        var Monthparams = {
          methodUrl: 'personnelManagement/getMonthAttendance',
          jsonParam: JSON.stringify(monthData),
          exportStr: JSON.stringify(gridCols),
          exportType: docType,
          exportTitle:fileName
        }
        var that = this
        
        //jindu
        axios.post("sys/export.do", Monthparams
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
      Browser(){
        var browser = {
          msie: false, msie7: false, msie8: false, msie9: false,
          msie10: false, msie11: false, chrome: false, firefox: false
        }
        var ver = null, u = window.navigator.userAgent.toLocaleLowerCase();
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

        return browser
      },

      //表格传数据
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      adopt(){

        var wasder = this.multipleSelection;
        for (var i = 0; i < wasder.length; i++) {
          wasder[i].name = '请假（通过）'

        }
        this.dialogVisible = false;
      },
      reject(){

        var wasder = this.multipleSelection;
        for (var i = 0; i < wasder.length; i++) {
          wasder[i].name = '事假（驳回）'

        }
        this.dialogVisible = false;
      },

      //提交修改
      submitUpdate(){

        var wasder = this.multipleSelection;
        var paramList = []

        for (var i = 0; i < wasder.length; i++) {

          paramList.push(wasder[i].id)


        }


        var that = this
//

        var userData = qs.parse(sessionStorage.getItem("userData"));
        var dayData = {
          lx: 1,
          jtype: 1,
          jdolx: 1,
          regserial: userData.company_serial,
          jlog_ip: '',
          jgly_Serial: userData.role_id,
          id: paramList.join(',')
        }

        this.dialogVisible6 = false
        var Dayparams = {
          methodUrl: 'personnelManagement/examine',
          jsonParam: qs.stringify(dayData)
        }

        this.$axios.postRequest(Dayparams).then(function (res) {
          //成功之后处理逻辑
          that.find()

        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
        this.dialogVisible = false;

      },
      submitRefuse(){

        var wasder = this.multipleSelection;
        var paramList = []

        for (var i = 0; i < wasder.length; i++) {
          wasder[i].name = '请假（拒绝）'
          paramList.push(wasder[i].id)


        }


        var that = this
//        var result = wasder
//        result.push(
//        )


        var dayData = {
          lx: 1,
          jtype: 1,
          jdolx: 2,
          regSerial: 10001,
          jlog_ip: '',
          jgly_Serial: 20000001,
          id: paramList.join(',')
        }

        this.dialogVisible6 = false
        var Dayparams = {
          methodUrl: 'personnelManagement/examine',
          jsonParam: qs.stringify(dayData)
        }
        console.log(paramList.join(','))
        this.$axios.postRequest(Dayparams).then(function (res) {
          //成功之后处理逻辑
          that.find()

        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
        this.dialogVisible = false;

      }
    },
    mounted(){
      var userData = qs.parse(sessionStorage.getItem("userData"));
      var that = this

      //获取道馆
      var roomData = {
        regserial: userData.company_serial,
        permissions_id:userData.permissions_id,

        dep_lx: '1',

      }
      var roomParams = {
        methodUrl: 'memberManagement/memberClass',
        jsonParam: qs.stringify(roomData)
      }
      this.$axios.postRequest(roomParams).then(function (res) {
        //成功之后处理逻辑
        that.roadMuseum = res.data
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })


      //获取岗位
      var postData = {
        regserial: userData.company_serial,


      }
      var postParams = {
        methodUrl: 'personnelManagement/getPost',
        jsonParam: qs.stringify(postData)
      }
      this.$axios.postRequest(postParams).then(function (res) {
        //成功之后处理逻辑
        that.post = res.data
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })

      //获取考勤状态
      var checkData = {
        regserial: userData.company_serial,


      }
      var checkParams = {
        methodUrl: 'personnelManagement/getAttendanceStatus',
        jsonParam: qs.stringify(checkData)
      }
      this.$axios.postRequest(checkParams).then(function (res) {
        //成功之后处理逻辑
        that.AttendanceStatus = res.data
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })

      //获取日考勤表格信息
      var dayData = {
        count: true,
        pageindex: 1,
        pagesize: 20,
        regserial: userData.company_serial,
        permissions_id:userData.permissions_id,
      }
      var Dayparams = {
        methodUrl: 'personnelManagement/getDayAttendance',
        jsonParam: qs.stringify(dayData)
      }

      this.$axios.postRequest(Dayparams).then(function (res) {
        //成功之后处理逻辑

        that.dayAttendance = res.data.list
        that.total = res.data.totalcount
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })

      //获取月考勤表格信息
      var monthData = {
        count: true,
        pageindex: 1,
        pagesize: 20,
        regserial: userData.company_serial,
        permissions_id:userData.permissions_id,
      }
      var Monthparams = {
        methodUrl: 'personnelManagement/getMonthAttendance',
        jsonParam: qs.stringify(monthData)
      }

      this.$axios.postRequest(Monthparams).then(function (res) {
        //成功之后处理逻辑

        that.monthAttendance = res.data.list
        that.total = res.data.totalcount
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })

    },

  };
</script>
<style scoped>
  .wai {
    margin: 0;

  }

  .select {
    width: 100px;
  }

  .wai ul {
    float: left;
    margin: 10px 10px 10px 0;
  }

  .input .el-input__inner {
    border: 7px solid saddlebrown;
  }
</style>
