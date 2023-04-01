import request from '@/utils/request'
// 找回密码

// 用户管理-修改密码-第一步_获取验证码
export function getVerificationCode(params) {
  return request({
    url: 'edu/uc/eduPassword/step1/captcha',
    method: 'get',
    params: params
  })
}

// 用户管理-修改密码-第一步_填写账号
export function getPhoneEmail(params) {
  return request({
    url: 'edu/uc/eduPassword/step1',
    method: 'get',
    params: params
  })
}

// 用户管理-修改密码-第二步_发送动态验证码
export function sendPhoneEmail(params) {
  return request({
    url: 'edu/uc/eduPassword/step2/captcha',
    method: 'get',
    params: params
  })
}

// 用户管理-修改密码-第二步_账号验证
export function checkPhoneEmail(params) {
  return request({
    url: 'edu/uc/eduPassword/step2',
    method: 'get',
    params: params
  })
}

// 用户管理-修改密码-第三步_设置新密码
export function setPassword(params) {
  return request({
    url: 'edu/uc/eduPassword/step3',
    method: 'get',
    params: params
  })
}

export function getUserSSOBind(params) {
  return request({
    url: 'edu/uc/eduUserSSOBind/getUserSSOBind',
    method: 'get',
    params: params
  })
}

// 批量删除
export function changeBind(data) {
  return request({
    url: '/edu/uc/appBindExt/delSystemBind',
    method: 'post',
    data
  })
}

// 获取加密key
export function getAesKey() {
  return request({
    url: '/edu/uc/eduPassword/getAesKey',
    method: 'get'
  })
}
