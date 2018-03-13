<template>  <div class="block">
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[100, 200, 300, 400]">
    <table>
      <thead>
      <th>
        asd
      </th>

      </thead>
      <tbody>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
        <tr><td>2</td></tr>
      </tbody>
    </table>
  </el-pagination>
</div>
</template>
<script>
  export default {
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    data() {
      return {
        total:'0',
        currentPage: 4
      };
    }
  }
</script>
