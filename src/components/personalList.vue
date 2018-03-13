<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin: 20px 0 0 0">
      <el-table-column
        prop="date"
        label="课程结束日期"
        width="110">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="75">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        width="75">
      </el-table-column>
      <el-table-column
        prop="year"
        label="年龄"
        width="75">
      </el-table-column>
      <el-table-column
        prop="coach"
        label="教练"
        width="80">
      </el-table-column>
      <el-table-column
        prop="card"
        label="卡型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="level"
        label="级别"
        width="75">
      </el-table-column>
      <el-table-column
        prop="payDate"
        label="缴费日期"
        width="100">
      </el-table-column>
      <el-table-column
        prop="classes"
        label="班级"
        >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          gender:'男',
          year:'23',
          coach:'王鲁滨',
          card:'每周10次课',
          level:'黄绿带',
          payDate:'2016-05-02',
          classes:'中央馆少儿班',

        }, {
          date: '2016-05-04',
          name: '王小虎',
          gender:'男',
          year:'23',
          coach:'王鲁滨',
          card:'每周10次课',
          level:'黄绿带',
          payDate:'2016-05-02',
          classes:'中央馆少儿班',

        }, {
          date: '2016-05-01',
          name: '王小虎',
          gender:'男',
          year:'23',
          coach:'王鲁滨',
          card:'每周10次课',
          level:'黄绿带',
          payDate:'2016-05-02',
          classes:'中央馆少儿班',

        }, {
          date: '2016-05-03',
          name: '王小虎',
          gender:'男',
          year:'23',
          coach:'王鲁滨',
          card:'每周10次课',
          level:'黄绿带',
          payDate:'2016-05-02',
          classes:'中央馆少儿班',

        }]
      }
    }
  }
</script>
