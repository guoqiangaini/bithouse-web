<template>
  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="题库统计" name="first">
      <div class="wai">
        <ul>
          <span>级别</span>
          <el-select v-model="value" placeholder="请选择" class="select" size="mini">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </ul>
        <ul>
          <span class="demonstration">时间段</span>
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
            :default-time="['12:00:00']">
          </el-date-picker>
        </ul>
        <ul>
          <el-button size="small" type="info">查询</el-button>
          <el-button size="small" type="info">修改</el-button>
          <el-button size="small" type="info">删除</el-button>
          <el-button size="small" type="info">导入</el-button>
          <el-button size="small" type="info">导出</el-button>
          <el-button size="small" type="info" @click="dialogVisible = true">新增题库</el-button>
        </ul>
      </div>
      <el-dialog
        title="新增题库"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="80px">

          <el-form-item label="等级选择">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目" >
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="答案" >
            <el-row>
              <el-col :span="10" style="margin: 10px 0 10px 0">
                <el-form-item label="A">
                <el-input v-model="form.name" ></el-input>
              </el-form-item>
              </el-col>
              <el-col :span="10" style="margin: 10px 0 10px 0">
                <el-form-item label="B">
                  <el-input v-model="form.name" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin: 10px 0 10px 0"  >
                <el-form-item label="C">
                  <el-input v-model="form.name" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="D" style="margin: 10px 0 10px 0">
                  <el-input v-model="form.name" ></el-input>
                </el-form-item>`
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="正确答案">
            <el-input v-model="form.name" style="width: 60%"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" class="btn">保存</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">

  </span>
      </el-dialog>
      <el-table
        ref="multipleTable"
        :data="tableData1"
        border
        header-align="center"
        tooltip-effect="dark"
        style="width: 100%; "
        @selection-change="handleSelectionChange" >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="number"
          label="序号"
          width="100">

        </el-table-column>
        <el-table-column
          prop="level"
          label="级别"
          width="140">
        </el-table-column>
        <el-table-column
          prop="subject"
          label="题目"
          width="720">
        </el-table-column>
        <el-table-column
            prop="inputTime"
          label="录入日期"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>

    </el-tab-pane>
    <el-tab-pane label="训练方法" name="second">
      <div class="wai">
        <ul>
          <span>级别</span>
          <el-select v-model="value2" placeholder="请选择" class="select" size="mini">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </ul>
        <ul>
          <span class="demonstration">时间段</span>
          <el-date-picker
            v-model="value3"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
            :default-time="['12:00:00']">
          </el-date-picker>
        </ul>
        <ul>
          <el-button size="small" type="info">查询</el-button>
          <el-button size="small" type="info">修改</el-button>
          <el-button size="small" type="info">删除</el-button>
          <el-button size="small" type="info">导入</el-button>
          <el-button size="small" type="info">导出</el-button>
          <el-button size="small" type="info" @click="dialogVisible2= true">新增</el-button>
        </ul>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible2"
        width="30%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
  </span>
      </el-dialog>

      <el-table
        ref="multipleTable"
        :data="tableData2"
        border
        header-align="center"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="number"
          label="序号"
          width="100">

        </el-table-column>
        <el-table-column
          prop="level"
          label="级别"
          width="140">
        </el-table-column>
        <el-table-column
          prop="trainMethod"
          label="训练方法"
          width="720">
        </el-table-column>
        <el-table-column
          prop="inputTime"
          label="录入日期"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>

    </el-tab-pane>
    <el-tab-pane label="教案统计" name="third">
      <div class="wai">
        <ul>
          <span>道馆</span>
          <el-select v-model="value4" placeholder="请选择" class="select" size="mini">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </ul>
        <ul>
          <span>班级</span>
          <el-select v-model="value5" placeholder="请选择" class="select" size="mini">
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </ul>
        <ul>
          <span>教练</span>
          <el-select v-model="value6" placeholder="请选择" class="select" size="mini">
            <el-option
              v-for="item in options5"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </ul>
        <ul>
          <span class="demonstration">时间段</span>
          <el-date-picker
            v-model="value7"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
            :default-time="['12:00:00']">
          </el-date-picker>
        </ul>
        <ul>
          <el-button size="small" type="info">查询</el-button>
        </ul>
      </div>

      <el-table
        ref="multipleTable"
        :data="tableData3"
        border
        header-align="center"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="number"
          label="序号"
          >

        </el-table-column>
        <el-table-column
          prop="roadMuseum"
          label="道馆"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="classes"
          label="班级"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="coach"
          label="教练"
          align="center"
         >
        </el-table-column>
        <el-table-column
          prop="teachingPlan"
          label="教案"
          width="600"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="inputTime"
          label="录入日期"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </el-tab-pane>

  </el-tabs>
</template>
<script>
  import {mapState} from 'vuex'
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {ElCol},
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        dialogVisible: false,
        dialogVisible2: false,
        activeName2: 'first',
        options1: [
          {
            value: '选项1',
            label: '全部'
          },
          {
            value: '选项2',
            label: '白带'
          },
          {
            value: '选项3',
            label: '白黄带'
          },
          {
            value: '选项3',
            label: '白黄带'
          },
          {
            value: '选项4',
            label: '黄带'
          },
          {
            value: '选项5',
            label: '黄绿带'
          },
          {
            value: '选项6',
            label: '绿带'
          },
        ],//级别 tab1
        options2: [
          {
            value: '选项1',
            label: '全部'
          },
          {
            value: '选项2',
            label: '白带'
          },
          {
            value: '选项3',
            label: '白黄带'
          },
          {
            value: '选项3',
            label: '白黄带'
          },
          {
            value: '选项4',
            label: '黄带'
          },
          {
            value: '选项5',
            label: '黄绿带'
          },
          {
            value: '选项6',
            label: '绿带'
          },
        ],//级别 tab2
        options3: [
          {
            value: '选项1',
            label: '全部'
          },
          {
            value: '选项2',
            label: '西南河'
          },
          {
            value: '选项3',
            label: '新桥'
          },

        ],//道馆 tab3
        options4: [
          {
            value: '选项1',
            label: '全部 3000人'
          },
          {
            value: '选项2',
            label: '少儿班 300人'
          },
          {
            value: '选项3',
            label: '幼儿班 2000人'
          },
          {
            value: '选项3',
            label: '成人班 700人'
          },
          {
            value: '选项4',
            label: '黄带'
          },
          {
            value: '选项5',
            label: '黄绿带'
          },
          {
            value: '选项6',
            label: '绿带'
          },
        ],//班级 tab3
        options5: [
          {
            value: '选项1',
            label: '华晨宇'
          },
          {
            value: '选项2',
            label: '汪苏泷'
          },

        ],//教练 tab3
        options6: [
          {
            value: '选项1',
            label: '1'
          },
          {
            value: '选项2',
            label: '2'
          },
          {
            value: '选项3',
            label: '3'
          },
        ],//等级选择 Diglog1

        value:'',
        value1:'',
        value2:'',
        value3:'',
        value4:'',
        value5:'',
        value6:'',
        value7:'',
        value8:'',
        tableData1: [
            {
          number: '1',
          level: '黄带',
          subject: '。。。。。。',
          inputTime:'2018.03.01'
        },
          {
            number: '2',
            level: '黄绿带',
            subject: '。。。。。。',
            inputTime:'2018.03.01'
          },
        ],//题库统计表
        multipleSelection: [],
        tableData2: [
          {
            number: '1',
            level: '黄带',
            trainMethod: '。。。。。。',
            inputTime:'2018.03.01'
          },
          {
            number: '2',
            level: '黄绿带',
            trainMethod: '。。。。。。',
            inputTime:'2018.03.01'
          },
          {
            number: '2',
            level: '黄绿带',
            trainMethod: '。。。。。。',
            inputTime:'2018.03.01'
          },
          {
            number: '2',
            level: '黄绿带',
            trainMethod: '。。。。。。',
            inputTime:'2018.03.01'
          },
          {
            number: '2',
            level: '黄绿带',
            trainMethod: '。。。。。。',
            inputTime:'2018.03.01'
          },
          {
            number: '2',
            level: '黄绿带',
            trainMethod: '。。。。。。',
            inputTime:'2018.03.01'
          },

        ],//训练方法表
        tableData3:[
          {
              number:'1',
              roadMuseum:'西南河',
              classes:'少儿班',
              coach:'华晨宇',
              teachingPlan:'......',
              inputTime:'2018.03.01'
          },
        ],//教案统计表
      }

    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      onSubmit() {
        console.log('submit!');
        this.dialogVisible = false;
      }

    },
    computed: {

      options1(){
        return this.$store.state.options1;
      },//级别 tab1

      options2(){
        return this.$store.state.options2;
      },//级别 tab2

      options3(){
        return this.$store.state.options3;
      },//道馆 tab3
      options4(){
        return this.$store.state.options4;
      },//
      options5(){
        return this.$store.state.options5;
      },//道馆
      options6(){
        return this.$store.state.options6;
      },//道馆

      fireClass(){
        return this.$store.state.fireClass;
      },//消课表
    },
  };
</script>
<style scoped>
  .select{
    width: 100px;
  }
  .wai ul{
    float: left;
    margin: 10px 0 10px 20px;
  }
  .block{
    margin: 20px 0 0 850px;
  }
.btn{
  text-align: center;
  margin: 30px 50px 0 200px;
}
</style>
