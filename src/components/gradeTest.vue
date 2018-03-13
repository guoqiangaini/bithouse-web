<template>
  <div >
    <div >
      <div class="wai">
      <ul>
        <span class="demonstration">时间段</span>
        <el-date-picker
          v-model="value5"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
          :default-time="['12:00:00']">
        </el-date-picker>
      </ul>
      <ul>
        <span>姓名</span>
        <el-input v-model="input" placeholder="请输入内容" class="input" size="small"></el-input>
      </ul>

      <ul>
        <span>班级</span>
        <el-select v-model="value" placeholder="请选择" class="select" size="small">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </ul>
      <ul>
        <span>级别</span>
        <el-select v-model="value" placeholder="请选择" class="select" size="small">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </ul>
      <ul>
        <span>教练</span>
        <el-select v-model="value" placeholder="请选择" class="select" size="small">
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </ul>

      <ul>
        <el-button size="small" type="info">查询</el-button>
        <el-button size="small" type="info">导出</el-button>
        <el-button size="small" type="info" @click="dialogVisible = true">发起考级活动</el-button>


      </ul>
      </div>
      <el-dialog
        title="发起考级活动"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose">
        <div >
          <el-row>
            <el-col></el-col>
          </el-row>

          <ul>
            <span>考级日期</span>
            <el-date-picker
              v-model="value1"
              type="date"
              size="small"

              placeholder="选择日期" style="width: 130px;">
            </el-date-picker>
          </ul>
          <ul>
            <span>报名截止日期</span>
            <el-date-picker
              v-model="value2"
              type="date"
              size="small"

              placeholder="选择日期" style="width: 130px;">
            </el-date-picker>
          </ul>
          <ul>
            <span>考级地点</span>
            <el-input v-model="input" placeholder="请输入考级地点" class="input2" size="small"></el-input>
          </ul>

        </div>
        <div class="tckSecond" >
          <ul>
            <span>姓名</span>
            <el-input v-model="input" placeholder="请输入内容" class="input" size="small"></el-input>
          </ul>
          <ul>
            <span>姓名</span>
            <el-input v-model="input" placeholder="请输入内容" class="input" size="small"></el-input>
          </ul>
          <ul>
            <span>姓名</span>
            <el-input v-model="input" placeholder="请输入内容" class="input" size="small"></el-input>
          </ul>
          <ul>
            <span>姓名</span>
            <el-input v-model="input" placeholder="请输入内容" class="input" size="small"></el-input>
          </ul>
        </div>

    <div >
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </div>

      </el-dialog>
    </div>
    <div style="margin: 20px 0 0 0">
      <el-table
        ref="multipleTable"
        :data="rows"
        border
        tooltip-effect="dark"
        style="width: 100% ; margin: 0 0 0 5px;"
        :default-sort = "{prop: 'date', order: 'descending'}"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
            >
        </el-table-column>

        <el-table-column
          align="center"
          prop="number"
          label="序号"
          sortable
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="Fullname"
          label="姓名"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="studentID"
          label="学号"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="roadMuseum"
          label="道馆"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="classes"
          label="班级"
          >
        </el-table-column>
        <el-table-column
          prop="coach"
          align="center"
          label="教练分配"
          >
        </el-table-column>
        <el-table-column
          prop="teacher"
          align="center"
          label="老师"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="level"
          label="级别"
          sortable
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="enrollTime"
          label="报名日期"
         >
        </el-table-column>
        <el-table-column
          align="center"
          prop="examTime"
          label="考试日期"
          >
        </el-table-column>

        <el-table-column
          align="center"
          prop="cost"
          label="费用"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="payState"
          label="缴费状态"
          >
          <!--:formatter="formatter">-->

        </el-table-column>
        <el-table-column
          align="center"
          prop="scores"
          label="得分"
         >
          <!--:formatter="formatter">-->
        </el-table-column>
        <el-table-column
          align="center"
          prop="adopt"
          label="是否通过"
        >
          <!--:formatter="formatter">-->

        </el-table-column>

      </el-table>
      <div class="block" >
        <el-pagination
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {
      ElCol,
      ElRow,
      ElButton},
    data() {
      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },

        },
        value1: '',
        value2: '',

        value5: '',
        input: '',
        dialogVisible: false,
        options: [
          {
            value: '选项1',
            label: '新桥馆'
          },
          {
            value: '选项2',
            label: '中央馆'
          },
        ],
        options1: [
          {
            value: '选项1',
            label: '全部'
          },
          {
            value: '选项2',
            label: '幼儿班'
          },
          {
            value: '选项3',
            label: '少年班'
          },
          {
            value: '选项4',
            label: '成人班'
          },
        ],
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
        ],
        options3: [
          {
            value: '选项1',
            label: '全部'
          },
          {
            value: '选项2',
            label: '华晨宇'
          },
          {
            value: '选项3',
            label: '汪苏泷'
          },
        ],
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
        value: ''
      };
    },
    computed: {
      //获取请求的消课信息展示在页面
      rows(){
        return this.$store.state.rows;
      },
    }
  };
</script>
<style scoped>
  .wai{

  }
  .wai ul{
    float: left;
    margin: 10px 0 10px 20px;

  }
  .select{
    width: 100px;
    height: 50px;
  }
  .input{
    height: 30px;
    width: 100px;
  }
  .input2{
    height: 30px;
    width: 200px;
  }
  .block{
    margin: 20px 0 0 850px;
  }
  .tckFirst ul{
    float: left;
    margin: 10px 0 10px 10px;
  }
  .tckSecond ul{

    margin: 10px 0 10px 10px;
  }
</style>
