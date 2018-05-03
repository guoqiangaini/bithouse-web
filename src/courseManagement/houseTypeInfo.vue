<template>
  <el-row>
    <ul>
      <el-button size="mini"  type="info" class="btn" @click="back">返回</el-button>
      <el-button size="mini" type="info" @click="addHouseType(1)">新增户型</el-button>
      <el-button size="mini" type="info" @click="addHouseType(2)">修改</el-button>
      <el-button size="mini" type="info" @click="deleteRoomInfo">删除</el-button>
    </ul>
    <!--新增户型弹框开始-->
    <el-dialog
      :title="dialogTitle"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="addSalesCourseDialog"
      width="900px"
      @close="clearFormData('salesForm')"
      >
      <el-form :model="salesForm" :rules="rules" ref="salesForm" :show-message="false">
        <fieldset style="border: 1px solid #c1c3c9;">
          <legend style="font-weight: 600">户型信息</legend>
          <div class="basicData">
            <el-row type="flex" justify="center">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <!--户型名称-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                      <el-form-item label="户型名称" prop="houseTypeName" labelWidth="75px">
                        <el-input v-model="salesForm.houseTypeName" placeholder="例：A户型" size="mini" style="width:250px" clearable></el-input>
                      </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--户型简介-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="户型简介" prop="houseTypeDesc" labelWidth="75px">
                      <el-input v-model="salesForm.houseTypeDesc" placeholder="例:2室2厅2卫" size="mini" style="width:250px" clearable></el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--卧室数量-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" >
                    <el-form-item label="卧室数量" prop="bedroomsNumber" labelWidth="75px">
                      <el-input v-model="salesForm.bedroomsNumber" placeholder="" size="mini" style="width:250px" clearable></el-input>
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--户型面积-->
                <el-row >
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="面　　积" prop="familyArea" labelWidth="75px">
                      <el-input v-model="salesForm.familyArea" placeholder="" size="mini" style="width:250px" clearable></el-input>/m²
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--总价-->
                <el-row >
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="总　　价" prop="totalPrice" labelWidth="75px">
                      <el-input v-model="salesForm.totalPrice" placeholder="" size="mini" style="width:250px" clearable></el-input>/元
                    </el-form-item>
                  </el-col><!--姓名-->
                </el-row>
                <!--销售状态-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="销售状态" prop="salesStatus" label-width="75px">
                      <el-select v-model="salesForm.salesStatus" placeholder="请选择" size="mini" style="width:250px">
                        <el-option label="待售" value="0"></el-option>
                        <el-option label="在售" value="1"></el-option>
                        <el-option label="售完" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col><!--教练-->
                </el-row>
                <!--户型标签-->
                <el-row>
                  <el-col  :xs="12" :sm="12" :md="12" :lg="12" :xl="12" >
                    <el-form-item label="户型标签" prop="roomTags"labelWidth="75px" size="mini">
                      <el-select v-model="salesForm.roomTags" multiple placeholder="请选择户型标签，最多4个" style="width:350px" :multiple-limit="4">
                        <el-option
                          v-for="item in options"
                          :key="item.id"
                          :label="item.tag_name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--户型封面图片-->
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="封面图片" label-width="75px">
                      <el-upload
                        class="upload-demo"
                        action="string"
                        :http-request='submitUploadBanner'
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--户型轮播图片-->
                <!--操作按钮-->
                <!--轮播图片上传-->
                <el-row>
                  <el-col>上传轮播图片</el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-upload
                      class="upload-demo"
                      drag
                      action="string"
                      :http-request='submitUploadpictureA'
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      multiple>
                      <img v-if="pictureA" :src="pictureA" class="avatar">
                      <i v-else class="el-icon-upload"></i>
                      <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">上传jpg/png文件不超过500kb<el-button  type="text" style="margin-left: 10px" @click="clearPictrue(1)">删除图片</el-button></div>
                    </el-upload>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-upload
                      class="upload-demo"
                      drag
                      action="string"
                      :http-request='submitUploadpictureB'
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      multiple>
                      <img v-if="pictureB" :src="pictureB" class="avatar">
                      <i v-else class="el-icon-upload"></i>
                      <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">上传jpg/png文件不超过500kb<el-button  type="text" style="margin-left: 10px" @click="clearPictrue(2)">删除图片</el-button></div>
                    </el-upload>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-upload
                      class="upload-demo"
                      drag
                      action="string"
                      :http-request='submitUploadpictureC'
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      multiple>
                      <img v-if="pictureC" :src="pictureC" class="avatar">
                      <i v-else class="el-icon-upload"></i>
                      <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">上传jpg/png文件不超过500kb<el-button  type="text" style="margin-left: 10px" @click="clearPictrue(3)">删除图片</el-button></div>
                    </el-upload>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-upload
                      class="upload-demo"
                      drag
                      action="string"
                      :http-request='submitUploadpictureD'
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      multiple>
                      <img v-if="pictureD" :src="pictureD" class="avatar">
                      <i v-else class="el-icon-upload"></i>
                      <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">上传jpg/png文件不超过500kb<el-button  type="text" style="margin-left: 10px" @click="clearPictrue(4)">删除图片</el-button></div>
                    </el-upload>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-upload
                      class="upload-demo"
                      drag
                      action="string"
                      :http-request='submitUploadpictureE'
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      multiple>
                      <img v-if="pictureE" :src="pictureE" class="avatar">
                      <i v-else class="el-icon-upload"></i>
                      <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">上传jpg/png文件不超过500kb<el-button  type="text" style="margin-left: 10px" @click="clearPictrue(5)">删除图片</el-button></div>
                    </el-upload>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-upload
                      class="upload-demo"
                      drag
                      action="string"
                      :http-request='submitUploadpictureF'
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      multiple>
                      <img v-if="pictureF" :src="pictureF" class="avatar">
                      <i v-else class="el-icon-upload"></i>
                      <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">上传jpg/png文件不超过500kb<el-button  type="text" style="margin-left: 10px" @click="clearPictrue(6)">删除图片</el-button></div>
                    </el-upload>
                  </el-col>
                </el-row>

              </el-col>
            </el-row>
          </div><!--基础资料-->
        </fieldset>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button  size="mini" @click="addSalesCourseDialog = false" class="dialogCancelButton">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitNonmembet('salesForm')">提交</el-button>
      </div>
    </el-dialog>
    <!--新增户型弹框结束-->
    <!--户型列表-->
    <el-table
      ref="multipleTable"
      :data="roomList"
      border
      tooltip-effect="dark"
      size="mini"
      style="width: 100% ;"
      highlight-current-row
      @current-change="handleRowChange"
      :headerCellStyle="headerSetStyle"
      :cellStyle="cellSetStyle"
      class="elTableBorder">
      <el-table-column
        align="center"
        prop="apartment_name"
        label="户型名称"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="apartment_brief"
        label="户型简介"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="room_sum"
        label="卧室数量"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="apartment_measure"
        label="户型面积"
      >
      </el-table-column>
        <el-table-column
          align="center"
          prop="total_price"
          label="总价"
        >
      </el-table-column>
        <el-table-column
          align="center"
          prop="sale_state"
          label="销售状态"
          :formatter="formatValue"
        >
      </el-table-column>
    </el-table>
  </el-row>
</template>
<script>
  import {mapState} from 'vuex'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import axios from 'axios'
  import qs from 'qs'
  export default {
    components: {
      ElCol,
      ElRow,
      ElButton
    },
    data() {
      return {
        //分页字段
        total:0,
        currentPage:1,
        pageSize:20,
        roomList:[],
        //楼盘Id
        buildingId:'',
        currentRow:'',
        buttonFlag:'',
        dialogTitle:'',
        // 封面图片
        pictureCover:'',
        // 轮播图片
        pictureA:'',
        pictureB:'',
        pictureC:'',
        pictureD:'',
        pictureE:'',
        pictureF:'',
        addSalesCourseDialog:false,
        //户型信息
        salesForm: {
          houseTypeName: '',
          houseTypeDesc: '',
          bedroomsNumber: '',
          familyArea: '',
          totalPrice:'',
          salesStatus:'',
          roomTags:[] ,
        },
        //临时户型标签
        options: [],
        rules:{
          houseTypeName:[
            { required: true, message: '请输入户型名称',trigger: 'blur'}
          ],
          houseTypeDesc:[
            { required: true, message: '请输入户型详情',trigger: 'blur'}
          ],
          bedroomsNumber:[
            { required: true, message: '请输入房间数',trigger: 'blur'},
            {pattern: /^[0-9]*$/,trigger: 'blur'}
          ],
          familyArea:[
            { required: true, message: '请输入面积',trigger: 'blur'},
            {pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,trigger: 'blur'}
          ],
          totalPrice:[
            { required: true, message: '请输入总价',trigger: 'blur'},
            {pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,trigger: 'blur'}
          ],
          salesStatus:[
            { required: true, message: '请输入销售状态',trigger: 'change'},
          ],
          roomTags:[
            { type: 'array', required: true, message: '请选择户型标签', trigger: 'change'}
          ]

        }

      };
    },
    methods: {
      clearFormData(formName) {
        this.$refs[formName].resetFields();
        this.pictureCover='';
        this.pictureA='';
        this.pictureB='';
        this.pictureC='';
        this.pictureD='';
        this.pictureE='';
        this.pictureF='';


      },
      handleRowChange(val) {
        this.currentRow = val;
      },
      // 清除图片
      clearPictrue(type){
        var that=this
        if(type==1){
          that.pictureA=''
        }else if(type==2){
          that.pictureB=''
        }else if(type==3){
          that.pictureC=''
        }else if(type==4){
          that.pictureD=''
        }else if(type==5){
          that.pictureE=''
        }else if(type==6){
          that.pictureF=''
        }
      },
      formatValue(row, column, cellValue){
        switch(row.sale_state) {
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
      handleAvatarSuccess(){

      },
      //上传图片前处理函数
      beforeAvatarUpload(){

      },
      //上传图片
      submitUploadBanner(file){
        this.submitUpload(file,1)
      },
      submitUploadpictureA(file){
        this.submitUpload(file,2)
      },
      submitUploadpictureB(file){
        this.submitUpload(file,3)
      },
      submitUploadpictureC(file){
        this.submitUpload(file,4)
      },
      submitUploadpictureD(file){
        this.submitUpload(file,5)
      },
      submitUploadpictureE(file){
        this.submitUpload(file,6)
      },
      submitUploadpictureF(file){
        this.submitUpload(file,7)
      },
      //上传图片函数
      submitUpload(file,flag) {
        var that=this
        let param = new FormData(); // 创建 form 对象
        param.append("file", file.file, file.file.name); // 通过 append 向 form 对象添加数据
        let config = {
          headers: { "Content-Type": "multipart/form-data" }
        }; // 添加请求头
        this.$axios
          .postImageRequest(
            "bitHouse/bitHouseUploadImage",
            param,
            config
          )
          .then(response => {
            if(flag==1){
              that.pictureCover=response.data.image_url
            }else if(flag==2){
              that.pictureA=response.data.image_url
            }else if(flag==3){
              that.pictureB=response.data.image_url
            }else if(flag==4){
              that.pictureC=response.data.image_url
            }else if(flag==5){
              that.pictureD=response.data.image_url
            }else if(flag==6){
              that.pictureE=response.data.image_url
            }else if(flag==7){
              that.pictureF=response.data.image_url
            }

          });
      },
      //添加户型信息
      addHouseType(type){
        var that=this
        if(type==1){
          this.dialogTitle="新增户型";
          this.buttonFlag="1"
          this.addSalesCourseDialog=true
        }else{
          if (this.currentRow==null||this.currentRow==='') {
            this.$message({
              message: '请选择户型',
              showClose: true,
              type: 'warning'
            });
          } else {
            setTimeout(function() {
              var tags = [];
              for(var j = 0; j<that.currentRow.tags.length; j++){
                tags.push(that.currentRow.tags[j].id);
              }
                that.buttonFlag = "2";
                that.dialogTitle = "修改户型信息";
                that.salesForm.houseTypeName=that.currentRow.apartment_name ,
                that.salesForm.houseTypeDesc=that.currentRow.apartment_brief,
                that.salesForm.bedroomsNumber=that.currentRow.room_sum,
                that.salesForm.familyArea=that.currentRow.apartment_measure,
                that.salesForm.totalPrice=that.currentRow.total_price
                that.salesForm.salesStatus=that.currentRow.sale_state,
                that.salesForm.roomTags=tags,
                that.pictureCover=that.currentRow.pic_url,
                that.pictureA=that.currentRow.image_a,
                that.pictureB=that.currentRow.image_b,
                that.pictureC=that.currentRow.image_c,
                that.pictureD=that.currentRow.image_d,
                that.pictureE=that.currentRow.image_e,
                that.pictureF=that.currentRow.image_f
            },0 )
            this.addSalesCourseDialog=true
          }
        }

      },
      //提交户型信息
      submitNonmembet(formName){
        var that=this
        this.$refs[formName].validate((valid) => {
          var that=this
          if (valid) {
            if(that.pictureCover==null||that.pictureCover==''){
              that.$message({
                message: '封面图片未上传',
                showClose: true,
                type: 'warning'
              });
            }else if(this.buttonFlag==1){
              var that=this
              var roomData = {
                estate_id:this.buildingId,
                apartment_name:this.salesForm.houseTypeName,
                apartment_brief:this.salesForm.houseTypeDesc,
                room_sum:this.salesForm.bedroomsNumber,
                apartment_measure:this.salesForm.familyArea,
                total_price:this.salesForm.totalPrice,
                sale_state:this.salesForm.salesStatus,
                pic_url:this.pictureCover,
                tag_ids:this.salesForm.roomTags.join(','),
                image_a:this.pictureA,
                image_b:this.pictureB ,
                image_c:this.pictureC ,
                image_d:this.pictureD ,
                image_e:this.pictureE ,
                image_f:this.pictureF ,
              };
              var roomParams = {
                methodUrl: "bitHouse/bitHouseAddRoom",
                jsonParam: qs.stringify(roomData)
              };
            }else{
              var that=this
              var roomData= {
                estate_id:this.buildingId,
                id:this.currentRow.id,
                apartment_name:this.salesForm.houseTypeName,
                apartment_brief:this.salesForm.houseTypeDesc,
                room_sum:this.salesForm.bedroomsNumber,
                apartment_measure:this.salesForm.familyArea,
                total_price:this.salesForm.totalPrice,
                sale_state:this.salesForm.salesStatus,
                pic_url:this.pictureCover,
                tag_ids:this.salesForm.roomTags.join(','),
                image_a:this.pictureA,
                image_b:this.pictureB ,
                image_c:this.pictureC ,
                image_d:this.pictureD ,
                image_e:this.pictureE ,
                image_f:this.pictureF ,
              };
              var roomParams={
                methodUrl: "bitHouse/bitHouseUpdateRoom",
                jsonParam: qs.stringify(roomData)
              }
            }
            this.$axios.postRequest(roomParams).then(
              function(res) {
                //成功之后处理逻辑
                that.queryRooms()
              },
              function(res) {
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
            that.addSalesCourseDialog =true;
          }
        });
        that.addSalesCourseDialog = false;
      },
      //删除户型信息
      deleteRoomInfo() {
        var that = this;
        if(this.currentRow==null || this.currentRow==''){
          this.$message({
            message: '请选择户型',
            showClose: true,
            type: 'warning'
          });
        }else if (this.currentRow!='') {
          this.$confirm('此操作将永久删除户型数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            var deleteData = {
              id:that.currentRow.id
            };
            var deleteParams = {
              methodUrl: "bitHouse/bitHouseDeleteRoom",
              jsonParam: qs.stringify(deleteData)
            };
            this.$axios.postRequest(deleteParams).then(
              function(res) {
                //成功之后处理逻辑
                that.queryRooms();
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
      back(){
        this.$router.push('/15')
      },
      //请求户型
      queryRooms(){
        var that = this
        var roomData = {
          estate_id:this.buildingId,
          count: true,
          orderby:'',
          pageindex:this.currentPage,
          pagesize:this.pageSize
        }
        var roomParams = {
          methodUrl: 'bitHouse/bitHouseGetRoom',
          jsonParam: qs.stringify(roomData)
        }
        this.$axios.postRequest(roomParams).then(function (res) {
          //成功之后处理逻辑
          that.roomList = res.data.list
          that.total=res.data.totalcount
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
        })
      }
    },
    mounted() {
      //获取户型标签
      var that =this
      var tagsData={
        tag_type:2
      }
      var tagsParams={
        methodUrl:'bitHouse/bitHouseGetTags',
        jsonParam: qs.stringify(tagsData)
      }
      this.$axios.postRequest(tagsParams).then(
        function(res) {
          //成功之后处理逻辑
          that.options=res.data
        },
        function(res) {
          //失败之后处理逻辑
          console.log("error:" + res);
        }
      );
      //获取上一页传递的参数，并保存到本地
      if (this.$route.params.roomData != null) {
        var roomTables = this.$route.params.roomData
        var buildingId=this.$route.params.buildingId
        sessionStorage.setItem("roomDataList", JSON.stringify(roomTables));
        sessionStorage.setItem("buildingId", JSON.stringify(buildingId));
        that.roomList = roomTables
        that.buildingId=buildingId
      } else {
        this.roomList = JSON.parse(sessionStorage.getItem("roomDataList"))
        this.buildingId=JSON.parse(sessionStorage.getItem("buildingId"))
      }
    }
  }
</script>
<style scoped>
  ul{
    float: left;
    margin: 0 0 10px 0;

  }
</style>
