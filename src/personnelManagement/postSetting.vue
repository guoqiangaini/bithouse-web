
<template>
  <div>
    <div class="wai">

      <ul>
        <el-button size="mini" type="info" @click="dialogVisible = true">新增岗位</el-button>
        <el-button size="mini" type="info">修改</el-button>
        <el-button size="mini" type="info">删除</el-button>
        <el-dialog
          title="新增"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :visible.sync="dialogVisible"
          width="35%"
        >


          <div>
            <el-row>
              <el-col :span="4">岗位名称</el-col>
              <el-col :span="11">
                <el-input v-model="input1" style="width:200px" size="mini"></el-input>
              </el-col>
              <el-col :span="7">
                <el-select v-model="value1" placeholder="请选择" size="mini" class="select" @change="changePost">
                  <el-option
                    v-for="item in role"
                    :key="item.role_id"
                    :label="item.role_name"
                    :value="item.role_id"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4" style="margin: 5px 0 5px 0"><span>底薪 </span></el-col>
              <el-col :span="11" style="margin: 5px 0 5px 0">
                <el-input v-model="basicSalary" style="width:330px" size="mini"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4" style="margin: 5px 0 5px 0"><span>岗位工资</span></el-col>
              <el-col :span="11" style="margin: 5px 0 5px 0">
                <el-input v-model="wageJobs" style="width:330px" size="mini"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4" style="margin: 5px 0 5px 0"><span>满勤奖</span></el-col>
              <el-col :span="11" style="margin: 5px 0 5px 0">
                <el-input v-model="fullCourtAward" style="width:330px" size="mini"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4" style="margin: 5px 0 5px 0"><span>新报</span></el-col>
              <el-col :span="11" style="margin: 5px 0 5px 0">
                <el-input v-model="newReport" style="width:330px" size="mini"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4" style="margin: 5px 0 5px 0"><span>转介绍</span></el-col>
              <el-col :span="11" style="margin: 5px 0 5px 0">
                <el-input v-model="turnToIntroduce" style="width:330px" size="mini"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4" style="margin: 5px 0 5px 0"><span>升级</span></el-col>
              <el-col :span="11" style="margin: 5px 0 5px 0">
                <el-input v-model="upgrade" style="width:330px" size="mini"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4" style="margin: 5px 0 5px 0"><span>开票费</span></el-col>
              <el-col :span="11" style="margin: 5px 0 5px 0">
                <el-input v-model="fillCost" style="width:330px" size="mini"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4" style="margin: 5px 0 5px 0"><span>续费</span></el-col>
              <el-col :span="11" style="margin: 5px 0 5px 0">
                <el-input v-model="renewals" style="width:330px" size="mini"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4" style="margin: 5px 0 5px 0"><span>课时费</span></el-col>
              <el-col :span="11" style="margin: 5px 0 5px 0">
                <el-input v-model="classHour" style="width:330px" size="mini"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4" style="margin: 5px 0 5px 0"><span>比赛奖励</span></el-col>
              <el-col :span="11" style="margin: 5px 0 5px 0">
                <el-input v-model="competitionRewards" style="width:330px" size="mini"></el-input>
              </el-col>
            </el-row>
            <el-row v-for="(positionInfo,index) in project">
              <el-col :span="4" style="margin: 5px 0 5px 0"><span>{{positionInfo.name}}</span></el-col>
              <el-col :span="11" style="margin: 5px 0 5px 0">
                <el-input @focus="focusExamItem(index)" @change="getExamItem" style="width:330px"
                          size="mini"></el-input>
              </el-col>
            </el-row>
          </div>


          <div slot="footer" class="dialog-footer" style="text-align: center">
            <el-button size="mini" @click="dialogVisible = false" class="dialogCancelButton">取 消</el-button>
            <el-button size="mini" type="primary" @click="addMember">提交</el-button>
          </div>
        </el-dialog>

      </ul><!--按钮-->
    </div>
    <el-table
      ref="multipleTable"
      :data="postSetting"
      size="mini"
      border
      @row-click="openDetails"
      header-align="center"
      tooltip-effect="dark"
      :headerCellStyle="headerSetStyle"
      :cellStyle="cellSetStyle"
      style="width: 100%;position:inherit"
      class="elTableBorder"
    >
      <el-table-column
        align="center"
        type="selection"
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
        prop="name"
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
        prop="fillCost"
        label="开票费"
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
        prop="classHour"
        label="新报高手会"
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
        prop="renewals"
        label="续1年/两年/高手会"
        width="140">

      </el-table-column>
      <el-table-column
        align="center"
        prop="classHour"
        label="学员出勤"
        width="120">

      </el-table-column>
      <el-table-column
        align="center"
        prop="competitionRewards"
        label="比赛成绩"
      >
      </el-table-column>

    </el-table><!--工资发放表-->

  </div>

</template>
<script>
  import axios from 'axios'
  import qs from 'qs'
  import {mapState} from 'vuex'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  export  default{
    components: {
      ElCol,
      ElRow
    },
    data() {
      return {
        role: [],//获取角色
        project: [],//获取角色
        projectList: [],
        Gname: '',//岗位名称
        role_id: '',//角色id
        basicSalary: '',//底薪
        wageJobs: '',//岗位工资
        fullCourtAward: '',//满勤奖
        newReport: '',// 新报
        turnToIntroduce: '',//转介绍
        upgrade: '',//升级
        fillCost: '',//开票费
        renewals: '',//续费
        classHour: '',//课时费
        competitionRewards: '',//比赛奖励
        nameID: [],


        activeName2: 'first',
        postSetting: [],//岗位设置表
        positionInfoList: [],
        multipleTable: [],//
        multipleSelection: [],
        getExamItemIndex: [],
        examItemValues: [],
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        value1: '',//通用
        input1: '',//岗位名称
        input2: '',//底薪
        input3: '',//岗位工资
        input4: '',//满勤奖
        input5: '',//开票费
        input6: '',//新报
        input7: '',//新报高手会
        input8: '',//转介绍
        input9: '',//续费一年卡
        input10: '',//续费两年卡
        input11: '',//续费高手会
        input12: '',//学员出勤
        input13: '',//比赛成绩
        dialogVisible: false,


      };
    },
    computed: {
      regserial(){
        return this.$store.state.regserial
      },
      permissions_id(){
        return this.$store.state.permissions_id
      },
      poster(){
        return this.$store.state.poster
      },
      posters(){
        return this.$store.state.posters
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
      var userData = qs.parse(sessionStorage.getItem("userData"));
      var that = this
      //获取角色
      var roleData = {

        regserial: userData.company_serial,
        permissions_id: userData.permissions_id,
      }
      var roleParams = {
        methodUrl: 'personnelManagement/getRole',
        jsonParam: qs.stringify(roleData)
      }
      this.$axios.postRequest(roleParams).then(function (res) {
        //成功之后处理逻辑
        that.role = res.data
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })

//      //选择角色加载对应项目
      this.find();
//      //获取岗位设置表格信息
//      var setupData = {
//        count:true,
//        pageindex:1,
//        pagesize:20,
//        regserial: userData.company_serial,
//        permissions_id:userData.permissions_id,
//      }
//      var Setupparams = {
//        methodUrl:'personnelManagement/getPostSet',
//        jsonParam:qs.stringify(setupData)
//      }
//
//      this.$axios.postRequest(Setupparams).then(function(res) {
//        //成功之后处理逻辑
//
//        that.postSetting=res.data.list
//        that.total=res.data.totalcount
//      }, function(res) {
//        //失败之后处理逻辑
//        console.log("error:" + res)
//      })

    },
    methods: {
      find(){
        var that = this;
        var userData = qs.parse(sessionStorage.getItem("userData"));
        console.log('7894654113')
        var setupData = {
          count: true,
          pageindex: 1,
          pagesize: 10000,
          regserial: userData.company_serial,
          permissions_id: userData.permissions_id,
        }
        var Setupparams = {
          methodUrl: 'personnelManagement/getPostSet',
          jsonParam: qs.stringify(setupData)
        }

        this.$axios.postRequest(Setupparams).then(function (res) {
          //成功之后处理逻辑

          that.postSetting = res.data.list
          that.total = res.data.totalcount
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })

      },
      focusExamItem(index){
        this.getExamItemIndex = index
      },
      getExamItem(value123){
        this.examItemValues[this.getExamItemIndex] = value123;
      },
      //打开详情
      openDetails(row, event, column){

        var getExamItemValue = [];
        for (var i = 0; i < getExamItemValue.length; i++) {
          getExamItemValue[i] = this.getExamItemValue;
        }
        this.input1 = row.name
        this.value1 = row.role_id//角色(没有绑定的角色)
//        this.value13 = row.status_id
        this.basicSalary = row.basicSalary
        this.wageJobs = row.wageJobs
//        this.value17 = row.student_no
        this.fullCourtAward = row.fullCourtAward
        this.newReport = row.newReport
        this.turnToIntroduce = row.turnToIntroduce
        this.upgrade = row.upgrade
        this.fillCost = row.fillCost
        this.renewals = row.renewals
        this.classHour = row.classHour
        this.competitionRewards = row.competitionRewards


        this.dialogVisible = true
      },


      headerSetStyle(){
        return {
          "background-color": "#e5e5e5",
          "color": "#303133",
          "border-color": "#c1c3c9"
        }
      },
      cellSetStyle(){
        return {
          "color": "#606266",
          "border-color": "#c1c3c9"

        }
      },
      //角色ID
      changePost(){

        var userData = qs.parse(sessionStorage.getItem("userData"));
        var that = this
        var projectData = {

          role_id: that.value1,


          permissions_id: userData.permissions_id,
        }
        var projectParams = {
          methodUrl: 'personnelManagement/getRolePostSet',
          jsonParam: qs.stringify(projectData)
        }
        this.$axios.postRequest(projectParams).then(function (res) {
          //成功之后处理逻辑
          that.project = res.data;
          console.log(6666666666666666666)


//          that.examItemValues = new Array(project2.length)


        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })

      },
//      handleClick(tab, event) {
//        console.log(tab, event);
//      },
      //添加
      addMember(){
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var that = this
        var postExamItemValues = that.project;
        console.log('55555555555555555555')
        console.log(that.project)
        for (var i = 0; i < postExamItemValues.length; i++) {

          that.nameID.push(postExamItemValues[i].auditItem_id)
        }
        var uploadValues = that.examItemValues;


        var memberData = {
          auditItem_ids: that.nameID.join(','),
          jvalues: uploadValues.join(','),
          operatorIP: '',
          jopreatorSerial: userData.employee_no,
          name: that.input1,
          role_id: userData.employee_serial,
          basicSalary: that.basicSalary,
          wageJobs: that.wageJobs,
          fullCourtAward: that.fullCourtAward,
          newReport: that.newReport,
          turnToIntroduce: that.turnToIntroduce,
          upgrade: that.upgrade,
          fillCost: that.fillCost,
          renewals: that.renewals,
          classHour: that.classHour,
          competitionRewards: that.competitionRewards,
          regserial: userData.company_serial,
        }
        var coachParams = {
          methodUrl: 'personnelManagement/addPostSet',
          jsonParam: qs.stringify(memberData)
        }
        this.$axios.postRequest(coachParams).then(function (res) {
          //成功之后处理逻辑
          that.find()
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
        that.dialogVisible = false

      },
      goodsCbChange(e){
        var goodsSelectedList = e
        var value = 0
        for (var i = 0; i < goodsSelectedList.length; i++) {
          for (var j = 0; j < this.goodsCbList.length; j++) {
            if (goodsSelectedList[i] == this.goodsCbList[j].name) {
              value = value + this.goodsCbList[j].count
            }
          }
        }
        this.goodsCountParams = value
      },
      //修改
      updateMember(){
        var that = this
        if (this.multipleSelection.length < 1) {
          this.$message({
            message: '请选择学员',
            showClose: true,
            type: 'warning'
          });
          this.dialogVisibleTwo = false
        } else if (this.multipleSelection.length > 1) {
          this.$message({
            message: '只能选择一名学员',
            showClose: true,
            type: 'warning'
          });
          this.dialogVisibleTwo = false
        } else {
          this.multipleSelection.forEach(function (v) {
            that.addValue1 = v.department_name
            that.addValue2 = v.name
            that.addValue4 = v.employee_name
            that.value39 = v.employee_sex//性別
            that.addValue = v.employee_birthday//年齡
            that.addValue3 = v.employee_no
            that.history = v.entryDate//入職日期
            that.addValue15 = v.employee_phone
            that.value18 = v.jstatus//入职状态
            that.addValue18 = v.employee_serial

          })
          this.dialogVisibleTwo = true
        }
      },
      //提交修改
      submitUpdate(){

        var that = this
        var result = [];
        result.push(this.addValue1, this.addValue2, this.addValue3, this.addValue4, this.addValue5, this.addValue6, this.addValue7,
          this.addValue8, this.addValue9, this.addValue10, this.addValue11, this.addValue12, this.addValue13, this.addValue14, this.addValue15, this.addValue16,
          this.addValue17)
        var userData = qs.parse(sessionStorage.getItem("userData"));

        var updateMemberData = {
          jlx: 1,
          jdolx: 2,
          jSerial: this.addValue18,
          jname: this.addValue4,
          picUrl: '',
          regSerial: userData.company_serial,
          jlog_ip: '',
          jgly_Serial: userData.employee_serial,
          jtext: result.join(',')
        }

        var updateMemberParams = {
          methodUrl: 'memberManagement/memberOperation',
          jsonParam: qs.stringify(updateMemberData)
        }
        this.dialogVisibleTwo = false

        this.$axios.postRequest(updateMemberParams).then(function (res) {
          //成功之后处理逻辑
          that.find()

        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      },
      //删除
      deleteMember(){
        var that = this
        if (this.multipleSelection.length > 0) {
          var arrvalue = [];//用于存放取出的数组的值
          for (var i = 0; i < this.multipleSelection.length; i++) {
            arrvalue.push(this.multipleSelection[i].student_serial);//数组的索引是从0开始的
            console.log(arrvalue)
          }
          var userData = qs.parse(sessionStorage.getItem("userData"));

          var deleteData = {
            jlx: 2,
            jdolx: 3,
            jSerial: 0,
            name: '',
            picUrl: '',
            regserial: userData.company_serial,
            jlog_ip: '',
            jgly_Serial: userData.employee_serial,
            jtext: arrvalue.join(',')
          }
          var deleteParams = {
            methodUrl: 'personnelManagement/updatePostSet',
            jsonParam: qs.stringify(deleteData)
          }
          this.$axios.postRequest(deleteParams).then(function (res) {
            //成功之后处理逻辑
            that.find()
          }, function (res) {
            //失败之后处理逻辑
            console.log("error:" + res)
          })


        }
      },
      transfers(){
        if (this.multipleSelection.length < 1) {
          this.$message({
            message: '请选择数据',
            showClose: true,
            type: 'warning'
          });
          this.dialogVisible4 = false
        } else if (this.multipleSelection.length > 1) {
          this.$message({
            message: '只能选择一条数据',
            showClose: true,
            type: 'warning'
          });
          this.dialogVisible4 = false
        } else {
          var arr1 = [];
          this.multipleSelection.forEach(function (v) {
            arr1.push(v.dep_parent_name, v.department_name, v.student_serial);
          });
          this.ucs = arr1[0]
          this.uss = arr1[1]
          this.id = arr1[2]
          this.dialogVisible4 = true
        }

      },

    }
  };
</script>
<style scoped>
  .wai {
    margin: 0;
  }

  .select {
    width: 127px;
  }

  .wai ul {
    float: left;
    margin: 0 10px 10px 0;
  }

</style>
