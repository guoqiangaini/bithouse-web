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
          <el-select v-model="value3" clearable placeholder="全部" size="mini" style="width: 90px">
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
          <el-select v-model="value4" clearable placeholder="全部" size="mini" style="width: 90px">
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
          <el-input v-model="value11" placeholder="单行输入" size="mini" style="width: 90px">
            <el-option
              v-for="item in times"
              :key="item.value"
              :label="item.label"
              :value="item.value" >
            </el-option>
          </el-input>

        </ul>
        <ul>
          <el-button size="mini"  type="info" class="btn" @click="find">查询</el-button>
          <el-button size="mini"  type="info" class="btn">生成报名二维码</el-button>
          <el-button size="mini"  type="info" class="btn" @click="dialogVisible = true">新增</el-button>
          <el-button size="mini"  type="info" class="btn">修改</el-button>
          <el-button size="mini"  type="info" class="btn">删除</el-button>
          <el-button size="mini"  type="info" class="btn">导入</el-button>
          <el-button size="mini"  type="info" class="btn">导出</el-button>
          <el-button size="mini"  type="info" class="btn" @click="dialogVisible4 = true">调动</el-button>
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
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" >
                    </el-option>
                  </el-select>
                </ul>
                <ul>
                  <span class="size">状态</span>
                  <el-select v-model="value13" placeholder="请选择" size="mini" style="width:120px">
                    <el-option
                      v-for="item in statuses"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" >
                    </el-option>
                  </el-select>
                </ul>
                <ul>
                  <span class="size">卡型</span>
                  <el-select v-model="value14" placeholder="请选择" size="mini" style="width:120px">
                    <el-option
                      v-for="item in cardType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" >
                    </el-option>
                  </el-select>
                </ul>
                <ul>
                  <span class="size">老师</span>
                  <el-select v-model="value15" placeholder="请选择" size="mini" style="width:120px">
                    <el-option
                      v-for="item in teachers"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" >
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
                  <el-select v-model="value21" placeholder="请选择" size="mini" style="width:120px">
                    <el-option
                      v-for="item in levels"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" >
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
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" >
                    </el-option>
                  </el-select>
                </ul>
                <ul>
                  <span class="size">班级</span>
                  <el-select v-model="value40" placeholder="请选择" size="mini" style="width:120px">
                    <el-option
                      v-for="item in classes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" >
                    </el-option>
                  </el-select>
                </ul>
                <ul>
                  <span class="size">教练</span>
                  <el-select v-model="value41" placeholder="请选择" size="mini" style="width:120px">
                    <el-option
                      v-for="item in coachs"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" >
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
        <el-button type="primary" @click="dialogVisible = false" size="mini">提交</el-button>
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
              <el-input v-model="input" placeholder="请输入内容" style="width: 30%"></el-input>
              <span>→</span>
              <el-select v-model="value5" placeholder="请选择">
                <el-option
                  v-for="item in options5"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </ul>
            <ul class="adjust">
              <span>关联教练</span>
              <el-input v-model="input" placeholder="请输入内容" style="width: 30%"></el-input>
              <span>→</span>
              <el-select v-model="value5" placeholder="请选择">
                <el-option
                  v-for="item in options5"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </ul>
            <ul class="adjust">
              <span>关联老师</span>
              <el-input v-model="input" placeholder="请输入内容" style="width: 30%"></el-input>
              <span>→</span>
              <el-select v-model="value5" placeholder="请选择">
                <el-option
                  v-for="item in options5"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </ul>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible4 = false" size="small">取 消</el-button>
              <el-button type="primary" @click="dialogVisible4 = false" size="small">提交</el-button>
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
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import {mapState} from 'vuex'
  export default {
      computed:{
        //获取条数
        total(){
          return this.$store.state.members.totalcount
        },
        //获取请求的会员信息展示在页面
        members(){
          return this.$store.state.members.list;
        },
        //获取请求的来源信息展示在页面
       source(){
         return this.$store.state.sources;
       },
        //获取请求的卡型信息展示在下拉选
        cardType(){
          return this.$store.state.cardType
        },
        //获取请求的道馆信息展示在下拉选
        rooms(){
          return this.$store.state.rooms
        },
        //获取请求的班级信息展示在下拉选
        classes(){
          return this.$store.state.classes
        },
        //获取请求的教练信息展示在下拉选
        coachs(){
          return this.$store.state.coachs
        },
        //获取请求的教师信息展示在下拉选
        teachers(){
          return this.$store.state.teachers
        },
        //获取请求的级别信息展示在下拉选
        levels(){
          return this.$store.state.levels
        },
        //获取请求的状态信息展示在下拉选
        statuses(){
          return this.$store.state.statuses
        },
        //获取性别信息
        gender(){
          return this.$store.state.genders
        },
        //获取课程信息
        course(){
          return this.$store.state.courses
        },
        //获取时间信息

        times(){
          return this.$store.state.times
        }
    },
    data() {
      return {
        pageSize:30,
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
      }
    },

    components: {
      ElCol,
      ElRow},
    methods: {
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
      find(){
        var department = "";
        if(this.value3!==''&& this.value4===''){
          department=this.value3
        }else if(this.value4!==''){
          department=this.value4
        }
        var postData = {
          department_serial:department,
          source_id:this.value1,
          membertype_id:this.value2,
          employee_serial:this.value5,
          jteacher_serial:this.value6,
          student_level :this.value7,
          status_id:this.value8,
          student_name:this.value9 ,
          student_no:this.value10 ,
          create_date: this.value11
        }
        this.$store.dispatch('sMember',postData)

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize=val
        var postData = {
          count:true,
          pageindex:this.currentPage,
          pagesize:val
        }
        this.$store.dispatch('sMember',postData);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage=val
        var postData = {
          count:true,
          pageindex:val,
          pagesize:this.pageSize
        }
        this.$store.dispatch('sMember',postData);
      }
    },
    mounted(){
        //加载会员信息
      var postData = {
        count:true,
        pageindex:1,
        pagesize:20
      }
      this.$store.dispatch('sMember',postData);
      //加载来源信息
      this.$store.dispatch('sSources');
      //加载卡类型
      this.$store.dispatch('sCard');
      //加载道馆信息
      this.$store.dispatch('sRoom');
      //加载班级信息
      this.$store.dispatch('sClass');
      //加载教练信息
      this.$store.dispatch('sCoach');
      //加载老师信息
      this.$store.dispatch('sTeacher');
      //加载级别信息
      this.$store.dispatch('sLevel');
      //加载状态信息
      this.$store.dispatch('sStatus');
      // //加载课程信息
      // this.$store.dispatch('sCourse');

    }
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
