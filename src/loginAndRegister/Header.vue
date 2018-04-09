<template>
  <el-row style="height:10%">
    <el-header class="wai" style="height:100%">
      <el-col :span="3" class="user" ><img src="https://pro.modao.cc/uploads3/images/1751/17519267/raw_1520225943.png">
      </el-col>
      <el-col :span="13" class="font" style="font-size: 28px;font-weight: 600;">{{CorporateName}}</el-col>
      <!--<el-col :span="7" style="width: 390px">-->
      <!---->
      <!--<el-button size="mini" v-show="false"><span style="color:#1b96a9;font-weight: 600; " >切换</span></el-button>-->
      <!--</el-col>-->
      <el-col :span="4" class="font">今天是：{{todayTime}}</el-col>
      <el-col :span="2" class="right_icon">

        <el-popover @hide="dotCondition"
          ref="popover3"
          placement="bottom"
          width="300"
          style="background-color:#1b96a9 "
          trigger="click">
          <el-row type="flex" align="middle" v-for="infor in information">
            <el-col :span="18">{{infor.name}}</el-col><el-col :span="6"><el-button type="text">忽略</el-button></el-col>
          </el-row>

        </el-popover>
        <!--<el-badge :is-dot="infomation.length>0" class="item"><img src="https://pro.modao.cc//uploads3/images/1783/17836132/raw_1521017810.png-->

        <!--" style="-->
        <!--width: 32px;height: 32px;padding-top: 29px" v-popover:popover3></el-badge>-->
        <img
        src="https://pro.modao.cc//uploads3/images/1783/17836132/raw_1521017810.png"
        style="width: 32px;height: 32px;"  v-popover:popover3 @click="dotState" >
        <div class="tip" v-show="dot" ></div>
      </el-col>
      <el-col :span="2" class="right_icon">
        <el-popover
          ref="popover4"
          placement="bottom"
          width="200"
          trigger="click">
          <el-col>
            <el-button  @click="outSystem">退出</el-button>
          </el-col>
        </el-popover>
        <img src="https://pro.modao.cc//uploads3/images/1783/17836137/raw_1521017812.png
" style="width: 32px;height: 32px;cursor: pointer" v-popover:popover4>


      </el-col>

    </el-header>
  </el-row>
</template>
<script>
  import axios from 'axios'
  import qs from 'qs'
  import echarts from 'echarts'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {
      ElCol,
      ElRow
    },
    name: 'hello',
    data () {
      return {
        CorporateName: '',//公司名称
        todayTime: '',//获取时间
        dot:false,
        information:[]
      }
    },
    methods:{
      dotState(){
        this.dot=false;
      },
      dotCondition(){

        this.dot=true;
      },
      outSystem: function () {
        sessionStorage.removeItem("userData");
        this.$router.push('/')
      }
    },
    mounted(){
      if(this.information != ''){
          this.dot=true
      } else{
        this.dot=false
      }
      var that = this
      //获取时间
      var timeParams = {
        methodUrl: 'date/getDate',
        jsonParam: qs.stringify()
      }
      this.$axios.postRequest(timeParams).then(function (res) {
        //成功之后处理逻辑
        that.todayTime = res.data.time

      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })

      //请求公司名称
      var userData = qs.parse(sessionStorage.getItem("userData"));
      that.CorporateName = userData.company_name;
      //请求消息
      var infomationData={
        regserial:userData.company_serial,
        news_role:'103',
        user_serial:userData.employee_serial
      };
      var infomationParams={
        methodUrl:'adminMenu/getInformInfo',
        jsonParam:qs.stringify(infomationData),
      }
      this.$axios.postRequest(infomationParams).then(function(res) {
        //成功之后处理逻辑
        that.information = res.data

      }, function(res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })
    },



  }
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
  }

  .user img {
    width: 64px;
    height: 64px;

  
    vertical-align: middle;
    margin-left: 45px;

  }

  .font {
    color: #fff;;
    font-size: 14px;
    height: 64px;
    line-height: 64px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .right_icon {
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
