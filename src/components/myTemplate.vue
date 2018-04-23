<template>
  <el-row>
        <el-table
          :data="personTemplate"
          border
          tooltip-effect="dark"
          size="mini"
          style="width: 100% ;"
          :headerCellStyle="headerSetStyle"
          :cellStyle="cellSetStyle"
          class="elTableBorder">
          <el-table-column
            align="center"
            prop="title"
            label="标题"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="content"
            label="模板内容"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="example"
            label="模板示例"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="template_id"
            label="模板ID"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="property_type"
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="openDetails(scope.$index, scope.row)">编辑</el-button>
            </template>
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
    <!--编辑房源消息模板弹框开始-->
    <el-dialog
      title="发送模板消息"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="addBargainDialog"
      width="900px"
      @close="clearFormData('bargainForm')"
    >
      <el-form :model="bargainForm" :rules="rules" ref="bargainForm" :show-message="false">
        <fieldset style="border: 1px solid #c1c3c9;">
          <legend style="font-weight: 600">活动信息</legend>
          <div class="basicData">
            <el-row type="flex" justify="center">
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <!--房源-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="房源" prop="name" labelWidth="75px">
                      <el-input v-model="bargainForm.name" placeholder="东京都2室1厅精装" size="mini" style="width:320px" clearable>
                      </el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--原价-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="面积" prop="area" labelWidth="75px">
                      <el-input v-model="bargainForm.area" placeholder="例:100" size="mini" style="width:320px" clearable></el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--目标价-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="售价" prop="targetPrice" labelWidth="75px">
                      <el-input v-model="bargainForm.targetPrice" placeholder="例:0" size="mini" style="width:320px" clearable></el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--目标人数-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="户型" prop="houseType" labelWidth="75px">
                      <el-input v-model="bargainForm.houseType" placeholder="例:0" size="mini" style="width:320px" clearable></el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--库存-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="朝向" prop="direction" labelWidth="75px">
                      <el-input v-model="bargainForm.direction" placeholder="例:15" size="mini" style="width:320px" clearable></el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
              </el-col>
            </el-row>
          </div><!--基础资料-->
        </fieldset>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button size="mini" @click="addBargainDialog = false" class="dialogCancelButton">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitNonmembet('bargainForm')">发送</el-button>
      </div>
    </el-dialog>
    <!--编辑房源消息模板弹框结束-->
    <!--编辑砍价消息模板弹框开始-->
    <el-dialog
      title="发送模板消息"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="addBargainDialog1"
      width="900px"
      @close="clearFormData1('bargainForm1')"
    >
      <el-form :model="bargainForm1" :rules="rules1" ref="bargainForm1" :show-message="false">
        <fieldset style="border: 1px solid #c1c3c9;">
          <legend style="font-weight: 600">活动信息</legend>
          <div class="basicData">
            <el-row type="flex" justify="center">
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <!--房源-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="商品名称" prop="name" labelWidth="75px">
                      <el-input v-model="bargainForm1.name" placeholder="0元得商品" size="mini" style="width:320px" clearable>
                      </el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--原价-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="砍价金额" prop="price" labelWidth="75px">
                      <el-input v-model="bargainForm1.price" placeholder="例:100" size="mini" style="width:320px" clearable></el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--目标价-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="砍掉价格" prop="downPrice" labelWidth="75px">
                      <el-input v-model="bargainForm1.downPrice" placeholder="例:10" size="mini" style="width:320px" clearable></el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--目标人数-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="砍价状态" prop="statues" labelWidth="75px">
                      <el-input v-model="bargainForm1.statues" placeholder="例:进行中" size="mini" style="width:320px" clearable></el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--库存-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="微信提示" prop="prompt" labelWidth="75px">
                      <el-input v-model="bargainForm1.prompt" placeholder="例邀请好友来砍价吧" size="mini" style="width:320px" clearable></el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
              </el-col>
            </el-row>
          </div><!--基础资料-->
        </fieldset>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button size="mini" @click="addBargainDialog1 = false" class="dialogCancelButton">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitNonmembet1('bargainForm1')">发送</el-button>
      </div>
    </el-dialog>
    <!--编辑砍价消息模板弹框结束-->
  </el-row>

</template>

<script>
  import axios from "axios";
  import qs from "qs";
    export default {
      data(){
        return{
          templateIdInfo:'',
          templateId:'',
          infoList:[],
          addBargainDialog:false,
          addBargainDialog1:false,
          //砍价活动信息
          bargainForm: {
            name: '',
            area: '',
            targetPrice: '',
            houseType:'',
            direction: '',
          },
          //砍价活动信息
          bargainForm1: {
            name: '',
            price: '',
            downPrice: '',
            statues:'',
            prompt: '',
          },
          rules: {
            name: [
              {required: true, message: '请输入房源', trigger: 'blur'}
            ],
            area: [
              {required: true, message: '请输入面积', trigger: 'blur'},
              {pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/, trigger: 'blur'}
            ],
            targetPrice: [
              {required: true, message: '请输入价格', trigger: 'blur'},
              {pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/, trigger: 'blur'}
            ],
            houseType: [
              {required: true, message: '请填写户型', trigger: 'blur'},
            ],
            direction: [
              {required: true, message: '填写朝向', trigger: 'blur'},
            ],
          },
          rules1: {
            name: [
              {required: true, message: '请输入名称', trigger: 'blur'}
            ],
            price: [
              {required: true, message: '请输入金额', trigger: 'blur'},
              {pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/, trigger: 'blur'}
            ],
            downPrice: [
              {required: true, message: '请输入砍掉价格', trigger: 'blur'},
              {pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/, trigger: 'blur'}
            ],
            statues: [
              {required: true, message: '请填写砍价状态', trigger: 'blur'},
            ],
            prompt: [
              {required: true, message: '填写温馨提示', trigger: 'blur'},
            ],
          },
          //个人模板信息列表
          personTemplate:[],
          //tabs页默认展示
          activeName: 'first',
          //分页字段
          total:0,
          currentPage:1,
          pageSize:20,
        }
      },
       methods:{
         //获取消息弹框
         openDetails(index,row){
           if(index==0){
             var that=this
             that.templateId=row.template_id
             this.addBargainDialog=true
           }else {
             var that=this
             that.templateIdInfo=row.template_id
             this.addBargainDialog1=true
           }

         },
         //发送模板信息
         submitNonmembet(formName) {
           var that = this
           this.$refs[formName].validate((valid) => {
             var that=this
             if (valid) {
               var that = this
               var keyword1={
                 value:that.bargainForm.name,
                 color: '#173177'
               }
               var keyword2={
                 value:that.bargainForm.area,
                 color: '#173177'
               }
               var keyword3={
                 value:that.bargainForm.targetPrice,
                 color: '#173177'
               }
               var keyword4={
                 value:that.bargainForm.houseType,
                 color: '#173177'
               }
               var keyword5={
                 value:that.bargainForm.direction,
                 color: '#173177'
               }
               var data = {
                 keyword1:keyword1,
                 keyword2:keyword2,
                 keyword3:keyword3,
                 keyword4:keyword4,
                 keyword5:keyword5
               }
               var templateData={
                 template_id:that.templateId,
                 dataMap:qs.stringify(data)
               }
               var templateParams = {
                 methodUrl: "bitHouse/bitHouseSendMessage",
                 jsonParam: qs.stringify(templateData)
               };
               this.$axios.postRequest(templateParams).then(
                 function (res) {
                   //成功之后处理逻辑
                   this.$message({
                     message: '发送成功',
                     showClose: true,
                     type: 'success'
                   });
                   that.addBargainDialog=false
                 },
                 function (res) {
                   //失败之后处理逻辑
                   console.log("error:" + res);
                 }
               );
             } else {
               this.$message({
                 message: '您有未填写的信息!',
                 showClose: true,
                 type: 'warning'
               });
               that.addBargainDialog = true;
             }
           });
         },
         //发送模板信息
         submitNonmembet1(formName) {
           var that = this
           this.$refs[formName].validate((valid) => {
             var that=this
             if (valid) {
               var that = this
               var keyword1={
                 value:that.bargainForm1.name,
                 color: '#173177'
               }
               var keyword2={
                 value:that.bargainForm1.price,
                 color: '#173177'
               }
               var keyword3={
                 value:that.bargainForm1.downPrice,
                 color: '#173177'
               }
               var keyword4={
                 value:that.bargainForm1.statues,
                 color: '#173177'
               }
               var keyword5={
                 value:that.bargainForm1.prompt,
                 color: '#173177'
               }
               // var data = {
               //   keyword1:qs.stringify(keyword1),
               //   keyword2:qs.stringify(keyword2),
               //   keyword3:qs.stringify(keyword3),
               //   keyword4:qs.stringify(keyword4),
               //   keyword5:qs.stringify(keyword5)
               // }
               var data = {
                 keyword1:keyword1,
                 keyword2:keyword2,
                 keyword3:keyword3,
                 keyword4:keyword4,
                 keyword5:keyword5
               }

               var templateData={
                 template_id:that.templateIdInfo,
                 dataMap:qs.stringify(data)
               }
               console.log(templateData);

               var templateParams = {
                 methodUrl: "bitHouse/bitHouseSendMessage",
                 jsonParam: qs.stringify(templateData)
               };
               console.log(templateParams);

               this.$axios.postRequest(templateParams).then(
                 function (res) {
                   //成功之后处理逻辑
                   this.$message({
                     message: '发送成功',
                     showClose: true,
                     type: 'success'
                   });
                   that.addBargainDialog1=false
                 },
                 function (res) {
                   //失败之后处理逻辑
                   console.log("error:" + res);
                 }
               );
             } else {
               this.$message({
                 message: '您有未填写的信息!',
                 showClose: true,
                 type: 'warning'
               });
               that.addBargainDialog1 = true;
             }
           });
         },
         clearFormData(formName) {
           this.$refs[formName].resetFields();
         },
         clearFormData1(formName) {
           this.$refs[formName].resetFields();
         },

         handleClick(tab, event) {
           console.log(tab, event);
         },
         //表头样式
         headerSetStyle(){
           return {
             "background-color": "#e5e5e5",
             "color": "#303133",
             "border-color": "#c1c3c9",
             "font-size":"12px"
           }
         },
         //表格样式
         cellSetStyle(){
           return {
             "color": "#303133",
             "border-color": "#c1c3c9",
             "font-size":"12px"
           }
         },
         //分页
         handleSizeChange(val) {
           this.pageSize = val
           this.queryRooms()
         },
         handleCurrentChange(val) {
           this.currentPage = val
           this.queryRooms()
         },
       },
      mounted(){
        var that=this
        var templateData={

        }
        var templateParams={
          methodUrl: 'bitHouse/bitHouseGetMessage',
          jsonParam: qs.stringify(templateData)
        }
        this.$axios.postRequest(templateParams).then(function (res) {
          //成功之后处理逻辑
          that.personTemplate = res.list
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      }
    }
</script>
<style scoped>
  ul {
    float: left;
    margin: 10px 0 10px 0;
  }
</style>
