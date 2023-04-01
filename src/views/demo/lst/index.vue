<template>
  <div class="app-container">
    
    <!-- filter area -->
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="名称" prop="tableName">
        <el-input
          v-model="queryParams.tableName"
          placeholder="请输入名称"
          clearable
          @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="描述" prop="tableComment">
        <el-input
          v-model="queryParams.tableComment"
          placeholder="请输入描述"
          clearable
          @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRange"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- buttom area -->
    <div class="page-tool">
        <a href="javascript:;" class="btn blue-btn">添加</a>
        <a href="javascript:;" class="btn green-btn">编辑</a>
        <a href="javascript:;" class="btn red-btn">删除</a>
    </div>

    <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange" border stripe>
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column
                label="ID"
                align="center"
                prop="id"
                :show-overflow-tooltip="true"
                width="120"/>
            <el-table-column
                label="名称"
                align="center"
                prop="name"
                :show-overflow-tooltip="true"
                width="120"/>
            <el-table-column
                label="电话"
                align="center"
                prop="phone"
                :show-overflow-tooltip="true"/>
            <el-table-column
                label="邮箱地址"
                align="center"
                prop="email"
                :show-overflow-tooltip="true"/>

            <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
                <template slot-scope="scope">

                  <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                    <span class="btn-in-table edit" @click="handleEditTable(scope.row)"></span>
                  </el-tooltip>

                  <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                    <span class="btn-in-table del" @click="handleDelete(scope.row)"></span>
                  </el-tooltip>

                <!-- <el-button
                    type="text"
                    size="small"
                    icon="el-icon-edit"
                    @click="handleEditTable(scope.row)">编辑</el-button>
                <el-button
                    type="text"
                    size="small"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.row)">删除</el-button> -->
                </template>

            </el-table-column>

        </el-table>
   
  </div>
</template>

<script>
export default {
  data() {
    return {
        loading: true,
        showSearch:true,
        queryParams:{},
        dateRange:[],
        dataList:[
            {id:'1001',name:'张三',phone:'150****8888',email:'zsan@inspur.com'},
            {id:'1001',name:'李四',phone:'150****8888',email:'lsi@inspur.com'},
            {id:'1001',name:'王五',phone:'150****8888',email:'wwu@inspur.com'},
            {id:'1001',name:'赵六',phone:'150****8888',email:'zliu@inspur.com'},
            {id:'1001',name:'于七',phone:'150****8888',email:'yqi@inspur.com'}
        ]
    };
  },
  mounted(){
    this.loading=false;
  },
  methods: {
    handleSelectionChange(selection) {
      console.log(selection);
    },
    /** 修改按钮操作 */
    handleEditTable(row) {
      console.log(row);
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      var ids=row.id;
      if(!ids){
        var idarr = this.ids;
        ids='';
        for(var i=0,size=idarr.length;i<size;i++){
          ids+=idarr[i];
          if((i+1)<size){
            ids+=',';
          }
        }
      }
      this.$modal.confirm('是否确认删除该数据源？').then(function() {
        console.log(ids,'deleted');
      });
      
    }
  }
};
</script>

<style scoped>

</style>

