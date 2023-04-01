import request from '@/utils/request'

// 获取应用列表
export function queryMsNameDownList (){
    return request({
        url: '/edu/uc/organDispatcher/queryMsNameDownList',
        method: 'get'
    });
}

// 分页查询用户应用授权信息
export function getUserSysAuth (data){
    return request({
        url: '/edu/uc/userSysAuth/getUserSysAuth',
        method: 'post',
        data:data
    });
}
// 获取第三方应用下的角色列表
export function querySysRoleDownList (params){
    return request({
        url: '/edu/uc/organDispatcher/querySysRoleDownList',
        method: 'get',
        params:params
    });
}

// 单个角色维护
export function pweihu (data){
    return request({
        url: '/edu/uc/userSysAuth/pweihu',
        method: 'post',
        data:data
    });
}

// 获取已授权未授权角色
export function getshouquan (params){
    return request({
        url: '/edu/uc/userSysAuth/getshouquan',
        method: 'get',
        params:params
    });
}

// 批量授权
export function saveUserSys (data){
    return request({
        url: '/edu/uc/userSysAuth/saveUserSys',
        method: 'post',
        data:data
    });
}

// 批量取消
export function deletePlUserSys (data){
    return request({
        url: '/edu/uc/userSysAuth/deletePlUserSys',
        method: 'post',
        data:data
    });
}

// 取消系统及角色授权
export function deleteUserSys (data){
    return request({
        url: '/edu/uc/userSysAuth/deleteUserSys',
        method: 'post',
        data:data
    });
}