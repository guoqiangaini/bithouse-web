<template>
   <div>
     <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
       <!--成交信息弹框开始-->
       <el-dialog
         title="成交信息"
         :close-on-click-modal="false"
         :close-on-press-escape="false"
         @selection-change="handleSelectionChange"
         :visible.sync="addSalesCourseDialog"
         width="900px"
         @close="clearFormData('salesForm')"
       >
         <el-form :model="salesForm" rules="rules" ref="salesForm" label-width="120px">
           <fieldset style="border: 1px solid #c1c3c9;">
             <legend style="font-weight: 600">成交资料</legend>
             <div class="basicData">
               <el-row>
                 <!--楼盘名称-->
                 <el-row>
                   <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" >
                     <el-form-item label="楼盘名称" prop="buildingName">
                       <el-input v-model="salesForm.buildingName" placeholder="请填写" clearable size="mini" style="width: 250px" :disabled="true"></el-input>
                     </el-form-item>
                   </el-col><!--楼盘名称-->
                   <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"  >
                     <el-form-item label='楼座号码' prop="balcony" style="text-indent: 1px;" >
                       <el-input v-model="salesForm.balcony" clearable placeholder="请填写" size="mini" style="width:250px" :disabled="true"></el-input>
                     </el-form-item>
                   </el-col><!--楼座号码-->
                 </el-row>
                 <!--单元号码,房间号码-->
                 <el-row >
                   <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                     <el-form-item label="单元号码" prop="buildingUnit" >
                       <el-input v-model="salesForm.buildingUnit" placeholder="请填写" size="mini" style="width:250px" :disabled="true"></el-input>
                     </el-form-item>
                   </el-col>
                   <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                     <el-form-item label="房间号码" prop="roomNumber" >
                       <el-input v-model="salesForm.roomNumber" placeholder="请填写" size="mini" style="width:250px" :disabled="true"></el-input>                        </el-input>
                     </el-form-item>
                   </el-col><!--房间号码-->
                 </el-row>
                 <!--客户联系方式-->
                 <el-row >
                   <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                     <el-form-item label="客户姓名" prop="customerName">
                       <el-input v-model="salesForm.customerName" clearable placeholder="请填写" size="mini" style="width:250px" :disabled="true"></el-input>
                     </el-form-item>
                   </el-col><!--客户姓名-->
                   <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                     <el-form-item label="客户联系方式" prop="contact">
                       <el-input v-model="salesForm.contact" placeholder="请填写" size="mini" style="width:250px" :disabled="true"></el-input>
                     </el-form-item>
                   </el-col><!--联系方式-->
                 </el-row>
                 <!--成交价格-->
                 <el-row>
                   <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                     <el-form-item label="成交单价" prop="unitPrice">
                       <el-input v-model="salesForm.unitPrice" placeholder="请填写" size="mini" style="width:250px" :disabled="true"></el-input>                         </el-input>
                     </el-form-item>
                   </el-col><!--单价-->
                   <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                     <el-form-item label="成交总价" prop="totalPrice">
                       <el-input v-model="salesForm.totalPrice" clearable placeholder="请填写" size="mini" style="width:250px" :disabled="true"></el-input>
                     </el-form-item>
                   </el-col><!--老师-->
                 </el-row>
                 <!--成交方式-->
                 <el-row>
                   <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                     <el-form-item label="成交方式" prop="payment" >
                       <el-select v-model="salesForm.payment" placeholder="请选择" size="mini" style="width:250px" :disabled="true">
                         <el-option label="全款" value="1"></el-option>
                         <el-option label="商贷" value="2"></el-option>
                         <el-option label="公积金贷款" value="3"></el-option>
                       </el-select>
                     </el-form-item>
                   </el-col><!--教练-->
                   <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                     <el-form-item label="成交时间" prop="paymentTime">
                       <el-date-picker
                         :disabled="true"
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
                       <el-input v-model="salesForm.buildingContact" placeholder="请填写" size="mini" style="width:250px" :disabled="true"></el-input>
                     </el-form-item>
                   </el-col><!--教练-->
                   <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                     <el-form-item label="楼盘联系人电话" prop="phone">
                       <el-input v-model="salesForm.phone" clearable placeholder="请填写" size="mini" style="width:250px" :disabled="true"></el-input>
                     </el-form-item>
                   </el-col><!--老师-->
                 </el-row>
                 <!--&lt;!&ndash;操作按钮&ndash;&gt;-->
                 <!--<el-row style="text-align: center;margin:30px 0">-->
                 <!--<el-button type="info" size="mini" @click="addSalesCourseDialog = false">取 消</el-button>-->
                 <!--<el-button type="info" size="mini" @click="submitNonmembet(1)">提交</el-button>-->
                 <!--</el-row>-->
               </el-row>
             </div><!--基础资料-->
           </fieldset>
         </el-form>
       </el-dialog>
       <!--成交信息弹框结束-->
       <el-tab-pane label="未成交列表" name="first">
         <el-row class="wai">
           <!--姓名-->
           <ul>
             <span class="size">客服</span>
             <el-input v-model="name" placeholder="单行输入" size="mini" style="width: 90px" clearable>
             </el-input>
           </ul>
           <ul >
             <el-button size="mini"  type="info" @click="querySalesInfo">查询</el-button>
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
             prop="service_serial"
             label="客服序号"
             align="center"
           >
           </el-table-column>
           <el-table-column
             prop="service_name"
             align="center"
             label="客服名称"
           >
           </el-table-column>
           <el-table-column
             prop="service_phone"
             align="center"
             label="客服电话"
           >
           </el-table-column>
           <el-table-column
             prop="service_wechat"
             align="center"
             label="客服微信号">
           </el-table-column>
           <el-table-column
             prop="custom_serial"
             align="center"
             label="客户序号"
           >
           </el-table-column>
           <el-table-column
             prop="custom_name"
             align="center"
             label="客户姓名"
           >
           </el-table-column>
           <el-table-column
             prop="custom_phone"
             align="center"
             label="客户电话"
           >
           </el-table-column>
           <el-table-column
             prop="custom_wechat"
             align="center"
             label="客户微信号"
           >
           </el-table-column>
           <el-table-column
             prop="create_date"
             align="center"
             label="建立关系日期"
           >
           </el-table-column>
           <el-table-column
             prop="deal_sum"
             align="center"
             label="成交次数"
           >
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
       <el-tab-pane label="成交列表" name="second">
         <el-row class="wai">
           <!--姓名-->
           <ul>
             <span class="size">客服</span>
             <el-input v-model="name" placeholder="单行输入" size="mini" style="width: 90px" clearable>
             </el-input>
           </ul>
           <ul >
             <el-button size="mini"  type="info" @click="">查询</el-button>
           </ul>
         </el-row>
         <!--条件查询结束-->
         <el-table
           :data="traded"
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
             prop="service_serial"
             label="客服序号"
             align="center"
           >
           </el-table-column>
           <el-table-column
             prop="service_name"
             align="center"
             label="客服名称"
           >
           </el-table-column>
           <el-table-column
             prop="service_phone"
             align="center"
             label="客服电话"
           >
           </el-table-column>
           <el-table-column
             prop="service_wechat"
             align="center"
             label="客服微信号">
           </el-table-column>
           <el-table-column
             prop="custom_serial"
             align="center"
             label="客户序号"
           >
           </el-table-column>
           <el-table-column
             prop="custom_name"
             align="center"
             label="客户姓名"
           >
           </el-table-column>
           <el-table-column
             prop="custom_phone"
             align="center"
             label="客户电话"
           >
           </el-table-column>
           <el-table-column
             prop="custom_wechat"
             align="center"
             label="客户微信号"
           >
           </el-table-column>
           <el-table-column
             prop="create_date"
             align="center"
             label="建立关系日期"
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
                 @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
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
           :total="total1" style="text-align: right;margin-top: 20px">
         </el-pagination>
       </el-tab-pane>
     </el-tabs>
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
        tradedInfo:[],
        name:'',
        timeScope:'',
        //新增销售课程表单
        unsettled:[],//未成交数组
        traded:[],//已成交数组
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
        var that=this
        var relationshipId=row.relationship_id
        var tradedData={
          relationship_id:relationshipId
        }
        var tradedParams={
          methodUrl:'bitHouse/bitHouseGetDealDetail',
          jsonParam: qs.stringify(tradedData)
        }
        this.$axios.postRequest(tradedParams).then(function (res) {
          //成功之后处理逻辑
            that.salesForm.buildingName=res.data[0].estate_name,
            that.salesForm.balcony=res.data[0].building_no,
            that.salesForm.buildingUnit=res.data[0]. unit_no,
            that.salesForm.roomNumber=res.data[0].resource_no,
            that.salesForm.customerName=res.data[0].custom_name,
            that.salesForm.contact=res.data[0].custom_phone,
            that.salesForm. unitPrice=res.data[0].unit_price,
            that.salesForm.totalPrice=res.data[0].total_price,
            that.salesForm.payment=res.data[0].deal_type,
            that.salesForm. paymentTime=res.data[0].deal_date,
            that.salesForm.buildingContact=res.data[0].service_name,
            that.salesForm.phone=res.data[0].service_phone,
          that.addSalesCourseDialog=true

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
        var userData = qs.parse(sessionStorage.getItem("userData"));
        console.log(`每页 ${val} 条`);
        this.pageSize = val
      },
      handleCurrentChange(val) {
        var userData = qs.parse(sessionStorage.getItem("userData"));
        this.currentPage = val
      },
      //tab页切换方法
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //新增成交
      addNonmember(){
        this.addSalesCourseDialog=true
      },
      //获取未成交列表
      noTraded(){
        var that=this
        var tradingStatusData = {
          count: true,
          pageindex: 1,
          pagesize: 20,
          is_deal: '0'
        }
        var tradingStatusParams = {
          methodUrl: 'bitHouse/bitHouseGetDeal',
          jsonParam: qs.stringify(tradingStatusData)
        }
        this.$axios.postRequest(tradingStatusParams).then(function (res) {
          //成功之后处理逻辑
          that.unsettled= res.data.list
          that.total=res.data.totalcount
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
         },
      //获取成交列表
      AllTraded(){
        var that=this
        var tradingStatusData = {
          count: true,
          pageindex: 1,
          pagesize: 20,
          is_deal: '1'
        }
        var tradingStatusParams = {
          methodUrl: 'bitHouse/bitHouseGetDeal',
          jsonParam: qs.stringify(tradingStatusData)
        }
        this.$axios.postRequest(tradingStatusParams).then(function (res) {
          //成功之后处理逻辑
          that.traded= res.data.list
          that.total1=res.data.totalcount
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      }
    },
    mounted() {
       this.noTraded(),
       this.AllTraded()
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
