<template>
  <el-row>
    <ul>
      <el-button size="mini" type="info" @click="addbargainActivity(1)">新增砍价活动</el-button>
      <el-button size="mini" type="info" @click="addbargainActivity(2)">修改砍价活动</el-button>
      <el-button size="mini" type="info" @click="delectbargainActivity">删除砍价活动</el-button>
    </ul>
    <!--新增砍价活动弹框开始-->
    <el-dialog
      :title="dialogTitle"
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
                <!--活动名称-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="活动名称" prop="name" labelWidth="75px">
                      <el-input v-model="bargainForm.name" placeholder="例：0元得蓬莱欧乐宝门票" size="mini" style="width:320px" clearable>
                      </el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--原价-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="原始价格" prop="originPrice" labelWidth="75px">
                      <el-input v-model="bargainForm.originPrice" placeholder="例:100" size="mini" style="width:320px" clearable></el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--目标价-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="目标价格" prop="targetPrice" labelWidth="75px">
                      <el-input v-model="bargainForm.targetPrice" placeholder="例:0" size="mini" style="width:320px" clearable></el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--目标人数-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="目标人数" prop="targetNumber" labelWidth="75px">
                      <el-input v-model="bargainForm.targetNumber" placeholder="例:0" size="mini" style="width:320px" clearable></el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--库存-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="库　　存" prop="inventory" labelWidth="75px">
                      <el-input v-model="bargainForm.inventory" placeholder="例:15" size="mini" style="width:320px" clearable></el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--简介-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="简　　介" prop="prief" labelWidth="75px">
                      <el-input v-model="bargainForm.prief" placeholder=""  type="textarea" size="mini" style="width:320px" clearable></el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--开始时间-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="开始时间" prop="startTime" label-width="75px" size="mini">
                      <el-date-picker
                        style="width:320px"
                        v-model="bargainForm.startTime"
                        type="date"
                        clearable
                        :picker-options="pickerBeginDateBefore"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col><!--教练-->
                </el-row>
                <!--结束时间-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="结束时间" prop="endTime" labelWidth="75px" size="mini">
                      <el-date-picker
                        style="width:320px"
                        v-model="bargainForm.endTime"
                        type="date"
                        clearable
                        :picker-options="pickerBeginDateAfter"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--活动图片-->
                <el-row>
                  <el-col>
                    <el-form-item label="活动图片" label-width="75px">
                      <el-upload
                        class="upload-demo"
                        action="string"
                        :http-request='submitUploadBanner'
                        :show-file-list="true"
                        :on-success="handleAvatarSuccess"
                        :limit="1"
                        :file="pictureCover">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">格式为jpg、png且不超过500kb</div>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div><!--基础资料-->
        </fieldset>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button size="mini" @click="addBargainDialog = false" class="dialogCancelButton">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitNonmembet('bargainForm')">提交</el-button>
      </div>
    </el-dialog>
    <!--新增砍价活动弹框结束-->
    <!--砍价活动列表-->
    <el-table
      ref="multipleTable"
      :data="activityList"
      border
      tooltip-effect="dark"
      size="mini"
      style="width: 100% ;"
      highlight-current-row
      @current-change="handleRowChange"
      :headerCellStyle="headerSetStyle"
      :cellStyle="cellSetStyle"
      >
      <el-table-column
        align="center"
        prop="name"
        label="活动名称"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="origin_price"
        label="原始价格"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="target_price"
        label="目标价格"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="target_number"
        label="目标人数"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="inventory"
        label="库存"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="prief"
        label="简介"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="start_date"
        label="开始时间"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="end_date"
        label="结束时间"
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
            @click="openDetails(scope.$index, scope.row)">查看发起人员</el-button>
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
      :total="total" class="page" style="text-align: right;margin-top: 20px">
    </el-pagination>
  </el-row>
</template>
<script>
  import axios from "axios";
  import qs from "qs";
  export default {
    data() {
      return {
        bargainId:'',
        pickerBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.bargainForm.endTime;
            if (beginDateVal) {
              return time.getTime() >= beginDateVal;
            }
          }
        },
        pickerBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.bargainForm.startTime;
            if (beginDateVal) {
              return time.getTime() <= beginDateVal;
            }
          }
        },
        personInfo:[],
        //第二页总条数
        twoPageTotal:0,
        //分页字段
        total:0,
        currentPage:1,
        pageSize:20,
        activityList: [],
        currentRow: '',
        buttonFlag: '',
        dialogTitle: '',
        // 封面图片
        pictureCover: '',
        addBargainDialog: false,
        //砍价活动信息
        bargainForm: {
          name: '',
          originPrice: '',
          targetPrice: '',
          targetNumber:'',
          inventory: '',
          prief: '',
          startTime: '',
          endTime: '',
        },
        rules: {
          name: [
            {required: true, message: '请输入砍价活动名称', trigger: 'blur'}
          ],
          originPrice: [
            {required: true, message: '请输入原价', trigger: 'blur'},
            {pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/, trigger: 'blur'}
          ],
          targetPrice: [
            {required: true, message: '请输入目标价', trigger: 'blur'},
            {pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/, trigger: 'blur'}
          ],
          targetNumber: [
            {required: true, message: '请输入参与人数', trigger: 'blur'},
            {pattern: /^(1\d{2}|[1-9]\d?|200)$/, trigger: 'blur'}
          ],
          inventory: [
            {required: true, message: '填写库存', trigger: 'blur'},
            {pattern: /^[0-9]*$/, trigger: 'blur'}
          ],
          prief: [
            {required: true, message: '请输入简介', trigger: 'blur'},
          ],
          startTime: [
            {required: true, message: '请输入开始时间', trigger: 'change'},
          ],
          endTime: [
            {required: true, message: '请输入结束时间', trigger: 'change'}
          ]

        }
      };
    },
    methods: {
      //查看发起砍价人员信息
      openDetails(index,row){
        var that = this
        that.bargainId = row.id
        var roomData = {
          bargain_id:this.bargainId,
          is_done:'',
          count: true,
          orderby:'',
          pageindex:this.currentPage,
          pagesize:this.pageSize
        }
        var roomParams = {
          methodUrl: 'bitHouse/bitHouseGetBargainById',
          jsonParam: qs.stringify(roomData)
        }
        this.$axios.postRequest(roomParams).then(function (res) {
          //成功之后处理逻辑
          that.personInfo = res.data.list
          that.twoPageTotal=res.data.totalcount
          that.$router.push({name: 'initiatingPersonnel',params:{personInfo:that.personInfo,bargainId:that.bargainId,twoPageTotal:that.twoPageTotal}})
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })

      },
      clearFormData(formName) {
        this.$refs[formName].resetFields();
        this.pictureCover = '';
      },
      handleRowChange(val) {
        this.currentRow = val;
      },
      formatValue(row, column, cellValue) {
        switch (row.sale_state) {
          case '1':
            return '待售';
            break;
          case '2':
            return '在售';
            break;
          case '2':
            return '售完';
            break;
        }
      },
      //上传图片成功处理函数
      handleAvatarSuccess() {

      },
      //上传图片前处理函数
      //上传图片
      submitUploadBanner(file) {
        this.submitUpload(file, 1)
      },
      //上传图片函数
      submitUpload(file, flag) {
        var that = this
        let param = new FormData(); // 创建 form 对象
        param.append("file", file.file, file.file.name); // 通过 append 向 form 对象添加数据
        let config = {
          headers: {"Content-Type": "multipart/form-data"}
        }; // 添加请求头
        this.$axios
          .postImageRequest(
            "bitHouse/bitHouseUploadImage",
            param,
            config
          )
          .then(response => {
            if (flag == 1) {
              that.pictureCover = response.data.image_url
            }
          });
      },
      //添加砍价活动信息
      addbargainActivity(type) {
        var that = this
        if (type==1) {
          that.dialogTitle = "新增砍价活动";
          that.buttonFlag = "1"
          that.addBargainDialog = true
        }else{
          if (this.currentRow==null || this.currentRow=='') {
            this.$message({
              message: '请选择活动',
              showClose: true,
              type: 'warning'
            })}else{
            setTimeout(function() {
              that.dialogTitle = "修改砍价活动";
              that.buttonFlag = "2"
              that.bargainForm.name= that.currentRow.name,
              that.bargainForm.originPrice=that.currentRow.origin_price,
              that.bargainForm.targetPrice=that.currentRow.target_price,
              that.bargainForm.targetNumber=that.currentRow.target_number,
              that.bargainForm.inventory=that.currentRow.inventory,
              that.bargainForm.prief=that.currentRow.prief,
              that.bargainForm.startTime=that.currentRow.start_date,
              that.bargainForm.endTime=that.currentRow.end_date,
              that.pictureCover=that.currentRow.pic_url
            },0 )
            this.addBargainDialog =true;
          }
        }
      },
      //提交砍价信息
      submitNonmembet(formName) {
        var that = this
        this.$refs[formName].validate((valid) => {
          var that=this
          if (valid) {
            // if(that.bargainForm.targetNumber>200){
            //   that.$message({
            //     message: '目标人数不能超过200',
            //     showClose: true,
            //     type: 'warning'
            //   });
            //   that.addBargainDialog = true;
            //   return;
            // }
            // else if(that.bargainForm.targetNumber-(that.bargainForm.originPrice-that.bargainForm.targetPrice)>0){
            //   that.$message({
            //     message: '目标人数不能多于优惠',
            //     showClose: true,
            //     type: 'warning'
            //   });
            //   that.addBargainDialog = true;
            //   return;
            // }else{
              if (this.buttonFlag == 1) {
                var that = this
                var activityData = {
                  name: this.bargainForm.name,
                  origin_price: this.bargainForm.originPrice,
                  target_price: this.bargainForm.targetPrice,
                  target_number: this.bargainForm.targetNumber,
                  inventory: this.bargainForm.inventory,
                  prief: this.bargainForm.prief,
                  start_date: this.bargainForm.startTime,
                  end_date:this.bargainForm.endTime,
                  pic_url: this.pictureCover,
                };
                var activityParams = {
                  methodUrl: "bitHouse/bitHouseAddBargain",
                  jsonParam: qs.stringify(activityData)
                };
              } else {
                var that = this
                var activityData = {
                  id: this.currentRow.id,
                  name: this.bargainForm.name,
                  origin_price: this.bargainForm.originPrice,
                  target_price: this.bargainForm.targetPrice,
                  target_number: this.bargainForm.targetNumber,
                  inventory: this.bargainForm.inventory,
                  prief: this.bargainForm.prief,
                  start_date: this.bargainForm.startTime,
                  end_date:this.bargainForm.endTime,
                  pic_url: this.pictureCover,
                };
                var activityParams = {
                  methodUrl: "bitHouse/bitHouseUpdateBargain",
                  jsonParam: qs.stringify(activityData)
                }
              }
            // }

            this.$axios.postRequest(activityParams).then(
              function (res) {
                //成功之后处理逻辑

                that.queryactivitys()
                that.addBargainDialog= false;
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
      //删除活动信息
      delectbargainActivity() {
        var that = this;
        if (this.currentRow == null || this.currentRow == '') {
          this.$message({
            message: '请选择砍价活动',
            showClose: true,
            type: 'warning'
          });
        } else if (this.currentRow != '') {
          this.$confirm('此操作将永久删除活动, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            var deleteData = {
              id: that.currentRow.id
            };
            var deleteParams = {
              methodUrl: "bitHouse/bitHouseDeleteBargain",
              jsonParam: qs.stringify(deleteData)
            };
            this.$axios.postRequest(deleteParams).then(
              function (res) {
                //成功之后处理逻辑
                that.queryactivitys();
                that.$message({
                  type: "success",
                  message: "删除成功"
                });
              },
              function (res) {
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
      //表头样式
      headerSetStyle() {
        return {
          "background-color": "#e5e5e5",
          "color": "#303133",
          "border-color": "#c1c3c9",
          "font-size": "12px"
        }
      },
      //表格样式
      cellSetStyle() {
        return {
          "color": "#303133",
          "border-color": "#c1c3c9",
          "font-size": "12px"
        }
      },
      //分页
      handleSizeChange(val) {
        this.pageSize = val
        this.queryactivitys()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.queryactivitys()
      },
      back() {
        this.$router.push('/15')
      },
      //请求活动列表
      queryactivitys() {
        var that = this
        var activityData = {
          count: true,
          orderby: '',
          pageindex:this.currentPage,
          pagesize:this.pageSize
        }
        var activityParams = {
          methodUrl: 'bitHouse/bitHouseGetBargain',
          jsonParam: qs.stringify(activityData)
        }
        this.$axios.postRequest(activityParams).then(function (res) {
          //成功之后处理逻辑
          that.activityList = res.data.list
          that.total = res.data.totalcount
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      }
    },
    mounted() {
       this.queryactivitys()
    }
  }
</script>

<style scoped>
  ul {
    float: left;
    margin: 0 0 10px 0;

  }
  .el-form-item{
    margin:10px 0 !important;
  }
</style>
