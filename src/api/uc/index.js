import request from '@/utils/request'

// 获取所有
export function getUser(params) {
  return request({
    // url: '/edu/uc/eduUser/getUserInfo?uid=' + params,
    url: '/edu/uc/eduUser/getCurrentUserInfo',
    // url: '/admin/current/user' ,
    method: 'get'
  })
}

export function getAppBindExt(params) {
  return request({
    url: 'edu/uc/appBindExt/query',
    method: 'get',
    params: params
  })
}

export function changeSystemBind(data) {
  return request({
    url: 'edu/ac/appBindExt/query',
    method: 'post',
    data
  })
}

export function editPassword(data) {
  return request({
    url: '/edu/uc/eduUserExt/updatePwd',
    method: 'post',
    data
  })
}

export function unbindMail() {
  return request({
    url: '/edu/uc/eduUserExt/unbindMail',
    method: 'post'
  })
}

export function edit(data) {
  return request({
    url: '/edu/uc/eduUser/modifyAccount',
    method: 'post',
    data
  })
}

export function editNickname(data) {
  return request({
    url: '/edu/uc/eduUserExt/setNickName',
    method: 'post',
    data
  })
}

// ac/getImg
// 获取图片
export function getImg(params) {
  return request({
    url: '/edu/ac/getImg?id=' + params,
    method: 'get'
  })
}
// 文件上传
export function update(data) {
  return request({
    url: 'edu/uc/eduUserExt/updateAvatar',
    method: 'post',
    data
  })
}

// 获取当前登录学生年级班级拓展信息
export function getStudentInfo(params) {
  return request({
    url: '/edu/uc/studentGradeClass/getStudentInfo',
    method: 'get',
    params: params
  })
}

// 获取学生年级信息下拉框
export function getNjInfo(params) {
  return request({
    url: '/edu/uc/studentGradeClass/getNjInfo',
    method: 'get',
    params: params
  })
}

// 获取学生班级信息下拉框
export function getBjInfo(params) {
  return request({
    url: '/edu/uc/studentGradeClass/getBjInfo',
    method: 'get',
    params: params
  })
}

// 保存学生年级班级信息
export function setStudentInfoExt(data) {
  return request({
    url: 'edu/uc/studentGradeClass/setStudentInfoExt',
    method: 'post',
    data
  })
}

// 获取当前登录用户教师年级班级信息列表
export function getTeacherInfo(params) {
  return request({
    url: 'edu/uc/teacherGradeClass/getTeacherInfo',
    method: 'get',
    params: params
  })
}

// 获取教师年级信息下拉框
export function getTeacherNjInfo(params) {
  return request({
    url: 'edu/uc/teacherGradeClass/getNjInfo',
    method: 'get',
    params: params
  })
}

// 获取教师班级信息下拉框
export function getTeacherBjInfo(params) {
  return request({
    url: 'edu/uc/teacherGradeClass/getBjInfo',
    method: 'get',
    params: params
  })
}

// 保存教师年级班级信息
export function setTeacherInfoExt(data) {
  return request({
    url: 'edu/uc/teacherGradeClass/setTeacherInfoExt',
    method: 'post',
    data
  })
}

// 删除教师年级班级信息
export function delTeacherInfoExt(data) {
  return request({
    url: 'edu/uc/teacherGradeClass/delTeacherInfoExt',
    method: 'post',
    data
  })
}

// 修改用户信息手机号
export function modifyAccount(data) {
  return request({
    url: '/edu/uc/eduUser/modifyAccount',
    method: 'post',
    data
  })
}

// 手机号重复校验
export function checkPhone(data) {
  return request({
    url: '/edu/uc/eduUser/checkPhone',
    method: 'post',
    data
  })
}

// 重复校验
export function checkEmail(data) {
  return request({
    url: '/edu/uc/eduUser/checkEmail',
    method: 'post',
    data
  })
}

//查询当前家长绑定的学生信息
export function queryStuparList(params) {
  return request({
    url: '/edu/uc/stuparBindExt/queryStuparList',
    method: 'get',
    params: params
  })
}
//根据身份证号查询学生详细信息
export function getStuInfo(params) {
  return request({
    url: '/edu/uc/stuparBindExt/getStuInfo',
    method: 'get',
    params: params
  })
}
//解除绑定
export function delStuBind(params) {
  return request({
    url: '/edu/uc/stuparBindExt/delStuBind',
    method: 'get',
    params: params
  })
}
//家长绑定学生
export function bindStuInfo(params) {
  return request({
    url: '/edu/uc/stuparBindExt/bindStuInfo',
    method: 'get',
    params: params
  })
}
//联合组件管理-查询当前用户联合组件信息
export function queryWidgets(params) {
  return request({
    url: '/edu/sc/portal/widgetSet/queryWidgets',
    method: 'post',
    data: params
  })
}
//联合组件管理-更新当前用户关联联合组件信息
export function updateWidgets(params) {
  return request({
    url: '/edu/sc/portal/widgetSet/updateWidgets',
    method: 'post',
    data: params
  })
}
//获取菜单id
export function getAppsByMainAppId(params) {
  return request({
    url: '/edu/uc/appintegration/getAppsByMainAppId',
    method: 'get',
    params: params
  })
}
//修改个人信息
export function modifyOwnerAccount(data) {
  return request({
    url: '/edu/uc/eduUser/modifyOwnerAccount',
    method: 'post',
    data
  })
}
// 微信绑定情况查询
export function getUserWeChat(params) {
  return request({
    url: '/edu/uc/wechat/getUserWeChat',
    method: 'get',
    params: params
  })
}
// 解除绑定
export function unbind(userId) {
  return request({
    url: '/edu/uc/wechat/unbind?userId='+userId,
    method: 'post'
  })
}
// 微信绑定
 export function wxbd(params) {
  return request({
    method: 'get',
    url: '/edu/uc/wechat/bind',
    params: params
  })
}
// export function wxbd(params) {
//   return request({
//     method: 'post',
//     url: '/edu/uc/wechat/bind',
//     data: params
//   })
// }
// 微信登录
export function wxsmlogin(data) {
  var url = '/uc/j_hh_security_check?loginType='+data.loginType+'&code='+data.code
  return request({
    url: url,
    method: 'post',
    data: data,
    baseURL: process.env.SIGN_IN_CTX,
    headers: {
      'X-Front-Request': 'FrontRequest'
    }
  })
}


// 个人中心-修改邮箱-邮箱发送验证码
export function sendEmaiCode(data) {
  return request({
    url: '/edu/uc/eduUser/sendCaptcha',
    method: 'post',
    data: data
  })
}
//个人中心-修改邮箱手机

export function modifyOwnerEmailOrPhone(data) {
  return request({
    url: '/edu/uc/eduUser/modifyUserEmailOrPhone ',
    method: 'post',
    data: data
  })
}

/**
 * 获取用户信息(原位置在 api/opt/login.js)
 */
 export const getUserInfo = () => {
    return request({
      url: '/edu/uc/current/user',
      method: 'get'
    })
}