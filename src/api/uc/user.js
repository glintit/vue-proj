import request from '@/utils/request'
// 账号管理
// 获取用户信息
export function getPersonList (params){
  return request({
    url: '/edu/uc/eduUser/selectAccount',
    method: 'get',
    params:params
  })
}

// 获取组织列表（树）
export function organTree (){
  return request({
    url: '/edu/uc/organ/queryRootOrganNodes',
    method: 'get',
  })
}

// 查询组织子节点列表
export function SubOrganNodes (params){
  return request({
    url: '/edu/uc/organ/querySubOrganNodes',
    method: 'get',
    params:params
  })
}

// 查询组织子节点列表（带年级、班级）
export function querySubOrganNodesWithNjBj (params){
  return request({
    url: '/edu/uc/organ/querySubOrganNodesWithNjBj',
    method: 'get',
    params:params
  })
}

// 生成用户id
export function getUserId (){
  return request({
    url: '/edu/uc/eduUser/getUserId',
    method: 'get',
  })
}
// 用户账号重复校验
export function checkUserId (data){
  return request({
    url: '/edu/uc/eduUser/checkUserId',
    method: 'post',
    data
  })
}
// 用户账号别名重复校验（新增）
export function checkUserIdAlias (data){
  return request({
    url: '/edu/uc/eduUser/checkUserIdAlias',
    method: 'post',
    data
  })
}
// 用户账号别名重复校验（修改）
export function checkUpdateUserIdAlias (data){
  return request({
    url: '/edu/uc/eduUser/checkUpdateUserIdAlias',
    method: 'post',
    data
  })
}
// 邮箱重复校验
export function checkPhone (data){
  return request({
    url: '/edu/uc/eduUser/checkPhone',
    method: 'post',
    data
  })
}
// 手机号重复校验
export function checkEmail (data){
  return request({
    url: '/edu/uc/eduUser/checkEmail',
    method: 'post',
    data
  })
}
// 添加用户
export function addAccount (data){
  return request({
    url: '/edu/uc/eduUser/addAccount',
    method: 'post',
    data
  })
}

// 查询用户详情
export function eduUser (uid){
  return request({
    url: '/edu/uc/eduUser/'+uid,
    method: 'get',
  })
}
// 修改用户信息
export function modifyAccount (data){
  return request({
    url: '/edu/uc/eduUser/modifyAccount',
    method: 'post',
    data
  })
}

// 删除用户
export function deleteAcc (data){
  return request({
    url: '/edu/uc/eduUser/deleteAcc',
    method: 'post',
    data
  })
}
// 锁定用户
export function lockAcc (data){
  return request({
    url: '/edu/uc/eduUser/lockAcc',
    method: 'post',
    data
  })
}
// 解锁用户
export function unlockAcc (data){
  return request({
    url: '/edu/uc/eduUser/unlockAcc',
    method: 'post',
    data
  })
}
// 用户密码初始化
export function initPwd (data){
  return request({
    url: '/edu/uc/eduUser/initPwd',
    method: 'post',
    data
  })
}
// 用户分配组织
export function addNoOrganSub (data){
  return request({
    url: '/edu/uc/eduUser/addNoOrganSub',
    method: 'post',
    data
  })
}
// 用户组织变更
export function changeAccOrgan (data){
  return request({
    url: '/edu/uc/eduUser/changeAccOrgan',
    method: 'post',
    data
  })
}

// 查询待分配组织的人员列表(分页)
export function noOrganAccount (params){
  return request({
    url: '/edu/uc/eduUser/selectNoOrganAccount',
    method: 'get',
    params:params
  })
}
// 批量导出用户
export function exportAllUsers (params){
  return request({
    url: '/edu/uc/eduUser/exportAllUsers',
    method: 'get',
    params: params,
    responseType: "blob"
  })
}

// 角色管理
// 获取人员角色列表（分页）
export function getUserRole (params){
  return request({
    url: '/edu/uc/eduUserRole/getUserRole',
    method: 'get',
    params:params
  })
}
// 获取用户角色详细信息
export function getUserRoleDetail (uid){
  return request({
    url: '/edu/uc/eduUserRole/'+uid,
    method: 'get',
  })
}
// 获取用户角色列表
export function getData (params){
  return request({
    url: '/edu/uc/eduUserRole/getData',
    method: 'get',
    params:params
  })
}
// 添加用户角色 单个用户
export function saveUserRole (data){
  return request({
    url: '/edu/uc/eduUserRole/saveUserRole',
    method: 'post',
    data
  })
}
// 添加用户角色 多个用户
export function batchAddRole (data){
  return request({
    url: '/edu/uc/eduUserRole/batchAddRole',
    method: 'post',
    data
  })
}
// 获取当前登录用户可分配的角色列表
export function getCanAssignRole (){
  return request({
    url: '/edu/uc/eduUserRole/getCanAssignRole',
    method: 'get',
  })
}
// 身份证号重复校验
export function checkCertNum (data){
  return request({
    url: '/edu/uc/eduUser/checkCertNum',
    method: 'post',
    data
  })
}
//临时账号审核
export function authTempUser (data){
  return request({
    url: '/edu/uc/eduUserReg/authTempUser',
    method: 'post',
    data
  })
}
//查询临时用户审核记录
export function queryUserAudit (params){
  return request({
    url: '/edu/uc/audit/queryUserAudit',
    method: 'get',
    params:params
  })
}
//查询临时用户记录list
export function queryUserAuditList (params){
  return request({
    url: '/edu/uc/audit/queryUserAuditList',
    method: 'get',
    params:params
  })
}
//审核不通过
export function rejectTempUser(data){
  return request({
    url: '/edu/uc/eduUserReg/rejectTempUser',
    method: 'post',
    data
  })
}
//获取年级
export function queryNjList(params){
  return request({
    url: '/edu/uc/njxx/queryList',
    method: 'get',
    params:params
  })
}

//获取班级
export function queryBjList(params){
  return request({
    url: '/edu/uc/bjxx/queryList',
    method: 'get',
    params:params
  })
}
//学生信息维护列表
export function queryImportFwdyList(data){
  return request({
    url: '/edu/uc/importFwdy/queryImportFwdyList',
    method: 'post',
    data
  })
}
//学生信息维护：下载错误文件
export function downloadErrorFile(data){
  return request({
    url: '/edu/uc/importFwdy/downloadErrorFile',
    method: 'post',
    data,
    responseType: "blob"
  })
}
//学生信息维护：下载模板
export function downloadTemplateFile(data){
  return request({
    url: '/edu/uc/importFwdy/downloadTemplateFile',
    method: 'post',
    data,
    responseType: "blob"
  })
}
//学生调班
export function updateNjBj(data){
  return request({
    url: '/edu/uc/eduUser/updateNjBj',
    method: 'post',
    data
  })
}

//查询任课信息
export function queryRkxxList (params){
  return request({
    url: '/edu/uc/rkxx/queryRkxxList',
    method: 'get',
    params:params
  })
}

//新增任课信息
export function addRkxx (data){
  return request({
    url: '/edu/uc/rkxx/add',
    method: 'post',
    data
  })
}

//查询字典值列表
export function query (data){
  return request({
    url: '/edu/uc/sysEnumValue/query',
    method: 'post',
    data
  })
}

//查看任课信息
export function queryRkxxInfo (params){
  return request({
    url: '/edu/uc/rkxx/queryRkxxInfo',
    method: 'get',
    params:params
  })
}

//更新任课信息
export function Rkxxupdate (data){
  return request({
    url: '/edu/uc/rkxx/update',
    method: 'post',
    data
  })
}

//删除任课信息
export function Rkxxdelete (data){
  return request({
    url: '/edu/uc/rkxx/delete',
    method: 'post',
    data
  })
}
// 获取学段
export function getSection (params){
  return request({
    url: '/edu/uc/ucOrganLabel/statOrgansByEduXdLabel',
    method: 'get',
    params:params
  })
}

// 入口页面浏览量TOP查询
export function getTopPageCount (params){
  return request({
    url: '/edu/logs/general/getTopPageCount',
    method: 'get',
    params:params
  })
}
// 按日统计浏览量，ip数、登录用户数
export function getCountByDay (params){
  return request({
    url: '/edu/logs/general/getTotalCount',
    method: 'get',
    params:params
  })
}
// 地域分布浏览量查询
export function getRegionCount (params){
  return request({
    url: '/edu/logs/general/getRegionCount',
    method: 'get',
    params:params
  })
}
// 浏览量趋势图查询
export function getDateHistogram (params){
  return request({
    url: '/edu/logs/general/getDateHistogram',
    method: 'get',
    params:params
  })
}
// 应用累计使用TOP查询
export function getTopUseApp (params){
  return request({
    url: '/edu/logs/app/getTopUseApp',
    method: 'get',
    params:params
  })
}
// 日志检索-列表
export function queryPage (params){
  return request({
    url: '/edu/logs/general/queryPage',
    method: 'post',
    data:params
  })
}
// 日志详情
export function getById (params){
  return request({
    url: '/edu/logs/general/getById',
    method: 'get',
    params:params
  })
}
// 查询当前用户下的数据
export function queryZcdlqkBySelf (params){
  return request({
    url: '/edu/uc/tjfx/queryZcdlqkBySelf',
    method: 'get',
    params:params
  })
}
// 根据organid查询用户下的数据
export function queryZcdlqkByOrganId (params){
  return request({
    url: '/edu/uc/tjfx/queryZcdlqkByOrganId',
    method: 'get',
    params:params
  })
}
// 批量操作学生毕业
export function batchZrByxx (data){
  return request({
    url: '/edu/uc/graduates/batchZrByxx',
    method: 'post',
    data
  })
}
// 查询毕业记录
export function queryGraduateList (params){
  return request({
    url: '/edu/uc/graduates/queryGraduateList',
    method: 'get',
    params:params
  })
}

// 地图趋势图查询
export function getGisHistogram (params){
  return request({
    url: '/edu/logs/gis/getDateHistogram',
    method: 'get',
    params:params
  })
}
// 地图Top10
export function getTopKeywordCount (params){
  return request({
    url: '/edu/logs/gis/getTopKeywordCount',
    method: 'get',
    params:params
  })
}

// 根据机构编码查询组织子节点列表
export function querySubOrganNodesByCode (code){
  return request({
    url: '/edu/uc/comMemsOrgan/selectAll?parentCode='+code,
    method: 'get'
  })
}