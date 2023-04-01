import request from '@/utils/request'

const baseURL = process.env.VUE_APP_TOOL_API;

// 查询生成表数据
export function listTable(query) {
  return request({
    url: '/tool/gen/list',
    method: 'get',
    params: query,
    baseURL:baseURL
  })
}
// 查询db数据库列表
export function listDbTable(query) {
  var url='/tool/gen/db/list?dataSourceId='+query.dsid;
  if(query.pageNum){
    url+='&pageNum='+query.pageNum;
  }
  if(query.pageSize){
    url+='&pageSize='+query.pageSize;
  }
  if(query.tableName){
    url+='&tableName='+query.tableName;
  }
  return request({
    // url: '/tool/gen/db/list',
    url:url,
    method: 'get',
    // params: query,
    baseURL:baseURL
  })
}

// 查询表详细信息
export function getGenTable(tableId) {
  return request({
    url: '/tool/gen/' + tableId,
    method: 'get',
    baseURL:baseURL
  })
}

// 修改代码生成信息
export function updateGenTable(data) {
  return request({
    url: '/tool/gen',
    method: 'put',
    data: data,
    baseURL:baseURL
  })
}

// 导入表
export function importTable(data) {
  return request({
    url: '/tool/gen/importTable?tables='+data.tables+'&dataSourceId='+data.dsid,
    method: 'post',
    params: data,
    baseURL:baseURL
  })
}

// 预览生成代码
export function previewTable(tableId) {
  return request({
    url: '/tool/gen/preview/' + tableId,
    method: 'get',
    baseURL:baseURL
  })
}

// 删除表数据
export function delTable(tableId) {
  return request({
    url: '/tool/gen/' + tableId,
    method: 'delete',
    baseURL:baseURL
  })
}

// 生成代码（自定义路径）
export function genCode(tableName) {
  return request({
    url: '/tool/gen/genCode/' + tableName,
    method: 'get',
    baseURL:baseURL
  })
}

// 同步数据库
export function synchDb(tableName) {
  return request({
    url: '/tool/gen/synchDb/' + tableName,
    method: 'get',
    baseURL:baseURL
  })
}

//查询数据源
export function queryDataSource() {
  return request({
    url: '/system/dataSource/list',
    method: 'post',
    baseURL:baseURL
  })
}

//测试数据源
export function testDataSource(param) {
  return request({
    url: '/system/dataSource/connect?host='+param.host+'&name='+param.name+'&password='+param.pwd+'&port='+param.port+'&dbType='+param.dbType+'&username='+param.username,
    method: 'post',
    baseURL:baseURL
  })
}

//保存数据源
export function saveDataSource(param) {
  return request({
    url: '/system/dataSource/save?host='+param.host+'&name='+param.name+'&password='+param.pwd+'&port='+param.port+'&dbType='+param.dbType+'&username='+param.username+'&status=1',
    method: 'post',
    baseURL:baseURL
  })
}

//删除数据源
export function deleteDataSource(ids) {
  return request({
    url: '/system/dataSource/remove?ids='+ids,
    method: 'post',
    baseURL:baseURL
  })
}
