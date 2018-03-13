<template>
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
        <span>道馆</span>
        <el-select v-model="value" placeholder="请选择" class="select" size="small">
          <el-option

            v-for="item in options"
            :key="item.value"
            :width="60"
            :label="item.label"
            :value="item.value" >
          </el-option>
        </el-select>
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
      <span>状态</span>
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
      <span>姓名</span>
      <el-input v-model="input" placeholder="请输入内容" class="input" size="small"></el-input>
    </ul>
      <ul>
        <el-button size="small" type="info">查询</el-button>
        <el-button size="small" type="info">导出</el-button>
      </ul>
    </div>
    <div style="margin: 20px 0 0 0">
      <el-table
        size="mini"
        ref="multipleTable"
        :data="fireClass"
        border
        tooltip-effect="dark"
        style="width: 100% ; margin: 0 0 0 5px;"
        :default-sort = "{prop: 'date', order: 'descending'}"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          align="center"
          prop="number"
          label="序号"
          sortable
          width="90">
        </el-table-column>
        <el-table-column
          align="center"
          prop="Fullname"
          label="姓名"
          width="90">
        </el-table-column>
        <el-table-column
          align="center"
          prop="gender"
          label="性别"
          width="80">
        </el-table-column>
        <el-table-column
          align="center"
          prop="roadMuseum"
          label="道馆"
          width="90">
        </el-table-column>
        <el-table-column
          align="center"
          prop="classes"
          label="班级"
          width="90">
        </el-table-column>
        <el-table-column
          prop="coach"
          align="center"
          label="教练分配"
          width="90">
        </el-table-column>
        <el-table-column
          prop="teacher"
          align="center"
          label="老师"
          width="90">
        </el-table-column>
        <el-table-column
          align="center"
          prop="level"
          label="级别"
          sortable
          width="110">
        </el-table-column>
        <el-table-column
          align="center"
          prop="rowcourse"
          label="消课日期"
          width="140">
        </el-table-column>

        <el-table-column

          align="center"
          prop="fireClass"
          label="消课记录"
          width="140">
        </el-table-column>
        <el-table-column
          align="center"
          prop="states"
          label="状态"
          width="170">
          <!--:formatter="formatter">-->

        </el-table-column>
        <div class="block">
          <span class="demonstration">页数较少时的效果</span>
          <el-pagination
            layout="prev, pager, next"
            :total="50">
          </el-pagination>
        </div>
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
  export default {
    components: {ElButton},
    data() {
      return {

        value5: '',
        input: '',
        value: ''
      };
    },
    computed: {
      options(){
        return this.$store.state.options;
      },//道馆

      options1(){
      return this.$store.state.options1;
    },//班级

      options2(){
    return this.$store.state.options2;
  },//状态

      options3(){
    return this.$store.state.options3;
  },//教练

      fireClass(){
        return this.$store.state.fireClass;
      },//消课表
    },
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
  .block{
   margin: 20px 0 0 850px;
  }
</style>
