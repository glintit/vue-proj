import request from '@/utils/request'

// 获取应用列表
export function getResourceList (){
    return request({
        url: '/edu/uc/author/getResourceList',
        method: 'get'
    });
}

// 获取模块清单
export function getModuleList (params){
    return request({
      url: '/edu/uc/author/getModuleList',
      method: 'get',
      params:params
    });
}

// 获取操作
export function getOperationList (params){
    return request({
      url: '/edu/uc/author/getOperationList',
      method: 'get',
      params:params
    });
}

// 添加应用（新增/修改）
export function addApp (params){
    return request({
      url: '/edu/uc/app/addApp',
      method: 'post',
      data: params
    });
}

// 删除应用
export function deleteApp (app_id){
  return request({
    url: '/edu/uc/app/' + app_id,
    method: 'post'
  });
}

// 添加模块（新增/修改）
export function addModule (params){
  return request({
    url: '/edu/uc/module/addModule',
    method: 'post',
    data: params
  });
}

// 删除模块
export function deleteModule (module_id){
return request({
  url: '/edu/uc/module/' + module_id,
  method: 'post'
});
}

// 添加操作
export function addOpt (params){
  return request({
    url: '/edu/uc/operate/addOpt',
    method: 'post',
    data: params
  });
}

// 删除操作
export function deleteOpt (opt_id){
return request({
  url: '/edu/uc/operate/' + opt_id,
  method: 'post'
});
}

// 获取当前操作的所有url
export function getUrlList (params){
  return request({
    url: '/edu/uc/operate/getUrlList',
    method: 'get',
    params:params
  });
}

// 删除链接
export function deleteUrl (url_id){
  return request({
    url: '/edu/uc/operate/url/' + url_id,
    method: 'post'
  });
}

// 根据id获取应用详情
export function getAppById (params){
  return request({
    url: '/edu/uc/app/getAppById',
    method: 'get',
    params:params
  });
}

// 根据id获取模块详情
export function getModuleById (params){
  return request({
    url: '/edu/uc/module/getModuleById',
    method: 'get',
    params:params
  });
}

// 根据id获取操作详情
export function getOptById (params){
  return request({
    url: '/edu/uc/operate/getOptById',
    method: 'get',
    params:params
  });
}
