<template>
  <div>
       <!--绑定客户弹窗开始-->
          <el-dialog
            title="绑定客户"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            @selection-change="handleSelectionChange"
            :visible.sync="customerDialogVisibale"
            width="900px"
            @close="clearFormData('customerForm')"
           >
      <el-form :model="customerForm" :rules="rules" ref="customerForm" label-width="120px" :show-message="false">
        <fieldset style="border: 1px solid #c1c3c9;">
          <legend style="font-weight: 600">客户资料填写</legend>
          <div class="basicData">
            <el-row>
              <!--客户手机-->
              <el-row >
                <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" :offset="6">
                  <el-form-item label="客户手机" prop="customerPhone" >
                    <el-input v-model="customerForm.customerPhone" placeholder="请填写" size="mini" style="width:250px" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--客户名称-->
              <el-row>
                <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" :offset="6">
                  <el-form-item label="客户名称" prop="customerName">
                    <el-input v-model="customerForm.customerName" placeholder="请填写" clearable size="mini" style="width: 250px"></el-input>
                  </el-form-item>
                </el-col><!--客户名称-->
              </el-row>
              <!--客户微信-->
              <el-row >
                <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" :offset="6">
                  <el-form-item label="客户微信" prop="customerWechat">
                    <el-input v-model="customerForm.customerWechat" clearable placeholder="请填写" size="mini" style="width:250px"></el-input>
                  </el-form-item>
                </el-col><!--客户微信-->
              </el-row>
              <!--操作按钮-->
              <el-row style="text-align: center;margin:30px 0">
                <el-button type="info" size="mini" @click="customerDialogVisibale = false">取 消</el-button>
                <el-button type="info" size="mini" @click="submitCustomer">提交</el-button>
              </el-row>
            </el-row>
          </div><!--基础资料-->
        </fieldset>
      </el-form>
    </el-dialog>
      <!--成交信息弹框开始-->
           <el-dialog
        title="添加成交信息"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @selection-change="handleSelectionChange"
        :visible.sync="addSalesCourseDialog"
        width="900px"
        @close="clearFormData('salesForm')"
      >
        <el-form :model="salesForm" :rules="rules" ref="salesForm" label-width="120px">
          <fieldset style="border: 1px solid #c1c3c9;">
            <legend style="font-weight: 600">成交资料填写</legend>
            <div class="basicData">
              <el-row>
                <!--楼盘名称-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" >
                    <el-form-item label="楼盘名称" prop="buildingName">
                      <el-input v-model="salesForm.buildingName" placeholder="请填写" clearable size="mini" style="width: 250px"></el-input>
                    </el-form-item>
                  </el-col><!--楼盘名称-->
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"  >
                    <el-form-item label='楼座号码' prop="balcony" style="text-indent: 1px;" >
                      <el-input v-model="salesForm.balcony" clearable placeholder="请填写" size="mini" style="width:250px"></el-input>
                    </el-form-item>
                  </el-col><!--楼座号码-->
                </el-row>
                <!--单元号码,房间号码-->
                <el-row >
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="单元号码" prop="buildingUnit" >
                      <el-input v-model="salesForm.buildingUnit" placeholder="请填写" size="mini" style="width:250px"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="房间号码" prop="roomNumber" >
                      <el-input v-model="salesForm.roomNumber" placeholder="请填写" size="mini" style="width:250px"></el-input>                        </el-input>
                    </el-form-item>
                  </el-col><!--房间号码-->
                </el-row>
                <!--客户联系方式-->
                <el-row >
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="客户姓名" prop="customerName">
                      <el-input v-model="salesForm.customerName" clearable placeholder="请填写" size="mini" style="width:250px"></el-input>
                    </el-form-item>
                  </el-col><!--客户姓名-->
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="客户联系方式" prop="contact">
                      <el-input v-model="salesForm.contact" placeholder="请填写" size="mini" style="width:250px"></el-input>
                    </el-form-item>
                  </el-col><!--联系方式-->
                </el-row>
                <!--成交价格-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="成交单价" prop="unitPrice">
                      <el-input v-model="salesForm.unitPrice" placeholder="请填写" size="mini" style="width:250px"></el-input>
                    </el-form-item>
                  </el-col><!--单价-->
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="成交总价" prop="totalPrice">
                      <el-input v-model="salesForm.totalPrice" clearable placeholder="请填写" size="mini" style="width:250px"></el-input>
                    </el-form-item>
                  </el-col><!--老师-->
                </el-row>
                <!--成交方式-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="成交方式" prop="payment" >
                      <el-select v-model="salesForm.payment" placeholder="请选择" size="mini" style="width:250px">
                        <el-option label="全款" value="1"></el-option>
                        <el-option label="商贷" value="2"></el-option>
                        <el-option label="公积金贷款" value="3"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col><!--教练-->
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="成交时间" prop="paymentTime">
                      <el-date-picker
                        style="width:250px"
                        size="mini"
                        v-model="salesForm.paymentTime"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col><!--老师-->
                </el-row>
                <!--楼盘联系方式-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="楼盘联系人姓名" prop="buildingContact">
                      <el-input v-model="salesForm.buildingContact" placeholder="请填写" size="mini" style="width:250px"></el-input>
                    </el-form-item>
                  </el-col><!--教练-->
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="楼盘联系人电话" prop="phone">
                      <el-input v-model="salesForm.phone" clearable placeholder="请填写" size="mini" style="width:250px"></el-input>
                    </el-form-item>
                  </el-col><!--老师-->
                </el-row>
                <!--操作按钮-->
                <el-row style="text-align: center;margin:30px 0">
                <el-button type="info" size="mini" @click="addSalesCourseDialog = false">取 消</el-button>
                <el-button type="info" size="mini" @click="submitTransactionInfo">提交</el-button>
                </el-row>
              </el-row>
            </div><!--基础资料-->
          </fieldset>
        </el-form>
      </el-dialog>
      <!--成交信息弹框结束-->
        <el-row class="wai">
          <ul>
            <el-button size="mini"  type="info" @click="bindCustomer">绑定客户</el-button>
          </ul>
        </el-row>
        <!--条件查询结束-->
        <!--表格内容加载-->
        <el-table
          :data="unsettled"
          border
          size="mini"
          header-align="center"
          tooltip-effect="dark"
          style="width: 100%; "
          @selection-change="handleSelectionChange"
          :headerCellStyle="headerSetStyle"
          :cellStyle="cellSetStyle"
          class="elTableBorder">
          <el-table-column
            prop="user_serial"
            align="center"
            label="客户序号"
          >
          </el-table-column>
          <el-table-column
            prop="photo_url"
            align="center"
            label="客户头像"
          >
          </el-table-column>
          <el-table-column
            prop="user_name"
            align="center"
            label="客户姓名"
          >
          </el-table-column>
          <el-table-column
            prop="phone_number"
            align="center"
            label="客户电话"
          >
          </el-table-column>
          <el-table-column
            prop="wechat_no"
            align="center"
            label="客户微信号"
          >
          </el-table-column>
          <el-table-column
            prop="relationship_id"
            align="center"
            label="关系ID"
          >
          </el-table-column>
          <el-table-column
            prop="deal_sum"
            align="center"
            label="成交次数"
          >
          </el-table-column>
          <el-table-column
            prop="deal_sum"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.$index, scope.row)">成交</el-button>
            </template>
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

  </div>
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
        relationshipId:'',
        customSerial:'',
        name:'',
        timeScope:'',
        rules:{
          customerPhone:[
             { required: true, message: '请输入手机号', trigger: 'blur' },
             { min: 11, max:11, message: '长度为11位数字', trigger: 'blur' }
          ]
        },
        unsettled:[],//未成交数组
        traded:[],//已成交数组
        customerForm: {
          customerName: '',
          customerPhone: '',
          customerWechat: '',
        },
        salesForm: {
          buildingName: '',
          balcony: '',
          buildingUnit: '',
          roomNumber: '',
          customerName:'',
          contact: '',
          unitPrice: '',
          totalPrice: '',
          payment:'',
          paymentTime:'',
          buildingContact:'',
          phone:''
        },
        addSalesCourseDialog:false,
        customerDialogVisibale:false,
        activeName: 'first',
        total: 0,
        total1:0,
        //默认一页条数
        pageSize: 20,
        //默认页码
        currentPage: 1,
        multipleSelection: [],
      };
    },
    methods: {
      handleEdit(index, row) {
        this.relationshipId=row.relationship_id
        this.customSerial=row.user_serial
        this.addSalesCourseDialog=true
      },
      //提交成交信息
      submitTransactionInfo(){
        var that=this
          var serviceSerial=qs.parse(sessionStorage.getItem('user'))
          var transactionInfoData={
            relationship_id:this.relationshipId,
            service_serial:serviceSerial.user_serial,
            custom_serial:this.customSerial,
            estate_name:this.salesForm.buildingName,
            building_no:this.salesForm.balcony,
            unit_no:this.salesForm.buildingUnit,
            resource_no:this.salesForm.roomNumber,
            custom_name:this.salesForm.customerName,
            custom_phone:this.salesForm.contact,
            unit_price: this.salesForm. unitPrice ,
            total_price:this.salesForm.totalPrice,
            deal_type:this.salesForm.payment,
            deal_date:this.salesForm. paymentTime,
            service_name:this.salesForm.buildingContact,
            service_phone:this.salesForm. phone,
          }
          var transactionInfoParams={
            methodUrl: 'bitHouse/bitHouseDealCustom',
            jsonParam: qs.stringify(transactionInfoData)
          }
        this.$axios.postRequest(transactionInfoParams).then(function (res) {
          //成功之后处理逻辑
          that.queryCustomerList()
          that.addSalesCourseDialog=false
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      },
      deleteSalesInfo(){
      },
      querySalesInfo(){

      },

      //关闭清空数据
      clearFormData(salesForm) {
        this.$refs[salesForm].resetFields();
      },
      //获取选中的行数
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
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
        this.pageSize = val
        this.queryCustomerList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.queryCustomerList()
      },
      //新增客户打开弹窗
      bindCustomer(){
        this.customerDialogVisibale=true
      },
      submitCustomer(){
        var that =this
        var customer=qs.parse(sessionStorage.getItem((user)))
        var customerData={
          service_serial:customer.user_serial,
          user_name:this.customerForm.customerName,
          phone_number:this.customerForm.customerPhone,
          wechat_no:this.customerForm.customerWechat
        }
        var customerParams={
          methodUrl: 'bitHouse/bitHouseBindCustom',
          jsonParam: qs.stringify(customerData)
        }
        this.$axios.postRequest(customerParams).then(function (res) {
          //成功之后处理逻辑
          that.queryCustomerList()
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      },
      //获取客服客户
      queryCustomerList(){
        var that=this
        var customer=qs.parse(sessionStorage.getItem((user)))
        //获取客服客户列表
        var tradedData = {
          service_serial:customer.user_serial,
          count: true,
          pageindex:this.currentPage,
          pagesize: this.currentPage,
        }
        var tradedParams = {
          methodUrl: 'bitHouse/bitHouseGetBindCustom',
          jsonParam: qs.stringify(tradedData)
        }
        this.$axios.postRequest(tradedParams).then(function (res) {
          //成功之后处理逻辑
          that.unsettled= res.data.list
          that.total=res.data.totalcount
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      }
    },
    mounted() {
      this.queryCustomerList()
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
