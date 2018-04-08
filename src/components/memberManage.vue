<template xmlns="http://www.w3.org/1999/html">
  <el-row>
    <!--条件开始-->
    <el-row class="pullDown">
      <!--来源-->
      <ul>
        <span class="size">来源</span>
        <el-select v-model="value1" clearable placeholder="全部" size="mini" style="width: 90px">
          <el-option
            v-for="item in source"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </ul>
      <!--卡型-->
      <ul>
        <span class="size">卡型</span>
        <el-select v-model="value2" clearable placeholder="全部" size="mini" style="width: 90px">
          <el-option
            v-for="item in cardType"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </ul>
      <!--道馆-->
      <ul>
        <span class="size">道馆</span>
        <el-select v-model="value3" clearable placeholder="全部" size="mini" style="width: 90px" @change="changes">
          <el-option
            v-for="item in rooms"
            :key="item.department_serial"
            :label="item.department_name"
            :value="item.department_serial">
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
            :value="item.department_serial">
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
            :value="item.employee_serial">
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
            :value="item.employee_serial">
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
            :value="item.id">
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
            :value="item.id">
          </el-option>
        </el-select>
      </ul>
      <ul>
        <span class="size">姓名</span>
        <el-input v-model="value9" placeholder="单行输入" size="mini" style="width: 90px">
        </el-input>
      </ul>
      <!--时间段下拉选-->
      <ul>
        <span class="size">时间段</span>
        <el-date-picker
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
      <ul>
        <el-button size="mini" type="info" class="btn" @click="find">查询</el-button>
        <el-button size="mini" type="info" class="btn">生成报名二维码</el-button>
        <el-button size="mini" type="info" class="btn" @click="showDialog(1)">新增</el-button>
        <el-button size="mini" type="info" class="btn" @click="showDialog(2)">修改</el-button>
        <el-button size="mini" type="info" class="btn" @click="deleteMember">删除</el-button>
        <!--<el-button size="mini"  type="info" class="btn">导入</el-button>-->
        <el-button size="mini" type="info" class="btn" @click="exportCh('会员管理','xlsx')">导出</el-button>
        <el-button size="mini" type="info" class="btn" @click="transfers">调动</el-button>
        <el-button size="mini" type="info" class="btn">退卡</el-button>
        <el-button size="mini" type="info" class="btn" @click="renew">续费</el-button>
      </ul>
    </el-row>
    <!--条件结束-->
    <!--新增修改弹出框开始-->
    <el-dialog
      :title="dialogTitle"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible"
      @close="closeDialog"
      width="900px" style="font-size:10px"
    >
      <el-form label-width="50px" :show-message="false"  class="demo-ruleForm" :model="addForm" :rules="rules" ref="addForm">
        <fieldset style="border: 1px solid #c1c3c9;">
          <legend style="font-weight: 600">基础资料</legend>
          <div class="basicData">
            <el-row >
              <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" >
                <el-row>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" >
                    <el-form-item label="来　　源" prop="addValue1" labelWidth="75px">
                      <el-select v-model="addForm.addValue1" placeholder="请选择" clearable size="mini" style="width: 135px;height: 30px">
                        <el-option
                          v-for="item in source"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"  >
                    <el-form-item label='卡　　型' prop="addValue2" style="text-indent: 1px;" labelWidth="75px">
                      <el-select v-model="addForm.addValue2" clearable placeholder="请选择" size="mini" style="width:135px">
                        <el-option
                          v-for="item in cardType"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" >
                    <el-form-item label="道　　馆" prop="addValue3" labelWidth="75px">
                      <el-select v-model="addForm.addValue3" placeholder="请选择" size="mini" style="width: 135px">
                        <el-option
                          v-for="item in rooms"
                          :key="item.department_serial"
                          :label="item.department_name"
                          :value="item.department_serial">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                </el-row><!--来源卡型道馆-->
                <el-row >
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="姓　　名" prop="addValue4" labelWidth="75px">
                      <el-input v-model="addForm.addValue4" placeholder="" size="mini" style="width:135px" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="病　　史" prop="addValue5" labelWidth="75px">
                      <el-select v-model="addForm.addValue5" clearable placeholder="请选择" size="mini" style="width:135px">
                        <el-option
                          v-for="item in medicalHistory"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="身　　高" prop="addValue6" labelWidth="75px">
                      <el-input v-model="addForm.addValue6" placeholder="" size="mini" style="width:135px" clearable></el-input>
                    </el-form-item>
                  </el-col>

                </el-row><!--姓名病史身高-->
                <el-row >
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="性　　别" prop="addValue7" labelWidth="75px">
                      <el-select v-model="addForm.addValue7" placeholder="请选择" size="mini" style="width:135px" clearable>
                        <el-option
                          v-for="item in genders"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="物理卡号" prop="addValue8" label-width="75px">
                      <el-input v-model="addForm.addValue8" placeholder="" size="mini" style="width:135px" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="出生日期" prop="addValue9" label-width="75px">
                      <el-date-picker
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        v-model="addForm.addValue9"
                        type="date"
                        size="mini"
                        placeholder="选择日期" style="width:135px">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row><!--性别物理卡号出生日期-->
                <el-row >
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="级　　别" prop="addValue10" labelWidth="75px">
                      <el-select v-model="addForm.addValue10" clearable placeholder="请选择" size="mini" style="width:135px">
                        <el-option
                          v-for="item in levels"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="身份证号" prop="addValue11" label-width="75px">
                      <el-input v-model="addForm.addValue11" clearable placeholder="" size="mini" style="width:135px" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="联系电话" prop="addValue12" label-width="75px">
                      <el-input v-model="addForm.addValue12" clearable placeholder="" size="mini" style="width:135px"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row><!--级别身份证号联系电话-->
                <el-row >
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="所在学校" prop="addValue13" label-width="75px">
                      <el-input v-model="addForm.addValue13" placeholder="" size="mini" style="width:250px" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="学员证号" prop="addValue14" label-width="75px">
                      <el-input v-model="addForm.addValue14" placeholder="" size="mini" style="width:250px" clearable></el-input>
                    </el-form-item>
                  </el-col>

                </el-row><!--所在学校学员证号-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="微　　信" prop="addValue15" labelWidth="75px">
                      <el-input v-model="addForm.addValue15" placeholder="" size="mini" style="width:250px" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="家庭住址" prop="addValue16" label-width="75px">
                      <el-input v-model="addForm.addValue16" placeholder="" size="mini" style="width:250px" clearable></el-input>
                    </el-form-item>
                  </el-col>

                </el-row><!--微信家庭住址-->
                <el-row >
                  <el-row labelWidth="80px">
                    <div  style="font-size: 12px;color: #303133;"><b>家长信息</b></div>
                  </el-row>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">

                    <el-form-item label="父亲姓名" prop="addValue17" labelWidth="75px">
                      <el-input v-model="addForm.addValue17" placeholder="" size="mini" style="width:135px" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="联系电话" prop="addValue18" labelWidth="75px">
                      <el-input v-model="addForm.addValue18" placeholder="" size="mini" style="width:135px" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="工作单位" prop="addValue19" labelWidth="75px">
                      <el-input v-model="addForm.addValue19" placeholder="" size="mini" style="width:135px" clearable></el-input>
                    </el-form-item>
                  </el-col>

                </el-row><!--父亲姓名联系电话-->
                <el-row >
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" >
                    <el-form-item label="母亲姓名" prop="addValue20" label-width="75px">
                      <el-input v-model="addForm.addValue20" placeholder="" size="mini" style="width:135px" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="联系电话" prop="addValue21" label-width="75px">
                      <el-input v-model="addForm.addValue21" placeholder="" size="mini" style="width:135px" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="工作单位" prop="addValue22" label-width="75px">
                      <el-input v-model="addForm.addValue22" placeholder="" size="mini" style="width:135px" clearable></el-input>
                    </el-form-item>
                  </el-col>

                </el-row><!--母亲姓名联系电话-->
                <el-row >
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item label="备注" prop="addValue23">
                      <el-input type="textarea" v-model="addForm.addValue23" placeholder="" size="mini"
                                style="width:618px"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row><!--备注-->
              </el-col>
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-upload style="width: 100%;text-align: center"
                           class="avatar-uploader"
                           action="string"
                           :data="imageUrl"
                           :http-request='submitUpload'
                           :show-file-list="false"
                           :on-success="handleAvatarSuccess"
                           :before-upload="beforeAvatarUpload"
                           :on-change="changeFile"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar"  >
                  <i v-else class="el-icon-plus avatar-uploader-icon">上传头像</i>
                </el-upload>
              </el-col><!--头像上传-->
            </el-row>
          </div><!--基础资料-->
        </fieldset>
        <fieldset style="border: 1px solid #c1c3c9;">
          <legend style="font-weight: 600">课程信息</legend>
          <div >

            <el-row>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="课程名称　　" prop="addValue24" labelWidth="100px">
                  <el-select v-model="addForm.addValue24" placeholder="请选择" size="mini" style="width:150px" clearable @change="courseInfoChange">
                    <el-option
                      v-for="item in courseInfo"
                      :key="item.jserial"
                      :label="item.jname"
                      :value="item.jserial">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col><!--课程名称-->
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="有效期　　　" prop="addValue25" labelWidth="100px">
                  <el-input v-model="addForm.addValue25" placeholder="请选择" size="mini" style="width:150px" clearable @change="courseInfoChange">
                    <el-option
                      v-for="item in courseInfo"
                      v-if="item.jserial===courseId"
                      :key="item.jserial"
                      :label="item.course_year"
                      :value="item.jserial">
                    </el-option>
                  </el-input>
                </el-form-item>
              </el-col><!--有效期-->
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="每周上课次数" prop="addValue26" labelWidth="100px">
                  <el-select v-model="addForm.addValue26" clearable  placeholder="请选择" size="mini" style="width:150px">
                    <el-option
                      v-for="item in courseInfo"
                      v-if="item.jserial===courseId"
                      :key="item.jserial"
                      :label="item.jclassesperweek"
                      :value="item.jserial">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col><!--每周上课次数-->
            </el-row>
            <el-row >
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="课时数　" prop="addValue27" labelWidth="100px">
                  <el-select v-model="addForm.addValue27" clearable  placeholder="请选择" size="mini" style="width:150px">
                    <el-option
                      v-for="item in courseInfo"
                      v-if="item.jserial===courseId"
                      :key="item.jserial"
                      :label="item.jvalidPeriod"
                      :value="item.jserial">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col><!--体验课次数-->
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="缴费日期　　" prop="addValue28" labelWidth="100px">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    v-model="addForm.addValue28"
                    type="date"
                    size="mini"
                    placeholder="选择日期" style="width: 150px">
                  </el-date-picker>
                </el-form-item>
              </el-col><!--缴费日期-->
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="应缴金额　　" prop="addValue29" labelWidth="100px">
                  <el-select v-model="addForm.addValue29" clearable  placeholder="请选择" size="mini" style="width:150px">
                    <el-option
                      v-for="item in courseInfo"
                      v-if="item.jserial===courseId"
                      :key="item.jserial"
                      :label="item.unitPrice"
                      :value="item.jserial">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col><!--缴费金额-->
            </el-row>
            <el-row style="margin-bottom: 10px">
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="课程开始时间" prop="addValue30" labelWidth="100px">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    v-model="addForm.addValue30"
                    type="date"
                    size="mini"
                    placeholder="选择日期" style="width: 150px">
                  </el-date-picker>
                </el-form-item>
              </el-col><!--课程开始时间-->
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="课程结束时间" prop="addValue31" labelWidth="100px">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    v-model="addForm.addValue31"
                    type="date"
                    size="mini"
                    placeholder="选择日期" style="width:150px">
                  </el-date-picker>
                </el-form-item>
              </el-col><!--课程结束时间-->
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="实缴金额　　" prop="addValue32" labelWidth="100px">
                  <el-input v-model="addForm.addValue32" clearable placeholder="请选择" size="mini" style="width:150px">
                  </el-input>
                </el-form-item>
              </el-col><!--教练-->
            </el-row>
            <el-row>
              <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="班级" prop="addValue33">
                  <el-select v-model="addForm.addValue33" placeholder="请选择" size="mini" style="width:120px">
                    <el-option
                      v-for="item in classes"
                      :key="item.department_serial"
                      :label="item.department_name"
                      :value="item.department_serial">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col><!--班级-->
              <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="教练" prop="addValue34">
                  <el-select v-model="addForm.addValue34" placeholder="请选择" size="mini" style="width:120px">
                    <el-option
                      v-for="item in coachs"
                      :key="item.employee_serial"
                      :label="item.employee_name"
                      :value="item.employee_serial">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col><!--教练-->
              <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="老师" prop="addValue35">
                  <el-select v-model="addForm.addValue35" clearable placeholder="请选择" size="mini" style="width:120px">
                    <el-option
                      v-for="item in teachers"
                      :key="item.employee_serial"
                      :label="item.employee_name"
                      :value="item.employee_serial">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col><!--老师-->
              <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="开票人" prop="addValue36" labelWidth="60px">
                  <el-select v-model="addForm.addValue36" placeholder="请选择" size="mini" style="width:120px">
                    <el-option
                      v-for="item in drawer"
                      :key="item.employee_serial"
                      :label="item.employee_name"
                      :value="item.employee_serial">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col><!--开票人-->
            </el-row>
          </div><!--课程信息-->
        </fieldset>
        <el-row style="margin-top:5px;padding:0 5px">
          <el-col class="tanchu">
            <fieldset style="border: 1px solid #c1c3c9;font-weight: 600;">
              <legend>物品发放</legend>
              <el-form-item label="" prop="name">
                <el-checkbox-group v-model="checkList" @change="goodsCbChange">
                  <el-checkbox v-for="item in goodsCbList" :label="item.name" :key="item.count">{{item.name}}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </fieldset>
          </el-col>
        </el-row><!--物品发放-->
        <div>
          <el-row style="margin-top:5px;padding:0 5px">
            <el-col class="tanchu">
              <fieldset style="border: 1px solid #c1c3c9;">
                <legend style="font-weight: 600">入会须知</legend>
                <div style="padding: 0px;">
                  <p>
                    1、会员或其监护人必须如实填写此表，若会员患有不宜练习跆拳道或不能参与剧烈活动等之疾病，不得报名。若患有其他疾病或有其他特殊情况须在填写此表时备注，以便适当调整训练强度。如有隐瞒病情及特殊情况之情形，发生的任何意外，一切法律后果均由会员和其监护人自行负责，与本馆无涉。</p>
                  <p>2、会员入会后，必须遵守本馆的规章制度、训练规定等，听从工作人员安排，反之造成的一切后果均由会员和其监护人负责，与本馆无涉。</p>
                  <p>3、 如因会员自身原因出现缺课、旷课，在有效期内无法完成全部课程的，课时不补，费用不退。如有特殊情况提前向本馆申请，经本馆同意后可在有效期内补课。</p>
                  <p>4、 会员卡一经办理概不退费，会员不得转让会员资格。</p>
                  <p>会员报名时，本馆已充分告知其会员和其监护人以上规定，会员和其监护人已知悉并同意遵守。</p>
                </div>
              </fieldset>
            </el-col>
          </el-row>
        </div><!--入会须知-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
       <el-button type="primary" @click="submitUpdate('addForm')" size="mini">确定</el-button>

  </span>
    </el-dialog>
    <!--新增修改弹出框结束-->
    <!--调动弹出框-->
    <el-dialog
      title="学员调动"
      :visible.sync="dialogVisible4"
      width="40%"
      center>
      <div>
        <ul class="adjust">
          <span>所在道馆</span>
          <el-input v-model="ucs" :disabled="true" style="width: 30%"></el-input>
          <span>→</span>
          <el-select v-model="uc" placeholder="全部" @change="chang1" clearable>
            <el-option
              v-for="item in rooms"
              :key="item.department_serial"
              :label="item.department_name"
              :value="item.department_serial">
            </el-option>
          </el-select>
        </ul>
        <ul></ul>
        <ul class="adjust">
          <span>所在班级</span>
          <el-input v-model="uss" :disabled="true" style="width: 30%"></el-input>
          <span>→</span>
          <el-select v-model="us" placeholder="全部" @change="changeValue" clearable>
            <el-option
              v-for="item in classes"
              :key="item.department_serial"
              :label="item.department_name"
              :value="item.department_serial">
            </el-option>
          </el-select>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="submit1" size="small">提交</el-button>
              <el-button @click="dialogVisible4 = false" size="small">取 消</el-button>
          </span>
    </el-dialog>
    <!--续费弹出框-->
    <el-dialog
      title="续费"
      :visible.sync="renewDialog"
      width="40%"
      center>
      <el-row>
        <el-col :span="11">
          <el-select v-model="xfcard" clearable placeholder="卡型" size="mini">
            <el-option
              v-for="item in cardType"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">-</el-col>
        <el-col :span="11">
          <el-select v-model="xfcourse" placeholder="课程" size="mini" clearable>
            <el-option
              v-for="item in courseInfo"
              :key="item.jserial"
              :label="item.jname"
              :value="item.jserial">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="11" style="margin-top:15px">
          <el-select v-model="mustMoney" placeholder="应缴金额" size="mini" clearable>
            <el-option
              v-for="item in courseInfo"
              :key="item.jserial"
              :label="item.jprice"
              :value="item.jserial">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2" style="margin-top:15px">-</el-col>
        <el-col :span="11">
          <el-input v-model="sjMoney" placeholder="实缴金额" size="mini" style="width:195px;margin-top:15px"></el-input>
        </el-col>
        <el-col :span="4" style="margin-top:15px">
          <span>开票人</span>
        </el-col>
        <el-col :span="20" style="margin-top:15px">
          <el-select v-model="adminName" placeholder="开票人" size="mini" clearable>
            <el-option
              v-for="item in drawer"
              :key="item.employee_serial"
              :label="item.employee_name"
              :value="item.employee_serial">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
                <el-button @click="renewDialog = false" size="small">取 消</el-button>
                <el-button type="primary" @click="submitreNew" size="small">提交</el-button>
            </span>
    </el-dialog>
    <!--续费结束-->
    <!--详情弹框开始-->
    <el-dialog
      title="学员详情"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="detailDialogVisible"
      :close="closeDialog"
      width="900px" style="font-size:10px"
    >
      <el-form label-width="50px" :show-message="false"  class="demo-ruleForm" :model="addForm"  ref="addForm">
        <fieldset style="border: 1px solid #c1c3c9;">
          <legend style="font-weight: 600">基础资料</legend>
          <div class="basicData">
            <el-row >
              <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" >
                <el-row>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" >
                    <el-form-item label="来　　源:" prop="addValue1" labelWidth="75px">
                      <div class="memberDetail">{{addForm.addValue1}}</div>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"  >
                    <el-form-item label='卡　　型:' prop="addValue2" style="text-indent:1px;" labelWidth="75px">
                      <div class="memberDetail">{{addForm.addValue2}}</div>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" >
                    <el-form-item label="道　　馆:" prop="addValue3" labelWidth="75px">
                      <div class="memberDetail">{{addForm.addValue3}}</div>
                    </el-form-item>
                  </el-col>

                </el-row><!--来源卡型道馆-->
                <el-row >
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="姓　　名:" prop="addValue4" labelWidth="75px">
                      <div class="memberDetail">{{addForm.addValue4}}</div>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="病　　史:" prop="addValue5" labelWidth="75px">
                      <div class="memberDetail">{{addForm.addValue5}}</div>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="身　　高:" prop="addValue6" labelWidth="75px">
                      <div class="memberDetail">{{addForm.addValue6}}</div>
                    </el-form-item>
                  </el-col>

                </el-row><!--姓名病史身高-->
                <el-row >
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="性　　别:" prop="addValue7" labelWidth="75px">
                      <div class="memberDetail">{{addForm.addValue7}}</div>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="物理卡号:" prop="addValue8" label-width="75px">
                      <div class="memberDetail">{{addForm.addValue8}}</div>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="出生日期:" prop="addValue9" label-width="75px">
                      <div class="memberDetail">{{addForm.addValue9}}</div>
                    </el-form-item>
                  </el-col>
                </el-row><!--性别物理卡号出生日期-->
                <el-row >
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="级　　别:" prop="addValue10" labelWidth="75px">
                      <div class="memberDetail">{{addForm.addValue10}}</div>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="身份证号:" prop="addValue11" label-width="75px">
                      <div class="memberDetail">{{addForm.addValue11}}</div>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="联系电话:" prop="addValue12" label-width="75px">
                      <div class="memberDetail">{{addForm.addValue12}}</div>
                    </el-form-item>
                  </el-col>
                </el-row><!--级别身份证号联系电话-->
                <el-row >
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="所在学校:" prop="addValue13" label-width="75px">
                      <div class="memberDetail">{{addForm.addValue13}}</div>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="学员证号:" prop="addValue14" label-width="75px">
                      <div class="memberDetail">{{addForm.addValue14}}</div>
                    </el-form-item>
                  </el-col>

                </el-row><!--所在学校学员证号-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="微　　信:" prop="addValue15" labelWidth="75px">
                      <div class="memberDetail">{{addForm.addValue15}}</div>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="家庭住址:" prop="addValue16" label-width="75px">
                      <div class="memberDetail">{{addForm.addValue16}}</div>
                    </el-form-item>
                  </el-col>

                </el-row><!--微信家庭住址-->
                <el-row >
                  <el-row labelWidth="80px">
                    <div  style="font-size: 12px;color: #303133;"><b>家长信息</b></div>
                  </el-row>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">

                    <el-form-item label="父亲姓名:" prop="addValue17" labelWidth="75px">
                      <div class="memberDetail">{{addForm.addValue17}}</div>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="联系电话:" prop="addValue18" labelWidth="75px">
                      <div class="memberDetail">{{addForm.addValue18}}</div>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="工作单位:" prop="addValue19" labelWidth="75px">
                      <div class="memberDetail">{{addForm.addValue19}}</div>
                    </el-form-item>
                  </el-col>
                </el-row><!--父亲姓名联系电话-->
                <el-row >
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" >
                    <el-form-item label="母亲姓名:" prop="addValue20" label-width="75px">
                      <div class="memberDetail">{{addForm.addValue20}}</div>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="联系电话:" prop="addValue21" label-width="75px">
                      <div class="memberDetail">{{addForm.addValue21}}</div>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item label="工作单位:" prop="addValue22" label-width="75px">
                      <div class="memberDetail">{{addForm.addValue22}}</div>
                    </el-form-item>
                  </el-col>

                </el-row><!--母亲姓名联系电话-->
                <el-row >
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item label="备注" prop="addValue23">
                      <div class="memberDetail">{{addForm.addValue23}}</div>
                    </el-form-item>
                  </el-col>
                </el-row><!--备注-->
              </el-col>
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-upload style="width: 100%;text-align: center"
                           action="https://wx.jpbvip.com/dowinsysws/services/memberManagement/memberUploadPic"
                           class="avatar-uploader"
                           :http-request='submitUpload'
                           :show-file-list="false"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar"  >
                  <i v-else class="el-icon-plus avatar-uploader-icon">上传头像</i>
                </el-upload>
              </el-col><!--头像上传-->
            </el-row>
          </div><!--基础资料-->
        </fieldset>
        <fieldset style="border: 1px solid #c1c3c9;">
          <legend style="font-weight: 600">课程信息</legend>
          <div >
            <el-row>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="课程名称:　　" prop="addValue24" labelWidth="100px">
                  <div class="memberDetail">{{addForm.addValue24}}</div>
                </el-form-item>
              </el-col><!--课程名称-->
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="有效期:　　　" prop="addValue25" labelWidth="100px">
                  <div class="memberDetail">{{addForm.addValue25}}</div>
                </el-form-item>
              </el-col><!--有效期-->
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="每周上课次数:" prop="addValue26" labelWidth="100px">
                  <div class="memberDetail">{{addForm.addValue26}}</div>
                </el-form-item>
              </el-col><!--每周上课次数-->
            </el-row>
            <el-row >
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="课时数:　" prop="addValue27" labelWidth="100px">
                <div class="memberDetail">{{addForm.addValue27}}</div>
                </el-form-item>
              </el-col><!--课时数-->
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="缴费日期:　　" prop="addValue28" labelWidth="100px">
                <div class="memberDetail">{{addForm.addValue28}}</div>
                </el-form-item>
              </el-col><!--缴费日期-->
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="应缴金额:　　" prop="addValue29" labelWidth="100px">
                  <div class="memberDetail">{{addForm.addValue29}}</div>
                </el-form-item>
              </el-col><!--缴费金额-->
            </el-row>
            <el-row style="margin-bottom: 10px">
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="课程开始时间:" prop="addValue30" labelWidth="100px">
                  <div class="memberDetail">{{addForm.addValue30}}</div>
                </el-form-item>
              </el-col><!--课程开始时间-->
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="课程结束时间:" prop="addValue31" labelWidth="100px">
                  <div class="memberDetail">{{addForm.addValue31}}</div>
                </el-form-item>
              </el-col><!--课程结束时间-->
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="实缴金额:　　" prop="addValue32" labelWidth="100px">
                  <div class="memberDetail">{{addForm.addValue32}}</div>
                </el-form-item>
              </el-col><!--教练-->
            </el-row>
            <el-row>
              <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="班级:" prop="addValue33">
                  <div class="memberDetail">{{addForm.addValue33}}</div>
                </el-form-item>
              </el-col><!--班级-->
              <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="教练:" prop="addValue34">
                  <div class="memberDetail">{{addForm.addValue34}}</div>
                </el-form-item>
              </el-col><!--教练-->
              <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="老师:" prop="addValue35">
                  <div class="memberDetail">{{addForm.addValue35}}</div>
                </el-form-item>
              </el-col><!--老师-->
              <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="开票人:" prop="addValue36" labelWidth="60px">
                  <div class="memberDetail">{{addForm.addValue36}}</div>
                </el-form-item>
              </el-col><!--开票人-->
            </el-row>
          </div><!--课程信息-->
        </fieldset>
        <el-row style="margin-top:5px;padding:0 5px">
          <el-col class="tanchu">
            <fieldset style="border: 1px solid #c1c3c9;font-weight: 600;">
              <legend>物品发放</legend>
              <el-form-item label="" prop="name">
                <el-checkbox-group v-model="checkList" @change="goodsCbChange">
                  <el-checkbox v-for="item in goodsCbList" :label="item.name" :key="item.count">{{item.name}}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </fieldset>
          </el-col>
        </el-row><!--物品发放-->
      </el-form>
    </el-dialog>
    <!--详情弹框结束-->
    <!--表格内容-->
    <el-row>
      <el-table
        ref="multipleTable"
        size="mini"
        :data="members"
        border
        tooltip-effect="dark"
        @sort-change='find'
        @row-click="openDetails"
        @selection-change="handleSelectionChange"
        :headerCellStyle="headerSetStyle"
        :cellStyle="cellSetStyle"
        style="width: 100%">
        <el-table-column
          type="selection"
          align="center"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="serial_number"
          label="序号"
          width="60"
          center
        >
        </el-table-column>
        <el-table-column
          align="center"
          width="90"
          prop="source_name"
          label="來源"
        >
        </el-table-column>
        <el-table-column
          align="center"
          width="90"

          prop="student_name"
          label="姓名"
        >
        </el-table-column>
        <el-table-column
          align="center"
          width="90"

          prop="jsex"
          label="性别"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="employee_name"
          width="120"

          label="教练分配"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="teacher_name"
          width="90"

          label="老师"
        >
        </el-table-column>
        <el-table-column
          align="center"
          width="80"
          prop="jName"
          label="级别"

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
          width="80"
          prop="department_name"
          label="班级"

          align="center"
        >
        </el-table-column>
        <el-table-column
          width="110"
          prop="count"

          label="消课记录"
          align="center"
        >
        </el-table-column>
        <el-table-column
          width="110"
          prop="membertype_name"
          label="卡型"

          align="center"
        >
        </el-table-column>
        <el-table-column

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
        :total="total"
        style="text-align: right;margin-top: 20px">
      </el-pagination>
    </el-row>
    <!--表格内容结束-->
  </el-row>
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
      ElRow
    },
    data() {
      return {
        dialogTitle:'',
        detailDialogVisible:false,
        fileParam:'',
        // uplodHeader:{'Content-Type': 'multipart/form-data; boundary=fuckReaquestHeader'},
        //开票人
        drawer:[],
        genders: [
          {
            value: '0',
            label: '未知'
          },
          {
            value: '1',
            label: '男'
          },
          {
            value: '2',
            label: '女'
          },
        ],//性别
        timeScope:'',//报名时间
        xfcard: '',
        xfcourse: '',
        mustMoney: '',
        sjMoney: '',
        adminName: '',
        //导出表头字段
        tableObject: [
          {
            field: 'student_name',
            width: '60',
            title: "姓名",
          },
          {
            field: 'jsex',
            width: '45',
            title: "性别",
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
            field: 'jName',
            width: '80',
            title: "级别",
          },
          {
            field: 'course_start',
            width: '100',
            title: "报名日期",
          },
          {
            field: 'course_end',
            width: '100',
            title: "缴费日期",
          },
          {
            field: 'payMethod',
            width: '80',
            title: "付费方式",
          },
          {
            field: 'renewTime',
            width: '100',
            title: "续费日期",
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
            field: 'switches',
            width: '80',
            title: "调转情况",
          },
          {
            field: 'fireClass',
            width: '90',
            title: "消课记录",
          },
          {
            field: 'membertype_name',
            width: '120',
            title: "卡型"
          },
          {
            field: 'sName',
            width: '60',
            title: "状态"
          }
        ],
        total: 0,
        cardType: [],
        rooms: [],
        classes: [],
        coachs: [],
        teachers: [],
        levels: [],
        statuses: [],
        course: [],
        courseId:'',
        courseInfo: [],
        ucs: '',
        uc: '',
        uss: '',
        us: '',
        pageSize: 20,
        currentPage: 1,
        imageUrl: '',
        dialogVisible4: false,
        renewDialog: false,
        input: '',
        source: [],
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        value7: '',
        value8: '',
        value9: '',
        value10: '',
        addForm:{
          addValue1: '',//来源
          addValue2: '',//卡型
          addValue3: '',//道馆
          addValue4: '',//姓名
          addValue5: '',//病史
          addValue6: '',//身高
          addValue7: '',//性别
          addValue8: '',//物理卡号
          addValue9: '',//出生日期
          addValue10: '',//级别
          addValue11: '',//身份证号
          addValue12: '',//联系电话
          addValue13: '',//所在学校
          addValue14: '',//学员证号
          addValue15: '',//微信
          addValue16: '',//家庭住址
          addValue17: '',//父亲姓名
          addValue18: '',//联系电话
          addValue19: '',//工作单位
          addValue20: '',//母亲姓名
          addValue21: '',//联系电话
          addValue22: '',//工作单位
          addValue23: '',//备注
          addValue24: '',//课程名称
          addValue25: '',//有效期
          addValue26: '',//每周上课次数
          addValue27: '',//体验课次数
          addValue28: '',//缴费日期
          addValue29: '',//缴费金额
          addValue30: '',//课程开始时间
          addValue31: '',//课程结束时间
          addValue32: '',//实缴金额
          addValue33: '',//班级
          addValue34: '',//教练
          addValue35: '',//老师
          addValue36: '',//开票人
        },
        //新增提交验证规则
        rules: {
          addValue1: [
            {required: true, message: '请选择来源', trigger: 'change'},
          ],
          addValue2: [
            {required: true, message: '请选择卡型', trigger: 'change'}
          ],
          addValue3: [
            { required: true, message: '请选择道馆', trigger: 'change'}
          ],
          addValue4: [
            { required: true, message: '请填写姓名', trigger: 'blur' },
          ],
          addValue5: [
            { required: true, message: '请选择病史', trigger: 'change'},
          ],
          addValue6: [
            {required: true, message: '请填写身高', trigger: 'blur'}
          ],
          addValue7: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          addValue8: [
            { required: true, message: '填请写物理卡号', trigger: 'blur'},
          ],
          addValue9: [
            {required: true, message: '请选择出生日期', trigger: 'change'}
          ],
          addValue10: [
            { required: true, message: '请选择级别', trigger: 'change'}
          ],
          addValue11: [
            { required: true, message: '请填写身份证号', trigger: 'blur'}
          ],
          addValue12: [
            { required: true, message: '请填写联系电话', trigger: 'blur'}
          ],
          addValue13: [
            {required: true, message: '请填写所在学校', trigger: 'blur'}
          ],
          addValue14: [
            {required: true, message: '请填写学员证号', trigger: 'blur'}
          ],
          addValue15: [
            {required: true, message: '请填写微信号', trigger: 'blur'},
          ],
          addValue16: [
            {required: true, message: '请填写家庭住址', trigger: 'blur'}
          ],
          addValue17: [
            { required: true, message: '请填写父亲姓名', trigger: 'blur'}
          ],
          addValue18: [
            { required: true, message: '填写联系电话', trigger: 'blur'}
          ],
          addValue19: [
            { required: true, message: '请填写工作单位', trigger: 'blur'}
          ],
          addValue20: [
            {required: true, message: '请填写母亲姓名', trigger: 'blur'}
          ],
          addValue21: [
            {required: true, message: '请填写母亲电话', trigger: 'blur'}
          ],
          addValue22: [
            {required: true, message: '请填写工作单位', trigger: 'blur'},
          ],
          addValue23: [

          ],
          addValue24: [
            { required: true, message: '请选择课程', trigger: 'change'}
          ],
          addValue25: [
            {required: true, message: '请填写有效期', trigger: 'blur'}
          ],
          addValue26: [
            { required: true, message: '请选择上课次数', trigger: 'change'}
          ],
          addValue27: [
            {required: true, message: '请填写体验课次数', trigger: 'blur'}
          ],
          addValue28: [
            { required: true, message: '请选择缴费日期', trigger: 'change'}
          ],
          addValue29: [
            {required: true, message: '请填写缴费金额', trigger: 'blur'},
          ],
          addValue30: [
            {required: true, message: '请选择开始时间', trigger: 'change'}
          ],
          addValue31: [
            { required: true, message: '请选择结束时间', trigger: 'change'}
          ],
          addValue32: [
            { required: true, message: '请填写实缴金额', trigger: 'blur'}
          ],
          addValue33: [
            { required: true, message: '请选择班级', trigger: 'change'}
          ],
          addValue34: [
            {required: true, message: '请选择教练', trigger: 'change'}
          ],
          addValue35: [
            {required: true, message: '请选择老师', trigger: 'change'}
          ],
          addValue36:[
            {required: true, message: '请选择开票人', trigger: 'change'}
          ],
        },
        serial: '',
        checkList: [],
        goodsCbList: [
          {name: '道包', count: 1},
          {name: '道服', count: 2},
          {name: '道鞋', count: 4},
          {name: '优惠券', count: 8},
          {name: '玩具', count: 16},
          {name: '促销礼包', count: 32},
        ],
        goodsCountParams: 0,
        dialogVisible: false,
        multipleSelection: [],
        obj: {},
        obj1: {},
        date: '',
        members: [],
        name: '',
        jdolx: '',//新增修改方法中的状态 1新增2修改,
        result:[],
        orderByName:''
      }
    },
    computed: {
      medicalHistory(){
        return this.$store.state.medicalHistory
      },
    },
    methods: {
      beforeAvatarUpload(){

      },
      submitUpload(file) {
        let param = new FormData(); // 创建 form 对象
        param.append("file", file.file, file.file.name); // 通过 append 向 form 对象添加数据
        let config = {
          headers: { "Content-Type": "multipart/form-data" }
        }; // 添加请求头
        this.$axios
          .postImageRequest(
            "memberManagement/memberUploadPic",
            param,
            config
          )
          .then(response => {
            console.log("============222================");
            console.log(response.data);
          });
      },
      courseInfoChange() {
        this.courseId =this.addForm.addValue24
      },
      //排序
      //提交续费
      //打开详情
      openDetails(row, event, column){
        this.serial = row.student_serial
        this.addForm.addValue1 = row.source_name
        this.addForm.addValue2 = row.membertype_name
        this.addForm.addValue3 = row.dep_parent_name
        this.addForm.addValue4 = row.student_name
        this.addForm.addValue5 = row.illness
        this.addForm.addValue6 = row.height
        this.addForm.addValue7 = row.jsex
        this.addForm.addValue8 = row.student_card
        this.addForm.addValue9 = row.birthday
        this.addForm.addValue10 = row.student_level
        this.addForm.addValue11 = row.id_card
        this.addForm.addValue12 = row.student_phone
        this.addForm.addValue13 = row.student_school
        this.addForm.addValue14 = row.student_id
        this.addForm.addValue15 = row.weixin_id
        this.addForm.addValue16 = row.student_address
        this.addForm.addValue17 = row.father_name
        this.addForm.addValue18 = row.father_phone
        this.addForm.addValue19 = row.father_comp
        this.addForm.addValue20 = row.mother_name
        this.addForm.addValue21 = row.mother_phone
        this.addForm.addValue22 = row.mother_comp
        this.addForm.addValue23 = row.jcontent
        this.addForm.addValue24 = row.course_name
        this.addForm.addValue25=row.course_year
        this.addForm.addValue26=row.jclassesperweek
        this.addForm.addValue27=row.jvalidPeriod
        this.addForm.addValue29=row.jprice
        this.addForm.addValue30=row.course_start
        this.addForm.addValue31=row.course_end
        this.addForm.addValue32=row.pay_price
        this.addForm.addValue33 = row.department_name,
        this.addForm.addValue34=row.employee_name
        this.addForm.addValue35=row.employee_name
        this.addForm.addValue36=row.fillPerson
        this.goodsCountParams=row.itemUse
        this.detailDialogVisible = true
      },
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
      closeDialog(){
        this.multipleSelection.length=0
        this.$refs.addForm.resetFields();
      },/*清空表单样式调用*/
      //导出
      exportCh(fileName, docType){

        var department = "";
        if (this.value3 !== '' && this.value4 === '') {
          department = this.value3
        } else if (this.value4 !== '') {
          department = this.value4
        }
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var postData = {
          count: true,
          pageindex: 1,
          pagesize: 100000,
          regserial: userData.company_serial,
          permissions_id: userData.permissions_id,
          department_serial: department,
          source_id: this.value1,
          membertype_id: this.value2,
          employee_serial: this.value5,
          jteacher_serial: this.value6,
          student_level: this.value7,
          status_id: this.value8,
          student_name: this.value9,
          student_no: this.value10,
          create_date: this.date,
        }
        docType = docType || "pdf";//默认导出pdf
        var gridCols = this.tableObject

        var params = {
          methodUrl: 'memberManagement/memberClickQuery',
          jsonParam: JSON.stringify(postData),
          exportStr: JSON.stringify(gridCols),
          exportType: docType,
          exportTitle:fileName
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
            'docType': docType
          };
          //另存为文档
          window.open("exportFile.do?" + qs.stringify(fileParam));

        }, (err) => {
          console.log(err)
        })
      },
      //浏览器兼容
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
      //报名时间下拉选
      getSTime(val) {
        this.date = val;//这个sTime是在data中声明的，也就是v-model绑定的值
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
          .catch(_ => {
          });
      },
      //下拉选多级联动
      //头像上传
      handleAvatarSuccess(res, file) {
        this.imageUrl = "https://wx.jpbvip.com/dowinsysws/swagger/upload/" + res.data.pic_url;

      },
      //查询
      find(column){
        var department = "";
        if (this.value3 !== '' && this.value4 === '') {
          department = this.value3
        } else if (this.value4 !== '') {
          department = this.value4
        }
        var userData = qs.parse(sessionStorage.getItem("userData"));
        if(column && column.order){
          var index = (column.order).indexOf("ending") //获取end e的下标
          if(column.prop=='teacher_name'){
            this.orderByName="r.employee_name "+(column.order).substring(0,index) //截取下标0到下标e之间的字符串
          }else if(column.prop=='employee_name'){
            this.orderByName="w.employee_name "+(column.order).substring(0,index)
          }else{
            this.orderByName=column.prop+ " "+(column.order).substring(0,index)
          }
        }
        var postData = {
          count: true,
          pageindex:this.currentPage,
          pagesize: this.pageSize,
          regserial: userData.company_serial,
          permissions_id: userData.permissions_id,
          department_serial: department,
          source_id: this.value1,
          membertype_id: this.value2,
          employee_serial: this.value5,
          jteacher_serial: this.value6,
          student_level: this.value7,
          status_id: this.value8,
          student_name: this.value9,
          student_no: this.value10,
          start_date:this.timeScope[0],
          end_date:this.timeScope[1],
          orderby:this.orderByName
        }
        var params = {
          methodUrl: 'memberManagement/memberClickQuery',
          jsonParam: qs.stringify(postData)
        }
        var that = this
        this.$axios.postRequest(params).then(function (res) {
          //成功之后处理逻辑
          that.members = res.data.list
          that.total = res.data.totalcount

        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })

      },
      //分页
      handleSizeChange(val) {
        var userData = qs.parse(sessionStorage.getItem("userData"));
        console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.find()
      },
      handleCurrentChange(val) {
        var userData = qs.parse(sessionStorage.getItem("userData"));
        this.currentPage = val
        this.find()
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
      // /显示弹窗type=1新增、=2修改，新增清空数据、修改查询数据。
      showDialog(type){
        var that =this
        if (type == 1) {
          that.dialogTitle='新增学员'
          that.jdolx = 1
          that.dialogVisible = true
        } else {
          if (this.multipleSelection.length < 1) {
            this.$message({
              message: '请选择学员',
              showClose: true,
              type: 'warning'
            });
          } else if (this.multipleSelection.length > 1) {
            this.$message({
              message: '只能选择一名学员',
              showClose: true,
              type: 'warning'
            });
          } else {
            this.dialogTitle='修改学员信息'
            this.jdolx = 2
            this.dialogVisible = true
            this.addForm.addValue1 = this.multipleSelection[0].source_id
            this.addForm.addValue2=this.multipleSelection[0].membertype_id
            this.addForm.addvalue3=this.multipleSelection[0].dep_parent_name
            this.addForm.addValue4 = this.multipleSelection[0].student_name
            this.addForm.addValue5=this.multipleSelection[0].illness
            this.addForm.addvalue6=this.multipleSelection[0].height
            this.addForm.addValue7 = this.multipleSelection[0].jsex
            this.addForm.addValue8=this.multipleSelection[0].student_card
            this.addForm.addvalue9=this.multipleSelection[0].birthday
            this.addForm.addValue10 = this.multipleSelection[0].student_level
            this.addForm.addValue11=this.multipleSelection[0].id_card
            this.addForm.addvalue12=this.multipleSelection[0].student_phone
            this.addForm.addValue13 = this.multipleSelection[0].student_school
            this.addForm.addValue14=this.multipleSelection[0].student_id
            this.addForm.addvalue15=this.multipleSelection[0].weixin_id
            this.addForm.addvalue16=this.multipleSelection[0].student_address
            this.addForm.addValue17=this.multipleSelection[0].father_name
            this.addForm.addvalue18=this.multipleSelection[0].father_phone
            this.addForm.addValue19 = this.multipleSelection[0].father_comp
            this.addForm.addValue20=this.multipleSelection[0].mother_name
            this.addForm.addvalue21=this.multipleSelection[0].mother_phone
            this.addForm.addvalue22=this.multipleSelection[0].mother_comp
            this.serial = this.multipleSelection[0].student_serial
          }
        }
      },
      //提交修改
      submitUpdate(addForm){
        var that = this
        that.$refs.addForm.validate((valid) => {
          if (valid) {
            that.result = [];
            that.result.push(this.addForm.addValue1,this.addForm.addValue2,this.addForm.addValue3,this.addForm.addValue4,this.addForm.addValue5,
              this.addForm.addValue6,this.addForm.addValue7,this.addForm.addValue8,this.addForm.addValue9,
              this.addForm.addValue10,this.addForm.addValue11,this.addForm.addValue12,this.addForm.addValue13,
              this.addForm.addValue14,this.addForm.addValue15,this.addForm.addValue16,this.addForm.addValue17,
              this.addForm.addValue18,this.addForm.addValue19,this.addForm.addValue20,this.addForm.addValue21,
              this.addForm.addValue22,this.addForm.addValue23,this.addForm.addValue24,this.addForm.addValue25,
              this.addForm.addValue26,this.addForm.addValue27,this.addForm.addValue28,this.addForm.addValue29,
              this.addForm.addValue30,this.addForm.addValue31,this.addForm.addValue32,this.addForm.addValue33,
              this.addForm.addValue34,this.addForm.addValue35,this.addForm.addValue36,
              this.goodsCountParams)
            var userData = qs.parse(sessionStorage.getItem("userData"));
            var updateMemberData = {
              jlx: 2,
              jdolx: that.jdolx,
              jSerial: this.addForm.addValue33,
              jname: this.addForm.addValue4,
              picUrl:this.imageUrl,
              regSerial: userData.company_serial,
              jlog_ip: '',
              jgly_Serial: userData.employee_serial,
              jtext: that.result.join(',')
            }
            this.dialogVisible = false

            var updateMemberParams = {
              methodUrl: 'memberManagement/memberOperation',
              jsonParam: qs.stringify(updateMemberData)
            }
            this.$axios.postRequest(updateMemberParams).then(function (res) {
              //成功之后处理逻辑
              that.find()
              that.$refs.addForm.resetFields()
            }, function (res) {
              //失败之后处理逻辑
              console.log("error:" + res)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      //删除
      deleteMember(){
        var that = this

        if (this.multipleSelection.length>0) {
          that.$message({
            message: '确定要删除吗？',
            showClose:"true",
            type: 'warning'
          });
          var arrvalue = [];//用于存放取出的数组的值
          for (var i = 0; i < this.multipleSelection.length; i++) {
            arrvalue.push(this.multipleSelection[i].student_serial);//数组的索引是从0开始的
          }
          var userData = qs.parse(sessionStorage.getItem("userData"));
          var deleteData = {
            jlx: 2,
            jdolx: 3,
            jSerial: 0,
            jname: '',
            picUrl: '',
            regSerial: userData.company_serial,
            jlog_ip: '',
            jgly_Serial: userData.employee_serial,
            jtext: arrvalue.join(',')
          }
          var deleteParams = {
            methodUrl: 'memberManagement/memberOperation',
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
      //调动获取数据
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
          var result = [];
          this.multipleSelection.forEach(function (v) {
            result.push(v.dep_parent_name, v.department_name, v.student_serial);
          });
          this.ucs = result[0]
          this.uss = result[1]
          this.id = result[2]
          this.dialogVisible4 = true
        }

      },
      //道馆联动
      changes(){
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var that = this
        var departments = this.value3
        //加载班级信息
        var classData = {
          regserial: userData.company_serial,
          dep_lx: '2',
          department_serial: departments,
          permissions_id: userData.permissions_id
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
          regserial: this.$store.state.regserial,
          department_serial: departments,
          role_id: '102'
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
          regserial: this.$store.state.regserial,
          department_serial: departments,
          role_id: '103'
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
      //班级联动
      changess(){
        var that = this
        var departmentss = this.value4
        //加载教练信息
        var userData = qs.parse(sessionStorage.getItem("userData"));

        var coachData = {
          regserial: userData.company_serial,
          department_serial: departmentss,
          role_id: '102'
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
          department_serial: departmentss,
          role_id: '103'
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
      //调动
      chang1(value){
        var that = this
        this.obj1 = this.rooms.find((item) => {
          return item.department_serial === value;
        });
        var departmentsss = this.uc
        //加载班级信息
        var classData = {
          regserial: this.$store.state.regserial,
          dep_lx: '2',
          department_serial: departmentsss,
          permissions_id: this.$store.state.permissions_id
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
      },
      changeValue(value) {
        this.obj = this.classes.find((item) => {
          return item.department_serial === value;
        });
      },
      //提交调动
      submit1(){
        var userData = qs.parse(sessionStorage.getItem("userData"));
        if (this.us === '') {
          this.$message({
            message: '班级不能为空',
            showClose: true,
            type: 'warning'
          });
        } else {
          var coachData = {
            dep_parent_serial: this.uc,
            dep_parent_name: this.obj1.department_name,
            department_serial: this.us,
            department_name: this.obj.department_name,
            student_serial: this.id,
            regserial: userData.company_serial,
            permissions_id: userData.permissions_id
          }
          var params = {
            methodUrl: 'courseManagement/memberClickMove',
            jsonParam: qs.stringify(coachData)

          }
          this.dialogVisible4 = false
          var coachParams = qs.parse(qs.stringify(coachData));
          var that = this
          this.$axios.postRequest(params).then(function (res) {
            //成功之后处理逻辑
            that.find()
          }, function (res) {
            //失败之后处理逻辑
            console.log("error:" + res)
          })

        }
      },
      //续费获取数据
      renew(){
        if (this.multipleSelection.length < 1) {
          this.$message({
            message: '请选择续费人员',
            showClose: true,
            type: 'warning'
          });
          this.dialogVisible4 = false
        } else if (this.multipleSelection.length > 1) {
          this.$message({
            message: '只能选择一名人员',
            showClose: true,
            type: 'warning'
          });
          this.renewDialog = false
        } else {

          this.serial=this.multipleSelection[0].student_serial
          this.xfcard = this.multipleSelection[0].membertype_id
          this.xfcourse = this.multipleSelection[0].course_id
          this.mustMoney =this.multipleSelection[0].course_price
          this.adminName=this.multipleSelection[0].fillPerson
          this.renewDialog = true


        }

      },
      //续费提交数据
      submitreNew(){
        var that=this
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var renewData={
          lx:'1',
          student_serial:this.serial,
          memberType_id:this.xfcard,
          courser_id:this.xfcourse,
          realPayment:this.sjMoney,
          fillPerson_serial:this.adminName,
          regSerial:userData.company_serial

        }
        var renewParams={
          methodUrl: 'memberManagement/memberRenew',
          jsonParam: qs.stringify(renewData)
        }
        this.$axios.postRequest(renewParams).then(function (res) {
          //成功之后处理逻辑
          that.renewDialog=false
          that.find()


        }, function (res) {
          //失败之后处理逻辑
          console.log("error:")
        })
      }
    },
    mounted(){
      var that = this;
      var userData = qs.parse(sessionStorage.getItem("userData"));
      var department = "";
      if (this.value3 !== '' && this.value4 === '') {
        department = this.value3
      } else if (this.value4 !== '') {
        department = this.value4
      }
      //加载会员信息
      this.find();
      //加载来源信息
      var companyData = {
        regserial: userData.company_serial,
        permissions_id: userData.permissions_id
      }
      var mustParams = {
        methodUrl: 'memberManagement/memberSource',
        jsonParam: qs.stringify(companyData)
      }
      this.$axios.postRequest(mustParams).then(function (res) {
        //成功之后处理逻辑
        that.source = res.data


      }, function (res) {
        //失败之后处理逻辑
        console.log("error:")
      })

      //加载卡类型
      var cardParams = {
        methodUrl: 'memberManagement/memberCard',
        jsonParam: qs.stringify(companyData)
      }
      this.$axios.postRequest(cardParams).then(function (res) {
        //成功之后处理逻辑
        that.cardType = res.data
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })

      //加载道馆信息
      var roomData = {
        dep_lx: '1',
        regserial: userData.company_serial,
        permissions_id: userData.permissions_id
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

        dep_lx: '2',
        department_serial: this.value3,
        regserial: userData.company_serial,
        permissions_id: userData.permissions_id
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

      //加载教练信息
      var coachData = {
        regserial: userData.company_serial,
        department_serial: department,
        role_id: '102'
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

      //加载老师信息
      var teacherData = {
        regserial: userData.company_serial,
        department_serial: department,
        role_id: '103',
      }
      var teacherParams = {
        methodUrl: 'memberManagement/memberTeacher',
        jsonParam: qs.stringify(teacherData)
      }
      this.$axios.postRequest(teacherParams).then(function (res) {
        //成功之后处理逻辑
        that.teachers = res.data
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })
      //加载级别信息
      var levelData = {
        regserial: userData.company_serial,
      }
      var levelParams = {
        methodUrl: 'memberManagement/memberLevel',
        jsonParam: qs.stringify(levelData)
      }
      this.$axios.postRequest(levelParams).then(function (res) {
        //成功之后处理逻辑
        that.levels = res.data
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

      //加载课程信息
      var courseInfoData = {
        company_serial : userData.company_serial,
      }
      var courseInfoParams = {
        methodUrl: 'memberManagement/memberCourseInfo',
        jsonParam: qs.stringify(courseInfoData)
      }
      this.$axios.postRequest(courseInfoParams).then(function (res) {
        that.courseInfo = res.data
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })
      //加载开票人信息
      var coachData = {
        regserial: userData.company_serial,
        department_serial: department,
        role_id: '105'
      }
      var coachParams = {
        methodUrl: 'memberManagement/memberTeacher',
        jsonParam: qs.stringify(coachData)
      }
      this.$axios.postRequest(coachParams).then(function (res) {
        //成功之后处理逻辑
        that.drawer = res.data
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })
    }
  }
</script>
<style scoped>
  .basicData {
    padding: 5px;
  }
  .avatar-uploader {
    border: 1px solid #c1c3c9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100%;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 12px;
    color: #8c939d;
    width: 89px;
    height: 160px;
    line-height: 160px;
    text-align: center;
  }

  .avatar {
    width: 89px;
    /*height: 160px;*/
    display: block;
  }

  h6 {
    margin-left: 15px
  }
  .size {
    font-size: 12px;
    color: #101010;
    margin-right: 5px;

  }
  /*下拉选*/
  .pullDown ul {
    float: left;
    line-height: 20px;
    margin: 0 0 10px 0;
  }
  .pullDown>ul>div{
    margin-right: 5px;
  }
  /*按钮*/
  .tanchu ul {
    float: left;
  }

  .studentInfo ul {
    margin: 10px 0;
  }

  .el-form-item > label {
    font-size: 2px;
  }

  .el-dialog__body {
    font-size: 1px;
  }
  .memberDetail{
    width: 135px;
    height:20px;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
    font-size: 12px;
  }

</style>
