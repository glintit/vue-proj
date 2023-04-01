<template>
  <div class="demo-page">
    <div class="page-title">弹出框</div>
    <button class="btn blue-btn" @click="showDialog=true">打开对话框</button>


    <div class="gap">&nbsp;</div>
    <div class="page-title">确认提示框</div>
    <button class="btn blue-btn" @click="showConfirm()">点击确认</button>

    <div class="gap">&nbsp;</div>
    <div class="page-title">抽屉</div>
    <button class="btn blue-btn" @click="dshow=true">打开对话框</button>



    <gl-dialog :visible.sync="showDialog" title="弹出框标题" width="70%">
          <div class="demo-page">
            <div style="padding-bottom: 10px;">弹出框内容</div>
          <table class="info-table">
            <tr><td class="label center">档案编号</td><td>gjdklyoew859236</td></tr>
            <tr><td class="label center">曾用名</td><td>李某</td></tr>
            <tr><td class="label center">性别</td><td>女</td></tr>
            <tr><td class="label center">教职工号</td><td>200801</td></tr>
            <tr><td class="label center">国籍</td><td>中国</td></tr>
        </table>
        可以是一个表格，也可以是其他任何内容。
          </div>
    </gl-dialog>

    <gl-drawer :visible.sync="dshow">
			<div class="demo-page">
				侧边弹出框，可以是任何内容。与 el-drawer 功能类似，可根据需求随意修改。
			</div>
		</gl-drawer>
   
  </div>
</template>

<script>
import {notify} from '@/plugins/message/notify';
export default {
  data() {
    return {
        showDialog:false,
        dshow:false
    };
  },
  methods: {
    showConfirm(){

      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          notify.tip('你点击了确定按钮');
        }).catch(() => {
          console.log('canceled');         
        });

    }

  },
};
</script>

<style scoped>
 @import "../../../assets/css/demo.css";
 .gap {
    height: 30px;
 }
</style>

