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
          <legend style="font-weight: 600">房源信息通知</legend>
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
          <legend style="font-weight: 600">砍价活动信息</legend>
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
                    <el-form-item label="温馨提示" prop="prompt" labelWidth="75px">
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
    <!--活动加入成功提醒消息模板弹框开始-->
    <el-dialog
      title="发送模板消息"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="addBargainDialog2"
      width="900px"
      @close="clearFormData2('bargainForm2')"
    >
      <el-form :model="bargainForm2"  ref="bargainForm2" :show-message="false">
        <fieldset style="border: 1px solid #c1c3c9;">
          <legend style="font-weight: 600">活动加入成功提醒</legend>
          <div class="basicData">
            <el-row type="flex" justify="center">
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <!--房源-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="活动主题" prop="name" labelWidth="75px">
                      <el-input v-model="bargainForm2.name" placeholder="晚上一起去跑步" size="mini" style="width:320px" clearable>
                      </el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--原价-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="活动时间" prop="price" labelWidth="75px">
                      <el-input v-model="bargainForm2.price" placeholder="2017-09-11 18:00" size="mini" style="width:320px" clearable></el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--目标价-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="活动说明" prop="downPrice" labelWidth="75px">
                      <el-input v-model="bargainForm2.downPrice" placeholder="在小区门前的田野上集合" size="mini" style="width:320px" clearable></el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--库存-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="温馨提示" prop="prompt" labelWidth="75px">
                      <el-input v-model="bargainForm2.prompt" placeholder="温馨提示" size="mini" style="width:320px" clearable></el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
              </el-col>
            </el-row>
          </div><!--基础资料-->
        </fieldset>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button size="mini" @click="addBargainDialog2 = false" class="dialogCancelButton">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitNonmembet2('bargainForm2')">发送</el-button>
      </div>
    </el-dialog>
    <!--活动加入成功提醒消息模板弹框结束-->
    <!--商家活动结果消息模板弹框开始-->
    <el-dialog
      title="发送模板消息"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="addBargainDialog3"
      width="900px"
      @close="clearFormData3('bargainForm3')"
    >
      <el-form :model="bargainForm3" ref="bargainForm3" :show-message="false">
        <fieldset style="border: 1px solid #c1c3c9;">
          <legend style="font-weight: 600">商家活动结果通知</legend>
          <div class="basicData">
            <el-row type="flex" justify="center">
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <!--房源-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="活动名称" prop="name" labelWidth="75px">
                      <el-input v-model="bargainForm3.name" placeholder="换购公仔" size="mini" style="width:320px" clearable>
                      </el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--原价-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="奖励名称" prop="price" labelWidth="75px">
                      <el-input v-model="bargainForm3.price" placeholder="公仔" size="mini" style="width:320px" clearable></el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--目标价-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="商家名称" prop="downPrice" labelWidth="75px">
                      <el-input v-model="bargainForm3.downPrice" placeholder="咖啡店" size="mini" style="width:320px" clearable></el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--目标人数-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="活动说明" prop="statues" labelWidth="75px">
                      <el-input v-model="bargainForm3.statues" placeholder="点击参与即可领取" size="mini" style="width:320px" clearable></el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--库存-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="状态" prop="prompt" labelWidth="75px">
                      <el-input v-model="bargainForm3.prompt" placeholder="带待取" size="mini" style="width:320px" clearable></el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
              </el-col>
            </el-row>
          </div><!--基础资料-->
        </fieldset>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button size="mini" @click="addBargainDialog3 = false" class="dialogCancelButton">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitNonmembet3('bargainForm3')">发送</el-button>
      </div>
    </el-dialog>
    <!--商家活动结果消息模板弹框结束-->
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
          templateId1:'',
          templateId2:'',
          infoList:[],
          addBargainDialog:false,
          addBargainDialog1:false,
          addBargainDialog2:false,
          addBargainDialog3:false,
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
          bargainForm2: {
            name: '',
            price: '',
            downPrice: '',
            prompt: '',
          },
          bargainForm3: {
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
             this.addBargainDialog1=true
           }else if(index==1){
             var that=this
             that.templateIdInfo=row.template_id
             this.addBargainDialog=true
           }else if(index==2){
             var that=this
             that.templateId1=row.template_id
             this.addBargainDialog2=true
           }else{
             var that=this
             that.templateId2=row.template_id
             this.addBargainDialog3=true
           }

         },
         //发送房源信息模板信息
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
                 dMap:data
               }
               var templateParams = {
                 methodUrl: "bitHouse/bitHouseSendMessage",
                 jsonParam: qs.stringify(templateData)
               };
               this.$axios.postRequest(templateParams,600000).then(
                 function (res) {
                   //成功之后处理逻辑
                   that.$message({
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
               that.$message({
                 message: '您有未填写的信息!',
                 showClose: true,
                 type: 'warning'
               });
               that.addBargainDialog = true;
             }
           });
         },
         //发送砍价成功模板信息
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
                 dMap:data
               }

               var templateParams = {
                 methodUrl: "bitHouse/bitHouseSendMessage",
                 jsonParam: qs.stringify(templateData)
               };
               console.log(templateParams);

               this.$axios.postRequest(templateParams).then(
                 function (res) {
                   //成功之后处理逻辑
                   that.$message({
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
               that.$message({
                 message: '您有未填写的信息!',
                 showClose: true,
                 type: 'warning'
               });
               that.addBargainDialog1 = true;
             }
           });
         },

         submitNonmembet2(formName) {
           var that = this
           this.$refs[formName].validate((valid) => {
             var that=this
             if (valid) {
               var that = this
               var keyword1={
                 value:that.bargainForm2.name,
                 color: '#173177'
               }
               var keyword2={
                 value:that.bargainForm2.price,
                 color: '#173177'
               }
               var keyword3={
                 value:that.bargainForm2.downPrice,
                 color: '#173177'
               }
               var keyword4={
                 value:that.bargainForm2.prompt,
                 color: '#173177'
               }

               var data = {
                 keyword1:keyword1,
                 keyword2:keyword2,
                 keyword3:keyword3,
                 keyword4:keyword4
               }

               var templateData={
                 template_id:that.templateId1,
                 dMap:data
               }

               var templateParams = {
                 methodUrl: "bitHouse/bitHouseSendMessage",
                 jsonParam: qs.stringify(templateData)
               };
               console.log(templateParams);

               this.$axios.postRequest(templateParams).then(
                 function (res) {
                   //成功之后处理逻辑
                   that.$message({
                     message: '发送成功',
                     showClose: true,
                     type: 'success'
                   });
                   that.addBargainDialog2=false
                 },
                 function (res) {
                   //失败之后处理逻辑
                   console.log("error:" + res);
                 }
               );
             } else {
               that.$message({
                 message: '您有未填写的信息!',
                 showClose: true,
                 type: 'warning'
               });
               that.addBargainDialog2 = true;
             }
           });
         },

         submitNonmembet3(formName) {
           var that = this
           this.$refs[formName].validate((valid) => {
             var that=this
             if (valid) {
               var that = this
               var keyword1={
                 value:that.bargainForm3.name,
                 color: '#173177'
               }
               var keyword2={
                 value:that.bargainForm3.price,
                 color: '#173177'
               }
               var keyword3={
                 value:that.bargainForm3.downPrice,
                 color: '#173177'
               }
               var keyword4={
                 value:that.bargainForm3.statues,
                 color: '#173177'
               }
               var keyword5={
                 value:that.bargainForm3.prompt,
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
                 template_id:that.templateId2,
                 dMap:data
               }

               var templateParams = {
                 methodUrl: "bitHouse/bitHouseSendMessage",
                 jsonParam: qs.stringify(templateData)
               };
               console.log(templateParams);

               this.$axios.postRequest(templateParams).then(
                 function (res) {
                   //成功之后处理逻辑
                   that.$message({
                     message: '发送成功',
                     showClose: true,
                     type: 'success'
                   });
                   that.addBargainDialog3=false
                 },
                 function (res) {
                   //失败之后处理逻辑
                   console.log("error:" + res);
                 }
               );
             } else {
               that.$message({
                 message: '您有未填写的信息!',
                 showClose: true,
                 type: 'warning'
               });
               that.addBargainDialog3 = true;
             }
           });
         },
         clearFormData(formName) {
           this.$refs[formName].resetFields();
         },
         clearFormData1(formName) {
           this.$refs[formName].resetFields();
         },
         clearFormData2(formName) {
           this.$refs[formName].resetFields();
         },
         clearFormData3(formName) {
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
