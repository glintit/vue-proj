<template>
  <div class="demo-page">
    <!-- <gl-form labelWidth="120px">
      <form-item :label="'表示'">dddd</form-item>
    </gl-form> -->

    <div class="page-title">表格</div>
    <table class="info-table">
         <tr><td class="label center">档案编号</td><td>gjdklyoew859236</td></tr>
         <tr><td class="label center">曾用名</td><td>李某</td></tr>
         <tr><td class="label center">性别</td><td>女</td></tr>
         <tr><td class="label center">教职工号</td><td>200801</td></tr>
         <tr><td class="label center">国籍</td><td>中国</td></tr>
    </table>

    <div class="page-title">表单</div>
    <table class="info-table">
          <tr><td class="label center">档案编号</td><td>
              <input class="text" type="text" placeholder="请输入"/>
          </td></tr>
           <tr><td class="label center">曾用名</td><td><input class="text" type="text" placeholder="请输入"/></td></tr>
           <tr><td class="label center">性别</td><td><input class="text" type="text" placeholder="请输入"/></td></tr>
          <tr><td class="label center">教职工号</td><td><input class="text" type="text" placeholder="请输入"/></td></tr>
          <tr><td class="label center">国籍</td><td><input class="text" type="text" placeholder="请输入"/></td></tr>
    </table>
   
  </div>
</template>

<script>
export default {
  data() {
    return {
    
    };
  },
  methods: {
    
  },
};
</script>

<style scoped>
 @import "../../../assets/css/demo.css";
</style>

