<template>
  <div>
    <!--右键事件开始-->
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="handleClick">设置</v-contextmenu-item>
      <v-contextmenu-item divider></v-contextmenu-item>
      <v-contextmenu-item @click="handleClick">取消</v-contextmenu-item>
      <!--<v-contextmenu-item divider></v-contextmenu-item>-->
      <!--<v-contextmenu-item>调整</v-contextmenu-item>-->
    </v-contextmenu>
    <v-contextmenu ref="contextmenu2">
      <v-contextmenu-item>确认调课</v-contextmenu-item>
    </v-contextmenu>
    <!--右键事件结束-->
    <!--表格内容区-->
    <el-row>
      <!--节次表+课程表-->
      <el-col :span="16">
        <!--下拉选+按钮区结束-->
        <!--节次表开始-->
        <div style="border: 1px solid #c1c3c9;width: 96%;height:100%;padding: 10px">
          <!--道馆下拉选-->
          <ul style="float: left;margin: 0 10px 10px 0;">
            <span class="size">道馆</span>
            <el-select v-model="room" clearable placeholder="全部" size="mini" style="width: 90px;">
              <el-option
                v-for="item in rooms"
                :key="item.department_serial"
                :label="item.department_name"
                :value="item.department_serial">
              </el-option>
            </el-select>
          </ul>
          <!--查询按钮-->
          <!-- <ul style="float: right;margin: 0 10px 10px 0;">
            <el-button size="mini" type="info" @click="selectDetail()">查询</el-button>
          </ul> -->
          <table cellspacing="0" cellpadding="0" class="tb"
                 style="border-right:1px solid #c1c3c9;margin-bottom: 20px;width: 100%">
            <thead style="background-color:lightgray;font-size:12px">
            <th>节次</th>
            <th>周一</th>
            <th>周二</th>
            <th>周三</th>
            <th>周四</th>
            <th>周五</th>
            <th>周六</th>
            <th>周日</th>
            </thead>
            <tbody>
            <tr v-for="(king,index) in courses" style="border: 0;font-size: 12px">
              <td>{{index + 1}}</td>
              <td v-for="(item,jindex) in courses[index]" @contextmenu="showMenu(index,jindex)"
                  v-on:click="selectDetail(index,jindex)" style="cursor: pointer">{{item.value}}
              </td>
            </tr>
            </tbody>
          </table>
          <!--节次表结束-->


          <!--课程表开始-->
          <el-table :data="selectMyTable"
              border
              size="mini"
              :headerCellStyle="headerSetStyle"
              :cellStyle="cellSetStyle"
              style="width: 100%"
              class="elTableBorder"
            >
            <el-table-column align="center" fixed prop="jday" label="星期" width="80">
            </el-table-column>
            <el-table-column align="center" prop="jtime" label="上课时间" width="120">
            </el-table-column>
            <el-table-column align="center" prop="employee_name" label="道馆" width="80">
            </el-table-column>
            <el-table-column align="center" prop="teach_name" label="教师姓名" width="90">
            </el-table-column>
            <el-table-column align="center" prop="department_name" label="班级" width="90">
            </el-table-column>
            <el-table-column align="center" prop="jcount" label="人数" width="80">
            </el-table-column>
            <el-table-column align="center" label="名单">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="classStudentInformation(scope.$index)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog
            title="学员名单"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :visible.sync="dialogVisible3"
            width="536px"
            @close="clearQuery()">
            <div>
              <el-transfer v-model="rightcourseStudents"
                           filterable
                           :titles="['本节课程名单', '会员名单']"
                           @change="handleChange"
                           :data="courseStudentAdjustList"
                           ref="myTransfer">
              </el-transfer>
            </div>
            <div slot="footer" class="dialog-footer" style="text-align: center">
              <el-button size="mini" @click="dialogVisible3 = false" class="dialogCancelButton">取消</el-button>
              <el-button type="primary" size="mini" @click="submitMenuList">提交</el-button>
            </div>
          </el-dialog>
        </div>
        <!--课程表结束-->

        <!--&lt;!&ndash;二期做&ndash;&gt;-->
        <!--<div class="screen">-->

        <!--<el-row>-->
        <!--<el-col :span="7">-->

        <!--<el-col :span="6" class="size">-->
        <!--<span>星期：</span>-->
        <!--</el-col>-->
        <!--<el-col :span="12">-->
        <!--<el-select v-model="value" placeholder="请选择" class="selectBs">-->
        <!--<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-col>-->

        <!--</el-col>-->
        <!--<el-col :span="7">-->
        <!--<el-col :span="6" class="size">-->
        <!--<span>节次：</span>-->
        <!--</el-col>-->
        <!--<el-col :span="12">-->
        <!--<el-select v-model="value2" placeholder="请选择" class="selectBs">-->
        <!--<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-col>-->

        <!--</el-col>-->
        <!--<el-col :span="7">-->

        <!--<el-col :span="6" class="size">-->
        <!--<span>教练：</span>-->
        <!--</el-col>-->
        <!--<el-col :span="12">-->
        <!--<el-select v-model="value3" placeholder="请选择" class="selectBs">-->
        <!--<el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-col>-->

        <!--</el-col>-->
        <!--<el-col :span="3">-->
        <!--<ul>-->
        <!--<el-button size="small">查询</el-button>-->
        <!--</ul>-->
        <!--</el-col>-->
        <!--</el-row>-->

        <!--</div>-->


      </el-col>
      <!--上课时间表+课程信息设置表-->
      <el-col :span="8">
        <div style="border: 1px solid #c1c3c9;padding: 10px;width: 96%;height:100%">
          <div>
            <!--上课时间表开始-->
            <div style="border: 1px solid #c1c3c9">
              <el-row class="classTime">
                <el-col :span="18" style="height: 32px;line-height: 32px">设置上课时间</el-col>
                <el-col :span="6">
                  <el-button @click="dialogVisible = true" size="small" style="float:right">编辑</el-button>
                </el-col>
                <el-dialog
                  title="编辑上课时间"
                  :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="dialogVisible" 
                  @open="overwriteData()"
                  >
                  <!--上课时间表-->
                  <el-table :data="schooltime" border size="mini" :headerCellStyle="headerSetStyle"
                            :cellStyle="cellSetStyle">
                    <el-table-column prop="xh" label="节次" width="60" align="center"></el-table-column>
                    <el-table-column label="开始时间" prop="jstart" align="center">
                      <template slot-scope="scope">
                        <el-time-select
                          :editable="false"
                          :clearable="false"
                          size="small"
                          v-model="scope.row.jstart"
                          :picker-options="{
                            start: '08:00',
                            step: '00:30',
                            end: '23:59'
                          }"
                          placeholder="选择时间">
                        </el-time-select>

                      </template>
                    </el-table-column>
                    <el-table-column label="结束时间" prop="jend" align="center">
                      <template slot-scope="scope">
                        <el-time-select
                          :editable="false"
                          :clearable="false"
                          size="small"
                          v-model="scope.row.jend"
                          :picker-options="{
                            start: '08:00',
                            step: '00:30',
                            end: '23:59'
                          }"
                          placeholder="选择时间">
                        </el-time-select>

                      </template>
                    </el-table-column>
                  </el-table>
                  <div slot="footer" class="dialog-footer" style="text-align: center">
                  <el-button size="mini" @click="dialogVisible = false" class="dialogCancelButton">取消</el-button>
                  <el-button size="mini" type="primary" @click="submitTime">提交</el-button>
                </div>
                </el-dialog>
              </el-row>
              <el-table :data="schooltime" border :headerCellStyle="headerSetStyle"
                        :cellStyle="cellSetStyle" size="mini" style="width:100%;">
                <el-table-column prop="xh" align="center" label="节次">
                </el-table-column>
                <el-table-column prop="time" align="center" label="上课时间">
                </el-table-column>
              </el-table>
            </div>
            <!--上课时间表结束-->
            <!--课程信息设置表开始-->

            <div style="border: 1px solid #c1c3c9;margin-top: 20px">
              <el-row class="classInfo">
                <el-col :span="18" style="height: 32px;line-height: 32px">设置课程信息</el-col>
                <el-col :span="6">
                  <el-button @click="dialogVisible2 = true" size="small" style="float:right">编辑</el-button>
                </el-col>
                <el-dialog 
                  width="536px" 
                  title="课程编辑"
                  :close-on-click-modal="false"
                  :close-on-press-escape="false" 
                  :visible.sync="dialogVisible2"
                  @close="removeCheck('courseTable')">
                  <!--新增、修改课程弹框-->
                  <el-dialog
                    width="400px"
                    :title=dialogTitle
                    :close-on-click-modal="false"
                    :close-on-press-escape="false"
                    :visible.sync="courseVisible"
                    @close="clearFormData('courseForm')"
                    append-to-body>
                    <el-form :model="form" :show-message="false" :rules="rules" ref="courseForm" label-width="100px">
                      <el-form-item label="课程名称　　" prop="name">
                        <el-input v-model="form.name" size="small" style="width:260px"></el-input>
                      </el-form-item>
                      <el-form-item label="每周上课次数" prop="count">
                        <el-input v-model="form.count" size="small" style="width:260px"></el-input>
                        <!-- <el-select v-model="form.count" placeholder="请选择" size="small">
                          <el-option label="1" value="1"></el-option>
                          <el-option label="2" value="2"></el-option>
                          <el-option label="3" value="3"></el-option>
                          <el-option label="4" value="4"></el-option>
                          <el-option label="5" value="5"></el-option>
                          <el-option label="6" value="6"></el-option>
                          <el-option label="7" value="7"></el-option>
                          <el-option label="8" value="8"></el-option>
                          <el-option label="9" value="9"></el-option>
                          <el-option label="10" value="10"></el-option>
                        </el-select> -->
                      </el-form-item>
                      <el-form-item label="费用　　　　" prop="money">
                        <el-input  v-model="form.money" size="small" style="width:260px"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="text-align: center">
                        <el-button @click="courseVisible = false" size="mini" style="margin-right:30px;">取消</el-button>
                        <el-button v-if="showBtn==1" type="primary" @click="addNewCourse(form,1)" size="mini" style="margin-right:30px;">提交</el-button>
                        <el-button v-else type="primary" @click="addNewCourse(form,1)" size="mini">提交</el-button>
                        <el-button v-if="showBtn==1" type="success" @click="addNewCourse(form,2)" size="mini">继续添加</el-button>
                      </div>
                  </el-dialog>
                  <!--更新课程弹框
                  <el-dialog
                    width="40%"
                    title="更新课程"
                    :close-on-click-modal="false"
                    :close-on-press-escape="false"
                    :visible.sync="updateCourseVisible"
                     @close="clearFormData()"
                    append-to-body>
                    <el-form ref="courseForm2" :rules="rules" :model="form" label-width="80px">
                      <el-form-item label="课程名称">
                        <el-input v-model="form.name" size="small"></el-input>
                      </el-form-item>
                      <el-form-item label="上课次数">
                        <el-select v-model="form.count" placeholder="请选择" size="small">
                          <el-option label="2" value="1"></el-option>
                          <el-option label="4" value="2"></el-option>
                          <el-option label="6" value="3"></el-option>
                          <el-option label="8" value="4"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="费用">
                        <el-input v-model="form.money" size="small"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button @click="updateCourseVisible = false" size="small">取消</el-button>
                        <el-button type="primary" @click="submitUpdateCourseInfo" size="small">提交</el-button>
                      </el-form-item>
                    </el-form>
                  </el-dialog>-->
                  <el-col style="margin: 10px 0">
                    <el-button type="info" size="mini" @click="addCourseInfo">新增</el-button>
                    <el-button type="info" size="mini" @click="updateCourseInfo">修改</el-button>
                    <el-button type="info" size="mini" @click="deleteCourseInfo">删除</el-button>
                  </el-col>
                  <el-table :data="courseInfo" border width="100%" size="mini" center  ref="courseTable"
                            @selection-change="handleSelectionChange"
                            :headerCellStyle="headerSetStyle"
                            :cellStyle="cellSetStyle">
                    <el-table-column
                      type="selection"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column prop="jname" label="课程名称" align="center">
                    </el-table-column>
                    <el-table-column prop="jclassesperweek" label="每周上课次数" align="center">
                    </el-table-column>
                    <el-table-column prop="jprice" label="费用" align="center">
                    </el-table-column>
                  </el-table>
                </el-dialog>
              </el-row>
              <el-table :data="courseInfo" border style="width: 100%;margin-top: 5px" size="mini" center
                        :headerCellStyle="headerSetStyle"
                        :cellStyle="cellSetStyle">
                <el-table-column prop="jname" label="课程名称" align="center">
                </el-table-column>
                <el-table-column prop="jclassesperweek" label="每周上课次数" align="center">
                </el-table-column>
                <el-table-column prop="jprice" label="费用" align="center">
                </el-table-column>
              </el-table>
            </div>
            <!--课程信息设置表结束-->
          </div>
        </div>

      </el-col>
    </el-row>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import qs from "qs";
import ElButton from "../../node_modules/element-ui/packages/button/src/button";
import ElRow from "element-ui/packages/row/src/row";
import ElCol from "element-ui/packages/col/src/col";
export default {
  components: {
    ElCol,
    ElRow,
    ElButton
  },
  name: "apps",
  data() {
    // const generateData2 = _ => {
    //   const data = [];
    //   const cities = ['华晨宇', '华晨宇', '华晨宇', '华晨宇', '华晨宇', '华晨宇', '华晨宇',];
    //   const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
    //   cities.forEach((city, index) => {
    //     data.push({
    //       label: city,
    //       key: index,
    //       pinyin: pinyin[index]
    //     });
    //   });
    //   return data;
    // };
    return {
      form: {
        number: "",
        name: "",
        count: "",
        money: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入课程名称", trigger: "change" }
        ],
        count: [
          { required: true, message: "请选择课程次数", trigger: "change" }
        ],
        money: [{ required: true, message: "请填写金额", trigger: "change" }]
      },
      dialogTitle: "",
      showBtn: "",
      coursePositionX: "",
      coursePositionY: "",
      courseNumber: [],
      newTime: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      // contextmenu data (菜单数据)
      contextMenuData: {
        // the contextmenu name(@1.4.1 updated)
        menuName: "demo",
        // The coordinates of the display(菜单显示的位置)
        axios: {
          x: null,
          y: null
        },
        // Menu options (菜单选项)
        menulists: [
          {
            fnHandler: "savedata", // Binding events(绑定事件)
            // icoName: 'fa fa-home fa-fw', // icon (icon图标 )
            btnName: "Save" // The name of the menu option (菜单名称)
          },
          {
            fnHandler: "newdata",
            // icoName: 'fa fa-home fa-fw',
            btnName: "New"
          }
        ]
      },
      king: "",
      // data2: generateData2(),
      studentList: [],
      courseStudentAdjustList: [],
      tempCourseStudentAdjustList: [],
      rightcourseStudents: [],
      group_serial: "",
      schooltime: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      options: [
        {
          value: "选项1",
          label: "星期一"
        },
        {
          value: "选项2",
          label: "星期二",
          disabled: true
        },
        {
          value: "选项3",
          label: "星期三"
        },
        {
          value: "选项4",
          label: "星期四"
        },
        {
          value: "选项5",
          label: "星期五"
        },
        {
          value: "选项5",
          label: "星期六"
        },
        {
          value: "选项5",
          label: "星期日"
        }
      ],
      value: "",
      options2: [
        {
          value: "选项1",
          label: "1"
        },
        {
          value: "选项2",
          label: "2",
          disabled: true
        },
        {
          value: "选项3",
          label: "3"
        },
        {
          value: "选项4",
          label: "4"
        },
        {
          value: "选项5",
          label: "5"
        }
      ],
      value2: "",
      options3: [
        {
          value: "选项1",
          label: "1"
        },
        {
          value: "选项2",
          label: "2",
          disabled: true
        },
        {
          value: "选项3",
          label: "3"
        },
        {
          value: "选项4",
          label: "4"
        },
        {
          value: "选项5",
          label: "5"
        }
      ],
      value3: "",
      options4: [
        {
          value: "选项1",
          label: "每周1次"
        },
        {
          value: "选项2",
          label: "每周2次",
          disabled: true
        },
        {
          value: "选项3",
          label: "不限定上课次数"
        }
      ],
      value4: "",
      options5: [
        {
          value: "选项1",
          label: "每周1次"
        },
        {
          value: "选项2",
          label: "每周2次",
          disabled: true
        },
        {
          value: "选项3",
          label: "不限定上课次数"
        }
      ],
      value5: "",
      selectMyTable: [],
      tableData4: [
        {
          className: "精品课程",
          Number: "1次/周"
        },
        {
          className: "强化课程",
          Number: "2次/周"
        },
        {
          className: "高手会课程",
          Number: "不限定上课次数"
        }
      ],
      courses: [],
      courseInfo: [],
      multipleSelection: [],
      courseVisible: false,
      room: '',
      rooms: []
    };
  },
  methods: {
    /*清空表单样式调用*/
    clearFormData(formName) {
      this.$refs[formName].resetFields();
    },
    //清除选中状态
    removeCheck(multipleTable) {
      this.$refs[multipleTable].clearSelection();
    },
    //清除筛选条件及数据选中状态
    clearQuery() {
      this.$refs.myTransfer.clearQuery("left");
      this.$refs.myTransfer.clearQuery("right");
      this.courseStudentAdjustList = [];
      this.rightcourseStudents = [];
    },
    //打开弹窗后重新赋值
    overwriteData() {
      for (var i = 0; i < this.schooltime.length; i++) {
        this.schooltime[i].jstart = this.schooltime[i].time.substring(0, 5);
        this.schooltime[i].jend = this.schooltime[i].time.substring(6, 11);
      }
    },
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
    //新增、修改课程
    addNewCourse(form, type) {
      var that = this;
      var userData = qs.parse(sessionStorage.getItem("userData"));
      var courseInfoParams = "";
      this.$refs.courseForm.validate(valid => {
        if (valid) {
          if (this.showBtn == 1) {
            //新增
            var courseInfoData = {
              company_serial: userData.company_serial,
              jname: this.form.name,
              jclassesperweek: this.form.count,
              jprice: this.form.money
            };
            courseInfoParams = {
              methodUrl: "courseManagement/addSetUpCourseInformation",
              jsonParam: qs.stringify(courseInfoData)
            };
          } else {
            //修改
            var courseInfoData = {
              jserial: that.form.number,
              jname: that.form.name,
              jclassesperweek: that.form.count,
              jprice: that.form.money
            };
            courseInfoParams = {
              methodUrl: "courseManagement/updateSetUpCourseInformation",
              jsonParam: qs.stringify(courseInfoData)
            };
          }
          this.$axios.postRequest(courseInfoParams).then(
            function(res) {
              that.refreshcourseInfo();
              if (type == 2) {
                that.clearFormData("courseForm"); //清空数据
              } else {
                that.courseVisible = false; //关闭弹窗且清空数据
              }
            },
            function(res) {
              //失败之后处理逻辑
              console.log("error:" + res);
              that.$message({
                type: "error",
                message: "操作失败"
              });
            }
          );
        } else {
          return false;
        }
      });
    },
    addCourseInfo() {
      this.showBtn = 1;
      this.dialogTitle = "新增课程";
      this.courseVisible = true;
    },
    //获取修改课程数据
    updateCourseInfo() {
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
          //延迟赋值
          that.multipleSelection.forEach(function(v) {
            that.form.number = v.jserial;
            that.form.name = v.jname;
            that.form.count = v.jclassesperweek;
            that.form.money = v.jprice;
          });
        }, 0);
        this.showBtn = 0;
        this.dialogTitle = "修改课程";
        this.courseVisible = true;
      }
    },
    //删除课程
    deleteCourseInfo() {
      var userData = qs.parse(sessionStorage.getItem("userData"));
      var that = this;
      if (this.multipleSelection.length > 0) {
        this.$confirm("此操作将永久删除该课程, 是否继续？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var arrvalue = []; //用于存放取出的数组的值
            for (var i = 0; i < this.multipleSelection.length; i++) {
              arrvalue.push(this.multipleSelection[i].jserial); //数组的索引是从0开始的
              console.log(arrvalue);
            }
            var deleteData = {
              company_serial: userData.company_serial,
              jserials: arrvalue.join(",")
            };
            var deleteParams = {
              methodUrl: "courseManagement/deleteSetUpCourseInformation",
              jsonParam: qs.stringify(deleteData)
            };
            this.$axios.postRequest(deleteParams).then(
              function(res) {
                //成功之后处理逻辑
                that.refreshcourseInfo();
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
    handleChange(value, direction, movedKeys) {
      this.tempCourseStudentAdjustList = this.courseStudentAdjustList;
      if (direction == "left") {
        for (var i = 0; i < movedKeys.length; i++) {
          this.tempCourseStudentAdjustList[movedKeys[i]].jstatus = 1;
        }
      } else {
        for (var i = 0; i < movedKeys.length; i++) {
          this.tempCourseStudentAdjustList[movedKeys[i]].jstatus = 0;
        }
      }
    },
    //获取详情 上课班级学生名单 webservice接口
    classStudentInformation(index) {
      var that = this;
      var userData = qs.parse(sessionStorage.getItem("userData"));
      var item = this.selectMyTable[index];
      var courseInfoData = {
        regserial: userData.company_serial,
        department_serial: item.dep_serial,
        group_serial: item.jstu_group
      };
      this.group_serial = item.jstu_group;
      var courseInfoParams = {
        methodUrl: "courseManagement/classStudentInformation",
        jsonParam: qs.stringify(courseInfoData)
      };
      this.$axios.postRequest(courseInfoParams).then(
        function(res) {
          var data = [];
          res.data.forEach((student_name, index) => {
            data.push({
              label: res.data[index].student_name,
              key: index,
              jstatus: res.data[index].jstatus,
              student_serial: res.data[index].student_serial,
              jName: res.data[index].jName
            });
          });
          that.courseStudentAdjustList = data;
          var rightcourseStudents = [];
          for (var i = 0; i < data.length; i++) {
            if (data[i].jstatus == 0) {
              rightcourseStudents.push(i);
            }
          }
          that.rightcourseStudents = rightcourseStudents;
          that.dialogVisible3 = true;
        },
        function(res) {
          //失败之后处理逻辑
          console.log("error:" + res);
        }
      );
    },
    submitMenuList() {
      var inList = [];
      var outList = [];
      console.log(this.tempCourseStudentAdjustList);
      for (var i = 0; i < this.tempCourseStudentAdjustList.length; i++) {
        if (this.tempCourseStudentAdjustList[i].jstatus == 0) {
          outList.push(this.tempCourseStudentAdjustList[i].student_serial);
        } else {
          inList.push(this.tempCourseStudentAdjustList[i].student_serial);
        }
      }
      var that = this;
      var courseData = {
        regserial: this.$store.state.regserial,
        in_serials: inList.join(","),
        out_serials: outList.join(","),
        group_serial: this.group_serial
      };
      var courseParams = {
        methodUrl: "courseManagement/submitCourseStudentInformation",
        jsonParam: qs.stringify(courseData)
      };
      this.$axios.postRequest(courseParams).then(
        function(res) {
          that.selectDetail(that.coursePositionX, that.coursePositionY);
          that.dialogVisible3 = false;
        },
        function(res) {
          //失败之后处理逻辑
          console.log("error:" + res);
        }
      );
    },
    //转化时间格式
    timeChange(time) {
      /** * 时间转为秒 * @param time 时间(00:00:00) * @returns {string} 时间戳（单位：秒） */
      var hour = time.split(":")[0];
      var min = time.split(":")[1];
      return Number(hour * 3600) + Number(min * 60);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      console.log("----------------ahahahahahah---------------------");
      this.pageSize = val;
      var userData = qs.parse(sessionStorage.getItem("userData"));
      var postData = {
        regserial: userData.company_serial,
        permissions_id: userData.permissions_id,
        count: true,
        pageindex: this.currentPage,
        pagesize: val
      };
      var params = {
        methodUrl: "memberManagement/memberClickQuery",
        jsonParam: qs.stringify(postData)
      };
      var that = this;
      this.$axios.postRequest(params).then(
        function(res) {
          //成功之后处理逻辑
          that.members = res.data.list;
          that.total = res.data.totalcount;
        },
        function(res) {
          //失败之后处理逻辑
          console.log("error:" + res);
        }
      );
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      var userData = qs.parse(sessionStorage.getItem("userData"));
      var postData = {
        regserial: userData.company_serial,
        permissions_id: userData.permissions_id,
        count: true,
        pageindex: val,
        pagesize: this.pageSize
      };
      var params = {
        methodUrl: "memberManagement/memberClickQuery",
        jsonParam: qs.stringify(postData)
      };
      var that = this;
      this.$axios.postRequest(params).then(
        function(res) {
          //成功之后处理逻辑
          that.members = res.data.list;
          that.total = res.data.totalcount;
        },
        function(res) {
          //失败之后处理逻辑
          console.log("error:" + res);
        }
      );
    },
    // handleClose(done) {
    //   this.$confirm('确认关闭？')
    //     .then(_ => {
    //       done();
    //     })
    //     .catch(_ => {
    //     });
    // },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    showMenu(index, jindex) {
      this.coursePositionX = index;
      this.coursePositionY = jindex;
      event.preventDefault();
      var x = event.clientX;
      var y = event.clientY;
      // Get the current location
      this.contextMenuData.axios = {
        x,
        y
      };
      // const targetDimensions = this.$refs.box.getBoundingClientRect()
      const postition = {
        top: y,
        left: x
      };
      this.$refs.contextmenu.show(postition);
    },
    updateCousreRequest(jstatus) {
      var that = this;
      var userData = qs.parse(sessionStorage.getItem("userData"));
      var weekData = {
        regserial: userData.company_serial,
        jday: this.coursePositionY + 1,
        jtime_xh: this.coursePositionX + 1,
        jstatus: jstatus
      };
      var weekParams = {
        methodUrl: "courseManagement/updateCourseInformation",
        jsonParam: qs.stringify(weekData)
      };
      this.$axios.postRequest(weekParams).then(
        function(res) {
          that.refreshCourse();
        },
        function(res) {
          //失败之后处理逻辑
          console.log("error:" + res);
        }
      );
    },
    handleClick(vm, event) {
      if (vm.$slots.default[0].text == "设置") {
        if (
          this.courses[this.coursePositionX][this.coursePositionY].jstatus == 0
        ) {
          this.updateCousreRequest(1);
        } else {
          this.$message({
            message: "课程已存在，无需设置",
            type: "warning",
            showClose: true
          });
        }
      } else if (vm.$slots.default[0].text == "取消") {
        if (
          this.courses[this.coursePositionX][this.coursePositionY].jstatus == 1
        ) {
          this.updateCousreRequest(0);
        } else {
          this.$message({
            message: "课程不存在，无法取消",
            type: "warning",
            showClose: true
          });
        }
      }
    },
    refreshCourse() {
      var userData = qs.parse(sessionStorage.getItem("userData"));
      var that = this;
      var courseData = {
        regserial: userData.company_serial
      };
      var courseParams = {
        methodUrl: "courseManagement/courseSection",
        jsonParam: qs.stringify(courseData)
      };
      this.$axios.postRequest(courseParams).then(
        function(res) {
          //成功之后处理逻辑
          // that.courses = res.data
          var num = 7; //每个子数组里的元素个数
          var arr = res.data;
          var Arr = new Array(Math.ceil(arr.length / num));
          for (var i = 0; i < Arr.length; i++) {
            Arr[i] = new Array();
            for (var j = 0; j < num; j++) {
              Arr[i][j] = "";
            }
          }
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].jstatus == 1) {
              arr[i].value = "√";
            } else {
              arr[i].value = "";
            }
            Arr[parseInt(i / num)][i % num] = arr[i];
          }
          that.courses = Arr;
        },
        function(res) {
          //失败之后处理逻辑
          console.log("error:" + res);
        }
      );
    },
    selectDetail(index, jindex) {
      console.log(index);
      var userData = qs.parse(sessionStorage.getItem("userData"));
      this.coursePositionX = index;
      this.coursePositionY = jindex;
      var classSchedule_id = "";
      if(!isNaN(index) && !isNaN(jindex)){
        classSchedule_id = this.coursePositionY + 1 + "" + (this.coursePositionX + 1);
      }
      
      var that = this;
      var courseData = {
        count: true,
        pageindex: 1,
        pagesize: this.pageSize,
        regserial: userData.company_serial,
        permissions_id: userData.permissions_id,
        classSchedule_id:classSchedule_id,
        dep_parent_serial:this.room
      };
      var courseParams = {
        methodUrl: "courseManagement/courseInformation",
        jsonParam: qs.stringify(courseData)
      };
      this.$axios.postRequest(courseParams).then(
        function(res) {
          that.selectMyTable = res.data;
          that.refreshCourse();
        },
        function(res) {
          //失败之后处理逻辑
          console.log("error:" + res);
        }
      );
    },
    //提交修改课程时间
    submitTime() {
      var periods = [];
      var start_times = [];
      var end_times = [];

      for (var i = 0; i < this.schooltime.length; i++) {
        periods.push(this.schooltime[i].xh);
        start_times.push(this.timeChange(this.schooltime[i].jstart));
        end_times.push(this.timeChange(this.schooltime[i].jend));
      }
      var that = this;
      this.dialogVisible = false;
      var userData = qs.parse(sessionStorage.getItem("userData"));
      var updateTimeData = {
        regserial: userData.company_serial,
        periods: periods.join(","),
        start_times: start_times.join(","),
        end_times: end_times.join(",")
      };

      var timeParams = {
        methodUrl: "courseManagement/updateCourseTimeInformation",
        jsonParam: qs.stringify(updateTimeData)
      };
      this.$axios.postRequest(timeParams).then(
        function(res) {
          that.refreshCurseTime();
        },
        function(res) {
          //失败之后处理逻辑
          console.log("error:" + res);
        }
      );
    },
    //更新课程时间
    refreshCurseTime() {
      //加载节次上课时间
      var that = this;
      var userData = qs.parse(sessionStorage.getItem("userData"));
      var timeData = {
        regserial: userData.company_serial
      };
      var timeParams = {
        methodUrl: "courseManagement/periodTimeInformation",
        jsonParam: qs.stringify(timeData)
      };
      this.$axios.postRequest(timeParams).then(
        function(res) {
          var timeTables = res.data;
          for (var i = 0; i < timeTables.length; i++) {
            timeTables[i].time =
              timeTables[i].jstart + "~" + timeTables[i].jend;
          }
          that.schooltime = timeTables;
        },
        function(res) {
          //失败之后处理逻辑
          console.log("error:" + res);
        }
      );
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    refreshcourseInfo() {
      var that = this;
      //加载课程信息
      var userData = qs.parse(sessionStorage.getItem("userData"));
      var courseInfoData = {
        regserial: userData.company_serial
      };
      var courseInfoParams = {
        methodUrl: "courseManagement/setUpCourseInformation",
        jsonParam: qs.stringify(courseInfoData)
      };
      this.$axios.postRequest(courseInfoParams).then(
        function(res) {
          that.courseInfo = res.data;
        },
        function(res) {
          //失败之后处理逻辑
          console.log("error:" + res);
        }
      );
    },
    onSubmit() {}
  },
  mounted() {
    //加载课程信息
    var that = this;
    this.refreshCourse();
    this.refreshCurseTime();
    this.refreshcourseInfo();
    var userData = qs.parse(sessionStorage.getItem("userData"));
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
    // //加载课程信息
    // var courseInfoData={
    //   regserial: this.$store.state.regserial,
    // }
    // var courseInfoParams={
    //   methodUrl: 'courseManagement/setUpCourseInformation',
    //   jsonParam: qs.stringify(courseInfoData)
    // }
    // this.$axios.postRequest(courseInfoParams).then(function (res) {
    // that.courseInfo=res.data
    // }, function (res) {
    //   //失败之后处理逻辑
    //   console.log("error:" + res)
    // })
  }
};
</script>
<style scoped>
.menuBg {
  /* width:30px; */
  background-color: white;
}

table {
  border: 0;
}

.leftBd {
  border: 1px solid #bbbbbb;
  margin: 20px;
  padding: 20px;
}

.tableBd {
  margin-bottom: 50px;
  border-top: 1px solid #c1c3c9;
  border-right: 1px solid #c1c3c9;
}

.selectBs {
  width: 118px;
  height: 23px;
}

.size {
    font-size: 12px;
    color: #101010;
    margin: 0 5px 0 0;
  }

.screen {
  margin: 10px 0 20px 0;
}

.rightBd {
  border: 1px solid #bbbbbb;
  margin: 20px;
  padding: 20px;
}

.classTime {
  margin: 10px;
}

.classInfo {
  margin: 10px;
}

.tableRbds {
  border: 1px solid #bbbbbb;
  width: 321px;
  margin-top: 20px;
  margin-bottom: 35px;
}

.adjust {
  margin: 10px 0 10px 0;
}

.tb th {
  width: 80px;
  height: 40px;
  border-left: 1px solid #c1c3c9;
}

.tb td {
  width: 80px;
  height: 40px;
  border-left: 1px solid #c1c3c9;
  border-bottom: 1px solid #c1c3c9;
  text-align: center;
}
</style>
