<template>
  <div>
      <div class="wai">
        <ul>
          <span style="font-size: 12px">姓名</span>
          <el-input clearable v-model="input1" size="mini" placeholder="请输入内容" style="width: 100px"></el-input></ul><!--姓名-->
        <ul>
          <span style="font-size: 12px">岗位</span>
          <el-select clearable v-model="value1" placeholder="请选择" class="select" size="mini">
            <el-option
              v-for="item in post"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </ul><!--岗位-->
        <ul>
          <div class="block">
            <span style="font-size: 12px" class="demonstration">日期</span>
            <el-date-picker
              size="mini" clearable
              v-model="value2"
              type="date"
              placeholder="开始日期">
            </el-date-picker>
          </div></ul><!--开始日期-->

        <ul>
          <el-button size="mini" type="info" @click="find">查询</el-button>

          <el-button size="mini" type="info" @click="exportCh('工资发放','xlsx')">导出</el-button>

        </ul><!--按钮-->
      </div>
      <el-table
        size="mini"
        ref="multipleTable"
        :data="Payroll"
        border

        header-align="center"
        tooltip-effect="dark"
        :headerCellStyle="headerSetStyle"
        :cellStyle="cellSetStyle"
        style="width: 100%;position:inherit"
        class="elTableBorder"
      >
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
          prop="jmonth"
          label="月份"
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
          prop="position_name"
          label="岗位"
          width="100">

        </el-table-column>
        <el-table-column
          align="center"
          prop="basicSalary"
          label="底薪"
          width="100">

        </el-table-column>
        <el-table-column
          align="center"
          prop="wageJobs"
          label="岗位工资"
          width="100">

        </el-table-column>
        <el-table-column
          align="center"
          prop="fullCourtAward"
          label="满勤奖"
          width="100">

        </el-table-column>
        <el-table-column
          align="center"
          prop="newReport"
          label="新报"
          width="100">

        </el-table-column>
        <el-table-column
          align="center"
          prop="upgrade"
          label="升级"
          width="120">

        </el-table-column>

        <el-table-column
          align="center"
          prop="turnToIntroduce"
          label="转介绍"
          width="120">

        </el-table-column>
        <el-table-column
          align="center"
          prop="renew"
          label="续费"
          width="120">

        </el-table-column>
        <el-table-column
          align="center"
          prop="attendanceAward"
          label="比赛/出勤奖励"
          width="120">

        </el-table-column>
        <el-table-column
          align="center"
          prop="yearEndAwards"
          label="年终提成年终统一发放"
          width="150">
        </el-table-column>
        <el-table-column
          align="center"
          prop="insurance"
          label="保险个人部分"
          width="120">

        </el-table-column>
        <el-table-column
          align="center"
          prop="others"
          label="其他"
          width="120">

        </el-table-column>
        <el-table-column
          align="center"
          prop="jtotle"
          label=" 合计"
          show-overflow-tooltip>
        </el-table-column>
      </el-table><!--工资发放表-->
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
  </div>

</template>
<script>
  import axios from 'axios'
  import qs from 'qs'
  import {mapState} from 'vuex'
  export  default{
    data() {
      return {
        activeName2: 'first',
        pageSize:20,
        currentPage:1,
        post: [],//岗位
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        value1:'',
        value2:'',
        value3:'',
        total:0,
        input1:'',

        Payroll: [],//工资发放表
        Payrolls:[
          {
            field:'jmonth',
            width:'100',
            title:"月份",
          },
          {
            field:'userName',
            width:'100',
            title:"姓名",
          },
          {
            field:'position_name',
            width:'100',
            title:"岗位",
          },
          {
            field:'basicSalary',
            width:'100',
            title:"底薪",
          },
          {
            field:'wageJobs',
            width:'100',
            title:"岗位工资",
          },
          {
            field:'fullCourtAward',
            width:'100',
            title:"满勤奖",
          },
          {
            field:'newReport',
            width:'100',
            title:"新报",
          },
          {
            field:'upgrade',
            width:'120',
            title:"升级",
          },
          {
            field:'turnToIntroduce',
            width:'120',
            title:"转介绍",
          },
          {
            field:'renew',
            width:'120',
            title:"续费",
          },
          {
            field:'attendanceAward',
            width:'120',
            title:"比赛/出勤奖励",
          },
          {
            field:'yearEndAwards',
            width:'120',
            title:"年终提成年中统一发放",
          },
          {
            field:'insurance',
            width:'120',
            title:"保险",
          },
          {
            field:'others',
            width:'120',
            title:"其他",
          },
          {
            field:'jtotle',
            width:'120',
            title:"合计",
          },
        ],//导出数据条件表
      };
    },
    methods: {
      headerSetStyle(){
        return{
          "background-color":"#e5e5e5",
          "color":"#303133",
          "border-color":"#c1c3c9"
        }
      },
      cellSetStyle(){
        return{
          "color":"#606266",
          "border-color":"#c1c3c9"

        }
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      find(){
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var department = "";
        if(this.value3!==''&& this.value4===''){
          department=this.value3
        }else if(this.value4!==''){
          department=this.value4
        }
        var wagesData = {
          count:true,
          pageindex:1,
          regserial: userData.company_serial,
          permissions_id:userData.permissions_id,
          department_serial:department,
          userName:this.input1,
          position_id:this.value1,
          jmonth:this.value2,


        }
        var Wagesparams = {
          methodUrl:'personnelManagement/getWagesInfo',
          jsonParam:qs.stringify(wagesData)
        }
        var that = this
        this.$axios.postRequest(Wagesparams).then(function(res) {
          //成功之后处理逻辑
          that.Payroll=res.data.list
          that.total=res.data.totalcount
        }, function(res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize=val
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var wagesData = {

          regserial: userData.company_serial,
          permissions_id:userData.permissions_id,
          count:true,
          pageindex:this.currentPage,
          pagesize:this.pagesize
        }
        var Wagesparams = {
          methodUrl:'personnelManagement/getWagesInfo',
          jsonParam:qs.stringify(wagesData)
        }
        var that = this
        this.$axios.postRequest(Wagesparams).then(function(res) {
          //成功之后处理逻辑
          that.Payroll=res.data.list
          that.total=res.data.totalcount
        }, function(res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      },
      handleCurrentChange(val) {
        var userData = qs.parse(sessionStorage.getItem("userData"));
        console.log(`当前页: ${val}`);
        this.currentPage=val
        var wagesData = {
          regserial: userData.company_serial,
          permissions_id:userData.permissions_id,
          count:true,
          pageindex:val,
          pagesize:this.pageSize
        }
        var Wagesparams = {
          methodUrl:'personnelManagement/getWagesInfo',
          jsonParam:qs.stringify(wagesData)
        }
        var that = this
        this.$axios.postRequest(Wagesparams).then(function(res) {
          //成功之后处理逻辑
          that.Payroll=res.data.list
          that.total=res.data.totalcount
        }, function(res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      },
      //导出
      exportCh(fileName,docType){

        var department = "";
        if(this.value3!==''&& this.value4===''){
          department=this.value3
        }else if(this.value4!==''){
          department=this.value4
        }
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var wagesData = {
          count:true,
          pageindex:1,
          pagesize:100000,
          regserial: userData.company_serial,
          permissions_id:userData.permissions_id,

          department_serial:department,
          userName:this.input1,
          position_id:this.value1,
          jmonth:this.value2,
        }
        docType = docType || "pdf";//默认导出pdf
        var gridCols = this.Payrolls

        var Wagesparams = {
          methodUrl:'personnelManagement/getWagesInfo',
          jsonParam:JSON.stringify(wagesData),
          exportStr : JSON.stringify(gridCols),
          exportType : docType,
          exportTitle:fileName
        }
        var that = this
        
        //jindu
        axios.post("sys/export.do",Wagesparams
          ,{
            'headers':{
              'Content-Type':'application/json;charset=utf-8'
            }
          }
        ).then((response) => {
//guanbi

          var fileParam = {
            'fileKey':encodeURI(response.data.info),
            'fileName':encodeURI(fileName),
            'browseType':this.Browser.firefox?"firefox":'',
            'docType':docType
          };
          //另存为文档
          window.open("exportFile.do?" + qs.stringify(fileParam));

        }, (err) => {
          console.log(err)
        })
      },
      Browser(){
        var browser = {msie:false,msie7:false,msie8:false,msie9:false,
          msie10:false,msie11:false,chrome:false,firefox:false}
        var ver = null,u = window.navigator.userAgent.toLocaleLowerCase();
        if(/(msie) ([\d.]+)/.test(u)) {
          ver = parseInt(/(msie) ([\d.]+)/.exec(u)[2]);
          browser.msie = true;
          if(ver < 8) browser.msie7 = true;
          else if(ver == 8) browser.msie8 = true;
          else if(ver == 9) browser.msie9 = true;
          else if(ver == 10) browser.msie10 = true;
        }else if(/(chrome)\/([\d.]+)/.test(u)) browser.chrome = true;
        else if(/(trident)\/([\d.]+)/.test(u)) {
          browser.msie11 = true;
          browser.msie = true;
        }else if(/(firefox)\/([\d.]+)/) browser.firefox = true;
        else if(/(safari)\/([\d.]+)/.test(u)) browser.safari = true;
        else if(/(opera)\/([\d.]+)/) browser.opera = true;

        return browser
      }
    },
    computed:{
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
    mounted(){
      var that = this
      var userData = qs.parse(sessionStorage.getItem("userData"));
      //获取岗位
      var postData = {
        regserial: userData.company_serial,
      }
      var postParams = {
        methodUrl:'personnelManagement/getPost',
        jsonParam:qs.stringify(postData)
      }
      this.$axios.postRequest(postParams).then(function(res) {
        //成功之后处理逻辑
        that.post = res.data
      }, function(res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })

      //获取工资表格信息
      var wagesData = {
        count:true,
        pageindex:1,
        pagesize:20,
        regserial: userData.company_serial,
        permissions_id:userData.permissions_id,
      }
      var Wagesparams = {
        methodUrl:'personnelManagement/getWagesInfo',
        jsonParam:qs.stringify(wagesData)
      }

      this.$axios.postRequest(Wagesparams).then(function(res) {
        //成功之后处理逻辑

        that.Payroll=res.data.list
        that.total=res.data.totalcount
      }, function(res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })
    }
  };
</script>
<style scoped>
  .wai{
    margin: 0;
  }
  .select{
    width: 100px;
  }
  .wai ul{
    float: left;
    margin: 0 10px 10px 0;
  }
</style>
