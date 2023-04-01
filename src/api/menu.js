import request from '@/utils/request'

// 获取路由
export const queryMenus = (params) => {
  return request({
    url: '/edu/uc/usersys/getResAuthorityByLoginUser?clientId=' + params.clientId + '&optType=' + params.optType,
    method: 'get'
  })
}