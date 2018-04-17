<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
  <el-row style="height:10%">
    <el-header class="wai" style="height:100%;overflow: hidden;">
      <el-col :span="3" class="user" ><img src="../assets/image/house_icon.png">
      </el-col>
      <el-col :span="13" class="font" style="font-size: 28px;font-weight: 600;">比特房信息录入系统</el-col>
      <el-col :span="4" class="font"></el-col>
      <el-col :span="2" class="right_icon">
      </el-col>
      <el-col :span="2" class="right_icon">
        <el-popover
          ref="popover4"
          placement="bottom"
          width="200"
          trigger="click">
          <el-col  style="text-align: center">
            <el-button  @click="outSystem">退出</el-button>
            <el-button  @click="updatePassWord">修改密码</el-button>
          </el-col>
        </el-popover>
        <img src="https://pro.modao.cc//uploads3/images/1783/17836137/raw_1521017812.png" style="cursor: pointer" v-popover:popover4>
      </el-col>
      <el-dialog
        title="修改密码"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :visible.sync="dialogVisible"
        width="450px"
        @close="clearFormData('ruleForm2')"
        center
      >
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm" size="mini">
          <el-form-item label="旧密码" prop="oldPass">
            <el-input v-model.number="ruleForm2.oldPass"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item >
          <el-form-item style="text-align: center" label-width="0">
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-header>
  </el-row>
</template>
<script>
import axios from "axios";
import qs from "qs";
import echarts from "echarts";
import ElRow from "element-ui/packages/row/src/row";
import ElCol from "element-ui/packages/col/src/col";
export default {
  components: {
    ElCol,
    ElRow
  },
  name: "hello",
  data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
              callback();
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      dialogVisible:false,
      CorporateName: "", //公司名称
      todayTime: "", //获取时间
      dot: false,
      information: [],
      ruleForm2: {
        pass: '',
        checkPass: '',
        oldPass: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        oldPass: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    dotState() {

      this.dot = false;
    },
    dotCondition() {
      this.dot = true;
    },
    //退出登录
    outSystem: function() {
      sessionStorage.removeItem("user");
      this.$router.push("/");
    },
    //修改密码
    updatePassWord(){
      this.dialogVisible=true
    },
    submitForm(formName) {
      var that=this

      this.$refs[formName].validate((valid) => {
        if (valid) {
          var user=qs.parse(sessionStorage.getItem("user"))
          console.log("..........................")
          console.log(user)
          var acountData={
           user_serial:user.user_serial,
           old_pwd:this.ruleForm2.oldPass,
           password:this.ruleForm2.checkPass
          }
          console.log(acountData)
         var acountParams={
           methodUrl:'bitHouse/bitHouseUpdatePwd',
           jsonParam: qs.stringify(acountData)
         }
         this.$axios.postRequest(acountParams).then(function (res) {
            //成功之后处理逻辑
            that.dialogVisible=false
            sessionStorage.removeItem('user')
            that.$router.push({path:'/'})
          }, function (res) {
            //失败之后处理逻辑
            console.log("error:" + res)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    clearFormData(formName) {
      this.$refs[formName].resetFields();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }

  },
  mounted() {
  }
};
</script>
<style scoped>
.wai {
  background-color: #1b96a9;
}

.user {
  background-color: #1b96a9;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  height: 100%;
  text-align: center;
}

.user img {
  height: 100%;
}

.font {
  color: #fff;
  font-size: 14px;
  position: relative;
  top: 47%;
  transform: translateY(-50%);
}
.right_icon {
  height: 100%;
  text-align: right;
}
.right_icon img {
  height: 40%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.tip {
  min-width: 14px;
  height: 14px;
  background: red;
  box-sizing: border-box;
  color: white;
  font-size: 10px;
  text-align: center;
  line-height: 20px;
  padding: 0 5px;
  border-radius: 10px;
  display: inline-block;
  position: inherit;
  z-index: 1111;
  margin-bottom: 20px;
  margin-left: -12px;
}
</style>
