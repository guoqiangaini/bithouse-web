<template>
  <div>
    <!--下拉条件开始-->
    <div>
      <div class="wai">
        <ul>
          <el-button size="mini" type="info" class="btn" @click="addTags(1)">添加标签</el-button>
          <el-button size="mini" type="info" class="btn" @click="addTags(2)">修改标签</el-button>
          <el-button size="mini" type="info" class="btn" @click="deleteBuildingInfo">删除标签</el-button>
        </ul>
      </div>
      <el-dialog
        :title="dialogTitle"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :visible.sync="dialogFormVisible"
        @close="closeDialog('form')"
      >
        <el-form :model="form" :show-message="false"  :rules="rules" ref="form" label-width="80px">
          <el-form-item label="标签类型" prop="tagsType" >
            <el-col :span="11">
              <el-select size="mini"  clearable v-model="form.tagsType" placeholder="请选择标签类型"  style="margin-bottom: 10px;width: 100%">
                <el-option
                  v-for="item in tagTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="标签名称" prop="tagsName">
            <el-col :span="11">
              <el-input size="mini" placeholder="请输入名称" v-model="form.tagsName" style="width:100%"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button @click="dialogFormVisible = false" size="mini" class="dialogCancelButton">取 消</el-button>
          <el-button type="primary" @click="addTest" size="mini">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--下拉条件结束-->

    <!--表格内容开始-->
    <div>
      <el-table
        ref="multipleTable"
        :data="tagsList"
        border
        tooltip-effect="dark"
        size="mini"
        :headerCellStyle="headerSetStyle"
        :cellStyle="cellSetStyle"
        style="width: 100% ;"
        highlight-current-row
        @current-change="handleRowChange"
        class="elTableBorder">
        <el-table-column
          align="center"
          prop="tag_name"
          label="标签名称"
          width=""
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="tag_type"
          label="标签类型"
          :formatter="formatValue">
        </el-table-column>
      </el-table>
    </div>
    <!--表格内容结束-->
  </div>
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
        addFlag:'',
        dialogTitle:'',
        currentRow:'',
        tagsList:[],
        tagType:'',
        tagTypes:[
          {
            id:'1',
            name:'楼盘标签'
          },
          {
            id:'2',
            name:'户型标签'
          }
        ],
        tableObject: [
          {
            field: 'test',
            width: '180',
            title: "考级活动",
          },
          {
            field: 'dep_parent_name',
            width: '80',
            title: "道馆",
          },
          {
            field: 'examiner',
            width: '80',
            title: "考试人数",
          },
          {
            field: 'start_date',
            width: '120',
            title: "报名日期",
          },
          {
            field: 'end_date',
            width: '90',
            title: "报名截止日期",
          },
          {
            field: 'test_date',
            width: '60',
            title: "考试日期",
          },
          {
            field: 'test_site',
            width: '110',
            title: "考试地点",
          }
        ],
        dialogFormVisible: false,
        year: '',
        testname: '',
        testName: [],
        testLevel: [],
        rooms: [],
        //数据条数
        total: 0,
        //默认一页条数
        pageSize: 20,
        //默认页码
        currentPage: 1,
        dialogVisible: false,
        form: {
          tagsType:'',
          tagsName:''
        },
        rules: {
          tagsName: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          tagsType: [
            {required: true, message: '请选择类型', trigger: 'change'}
          ]
        },
        orderByName: '',
        value: ''
      };
    },
    methods: {

      handleRowChange(val) {
        this.currentRow = val;
        console.log(val)
      },
      formatValue(row, column, cellValue){
        switch(row.tag_type) {
          case '1':
            return '楼盘标签';
            break;
          case '2':
            return '户型标签';
            break;
        }
      },
      //删除标签
      deleteBuildingInfo() {
        var that = this;
        if(this.currentRow===''){
          this.$message({
            message: '请选择标签',
            showClose: true,
            type: 'warning'
          });
        }else if(this.currentRow!='') {
          this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            var deleteData = {
              id:that.multipleSelection[0].id
            };
            var deleteParams = {
              methodUrl: "bitHouse/bitHouseDeleteTag",
              jsonParam: qs.stringify(deleteData)
            };
            this.$axios.postRequest(deleteParams).then(
              function(res) {
                //成功之后处理逻辑
                that.queryTags();
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
      closeDialog(form){
        this.$refs.form.resetFields();
      }, /*清空表单样式调用*/
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
      //点击按钮触发不同流程
      addTags(type){
        var that=this
        if(type==1){
          that.addFlag='1';
          that.dialogTitle = "新增标签";
          this.dialogFormVisible = true;
        }else {
          if (this.currentRow==null || this.currentRow=='') {
            this.$message({
              message: '请选择标签',
              showClose: true,
              type: 'warning'
            });
          } else {
            setTimeout(function() {
              that.addFlag='2'
              that.dialogTitle = "修改标签信息";
                that.form.tagsType=that.currentRow.tag_type
                that.form.tagsName=that.currentRow.tag_name
            },0 )
            this.dialogFormVisible = true;
          }
        }

      },
      //添加标签
      addTest(form){
        var that = this
        this.$refs.form.validate((valid) => {
          var that=this
          if (valid) {
            if(that.addFlag==1) {
              var tagsData = {
                tag_name:this.form.tagsName,
                tag_type:this.form.tagsType
              }
              var tagsParams = {
                methodUrl: 'bitHouse/bitHouseAddTag',
                jsonParam: qs.stringify(tagsData)
              }
              this.$axios.postRequest(tagsParams).then(function (res) {
              }, function (res) {
                //失败之后处理逻辑
                console.log("error:" + res)
              })
            }else{

              var id=this.currentRow.id
              var tagsData = {
                id:id,
                tag_name:this.form.tagsName,
                tag_type:this.form.tagsType
              }
              var tagsParams = {
                methodUrl: 'bitHouse/bitHouseUpdateTag',
                jsonParam: qs.stringify(tagsData)
              }
              this.$axios.postRequest(tagsParams).then(function (res) {

              }, function (res) {
                //失败之后处理逻辑
                console.log("error:" + res)
              })
            }
            that.dialogFormVisible = false
            that.queryTags()

          } else {
            return false;
          }
        });

      },
      //获取标签
      queryTags(){
        var that=this
        var tagsData={
          tag_type:'',
        }
        var tagsParams={
          methodUrl:'bitHouse/bitHouseGetTags',
          jsonParam: qs.stringify(tagsData)
        }
        this.$axios.postRequest(tagsParams).then(
          function(res) {
            //成功之后处理逻辑
            that.tagsList=res.data
            that.total=res.data.totalcount
          },
          function(res) {
            //失败之后处理逻辑
            console.log("error:" + res);
          }
        );
      },
      //分页
      handleSizeChange(val) {
        this.pageSize = val
        this.queryTags()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.queryTags()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    },
    mounted(){
     this.queryTags()
    }

  };
</script>
<style scoped>

  .wai ul {
    float: left;
    margin: 0 10px 10px 0;

  }

  .wai ul > div {
    margin-right: 5px;
  }

  .select {
    width: 100px;
    height: 50px;
  }

  .input {
    height: 30px;
    width: 100px;
  }

  .input2 {
    height: 30px;
    width: 200px;
  }

  .block {
    margin: 20px 0 0 850px;
  }

  .tckFirst ul {
    float: left;
    margin: 10px 0 10px 10px;
  }

  .tckSecond ul {

    margin: 10px 0 10px 10px;
  }

  .size {
    font-size: 12px;
    color: #101010;
    margin-right: 5px;
  }

</style>
