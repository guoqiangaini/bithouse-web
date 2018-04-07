<template>
  <div class="wai">

    <div class="wasder">

    </div>

    <div class="nei" id="qrCode" >

    </div>

  </div>
</template>
<script>
  import axios from 'axios'
  import qs from 'qs'
  import {mapState} from 'vuex'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  export  default{

    components: {
      ElCol,
      ElRow,
      ElButton},
    data() {
      return {
        show3: true,
        states:false,
        value1:'',
        value2:'',
        value3:'',
        dialogVisible:false,
//        conpany_name:'',
//        employee_name:'',
//        employee_phone:'',
      };
    },
    mounted(){
      let code=this.$utils.getUrlKey("code")
      var that = this;
//      if(code){
//        var d = {
//          unionid:code,
//          conpany_name:this.value1,
//          employee_name:this.value2,
//          employee_phone:this.value3
//        }
//console.log('------------')
//console.log(d)
//        var mustParams = {
//          methodUrl:'admin/adminLogon',
//          jsonParam:qs.stringify(d)
//        }
//        this.$axios.postRequest(mustParams).then(function(res) {
//          //成功之后处理逻辑
//          if(res.code==0){
//            sessionStorage.setItem("userData",res.data);
//            //重定向路由到首页
//
////
//          }else{
//            //提示错误
//            //alert(res.data.msg);
//            //刷新当前页
//            that.$router.push({
//              path:'../',
//
//            })
//          }
//        }, function(res) {
//          //失败之后处理逻辑
//          console.log("error:" + res)
//        })
//      }
if(code){
    if(code!=-1000){
      this.dialogVisible=true
    }else{
      this.$message.error('注册失败');
    }
}else{
    var obj = new WxLogin({
      id: 'qrCode',
      appid: "wxd938bdd66f30cd9f",
      scope: "snsapi_login",
      redirect_uri: "http%3a%2f%2fwww.jiaopb.com%2fsys%2fwxLogon.do",
      style: "white",
      href: "./qrCode.css"
    });
}
    },
    created(){


    },
    computed:{


    },
    methods:{
//      Determine(){
//        this.dialogVisible=false;
//        let code=this.$utils.getUrlKey("code")
//        var that = this;
//        var d = {
//          unionid:code,
//          conpany_name:this.value1,
//          employee_name:this.value2,
//          employee_phone:this.value3
//        }
//
//        var mustParams = {
//          methodUrl:'admin/adminLogon',
//          jsonParam:qs.stringify(d)
//        }
//        this.$axios.postRequest(mustParams).then(function(res) {
//          //成功之后处理逻辑
//          if(res.code==0){
//            sessionStorage.setItem("userData",res.data);
//            //重定向路由到首页
//            this.$router.push({
//          path:'../login'
//        })
//
//          }else{
//            that.$message.error('注册失败')
//          }
//        }, function(res) {
//          //失败之后处理逻辑
//          console.log("error:" + res)
//          that.$message.error('注册失败')
//        })


      },
      cancel(){
        this.dialogVisible=false;
      }

  };


</script>
<style scoped>
  .wasder{
    position: absolute;
    z-index: 110;
  }
  .wai{
    margin: 0;
    height: 100%;
    background-image: url("../assets/login.jpg");
    background-size: 100% 100%;
  }
  .nei{
    width: 30%;height: 60%;
    background-color: black;
    background-color:rgba(0,0,0,0.5);

    margin: 0 auto;

    text-align: center;

  }
  .context{


  }
  .context li{
    font-size: 25px;
    color: #f5f5f5;
    margin: 0 0 0 38%;
    padding-top: 10%;
  }
  input{
    margin: 30px 0 10px 10px;
  }
  .username{
    margin-left: 10%;
  }
  .password{
    margin-left: 13%;
  }
  img{width: 70px;height: 70px}
  .weixin{
    margin: 0 0 0 18%;
  }
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }

</style>
