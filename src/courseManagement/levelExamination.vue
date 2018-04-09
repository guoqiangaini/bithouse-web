<template>
  <div>
    <!--下拉条件开始-->
    <div>
      <div class="wai">
        <ul>
          <span class="size">年限</span>
          <el-date-picker
            :editable="false"
            v-model="year"
            align="right"
            type="year"
            size="mini"
            placeholder="选择年" format="yyyy" value-format="yyyy">
          </el-date-picker>
        </ul>
        <ul>
          <span class="size">考级活动</span>
          <el-select clearable v-model="testname" placeholder="请选择" size="mini">
            <el-option

              v-for="item in testName"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </ul>
        <ul>
          <el-button size="mini" type="info" class="btn" @click="selectTestDetail">查询</el-button>
          <el-button size="mini" type="info" class="btn" @click="exportCh('考级活动','xlsx')">导出</el-button>
          <el-button size="mini" type="info" class="btn" @click="dialogFormVisible = true">发起考级活动</el-button>
        </ul>
        <el-dialog
          title="发起考级活动"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :visible.sync="dialogFormVisible"
          @close="closeDialog()"
          >
          <el-form :model="form" :show-message="false"  :rules="rules" ref="form" label-width="80px">
            <el-form-item label="活动名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入考级名称" size="mini" style="margin-bottom: 10px;width: 80%" ></el-input>
            </el-form-item>
            <el-form-item label="参加道馆" prop="region" >
              <el-col :span="11">
              <el-select size="mini"  clearable v-model="form.region" placeholder="请选择活动区域"  style="margin-bottom: 10px;width: 100%">
                <el-option
                  v-for="item in rooms"
                  :key="item.department_serial"
                  :label="item.department_name"
                  :value="item.department_serial">
                </el-option>
              </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="报名时间" prop="startTime">
              <el-col :span="11">
                <el-date-picker :editable="false" size="mini" type="date" placeholder="选择日期" v-model="form.startTime" style="width: 100%;margin-bottom: 10px"
                                format="yyyy-MM-dd" value-format="yyyy-MM-dd" ></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="截止时间" prop="expiryDate">
              <el-col :span="11">
                <el-date-picker :editable="false" size="mini" type="date" placeholder="选择日期" v-model="form.expiryDate" style="width: 100%;margin-bottom: 10px"
                                format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="考试时间" prop="testDate">
              <el-col :span="11">
                <el-date-picker :editable="false" size="mini" type="date" placeholder="选择日期" v-model="form.testDate" style="width: 100%;margin-bottom: 10px"
                                format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="考级地点" prop="testAddress">
              <el-input size="mini" placeholder="请输入考级地点" v-model="form.testAddress" style="width: 80%"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align: center">
            <el-button @click="dialogFormVisible = false" size="mini" class="dialogCancelButton">取 消</el-button>
            <el-button type="primary" @click="addTest" size="mini">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <!--下拉条件结束-->

    <!--表格内容开始-->
    <div>
      <el-table
        ref="multipleTable"
        :data="testLevel"
        border
        tooltip-effect="dark"
        size="mini"
        :headerCellStyle="headerSetStyle"
        :cellStyle="cellSetStyle"
        style="width: 100% ;"
        :default-sort="{prop: 'date', order: 'descending'}"
        @sort-change='selectTestDetail'
        @selection-change="handleSelectionChange"
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

          prop="name"
          label="考级活动"
          width="180"
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
          label="考试人数"
          prop="jcnt"

        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">{{scope.row.jcnt}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="startDate"

          label="报名日期"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="endDate"

          label="报名截止日期"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="examDate"

          label="考试日期"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="examAddress"

          label="考试地点"
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
        :total="total" style="margin-top: 20px;text-align: right">
      </el-pagination>
    </div>
    <!--表格内容结束-->
  </div>
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
        tableObject: [
          {
            field: 'test',
            width: '180',
            title: "考级活动",
          },
          {
            field: 'dep_parent_name',
            width: '80',
            title: "道馆",
          },
          {
            field: 'examiner',
            width: '80',
            title: "考试人数",
          },
          {
            field: 'start_date',
            width: '120',
            title: "报名日期",
          },
          {
            field: 'end_date',
            width: '90',
            title: "报名截止日期",
          },
          {
            field: 'test_date',
            width: '60',
            title: "考试日期",
          },
          {
            field: 'test_site',
            width: '110',
            title: "考试地点",
          }
        ],
        dialogFormVisible: false,
        year: '',
        testname: '',
        testName: [],
        testLevel: [],
        rooms: [],
        //数据条数
        total: 0,
        //默认一页条数
        pageSize: 20,
        //默认页码
        currentPage: 1,
        value1: '',
        value2: '',
        value5: '',
        input: '',
        dialogVisible: false,
        form: {
          name: '',
          region: '',
          startTime: '',
          expiryDate: '',
          testDate: '',
          testAddress: '',
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
          ],
          region: [
            {required: true, message: '请选择道馆', trigger: 'change'}
          ],
          startTime: [
            { required: true, message: '请选择报名时间', trigger: 'change'}
          ],
          expiryDate: [
            { required: true, message: '请选择截止时间', trigger: 'change'}
          ],
          testDate: [
            { required: true, message: '请选择考试时间', trigger: 'change'}
          ],
          testAddress: [
            {required: true, message: '请填写考级地点', trigger: 'blur'}
          ],
        },
        orderByName: '',
        value: ''
      };
    },
    methods: {
      closeDialog(){
        //this.dialogVisible = false
        this.$refs.addForm.resetFields();
      }, /*清空表单样式调用*/
      //表头样式
      headerSetStyle(){
        return {
          "background-color": "#e5e5e5",
          "color": "#303133",
          "border-color": "#c1c3c9"
        }
      },
      //表格样式
      cellSetStyle(){
        return {
          "color": "#303133",
          "border-color": "#c1c3c9"
        }
      },
      //导出
      exportCh(fileName, docType){

        var userData = qs.parse(sessionStorage.getItem("userData"));
        var postData = {
          regserial: userData.company_serial,
          permissions_id: userData.permissions_id,
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
          exportType: docType,
          exportTitle: fileName
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
            'docType': docType,

          };
          //另存为文档
          window.open("exportFile.do?" + qs.stringify(fileParam));

        }, (err) => {
          console.log(err)
        })
      },
      selectTestDetail(column){
        var that = this
        //加载考级记录表
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
        var testsData = {
          regserial: userData.company_serial,
          permissions_id: userData.permissions_id,
          life: this.year,
          examActivity_id: this.testname,
          count: true,
          pageindex: 1,
          pagesize: 20,
          orderby: this.orderByName
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
      addTest(form){
        this.$refs.form.validate((valid) => {
          if (valid) {
            var userData = qs.parse(sessionStorage.getItem("userData"));
            this.dialogFormVisible = false
            var activityData = {
              regserial: userData.company_serial,
              name: this.form.name,
              dep_serial_str: this.form.region,
              startDate: this.form.startTime,
              endDate: this.form.expiryDate,
              examDate: this.form.testDate,
              examAddress: this.form.testAddress,
              operatorID: userData.role_id,
              operatorIP: ''
            }
            var that = this
            var activityParams = {
              methodUrl: 'courseManagement/submitLevelExaminationInfo',
              jsonParam: qs.stringify(activityData)
            }
            this.$axios.postRequest(activityParams).then(function (res) {
              that.selectTestDetail()
            }, function (res) {
              //失败之后处理逻辑
              console.log("error:" + res)
            })
          } else {
            return false;
          }
        });

      },
      //分页
      handleSizeChange(val) {
        this.pageSize = val
        var userData = qs.parse(sessionStorage.getItem("userData"));
        this.selectTestDetail()
      },
      handleCurrentChange(val) {
        var userData = qs.parse(sessionStorage.getItem("userData"));
        this.currentPage = val
        this.selectTestDetail()
      },
      handleSelectionChange(val) {
        this.multipleSelections = val;
        console.log(val)
      },
      handleEdit(index, row){
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var that = this
        var id = row.examActivity_id
        var roomId = row.dep_parent_serial
        var activeMemberListData = {
          examActivity_id: id,
          dep_parent_serial: roomId,
          regserial: userData.company_serial,
        }
        var activeMemberListParams = {
          methodUrl: 'courseManagement/getLevelExaminationStudentInfo',
          jsonParam: qs.stringify(activeMemberListData)
        }
        this.$axios.postRequest(activeMemberListParams).then(function (res) {
          //成功之后处理逻辑
          that.activeMemberList = res.data.list
          that.$router.push({name: 'activeMemberList', params: {id: id, roomId: roomId, code: that.activeMemberList}})
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })

      }

    },
    mounted(){
      var userData = qs.parse(sessionStorage.getItem("userData"));
      var that = this
      //获取考级活动
      that.selectTestDetail()
      //获取考级活动名称
      var testData = {
        regserial: userData.company_serial,
      }
      var testParams = {
        methodUrl: 'courseManagement/getTest',
        jsonParam: qs.stringify(testData)
      }
      this.$axios.postRequest(testParams).then(function (res) {
        //成功之后处理逻辑
        that.testName = res.data
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })
      //加载道馆信息
      var roomData = {

        dep_lx: '1',
        regserial: userData.company_serial,
        permissions_id: userData.permissions_id,
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
    }

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

  .input2 {
    height: 30px;
    width: 200px;
  }

  .block {
    margin: 20px 0 0 850px;
  }

  .tckFirst ul {
    float: left;
    margin: 10px 0 10px 10px;
  }

  .tckSecond ul {

    margin: 10px 0 10px 10px;
  }

  .size {
    font-size: 12px;
    color: #101010;
    margin-right: 5px;
  }

</style>
