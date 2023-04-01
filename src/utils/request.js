import axios from 'axios'
import qs from 'qs'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth';

import _config from '@/config'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: _config.apiUrl, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    const mse = config.url.startsWith('/admin')
    if (mse) {
      config.method === 'get'
        ? config.params = { ...config.params } : config.data = qs.stringify({ ...config.data }, { allowDots: true })
    }
    // const token = Vue.ls.get(ACCESS_TOKEN)
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error);
  }
)

// response interceptor
service.interceptors.response.use(

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (typeof res.code === 'undefined') {
      return res
    } else if (res.code && res.code !== 20000 && res.code !== 0) {
      if (res.code === 200) {
        return res
      } else if (res.code === 500 && res.msg) {
        return res
      } else if(res.code!=='401002' && res.code!=='401004'){ // 401002 & 401004分别为验证码错误、用户名密码错误，提示信息在页面中处理
        Message({
          message: res.msg || res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    let message = error.message
    var pattern = new RegExp('[\u4E00-\u9FA5]+')

    if (error.response !== undefined) {
      if (document.getElementsByClassName('el-message').length === 0) {
        if (error.response.status === 401) {
            if ( error.response.config.baseURL != '/eduProfile') {
              Message({
                message: message,
                type: 'error',
                duration: 3 * 1000
              })
            }
            store.dispatch('user/logout', '/');
            if (process.env.NODE_ENV == 'development') {
              router.push('/login')
            } else {
              top.location.href=customConfig.loginPage;
            }
        } else if (error.response.status === 400) {
          if (error.response.data.error === 'invalid_grant') {
            if (error.response.data.error_description === '您的账号已经被锁定，请联系管理员进行恢复') {
              message = error.response.data.error_description;
            } else {
              message = '账号错误';
            }
          }
          Message({
            message: message,
            type: 'error',
            duration: 3 * 1000
          })
        } else if (error.response.status === 500) {
          // debugger
          if (error.response.data.path.indexOf('/info-process-model/form/release') !== -1 || error.response.data.path.indexOf('/workflow/procdef/release') !== -1) {
            message = error.response.data.message
          } else {
            if (pattern.test(error.response.data.message)) {
              message = error.response.data.message
            } else if (error.config.url.indexOf('bsp/function/importing') !== -1) {
              // 捕捉bsp-功能管理-导入报错
              message = '请检查导入sql是否合理';
            } else {
              message = '请求错误';
            }
            Message({
              message: message,
              type: 'error',
              duration: 3 * 1000
            });
          }
        }
      }
      return Promise.reject(error)
    }
  }
)

export default service
