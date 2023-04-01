import request from '@/utils/request'
// import md5 from 'js-md5'
import { aes } from '@/utils/aes'
// import qs from 'qs'

import config from '@/config'

// const salt = '1#2$3%4(5)6@7!poeeww$3%4(5)djjkkldss'

export function getLoginKey() {
  var url;
  if(customConfig.LOGIN_TYPE==='ucapi'){
    url='/edu/uc/login/key';
  }else{
    url='/uc/getkey/LoginGetKey.do?method=getLoginKey';
  }
  return request({
    url: url,
    method: 'get',
    baseURL: process.env.VUE_APP_SIGN_IN_CTX
  })
}

export function getUcUrl() {
  return process.env.VUE_APP_SIGN_IN_URL
}

export function login(data) {
  if(customConfig.LOGIN_TYPE==='ucapi'){
    return dependentUcLogin(data);
  }else{
    
      var url = '/j_hh_security_check?j_username=' + data.username + '&j_password=' + data.password
      if (data.captcha) {
        url += '&captcha=' + data.captcha
      }
      return request({
        url: url,
        method: 'post',
        data: data,
        baseURL: process.env.VUE_APP_SIGN_IN_CTX,
        headers: {
          'X-Front-Request': 'FrontRequest'
        }
      });

  }
}
function dependentUcLogin(data) {
  var params = {
    username:data.username,
    password:data.password,
    uuid: data.uuid,
    captcha: data.captcha
   }
  var url = '/edu/uc/login/login?username=' + params.username + '&password=' + params.password + '&uuid=' +  params.uuid
  if (params.captcha) {
      url += '&captcha=' + params.captcha
  }
  return request({
    url: url,
    method: 'post',
    headers: {
      'X-Front-Request': 'FrontRequest'
    }
  })
}

//手机号登录
export function loginIphone(data) {
  var url = '/j_sms_hh_security_check?j_username=' + data.j_username + '&captcha=' + data.captcha + '&userlgnCaptcha=' + data.userlgnCaptcha
  console.log(url)
  return request({
    url: url,
    method: 'post',
    data: data,
    baseURL: process.env.VUE_APP_SIGN_IN_CTX,
    headers: {
      'X-Front-Request': 'FrontRequest'
    }
  })
}

export function getTokenByThirdPartCode(data) {
  var url = '/uc/callback?code=' + data.code + '&state=' + data.state
  return request({
    url: url,
    method: 'get',
    data: data,
    baseURL: process.env.VUE_APP_SIGN_IN_CTX,
    headers: {
      'X-Front-Request': 'FrontRequest'
    }
  })
}
/**
 * 退出登录之前处理
 */
export function logoutBefore() {
  var url = '/j_hh_security_logout'
  return request({
    url: url,
    method: 'get',
    baseURL: process.env.VUE_APP_SIGN_IN_CTX,
    headers: {
      'X-Front-Request': 'FrontRequest'
    }
  })
}

export function getInfo() {
  return request({
    url: '/auth/v1/user/me',
    method: 'get',
    baseURL: process.env.VUE_APP_AUTH_API
  })
}

export function logout(redirectUri) {
  return request({
    url: '/auth/logout?redirect_uri=' + redirectUri,
    method: 'post',
    baseURL: process.env.VUE_APP_AUTH_API
  })
}

export function getAuthMenu(menuType) {
  return request({
    url: '/bsp/current/menu/' + menuType,
    method: 'get',
    baseURL: process.env.VUE_APP_AUTH_API
  })
}

//是否开启图片验证码校验
export function checkCaptcha() {
  return request({
    url: '/checkCaptcha',
    method: 'get',
    baseURL: process.env.VUE_APP_SIGN_IN_CTX
  })
}

/**
 * 获取用户信息
 */
 export const getUserInfo = () => {
  return request({
    url: '/admin/current/user',
    method: 'get'
  })
}

/**
 * 检查token
 */
export function checkToken() {
  return request({
    url: '/euc/j_hh_token_check',
    method: 'get',
    baseURL: process.env.SIGN_IN_CTX
  })
}