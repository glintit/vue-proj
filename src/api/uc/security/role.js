import request from '@/utils/request'

// 获取角色树根节点
export function getRoleNodes (){
    return request({
        url: '/edu/uc/role/getRoleNodes',
        method: 'get'
    });
}

// 获取子角色列表
export function getDetail (params){
    return request({
      url: '/edu/uc/role/detail',
      method: 'get',
      params:params
    });
}

// 获取子角色列表
export function getSubRoleList (params){
  return request({
    url: '/edu/uc/role/getSubRoleList',
    method: 'get',
    params:params
  });
}

// 查询角色已经授权的操作
export function getRolOpt (params){
    return request({
      url: '/edu/uc/author/getRolOpt',
      method: 'get',
      params:params
    });
}

// 获得全部应用信息
export function getAllAppList (params){
    return request({
      url: '/edu/uc/author/getAllAppList',
      method: 'get',
      params:params
    });
}

// 查询已经分配的可授权角色列表
export function queryAssignRole (params){
  return request({
    url: '/edu/uc/role/queryAssignRole',
    method: 'get',
    params:params
  });
}

// 获取登录用户的角色树
export function getRoleTree (params){
  return request({
    url: '/edu/uc/role/getRoleTree',
    method: 'get',
    params:params
  });
}

// 添加角色（新增/修改）
export function saveRole (data){
  return request({
    url: '/edu/uc/role/saveRole',
    method: 'post',
    data: data
  });
}

// 删除角色
export function delectRole (role_id){
  return request({
    url: '/edu/uc/role/' + role_id,
    method: 'post'
  });
}
