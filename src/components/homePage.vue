<template>
  <div>
    <!-- 数值数据区开始 -->
    <div class="statisticalData">
      <el-row style="margin-bottom: 30px;">
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6"style="text-align: center">

            <div style="display:inline-block">
              <img src="../assets/image/home_total_person_icon.png" style="width: 45px;height: 45px">
            </div>
          <router-link to="/16">
            <div style="display:inline-block;margin-left:10px;">
              <div class="number">{{totalNumber}}</div>
              <div class="titleContent">学员总人数</div>
            </div>
          </router-link>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" style="text-align: center">

            <div style="display:inline-block">
              <img src="../assets/image/home_new_registration_icon.png" style="width: 45px;height: 45px">
            </div>
          <router-link to="/16">
            <div style="display:inline-block;margin-left: 10px">
              <div class="number">{{todayNews}} / {{monthNews}}</div>
              <div class="titleContent">今日新报/本月累计新报</div>

            </div>
          </router-link>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" style="text-align: center">

            <div style="display: inline-block">
              <img src="../assets/image/home_fire_class_icon.png" style="width: 45px;height: 45px">
            </div>
          <router-link to="/24">
            <div style="display:inline-block;margin-left: 10px">
              <div class="number">{{todayFireClassNumber}} / {{monthFireClassNumber}}</div>
              <div class="titleContent">今日消课人次/本月消课人次</div>
            </div>
          </router-link>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" style="text-align: center">

            <div style="display: inline-block">
              <img src="../assets/image/home_to_charge_icon.png" style="float: left;width: 45px;height: 45px">
            </div>
          <router-link to="/16">
            <div style="display: inline-block;margin-left: 10px">
              <div class="number">{{tochangeNumber}} / {{lossNumber}}</div>
              <div class="titleContent">待续费人数/本月累计流失</div>

            </div>
          </router-link>
        </el-col>
      </el-row>
      <el-row style=" ">
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" style="text-align: center">

            <div style="display: inline-block">
              <img src="../assets/image/home_attendence_icon.png" style="width: 45px;height: 45px;margin-left:35px">
            </div>
          <router-link to="/28">
            <div style="display: inline-block;margin-left: 10px">
              <div class="number">{{todayAttendanceNumber}}</div>
              <div class="titleContent">今日员工出勤人数</div>

            </div>
          </router-link>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" style="text-align: center">

            <div style="display: inline-block">
              <img src="../assets/image/home_rmb_icon.png" style="width: 45px;height: 45px" >
            </div>
          <router-link to="/16">
            <div style="display: inline-block;margin-left: 10px">
              <div class="number">{{todayPaidCount}} / {{monthPaidCount}}</div>
              <div class="titleContent">今日续费/本月累计续费</div>
            </div>
          </router-link>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" style="text-align: center">
          <div style="display: inline-block">
            <img src="../assets/image/home_today_income_icon.png" style="width: 45px;height:45px;margin-left: -20px">

          </div>
          <div style="display: inline-block;margin-left: 10px">
            <div class="number">{{todayIncome}} / {{monthIncome}}</div>
            <div class="titleContent">今日收款/本月累计收款</div>

          </div>
        </el-col >
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" style="text-align: center">
          <div style="display: inline-block">
            <img src="../assets/image/home_expenditure_icon.png" style="width: 45px;height: 45px;margin-left: -5px">
          </div>
          <div style="display: inline-block;margin-left: 10px">
            <div class="number">{{todayExpend}} / {{monthExpend}}</div>
            <div class="titleContent">今日支出/本月累计支出</div>

          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 结束 -->

    <!-- 业绩收支开始 -->
    <el-row>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" style="border-top:1px solid #c1c3c9;border-left:1px solid #c1c3c9">
        <div  id="table13" style="margin:40px 0 0 0 ;width: 507px;height:400px;text-align:center"></div>
      </el-col>
       <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" style="border:1px solid #c1c3c9;border-bottom: 0">
        <div style="text-align:center">
        <el-button @click="inComeMethod"  size="medium" class="tableButton">收入</el-button>
        <el-button  size="medium" @click="expendMethod" class="tableButton">支出</el-button>
       </div>
        <div id="table2"  style="margin:0px auto;width: 507px;height:400px" v-show="income"></div>
        <div id="table22"  style="margin:0px auto;width: 507px;height:400px" v-show="expenditure"></div>
      </el-col>
    </el-row>
    <!-- 結束 -->

    <!-- 消课卡型级别开始 -->
    <el-row>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" :span="12"
              style="border:1px solid #c1c3c9;border-right: 0;border-bottom: 0">
         <div id="option" style="margin:40px 0 0 0;width: 507px;height:400px"></div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" :span="12" style="border:1px solid #c1c3c9;border-bottom: 0">
       <div style="text-align:center">
        <el-button @click="cardMethod"  size="medium" class="tableButton">卡型</el-button>
        <el-button  size="medium" @click="levelMethod" class="tableButton">级别</el-button>
      </div>
         <div id="table7" style="margin:0px auto;width: 507px;height:400px" v-show="cardType"></div>
        <div  id="table8" style="margin:0px auto;width: 507px;height:400px" v-show="levelType"></div>
      </el-col>
    </el-row>
    <!-- 结束 -->

    <!-- 小区 学校 年龄 性别开始 -->
     <el-row>
    
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" :span="12"    style="border:1px solid #c1c3c9;">
        <div style="text-align:center">
        <el-button @click="schoolMethod"  size="medium" class="tableButton">小区前10名</el-button>
        <el-button  size="medium" @click="villageMethod" class="tableButton">学校前10名</el-button>
        </div>
        <div id="table5" v-show="school" style="margin:0px auto;width: 507px;height:400px"></div>
         <div id="table6" v-show="village" style="margin:0px auto;width: 507px;height:400px"></div>
      </el-col>
       <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" :span="12" style="border:1px solid #c1c3c9;border-left:0;">
       <div style="text-align:center">
        <el-button @click="yearMethod"  size="medium" class="tableButton">年龄</el-button>
        <el-button  size="medium" @click="genderMethod" class="tableButton">性别</el-button>
       </div>
        <div id="table3" style="margin:0px auto;width: 507px;height:400px" v-show="year" ></div>
        <div id="table4" style="margin:0px auto;width: 507px;height:400px" v-show="gender"></div>
      </el-col>
    </el-row>
    <!-- 结束 -->

  </div>
</template>
<script>
  import axios from 'axios'
  import qs from 'qs'
  import echarts from 'echarts'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  export  default{
    components: {
      ElCol,
      ElRow
    },
    name: 'hello',
    data () {
      return {
        //tab状态
        cardType:true,//卡型
        levelType:false,//级别
        income:true,//收入
        expenditure:false,//支出
        village:false,//小区
        school:true,//学校
        gender:true,//性别
        year:false,//学校 
        //结束
        corporateName: '',
        departmentList: [],
        fireClassRank: [],
        fireClassDepartment: [],
        fireClassDepertmentId: [],
        sexRank: [],
        cardTypeName: [],
        cardTypeNumber: [],
        levelName: [],
        levelNumber: [],
        schoolName: [],
        schoolNumber: [],
        gardenName: [],
        gardenNumber: [],
        ageList: [],
        totalNumber: '',
        todayNews: '',
        monthNews: '',
        todayFireClassNumber: '',
        monthFireClassNumber: '',
        tochangeNumber: '',
        lossNumber: '',
        todayAttendanceNumber: '',
        todayPaidCount: '',
        monthPaidCount: '',
        todayExpend: '',
        monthExpend: '',
        todayIncome: '',
        monthIncome: '',
      }
    },
    mounted(){
      var that = this
      this.qwert();
      this.drawLines();
      
      this.drawLines2();
      this.drawLiness();
      this.drawLinessss();
      this.drawLinesssss();
      this.drawLinessssss();
      this.drawLinesssssss();
      var userData = qs.parse(sessionStorage.getItem("userData"));
      //请求综合数据
      var homePageCountData = {
        permissions_id:userData.permissions_id,
        company_serial: userData.company_serial,
      }
      var homePageCountParams = {
        methodUrl: 'homePage/homePageCount',
        jsonParam: qs.stringify(homePageCountData)
      }
      this.$axios.postRequest(homePageCountParams).then(function (res) {
        //成功之后处理逻辑
        that.totalNumber = res.data.user_num
        that.todayNews = res.data.new_enrolment_day
        that.monthNews = res.data.new_enrolment_month
        that.todayFireClassNumber = res.data.offset_course_day
        that.monthFireClassNumber = res.data.offset_course_month
        that.tochangeNumber = res.data.tocharge_num
        that.lossNumber = res.data.loss_month
        that.todayAttendanceNumber = res.data.attendance_num
        that.todayPaidCount = res.data.renew_day
        that.monthPaidCount = res.data.renew_month
        that.todayExpend = res.data.expend_day
        that.monthExpend = res.data.expend_month
        that.todayIncome = res.data.income_day
        that.monthIncome = res.data.income_month
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })


      //请求道馆消课排名数据
      var fireClassData = {
        orderBy: '1',
        company_serial: userData.company_serial,
      }
      var fireClassParams = {
        methodUrl: 'homePage/getFireClassRank',
        jsonParam: qs.stringify(fireClassData)
      }
      this.$axios.postRequest(fireClassParams).then(function (res) {
        //成功之后处理逻辑
        that.departmentList = res.data
        var fireClassArray = []
        var fireClassDepertmentArray = []
        var fireClassDepertmentIdArray = []
        for (var i = 0; i < res.data.length; i++) {
          fireClassArray.push(res.data[i].trueCount);
          fireClassDepertmentArray.push(res.data[i].department_name)
        }
        that.fireClassRank = fireClassArray
        that.fireClassDepartment = fireClassDepertmentArray
        that.fireClassDepertmentId = fireClassDepertmentIdArray
        that.drawLine()
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })
      //请求性别数据
      var sexData = {
        permissions_id: '1',
        company_serial: '10001',
      }
      var sexParams = {
        methodUrl: 'homePage/getSexRank',
        jsonParam: qs.stringify(sexData)
      }
      this.$axios.postRequest(sexParams).then(function (res) {
        //成功之后处理逻辑
        res.data.forEach(function (item, index, arr) {
          that.sexRank.push(
            {
              value: item.jcnt,
              name: item.student_sex
            }
          )
        })
        that.drawLinesss()
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })
      //请求年龄段分布图
      var ageGroupData = {
        company_serial: '10001',
        permissions_id: '1',
      }
      var ageGroupParams = {
        methodUrl: 'homePage/getAgeRank',
        jsonParam: qs.stringify(ageGroupData)
      }
      this.$axios.postRequest(ageGroupParams).then(function (res) {
        //成功之后处理逻辑
        var ageNumberArray = Array(res.data)
        var ageList = []
        ageList.push(res.data.num15)
        ageList.push(res.data.num69)
        ageList.push(res.data.num1013)
        ageList.push(res.data.num1417)
        ageList.push(res.data.num18)
        ageList.push(res.data.num0)
        that.ageList = ageList
        that.drawLiness()
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })
      //请求卡型图数据
      var cardTypeData = {
        permissions_id: '1',
        company_serial: '10001',
      }
      var cardTypeParams = {
        methodUrl: 'homePage/getCardTypeRank',
        jsonParam: qs.stringify(cardTypeData)
      }
      this.$axios.postRequest(cardTypeParams).then(function (res) {
        //成功之后处理逻辑
        var cardTypeNameArray = []
        var cardTypeNumberArray = []
        for (var i = 0; i < res.data.length; i++) {

          cardTypeNameArray.push(res.data[i].name);
          cardTypeNumberArray.push(res.data[i].jcnt)
        }
        that.cardTypeName = cardTypeNameArray
        that.cardTypeNumber = cardTypeNumberArray
        that.drawLinessssss()

        that.drawLiness()
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })
      //请求级别图数据
      var levelData = {
        permissions_id: '1',
        company_serial: '10001',
      }
      var levelParams = {
        methodUrl: 'homePage/getLevelRank',
        jsonParam: qs.stringify(levelData)
      }
      this.$axios.postRequest(levelParams).then(function (res) {
        //成功之后处理逻辑
        var levelNameArray = []
        var levelNumberArray = []
        for (var i = 0; i < res.data.length; i++) {

          levelNameArray.push(res.data[i].jName);
          levelNumberArray.push(res.data[i].jcnt)
        }
        that.levelName = levelNameArray
        that.levelNumber = levelNumberArray
        that.drawLinesssssss()


      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })
      //请求学校图数据
      var schoolData = {
        permissions_id: '1',
        company_serial: '10001',
      }
      var schoolParams = {
        methodUrl: 'homePage/getSchoolRank',
        jsonParam: qs.stringify(schoolData)
      }
      this.$axios.postRequest(schoolParams).then(function (res) {
        //成功之后处理逻辑
        var schoolNameArray = []
        var schoolNumberArray = []
        for (var i = 0; i < res.data.length; i++) {

          schoolNameArray.push(res.data[i].student_school);
          schoolNumberArray.push(res.data[i].jcnt)
        }
        that.schoolName = schoolNameArray
        that.schoolNumber = schoolNumberArray
        that.drawLinessss()


      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })
      //请求小区图数据
      var gardenData = {
        permissions_id:  userData.permissions_id,
        company_serial: userData.company_serial,
      }
      var gardenParams = {
        methodUrl: 'homePage/getHomeAddressRank',
        jsonParam: qs.stringify(gardenData)
      }
      this.$axios.postRequest(gardenParams).then(function (res) {
        //成功之后处理逻辑
        var gardenNameArray = []
        var gardenNumberArray = []
        for (var i = 0; i < res.data.length; i++) {

          gardenNameArray.push(res.data[i].student_address);
          gardenNumberArray.push(res.data[i].jcnt)
        }
        that.gardenName = gardenNameArray
        that.gardenNumber = gardenNumberArray
        that.drawLinesssss()
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })

      //请求公司名称
      var userData = qs.parse(sessionStorage.getItem("userData"));
      that.CorporateName = userData.company_name;
    },

    methods: {
      //显示卡型
       cardMethod(){
         
        this.cardType=true;
        this.levelType=false
      },
      //显示级别
       levelMethod(){
         
        this.levelType=true;
        this.cardType=false
      },
       //显示收入
      inComeMethod(){
         
        this.income=true;
        this.expenditure=false
      },
      //显示支出
      expendMethod(){
        
        this.income=false;
        this.expenditure=true
      
      },
      //显示学校
      villageMethod(){
          this.school=true;
        this.village=false
      },
      //西安市小区
      schoolMethod(){
        this.school=false;
        this.village=true
      },
      //显示年龄
      yearMethod(){
        this.gender=false;
        this.year=true
      },
       //显示性别
      genderMethod(){
        this.gender=true;
        this.year=false
      },
      //业绩图
      qwert(){
      let that=this
        let table13 = this.$echarts.init(document.getElementById('table13'))
        table13.setOption({
          title: {
            x: 'left',
            y:'3%',
            text: '业绩排名',
            textStyle:{fontSize:'16',margin:10}
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}:\n{c}'
          },
          toolbox: {
            show: true,
            // feature: {
            //   dataView: {show: true, readOnly: false},
            //   restore: {show: true},
            //   saveAsImage: {show: true}
            // }
          },
          calculable: true,
          grid: {
            borderWidth: 0,
            x2:0,
            y: 80,
            y2: 80
          },
          xAxis: [
            {
              axisTick:{
                show:false
              },
              type: 'category',
              data:['初家','幸福','西南河','新桥','马山寨','绿色家园','世贸'],
              axisLabel:{
                show: true,
                rotate:45,
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value}'
              },
              show: true
            }
          ],
          series: [
            {
              splitNumber:6,
              barWidth:30,
              name: '卡型',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: function(params) {
                    var colorList = [
                    
                      '#f1a346'
                    ];
                    return colorList[params.dataIndex]
                  }
                }
              },
             data:[67, 89, 52, 69, 96, 34, 135, 16, 32, 20, 64, 33], 
              // markPoint: {
              //   tooltip: {
              //     trigger: 'item',
              //     backgroundColor: 'rgba(0,0,0,0)',
              //     formatter: function(params){
              //       return '<img src="'
              //         + params.data.symbol.replace('image://', '')
              //         + '"/>';
              //     }
              //   },
              //   data: [
              //     {xAxis:0, y: 350, name:'4-14', symbolSize:20, symbol: 'image://../asset/ico/折线图.png'},
              //     {xAxis:1, y: 350, name:'15-24', symbolSize:20, symbol: 'image://../asset/ico/柱状图.png'},
              //     {xAxis:2, y: 350, name:'25-34', symbolSize:20, symbol: 'image://../asset/ico/散点图.png'},
              //     {xAxis:3, y: 350, name:'35-44', symbolSize:20, symbol: 'image://../asset/ico/K线图.png'},
              //   ]
              // }
            }
          ]
        });},
      //消课图
      drawLine(){
        let that=this
        let option = this.$echarts.init(document.getElementById('option'))
        option.setOption({
          title:{
            text:'　消课排名',
            y:'4%',
            x:'left',
           textStyle:{fontSize:'16'},
          },
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data:['',]
          },
          toolbox: {
            show : false,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},//数据视图
              magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},//图标切换
              restore : {show: false},//还原
              saveAsImage : {show: false}//下载
            }
          },
          calculable : true,
          xAxis : [
            {

              type : 'value',
            }
          ],
          yAxis : [
            {
              type : 'category',
              data : that.fireClassDepartment,
            }
          ],
          series : [
            {
              barWidth:80,
              name:'消课量',
              type:'bar',
              stack: '总量',
              textStyle: {fontSize:'12px'},
              itemStyle: { normal: {label : {show: true, position: 'insideRight',color:'red',},color:'orange',}},//样式
              data:that.fireClassRank,//数据
              // radius : '40%',//显示大小
            },
          ]
        });
        option.on('click', function (params) {
          var roomId=''
          var roomName= params.name
          for(var i=0;i<that.departmentList.length;i++){
            if(roomName==that.departmentList[i].department_name){
              roomId=that.departmentList[i].dep_parent_serial;
              break;
            }
          }
          that.$router.push({name: '24', params: {roomId:roomId}})
        })
      },
      //收入图
      drawLines(){
       
        let table2 = this.$echarts.init(document.getElementById('table2'))
        table2.setOption({
          title : {
            text: '本月收入',
            y:'3%',
            // subtext: '',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient : 'vertical',
            x : 'left',
            y:'3%',
            data:['新报','续费']//显示控制区
          },
          toolbox: {
            show : true,
            // feature : {
            //   mark : {show: true},
            //   dataView : {show: true, readOnly: false},
            //   magicType : {
            //     show: true,
            //     type: ['pie', 'funnel'],
            //     option: {
            //       funnel: {
            //         x: '50%',
            //         width: '50%',
            //         funnelAlign: 'left',
            //         max: 1548
            //       }
            //     }
            //   },
            //   restore : {show: true},
            //   saveAsImage : {show: true}
            // }
          },
          calculable : true,
          series : [
            {
              name:'',
              type:'pie',
              radius : '50%',//显示大小
              center: ['50%', '60%'],//左右上下位置
              data:[

                {value:310, name:'新报'},
                {value:234, name:'续费'},
              ]//数据
            }

          ],
          color:['#FACD32','#FFF001']
        });
      },
        //支出图
      drawLines2(){
        
        let table22 = this.$echarts.init(document.getElementById('table22'))
        table22.setOption({
          title : {
            text: '本月支出',
            y:'3%',
            // subtext: '',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient : 'vertical',
            x : 'left',
            y:'3%',
            data:['工资支出','报销']//显示控制区
          },
          toolbox: {
            show : true,
            // feature : {
            //   mark : {show: true},
            //   dataView : {show: true, readOnly: false},
            //   magicType : {
            //     show: true,
            //     type: ['pie', 'funnel'],
            //     option: {
            //       funnel: {
            //         x: '50%',
            //         width: '50%',
            //         funnelAlign: 'left',
            //         max: 1548
            //       }
            //     }
            //   },
            //   restore : {show: true},
            //   saveAsImage : {show: true}
            // }
          },
          calculable : true,
          series : [
            {
              name:'',
              type:'pie',
              radius : '50%',//显示大小
              center: ['50%', '60%'],//左右上下位置
              data:[

             
                {value:135, name:'工资支出'},
                {value:1548, name:'报销'}
              ]//数据
            }

          ],
          color:['#2696A9','#90C131']
        });
      },
      //年龄分布图
      drawLiness(){
        let that=this
        let table3 = this.$echarts.init(document.getElementById('table3'))
        table3.setOption({
          title : {
            text: '年龄分布图',
            y:'3%',
            x:'center'
//            subtext: 'From ExcelHome',
//            sublink: 'http://e.weibo.com/1341556070/AizJXrAEa'
          },
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          legend: {
            selectedMode:false,
            data:[]
          },
          toolbox: {
            show : false,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          grid: {
            borderWidth: 0,
            y: 80,
            y2: 80
          },
          calculable : true,
          xAxis : [
            {
              show : true,
              type : 'category',
              data : ['5岁以下','6`9岁','10`13岁','14`17岁','18岁以上','其他']
            }
            
          ],
          yAxis : [
            {
              type : 'value',
              boundaryGap:[0,0.1]
            }
          ],
          series : [
            {
              barWidth:30,
              name:'人数',
              type:'bar',
              stack: 'sum',
              barCategoryGap: '50%',
              itemStyle: {
                // normal: {
                //   color: 'tomato',
                //   barBorderColor: 'tomato',
                //   barBorderWidth: 6,
                //   barBorderRadius:0,
                //   label : {
                //     show: true, position: 'insideTop'
                //   }
                // }
              },
              data:that.ageList
            },

          ],
          color:['#FACD32']
        });
      },
      //性别分布图
      drawLinesss(){
        let that=this
        let table4 = this.$echarts.init(document.getElementById('table4'))
        table4.setOption({
          title:{
            text:'性别分布',
            y:'3%',
            x:'center'

          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient : 'vertical',
            x : 'left',
            y:'3%',
            data:['男','女']
          },
          series : [
            {
              name:'性别分布',
              type:'pie',
              radius : ['50%', '70%'],
              avoidLabelOverlap: false,
              label : {
                normal : {
                  show : false,
                  position:'center'
                },
                emphasis : {
                  show : true,
                  textStyle : {
                    fontSize : '30',
                    fontWeight : 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:that.sexRank
            }
          ],
          color:['#FD8270','#2CB3C9']
        });
      },
      //学校分布图
      drawLinessss(){
        let that=this
        let table5 = this.$echarts.init(document.getElementById('table5'))
        table5.setOption({
          title: {
            x: 'center',
            y:'3%',
            text: '会员所在学校前10名',
          },
          tooltip: {
            trigger: 'item'
          },
          toolbox: {
            show: true,
            // feature: {
            //   dataView: {show: true, readOnly: false},
            //   restore: {show: true},
            //   saveAsImage: {show: true}
            // }
          },
          calculable: true,
          grid: {
            borderWidth: 0,
            y: 60,
            y2: 80
          },
          xAxis: [
            {
              type: 'category',
              // show: false,
              data: that.schoolName,
              axisLabel: {
                interval:0,
                rotate:45
              },
            }
          ],
          yAxis: [
            {
              type: 'value',
              show: false
            }
          ],
          series: [
            {
              name: '',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: function(params) {
                    // build a color map as your need.
                    var colorList = [
                      '#2696A9',
                      '#FD8270',
                      '#91C232',
                      '#FBCD32',
                      '#2DB4CA',
                      '#FD8270',
                      '#FBCD32',
                      '#2BB2C8',
                      '#90C131',
                      '#FBCD32'
                    ];
                    return colorList[params.dataIndex];

                  }
                }
              },
              data: that.schoolNumber,
              markPoint: {
                tooltip: {
                  trigger: 'item',
                  backgroundColor: 'rgba(0,0,0,0)',
                  formatter: function(params){
                    return '<img src="'
                      + params.data.symbol.replace('image://', '')
                      + '"/>';
                  }
                }
              }
            }
          ]
        });
      },
      //小区分布图
      drawLinesssss(){
        let that =this
        let table6 = this.$echarts.init(document.getElementById('table6'))
        table6.setOption({
          title: {
            x: 'center',
            y:'3%',
            text: '会员所在小区前10名',
          },
          tooltip: {
            trigger: 'item'
          },
          toolbox: {
            show: true,
            // feature: {
            //   dataView: {show: true, readOnly: false},
            //   restore: {show: true},
            //   saveAsImage: {show: true}
            // }
          },
          calculable: true,
          grid: {
            borderWidth: 0,
            y: 80,
            y2: 80
          },
          xAxis: [
            {
              type: 'category',
              show: true,
              data:that.gardenName,
              axisLabel: {
                interval: 0,
                rotate:45
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              show: false
            }
          ],
          series: [
            {
              name: '',
              type: 'bar',
              radius : '55%',
              itemStyle: {
                normal: {
                  color: function(params) {
                    // build a color map as your need.
                    var colorList = [
                      '#FD8070',
                      '#B5C141',
                      '#FBCD32',
                      '#2CB3C9',
                      '#2795A9',
                      '#FC8567',
                      '#9CCA68',
                      '#2BB2C8',
                      '#F2A346',
                      '#2795A9'
                    ];
                    return colorList[params.dataIndex]
                  }
                }
              },
              data:that.gardenNumber,
              markPoint: {
                tooltip: {
                  trigger: 'item',
                  backgroundColor: 'rgba(0,0,0,0)',
                  formatter: function(params){
                    return '<img src="'
                      + params.data.symbol.replace('image://', '')
                      + '"/>';
                  }
                }
              }
            }
          ]
        });
      },
      //卡型分布图
      drawLinessssss(){
        let that=this
        let table7 = this.$echarts.init(document.getElementById('table7'))
        table7.setOption({
          title: {
            x: 'center',
            y:'3%',
            text: '卡型分布图',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}:\n{c}'
          },
          toolbox: {
            show: true,
            // feature: {
            //   dataView: {show: true, readOnly: false},
            //   restore: {show: true},
            //   saveAsImage: {show: true}
            // }
          },
          calculable: true,
          grid: {
            borderWidth: 0,
            x2:0,
            y: 80,
            y2: 80
          },
          xAxis: [
            {
              axisTick:{
                show:false
              },
              type: 'category',
              data:that.cardTypeName,
              axisLabel:{
                show: true,
                rotate:45,
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value}'
              },
              show: true
            }
          ],
          series: [
            {
              splitNumber:6,
              barWidth:30,
              name: '卡型',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: function(params) {
                    var colorList = [
                      '#FD8270','#B5C141','#FACD32','#E67C32','#269BA9',
                      '#FC8567'
                    ];
                    return colorList[params.dataIndex]
                  }
                }
              },
              data:that.cardTypeNumber,
              // markPoint: {
              //   tooltip: {
              //     trigger: 'item',
              //     backgroundColor: 'rgba(0,0,0,0)',
              //     formatter: function(params){
              //       return '<img src="'
              //         + params.data.symbol.replace('image://', '')
              //         + '"/>';
              //     }
              //   },
              //   data: [
              //     {xAxis:0, y: 350, name:'4-14', symbolSize:20, symbol: 'image://../asset/ico/折线图.png'},
              //     {xAxis:1, y: 350, name:'15-24', symbolSize:20, symbol: 'image://../asset/ico/柱状图.png'},
              //     {xAxis:2, y: 350, name:'25-34', symbolSize:20, symbol: 'image://../asset/ico/散点图.png'},
              //     {xAxis:3, y: 350, name:'35-44', symbolSize:20, symbol: 'image://../asset/ico/K线图.png'},
              //   ]
              // }
            }
          ]
        });
      },
      //级别分布图
      drawLinesssssss(){
        let that=this
        let table8 = this.$echarts.init(document.getElementById('table8'))
        table8.setOption({
          title: {
            text: "级别分布图",
            y:'3%',
            x: "center"
          },
          grid: {
            borderWidth: 0,
            y: 80,
            x: 80
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}:{c}"
          },
          legend: {
            x: 'left',
            data: ["2的指数",]
          },
          xAxis: [
            {
              type: "category",
              name: "x",

              splitLine: {show: false},
              data: that.levelName
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "y"
            }
          ],
          toolbox: {
            show: true,
            // feature: {
            //   mark: {
            //     show: true
            //   },
            //   dataView: {
            //     show: true,
            //     readOnly: true
            //   },
            //   restore: {
            //     show: true
            //   },
            //   saveAsImage: {
            //     show: true
            //   }
            // }
          },
          // calculable: true,
          series: [
            {
              name: "人数",
              type: "line",
              data:that.levelNumber

            }
          ],
          color:['#BE3432']
        });
      },
    }
  }
</script>
<style scoped>
  .border {
    border: 1px solid #d0d0d0;
  }

  .borders {
    border: 1px solid #d0d0d0;
    border-left: none;
  }

  .number {

    font-size: 26px;
    color: #e51c23;
    font-weight: 300;
    margin: 0;
    padding: 0;
    text-align: left;
  }

  /*img{*/
  /*margin-left: 30px;*/
  /*}*/
  .statisticalData {
    border: 1px solid #c1c3c9;
    border-bottom: 0;
    padding: 30px;


  }



  /*数字下的标题*/
  .titleContent {
    font-size: 12px;
    color: black;
  }

  /*tab按钮样式*/
  .tableButton{
    margin-top: 15px;
    font-weight: 600;
    width: 175px
    
  }
  /*覆盖的样式*/
  .el-button:active {
    color: black !important;
    border-color: #dcdfe6 !important;
    outline: 0 !important;
}
.el-button:focus, .el-button:hover {
    color: black !important;
    border-color: #dcdfe6 !important;
    background-color: #DEDEDE !important;
}
.el-button+.el-button {
    margin:0 !important;
}
</style>
