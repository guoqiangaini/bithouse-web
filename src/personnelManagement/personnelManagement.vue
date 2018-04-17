<template xmlns="http://www.w3.org/1999/html">
  <div>
    <div class="wai">
      <ul>
        <span class="size">角色</span>
        <el-select clearable v-model="role" placeholder="请选择" size="mini">
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </ul>
      <ul>
        <el-button size="mini" type="info" class="btn" @click="queryUserList">查询</el-button>
        <el-button size="mini" type="info" class="btn" @click="changeRole">变更客服</el-button>
        <el-button size="mini" type="info" class="btn" @click="changeCustomerPwd">变更客服密码</el-button>
      </ul>
    </div>
    <el-table
      :headerCellStyle="headerSetStyle"
      :cellStyle="cellSetStyle"
      highlight-current-row
      @current-change="handleRowChange"
      border
      ref="multipleTable"
      size="mini"
      :data="userList"
      header-align="center"
      style="width: 100%;"
      class="elTableBorder">
      <el-table-column
        align="center"
        prop="user_serial"
        label="用户序号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="user_name"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="phone_number"
        label="电话">

      </el-table-column>
      <el-table-column
        align="center"
        prop="wechat_no"
        label="微信号"
        >
      </el-table-column>
      <el-table-column
        align="center"
        prop="brief_introduction"
        label="简介">
      </el-table-column>
      <el-table-column
        align="center"
        prop="role_name"
        label="角色名称">
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
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import { mapState } from "vuex";
import ElButton from "../../node_modules/element-ui/packages/button/src/button";
import ElRow from "element-ui/packages/row/src/row";
import ElCol from "element-ui/packages/col/src/col";
export default {
  components: {
    ElCol,
    ElRow,
    ElButton
  },
  data() {
    return {
      currentRow:'',
      userList:[],
      role:'',
      roles:[
        {
          id:'2',
          name:'客服'
        },
        {
          id:'0',
          name:'客户'
        }
      ],
      rooms: "",
      medicalHistory: [
        {
          label: "未知",
          value: 1
        },
        {
          label: "男",
          value: 2
        },
        {
          label: "女",
          value: 3
        }
      ],
      asd: "",
      classes: [],
      imageUrl: "",
      pageSize: 20,
      checked: "",
      currentPage: 1,
      post: [],
      departmentMuseum:[],//入职部门
      roadMuseum: [], //道馆
      dialogVisibleTwo: false,
      personnelMatter: [], //人事统计表
      entryStatu: [], //入职状态
      value1: "",
      value2: "",
      value3: "",
      value6: "",
      input1: "",
      total: 0,
      dialogVisible: false,
      dialogImageUrl: "",
    };
  },
  methods: {
    //变更客服密码
    changeCustomerPwd() {
      var that = this
      if (this.currentRow == null || this.currentRow == '') {
        this.$message({
          message: '请选择人员',
          showClose: true,
          type: 'warning'
        });
      } else if (this.currentRow.role_name == "客服") {
        this.$confirm('此操作将更改客服密码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          var userData = {
            user_serial: this.currentRow.user_serial,
          }
          var userParams = {
            methodUrl: 'bitHouse/bitHouseInitPwd',
            jsonParam: qs.stringify(userData)
          }
          this.$axios.postRequest(userParams).then(
            function (res) {
              //成功之后处理逻辑
              that.$message({
                message: '更改成功',
                showClose: true,
                type: 'success'
              });
              that.queryUserList()
            },
            function (res) {
              //失败之后处理逻辑
              console.log("error:" + res);
            }
          );
        })
      }else{
        this.$message({
          message: '客户无需修改密码',
          showClose: true,
          type: 'warning'
        });
      }
    },
    //选择
    handleRowChange(val) {
      this.currentRow = val;
      console.log(val)
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val
      this.queryUserList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.queryUserList()
    },
    //表头样式
    headerSetStyle() {
      return {
        "background-color": "#e5e5e5",
        color: "#303133",
        "border-color": "#c1c3c9"
      };
    },
    //表格样式
    cellSetStyle() {
      return {
        color: "#606266",
        "border-color": "#c1c3c9"
      };
    },
    tableheaderClassName({ row, rowIndex }) {
      return "table-loginAndRegister-th";
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //获取人员信息
    queryUserList(){
      var that=this
      var userData={
        role_id:this.role,
        count:true,
        orderby:'',
        pageindex:1,
        pagesize:20
      }
      var userParams={
        methodUrl:'bitHouse/bitHouseGetAllUser',
        jsonParam: qs.stringify(userData)
      }
      this.$axios.postRequest(userParams).then(
        function(res) {
          //成功之后处理逻辑
          that.userList=res.data.list
          that.total=res.data.totalcount
        },
        function(res) {
          //失败之后处理逻辑
          console.log("error:" + res);
        }
      );
    },
    //更改角色
    changeRole(){
      var that=this
      console.log(this.currentRow);
      if(this.currentRow==null || this.currentRow==''){
        this.$message({
          message: '请选择人员',
          showClose: true,
          type: 'warning'
        });
      } else if (this.currentRow.role_name =="客服") {
        this.$confirm('此操作将更改用户角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          var userData = {
            user_serial: this.currentRow.user_serial,
            role_id: '0',
            role_name: '客户'
          }
          var userParams = {
            methodUrl: 'bitHouse/bitHouseSetService',
            jsonParam: qs.stringify(userData)
          }
          this.$axios.postRequest(userParams).then(
            function (res) {
              //成功之后处理逻辑
              that.$message({
                message: '更改成功',
                showClose: true,
                type: 'success'
              });
              that.queryUserList()
            },
            function (res) {
              //失败之后处理逻辑
              console.log("error:" + res);
            }
          );
        })
      } else{
        this.$confirm('此操作将更改用户角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          var that = this
          var userData = {
            user_serial: this.currentRow.user_serial,
            role_id: '2',
            role_name: '客服'
          }
          var userParams = {
            methodUrl: 'bitHouse/bitHouseSetService',
            jsonParam: qs.stringify(userData)
          }
          this.$axios.postRequest(userParams).then(
            function (res) {
              //成功之后处理逻辑
              that.$message({
                message: '更改成功',
                showClose: true,
                type: 'success'
              });
              that.queryUserList()

            },
            function (res) {
              //失败之后处理逻辑
              console.log("error:" + res);
            }
          );
        })
      }
      }
  },
  mounted(){
    this.queryUserList()
  }
};
</script>
<style scoped>
.wai {
  margin: 0;
}


.basicData {
  border: 1px solid #d8d8d8;
  padding: 5px;
}

.select {
  width: 100px;
}

.wai ul {
  float: left;
  margin: 0 10px 10px 0;
}

.box1 {
  border: 1px solid black;
}

.el-table .table-head-th {
  background-color: red;
  font-size: large;
}



.size {
  font-size: 12px;
  color: #101010;
  margin-right: 5px;
}
</style>
