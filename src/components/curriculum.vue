<template>
  <div>
    <v-contextmenu ref="contextmenu" :theme="theme">
      <v-contextmenu-item @click="handleClick">设置</v-contextmenu-item>
      <v-contextmenu-item divider></v-contextmenu-item>
      <v-contextmenu-item @click="handleClick">取消</v-contextmenu-item>
      <!--<v-contextmenu-item divider></v-contextmenu-item>-->
      <!--<v-contextmenu-item>调整</v-contextmenu-item>-->
    </v-contextmenu>
    <v-contextmenu ref="contextmenu2" :theme="theme">
      <v-contextmenu-item>确认调课</v-contextmenu-item>
    </v-contextmenu>
    <el-row>
      <el-col :span="15">
        <div class="leftBd">
          <div class="tableBd">
            <table  cellspacing="0" cellpadding="0" class="tb" >
              <thead style="background-color:lightgray" >
              <th>节次</th>
              <th>周一</th>
              <th>周二</th>
              <th>周三</th>
              <th>周四</th>
              <th>周五</th>
              <th>周六</th>
              <th>周日</th>
              </thead>
              <tbody>
              <tr v-for="(king,index) in courses">
                <td >{{index+1}}</td>
                <td v-for="(item,jindex) in courses[index]" @contextmenu="showMenu(index)">{{item.value}}</td>
              </tr>
              </tbody>
            </table>
            <el-dialog title="课程调整" :visible.sync="dialogVisible4" width="40%" :before-close="handleClose">
              <div>
                <ul class="adjust">
                  <span>所在道馆</span>
                  <el-input v-model="input" placeholder="请输入内容" style="width: 30%"></el-input>
                  <span>→</span>
                  <el-select v-model="value5" placeholder="请选择">
                    <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </ul>
                <ul class="adjust">
                  <span>关联教练</span>
                  <el-input v-model="input" placeholder="请输入内容" style="width: 30%"></el-input>
                  <span>→</span>
                  <el-select v-model="value5" placeholder="请选择">
                    <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </ul>
                <ul class="adjust">
                  <span>关联老师</span>
                  <el-input v-model="input" placeholder="请输入内容" style="width: 30%"></el-input>
                  <span>→</span>
                  <el-select v-model="value5" placeholder="请选择">
                    <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </ul>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4 = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible4 = false">提交</el-button>

              </span>
            </el-dialog>
          </div>

          <div class="screen">

            <el-row>
              <el-col :span="7">

                <el-col :span="6" class="size">
                  <span>星期：</span>
                </el-col>
                <el-col :span="12">
                  <el-select v-model="value" placeholder="请选择" class="selectBs">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>

              </el-col>
              <el-col :span="7">

                <el-col :span="6" class="size">
                  <span>节次：</span>
                </el-col>
                <el-col :span="12">
                  <el-select v-model="value2" placeholder="请选择" class="selectBs">
                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>

              </el-col>
              <el-col :span="7">

                <el-col :span="6" class="size">
                  <span>教练：</span>
                </el-col>
                <el-col :span="12">
                  <el-select v-model="value3" placeholder="请选择" class="selectBs">
                    <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>

              </el-col>
              <el-col :span="3">
                <ul>
                  <el-button size="small">查询</el-button>
                </ul>
              </el-col>
            </el-row>

          </div>

          <div>
            <el-table :data="tableData2" border style="width: 641px">
              <el-table-column align="center" fixed prop="week" label="星期" width="80">
              </el-table-column>
              <el-table-column align="center" prop="classTime" label="上课时间" width="120">
              </el-table-column>
              <el-table-column align="center" prop="museum" label="道馆" width="100">
              </el-table-column>
              <el-table-column align="center" prop="teacher" label="教师姓名" width="90">
              </el-table-column>
              <el-table-column align="center" prop="classes" label="班级" width="90">
              </el-table-column>
              <el-table-column align="center" prop="people" label="人数" width="80">
              </el-table-column>
              <el-table-column align="center" fixed="right" label="名单">
                <template slot-scope="scope">

                  <el-button type="text" size="small" @click="dialogVisible3 = true">详情</el-button>

                </template>

              </el-table-column>
            </el-table>
            <el-dialog title="新增上课时间" :visible.sync="dialogVisible3" width="40%" :before-close="handleClose">
              <div>
                <el-transfer :titles="['本节课程名单', '会员名单']" v-model="value22" :data="data2">
                </el-transfer>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible3 = false">提交</el-button>
                <el-button type="success" @click="dialogVisible3 = false">继续添加</el-button>
              </span>
            </el-dialog>
          </div>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="rightBd">
          <div class="tableRbd">
            <el-row class="classTime">
              <el-col :span="18">设置上课时间</el-col>
              <el-col :span="6">
                <el-button @click="dialogVisible = true">新增</el-button>
              </el-col>
              <el-dialog title="新增上课时间" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
                <div>
                  <table></table>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible = false">提交</el-button>
                  <el-button type="success" @click="dialogVisible = false">继续添加</el-button>
                </span>
              </el-dialog>
            </el-row>
            <el-table :data="schooltime" border style="width: 321px">
              <el-table-column prop="section" label="节次" width="100">
              </el-table-column>
              <el-table-column prop="classTime" label="上课时间" width="140">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="60">
                <template slot-scope="scope">
                  <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

          </div>
          <div class="tableRbds">
            <el-row class="classInfo">
              <el-col :span="18">设置课程信息</el-col>
              <el-col :span="6">
                <el-button @click="dialogVisible2 = true">新增</el-button>
              </el-col>
              <el-dialog title="新增上课时间" :visible.sync="dialogVisible2" width="40%" :before-close="handleClose">
                <div>
                  <el-row>
                    <el-col :span="12">
                      <el-input v-model="input" placeholder="课程名称" style="width: 85%"></el-input>
                    </el-col>
                    <el-col :span="12">
                      <el-select v-model="value4" placeholder="每周上课次数">
                        <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>

                  </el-row>

                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible2 = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible2 = false">提交</el-button>
                  <el-button type="success" @click="dialogVisible2 = false">继续添加</el-button>
                </span>
              </el-dialog>
            </el-row>
            <el-table :data="tableData4" border style="width: 321px">
              <el-table-column prop="className" label="课程名称" width="100">
              </el-table-column>
              <el-table-column prop="Number" label="每周上课次数" width="140">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="60">
                <template slot-scope="scope">
                  <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

          </div>

        </div>
      </el-col>
    </el-row>

  </div>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  import qs from 'qs'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";

  export default {
    components: {
      ElCol,
      ElRow,
      ElButton
    },
    name: 'apps',
    data() {
      const generateData2 = _ => {
        const data = [];
        const cities = ['华晨宇', '华晨宇', '华晨宇', '华晨宇', '华晨宇', '华晨宇', '华晨宇',];
        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index]
          });
        });
        return data;
      };
      return {
        coursePositionX:'',
        coursePositionY:'',
        dest:[],
        // contextmenu data (菜单数据)
        contextMenuData: {
          // the contextmenu name(@1.4.1 updated)
          menuName: 'demo',
          // The coordinates of the display(菜单显示的位置)
          axios: {
            x: null,
            y: null
          },
          // Menu options (菜单选项)
          menulists: [
            {
              fnHandler: 'savedata', // Binding events(绑定事件)
              // icoName: 'fa fa-home fa-fw', // icon (icon图标 )
              btnName: 'Save' // The name of the menu option (菜单名称)
            },
            {
              fnHandler: 'newdata',
              // icoName: 'fa fa-home fa-fw',
              btnName: 'New'
            }
          ]
        },
        king: '',
        data2: generateData2(),
        value22: [],
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        },
        dialogVisible: false,
        dialogVisible2: false,
        dialogVisible3: false,
        dialogVisible4: false,
        options: [
          {
            value: '选项1',
            label: '1'
          },
          {
            value: '选项2',
            label: '2',
            disabled: true
          },
          {
            value: '选项3',
            label: '3'
          },
          {
            value: '选项4',
            label: '4'
          },
          {
            value: '选项5',
            label: '5'
          }],
        value: '',
        options2: [
          {
            value: '选项1',
            label: '1'
          },
          {
            value: '选项2',
            label: '2',
            disabled: true
          },
          {
            value: '选项3',
            label: '3'
          },
          {
            value: '选项4',
            label: '4'
          },
          {
            value: '选项5',
            label: '5'
          }],
        value2: '',
        options3: [
          {
            value: '选项1',
            label: '1'
          },
          {
            value: '选项2',
            label: '2',
            disabled: true
          },
          {
            value: '选项3',
            label: '3'
          },
          {
            value: '选项4',
            label: '4'
          },
          {
            value: '选项5',
            label: '5'
          }],
        value3: '',
        options4: [
          {
            value: '选项1',
            label: '每周1次'
          },
          {
            value: '选项2',
            label: '每周2次',
            disabled: true
          },
          {
            value: '选项3',
            label: '不限定上课次数'
          },
        ],
        value4: '',
        options5: [
          {
            value: '选项1',
            label: '每周1次'
          },
          {
            value: '选项2',
            label: '每周2次',
            disabled: true
          },
          {
            value: '选项3',
            label: '不限定上课次数'
          },
        ],
        value5: '',
        tableData1: [
          {
            sections: '1',
            staturday: '√',
            sunday: '√',
            monday: '√',
            tuesday: '√',
            wednesday: '√',
            thursday: '√',
            friday: '√',
          },
          {
            sections: '2',
            staturday: '√',
            sunday: '√',
            monday: '√',
            tuesday: '√',
            wednesday: '√',
            thursday: '√',
            friday: '',
          },
          {
            sections: '3',
            staturday: '',
            sunday: '',
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '√',
            friday: '√',
          },
          {
            sections: '4',
            staturday: '',
            sunday: '',
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '√',
            friday: '',
          },
          {
            sections: '5',
            staturday: '',
            sunday: '',
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '√',
            friday: '',
          },
          {
            sections: '6',
            staturday: '',
            sunday: '',
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '√',
            friday: '',
          },

        ],
        tableData2: [
          {
            week: '星期一',
            classTime: '08:30~09:00',
            museum: '西南河馆',
            teacher: '帝释天',
            classes: '幼儿班',
            people: 10
          },
          {
            week: '星期二',
            classTime: '08:30~09:00',
            museum: '西南河馆',
            teacher: '帝释天',
            classes: '幼儿班',
            people: 10
          },
          {
            week: '星期三',
            classTime: '08:30~09:00',
            museum: '西南河馆',
            teacher: '帝释天',
            classes: '幼儿班',
            people: 10
          },
          {
            week: '星期四',
            classTime: '08:30~09:00',
            museum: '西南河馆',
            teacher: '帝释天',
            classes: '幼儿班',
            people: 10
          },
          {
            week: '星期五',
            classTime: '08:30~09:00',
            museum: '西南河馆',
            teacher: '帝释天',
            classes: '幼儿班',
            people: 10
          },
          {
            week: '星期六',
            classTime: '08:30~09:00',
            museum: '西南河馆',
            teacher: '帝释天',
            classes: '幼儿班',
            people: 10
          },
        ],
        tableData3: [
          {
            section: '1',
            classTime: '08:30~09:50',

          },
          {
            section: '2',
            classTime: '10:30~11:50',

          },
          {
            section: '3',
            classTime: '13:30~14:50',

          },
          {
            section: '4',
            classTime: '15:30~16:50',

          },
          {
            section: '5',
            classTime: '17:00~18:20',

          },
          {
            section: '6',
            classTime: '19:00~20:20',

          },
        ],
        tableData4: [
          {
            className: '精品课程',
            Number: '1次/周',

          },
          {
            className: '强化课程',
            Number: '2次/周',

          },
          {
            className: '高手会课程',
            Number: '不限定上课次数',

          },
        ],
        courses: [],
      }

    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      showMenu(index,jindex) {
        this.coursePositionX = index
        this.coursePositionY = jindex
        console.log(index)
        var rowTable = this.tableData1[index]
        Vue.set(this.tableData1, 0, rowTable)
        console.log('-------1-------')
        console.log(rowTable)
        console.log('-------2-------')
        this.friday = index
        event.preventDefault()
        var x = event.clientX;
        var y = event.clientY;
        // Get the current location
        this.contextMenuData.axios = {
          x, y
        }
        // const targetDimensions = this.$refs.box.getBoundingClientRect()
        const postition = {
          top: y,
          left: x,
        }
        this.$refs.contextmenu.show(postition)
        console.log('-------3-------' + x + '====' + y)
      },
      handleClick (vm, event) {

        if(vm.$slots.default[0].text=='设置'){
          alert(`「${vm.$slots.default[0].text}」被点击啦！`)
        }
      },
      savedata() {
        document.getElementById('index').value = '1234';
      },
      newdata() {
        console.log('newdata!')
      },

    },
    computed() {
      var map = {}
      for (var i = 0; i < this.courses.length; i++) {
        var ai = this.courses[i];
        if (!map[ai.jday]) {
          this.dest.push({
            jdy: ai.jdy,
            jtime_xh: ai.jtime_xh,
            data: [ai]
          });
          map[ai.jday] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj.jday == ai.jday) {
              dj.data.push(ai);
              break;
            }
          }
        }
      }
      console.log(dest);
    },
    mounted() {
      //加载课程信息
      var that = this
      var courseData = {

        regserial: this.$store.state.regserial,
      }
      var courseParams = {
        methodUrl: 'courseManagement/courseSection',
        jsonParam: qs.stringify(courseData)
      }
      this.$axios.postRequest(courseParams).then(function (res) {
        //成功之后处理逻辑
        // that.courses = res.data
        var num = 7;//每个子数组里的元素个数
        var arr = res.data
        var Arr = new Array(Math.ceil(arr.length/num));
        for(var i = 0; i<Arr.length;i++){
          Arr[i] = new Array();
          for(var j = 0; j<num; j++){
            Arr[i][j] = '';
          }
        }
        for(var i = 0; i<arr.length;i++){
          if(arr[i].jstatus==1){
            arr[i].value = '√'
          }else{
            arr[i].value = ''
          }
          console.log(arr[i])
          Arr[parseInt(i/num)][i%num] = arr[i];

        }
        that.courses = Arr
        console.log(Arr)
      }, function (res) {
        //失败之后处理逻辑
        console.log("error:" + res)
      })
    },

  }
</script>
<style scoped>
  .menuBg {
    /* width:30px; */
    background-color: white;
  }

  .leftBd {
    border: 1px solid #bbbbbb;;
    margin: 20px;
    padding: 20px;
    width: 680px;
  }

  .tableBd {
    margin-bottom: 50px;
    border: 1px solid #bbbbbb;
    width: 641px;
  }

  .selectBs {
    width: 118px;
    height: 23px;
  }

  .size {
    margin: 10px 0 0 0;
    color: #101010;
    font-size: 14px;
  }

  .screen {
    margin: 10px 0 20px 0;
  }

  .tableRbd {
    border: 1px solid #bbbbbb;
    width: 321px;
  }

  .rightBd {
    border: 1px solid #bbbbbb;;
    margin: 20px;
    padding: 20px;
    width: 331px;
  }

  .classTime {
    margin: 10px;
  }

  .classInfo {
    margin: 10px;
  }

  .tableRbds {
    border: 1px solid #bbbbbb;
    width: 321px;
    margin-top: 20px;
    margin-bottom: 35px;
  }

  .adjust {
    margin: 10px 0 10px 0;
  }

  .tb th {
    width: 80px;
    height: 40px;
    border: 0.5px solid gainsboro;
  }

  .tb td {
    width: 80px;
    height: 40px;
    border: 0.5px solid gainsboro;
    text-align: center;
  }
</style>
