<template>
  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="题库统计" name="first">
      <!--条件查询开始-->
      <div class="wai">
        <ul >
          <span class="size">级别</span>
          <el-select v-model="level" clearable placeholder="全部" size="mini" style="width: 90px">
            <el-option
              v-for="item in levels"
              :key="item.id"
              :label="item.name"
              :value="item.id" >
            </el-option>
          </el-select>
        </ul>
        <ul>
          <span class="size">时间段</span>
          <el-date-picker
            :editable="false"
            v-model="timeScope"
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
        <ul >
          <el-button size="mini"  type="info" @click="selectTestBank">查询</el-button>
          <el-button size="mini"  type="info" @click="updateTestBank">修改</el-button>
          <el-button size="mini"  type="info" @click="deleteTestBank">删除</el-button>
          <el-button size="mini" type="info" @click="exportCh('题库统计','xlsx')">导出</el-button>
          <el-button size="mini" style="margin-right: 15px" type="info" @click="addTestBank">新增题库</el-button>
          <el-upload class="upload-demo"
                     :action="importUrl"
                     :data="dataParmes"
                     :name ="name"

                     :headers="importHeaders"
                     :on-preview="handlePreview"
                     :on-remove="handleRemove"
                     :before-upload="beforeUpload"
                     :on-error="uploadFail"
                     :on-success="uploadSuccess"
                     :file-list="fileList"
                     :with-credentials="withCredentials"
                     accept=".xls, .xlsx"
                     style="width:60px;float:right;margin-right: 60px"
          >
            <!-- 是否支持发送cookie信息 -->
            <el-button   size="mini" type="info">导入</el-button><!--  @click="importData"-->
            <!--<div slot="tip" class="el-upload__tip">只能上传excel文件</div>-->
          </el-upload>
        </ul>
      </div>
      <!--条件查询结束-->

      <!--新增、修改题库-->
      <el-dialog
        :title="dialogTitle"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :visible.sync="dialogVisible"
        width="900px"
        @close="clearFormData('form')"
      >
        <el-form ref="form" :show-message="false" :model="form" :rules="rules" label-width="80px">
          <el-row style="margin-bottom:10px">
          <el-form-item label="等级选择" prop="region">
            <el-select v-model="form.region" clearable placeholder="全部" size="mini" style="width: 230px">
              <el-option
                v-for="item in levels"
                :key="item.id"
                :label="item.name"
                :value="item.id" >
              </el-option>
            </el-select>
          </el-form-item>
          </el-row>
          <el-row style="margin-bottom:10px">
          <el-form-item label="题　　目" prop="name">
            <el-input  :autosize="{ minRows: 3, maxRows: 5}" type="textarea" v-model="form.name" placeholder="单行输入" style="width: 90%"></el-input>
          </el-form-item>
          </el-row>
          <el-row >
            <el-col :span="2" style="height: 40px;line-height: 40px;font-size:12px;color:#303133;">
              <span style="width:8.66px;display:inline-block;"></span>答&emsp;&emsp;案
            </el-col>
            <el-col :span="8" style="margin-bottom:5px;margin-left: 8px;">
              <el-form-item label="A" prop="choiceA" labelWidth="30px">
                <el-input size="mini" style="width: 200px" v-model="form.choiceA" placeholder="单行输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-bottom:5px;">
              <el-form-item label="B" prop="choiceB" labelWidth="30px">
                <el-input  size="mini" style="width: 200px" v-model="form.choiceB" placeholder="单行输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2" style="height: 40px;line-height: 40px;">

            </el-col>
            <el-col :span="8" style="margin-bottom:5px;margin-left: 8px;">
              <el-form-item label="C" prop="choiceC" labelWidth="30px">
                <el-input  size="mini" style="width: 200px" v-model="form.choiceC" placeholder="单行输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-bottom:5px">
              <el-form-item label="D" prop="choiceD" labelWidth="30px">
                <el-input size="mini" style="width: 200px" v-model="form.choiceD" placeholder="单行输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="正确答案" prop="rightAnswers">
                <el-select size="mini" v-model="form.rightAnswers" style="width: 230px" clearable placeholder="请选择">
                  <el-option
                    v-for="item in optionsAll"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="text-align: center">
              <div style="text-align: center;margin-top: 20px;">
                <el-button @click="dialogVisible = false" size="mini" class="dialogCancelButton">取消</el-button>
                <el-button type="primary" @click="submitTestBank(form)"  size="mini">提交</el-button>
              </div>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
     
      <!--表格内容加载-->
      <el-table
        ref="multipleTable"
        :data="questionBank"
        border
        size="mini"
        header-align="center"
        tooltip-effect="dark"
        style="width: 100%; "
        @sort-change="selectTestBank"
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
          prop="serial_number"
          label="序号"
          align="center"
          width="60">

        </el-table-column>
        <el-table-column
          prop="jName"
          align="center"
          label="级别"
          width="140">
        </el-table-column>
        <el-table-column
          prop="jquestionName"
          align="center"
          label="题目"
          width="720">
        </el-table-column>
        <el-table-column
          prop="jdate"
          align="center"
          label="录入日期"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
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
    </el-tab-pane>
    <el-tab-pane label="训练方法" name="second">
      <!--条件查询开始-->
      <div class="wai">
        <ul>
          <span class="size">级别</span>
          <el-select v-model="value2" placeholder="请选择" class="select" size="mini">
            <el-option
              v-for="item in levels"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </ul>
        <ul class="size">
          <span class="demonstration">时间段</span>
          <el-date-picker
            v-model="value3"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            :default-time="['12:00:00']">
          </el-date-picker>
        </ul>
        <ul>
          <el-button size="mini" type="info">查询</el-button>
          <el-button size="mini" type="info">修改</el-button>
          <el-button size="mini" type="info">删除</el-button>
          <el-button size="mini" type="info">导入</el-button>
          <el-button size="mini" type="info">导出</el-button>
          <el-button size="mini" type="info" @click="dialogVisible2= true">新增</el-button>
        </ul>
      </div>
      <!--条件查询结束-->
      <!--弹出框-->
      <el-dialog
        title="提示"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :visible.sync="dialogVisible2"
        width="30%"
        >
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer"></span>
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
  
      </el-dialog>
      <!--加载表格内容-->
      <el-table
        ref="multipleTable"
        :data="tableData2"
        border
        header-align="center"
        tooltip-effect="dark"
        style="width: 100%"
        size="mini"
        @sort-change="selectTestBank"
        :headerCellStyle="headerSetStyle"
        :cellStyle="cellSetStyle"
        @selection-change="handleSelectionChange"
        class="elTableBorder">
        <el-table-column
          type="selection"
          align="center"
         >
        </el-table-column>
        <el-table-column
          prop="number"
          label="序号"
          width="60">

        </el-table-column>
        <el-table-column
          prop="level"
          label="级别"
          width="140">
        </el-table-column>
        <el-table-column
          prop="trainMethod"
          label="训练方法"
          width="720">
        </el-table-column>
        <el-table-column
          prop="inputTime"
          label="录入日期"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>

      <div class="block">
        <!--分页-->
        <el-pagination
          layout="prev, pager, next"
          :total="1000" style="text-align: right;margin-top: 20px">
        </el-pagination>
      </div>

    </el-tab-pane>
    <el-tab-pane label="教案统计" name="third">
      <!--条件查询开始-->
      <div class="wai">
        <!--道馆-->
        <ul>
          <span class="size">道馆</span>
          <el-select v-model="value4" placeholder="请选择" class="select" size="mini">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </ul>
        <!--班级-->
        <ul>
          <span class="size">班级</span>
          <el-select v-model="value5" placeholder="请选择" class="select" size="mini">
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </ul>
        <!--教练-->
        <ul>
          <span class="size">教练</span>
          <el-select v-model="value6" placeholder="请选择" class="select" size="mini">
            <el-option
              v-for="item in options5"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </ul>
        <!--时间段-->
        <ul>
          <span class="size">时间段</span>
          <el-date-picker
            v-model="value7"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            :default-time="['12:00:00']">
          </el-date-picker>
        </ul>
        <!--查询-->
        <ul>
          <el-button size="mini" type="info">查询</el-button>
        </ul>
      </div>
      <!--条件查询结束-->

      <!--表格内容开始-->
      <el-table
        ref="multipleTable"
        :data="tableData3"
        border
        size="mini"
        header-align="center"
        style="width: 100%"

        :headerCellStyle="headerSetStyle"
        :cellStyle="cellSetStyle"
        @selection-change="handleSelectionChange"
        class="elTableBorder"
      >
        <el-table-column
          type="selection"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="number"
          label="序号"
          width="60"
        >

        </el-table-column>
        <el-table-column
          prop="roadMuseum"

          label="道馆"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="classes"
          label="班级"

          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="coach"
          label="教练"

          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="teachingPlan"
          label="教案"
          width="600"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="inputTime"
          label="录入日期"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <!--表格内容结束-->

      <!--分页-->
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="1000" style="text-align: right;margin-top: 20px">
        </el-pagination>
      </div>
      <!--分页结束-->
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import axios from "axios";
import qs from "qs";
import { mapState } from "vuex";
import ElCol from "element-ui/packages/col/src/col";
import ElRow from "element-ui/packages/row/src/row";
export default {
  components: {
    ElRow,
    ElCol
  },
  data() {
    return {
      tableObject: [
        {
          field: "jName",
          width: "140",
          title: "级别"
        },
        {
          field: "jquestionName",
          width: "720",
          title: "题目"
        },
        {
          field: "jdate",
          width: "80",
          title: "录入时间"
        }
      ],
      importUrl: "sys/import.do", //后台接口config.admin_url+'rest/schedule/import/'
      importHeaders: {
        enctype: "multipart/form-data",
        cityCode: ""
      },
      name: "import",
      fileList: [],
      withCredentials: true,
      processing: false,
      uploadTip: "导入",
      importFlag: 1,
      dialogImportVisible: false,
      errorResults: [],
      form: {
        number: "",
        region: "",
        name: "",
        choiceA: "",
        choiceB: "",
        choiceC: "",
        choiceD: "",
        rightAnswers: ""
      },
      level: "",
      levels: [],
      timeScope: "",
      questionBank: [],
      //数据条数
      total: 0,
      //默认一页条数
      pageSize: 20,
      //默认页码
      currentPage: 1,
      dialogVisible: false,
      dialogVisible2: false,
      activeName2: "first",
      options1: [], //级别 tab1
      options2: [], //级别 tab2
      options3: [], //道馆 tab3
      options4: [], //班级 tab3
      options5: [], //教练 tab3
      options6: [], //等级选择 Diglog1
      rules: {
        region: [{ required: true, message: "请选择级别", trigger: "change" }],
        name: [{ required: true, message: "请填写题目", trigger: "blur" }],
        choiceA: [
          { type: "", required: true, message: "选项A", trigger: "blur" }
        ],
        choiceB: [
          { type: "", required: true, message: "选项B", trigger: "blur" }
        ],
        choiceC: [{ required: true, message: "选项C", trigger: "blur" }],
        choiceD: [{ required: true, message: "选项D", trigger: "blur" }],
        rightAnswers: [{ required: true, message: "正确答案", trigger: "blur" }]
      },
      value: "",
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      value6: "",
      value7: "",
      value8: "",
      multipleSelection: [],
      tableData2: [
        {
          number: "1",
          level: "黄带",
          trainMethod: "。。。。。。",
          inputTime: "2018.03.01"
        },
        {
          number: "2",
          level: "黄绿带",
          trainMethod: "。。。。。。",
          inputTime: "2018.03.01"
        },
        {
          number: "2",
          level: "黄绿带",
          trainMethod: "。。。。。。",
          inputTime: "2018.03.01"
        },
        {
          number: "2",
          level: "黄绿带",
          trainMethod: "。。。。。。",
          inputTime: "2018.03.01"
        },
        {
          number: "2",
          level: "黄绿带",
          trainMethod: "。。。。。。",
          inputTime: "2018.03.01"
        },
        {
          number: "2",
          level: "黄绿带",
          trainMethod: "。。。。。。",
          inputTime: "2018.03.01"
        }
      ], //训练方法表
      tableData3: [
        {
          number: "1",
          roadMuseum: "西南河",
          classes: "少儿班",
          coach: "华晨宇",
          teachingPlan: "......",
          inputTime: "2018.03.01"
        }
      ], //教案统计表，
      orderByName: "",
      optionsAll: [
        {
          value: "1",
          label: "A"
        },
        {
          value: "2",
          label: "B"
        },
        {
          value: "3",
          label: "C"
        },
        {
          value: "4",
          label: "D"
        }
      ],
      rightAnswers: "",
      isAdd: "",
      dialogTitle: ""
    };
  },
  methods: {
    //表头样式
    headerSetStyle() {
      return {
        "background-color": "#e5e5e5",
        color: "#303133",
        "border-color": "#c1c3c9",
        "font-size": "12px"
      };
    },

    //表格样式
    cellSetStyle() {
      return {
        color: "#303133",
        "border-color": "#c1c3c9",
        "font-size": "12px"
      };
    },
    clearFormData(formName) {
      this.$refs[formName].resetFields();
    },
    //新增题库弹窗
    addTestBank() {
      this.isAdd = 1;
      this.dialogTitle = "新增题库";
      this.dialogVisible = true;
    },
    //修改题库弹窗
    updateTestBank() {
      var that = this;

      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "请选择数据",
          showClose: true,
          type: "warning"
        });
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          message: "只能选择一条数据",
          showClose: true,
          type: "warning"
        });
      } else {
        setTimeout(function() {
          that.multipleSelection.forEach(function(v) {
            that.form.number = v.id;
            that.form.region = v.jlevel;
            that.form.name = v.jquestionName;
            that.form.choiceA = v.optionA;
            that.form.choiceB = v.optionB;
            that.form.choiceC = v.optionC;
            that.form.choiceD = v.optionD;
            that.form.rightAnswers = v.correct_answer;
          });
        }, 0);
        this.isAdd = 0;
        this.dialogTitle = "修改题库";
        this.dialogVisible = true;
      }
    },
    //添加题库
    dataParmes(form) {
      this.$refs.form.validate(valid => {
        if (valid) {
          var userData = qs.parse(sessionStorage.getItem("userData"));
          var that = this;
          var questionData = {
            regserial: userData.company_serial,
            jlevel: this.form.region,
            jquestionName: this.form.name,
            optionA: this.form.choiceA,
            optionB: this.form.choiceB,
            optionC: this.form.choiceC,
            optionD: this.form.choiceD,
            correct_answer: this.form.rightAnswers,
            operatorID: userData.role_id,
            operatorIP: ""
          };
          var questionParams = {
            methodUrl: "courseManagement/addQuestions",
            jsonParam: qs.stringify(questionData)
          };
          this.$axios.postRequest(questionParams).then(
            function(res) {
              that.dialogVisible = false;
              that.selectTestBank();
            },
            function(res) {
              //失败之后处理逻辑
              console.log("error:" + res);
            }
          );
        } else {
          return false;
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //导入
    // importData() {
    //   this.importFlag = 1
    //   this.fileList = []
    //   this.uploadTip = '点击上传'
    //   this.processing = false
    //   this.dialogImportVisible = true
    // },
    beforeUpload(file) {
      //上传前配置
      this.importHeaders.cityCode = ""; //可以配置请求头
      let excelfileExtend = ".xls,.xlsx"; //设置文件格式
      let fileExtend = file.name
        .substring(file.name.lastIndexOf("."))
        .toLowerCase();
      if (excelfileExtend.indexOf(fileExtend) <= -1) {
        this.$message.error("文件格式错误");
        return false;
      }
      this.uploadTip = "正在处理中...";
      this.processing = true;
    },
    //上传错误
    uploadFail(err, file, fileList) {
      this.uploadTip = "点击上传";
      this.processing = false;
      this.$message.error(err);
    },
    //上传成功
    uploadSuccess(response, file, fileList) {
      this.uploadTip = "点击上传";
      this.processing = false;
      if (response.status === -1) {
        this.errorResults = response.data;
        if (this.errorResults) {
          this.importFlag = 2;
        } else {
          this.dialogImportVisible = false;
          this.$message.error(response.errorMsg);
        }
      } else {
        this.importFlag = 3;
        this.dialogImportVisible = false;
        this.$message.info("导入成功");
        this.doSearch();
      }
    },

    //导出
    exportCh(fileName, docType) {
      var userData = qs.parse(sessionStorage.getItem("userData"));

      var postData = {
        regserial: userData.company_serial,
        jlevel: this.level,
        start_jdate: this.timeScope[0],
        end_jdate: this.timeScope[1],
        count: true,
        pageindex: 1,
        pagesize: 100000
      };
      docType = docType || "pdf"; //默认导出pdf
      var gridCols = this.tableObject;

      var params = {
        methodUrl: "courseManagement/getQuestions",
        jsonParam: JSON.stringify(postData),
        exportStr: JSON.stringify(gridCols),
        exportType: docType,
        exportTitle: fileName
      };
      var that = this;
      axios.s.baseURL = "";
      //jindu
      axios
        .post("sys/export.do", params, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        })
        .then(
          response => {
            //guanbi

            var fileParam = {
              fileKey: encodeURI(response.data.info),
              fileName: encodeURI(fileName),
              browseType: this.Browser.firefox ? "firefox" : "",
              docType: docType
            };
            //另存为文档
            window.open("exportFile.do?" + qs.stringify(fileParam));
          },
          err => {
            console.log(err);
          }
        );
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
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
    handleSizeChange(val) {
      this.pageSize = val;
      var userData = qs.parse(sessionStorage.getItem("userData"));
      this.selectTestBank();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      var userData = qs.parse(sessionStorage.getItem("userData"));
      this.selectTestBank();
    },
    //查询题库
    selectTestBank() {
      var that = this;
      var userData = qs.parse(sessionStorage.getItem("userData"));
      // if (column && column.order) {
      //   var index = column.order.indexOf("ending");
      //   if (column.prop == "teacher_name") {
      //     this.orderByName =
      //       "r.employee_name " + column.order.substring(0, index);
      //   } else if (column.prop == "employee_name") {
      //     this.orderByName =
      //       "w.employee_name " + column.order.substring(0, index);
      //   } else {
      //     this.orderByName =
      //       column.prop + " " + column.order.substring(0, index);
      //   }
      // }
      //加载题库表
      var bankData = {
        regserial: userData.company_serial,
        jlevel: this.level,
        start_jdate: this.timeScope[0],
        end_jdate: this.timeScope[1],
        count: true,
        pageindex: 1,
        pagesize: 20
        //orderby: this.orderByName
      };
      var bankParams = {
        methodUrl: "courseManagement/getQuestions",
        jsonParam: qs.stringify(bankData)
      };
      this.$axios.postRequest(bankParams).then(
        function(res) {
          //成功之后处理逻辑
          that.questionBank = res.data.list;
          that.total = res.data.totalcount;
        },
        function(res) {
          //失败之后处理逻辑
          console.log("error:" + res);
        }
      );
    },

    //提交修改信息
    // onSubmitUpdate() {
    //   var userData = qs.parse(sessionStorage.getItem("userData"));
    //   var questionData = {
    //     id: this.form.number,
    //     jlevel: this.form.region,
    //     jquestionName: this.form.name,
    //     optionA: this.form.choiceA,
    //     optionB: this.form.choiceB,
    //     optionC: this.form.choiceC,
    //     optionD: this.form.choiceD,
    //     correct_answer: this.form.rightAnswers,
    //     operatorID: userData.role_id,
    //     operatorIP: ""
    //   };
    //   var questionParams = {
    //     methodUrl: "courseManagement/updateQuestions",
    //     jsonParam: qs.stringify(questionData)
    //   };
    //   var that = this;
    //   this.$axios.postRequest(questionParams).then(
    //     function(res) {
    //       that.selectTestBank();
    //       that.dialogVisible = false;
    //     },
    //     function(res) {
    //       //失败之后处理逻辑
    //       console.log("error:" + res);
    //     }
    //   );
    // },
    //删除题库
    deleteTestBank() {
      var that = this;
      if (this.multipleSelection.length > 0) {
        var arrvalue = []; //用于存放取出的数组的值
        for (var i = 0; i < this.multipleSelection.length; i++) {
          //数组的索引是从0开始的
          arrvalue.push(this.multipleSelection[i].id);
        }
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var deleteData = {
          regserial: userData.company_serial,
          ids: arrvalue.join(",")
        };
        var deleteParams = {
          methodUrl: "courseManagement/deleteQuestions",
          jsonParam: qs.stringify(deleteData)
        };
        this.$axios.postRequest(deleteParams).then(
          function(res) {
            //成功之后处理逻辑
            that.selectTestBank();
          },
          function(res) {
            //失败之后处理逻辑
            console.log("error:" + res);
          }
        );
      }
    },
    //添加、修改题库
    submitTestBank(form) {
      var userData = qs.parse(sessionStorage.getItem("userData"));
      var that = this;
      var questionParams = "";
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.isAdd);
          console.log(this.isAdd==1);
          if (this.isAdd == 1) {
            var questionData = {
              regserial: userData.company_serial,
              jlevel: this.form.region,
              jquestionName: this.form.name,
              optionA: this.form.choiceA,
              optionB: this.form.choiceB,
              optionC: this.form.choiceC,
              optionD: this.form.choiceD,
              correct_answer: this.form.rightAnswers,
              operatorID: userData.role_id,
              operatorIP: ""
            };
            questionParams = {
              methodUrl: "courseManagement/addQuestions",
              jsonParam: qs.stringify(questionData)
            };
          } else {
            var questionData = {
              id: this.form.number,
              jlevel: this.form.region,
              jquestionName: this.form.name,
              optionA: this.form.choiceA,
              optionB: this.form.choiceB,
              optionC: this.form.choiceC,
              optionD: this.form.choiceD,
              correct_answer: this.form.rightAnswers,
              operatorID: userData.role_id,
              operatorIP: ""
            };
            questionParams = {
              methodUrl: "courseManagement/updateQuestions",
              jsonParam: qs.stringify(questionData)
            };
          }

          this.$axios.postRequest(questionParams).then(
            function(res) {
              that.dialogVisible = false;
              that.selectTestBank();
            },
            function(res) {
              //失败之后处理逻辑
              console.log("error:" + res);
            }
          );
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    var userData = qs.parse(sessionStorage.getItem("userData"));
    var that = this;
    that.selectTestBank();
    //加载级别信息
    var levelData = {
      regserial: userData.company_serial
    };
    var levelParams = {
      methodUrl: "memberManagement/memberLevel",
      jsonParam: qs.stringify(levelData)
    };
    this.$axios.postRequest(levelParams).then(
      function(res) {
        //成功之后处理逻辑
        that.levels = res.data;
      },
      function(res) {
        //失败之后处理逻辑
        console.log("error:" + res);
      }
    );
  }
};
</script>
<style scoped>
.select {
  width: 100px;
}
.wai ul {
  float: left;
  margin: 10px 10px 10px 0;
}
.wai ul > div {
  margin-right: 5px;
}
.block {
  margin: 20px 0 0 850px;
}
.btn {
  text-align: center;
  margin: 30px 50px 0 200px;
}
.size {
  font-size: 12px;
  color: #101010;
  margin-right: 5px;
}
</style>
