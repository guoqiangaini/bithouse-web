<template xmlns="http://www.w3.org/1999/html">
  <div>

    <div class="wai">
      <ul>
        <span style="font-size: 12px">道馆</span>
        <el-select clearable v-model="value1" placeholder="请选择" class="select" size="mini">
          <el-option
            v-for="item in roadMuseum"
            :key="item.department_serial"
            :label="item.department_name"
            :value="item.department_serial">
          </el-option>
        </el-select>
      </ul>
      <ul>
        <span style="font-size: 12px">岗位</span>
        <el-select clearable v-model="value2" placeholder="请选择" class="select" size="mini">
          <el-option
            v-for="item in post"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </ul>
      <ul>
        <span style="font-size: 12px">姓名</span>
        <el-input clearable v-model="input1" size="mini" placeholder="请输入内容" style="width: 100px"></el-input>
      </ul>
      <ul>
        <span style="font-size: 12px">入职状态</span>
        <el-select clearable v-model="value3" placeholder="请选择" class="select" size="mini">
          <el-option
            v-for="item in entryStatu"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </ul>
      <ul>
        <el-button size="mini" type="info"  @click="find">查询</el-button>
        <el-button size="mini" type="info" @click="updateMember(2)">修改</el-button>
        <el-button size="mini" type="info" @click="deleteMember">删除 </el-button>
        <el-button size="mini" type="info">导入</el-button>
        <el-button size="mini" type="info" @click="exportCh('人事统计','xlsx')">导出</el-button>
        <el-button size="mini" type="info" @click="updateMember(1)">入职登记</el-button>

      </ul>
    </div>
    <!--新增弹出框开始-->
    <el-dialog

      title="信息填写"
      :close="closeDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible"
      width="800px" style="font-size: 10px"
    >
      <el-form label-width="70px" ref="addForm" :show-message="false" :rules="rules"  :model="addForm" class="demo-ruleForm">
        <div class="basicData">
          <el-row>
            <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
              <!--道馆岗位工号-->
              <el-row>
                <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                  <el-form-item label="入职部门"  prop="addValue1">
                    <el-select v-model="addForm.addValue1" placeholder="请选择" clearable size="mini" style="width: 105px">
                      <el-option
                        v-for="item in departmentMuseum"
                        :key="item.department_serial"
                        :label="item.department_name"
                        :value="item.department_serial">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                  <el-form-item label="岗　　位" prop="addValue2">
                    <el-select clearable v-model="addForm.addValue2" placeholder="请选择" size="mini" style="width: 105px">
                      <el-option
                        v-for="item in post"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                  <el-form-item label="工　　号" prop="addValue3">
                    <el-input clearable v-model="addForm.addValue3" placeholder="" size="mini" style="width:105px"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--姓名性别-->
              <el-row style="margin-bottom: 10px">
                <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                  <el-form-item label="姓　　名"  prop="addValue4">
                    <el-input clearable v-model="addForm.addValue4" placeholder="" size="mini" style="width:105px"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                  <el-form-item label="性　　别" prop="addValue5">
                    <el-select v-model="addForm.addValue5" clearable placeholder="请选择" size="mini" style="width:105px">
                      <el-option
                        v-for="item in medicalHistory"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--出生日期身份证号-->
              <el-row style="margin-bottom: 10px">
                <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                  <el-form-item label="出生日期" prop="addValue6">
                    <el-date-picker clearable
                                    v-model="addForm.addValue6"
                                     value-format="yyyy-MM-dd"
                                        format="yyyy-MM-dd"
                                    type="date"
                                    size="mini"
                                    placeholder="选择日期" style="width: 105px">
                    </el-date-picker>

                  </el-form-item>
                </el-col>
                <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                  <el-form-item label="身份证号" prop="addValue7">
                    <el-input clearable v-model="addForm.addValue7" placeholder="" size="mini" style="width:105px"></el-input>
                  </el-form-item>
                </el-col>

              </el-row>
              <!--所学专业毕业院校-->
              <el-row style="margin-bottom: 10px">
                <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
                  <el-form-item label="所学专业" prop="addValue8">
                    <el-input clearable v-model="addForm.addValue8" placeholder="" size="mini" style="width:288px"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
                  <el-form-item label="毕业院校" prop="addValue9">
                    <el-input clearable v-model="addForm.addValue9" placeholder="" size="mini" style="width:185px"></el-input>
                  </el-form-item>
                </el-col>

              </el-row>
              <!--毕业时间学历学位-->
              <el-row>
                <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                  <el-form-item label="毕业时间" prop="addValue10">
                    <el-date-picker clearable
                                    v-model="addForm.addValue10"
                                    type="date"
                                    size="mini"
                                     value-format="yyyy-MM-dd"
                                        format="yyyy-MM-dd"
                                    placeholder="选择日期" style="width: 105px">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                  <el-form-item label="学　　历" prop="addValue11">
                    <el-input clearable v-model="addForm.addValue11" placeholder="" size="mini" style="width:105px"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                  <el-form-item label="学　　位" prop="addValue12">
                    <el-input clearable v-model="addForm.addValue12" placeholder="" size="mini" style="width:105px"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--户籍归属现居住地-->
              <el-row style="margin-bottom: 10px">
                <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
                  <el-form-item label="户籍归属" prop="addValue13">
                    <el-input clearable v-model="addForm.addValue13" placeholder="" size="mini" style="width:288px"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
                  <el-form-item label="现居住地" prop="addValue14">
                    <el-input clearable v-model="addForm.addValue14" placeholder="" size="mini" style="width:185px"></el-input>
                  </el-form-item>
                </el-col>

              </el-row>
              <!--微信家庭住址-->
              <el-row style="margin-bottom: 10px">

                <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
                  <el-form-item label="联系电话" prop="addValue15">
                    <el-input clearable v-model="addForm.addValue15" placeholder="" size="mini" style="width:288px"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                  <el-form-item label="联系人" prop="addValue16">
                    <el-input clearable  v-model="addForm.addValue16" placeholder="" size="mini"
                              style="width:105px"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
                  <el-form-item label="紧急联系电话" prop="addValue17" label-width="100px">
                    <el-input clearable v-model="addForm.addValue17"  placeholder="" size="mini"
                              style="width:102px"></el-input>
                  </el-form-item>
                </el-col>

              </el-row>

            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon">上传头像</i>
              </el-upload>
            </el-col>
          </el-row>
        </div><!--基础资料-->


      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogVisible = false" size="mini" class="dialogCancelButton">取消</el-button>
        <el-button type="primary" @click="submitUpdate('addForm')" size="mini">确定</el-button>

      </div>
    </el-dialog>
    <!--新增弹出框结束-->

    <el-table
      :headerCellStyle="headerSetStyle"
      :cellStyle="cellSetStyle"

      @selection-change="handleSelectionChange"
      border
      ref="multipleTable"
      size="mini"
      :data="personnelMatter"
      header-align="center"
      style="width: 100%;"
      @sort-change='find'
      class="elTableBorder">
      <el-table-column
        type="selection"
        align="center"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="serial_number"
        label="序号 "

        width="60">

      </el-table-column>
      <el-table-column
        align="center"
        prop="department_name"
        label="道馆"

        width="100">

      </el-table-column>
      <el-table-column
        align="center"
        prop="name"

        label="岗位"
        width="100">

      </el-table-column>
      <el-table-column
        align="center"

        prop="employee_name"
        label="姓名"
        width="100">

      </el-table-column>
      <el-table-column
        align="center"
        prop="employee_sex"
        label="性别"
        width="60">

      </el-table-column>
      <el-table-column
        align="center"
        prop="employee_birthday"
        label="年龄"

        width="60">

      </el-table-column>
      <el-table-column
        align="center"
        prop="employee_no"
        label="工号"
        width="100">

      </el-table-column>
      <el-table-column
        align="center"
        prop="entryDate"
        
        label="入职日期"
        width="100">

      </el-table-column>
      <el-table-column
        align="center"

        prop="employee_phone"
        label="联系方式"
      >

      </el-table-column>
      <!--<el-table-column label="入职登记表" width="100" align="center">-->
      <!--<template slot-scope="scope">-->

      <!--<el-button-->
      <!--size="mini"-->
      <!--type="text"-->
      <!--@click="openDetails">详情</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->

      <!--align="center"-->
      <!--prop="jstatus"-->
      <!--label=" 入职状态"-->
      <!--&gt;-->
      <!--</el-table-column>-->
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 40, 60]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total" class="page" style="text-align: right;margin-top: 20px">
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import { mapState } from "vuex";
import ElButton from "../../node_modules/element-ui/packages/button/src/button";
import ElRow from "element-ui/packages/row/src/row";
import ElCol from "element-ui/packages/col/src/col";
export default {
  components: {
    ElCol,
    ElRow,
    ElButton
  },
  data() {
    return {
      rooms: "",

      medicalHistory: [
        {
          label: "未知",
          value: 1
        },
        {
          label: "男",
          value: 2
        },
        {
          label: "女",
          value: 3
        }
      ],
      asd: "",
      tableObject: [
        {
          field: "department_name",
          width: "60",
          title: "道馆"
        },
        {
          field: "name",
          width: "45",
          title: "岗位"
        },
        {
          field: "employee_name",
          width: "90",
          title: "姓名"
        },
        {
          field: "employee_sex",
          width: "60",
          title: "性别"
        },
        {
          field: "jage",
          width: "80",
          title: "年龄"
        },
        {
          field: "employee_no",
          width: "100",
          title: "工号"
        },
        {
          field: "entryDate",
          width: "100",
          title: "入职日期"
        },
        {
          field: "employee_phone",
          width: "80",
          title: "联系方式"
        },
        {
          field: "jstatus",
          width: "100",
          title: "入职状态"
        }
      ],
      orderByName: "", //排序字段
      classes: [],
      imageUrl: "",
      pageSize: 20,
      checked: "",
      currentPage: 1,
      post: [],
      departmentMuseum:[],//入职部门
      roadMuseum: [], //道馆
      multipleSelection: [], //修改用
      dialogVisibleTwo: false,
      personnelMatter: [], //人事统计表
      entryStatu: [], //入职状态
      value1: "",
      value2: "",
      value3: "",
      value6: "",
      input1: "",
      total: 0,

      dialogVisible: false,
      dialogImageUrl: "",
      addForm: {
        addValue1: "", //道馆
        addValue2: "", //岗位
        addValue3: "", //工号
        addValue4: "", //姓名
        addValue5: "", //性别
        addValue6: "", //出生日期
        addValue7: "", //身份证号
        addValue8: "", //所学专业
        addValue9: "", //毕业院校
        addValue10: "", //毕业时间
        addValue11: "", //学历
        addValue12: "", //学位
        addValue13: "", //户籍归属
        addValue14: "", //现居住地
        addValue15: "", //联系电话
        addValue16: "", //联系人
        addValue17: "", //紧急联系电话
        addValue18: "" //人员序号
      },
         rules: {
           addValue1: [
            {required: true, message: '', trigger: 'change'},
          ],
          addValue2: [
            {required: true, message: '', trigger: 'change'}
          ],
          addValue3: [
            { required: true, message: '', trigger: 'blur'}
          ],
          addValue4: [
            { required: true, message: '', trigger: 'blur' },
          ],
          addValue5: [
            { required: true, message: '', trigger: 'change'},
          ],
          addValue6: [
            {required: true, message: '', trigger: 'blur'}
          ],
          addValue7: [
            {required: true, message: '', trigger: 'blur'}
          ],
          addValue8: [
            { required: true, message: '', trigger: 'blur'},
          ],
          addValue9: [
            {required: true, message: '', trigger: 'blur'}
          ],
          addValue10: [
            { required: true, message: '', trigger: 'blur'}
          ],
          addValue11: [
            { required: true, message: '', trigger: 'blur'}
          ],
          addValue12: [
            { required: true, message: '', trigger: 'blur'}
          ],
          addValue13: [
            {required: true, message: '', trigger: 'blur'}
          ],
          addValue14: [
            {required: true, message: '', trigger: 'blur'}
          ],
          addValue15: [
            {required: true, message: '', trigger: 'blur'},
          ],
          addValue16: [
            {required: true, message: '', trigger: 'blur'}
          ],
          addValue17: [
            { required: true, message: '', trigger: 'blur'}
          ],
        
        
        },
      jdolx: "", //新增修改方法中的状态 1新增2修改
      //        obj :{},
      //        obj1:{},

      textarea: ""
    };
  },
  methods: {
    toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
    /*清空表单样式调用*/
    closeDialog() {
      this.$refs.addForm.resetFields();
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
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
      console.log(val);
    },
    formatter(row, column) {
      return row.address;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //打开详情
    openDetails(row, event, column) {
      console.log(row);
      //         this.addValue1 = row.source_id
      // //        this.value13 = row.status_id
      //         this.addValue2 = row.membertype_id
      //         this.addValue3 = row.dep_parent_serial
      // //        this.value17 = row.student_no
      //         this.addValue4 = row.employee_name
      //         this.addValue5 = row.illness
      //         this.addValue6 = row.height
      //         this.addValue7 = row.jsex
      //         this.addValue8 = row.student_card
      //         this.addValue9 = row.birthday
      //         this.addValue10 = row.student_level
      //         this.addValue11 = row.id_card
      //         this.addValue12 = row.student_phone
      //         this.addValue13 = row.student_school
      //         this.addValue14 = row.student_id
      //         this.addValue15 = row.weixin_id
      //         this.addValue16 = row.student_address
      //         this.addValue19 = row.father_name
      //         this.addValue20 = row.father_phone
      //         this.addValue21 = row.father_comp
      //         this.addValue22 = row.mother_name
      //         this.addValue17 = row.mother_phone
      //         this.addValue18 = row.mother_comp
      //         this.serial = row.student_serial
      //         this.addValue23 = row.jcontent
      //         this.addValue33 = row.department_name,
      // this.value31=row
      // this.value32=row
      // this.value33=row
      // this.value34=row
      // this.value35=row
      // this.value36=row
      // this.value37=row
      // this.value38=row
      // this.value41=row
      // this.value40=row
      // this.value15=row
      // this.value42=row
      this.dialogVisible = true;
    },
    //表头样式
    headerSetStyle() {
      return {
        "background-color": "#e5e5e5",
        color: "#303133",
        "border-color": "#c1c3c9"
      };
    },
    //表格样式
    cellSetStyle() {
      return {
        color: "#606266",
        "border-color": "#c1c3c9"
      };
    },
    tableheaderClassName({ row, rowIndex }) {
      return "table-loginAndRegister-th";
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //查询
    find(column) {
      var userData = qs.parse(sessionStorage.getItem("userData"));
      var department = "";
      if (this.value3 !== "" && this.value4 === "") {
        department = this.value3;
      } else if (this.value4 !== "") {
        department = this.value4;
      }
      // if (column && column.order) {
      //   var index = column.order.indexOf("ending");
      //   this.orderByName = column.prop + " " + column.order.substring(0, index);
      //   console.log(this.orderByName);
      // }
      var personnelData = {
        // orderby: this.orderByName,
        count: true,

        pageindex: this.currentPage,
        pagesize: this.pageSize,
        company_serial: userData.company_serial,
        //          studentDepartment_serial:this.$store.state.studentDepartment_serial,
        department_serial: department,
        studentDepartment_serial: this.value1,
        positionId: this.value2,
        employee_name: this.input1,
        id: this.value3
      };
      var personnelparams = {
        methodUrl: "personnelManagement/getPersonnelStatistics",
        jsonParam: qs.stringify(personnelData)
      };
      var that = this;
      this.$axios.postRequest(personnelparams).then(
        function(res) {
          //成功之后处理逻辑
          that.personnelMatter = res.data.list;
          that.total = res.data.totalcount;
        },
        function(res) {
          //失败之后处理逻辑
          console.log("error:" + res);
        }
      );
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.find();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);

      this.currentPage = val;
      this.find();
    },
    //导出
    exportCh(fileName, docType) {
      var userData = qs.parse(sessionStorage.getItem("userData"));
      var department = "";
      if (this.value3 !== "" && this.value4 === "") {
        department = this.value3;
      } else if (this.value4 !== "") {
        department = this.value4;
      }
      var personnelData = {
        count: true,
        pageindex: 1,
        pagesize: 100000,
        company_serial: userData.company_serial,
        department_serial: department,
        studentDepartment_serial: this.value1,
        positionId: this.value2,
        employee_name: this.input1,
        id: this.value3
      };
      docType = docType || "pdf"; //默认导出pdf
      var gridCols = this.tableObject;

      var personnelparams = {
        methodUrl: "personnelManagement/getPersonnelStatistics",
        jsonParam: JSON.stringify(personnelData),
        exportStr: JSON.stringify(gridCols),
        exportType: docType,
        exportTitle: fileName
      };
      var that = this;
      axios.defaults.baseURL = "";
      //jindu
      axios
        .post("sys/export.do", personnelparams, {
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
    //入职登记
    // registerStaff(type){
    //   var userData = qs.parse(sessionStorage.getItem("userData"));
    //   this.dialogVisible = false
    //   var that = this
    //   var result = [];
    //   result.push(this.addValue1, this.addValue2, this.addValue3, this.addValue4, this.addValue5,
    //     this.addValue6, this.addValue7, this.addValue8, this.addValue9,
    //     this.addValue10, this.addValue11, this.addValue12, this.addValue13, this.addValue14,
    //     this.addValue15, this.addValue16,
    //     this.addValue17,)
    //   var memberData = {
    //     jlx: 1,
    //     jdolx: 1,
    //     jSerial: userData.department_serial,
    //     jname: this.addValue4,
    //     picUrl: '',
    //     regSerial: userData.company_serial,
    //     jlog_ip: '',
    //     jgly_Serial: userData.employee_serial,
    //     jtext: result.join(",")
    //   }
    //   var coachParams = {
    //     methodUrl: 'memberManagement/memberOperation',
    //     jsonParam: qs.stringify(memberData)
    //   }
    //   this.$axios.postRequest(coachParams).then(function (res) {
    //     //成功之后处理逻辑
    //     that.find()
    //   }, function (res) {
    //     //失败之后处理逻辑
    //     console.log("error:" + res)
    //   })

    // },
    //修改
    updateMember(type) {
      var that = this;
      if (type == 1) {
        alert(111);
        that.jdolx = 1;
        this.departmentMuseum.forEach(function(c) {
          that.addForm.addValue18 = c.department_serial;
        });
        console.log('+++++++++++++')
        console.log(that.addForm.addValue18)
        
        that.dialogVisible = true;
      } else {
        if (this.multipleSelection.length < 1) {
          this.$message({
            message: "请选择学员",
            showClose: true,
            type: "warning"
          });
          //this.dialogVisible = false
        } else if (this.multipleSelection.length > 1) {
          this.$message({
            message: "只能选择一名学员",
            showClose: true,
            type: "warning"
          });
          //this.dialogVisible = false
        } else {
          alert(222);
          this.jdolx = 2;
          this.dialogVisible = true;
          this.multipleSelection.forEach(function(v) {
            that.addForm.addValue1 = v.department_name;
            that.addForm.addValue2 = v.name;
            that.addForm.addValue4 = v.employee_name;
            that.addForm.value39 = v.employee_sex; //性別
            that.addForm.addValue = v.employee_birthday; //年齡
            that.addForm.addValue3 = v.employee_no;
            that.addForm.history = v.entryDate; //入職日期
            that.addForm.addValue15 = v.employee_phone;
            that.addForm.value18 = v.jstatus; //入职状态
            that.addForm.addValue18 = v.employee_serial;
          });
    
          this.dialogVisible = true;
        }
          console.log("++++++++++++");
          console.log(that.addForm.addValue18);
      }
    },
    //提交修改
    submitUpdate(addForm) {
      var that = this;
        that.$refs.addForm.validate((valid) => {
          if (valid) {
      var result = [];
      result.push(
        this.addForm.addValue1,
        this.addForm.addValue2,
        this.addForm.addValue3,
        this.addForm.addValue4,
        this.addForm.addValue5,
        this.addForm.addValue6,
        this.addForm.addValue7,
        this.addForm.addValue8,
        this.addForm.addValue9,
        this.addForm.addValue10,
        this.addForm.addValue11,
        this.addForm.addValue12,
        this.addForm.addValue13,
        this.addForm.addValue14,
        this.addForm.addValue15,
        this.addForm.addValue16,
        this.addForm.addValue17,
        this.addForm.addValue18
      );
      var userData = qs.parse(sessionStorage.getItem("userData"));
      let config = {
        "Content-Type": "multipart/form-data"
      };
      var updateMemberData = {
        jlx: 1,

        jSerial:that.addForm.addValue18,

        jdolx: that.jdolx,

        jname: that.addForm.addValue4,
        picUrl: "",
        regSerial: userData.company_serial,
        jlog_ip: "",
        jgly_Serial: userData.employee_serial,
        jtext: result.join(",")
      };
      
      var updateMemberParams = {
        methodUrl: "memberManagement/memberOperation",
        jsonParam: qs.stringify(updateMemberData)
      };
      alert(333);
      this.dialogVisible = false;

      this.$axios.postRequest(updateMemberParams).then(
        function(res) {
          //成功之后处理逻辑
          that.find();
        },
        function(res) {
          //失败之后处理逻辑
          console.log("error:" + res);
         })
         }else {
            console.log('error submit!!');
            return false;
        }
        }
      );
    },
    //删除
    deleteMember() {
      var that = this;
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
        var arrvalue = []; //用于存放取出的数组的值
        for (var i = 0; i < this.multipleSelection.length; i++) {
          arrvalue.push(this.multipleSelection[i].employee_serial); //数组的索引是从0开始的
          console.log(this.multipleSelection[i].employee_serial)
          
        }
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var deleteData = {
          jlx: 1,
          jdolx: 3,
          jSerial:0,
          jname: "",
          picUrl: "",
          regSerial: userData.company_serial,
          jlog_ip: "",
          jgly_Serial: userData.employee_serial,
          jtext: arrvalue.join(",")
        };
        var deleteParams = {
          methodUrl: "memberManagement/memberOperation",
          jsonParam: qs.stringify(deleteData)
        };
        this.$axios.postRequest(deleteParams).then(
          function(res) {
                //成功之后处理逻辑
                that.find();
                that.$message({
                  type: "success",
                  message: "删除成功"
                });
              },
              function(res) {
                //失败之后处理逻辑
                console.log("error:" + res);
                that.$message({
                  type: "error",
                  message: "删除失败"
                });
              }
            );
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.$message({
          message: "请选择数据",
          showClose: true,
          type: "warning"
        });
      }
    },
    /*清空表单样式调用*/
     closeDialog(){
        this.dialogVisible = false
        this.$refs.addForm.resetFields();
      },
  },
  computed: {
    studentDepartment_serial() {
      return this.$store.state.studentDepartment_serial;
    },
    //获取性别信息
    gender() {
      return this.$store.state.genders;
    }
  },
  mounted() {
    var userData = qs.parse(sessionStorage.getItem("userData"));
    var that = this;
     //获取入职部门
    var departmentData = {
      regserial: userData.company_serial,
      permissions_id: userData.permissions_id,
      dep_lx: ""
    };
    console.log('123456789')
    console.log(departmentData)
    
    var departmentParams = {
      methodUrl: "memberManagement/memberClass",
      jsonParam: qs.stringify(departmentData)
    };
    this.$axios.postRequest(departmentParams).then(
      function(res) {
        //成功之后处理逻辑
        that.departmentMuseum = res.data;
      },
      function(res) {
        //失败之后处理逻辑
        console.log("error:" + res);
      }
    );
    //获取道馆
    var roomData = {
      regserial: userData.company_serial,
      permissions_id: userData.permissions_id,
      dep_lx: "1"
    };
    var roomParams = {
      methodUrl: "memberManagement/memberClass",
      jsonParam: qs.stringify(roomData)
    };
    this.$axios.postRequest(roomParams).then(
      function(res) {
        //成功之后处理逻辑
        that.roadMuseum = res.data;
      },
      function(res) {
        //失败之后处理逻辑
        console.log("error:" + res);
      }
    );
    //获取岗位
    var postData = {
      regserial: userData.company_serial
    };
    var postParams = {
      methodUrl: "personnelManagement/getPost",
      jsonParam: qs.stringify(postData)
    };
    this.$axios.postRequest(postParams).then(
      function(res) {
        //成功之后处理逻辑
        that.post = res.data;
      },
      function(res) {
        //失败之后处理逻辑
        console.log("error:" + res);
      }
    );
    //获取入职状态
    var entryStatusData = {
      regserial: userData.company_serial
    };
    var entryStatusParams = {
      methodUrl: "personnelManagement/getEntryStatus",
      jsonParam: qs.stringify(entryStatusData)
    };
    this.$axios.postRequest(entryStatusParams).then(
      function(res) {
        //成功之后处理逻辑
        that.entryStatu = res.data;
      },
      function(res) {
        //失败之后处理逻辑
        console.log("error:" + res);
      }
    );
    //获取表格信息
    //      var personnelData = {
    //        count:true,
    //        pageindex:1,
    //        pagesize:20,
    //        company_serial:this.$store.state.company_serial,
    //        studentDepartment_serial:this.$store.state.studentDepartment_serial,
    //      }
    //      var personnelparams = {
    //        methodUrl:'personnelManagement/getPersonnelStatistics',
    //        jsonParam:qs.stringify(personnelData)
    //      }
    this.find();
    //      this.$axios.postRequest(personnelparams).then(function(res) {
    //        //成功之后处理逻辑
    //
    //        that.personnelMatter=res.data.list
    //        that.total=res.data.totalcount
    //      }, function(res) {
    //        //失败之后处理逻辑
    //        console.log("error:" + res)
    //      })
    //加载班级信息
    // var classData = {
    //   regserial: userData.company_serial,
    //   permissions_id: userData.permissions_id,
    //   dep_lx: "2",
    //   department_serial: this.value3
    // };
    // var classParams = {
    //   methodUrl: "memberManagement/memberClass",
    //   jsonParam: qs.stringify(classData)
    // };
    // this.$axios.postRequest(classParams).then(
    //   function(res) {
    //     //成功之后处理逻辑
    //     that.classes = res.data;
    //   },
    //   function(res) {
    //     //失败之后处理逻辑
    //     console.log("error:" + res);
    //   }
    // );
  }
};
</script>

<style scoped>
.wai {
  margin: 0;
}

.avatar-uploader {
  border: 1px solid #c1c3c9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.basicData {
  border: 1px solid #d8d8d8;
  padding: 5px;
}

.select {
  width: 100px;
}

.wai ul {
  float: left;
  margin: 0 10px 10px 0;
}

.box1 {
  border: 1px solid black;
}

.el-table .table-head-th {
  background-color: red;
  font-size: large;
}

.avatar-uploader-icon {
  font-size: 12px;
  color: #8c939d;
  width: 89px;
  height: 160px;
  line-height: 160px;
  text-align: center;
}
</style>
