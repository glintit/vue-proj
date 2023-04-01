import request from '@/utils/request'


//获取所有
export function getAppIntegrationList (params){
  return request({
    url: '/edu/uc/appintegration/getAppIntegrationList',
    method: 'get',
    params:params
  })
}

//新增
export function appIntegrationAdd (data){
  debugger
  console.log(data)
  return request({
    url: '/edu/uc/appintegration/addAppIntegration',
    method: 'post',
    data
  })
}

//修改
export function appIntegrationEdit (data){
 
  return request({
    url: '/edu/uc/appintegration/editAppIntegration',
    method: 'post',
    data
  })
}

//删除
export function appIntegrationDelete (data){
  debugger
  console.log(data)
  return request({
    url: '/edu/uc/appintegration/delMenuById',
    method: 'post',
    data
  })
}
 //批量删除
 export function allDelete (data){
  return request({
    url: '/edu/uc/appintegration/delMenus',
    method: 'post',
    data
  })
}

//检测appId是否存在
export function checkAppIdExist (params){
  return request({
    url: '/edu/uc/appintegration/checkAppIdExist?appId='+params,
    method: 'get',
   
  })
}
