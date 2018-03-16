<template>
   <div>
      <div class="pullDown">
        <ul>
          <span class="size">来源</span>
          <el-select v-model="value1" clearable placeholder="全部" size="mini" style="width: 90px">
            <el-option
              v-for="item in source"
              :key="item.id"
              :label="item.name"
              :value="item.id" >
            </el-option>
          </el-select>
        </ul>
        <ul>
          <span class="size">卡型</span>
          <el-select v-model="value2" clearable  placeholder="全部" size="mini" style="width: 90px">
            <el-option
              v-for="item in cardType"
              :key="item.id"
              :label="item.name"
              :value="item.id" >
            </el-option>
          </el-select>
        </ul>
        <ul>
          <span class="size">道馆</span>
          <el-select v-model="value3" clearable placeholder="全部" size="mini" style="width: 90px" @change="changes">
            <el-option
              v-for="item in rooms"
              :key="item.department_serial"
              :label="item.department_name"
              :value="item.department_serial" >
            </el-option>
          </el-select>
        </ul>
        <ul>
          <span class="size">班级</span>
          <el-select v-model="value4" clearable placeholder="全部" size="mini" style="width: 90px" @change="changess">
            <el-option
              v-for="item in classes"
              :key="item.department_serial"
              :label="item.department_name"
              :value="item.department_serial" >
            </el-option>
          </el-select>
        </ul>
        <ul>
          <span class="size">教练</span>
          <el-select v-model="value5" clearable placeholder="全部" size="mini" style="width: 90px">
            <el-option
              v-for="item in coachs"
              :key="item.employee_serial"
              :label="item.employee_name"
              :value="item.employee_serial" >
            </el-option>
          </el-select>
        </ul>
        <ul>
          <span class="size">老师</span>
          <el-select v-model="value6" clearable placeholder="全部" size="mini" style="width: 90px">
            <el-option
              v-for="item in teachers"
              :key="item.employee_serial"
              :label="item.employee_name"
              :value="item.employee_serial" >
            </el-option>
          </el-select>
        </ul>
        <ul>
          <span class="size">级别</span>
          <el-select v-model="value7" clearable placeholder="全部" size="mini" style="width: 90px">
            <el-option
              v-for="item in levels"
              :key="item.id"
              :label="item.name"
              :value="item.id" >
            </el-option>
          </el-select>

        </ul>
        <ul>
          <span class="size">状态</span>
          <el-select v-model="value8" clearable placeholder="全部" size="mini" style="width: 90px">
            <el-option
              v-for="item in statuses"
              :key="item.id"
              :label="item.name"
              :value="item.id" >
            </el-option>
          </el-select>
        </ul>
        <ul>
          <span class="size">姓名</span>
          <el-input v-model="value9" placeholder="单行输入" size="mini" style="width: 90px">
          </el-input>
        </ul>
        <ul>
          <span class="size">学号</span>
          <el-input v-model="value10" placeholder="单行输入" size="mini" style="width: 90px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value" >
            </el-option>
          </el-input>
        </ul>
        <ul>
          <span class="size">报名时间</span>
          <el-date-picker
            v-model="date"
            type="date"
            size="mini"
            style="width:140px"
            @change="getSTime"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </ul>
        <ul>
          <el-button size="mini"  type="info" class="btn" @click="find">查询</el-button>
          <el-button size="mini"  type="info" class="btn">生成报名二维码</el-button>
          <el-button size="mini"  type="info" class="btn" @click="dialogVisible= true">新增</el-button>
          <el-button size="mini"  type="info" class="btn">修改</el-button>
          <el-button size="mini"  type="info" class="btn"@click="deleteMember">删除</el-button>
          <el-button size="mini"  type="info" class="btn">导入</el-button>
          <el-button size="mini"  type="info" class="btn">导出</el-button>
          <el-button size="mini"  type="info" class="btn" @click="transfers">调动</el-button>
          <el-button size="mini"  type="info" class="btn">退卡</el-button>
        </ul>
        <!--新增弹出框-->
        <el-dialog
          title="信息填写"
          :visible.sync="dialogVisible"
           width="60%"
          :before-close="handleClose"
        center>
          <div >
            <el-row style="border: 1px solid black">
              <el-col  class="tanchu" :span="20">
                <h6>基础资料</h6>
                <ul>
                  <span class="size">来源</span>
                  <el-select v-model="value12" placeholder="请选择" size="mini" style="width: 120px">
                    <el-option
                      v-for="item in source"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id" >
                    </el-option>
                  </el-select>
                </ul>
                <ul>
                  <span class="size">状态</span>
                  <el-select v-model="value13" clearable placeholder="请选择" size="mini" style="width:120px">
                    <el-option
                      v-for="item in statuses"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id" >
                    </el-option>
                  </el-select>
                </ul>
                <ul>
                  <span class="size">卡型</span>
                  <el-select v-model="value14" clearable placeholder="请选择" size="mini" style="width:120px">
                    <el-option
                      v-for="item in cardType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id" >
                    </el-option>
                  </el-select>
                </ul>
                <ul>
                  <span class="size">老师</span>
                  <el-select v-model="value15" clearable placeholder="请选择" size="mini" style="width:120px">
                    <el-option
                      v-for="item in teachers"
                      :key="item.employee_serial"
                      :label="item.employee_name"
                      :value="item.employee_serial" >
                    </el-option>
                  </el-select>
                </ul>
                <ul>
                  <span class="size">姓名</span>
                  <el-input v-model="value16" placeholder="" size="mini" style="width:120px">
                  </el-input>
                </ul>
                <ul>
                <span class="size">学号</span>
                <el-input v-model="value17" placeholder="" size="mini" style="width:120px">
                </el-input>

              </ul>
                <ul>
                  <span class="size">性别 </span>
                  <el-select v-model="value18" placeholder="请选择" size="mini" style="width: 90px">
                    <el-option
                      v-for="item in gender"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" >
                    </el-option>
                  </el-select>

                </ul>
                <ul>
                  <span class="size">出生年月 </span>
                  <el-input v-model="value19" placeholder="" size="mini" style="width:120px"></el-input>
                </ul>
                <ul>
                  <span class="size">联系电话</span>
                  <el-input v-model="value20" placeholder="" size="mini" style="width:120px"></el-input>
                </ul>
                <ul>
                  <span class="size">级别</span>
                  <el-select v-model="value21" clearable placeholder="请选择" size="mini" style="width:120px">
                    <el-option
                      v-for="item in levels"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id" >
                    </el-option>
                  </el-select>
                </ul>
                <ul>
                  <span class="size">就读学校</span>
                  <el-input v-model="value22" placeholder="" size="mini" style="width:220px"></el-input>
                </ul>
                <ul>
                  <span class="size">物理卡号</span>
                  <el-input v-model="value23" placeholder="" size="mini" style="width:120px"></el-input>
                </ul>
                <ul>
                  <span class="size">身份证号</span>
                  <el-input v-model="value24" placeholder="" size="mini" style="width:220px"></el-input>
                </ul>
                <ul>
                  <span class="size">家庭住址</span>
                  <el-input v-model="value25" placeholder="" size="mini" style="width:270px"></el-input>
                </ul>
                <ul>
                  <span class="size">协会学号</span>
                  <el-input v-model="value26" placeholder="" size="mini" style="width:120px"></el-input>
                </ul>
                <ul>
                  <span class="size">家长信息</span><br>
                  <span class="size">父亲姓名</span>
                  <el-input v-model="value27" placeholder="" size="mini" style="width:120px"></el-input>
                  <span class="size">联系电话</span>
                  <el-input v-model="value28" placeholder="" size="mini" style="width:120px"></el-input><br>
                  <span class="size">母亲姓名</span>
                  <el-input v-model="value29" placeholder="" size="mini" style="width:120px"></el-input>
                  <span class="size">联系电话</span>
                  <el-input v-model="value30" placeholder="" size="mini" style="width:120px"></el-input>
                </ul>
              </el-col>
              <el-col :span="4">
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
            <el-row style="margin-top:30px;border: 1px solid black ">
              <el-col  class="tanchu">
                <h6>课程信息</h6>
                <ul>
                  <span class="size">课程名称</span>
                  <el-select v-model="value31" placeholder="请选择" size="mini" style="width: 90px">
                    <el-option
                      v-for="item in course"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" >
                    </el-option>
                  </el-select>
                </ul>
                <ul>
                  <span class="size">课程年限</span>
                  <el-input v-model="value32" placeholder="请选择" size="mini" style="width:120px">
                  </el-input>

                </ul>
                <ul>
                  <span class="size">每周上课次数</span>
                  <el-input v-model="value33" placeholder="" size="mini" style="width:120px">
                  </el-input>

                </ul>
                <ul>

                  <span class="size">体验课次数 </span>
                  <el-input v-model="value34" placeholder="请选择" size="mini" style="width:120px"></el-input>

                </ul>
                <ul>
                  <span class="size">缴费日期</span>
                  <el-input v-model="value35" placeholder="请选择" size="mini" style="width:120px"></el-input>
                </ul>
                <ul>
                  <span class="size">缴费金额</span>
                  <el-input v-model="value36" placeholder="请选择" size="mini" style="width:120px"></el-input>
                </ul>
                <ul>
                  <span class="size">课程开始时间</span>
                  <el-input v-model="value37" placeholder="请选择" size="mini" style="width:220px"></el-input>
                </ul>
                <ul>
                  <span class="size">课程结束时间</span>
                  <el-input v-model="value38" placeholder="请选择" size="mini" style="width:220px"></el-input>
                </ul>
                <ul>
                  <span class="size">道馆</span>
                  <el-select v-model="value39" placeholder="请选择" size="mini" style="width: 120px">
                    <el-option
                      v-for="item in rooms"
                      :key="item.department_serial"
                      :label="item.department_name"
                      :value="item.department_serial" >
                    </el-option>
                  </el-select>
                </ul>
                <ul>
                  <span class="size">班级</span>
                  <el-select v-model="value40" placeholder="请选择" size="mini" style="width:120px">
                    <el-option
                      v-for="item in classes"
                      :key="item.department_serial"
                      :label="item.department_name"
                      :value="item.department_serial" >
                    </el-option>
                  </el-select>
                </ul>
                <ul>
                  <span class="size">教练</span>
                  <el-select v-model="value41" placeholder="请选择" size="mini" style="width:120px">
                    <el-option
                      v-for="item in coachs"
                      :key="item.employee_serial"
                      :label="item.employee_name"
                      :value="item.employee_serial" >
                    </el-option>
                  </el-select>
                </ul>
                <ul>
                  <span class="size">上课时间</span>
                  <el-select v-model="value42" placeholder="请选择" size="mini" style="width:120px">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" >
                    </el-option>
                  </el-select>
                  <el-select v-model="value43" placeholder="请选择" size="mini" style="width:120px">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" >
                    </el-option>
                  </el-select>
                  <span>---</span>
                  <el-select v-model="value44" placeholder="请选择" size="mini" style="width:120px">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" >
                    </el-option>
                  </el-select>
                  <el-select v-model="value45" placeholder="请选择" size="mini" style="width:120px">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" >
                    </el-option>
                  </el-select>
                </ul>
              </el-col>
            </el-row>
            <el-row style="margin-top:30px;border: 1px solid black;padding:10px 5px">
              <el-col  class="tanchu">
                <h6>物品发放</h6>
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="道包"></el-checkbox>
                  <el-checkbox label="道服"></el-checkbox>
                  <el-checkbox label="道鞋"></el-checkbox>
                  <el-checkbox label="优惠券"></el-checkbox>
                  <el-checkbox label="玩具"></el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
          </div>
          <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addMember" size="mini">提交</el-button>
        <el-button type="primary" @click="dialogVisible = false" size="mini">继续添加</el-button>
  </span>
        </el-dialog>
        <!--调动弹出框-->
        <el-dialog
           title="学员调动"
          :visible.sync="dialogVisible4"
           width="40%"
          :before-close="handleClose"
        center>
          <div>
            <ul class="adjust">
              <span>所在道馆</span>
              <el-input v-model="ucs" :disabled="true" style="width: 30%"></el-input>
              <span>→</span>
              <el-select v-model="uc" placeholder="全部" @change="chang1">
                <el-option
                  v-for="item in rooms"
                  :key="item.department_serial"
                  :label="item.department_name"
                  :value="item.department_serial" >
                </el-option>
              </el-select>
            </ul>
            <ul></ul>
            <ul class="adjust">
              <span>所在班级</span>
              <el-input v-model="uss" :disabled="true" style="width: 30%"></el-input>
              <span>→</span>
              <el-select v-model="us" placeholder="全部" @change="changeValue">
                <el-option
                  v-for="item in classes"
                  :key="item.department_serial"
                  :label="item.department_name"
                  :value="item.department_serial" >
                </el-option>
              </el-select>
            </ul>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible4 = false" size="small">取 消</el-button>
              <el-button type="primary" @click="submit1" size="small">提交</el-button>
          </span>
        </el-dialog>
      </div>
         <el-table
           ref="multipleTable"
           size="mini"
           :data="members"
            border
            tooltip-effect="dark"
           :default-sort = "{prop: 'date', order: 'descending'}"
           @selection-change="handleSelectionChange"
           style="width: 100%">
           <el-table-column
             type="selection"
             align="center"
             >
           </el-table-column>
           <el-table-column
             align="center"
             prop="index"
             label="序号"
             sortable
             type="index"
             width="45"
             center
             >
           </el-table-column>
           <el-table-column
             align="center"
             width="60"
             prop="student_name"
             label="姓名"
             >
           </el-table-column>
           <el-table-column
             align="center"
             width="45"
             prop="jsex"
             label="性别"
             >
           </el-table-column>
           <el-table-column
             align="center"
             prop="employee_name"
             width="90"
             label="教练分配"
           >
           </el-table-column>
           <el-table-column
             align="center"
             prop="teacher_name"
             width="60"
             label="老师"
             >
           </el-table-column>
           <el-table-column
             align="center"
             width="80"
             prop="jName"
             label="级别"
             sortable
            >
           </el-table-column>
           <el-table-column
             width="100"
             prop="course_start"
             align="center"
             label="报名日期"
             >
           </el-table-column>
           <el-table-column
             align="center"
             prop="course_end "
             width="100"
             label="缴费日期"
             >
           </el-table-column>
           <el-table-column
             prop="payMethod"
             width="80"
             label="付费方式"
             align="center"
             >
           </el-table-column>
           <el-table-column
             prop="renewTime"
             width="100"
             label="续费日期"
             align="center"
             >
           </el-table-column>
           <el-table-column
             width="80"
             prop="dep_parent_name"
             label="道馆"
             align="center"
             >
           </el-table-column>
           <el-table-column
             width="120"
             prop="department_name"
             label="班级"
             align="center"
             >
           </el-table-column>
           <el-table-column
             width="80"
             prop="switches"
             label="调转情况"
             align="center"
             >
           </el-table-column>
           <el-table-column
             width="90"
             prop="fireClass"
             label="消课记录"
             align="center"
             >
           </el-table-column>
           <el-table-column
             width="120"
             prop="membertype_name"
             label="卡型"
             align="center"
             >
           </el-table-column>
           <el-table-column
             width="60"
             prop="sName"
             label="状态"
             align="center"
             >
             <!--:formatter="formatter">-->

           </el-table-column>
         </el-table>
     <el-pagination
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :current-page="currentPage"
       :page-sizes="[20, 40, 60]"
       :page-size="pageSize"
       layout="total, sizes, prev, pager, next, jumper"
       :total="total">
     </el-pagination>
  </div>
</template>
<script>
  import axios from 'axios'
  import qs from 'qs'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import {mapState} from 'vuex'
  export default {
    components: {
      ElCol,
      ElRow},
    data() {
      return {
        total:'',
        source:[],
        cardType:[],
        rooms:[],
        classes:[],
        coachs:[],
        teachers:[],
        levels:[],
        statuses:[],
        course:[],
        ucs:'',
        uc:'',
        uss:'',
        us:'',
        pageSize:20,
        currentPage:1,
        imageUrl: '',
        dialogVisible4: false,
        options:[],
        options5: [
          {
            value: '选项1',
            label: '每周1次'
          },
          {
            value: '选项2',
            label: '每周2次',
            disabled: true
          },
          {
            value: '选项3',
            label: '不限定上课次数'
          },
        ],
        input:'',
        value1:'',
        value2:'',
        value3:'',
        value4:'',
        value5: '',
        value6:'',
        value7:'',
        value8:'',
        value9:'',
        value10: '',
        value11:'',
        value12:'',
        value13:'',
        value14:'',
        value15: '',
        value16:'',
        value17:'',
        value18:'',
        value19:'',
        value20: '',
        value21:'',
        value22:'',
        value23:'',
        value24:'',
        value25:'',
        value26:'',
        value27:'',
        value28:'',
        value29:'',
        value30:'',
        value31:'',
        value32:'',
        value33:'',
        value34:'',
        value35:'',
        value36:'',
        value37:'',
        value38:'',
        value39:'',
        value40:'',
        value41:'',
        value42:'',
        value43:'',
        value44:'',
        value45:'',
        checkList: [],
        dialogVisible: false,
        value: '',
        multipleSelection: [],
        obj :{},
        obj1:{},
        date:'',
        members:[],
      }
    },
    computed:{
        regserial(){
          return this.$store.state.regserial
        },
        permissions_id(){
          return this.$store.state.permissions_id
        },
        //获取性别信息
        gender(){
          return this.$store.state.genders
        },
    },
    methods: {
      getSTime(val) {
        this.date=val;//这个sTime是在data中声明的，也就是v-model绑定的值
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
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
        console.log(val)
      },
      formatter(row, column) {
        return row.address;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
        },
      beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
      //查询
      find(){
        var department = "";
        if(this.value3!==''&& this.value4===''){
          department=this.value3
        }else if(this.value4!==''){
          department=this.value4
        }
        var postData = {
          count:true,
          pageindex:1,
          pagesize:this.pageSize,
          regserial:this.$store.state.regserial,
          permissions_id:this.$store.state.permissions_id,
          department_serial:department,
          source_id:this.value1,
          membertype_id:this.value2,
          employee_serial:this.value5,
          jteacher_serial:this.value6,
          student_level :this.value7,
          status_id:this.value8,
          student_name:this.value9 ,
          student_no:this.value10 ,
          create_date: this.date,
        }
        var params = {
          methodUrl:'memberManagement/memberClickQuery',
          jsonParam:qs.stringify(postData)
        }
        var that = this
        this.$axios.postRequest(params).then(function(res) {
          //成功之后处理逻辑
          that.members=res.data.list
          that.total=res.data.totalcount
        }, function(res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize=val
        var postData = {
          regserial:this.$store.state.regserial,
          permissions_id:this.$store.state.permissions_id,
          count:true,
          pageindex:this.currentPage,
          pagesize:val
        }
        var params = {
          methodUrl:'memberManagement/memberClickQuery',
          jsonParam:qs.stringify(postData)
        }
        var that = this
        this.$axios.postRequest(params).then(function(res) {
          //成功之后处理逻辑
          that.members=res.data.list
          that.total=res.data.totalcount
        }, function(res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage=val
        var postData = {
          regserial:this.$store.state.regserial,
          permissions_id:this.$store.state.permissions_id,
          count:true,
          pageindex:val,
          pagesize:this.pageSize
        }
        var params = {
          methodUrl:'memberManagement/memberClickQuery',
          jsonParam:qs.stringify(postData)
        }
        var that = this
        this.$axios.postRequest(params).then(function(res) {
          //成功之后处理逻辑
          that.members=res.data.list
          that.total=res.data.totalcount
        }, function(res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      },
      //添加
      addMember(){
        this.dialogVisible=false
        var memberData={
          jlx:2,
          jdolx:1,
          source_id:this.value12,
          status_id:this.value13,
          membertype_id:this.value14,
          jteacher_serial:this.value15,
          student_name:this.value16,
          student_no:this.value17,
          jtext:[{value:this.value18,value1:this.value19,value2:this.value20,value3:this.value21,value4:this.value22,
               value5:this.value23,value6:this.value24,value7:this.value25,value8:this.value26,value9:this.value27,value10:this.value28,
               value11:this.value29, value12:this.value30,value13:this.value31,value14:this.value32,value15:this.value33,value16:this.value34,
            value17:this.value35,value18:this.value36,
              value19:this.value37,value20:this.value38,value21:this.value39,value22:this.value40,value23:this.value41,value24:this.value42,value25:this.value43,
              value26:this.value44,value27:this.value45,value28:this.checkList
              }]
        }
        this.$store.dispatch('addMember',memberData)
      },
      //删除
      deleteMember(){
        if(this.multipleSelection.length>0){
          var arrvalue;//用于存放取出的数组的值
          for(var i=0;i<this.multipleSelection.length;i++){

            arrvalue=this.multipleSelection[i];//数组的索引是从0开始的

            console.log(arrvalue.student_serial.value)

          }
            var deleteData={
              jlx:2,
              jdolx:3,
              jSerial:this.multipleSelection['student_serial']

            }
        }
      },
      transfers(){
        if(this.multipleSelection.length<1){
          this.$message({
            message: '请选择数据',
            showClose: true,
            type: 'warning'
          });
          this.dialogVisible4 = false
        }else if(this.multipleSelection.length>1){
          this.$message({
            message: '只能选择一条数据',
            showClose: true,
            type: 'warning'
          });
          this.dialogVisible4 = false
        }else{
          var arr1=[];
          this.multipleSelection.forEach(function(v){ arr1.push(v.dep_parent_name,v.department_name,v.student_serial);});
          this.ucs=arr1[0]
          this.uss=arr1[1]
          this.id=arr1[2]
          this.dialogVisible4 = true
        }

      },
      changes(){
        var that = this
        var departments=this.value3
        //加载班级信息
        var classData={
          regserial:this.$store.state.regserial,
          dep_lx:'2',
          department_serial:departments,
          permissions_id:this.$store.state.permissions_id
        }
        var classParams={
          methodUrl:'memberManagement/memberClass',
          jsonParam:qs.stringify(classData)
        }
        this.$axios.postRequest(classParams).then(function(res) {
          //成功之后处理逻辑
          that.classes = res.data
        }, function(res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })

        //加载教练信息
        var coachData={
          regserial:this.$store.state.regserial,
          department_serial:departments,
          role_id:'102'
        }
        var coachParams={
          methodUrl:'memberManagement/memberTeacher',
          jsonParam:qs.stringify(coachData)
        }
        this.$axios.postRequest(coachParams).then(function(res) {
          //成功之后处理逻辑
          that.coachs = res.data
        }, function(res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })

        //加载老师信息
        var teacherData={
          regserial:this.$store.state.regserial,
          department_serial:departments,
          role_id:'103'
        }
        var teacherParams={
          methodUrl:'memberManagement/memberTeacher',
          jsonParam:qs.stringify(teacherData)
        }
        this.$axios.postRequest(teacherParams).then(function(res) {
          //成功之后处理逻辑
          that.teachers = res.data
        }, function(res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      },
      changess(){
        var that = this
        var departmentss=this.value4
        //加载教练信息
        var coachData={
          regserial:this.$store.state.regserial,
          department_serial:departmentss,
          role_id:'102'
        }
        var coachParams={
          methodUrl:'memberManagement/memberTeacher',
          jsonParam:qs.stringify(coachData)
        }
        this.$axios.postRequest(coachParams).then(function(res) {
          //成功之后处理逻辑
          that.coachs = res.data
        }, function(res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })

        //加载老师信息
        var teacherData={
          regserial:this.$store.state.regserial,
          department_serial:departmentss,
          role_id:'103'
        }
        var teacherParams={
          methodUrl:'memberManagement/memberTeacher',
          jsonParam:qs.stringify(teacherData)
        }
        this.$axios.postRequest(teacherParams).then(function(res) {
          //成功之后处理逻辑
          that.teachers = res.data
        }, function(res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      },
      chang1(value){
        var that = this
        this.obj1=this.rooms.find((item)=>{
          return item.department_serial === value;
        });
        var departmentsss=this.uc
        //加载班级信息
        var classData={
          regserial:this.$store.state.regserial,
          dep_lx:'2',
          department_serial:departmentsss,
          permissions_id:this.$store.state.permissions_id
        }
        var classParams={
          methodUrl:'memberManagement/memberClass',
          jsonParam:qs.stringify(classData)
        }
        this.$axios.postRequest(classParams).then(function(res) {
          //成功之后处理逻辑
          that.classes = res.data
        }, function(res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      },
      changeValue(value) {
        this.obj = this.classes.find((item)=>{
          return item.department_serial === value;
        });
      },
      submit1(){
        if(this.us===''){
          this.$message({
            message: '班级不能为空',
            showClose: true,
            type: 'warning'
          });
        }else{
          var coachData={
            dep_parent_serial:this.uc,
            dep_parent_name:this.obj1.department_name,
            department_serial:this.us,
            department_name:this.obj.department_name,
            student_serial:this.id,
            regserial:'10001',
          permissions_id:'1'
          }
          var params={
            methodUrl:'memberManagement/memberClickMove',
            jsonParam:qs.stringify(coachData)

          }
          this.dialogVisible4=false
          var coachParams = qs.parse(qs.stringify(coachData));
          var that = this
          this.$axios.postRequest( params).then(function(res) {
            //成功之后处理逻辑
           that.find()
          }, function(res) {
            //失败之后处理逻辑
            console.log("error:" + res)
          })

        }
      },

    },
    mounted(){
      var department = "";
      if(this.value3!==''&& this.value4===''){
        department=this.value3
      }else if(this.value4!==''){
        department=this.value4
      }
        //加载会员信息
      var postData = {
        count:true,
        pageindex:1,
        pagesize:20,
        regserial:this.$store.state.regserial,
        permissions_id:this.$store.state.permissions_id
      }
      var params = {
        methodUrl:'memberManagement/memberClickQuery',
        jsonParam:qs.stringify(postData)
      }
      var that = this
      this.$axios.postRequest(params).then(function(res) {
        //成功之后处理逻辑
        console.log()
        that.members=res.data.list
        that.total=res.data.totalcount
      }, function(res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })

      var companyData = {
        regserial:this.$store.state.regserial,
      }
      var mustParams = {
        methodUrl:'memberManagement/memberSource',
        jsonParam:qs.stringify(companyData)
      }
      //加载来源信息
      this.$axios.postRequest(mustParams).then(function(res) {
        //成功之后处理逻辑
        that.source = res.data
      }, function(res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })
      //加载卡类型
      var cardParams={
        methodUrl:'memberManagement/memberCard',
        jsonParam:qs.stringify(companyData)
      }
      this.$axios.postRequest(cardParams).then(function(res) {
        //成功之后处理逻辑
        that.cardType = res.data
      }, function(res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })
      //加载道馆信息
      var roomData={
        regserial:this.$store.state.regserial,
        dep_lx:'1',
        permissions_id:this.$store.state.permissions_id
      }
      var roomParams={
        methodUrl:'memberManagement/memberClass',
        jsonParam:qs.stringify(roomData)
      }
      this.$axios.postRequest(roomParams).then(function(res) {
        //成功之后处理逻辑
        that.rooms = res.data
      }, function(res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })
      //加载班级信息
      var classData={
        regserial:this.$store.state.regserial,
        dep_lx:'2',
        department_serial:this.value3,
        permissions_id:this.$store.state.permissions_id
      }
      var classParams={
        methodUrl:'memberManagement/memberClass',
        jsonParam:qs.stringify(classData)
      }
      this.$axios.postRequest(classParams).then(function(res) {
        //成功之后处理逻辑
        that.classes = res.data
      }, function(res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })

      //加载教练信息
      var coachData={
        regserial:this.$store.state.regserial,
        department_serial:department,
        role_id:'102'
      }
      var coachParams={
        methodUrl:'memberManagement/memberTeacher',
        jsonParam:qs.stringify(coachData)
      }
      this.$axios.postRequest(coachParams).then(function(res) {
        //成功之后处理逻辑
        that.coachs = res.data
      }, function(res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })

      //加载老师信息
      var teacherData={
        regserial:this.$store.state.regserial,
        department_serial:department,
        role_id:'103'
      }
      var teacherParams={
        methodUrl:'memberManagement/memberTeacher',
        jsonParam:qs.stringify(teacherData)
      }
      this.$axios.postRequest(teacherParams).then(function(res) {
        //成功之后处理逻辑
        that.teachers = res.data
      }, function(res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })
      //加载级别信息
      var levelData={
        regserial:this.$store.state.regserial,
      }
      var levelParams={
        methodUrl:'memberManagement/memberLevel',
        jsonParam:qs.stringify(levelData)
      }
      this.$axios.postRequest(levelParams).then(function(res) {
        //成功之后处理逻辑
        that.levels = res.data
      }, function(res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })
      //加载状态信息
      var statusData={
        regserial:this.$store.state.regserial,
      }
      var statusParams={
        methodUrl:'memberManagement/memberState',
        jsonParam:qs.stringify(statusData)
      }
      this.$axios.postRequest(statusParams).then(function(res) {
        //成功之后处理逻辑
        that.statuses = res.data
      }, function(res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })
    },
  }
</script>
<style scoped>
  .avatar-uploader {
    border: 1px solid black;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin:30px 10px 0 0;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 12px;
    color: #8c939d;
    width: 89px;
    height: 160px;
    line-height:160px;
    text-align: center;
  }
  .avatar {
    width: 89px;
    height:160px;
    display: block;
  }
  h6{
    margin: 0;
    padding:0
  }
  .menu{
    width: 300px;
    text-align: center;
  }
  .personal{
    width: 15%;
    background-color: red;
  }
  .list{

  }
  .size{
    font-size: 12px;
    color: #101010;
    margin:  0 5px 0 15px;
  }
  .pullDown{
    margin:  0 0 8px 0;

  }/*下拉选*/
  .pullDown ul{
    float: left;
    line-height: 40px;
  }

  .btn {
    margin: 0 0 20px 10px;
  }/*按钮*/
  .tanchu ul{
    float: left;
  }
</style>
