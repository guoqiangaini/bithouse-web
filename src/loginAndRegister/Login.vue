<template>
  <div class="wai">
    <el-dialog
      title="注册"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <hr style="width: 100%; height:1px;border:none;border-top:1px solid #555555;margin: -30px 0 20px 0"/>
      <ul>
        <span>公司名称</span>
        <el-input v-model="value1" placeholder="请输入内容" style="margin:0 0 10px 0;width: 300px"></el-input>
      </ul>
      <ul>
        <span>姓&#12288;&#12288;名</span>
        <el-input v-model="value2" placeholder="请输入内容" style="margin:0 0 10px 0;width: 300px"></el-input>
      </ul>
      <ul>
        <span>电&#12288;&#12288;话</span>
        <el-input v-model="value3" placeholder="请输入内容" style="margin:0 0 10px 0;width: 300px"></el-input>
      </ul>

      <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="determine">确 定</el-button>
  </span>
    </el-dialog>
    <div class="nei" id="qrCode">

      <!--<ul class="context">-->
      <!--<li >现在登录</li>-->
      <!--<ul class="username">-->
      <!--<span >用户名</span><input v-model="input" placeholder="请输入内容" style="width: 200px;border: 1px solid #ccc; padding: 7px 0px;border-radius: 3px;padding-left:5px; ">-->
      <!--</ul>-->
      <!--<ul class="password">-->
      <!--<span >密码</span><input v-model="input" placeholder="请输入内容" style="width: 200px;border: 1px solid #ccc; padding: 7px 0px;border-radius: 3px;padding-left:5px; ">-->
      <!--</ul>-->
      <!--<el-row>-->
      <!--<el-col :span="11" style="margin: 10px 0 0 10%;color: #b3d8ff">忘记密码?</el-col>-->
      <!--<el-col :span="5" style="margin: 5px 0 0 10%"><el-button class="btn" type="primary" plain>login</el-button></el-col>-->
      <!--</el-row>-->
      <!--<el-row class="weixin">-->
      <!--<el-col><img src="http://www.iconpng.com/png/miui-sugar/mm.png" @click="show3 = !show3"> </el-col>-->
      <!--</el-row>-->
      <!--</ul>-->
      <!--</div>-->
      <!--<div style="margin-top: 20px; height: 200px;">-->
      <!--<el-collapse-transition>-->
      <!--<div v-show="show3">-->
      <!--<div class="transition-box">el-collapse-transition</div>-->
      <!--<div class="transition-box">el-collapse-transition</div>-->
      <!--</div>-->
      <!--</el-collapse-transition>-->
      <!--</div>-->
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
  export default {

    components: {
      ElCol,
      ElRow,
      ElButton
    },
    data() {
      return {
        show3: true,
        states: false,
        value1: '',
        value2: '',
        value3: '',
        dialogVisible: false,
      };
    },
    mounted(){
      var that = this;
      var code = this.$utils.getUrlKey("code")
      var reg = this.$utils.getUrlKey("reg")

      if (reg) {//注册

        if (code) {

          if (code != -1000) {
            this.dialogVisible = true
          } else {
            this.$message.error('注册失败');
          }
        } else {
          var obj = new WxLogin({
            id: 'qrCode',
            appid: "wxd938bdd66f30cd9f",
            scope: "snsapi_login",
            redirect_uri: "http%3a%2f%2fwww.jiaopb.com%2fsys%2fwxLogon.do",
            style: "white"

          });
        }
      } else {
        //登录

        if (code) {
          var d = {
            code: code
          }
          var mustParams = {
            methodUrl: 'admin/wxLogin',
            jsonParam: qs.stringify(d)
          }
          this.$axios.postRequest(mustParams).then(function (res) {
            //成功之后处理逻辑
            if (res.code == 0) {
              sessionStorage.setItem("userData", qs.stringify(res.data));
              //重定向路由到首页
              that.$router.push({
                path: '../15'
              })
            } else {
              //提示错误
              that.$alert('登录失败，请联系管理员', '系统提示', {
                confirmButtonText: '确定',
                callback: action => {

                  //刷新当前页
                  /*that.$router.push({
                    path: '/',

                  });*/
                  window.location.href = "../"
                }
              });

            }
          }, function (res) {
            //失败之后处理逻辑
            console.log("error:" + res)
          })
        }
        var obj = new WxLogin({
          id: 'qrCode',
          appid: "wxd938bdd66f30cd9f",
          scope: "snsapi_login",
          redirect_uri: "http%3a%2f%2fwww.jiaopb.com%2fsys%2fwxLogin.do",
          style: "white"

        });

      }


    },

    created(){


    },
    computed: {},
    methods: {
      determine(){

        this.dialogVisible = false;
        let code = this.$utils.getUrlKey("code")
        var share_serial = this.$utils.getUrlKey("share_serial")
        var that = this;
        var d = {
          unionid: code,
          company_name: this.value1,
          employee_name: this.value2,
          employee_phone: this.value3,
          share_serial: share_serial

        }

        var mustParams = {
          methodUrl: 'admin/adminLogon',
          jsonParam: qs.stringify(d)
        }
        this.$axios.postRequest(mustParams).then(function (res) {
          //成功之后处理逻辑
          if (res.code == 0) {

            sessionStorage.setItem("userData", res.data);

            //重定向路由到首页
           /* this.$router.push({
              path: '../login'
            })*/
            that.$alert('注册成功，请扫码登录', '系统提示', {
              confirmButtonText: '确定',
              callback: action => {
                //刷新当前页
                window.location.href = "../"
              }
            });

          } else {
            that.$message.error('注册失败')
          }
        }, function (res) {
          //失败之后处理逻辑
          console.log("error:" + res)
          that.$message.error('注册失败')
        })


      },
      cancel(){
        this.dialogVisible = false;
      }
    }
  };


</script>
<style scoped>
  .wasder {
    position: absolute;
    z-index: 110;
  }

  .wai {
    margin: 0;
    height: 100%;
    background-image: url("../assets/image/background.jpg");
    background-size: 100% 100%;
  }

  .nei {
    width: 30%;
    height: 60%;
    background-color: black;
    background-color: rgba(0, 0, 0, 0.5);

    margin: 0 auto;

    text-align: center;

  }

  .context {

  }

  .context li {
    font-size: 25px;
    color: #f5f5f5;
    margin: 0 0 0 38%;
    padding-top: 10%;
  }

  input {
    margin: 30px 0 10px 10px;
  }

  .username {
    margin-left: 10%;
  }

  .password {
    margin-left: 13%;
  }

  img {
    width: 70px;
    height: 70px
  }

  .weixin {
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
