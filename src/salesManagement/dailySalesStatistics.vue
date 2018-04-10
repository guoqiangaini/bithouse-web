<template>
  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="销售统计" name="first">
      <!--条件查询开始-->
      <el-row class="wai">
        <!--姓名-->
        <ul>
          <span class="size">姓名</span>
          <el-input v-model="name" placeholder="单行输入" size="mini" style="width: 90px" clearable>
          </el-input>
        </ul>
        <!--卡型-->
        <ul>
          <span class="size">卡型</span>
          <el-select v-model="cardTypeName" clearable placeholder="全部" size="mini" style="width:140px">
            <el-option
              v-for="item in cardType"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </ul>
        <!--时间段-->
        <ul>
          <span class="size">时间段</span>
          <el-date-picker
            clearable
            :editable="false"
            v-model="timeScope"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            :default-data="['2018-03-12']">
          </el-date-picker>
        </ul>
        <!--业绩归属人-->
        <ul >
          <span class="size">业绩归属人</span>
          <el-select v-model="belonger" clearable placeholder="全部" size="mini" style="width: 90px">
            <el-option
              v-for="item in belongers"
              :key="item.employee_serial"
              :label="item.employee_name"
              :value="item.employee_serial" >
            </el-option>
          </el-select>
        </ul>
        <!--状态-->
        <ul>
          <span class="size">状态</span>
          <el-select v-model="state" clearable placeholder="全部" size="mini" style="width: 90px">
            <el-option
              v-for="item in statuses"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </ul>

      </el-row>
      <!--条件查询结束-->
      <el-row class="wai">
        <!--功能按钮-->
        <ul >
          <el-button size="mini"  type="info" @click="querySalesInfo">查询</el-button>
          <el-button size="mini"  type="info" @click="addNonmember">新增非会员</el-button>
          <el-button size="mini"  type="info" @click="collectionDialog=true">收款</el-button>
          <el-button size="mini"  type="info" @click="expenseDialogVisible=true">其它费用</el-button>
          <el-button size="mini"  type="info" @click="deleteSalesInfo">删除</el-button>
          <el-button size="mini" type="info" @click="">导出</el-button>
        </ul>
      </el-row>
      <!--新增销售课程弹框开始-->
      <el-dialog
        :title="dialogTitle"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :visible.sync="addSalesCourseDialog"
        width="900px"
        center>
        <el-form :model="salesForm" rules="rules" ref="salesForm">
          <fieldset style="border: 1px solid #c1c3c9;">
            <legend style="font-weight: 600">基础资料</legend>
            <div class="basicData">
              <el-row type="flex" justify="center">
                <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                  <!--来源,卡型-->
                  <el-row>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" >
                      <el-form-item label="来　　源" prop="studentSource" labelWidth="75px">
                        <el-select v-model="salesForm.studentSource" placeholder="请选择" clearable size="mini" style="width: 250px;height:30px">
                          <el-option
                            v-for="item in source"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col><!--来源-->
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"  >
                      <el-form-item label='卡　　型' prop="cardModel" style="text-indent: 1px;" labelWidth="75px">
                        <el-select v-model="salesForm.cardModel" clearable placeholder="请选择" size="mini" style="width:250px">
                          <el-option
                            v-for="item in cardType"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col><!--卡型-->
                  </el-row>
                  <!--姓名,性别-->
                  <el-row >
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                      <el-form-item label="会员姓名" prop="studentName" labelWidth="75px">
                        <el-input v-model="salesForm.studentName" placeholder="" size="mini" style="width:250px" clearable></el-input>
                      </el-form-item>
                    </el-col><!--姓名-->
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                      <el-form-item label="性　　别" prop="sex" labelWidth="75px">
                        <el-select v-model="salesForm.sex" placeholder="请选择" size="mini" style="width:250px" clearable>
                          <el-option
                            v-for="item in genders"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col><!--性别-->
                  </el-row>
                  <!--联系方式,班级-->
                  <el-row >
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                      <el-form-item label="联系方式" prop="contact" label-width="75px">
                        <el-input v-model="salesForm.contact" clearable placeholder="" size="mini" style="width:250px"></el-input>
                      </el-form-item>
                    </el-col><!--联系方式-->
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                      <el-form-item label="班　　级" prop="clazz" label-width="75px">
                        <el-select v-model="salesForm.clazz" placeholder="请选择" size="mini" style="width:250px">
                          <el-option
                            v-for="item in classes"
                            :key="item.department_serial"
                            :label="item.department_name"
                            :value="item.department_serial">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col><!--班级-->
                  </el-row>
                  <!--教练,业绩归属人-->
                  <el-row>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                      <el-form-item label="教　　练" prop="coach" label-width="75px">
                        <el-select v-model="salesForm.coach" placeholder="请选择" size="mini" style="width:250px">
                          <el-option
                            v-for="item in coachs"
                            :key="item.employee_serial"
                            :label="item.employee_name"
                            :value="item.employee_serial">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col><!--教练-->
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                      <el-form-item label="业绩归属" prop="belonger" label-width="75px">
                        <el-select v-model="salesForm.belonger" clearable placeholder="请选择" size="mini" style="width:250px">
                          <el-option
                            v-for="item in belongers"
                            :key="item.employee_serial"
                            :label="item.employee_name"
                            :value="item.employee_serial">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col><!--老师-->
                  </el-row>
                  <!--操作按钮-->
                  <el-row style="text-align: center;margin:30px 0">
                    <el-button type="info" size="mini" @click="addSalesCourseDialog = false">取 消</el-button>
                    <el-button type="info" size="mini" @click="submitNonmembet(1)">提交</el-button>
                    <el-button type="info" size="mini" @click="submitNonmembet(2)">继续添加</el-button>
                  </el-row>
                </el-col>
              </el-row>
            </div><!--基础资料-->
          </fieldset>
        </el-form>
      </el-dialog>
      <!--新增销售课程弹框结束-->
      <!--其他费用弹框-->
      <el-dialog
        title=""
        :visible.sync="expenseDialogVisible"
        width="30%"
        :before-close="handleClose"
        center>
         <el-form :model="expenseRruleForm" :rules="rules" ref="expenseRruleForm" style="margin-top:15px">
           <el-form-item label="收　　支:" prop="style" labelWidth="75px">
             <el-select v-model="expenseRruleForm.style" placeholder="请选择收支"  size="mini" style="width:450px">
               <el-option label="收入" value="1"></el-option>
               <el-option label="支出" value="2"></el-option>
             </el-select>
            </el-form-item>
           <el-form-item label="费用名称:" prop="costName" labelWidth="75px">
             <el-select v-model="expenseRruleForm.costName" placeholder="请选择收支"  size="mini" style="width:450px">
               <el-option label="房租" value="1"></el-option>
               <el-option label="水费" value="2"></el-option>
             </el-select>
           </el-form-item>
           <el-form-item label="费用数量:" prop="count" labelWidth="75px">
             <el-input v-model="expenseRruleForm.count"  size="mini" placeholder="单行输入" style="width:450px"></el-input>
           </el-form-item>
           <el-form-item label="费用金额:" prop="amount" labelWidth="75px">
             <el-input v-model="expenseRruleForm.amount"  size="mini"placeholder="单行输入" style="width:450px"></el-input>
           </el-form-item>
         </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button type="info" size="mini"   @click="expenseDialogVisible = false">取 消</el-button>
        <el-button type="info" size="mini"   @click="expenseDialogVisible = false">提交</el-button>
        <el-button type="info" size="mini"   @click="expenseDialogVisible = false">继续添加</el-button>
  </span>
      </el-dialog>
      <!--收费弹框-->
      <el-dialog
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :visible.sync="collectionDialog"
         width="900"
        >
        <div slot="title">
          <el-row>
            <div style="float: right">
              <el-button size="mini" type="info">保存并打印</el-button>
              <el-button size="mini" type="info" @click="collectionDialog=false">关闭</el-button>
            </div>
          </el-row>
          <el-row>
            新桥馆销售专用收据
            <hr />
            <hr />
          </el-row>
        </div>
        <el-row style="margin:15px 0">
          <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
            <div>交款人姓名:</div>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <div>班级：</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <div>交款日期：
              <el-date-picker
                v-model="paymentDate"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                size="mini"
                style="width:140px"
                clearable>
              </el-date-picker>
            </div>
          </el-col>
          <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
            <div>状态：
              <el-select v-model="paymentStatusId" placeholder="请选择" size="mini" style="width: 120px" clearable>
                <el-option
                  v-for="item in paymentStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <div>凭证编号:</div>
          </el-col>
        </el-row>
        <el-row>
          <el-table
          :data="tableData3"
          style="width: 100%"
          size="mini"
          border
          :headerCellStyle="headerSetStyle"
          :cellStyle="cellSetStyle"
        >
          <el-table-column
            prop="introduce"
            label="摘要"
            align="center"
            width="265"
            >
          </el-table-column>
          <el-table-column
            prop="number"
            label="数量"
            align="center"
            width="100"
            >
          </el-table-column>
          <el-table-column label="金额" align="center">
              <el-table-column
                prop="province"
                label="亿"
                align="center"
                width="50"
                >
              </el-table-column>
              <el-table-column
                prop="city"
                label="千"
                align="center"
                width="50"
                >
              </el-table-column>
              <el-table-column
                prop="address"
                label="百"
                align="center"
                width="50"
                >
              </el-table-column>
              <el-table-column
                prop="zip"
                label="十"
                align="center"
                width="50"
                >
              </el-table-column>
              <el-table-column
                prop="zip"
                label="万"
                align="center"
                width="50"
               >
              </el-table-column>
              <el-table-column
                prop="zip"
                label="千"
                align="center"
                width="50"
                >
              </el-table-column>
              <el-table-column
                prop="zip"
                align="center"
                label="百"
                width="50"
                >
              </el-table-column>
              <el-table-column
                prop="zip"
                label="十"
                align="center"
                width="50"
                >
              </el-table-column>
              <el-table-column
                prop="zip"
                label="元"
                align="center"
                width="50"
                >
              </el-table-column>
              <el-table-column
                prop="zip"
                label="角"
                align="center"
                width="50"
                >
              </el-table-column>
              <el-table-column
                prop="zip"
                label="分"
                align="center"
                width="50"
                >
              </el-table-column>
            </el-table-column>
        </el-table>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <div>收款方（盖章）</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <div>开票人：</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <div>收款人：</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <div>收款方式：
              <el-select v-model="paymentId" placeholder="请选择" size="mini" style="width: 120px" clearable>
                  <el-option
                    v-for="item in paymentMethod"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </el-dialog>
      <!--表格内容加载-->
      <el-table
        ref="multipleTable"
        :data="salesInfoList"
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
          prop="jdate"
          align="center"
          label="日期"
          width="140">
        </el-table-column>
        <el-table-column
          prop="dep_parent_name"
          align="center"
          label="道馆"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="来源"
          width="120"
          >
        </el-table-column>
          <el-table-column
            prop="student_name"
            align="center"
            label="姓名"
            width="80">
          </el-table-column>
        <el-table-column
          prop="sex"
          align="center"
          label="性别"
          width="60">
        </el-table-column>
        <el-table-column
          prop="jquestionName"
          align="center"
          label="年龄"
          width="60">
        </el-table-column>
        <el-table-column
          prop="student_phone"
          align="center"
          label="联系方式"
          width="160">
        </el-table-column>
        <el-table-column
          prop="membertype_name"
          align="center"
          label="卡型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="department_name"
          align="center"
          label="班级"
          width="120">
        </el-table-column>
        <el-table-column
          prop="coachName"
          align="center"
          label="教练"
          width="120">
        </el-table-column>
        <el-table-column
          prop="salesManagerName"
          align="center"
          label="业绩归属人">
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
    <el-tab-pane label="销售单" name="second">
      <!--条件查询开始-->
      <el-row class="wai">
        <!--来源-->
        <ul>
          <span class="size">来源</span>
          <el-select v-model="studentSource" clearable placeholder="全部" size="mini" style="width: 90px">
            <el-option
              v-for="item in source"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </ul>
        <!--凭证编号-->
        <ul>
          <span class="size">凭证编号</span>
          <el-input v-model="roofNumber" placeholder="单行输入" size="mini" style="width: 90px">
          </el-input>
        </ul>
        <!--卡型-->
        <ul>
          <span class="size">卡型</span>
          <el-select v-model="secondCardTypeName" clearable placeholder="全部" size="mini" style="width: 90px">
            <el-option
              v-for="item in cardType"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </ul>
        <!--时间段-->
        <ul>
          <span class="size">时间段</span>
          <el-date-picker
            :editable="false"
            v-model="secondTimeScope"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            :default-data="['2018-03-12']">
          </el-date-picker>
        </ul>
        <!--业绩归属人-->
        <ul >
          <span class="size">业绩归属人</span>
          <el-select v-model="secondBelonger" clearable placeholder="全部" size="mini" style="width: 90px">
            <el-option
              v-for="item in levels"
              :key="item.id"
              :label="item.name"
              :value="item.id" >
            </el-option>
          </el-select>
        </ul>
        <ul>
          <el-button size="mini"  type="info" @click="">查询</el-button>
          <el-button size="mini"  type="info" @click="">备注</el-button>
          <el-button size="mini" type="info" @click="">导出</el-button>
        </ul>
      </el-row>
      <!--条件查询结束-->
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
          label="日期"
          width="140">
        </el-table-column>
        <el-table-column
          prop="jquestionName"
          align="center"
          label="凭证编号">
        </el-table-column>
        <el-table-column
          prop="jdate"
          align="center"
          label="来源"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="jdate"
          align="center"
          label="卡型"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="jdate"
          align="center"
          label="业绩归属人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="jdate"
          align="center"
          label="金额"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="jdate"
          align="center"
          label="收据"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="jdate"
          align="center"
          label="支付方式"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="jdate"
          align="center"
          label="状态"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="jdate"
          align="center"
          label="备注"
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
    <el-tab-pane label="业绩日报表" name="third">
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
        tableData3: [{
          introduce: '新报-1年年卡1',
          number: '1',
          province: '',
          city: '',
          address: '',
          zip: 0
        },{
          date: '新报-1年年卡1',
        name: '1',
        province: '',
        city: '',
        address: '',
        zip: 0
    }
          ],
        //弹出框标题
        dialogTitle:'',
        //数据条数
        total: 0,
        //默认一页条数
        pageSize: 20,
        //默认页码
        currentPage: 1,
        addSalesCourseDialog: false,
        expenseDialogVisible:false,
        collectionDialog:false,
        activeName2: "first",
        multipleSelection: [],
        //销售统计删选字段
        name:'',//查询条件姓名
        cardTypeName:'',//查询条件卡类型
        timeScope:'',//查询条件时间段
        belonger:'',//业绩归属人
        belongers:'',//请求的业绩归属人集合
        state:'',//状态
        //销售单删选字段
        studentSource:'',
        roofNumber:'',
        secondCardTypeName:'',
        secondTimeScope:'',
        secondBelonger:'',
        salesInfoList:[],//销售信息返回数据
        cardType:[],//获取的卡类型
        source:[],//获取来源
        coachs:[],//获取教练
        classes:[],//获取班级
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
        //新增销售课程表单
        salesForm: {
          studentSource: '',
          cardModel: '',
          studentName: '',
          sex: '',
          contact:'',
          clazz: '',
          coach: '',
          belonger: ''
        },
        //其他费用表单
        expenseRruleForm:{
          style:'',
          costName:'',
          count:'',
          amount:''
        },
        paymentMethod:[
          {
            value:'1',
            label:'现金'
          },
          {
            value:'2',
            label:'刷卡'
          },
          {
            value:'3',
            label:'支付宝'
          },
          {
            value:'4',
            label:'微信'
          },
        ],
        paymentId:'',
        paymentDate:'',
        paymentStatus:[
          {
            value:'1',
            label:'全款'
          },
          {
            value:'2',
            label:'定金'
          },
          {
            value:'3',
            label:'补款'
          },
          {
            value:'4',
            label:'补完款'
          },
        ],
        paymentStatusId:'',
      };
    },
    methods: {
      //获取销售统计信息
      querySalesInfo() {
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var that = this
        var salesInfoData = {
            company_serial: userData.company_serial,
            student_name: this.name,
            membertype_id: this.cardTypeName,
            start_date: this.timeScope[0],
            end_date: this.timeScope[1],
            count: true,
            orderby:'',
            pageindex: 1,
            pagesize: 20,
          }
        var salesInfoParams={
          methodUrl: 'salesManagement/getSalesStatisticsInfo',
          jsonParam: qs.stringify(salesInfoData)
        }
        this.$axios.postRequest(salesInfoParams).then(function (res) {
          //成功之后处理逻辑
          that.salesInfoList = res.data.list
          that.total=res.data.totalcount

        }, function (res) {
          //失败之后处理逻辑
          console.log("error:")
        })

      },
      //删除销售统计信息
      deleteSalesInfo(){

      },
      //添加非会员信息
      addNonmember(){
        this.addSalesCourseDialog=true
      },
      //提交非会员信息
      submitNonmembet(type){
        var that=this
        that. salesInfo=[]
        that.salesInfo.push(
          this.salesForm.studentSource,
          this.salesForm.cardModel,
          this.salesForm.studentName,
          this.salesForm.sex,
          this.salesForm.contact,
          this.salesForm.clazz,
          this.salesForm.coach,
          this.salesForm.belonger
        )
        var userData = qs.parse(sessionStorage.getItem("userData"));
        var updateMemberData = {
          jlx:3,
          jdolx: 1,
          jSerial:userData.studentDepartment_serial,
          jname: this.salesForm.studentName,
          picUrl: '',
          regSerial: userData.company_serial,
          jlog_ip: "",
          jgly_Serial: userData.employee_serial,
          jtext: that.salesInfo.join(",")
        };
        var updateMemberParams = {
          methodUrl: "memberManagement/memberOperation",
          jsonParam: qs.stringify(updateMemberData)
        };
        this.$axios.postRequest(updateMemberParams).then(
          function(res) {
            //成功之后处理逻辑
            if(type==1){
              that.addSalesCourseDialog=false
            }else{
              that.addSalesCourseDialog=true
            }
            that.querySalesInfo();
            that.$refs.salesForm.resetFields()

          },
          function(res) {
            //失败之后处理逻辑
            console.log("error:" + res);
          }
        );
      },
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
      //分页
      handleSizeChange(val) {
        var userData = qs.parse(sessionStorage.getItem("userData"));
        console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.querySalesInfo()
      },
      handleCurrentChange(val) {
        var userData = qs.parse(sessionStorage.getItem("userData"));
        this.currentPage = val
        this.querySalesInfo()
      },

    },
    mounted() {
      this.querySalesInfo()
      var userData = qs.parse(sessionStorage.getItem("userData"));
      var that = this;
      //加载来源
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
      var cardData={
        regserial:userData.company_serial,
      }
      var cardParams = {
        methodUrl: 'memberManagement/memberCard',
        jsonParam: qs.stringify(cardData)
      }
      this.$axios.postRequest(cardParams).then(function (res) {
        //成功之后处理逻辑
        that.cardType = res.data
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
      //加载业绩归属人
      var belongerData={
        studentDepartment_serial:userData.studentDepartment_serial,
        company_serial:userData.company_serial,
      }
      var belongerParams={
        methodUrl: 'salesManagement/getAchievementBelong',
        jsonParam: qs.stringify(belongerData)
      }
      this.$axios.postRequest(belongerParams).then(function (res) {
        //成功之后处理逻辑
        that.belongers = res.data
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })
      //加载班级信息
      var classData = {
        dep_lx: "2",
        department_serial:userData.studentDepartment_serial,
        regserial: userData.company_serial,
        permissions_id: userData.permissions_id
      };
      var classParams = {
        methodUrl: "memberManagement/memberClass",
        jsonParam: qs.stringify(classData)
      };
      this.$axios.postRequest(classParams).then(
        function(res) {
          //成功之后处理逻辑
          that.classes = res.data;
        },
        function(res) {
          //失败之后处理逻辑
          console.log("error:" + res);
        }
      );
      //加载教练信息
      var coachData = {
        regserial: userData.company_serial,
        department_serial: userData.studentDepartment_serial,
        role_id: "102"
      };
      var coachParams = {
        methodUrl: "memberManagement/memberTeacher",
        jsonParam: qs.stringify(coachData)
      };
      this.$axios.postRequest(coachParams).then(
        function(res) {
          //成功之后处理逻辑
          that.coachs = res.data;
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
  .basicData {
    padding: 5px;
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
